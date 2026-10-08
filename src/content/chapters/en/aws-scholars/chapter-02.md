---
---

A customer support agent on Amazon Bedrock AgentCore, with the Strands SDK and the Amazon Nova 2 Lite model. It tracks an order, processes a refund, answers product questions through RAG, remembers the customer from one session to the next, computes an exact loyalty discount and browses the web.

**What was provided, what I did.** The course provided the skeleton: a `main.py` full of TODOs, the code of the two Lambda functions and a permissions script. My work: build the whole infrastructure by hand in the AWS console, write the six sections of `main.py`, deploy, get the six test scenarios passing, and debug whatever broke along the way.

## How the pieces fit together

An `agentcore invoke` command sends a message to the Runtime, a container hosted by AWS. Inside it, `main.py` creates a Strands agent. The model picks a tool, Strands runs it, the result goes back to the model, and so on until the final answer.

Tools come from four sources, and each one fails in its own way:

- **The Gateway**, an MCP server in front of my two Lambdas. The agent asks it for the tool list on every request. A broken Gateway doesn't crash the agent: a tool is simply missing.
- **The Knowledge Base**, a Python function that queries the product catalog.
- **The Code Interpreter and the Browser**, two sandboxes managed by AgentCore, started on demand.

Two memories coexist: session memory, which disappears when the conversation ends, and long-term memory, stored per customer and extracted within one to two minutes.

And two propagation rules never to confuse: the container is a **snapshot** (changing `main.py` does nothing without a redeploy), while IAM permissions are read **live** (a fix takes effect within a minute, no redeploy).

## What I built

**The infrastructure, by hand.** Two Lambdas, a REST API with three routes, the Gateway and its two targets, the Memory resource with two strategies (customer facts and preferences). One detail that matters: each route's operation name becomes the tool name the model sees.

**The six sections of `main.py`:**

- **RAG**: a `search_knowledge_base` tool whose description tells the model clearly *when* to call it, with a guard clause that returns a clear message if the Knowledge Base isn't configured.
- **Long-term memory**: a hook that, before each answer, searches all of the customer's memory spaces, tags each memory by type, then saves the exchange after the answer.
- **Loyalty discount**: the calculation runs in the Code Interpreter, with a pure-Python fallback if the sandbox is unavailable. The result always returns the same four fields.
- **Browser**, **configuration** and **entry point**: the agent is created and invoked inside the Gateway connection, so it stays open for the whole call.

**The build order.** From cheapest to most expensive. The Knowledge Base bills continuously as soon as it exists: it comes last. A first deploy without it already validates the pipeline (build, role, region), and the guard clause makes that partial deploy safe.

## The traps, logged in my runbook

- **A Gateway that fails silently.** A failed target returns an empty tool list, with no error. The agent politely answers "I don't have an order tool". The cause was on the API side: without 200/404/500 responses declared on the routes, the target is rejected.
- **Two opposite naming rules.** Gateway targets reject underscores; the agent name rejects hyphens. Same project, opposite conventions.
- **The wrong region.** The configuration tool picked my machine's default region, not the one where the Gateway and memory lived. It has to be set explicitly.
- **A polluted memory.** Without a customer ID, every test writes to the same "default customer", and the agent ends up answering a question nobody asked. Hence an explicit customer ID and a fresh session for every test.
- **A fallback that's too convincing.** If the Code Interpreter doesn't run, the Python fallback still answers, plausibly. Only the logs tell which of the two did the math.
- **A rejected push.** The deploy build folder, with a dependencies zip over 100 MB, had been committed by mistake. Removed from history and added to `.gitignore`.

## My debugging method

In this order: **isolate the layer before reading IAM**. A `curl` on the API to test the Lambda alone, the MCP inspector to test the Gateway without the agent, then the Runtime logs. And always **read the tool call, not the answer**: the model apologizes plausibly, only the logs show the tool name, its arguments and the raw result.

## The six scenarios

Tracking order ORD-001, refunding an e-reader, Platinum tier benefits through RAG, memory across two sessions ("I'm Jane, keep answers short", then a new session that remembers it), a Gold member's loyalty discount, and reading a web page's title.

## What I keep

1. Validate each layer alone before stacking it.
2. Create the most expensive resource last, and delete it the same day.
3. Read the tool call, not the answer.
4. A container is a snapshot; IAM is read live.
5. Hermetic tests: an explicit customer, a fresh session.

A production consideration: the Gateway ran without authorization, acceptable only in a sandbox. In production, never, and nothing sensitive should go through it.
