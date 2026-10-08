---
---

## The principle

What an agent says it did is not proof. Only the effect observed in the system counts: a row in a database, a file, a diff, a transaction.

## Why it matters

A model produces plausible text. It can announce a ticket created, a fix applied, a check run, without any of it having happened. The conversation looks right, and so does the score: neither of them looks at the system.

## The mechanism

1. For each action, **name the observable effect** it must leave: a row, a file, a diff, a balance.
2. **Check that effect through another path** than the agent itself: a database query, `git diff`, a read of the blockchain.
3. **Cross-check**: the same ID must appear in the conversation and in the system.
4. Build the report **from the effect you read**, not from what the agent announces.
5. When the rule matters, write it **in the tool's code**, not only in the prompt.

## In the field

- [AWS Scholars, chapter 1](/en/books/aws-scholars/chapter-01/): the chatbot gave out invented ticket numbers, without ever calling the tool. The evaluation showed 0.92; only a scan of the DynamoDB table revealed the problem.
- [Dev3Pack, Session 1](/en/books/dev3pack/session-01/): the coding assistant announced a fix that wasn't in the file. `git diff` showed it, and a small script proved it before and after the fix.
- [Dev3Pack, Gecko](/en/books/dev3pack/gecko/): a purchase receipt is written from two reads of the blockchain, before and after, never from the send's response.

## The question to ask

> Where, in the system, can I see that it really happened?
