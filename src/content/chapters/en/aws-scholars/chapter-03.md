---
---

A customer support system for NovaMart, a fictional e-commerce retailer: five Strands agents that understand the request, gather the facts from DynamoDB, query three knowledge bases in parallel, decide on a return according to the customer's tier, then write the reply. All of it deployed on AgentCore Runtime, behind a guardrail, with memory, CloudWatch logs and X-Ray traces. Final score: 120/120.

**What was provided, what I did.** The course provided the infrastructure (a CloudFormation template and the seed scripts), the observability module, the test suite and an `agent_orchestrator.py` file full of TODOs. My work: create the three knowledge bases, write the five agents, the guardrail, the deployment, the memory and the observability, then go beyond 120/120 with four extras.

## How the pieces fit together

The Orchestrator (Claude Haiku 4.5, temperature 0) never answers on its own. It routes to four specialist agents (Claude Sonnet 4.5):

- **InventoryAgent** reads orders and the customer's tier. It reports facts and decides nothing.
- **RefundAgent** decides whether a return is eligible: 30 days for a Standard customer, 60 for a Premium one.
- **PolicyAgent** answers policy questions by querying three sub-agents, one per knowledge base (returns, shipping, warranty), run in parallel.
- **CommunicationAgent** always comes last and writes the customer reply.

The agents don't talk to each other directly. Each one writes its result to a shared DynamoDB row, the **WorkflowState**, which carries a version number. Before writing, an agent checks that the version hasn't changed since it read it; otherwise the write is rejected. That's optimistic locking: two agents can't silently overwrite each other.

Routing follows six rules written in the Orchestrator's prompt. A status question goes to Inventory then Refund; a policy question goes to Policy; "what is my tier?" goes to Inventory, never to Policy; a calculation goes straight to the CommunicationAgent; and the last step is always the CommunicationAgent.

## What I built

**The three knowledge bases**, each on its own S3 prefix (`policies/returns/`, `shipping/`, `warranty/`), on the stack's vector bucket, with Titan Embeddings V2. Pointing at the whole bucket would have indexed all three domains in every base, and the parallel test would no longer have told them apart.

**The five agents**, fifteen documented tools (purpose, parameters, return value: that's what the model reads to choose). The parallel search runs through a `ThreadPoolExecutor` with three workers. The X-Ray trace proves it: the three knowledge base calls (819, 755 and 821 ms) start together and overlap.

**The guardrail**: content filters, personal data (card and social security numbers blocked, email and phone anonymized), a profanity list, and three denied topics: competitor products, price negotiation, legal threats.

**Deployment, memory, observability**: a single `deploy`, which went through on the first try, chaining guardrail, Runtime, summarized session memory (7 days), CloudWatch logs and X-Ray traces sampled at 100%.

## Where the prompt wasn't enough

The thread running through this project: every rule left to the prompt alone eventually gave way, to a test or to a trace.

- **"One tool at a time."** On a simple status question, the RefundAgent replied that it didn't have the facts yet. The trace showed Refund launched *before* Inventory: Haiku had emitted both calls in the same turn, and Strands runs the tools of a single turn in parallel by default. Optimistic locking caught the write conflict, but the answer was wrong. The fix went into the code: a sequential executor on the Orchestrator.
- **A guardrail that blocks the right question.** The test "5 items at $29.99 with 10% off" was classified as price negotiation. The definition mentioned calculations, and one example looked too much like a legitimate question. I wrote a script that tunes the guardrail's draft, replays 14 cases, and publishes a version only if all 14 pass.
- **A return nobody asked for.** Since the routing rule also sends status questions to the RefundAgent, it could have started a return no one had requested. It now acts only on an explicit request.
- **An unknown date, anticipated.** The model doesn't know today's date: without it, the 30- or 60-day calculation would be wrong. So the tools return the order's age, computed by the code.
- **A shared history.** A Strands agent keeps its messages from one call to the next, and the Runtime reuses the same Orchestrator for every customer. So each agent starts from an empty history on every request, and the Orchestrator's is cleared when the session changes.

## Beyond 120/120

**Attacking my own system.** Ten adversarial requests sent to the deployed system. The five attacks (negotiation, competitor, threat, social security number, insult) are blocked by the right policy; the two prompt injections leak nothing and get no return approved. But the tenth case, a customer asking for another customer's data, hid a problem: the reply was a correct refusal, yet the trace showed the Orchestrator alone, with no initialization and no CommunicationAgent. Two fixes in the code: a hook that runs the CommunicationAgent if it wasn't called, and a customer check inside the DynamoDB tools themselves. Retest: ten out of ten.

**Defense in depth on whatever writes.** The tool that starts a return re-checks the status, the tier and the window, then makes a conditional write. Even a model fooled by an injection can't get the database to accept an ineligible return.

**A CloudWatch dashboard**: invocations, latency per agent, guardrail blocks. The execution role wasn't allowed to publish metrics; I wrote them to the logs in EMF format, which CloudWatch turns into metrics, without touching IAM.

**Session memory in DynamoDB.** Persistence worked after a simulated restart, but the reply forgot the previous turn: only the Orchestrator had the history, and the CommunicationAgent is the one writing. The fix: the code passes it the conversation history.

**A web front end with Cognito sign-in.** A page that queries the Runtime through a Lambda. The customer ID comes from the token, never from the browser: editing the request doesn't change who you are. And a Lambda function URL rather than API Gateway, because a multi-agent request takes 20 to 50 seconds, beyond its 30-second limit.

## What I keep

1. Whatever must always happen is enforced in code; the prompt only asks for it.
2. A good answer proves nothing: the trace shows the path.
3. Test a guardrail like code, before every version.
4. Any action that writes re-checks its own conditions.
5. Memory only helps if the right agent sees it.

A production note: the X-Ray timeline showed the retrievals weigh only 0.8 seconds out of the roughly 10.6 of the parallel search; the rest is the model calls of the three sub-agents. The rubric required them. In production, direct calls to the knowledge bases would do.

I told the story of this project as lessons in [an article on dev.to](https://dev.to/mialy333/from-finance-to-ai-engineering-6-lessons-i-learned-building-a-multi-agent-support-system-on-amazon-2fm1).
