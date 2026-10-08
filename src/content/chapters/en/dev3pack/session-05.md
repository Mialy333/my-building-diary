---
workedOn: 2026-10-03
---

A mini-agent is a loop that runs a plan of tool calls, and always stops while saying why. A loop without exits spins idle, spends without limit, or crashes on a tool error.

## The concept

Think of a stock order with a cap and a stop: you know in advance under which conditions it stops, and the statement says which one triggered. The loop has four exits, tested in this order:

1. **`answered`**: the plan has the answer.
2. **`repeated_call`**: the same tool, with the same arguments, as the previous call.
3. **`budget`**: the call cap is reached, checked **before** the call.
4. **`tool_error`**: a tool refused.

Each run returns a receipt: `{steps, stopped_because, answer, refusal}`.

## How I worked

Same rule as in Session 4: the assistant writes the code, tests it against the real grader before handing it to me, and explains it; I review, run, hand in, and defend it.

## What the hand-in contains

**`run_loop` and its four exits.**

- `answered` isn't a call: it's never counted in `steps`.
- `repeated_call`: the last call is kept as `(name, arguments)`; the same pair twice in a row signals an idle loop.
- `budget`: `len(steps) >= budget` is tested **before** the call, so there's never one call too many. A plan that runs out without an answer also exits here.
- `tool_error`: a `try/except ToolError` turns the error into a refusal that names the tool, instead of a crash.

**The weekly challenge: a bot `respond(text, chat)`**, with `run_loop` behind it.

- A repeated message doesn't use up a call.
- Five calls per conversation, then "come back in 1 hour": a budget that recovers.
- A tool of its own, `page`, which refuses an unknown ID.
- A non-existent tool refused cleanly, and the loop's exit visible in the reply.

The first attempt came out at 400/500: an unknown tool raised a `KeyError` instead of a refusal. Once fixed, it reached 500/500. That's exactly the failure the session teaches you to avoid.

## What I keep

- An agent loop is designed by its exits: you first write how it stops.
- The budget is checked before the call, never after.
- A tool error becomes a readable refusal, not a crash.

## The defense question

> What keeps your agent from going in circles?

Two exits. The same call twice in a row triggers `repeated_call`, and a budget counted before each call triggers `budget`. Either way, the person reads a sentence that says why it stopped.

Result: 700/700 (200 for the session, 500 for the challenge), handed in through [PR #553](https://github.com/Gecko-Academy/dev3pack-submissions/pull/553).
