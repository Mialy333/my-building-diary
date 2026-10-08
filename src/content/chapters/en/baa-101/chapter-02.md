---
---

## The principle

An agent is a loop: the model reads the message, chooses to answer or to call a tool, reads the result, then starts again. A loop is designed by its exits first: you write how it stops before writing what it does.

## Why it matters

A loop without exits spins idle, spends without limit, or crashes on the first tool error. And without rules on what may follow what, an agent that decided to refuse can end up answering anyway.

## The mechanism

1. **The loop**: message → model → tool call → result → model → … → answer. A framework can run it for you, or you write it; either way, its exits are yours.
2. **Exits first**: an answer, a call identical to the previous one, a budget reached, a tool error.
3. **The budget is counted before the call**, never after: there's never one call too many.
4. **Every stop says why**, in one readable sentence.
5. **Transitions are declared**: a table "state + event → next state". Anything not in it is refused, and the state doesn't move.
6. **The shape is chosen by counting**: a fixed chain costs one model call, a loop one call plus a possible retry, a reflection two to three.

## In the field

- [AWS Scholars, chapter 2](/en/books/aws-scholars/chapter-02/): the agent picks a tool, the framework runs it, the result goes back to the model, until the final answer. A missing tool doesn't crash the loop: it's simply missing.
- [Dev3Pack, Session 5](/en/books/dev3pack/session-05/): a loop with four exits. The bot's first attempt crashed on an unknown tool instead of refusing it.
- [Dev3Pack, Session 8](/en/books/dev3pack/session-08/): no arrow leads from "refusing" to "answering", so a refusal never becomes an answer.

## The question to ask

> How does this loop stop, and what do you read when it stops?
