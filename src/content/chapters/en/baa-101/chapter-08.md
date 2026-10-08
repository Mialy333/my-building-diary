---
---

## The principle

To understand what an agent did, you read its trace: which tool, with which arguments, for which raw result. The final answer is just plausible text.

## Why it matters

A model apologizes convincingly, and a good answer can hide a bad path. Without a trace, you fix things at random. With a trace that holds secrets, you create a leak.

## The mechanism

1. **Trace every step**: the search, the model call, the tool call, the decision, with their arguments and results.
2. **Isolate the layer**: test the tool alone, then through the agent, before looking further.
3. **Classify every failure** before fixing it (search, tool choice, instruction not followed, format), and handle the most frequent first.
4. **Mask secrets** by replacing them with a stable label, never by deleting them: a hole looks like an absence.
5. **Be able to say in one sentence** which event in the trace decided the result.

## In the field

- [AWS Scholars, chapter 2](/en/books/aws-scholars/chapter-02/): isolate the layer first, then read the logs, which show the tool's name, its arguments and the raw result, where the model only apologizes.
- [AWS Scholars, chapter 3](/en/books/aws-scholars/chapter-03/): the trace showed an agent launched before the one it depended on, then, on a correct refusal, an orchestrator that had skipped all its rules.
- [Dev3Pack, Session 9](/en/books/dev3pack/session-09/): the trace tells a document found but ignored by the model from a document never found, two opposite fixes. And secrets go into it masked.

## The question to ask

> Which line of the trace decided this result?
