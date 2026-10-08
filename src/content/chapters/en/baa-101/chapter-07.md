---
---

## The principle

An agent that answers from documents is only as good as what its search brings it. If the right passage never reaches the model, no instruction will save the answer.

## Why it matters

People often fix the prompt when the failure is upstream. A word-based search misses synonyms; a knowledge base that mixes domains brings back stray passages; a cut passage can lose the sentence that answers.

## The mechanism

1. **Measure the search on its own**: a set of questions with the expected document, and the share of questions whose right document lands in the top results.
2. **Read what comes back** (missed, off-topic, duplicate), not just the score.
3. **One change at a time**, also tested on questions never seen before.
4. **Separate sources by domain**, and check they're up to date: an empty source returns nothing, with no error.
5. **Send enough context**: sometimes the whole document rather than a fragment.

## In the field

- [Dev3Pack, Session 6](/en/books/dev3pack/session-06/): "vector embeddings" shares no word with the corpus, so nothing comes back.
- [Dev3Pack, Session 7](/en/books/dev3pack/session-07/): a fix takes the labeled set from 80% to 100%, but drops unseen questions from 75% to 0% on the first result.
- [Dev3Pack, Final](/en/books/dev3pack/final/): the trace showed the answering passage was never retrieved. The fix: send the selected documents whole.

## The question to ask

> Before blaming the model: was the right passage in what it received?
