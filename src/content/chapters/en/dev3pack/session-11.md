---
workedOn: 2026-10-03
---

An agent can remember a preference and the latest questions, provided it first writes down what it keeps, for whom, and for how long. A memory with no owner or no limit leaks from one user to another, grows without end, or keeps what it never should have: a key, an address.

## The concept

Think of a private bank's client file. One file per client, never read by another adviser without the right to, and a retention policy written before the first file is opened.

1. A **minimal state**: one preference, and the last five exchanges.
2. The preference **changes the question before** the model call.
3. A written **storage policy**.
4. A memory indexed by **`(user, key)`**.
5. **Copies** on the way in and on the way out.

## How I worked

As since Session 4: the code and the storage policy are written by the assistant, tested against the real grader and explained line by line; I reran the check myself before handing in.

## What the hand-in contains

- **`answer_with_state`.** If the preference is "short", the question gets "(answer briefly)" **before** the model call. `.get` avoids an error when the preference doesn't exist. Then `del state.episodes[:-5]` erases everything but the last five exchanges: the memory has a cap.
- **The storage policy**, in five lines: what is kept, why, how to correct it, when it expires, and what it refuses to keep: secrets, wallet keys, personal data.
- **`MemoryStore`.**
  - An empty or missing user ID is refused, on write as on read.
  - The key is the pair `(owner, key)`: two users can each have their own `locale`.
  - A missing key returns `None`, without looking anywhere else.
  - `deepcopy` on the way in and out: nobody changes the memory by editing their own list.

## What I keep

- You write the memory policy before storing anything, refusals included.
- A memory is filed by owner, never in a shared bucket.
- Return a copy, not the object: otherwise the reader becomes a second writer.

## The defense question

> Does your agent mix up two clients' memories?

No: every value is filed under the pair (user, key), an empty user is refused, and a missing key returns `None` without looking anywhere else. And the written policy refuses to keep secrets, wallet keys and personal data.

Result: 300/300, handed in through [PR #559](https://github.com/Gecko-Academy/dev3pack-submissions/pull/559).
