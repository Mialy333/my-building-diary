---
workedOn: 2026-10-03
---

A tool that fetches URLs must decide on the string itself, before any request, whether the address is allowed. And every action runs at the lowest level that's enough. Otherwise it can be steered toward the internal network or toward the address that hands out cloud credentials (an SSRF attack), or a demo becomes real spending without anyone deciding it.

## The concept

Think of a trading floor's list of approved counterparties. You check the counterparty before sending the order, not after, and some orders never go through from a demo account.

1. A rule on the **protocol**: http or https.
2. A rule on the **address**: private, local, or `127.0.0.1` disguised as a single number.
3. A **list of allowed domains**, and their subdomains.
4. The **lowest level** for each action: recording, public read, fork, never.
5. An **honest attestation** of what you did.

## How I worked

The URL guard and the levels were written by the assistant, tested against the real grader and explained line by line. The attestation, though, is mine: the assistant refused to tick it for me.

I answered the questions myself: I never entered a key, a recovery phrase or payment data, and I committed no hosted URL. I ticked two more boxes once I understood what they covered. I declared that I hadn't run the fork level (`ran_the_fork_lane = False`). The final sentence only states what's proven: reads through `curl`, a disposable address, no key.

## What the hand-in contains

**`fetch_guard`**, tested on the grader's 31 URLs, where the reason for the verdict matters as much as the verdict.

- `urlsplit(url).hostname` reads the real host: in `https://example.com@evil.net/`, it's `evil.net`.
- The address is read in all its forms: written normally, in hexadecimal, or as a single number. `2130706433` is `127.0.0.1`.
- A private or local address, or `169.254.169.254` (the cloud credentials one), is refused: `not-public`.
- `host.endswith("." + domain)`: the dot stops `evil-example.com` from passing for `example.com`.
- No exception escapes: every URL gets a verdict and a reason.

## What I keep

- You decide before opening the connection, never after.
- An address can be disguised; you read it with a parser, not by eye.
- You tick an attestation only if it's true; "no" is an honest answer.

## The defense question

> Could your demo have spent money?

No: I only used recordings and public reads, with a disposable address and no private key anywhere, so nothing could sign. Signing is only possible on a fork, which I didn't run, and spending on mainnet isn't allowed at any level.

Result: 300/300, handed in through [PR #561](https://github.com/Gecko-Academy/dev3pack-submissions/pull/561).
