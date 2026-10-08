---
---

## The principle

Refusing is a normal answer from the system, not a silence or a crash. A refusal has a shape, a reason, and it comes as early as possible.

## Why it matters

A silent failure looks like a real answer. A crash shows the user a technical error. A late refusal spends calls for nothing.

## The mechanism

1. **Refuse before calling the model** when nothing backs the answer: an empty search costs zero calls.
2. **An outage becomes a readable refusal**: an exceeded timeout or a silent provider give a normal answer, and the technical cause goes into the trace.
3. **An empty or invalid input is refused explicitly**, never silently ignored.
4. **A useful refusal names what's missing**, in figures: the field, the value asked for, the value found.
5. **A refusal is flagged for human review.** And you also measure the other risk: refusing what you could have answered.

## In the field

- [Dev3Pack, Session 2](/en/books/dev3pack/session-02/): if the model doesn't answer, the user reads "The model did not respond.", with a timeout set to 3 s after measuring.
- [Dev3Pack, Session 3](/en/books/dev3pack/session-03/): an off-corpus question is refused without any model call.
- [Dev3Pack, Session 6](/en/books/dev3pack/session-06/): a file without a title is refused, rather than returning half a document.
- [Dev3Pack, Gecko](/en/books/dev3pack/gecko/): "two espressos" is refused on quantity, naming both values (2 asked, 1 prepared), and nothing is signed.

## The question to ask

> When this system can't answer, what does the user see, and what did it cost?
