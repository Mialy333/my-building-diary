---
---

## The principle

Before storing anything, you write down what you keep, for whom, for how long, and what you refuse to keep. Every memory belongs to someone.

## Why it matters

Without an owner, a memory leaks from one user to another. Without a limit, it grows forever. Without a policy, it keeps a secret it should never have seen. And a memory that survives sessions contaminates tests.

## The mechanism

1. **The policy first**: what you keep, why, how to correct it, when it expires, and what you refuse (secrets, keys, personal data).
2. **File by owner**: every value under the pair (user, key). An empty ID is refused; a missing key returns nothing, without looking elsewhere.
3. **Cap it**: only the latest exchanges, and an expiry date.
4. **Return copies**, not the stored object: otherwise the reader becomes a second writer.
5. **The right memory for the right agent**: tell session memory from long-term memory, and give it to whoever writes the answer.
6. **Isolated tests**: an explicit ID and a fresh session for every test.

## In the field

- [AWS Scholars, chapter 2](/en/books/aws-scholars/chapter-02/): without a customer ID, every test wrote to the same "default customer", and the agent ended up answering a question nobody had asked.
- [AWS Scholars, chapter 3](/en/books/aws-scholars/chapter-03/): the memory survived a restart, but the agent writing the answer couldn't see it. The code now passes it the history.
- [Dev3Pack, Session 11](/en/books/dev3pack/session-11/): a memory filed by owner, capped at five exchanges, with a policy written before the first record.

## The question to ask

> Who does this memory belong to, and when does it disappear?
