---
workedOn: 2026-10-02
---

You run the course's reference research assistant, check that it passes four gates, then honestly list what it still does badly. Passing your tests doesn't mean having no flaws: naming your limits before the demo saves you from discovering them on stage.

## The concept

Think of a stock order control tested only with perfect orders you wrote yourself. "Compliant" says nothing about a real trader in a hurry who types the wrong ticker.

The agent's circuit: question → retrieval → early refusal if nothing is found → prompt → model → parser → citation check → result. The four gates:

1. a cited answer, citation verified;
2. a refusal before any model call;
3. a readable trace;
4. the evaluation gate on the golden set.

The fifth step: the list of issues, ranked by impact.

## How I worked

The four gates were already written: I ran them. The fifth, the ranked list, is mine.

The grader first rejected it: "every issue needs a sentence, not a placeholder". I asked the assistant to write the sentences; it refused, since that was still my rule, and gave me a skeleton with blanks. I wrote ranks 2 and 3 myself, over several rewrites. The assistant only fixed one inaccurate word ("outside tools"). Rank 1 keeps the course's example.

Before starting, I also had to update the course repo without losing my work: a backup branch, a fast-forward update, then a targeted restore of my files.

## What the hand-in contains

- **Rank 2.** The evaluation gate runs on a fake model, so it shows neither hallucinations nor wrong answers. Impact: the report stays green while nobody sees the errors.
- **Rank 3.** A real model goes through the network, may never answer, and there's no timeout. Impact: the user waits with no answer and no error message.

It's the impact on the user that sets the rank, not the technical difficulty.

## What I keep

- A green test on a fake model proves the plumbing, not the quality of the answers.
- A network call without a timeout can block the user forever, with no error message.
- The impact on the user decides an issue's rank.

## The defense question

> Your evaluation is green: is your agent reliable?

Not proven yet: that green comes from a scripted fake model, it shows the circuit works when the model answers perfectly. With a real model, you have to measure wrong answers and cap the wait with a timeout, which I ranked 2 and 3.

Result: 500/500, handed in through [PR #545](https://github.com/Gecko-Academy/dev3pack-submissions/pull/545).
