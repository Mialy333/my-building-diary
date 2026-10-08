---
---

## The principle

What the model returns must cross a boundary before it enters the program: a fixed schema, and a strict parser that accepts or rejects it. Otherwise, a refusal.

## Why it matters

Free text can't be checked: where's the source, what confidence? A model can cut its answer short, invent a field, rephrase a citation, or display certainty that nothing justifies.

## The mechanism

1. **A schema** fixes the shape of the answer: the text, the cited sources, a bounded confidence, a human-review flag.
2. **A strict parser** checks the format, the exact fields (none missing, none extra), the types and the bounds. Its message names the error.
3. **One corrective retry**: the model gets its error back. If it fails again, a flagged refusal.
4. **The less the model writes, the less there is to check**: you can make it choose (passage numbers) and let the code copy. The citations then follow from what's copied, and can no longer be invented.
5. **A confidence the sources don't justify** is a warning sign, not a detail.

## In the field

- [Dev3Pack, Session 3](/en/books/dev3pack/session-03/): a numeric citation (`[42]`) rejected by the parser; a stubborn model still wrapping its JSON in prose on the second attempt, then a flagged refusal; a confidence of 1.0 on a single document.
- [Dev3Pack, Final](/en/books/dev3pack/final/): after four prompt tweaks with no stable effect, the model stopped writing and started choosing paragraphs, which the code copies. Result: 9/10 in training, then 15/15.

## The question to ask

> What in this answer was checked by code before being shown?
