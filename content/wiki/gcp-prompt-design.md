+++
date = '2025-01-24T11:59:24Z'
title = 'GCP Prompt Design'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development', 'generative', 'fine tuning', 'prompt crafting']
+++

Prompt design or prompt crafting is a fundamental skill for utilizing generative AI effectively.

There are 3 main methods that we can use to shape the model's response to our desire:

1. __Zero-shot prompting__ is a method where the model is given a prompt that describes the task without additional examples.
2. __One-shot prompting__ is a method where the LLM is given a single example of the task that it is being asked to perform.
3. __Few-shot prompting__ is a method where the model is given a small number of examples of the task that it is being asked to perform.

## Structured Prompts

On [Vertex AI](/wiki/gcp-vertex-ai) we can use the _structured prompt_ mode to construct a more sophisticated prompt.

The structured mode allows you to provide:

- Context: instructs how the model should respond; it applies each time you send a request to the model.
- Examples: examples of questions, such as "What does LGM stand for?"; You also need to include the corresponding answers to demonstrate how you want the model to respond.
- Tests:  test the prompt you’ve designed by sending a new question as input.

## Best Practices

- the prompt needs to be concise
- be specific and write clearly-defined prompts
- ask one task at a time
- include examples


## Save prompts and model parameters

If you designed a prompt that you think is working pretty well, you can save it and return to it later. Your saved prompt will be visible in the prompt gallery, which is a curated collection of sample prompts that show how generative AI models can work for a variety of use cases.

In addition to testing different prompts and prompt structures, there are a few model parameters you can experiment with to try to improve the quality of the responses:

- Model type and version
- Temperature: a number used to tune the degree of randomness; low -> less random (narrow the range of possible words to higher probability words), best for Q&A and summarization; high -> more random (extend the range of possible words to include lower probability words), better for creative answers
- topP: allows the model to return a random word from the smallest subset with the sum of the likelihoods that exceeds or equals to P; e.g.  P of 0.75 means you sample from a set of words that have a cumulative probability greater than 0.75.
- topK: lets the model randomly return a word from the top K number of words in terms of possibility

These parameters all adjust the randomness of responses by controlling how the output tokens are selected.

When you send a prompt to a model, it produces an array of probabilities over the words that could come next. And from this array, you need some strategy to decide what it should return.

A simple strategy might be to select the most likely word at every timestep, but this method can result in uninteresting and sometimes repetitive answers.

By controlling the degree of randomness, you can get more unexpected and, some might say, creative responses.
