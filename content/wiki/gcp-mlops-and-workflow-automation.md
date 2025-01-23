+++
date = '2025-01-23T16:19:17Z'
title = 'GCP MLops and Workflow Automation'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql', 'development', 'pipelines', 'feature engineering']
+++


To automate the ML worfklow to achieve continuous integration, training and delivery we can code a pipeline.

Machine Learning operations (MLOps) plays a big role here.

MLOps combines machine learning development with operations and applies similar principles from DevOps (or development operations) to machine learning models.

In this case, this refers to building an integrated machine learning system and operating it in production.


## Pipelines

Practicing MLOps means automating and monitoring each step of the ML system construction to enable continuous integration, training, and delivery.

The backbone of MLOps on Vertex AI is a tool kit called Vertex AI Pipelines, which supports both Kubeflow Pipelines, or KFP, and TensorFlow Extended, or TFX.

An ML pipeline contains a series of processes and runs in two different environments:

1. experimentation, development, and test environment
2. staging, pre-production, and production environment.

In the development environment, you start from data preparation which includes data extraction, analysis, and preparation, to model development like training, evaluation, and validation. The result is a trained model that can be entered in model registry.

Once the model is trained, the pipeline moves to the staging and production environment, where you serve the model, which includes prediction and monitoring.

## Pipeline components

Each of these processes can be a pipeline component, which is a self-contained set of code that performs one task of a workflow.

There are pre-build pipeline components on GCP, but you may code your own if needed.

## ML automation

ML automation is implemented in three phases:

1. Phase 0: the starting point
2. Phase 1: automate part of the workflow such as the training pipeline; develop building blocks for future use
3. Phase 2: Integrate components to form an entire pipeline and achieve CI, CT and CD.
