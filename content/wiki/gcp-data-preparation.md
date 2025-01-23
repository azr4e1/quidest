+++
date = '2025-01-23T15:34:07Z'
title = 'GCP Data Preparation'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql', 'development', 'pipelines', 'feature engineering']
+++

This is the first stage of the [ML workflow](/wiki/gcp-ml-workflow). During this stage, you must upload data and then prepare it for model training with feature engineering.

The data can come from Cloud Storage, BigQuery, or even your local machine.

[AutoML](/wiki/gcp-auto-ml) supports four types of data:

- image: classify images into either single-label or multi-label, detect objects and discover image segmentation
- tabular: solve regression, classification, or forecasting problems
- text: classify text, extract entities and conduct sentiment analysis
- video: recognize video action, classify videos and track objects

After the data is loaded, the next step is preparing it for model ingestion with feature engineering.

A _feature_ refers to a factor that contributes to the prediction.

Vertex AI provides a service called Vertex AI Feature Store, which is a centralized repository to manage, serve, and share features. It aggregates the features from different sources in BigQuery and makes them available for both real-time (often called online) and batch (often called offline) serving.

Worflow to set up serving via Verted AI Feature Store is:

1. Prepare data in BigQuery
2. Register the data source
3. Configure the connection to the data source
4. Serve latest features

Features in the Feature Store are:

- shareable for training and serving
- reusable
- scalable
- easy to use
