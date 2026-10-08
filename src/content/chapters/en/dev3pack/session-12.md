---
workedOn: 2026-10-03
---

An MCP server advertises tools by name and description. You have to read what it really offers, spot the ones that can act, and refuse the ones whose description lies or gives orders: a tool description goes straight into the model's context, and a sentence hidden in it is an order written by a stranger.

## The concept

Think of a fund's prospectus. You read it, but what matters is what the fund can actually do with the money, not its name.

1. **List the names**: tools, resources (by URI), prompts.
2. Spot what is **advertised but empty**.
3. **Classify the tools**: read, build unsigned bytes, change state.
4. **Review every tool** before exposing it to the model.

## How I worked

As since Session 4: the code is written by the assistant, tested against the real grader and explained line by line; I reran the check myself before handing in.

## What the hand-in contains

- **`describe_surface`.** For each collection, it reads the `name` or `uri` of each entry; a missing collection gives an empty list. A capability advertised with nothing behind it (`advertised_but_empty`) is a signal to report, not a zero.
- **The classification of Orquestra's 16 tools**, Gecko's Solana server: 10 read, 4 build unsigned bytes, which do nothing until someone signs, and only 2 change state, `try_purchase` and `submit_transaction`. `prepare_purchase` looks dangerous and isn't: it prepares a transaction, but doesn't sign it.
- **`review_tool`.** It refuses a description that gives an order, a "read-only" tool whose description talks about writing (both conditions together), and any wildcard permission `*`.

Two paste errors on my side, in the same cell: a line pasted inside the `return` (`SyntaxError`), then two old lines left under the new code, which overwrote the result (`tools 0`). In Python, the last assignment wins.

## What I keep

- A name and a "read_only" label are claims, not proof.
- Few tools can really move money: you name them.
- In Python, the last assignment wins: an old line left under the new code cancels it.

## The defense question

> Which of these tools are dangerous?

Of Orquestra's 16 tools, only `try_purchase` and `submit_transaction` change state; the others read or prepare unsigned bytes. My agent signs nothing without checking every field, and I read every tool description as data, not as an instruction.

Result: 300/300, handed in through [PR #560](https://github.com/Gecko-Academy/dev3pack-submissions/pull/560).
