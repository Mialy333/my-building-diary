---
workedOn: 2026-10-03
---

First you measure whether the right page reaches the model, then whether the answer actually cites the page that supports it. A rising number can hide a regression elsewhere, and an evaluation nobody ever attacked can be fooled by a model that cheats.

## The concept

Think of a backtest. A strategy optimized on the same data that grades it looks excellent, then fails out of sample.

1. A **labeled set**: question → expected document.
2. The **hit rate @k**: the share of questions whose right document is in the top k results.
3. **One change at a time**, then measure again.
4. Test it on **questions never seen before**.
5. **Attack your own evaluator** with a cheating fake model.

## How I worked

As since Session 4: the code and the sentences are written by the assistant, tested against the real grader and explained; I reran the check myself before handing in.

## What the hand-in contains

- **A rephrasing that misses.** "How do I cut a long text into smaller pieces before looking things up in it?" keeps the meaning (splitting into passages) but changes every word. The engine brings back three documents, never the one about RAG: with no shared word, it finds nothing.
- **An improvement and a regression, with numbers.** Query expansion takes the hit rate from 80% to 100% on the labeled set. On four unseen questions, @1 drops from 75% to 0%, and @3 from 75% to 50%. The rule added words to any question containing "instructions": it fixes one case and breaks the others.
- **The cheater's score.** A fake model that always cites the same document scores 50% (4 out of 8): three free refusals, and one false positive, with the right citation and a bogus sentence. The evaluator's weakness: it checks the cited ID, not that the answer's text comes from the document.

## What I keep

- A number measured on the cases you fixed is no proof: you need unseen cases.
- An honest report gives the improvement and the regression, with their numbers.
- You test an evaluation by trying to fool it.

## The defense question

> Your evaluation is at 100%, why distrust it?

Because a fake model that always cites the same document already scores 50%: refusals are free, and a correct citation can come with an invented sentence. You have to check that the answer is supported by the cited passage, not just that the ID is right.

Result: 300/300, handed in through [PR #557](https://github.com/Gecko-Academy/dev3pack-submissions/pull/557).
