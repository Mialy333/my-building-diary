---
workedOn: 2026-10-03
---

Find the right passages in a corpus with a word-based search, and be able to say why it misses when it misses. If the right passage never reaches the model, no instruction will save the answer.

## The concept

Think of a bank's document management system: you search for a client file by keywords, and a single synonym is enough to make it invisible.

1. A **loader** that refuses a malformed file.
2. **Splitting** documents into passages.
3. An **index** from tag to documents.
4. A **score** based on words shared between the question and each passage.
5. **Read what comes back** and give a verdict: `good`, `missed`, `irrelevant` or `duplicated`.

## How I worked

As since Session 4: the code is written by the assistant, tested against the real grader and explained line by line; I reran the check myself before handing in.

## What the hand-in contains

- **A loader that refuses.** An empty file, or one whose first line isn't a `# ` title, raises an error that names the file. A half-document would go unnoticed in the results. The file name without `.md` becomes the document's ID.
- **A sorted index.** Each tag points to the list of its documents, sorted so the index is identical on every machine.
- **Two verdicts, read from the output.** `missed`: "vector embeddings…" shares no word with the corpus, so nothing comes back. `duplicated`: for "citations", the same document takes two of the three slots.

An incident on my side: I ran `check` and `submit` from the hand-in folder instead of the course folder. The hand-in was written to the wrong place and the branch went out empty. I cleaned everything up, then reran from the right folder.

## What I keep

- A retrieval score measures shared words, not relevance: you read what came back.
- A loader must refuse rather than return half a document.

## The defense question

> Why does your question about "embeddings" bring back nothing?

Because the search counts the words the question shares with the corpus, and no document uses those words. It isn't a bug: it's the limit of a lexical search, which misses synonyms and absent vocabulary. Hence the `missed` verdict, given by reading the output, not the score.

Result: 300/300, handed in through [PR #556](https://github.com/Gecko-Academy/dev3pack-submissions/pull/556).
