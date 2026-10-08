---
workedOn: 2026-10-02
---

A smoke test is a quick test run right after a deployment, and it must be able to say "this deployment is bad". A service can answer "200", success, while inventing an answer to a broken request: a test that only checks "does it answer?" declares it healthy.

## The concept

Think of a pilot's pre-takeoff checklist. A checklist that always answers "OK" is worse than no checklist.

1. **Three probes**, always the same: the service's health, a real question, a deliberately broken request body.
2. You read the **status**, never the mere presence of a response.
3. A four-field **report**: `cold_start_ms`, `malformed_rejected`, `healthy`, `rollback`.
4. A **rollback sentence** written in advance.

## How I worked

As since Session 4: the code is written by the assistant, tested against the real grader and explained line by line; I reran the check myself before handing in. This was actually the first hand-in done under that rule.

## What the hand-in contains

**`smoke(request)`**, which the grader runs on four deployments: `warm`, `cold`, `lax` and `killed`.

- A `200` on a broken body isn't a rejection: `lax` is declared unhealthy.
- `killed` also returns a response body: the status settles it.
- For `cold`, the first call takes 1,900 ms. That's a number, not a verdict: "slow but healthy" and "fast but wrong" are two separate facts.
- The rollback sentence must contain an action, a number and a unit, with no "would" or "should".

When handing in, the course's `submit --push` command failed. It failed with the latest `gh` version too: the bug came from the course's script. I reported it in [issue #16](https://github.com/Gecko-Academy/dev3pack-cohort-2026-09/issues/16), and handed in by hand in the meantime.

## What I keep

- A good smoke test can fail: that's its job.
- "Slow but healthy" and "fast but wrong" are two separate facts: a number (the cold start) and a verdict (`healthy`).
- The rollback sentence is written before the outage, because during the outage nobody thinks.

## The defense question

> How do you know your deployment is good?

I run three probes: health, a real question, and a deliberately broken body, which must be rejected with a 4xx. If a single point fails, `healthy` turns false, and I redeploy the previous version within 5 minutes.

Result: 100/100, handed in through [PR #551](https://github.com/Gecko-Academy/dev3pack-submissions/pull/551). Limit: the smoke test didn't run on a real service, only on the grader's simulated deployments.
