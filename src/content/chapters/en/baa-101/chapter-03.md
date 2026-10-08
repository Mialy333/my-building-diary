---
---

## The principle

The model never sees a tool's code. It sees a name, a description and a parameter schema, and it's the description that decides when the tool gets called.

## Why it matters

A vague description, and the model calls the wrong tool, or none at all. A tool that doesn't validate its arguments, and a malformed value triggers a useless or wrong action. And a description is text that enters the model's context: it can lie, or give orders.

## The mechanism

1. **Write every description for the model**: what the tool does, when to use it, its parameters, what it returns.
2. **Validate arguments before any action**. An error names the valid values, so the call can correct itself.
3. **Read-only by default**. Name, one by one, the tools that change state.
4. **Separate reasoning from acting**: the model decides, the tool executes, the system records. Each layer is tested on its own.
5. **Review a tool you didn't write** before plugging it in: a "read-only" label is a claim, not proof. And a tool that fetches an address decides before opening the connection.

## In the field

- [AWS Scholars, chapter 2](/en/books/aws-scholars/chapter-02/): the operation name of each API route becomes the name of the tool the model sees, and the search tool's description tells it when to call it.
- [Dev3Pack, Session 4](/en/books/dev3pack/session-04/): a negative amount or an unknown currency are refused before the call, and the refusal names the valid values.
- [Dev3Pack, Session 12](/en/books/dev3pack/session-12/): of sixteen tools advertised by a server, only two can move money.
- [Dev3Pack, Session 13](/en/books/dev3pack/session-13/): a guard decides, on the string alone, whether an address is allowed, before any request.

## The question to ask

> If I only read the name and the description, would I know when to call this tool, and what it can break?
