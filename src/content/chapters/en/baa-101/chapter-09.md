---
---

## The principle

An evaluation is only worth what it checks. You read the details rather than the average, change one thing at a time, and try to fool your own evaluator.

## Why it matters

An average hides the shape of the results. A score measured on the cases you just fixed proves nothing. A judge that reads the answer doesn't see what the agent actually did. And a green test on a fake model proves the plumbing, not the quality.

## The mechanism

1. **A suite per behavior**: each expected path, the edge cases, the attacks.
2. **Read case by case**, not only the overall score.
3. **One variable at a time**, and a new name for each run, to compare cleanly.
4. **Unseen cases**: report the improvement and the regression, with their numbers.
5. **Attack the evaluator**: a fake model that cheats reveals the free passes.
6. **Know what produced the number**: which model, which file. A measurement taken on the wrong version is reported as false.

## In the field

- [AWS Scholars, chapter 1](/en/books/aws-scholars/chapter-01/): 0.92 over 13 cases means 12 perfect answers and one outright failure. And the judge scores the text, not the row written in the database.
- [Dev3Pack, Session 7](/en/books/dev3pack/session-07/): a fake model that always cites the same document already scores 50%.
- [Dev3Pack, cap01](/en/books/dev3pack/cap01/): an evaluation gate that's green on a fake model shows neither hallucinations nor wrong answers.
- [Dev3Pack, Final](/en/books/dev3pack/final/): a grade measured on the wrong file, set aside and reported as such.

## The question to ask

> What does this evaluation not check?
