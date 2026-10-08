---
---

## The principle

The prompt asks, the code guarantees. A rule that must hold every time (an order of execution, a mandatory step, a condition before writing) is checked in code, not only in the instructions.

## Why it matters

A model follows its instructions most of the time. A rule reduces a behavior without eliminating it, and a long prompt is followed less well than a short one. For an action that writes, pays or commits, "most of the time" isn't enough.

## The mechanism

1. **List the invariants**: what must always happen, what must never happen.
2. **A code mechanism for each**: sequential execution, a forced final step, a field check, a conditional write.
3. **Pin the request** before the action exists, and compare the action to that pin before acting.
4. **Split the roles**: judgment to the model, execution and verification to the code.
5. **Test that the guarantee holds even when the model gets it wrong.**

## In the field

- [AWS Scholars, chapter 1](/en/books/aws-scholars/chapter-01/): a permissive rule let through a ticket filled with nothing. In production, field validation would go in the tool, not in the prompt.
- [AWS Scholars, chapter 3](/en/books/aws-scholars/chapter-03/): "one tool at a time" was in the prompt, and the framework ran the tools in parallel. Fixes in code: a sequential executor, a forced final step, the customer check inside the tools.
- [Dev3Pack, Final](/en/books/dev3pack/final/): the model chooses the paragraphs, the code copies them, and citations can no longer be invented.
- [Dev3Pack, Gecko](/en/books/dev3pack/gecko/): the request is pinned before the transaction, and nothing is signed until every field matches.

## The question to ask

> If the model ignored this instruction once in a hundred times, what would happen?
