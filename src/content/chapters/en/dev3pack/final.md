---
workedOn: 2026-10-03
---

The final assignment: my own repo holds the course's research agent, and a private grader asks it 15 questions I never see. It passes with at least 30% correct answers **and** all 6 critical questions. It's the only grade that leads to the certificate. With the fake model, the agent scores 27% and misses both conditions: without a real model, all it can do is refuse.

## The concept

Think of an external audit. You don't know the questions; you prepare on a training set of 10 questions, and compliance on the critical points decides.

The starting agent is the pipeline built session after session: the model adapter, structured outputs, bounded tools, retrieval, verified citations, refusal when nothing backs the answer.

## How I worked

The agent's code was written by the assistant, tested offline before each delivery and explained. The choice of model and every run are mine. I chose to stay on a local model, with Ollama, rather than pay for an API. I started with `qwen2.5:7b-instruct`, then moved to the 14B version, which my 36 GB of RAM allowed. Every score below comes from a grade I ran myself.

## What happened, measurement after measurement

**Getting started.** My first attempt at creating the repo failed, and the next commands, not chained, ran in the wrong folder: 85 packages removed, a stray commit, an empty GitHub repo. I repaired everything, then recreated the repo cleanly. The lesson: chain with `&&`, so a command only runs if the previous one succeeded.

**The baseline.** Fake model: 3/10. Qwen 7B: 4/10, and the critical gate fails on two questions. The trace and the grader's code show why: the model rephrases instead of quoting, sometimes cites documents retrieved by mistake, and its first JSON contained a raw line break, which wasted the only retry.

**The 14B and a rewritten agent: 5/10.** The trace of a critical question shows the answering passage was **never retrieved** by the search: the model answered with a stray passage. Worse, the citation filter removed the right citation: an error by the assistant, fixed. The fix: keep at most two documents, those whose best passage reaches 60% of the top score, and send them **whole**. An accepted limit: that 60% threshold was chosen by looking at the training set's scores.

**A false measurement.** The new file had been copied as `agent-2.py`, while the grader reads `agent.py`. The 4/10 it got therefore measured the old version, and its differences came from the model's randomness, not the code. Since then, I check which file is running (`grep -c` on a sentence unique to the new version) before reading a score.

**The right version: 6/10.** A single critical question still fails: the model turns the document's sentences into headings ("bounding capabilities" instead of "bound capabilities"), and the grader no longer finds the source in the answer.

**Four prompt tweaks, no stable effect.** Copy word for word: one critical question passes, another breaks. An assistant hypothesis about quotation marks: the trace doesn't confirm it. Require complete paragraphs: 5/10. Each fix moved the failure from one question to another.

**The architecture change.** The model no longer writes: it **chooses** the numbers of the paragraphs that answer. The application copies them word for word, and the citations follow from the chosen paragraphs: they can no longer be invented. No paragraph chosen means the standard refusal. Result: **9/10 twice in a row**, critical gate passed.

**Before handing in.** A dry run gives 11 answers and 4 refusals on the private questions. In the answers, the assistant spotted glued words ("therefusal", "isa"): on those answers, the model had copied the paragraphs itself instead of returning their numbers, and lost spaces. The fix: a free answer that reuses at least half the words of a paragraph is replaced by that exact paragraph.

**The official result: 15/15.** All 6 critical questions pass: two adversarial questions and four refusals. So the dry run's four refusals were right.

## What I keep

- A small model writes badly but chooses well: let it choose, and let the application copy.
- Citations that follow from what's copied can't be invented.
- Every fix is validated by a measurement, and a false measurement is reported as such.

## The defense question

> Why does your agent pass with a 14-billion-parameter local model?

Because the model doesn't write: it points to the paragraphs that answer, and the application copies them word for word, with the citations that follow from them. What's left to the model is judgment: which paragraph, or refuse. The rest is checked by code: documents sent whole, an injection guard, a timeout, the standard refusal.

Result: 15/15 (100%), certificate earned, handed in through [PR #591](https://github.com/Gecko-Academy/dev3pack-submissions/pull/591).
