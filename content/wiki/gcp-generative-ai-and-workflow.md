+++
date = '2025-01-24T11:14:04Z'
title = 'GCP Generative AI and Workflow'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development', 'generative', 'fine tuning']
+++

Generative AI is a type of artificial intelligence that generates content for you. This content can be multi-modal including text, code, images, speech, video, and even 3D.

It generates new content by learning from a massive amount of existing content such as text, image, and video.

The process of learning from existing content is called training, which results in the creation of a _foundation model_, which is usually a large model in the sense of a significant number of parameters, massive size of training data, and high requirements of computational power.

Todays, Google provide the following foundation models:

- __Gemini__ for multimodal processing
- __Gemma__, a light-weight open model for language generation
- __Codey__ for code generation
- __Imagen__ for image processing

A foundation model can then be used directly to generate content and solve general problems, such as content extraction and document summarization.

It can also be trained further with new datasets in your field to solve specific problems, such as financial model generation and healthcare consulting. This is called _fine tuning_.

Gen AI models can be accessed through [Vertex AI](/wiki/gcp-vertex-ai); it offers a range of tools for tuning your gen AI models and developing gen AI projects, like Vertex AI Studio and Model Garden.

## AI workflow on Vertex AI

1. __Input prompt__: Via the Vertex AI Studio UI, input a prompt—a natural language request to gen AI models.
2. __Responsible AI and safety measures__: The prompt undergoes responsible AI and safety checks, configurable through the UI or code.
3. __Foundation models__: The screened prompt proceeds to foundation models like Gemini multimodal or other gen AI models like Imagen and Codey based on your choices.
4. __Model customization__: Optionally, customize Gen AI models to fit your data and use cases by further tuning them.
5. __Results grounding__: Gen AI models return results that undergo grounding (optional) and citation checks to prevent hallucinations.
6. __Final response__: The final response appears on the Vertex AI Studio UI after a final check through responsible AI and safety measures.


## AI Solutions provided by Google Cloud

Google Cloud provides two types of Generative AI solutions:

- Vertical solutions, which focus on specific industries,
- Horizontal solutions, which solve problems across industries
