+++
date = '2025-01-23T13:47:36Z'
title = 'GCP AI Development Options'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql', 'development']
+++

GCP offers several options to develop and deploy AI solutions:

- [Pre-Trained APIs](/wiki/gcp-pre-trained-apis): don't have training data and/or lack experience; preconfigured solution; use ML models that Google already built and trained
- BigQueryML: low code solution for data analysts; use SQL queries to create and execute machine learning models in [BigQuery](/wiki/gcp-big-query)
- [AutoML](/wiki/gcp-auto-ml): low code solutions for data scientists; apply a no-code solution to build ML models on [Vertex AI](/wiki/gcp-vertex-ai).
- [Custom training](/wiki/gcp-custom-training): code your own ML environment to have control over the ML pipeline.

|                                 | Pre-trained APIs                   | BigQueryML      | AutoML                      | Custom Training             |
|---------------------------------|------------------------------------|-----------------|-----------------------------|-----------------------------|
| Data Type                       | tabular, image, text, audio, video | tabular         | tabular, image, text, video | tabular, image, text, video |
| Training data size              | no data required                   | medium to large | small to medium             | medium to large             |
| ML and coding expertise         | low                                | medium          | low                         | high                        |
| Flexibility to tune hyperparams | none                               | medium          | none                        | high                        |
| Time to train model             | none                               | medium          | medium                      | long                        |
