---
workedOn: 2026-09-25
---

A coding assistant can say "done" when it isn't. This first session teaches you to put one to work on a real project without taking its word for it.

## The concept

Think of a junior analyst preparing an investment memo. You approve their plan before they start, you check their numbers afterwards, and you never sign a memo you haven't verified. With a coding assistant, it's the same loop:

1. **Project instructions** (`AGENTS.md`) give it the rules of the repo.
2. It proposes a **plan**, without changing anything.
3. It makes the **smallest change**, approved one at a time.
4. I **test** with my own commands.
5. I **review the diff**, the exact list of changed lines, and reject what's wrong.

## What I did

The requested change: a `tags` filter in `tools.py`, applied after documents are retrieved.

- **The plan.** One file only. Choices made: a document passes if it carries at least one of the tags, filtering after retrieval, exact case, result cap kept.
- **First rejection, at the plan.** The proposed check, `bootcamp check ch04`, proved nothing: ch04 wasn't done yet and doesn't test `search_documents`.
- **Second rejection, in the code.** With `tags=[]`, the function passed the checks and then silently emptied the results: a failure that looks like a real answer.
- **The proof.** The assistant said it had fixed it. `git diff` showed it hadn't. A small script proved it before the fix, then after. Result: one file, +23/−2, lint green.
- **A script never reviewed.** I refused to run a verification script the assistant had written and I hadn't read.
- **The risk summary.** Two real risks, and two false claims: "no check has run", and "you're on `main`" while I was on a working branch.

The recurring pattern: the assistant asserts a state (fix, tests, branch) without having checked it.

## What I keep

- The assistant can state something false. Only the diff and my own commands count.
- A reasoned rejection is the proof that I actually reviewed.
- An empty input must be refused, never silently ignored.

I turned it into a rule in my `AGENTS.md`: never claim a fix, a check or a repo state without having verified it.

## The defense question

> Which change did you reject, and why?

I rejected a version where `tags=[]` silently returned "no results": a failure that looks like a real answer. The assistant said it had fixed it; `git diff` showed it hadn't, and my script proved it before and after the fix.

Result: 100/100, handed in through [PR #349](https://github.com/Gecko-Academy/dev3pack-submissions/pull/349).
