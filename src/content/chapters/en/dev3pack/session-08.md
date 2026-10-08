---
workedOn: 2026-10-03
---

There are three ways to organize an agent: a fixed chain, a loop where the model decides, a reflection that reviews itself. And an explicit transition table makes its behavior readable. Without declared arrows, a refusal can turn into an answer, and a retry without a counter runs forever.

## The concept

Think of a trading floor's order approval circuit. Each step has allowed exits; a rejected order can't come back into execution through an unplanned path.

1. **Count** the model calls for each way of organizing the agent.
2. Know which one can **refuse before calling** the model.
3. Write the graph as a **table**: `(state, event) → next state`.
4. **Refuse** any pair missing from the table, without crashing.
5. Keep a **history that only grows**, to cap retries.

The declared arrows: `planning` leads to `retrieving` or `refusing`; `retrieving` leads to `answering` or `refusing`; `answering` and `refusing` lead to `done`. No arrow goes from `refusing` to `answering`.

## How I worked

As since Session 4: the code is written by the assistant, tested against the real grader and explained line by line; I reran the check myself before handing in.

## What the hand-in contains

- **The comparison table.** The chain costs 1 call. The tool loop costs 1 call, plus 1 on a retry. Reflection costs 2 to 3 calls. The loop and reflection can refuse early.
- **The LangGraph appendix, not run.** It's declared as such in the hand-in (`ran: False`), with the reason: an optional appendix, graded hand-ins first. No invented numbers.
- **`step(state, event)`.** It looks up the arrow in the table. Missing: the state and history come back unchanged, with a sentence naming the event and the state; no error, the machine stays put. Found: the destination state is **appended** to a new list. The history is never rebuilt, or you lose count of the visits to a state.

## What I keep

- Each way of organizing an agent has a cost in calls and failures of its own: you count them, you don't guess.
- A transition table makes anything undeclared impossible: a refusal never becomes an answer.
- A history that only grows lets you cap a retry.

## The defense question

> How do you stop your agent from answering after it decided to refuse?

The transitions are a table: there's no arrow from `refusing` to `answering`, so an "answered" event in that state is refused and the state doesn't move. And `done` has no outgoing arrow: that's what makes it terminal.

Result: 300/300, handed in through [PR #558](https://github.com/Gecko-Academy/dev3pack-submissions/pull/558).
