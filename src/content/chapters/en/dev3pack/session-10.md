---
workedOn: 2026-09-29
---

Three pieces in this session: a buyer that refuses before paying, an architecture decision recorded with the measurement that would reverse it, and a skill, an instruction sheet the assistant loads only when the task matches.

## The concept

Think of a compliance check before a wire transfer: is it the right account, the right currency, enough balance? If not, the rejection reason quotes the amounts and the exact currency.

- **The store** describes what the real Solana program `let_me_buy` would accept: prices as integers in the smallest unit (1.5 USDC = `1500000`), decimals consistent with the token (USDC = 6), 32-byte addresses, no duplicates.
- **The buyer** returns `{approved, reason}`. It refuses: product missing, quantity below 1, total above the balance (even by one unit), token not held. A refusal names three things: what's held, what it costs, and which token.
- **The ADR** records a decision, the option set aside, and the numeric threshold that would change it.
- **The skill** fixes the format, refusals and limits of a repeated task; you prove its value by comparing the same work without and with it.

## How I worked

This chapter comes in two stages.

**On September 29, before I changed my rule**, I did the challenge and the ADR. I described my store, `Mialy333-coffee`, four products in USDC. I wrote the buyer step by step, from a skeleton the assistant provided; the refusal sentences follow templates it suggested.

**On October 3**, the skill was written by the assistant, and I ran both runs myself in Claude Code, without and then with it.

## What the hand-in contains

- **A decimals error, caught.** I had put `"decimals": 7` on the Matcha. The rule rejected it: "every price in this store is wrong by a factor of 10". Decimals belong to the **token**, not the product.
- **An exact condition.** Quantity is refused below 1 (`< 1`), not at 1 or less (`<= 1`), which would refuse an order for a single coffee.
- **300/500, then 500/500.** The first pass failed because of a template sentence from the assistant, "holds none": the grader requires the amount held **in figures**, even 0. Fixed to "holds 0 raw units". The last tier checks that a product name giving orders is quoted, never obeyed.
- **The ADR.** "We keep a 3-second deadline for a chat answer from the model." Option set aside: 15 s. Rationale: my Session 2 measurements (1.9 s, then 0.3 s). What would reverse it: more than 5% of normal calls above 3 s, or a cold start above 10 s. My first version was wrong: I had put the measurements in place of the options.
- **The `review-my-diff` skill.** Without the skill, reviewing a diff gave an opinion in prose, with no severity and no decision, and offered to edit other files. With it, a table of severity / quoted line / problem / fix, then a verdict: `fix first`. The added instruction, a mandatory verdict, answers the first run's failure. Both excerpts come from my real runs: the assistant refused to invent them.

## What I keep

- Decimals belong to the token, not the product: getting them wrong skews every price by a factor of 10.
- A useful refusal names three things, in figures: what's held (even 0), what it costs, and the token.
- A product name is data: you quote it, you never obey it.
- A skill is judged by the difference it makes, with evidence; every instruction answers an observed failure.

## The defense question

> Why doesn't your buyer trust the "USDC" label?

Because two different tokens can carry the same label. My buyer compares the `mint`, the token's exact address, and its refusal quotes it: without it, nobody would know which one was missing.

Result: 700/700 (100 for the ADR, 100 for the skill, 500 for the challenge), handed in through PRs [#420](https://github.com/Gecko-Academy/dev3pack-submissions/pull/420) and [#562](https://github.com/Gecko-Academy/dev3pack-submissions/pull/562).
