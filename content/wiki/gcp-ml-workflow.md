+++
date = '2025-01-23T15:27:18Z'
title = 'GCP ML Workflow'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql', 'development', 'pipelines']
+++


There are three main stages to the ML workflow with Vertex AI

1. Data Preparation
  - data uploading
  - feature engineering
2. Model Development: it's a cycle between training and evaluation
  - Model Training
  - Model Evaluation
3. Model Serving
  - Deploy the model
  - Monitor the model

An ML workflow is not linear but iterative: for example, during model training, you might need to return to the raw data and generate more useful features to feed the model. When monitoring the model during model serving, you might find data drifting, or the accuracy of your prediction might suddenly drop. You might need to check the data sources and adjust the model parameters.

These steps can be automated with MLOps.

The workflow with Vertex AI can be setup in two ways:

- AutoML
- Vertex AI Workbench/Colab using Vertex AI Pipelines


Vertex AI Pipelines is essentially a tool kit that includes pre-built SDKs and software development kits, which are the building blocks of a pipeline.
