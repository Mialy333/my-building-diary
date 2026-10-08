---
workedOn: 2026-09-26
---

Talk to any model through a single door, and stay standing when it doesn't answer. Without a single door, switching providers means rewriting the agent; without error handling, a network outage becomes a crash the user sees.

## The concept

Think of a standard power socket: the appliance doesn't know which plant produces the electricity. And of a circuit breaker: if the power fails, it cuts cleanly instead of frying the appliance.

1. One method, `complete(system, user) -> str`, that every model must have: that's the **seam** between the agent and the model.
2. The `.env` file picks the **lane**: fake model, local Ollama, or cloud. The preflight checks that it answers, and falls back to the fake model otherwise.
3. The model call is wrapped in a `try/except` that catches `TimeoutError` and `OllamaError`.
4. On failure, the function still returns a normal answer: a **refusal**, with no citation, confidence 0, flagged for human review.
5. The technical cause goes into the **trace**, the run's log, not into the answer.

## What I did

- **Plugging in a real model.** Ollama with `qwen2.5:7b-instruct`, running locally. With the server off, the preflight fell back to the fake model and said so, without crashing. With the server up: `LIVE is the ollama lane`.
- **A wrong instruction, reported.** The first exercise said a question containing "hello" and "agent" would return the "agent" answer. It returned "hello". Reading the fake model's code, I saw it returns the first key found in insertion order: the rule is right, the instruction's sentence isn't. I reported it in the course's [issue #15](https://github.com/Gecko-Academy/dev3pack-cohort-2026-09/issues/15).
- **Two lanes, one question.** Fake model: similarity 1.00 with the expected answer. Qwen: 0.62, for two answers with the same meaning. That number measures characters, not meaning: "is" and "is not" would score high. Hence evaluating properties, later in the course.
- **My reliability bar.** Three criteria you can check with a yes or a no: the cited source stays the same; human review if the answer recommends moving funds, approving a spender or switching networks; never without approval, signing or broadcasting a transaction, or sending to a new address. An accepted limit: a consistent answer isn't necessarily a correct one.
- **`answer_with_timeout`, my cell.** `try/except (TimeoutError, OllamaError)`, a refusal with no citation, confidence 0, human review, and the error logged in the trace. A trap I fell into: my test block, badly indented, had ended up inside the function.
- **A measured timeout, not a guessed one.** With `time.monotonic`: 1.9 s on the first call, 0.3 s after that. I set the timeout to 3 s. The server's cold start, on the other hand, isn't measured.

A known gap at the end of the session: my function only handled failure. The path where the model answers is the subject of session 3.

## What I keep

- One method to talk to every model: you switch providers without touching the agent.
- An outage becomes a readable refusal; the technical cause goes into the trace.
- You set a threshold after measuring it, not by guesswork.

## The defense question

> What does the user see if the model doesn't answer?

A readable refusal, "The model did not respond.", with no citation and flagged for human review. The cause is in the trace, because the adapter can't tell slowness from a missing server. And my 3 s timeout comes from a measurement: 1.9 s, then 0.3 s.

Result: 400/400, handed in through [PR #373](https://github.com/Gecko-Academy/dev3pack-submissions/pull/373).
