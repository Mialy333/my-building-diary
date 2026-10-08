---
workedOn: 2026-10-03
---

Trace what the agent did, sort every failure into a bucket, and keep no secret in the traces. Without a trace, you fix things at random; with a trace that contains a key, you create a leak.

## The concept

Think of a trading floor's audit log: every order is recorded, but access codes never appear in it.

1. An **ordered trace**: `retrieve`, `llm_call`, `decision`.
2. Four failure **buckets**: `retrieval`, `tool_selection`, `instruction_following`, `formatting`.
3. Fix **the biggest bucket first**.
4. **Mask secrets** before writing the trace.

## How I worked

As since Session 4: the code is written by the assistant, tested against the real grader and explained line by line; I reran the check myself before handing in.

## What the hand-in contains

- **A failure classified from the trace.** The trace shows `retrieve → rag-basics`, then an answer with empty citations. The search found the right document; the model didn't use it. So the bucket is `instruction_following`, not `retrieval`: two opposite fixes.
- **`redact`, the masking.**
  - A value that isn't text is copied as is: nothing to search, and the function never crashes.
  - Each declared pattern (API key, token, email) replaces **every** occurrence with `[redacted:<type>:<fingerprint>]`.
  - The fingerprint, 8 characters of a hash, is the same for the same secret: you can follow a key across the logs without ever reading it.
  - The trap: in Python, without `label=label` in the small replacement function, every label would carry the loop's last type.

## What I keep

- The trace tells you where the failure is: search or model, two opposite fixes.
- You mask a secret by replacing it, never by deleting it: a hole looks like an absence.
- Same secret, same label: you can follow a key without reading it.

## The defense question

> Can your trace leak a key?

No: before writing an event, I replace keys, tokens and emails with a label carrying a fingerprint, and leave everything else intact. You can see a secret was there, without being able to read it.

Result: 200/200, handed in through [PR #554](https://github.com/Gecko-Academy/dev3pack-submissions/pull/554).
