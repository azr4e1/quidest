+++
date = '2025-01-23T16:13:18Z'
title = 'GCP Model Serving'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql', 'development', 'pipelines', 'feature engineering']
+++

After [data preparation](/wiki/gcp-data-preparation) and [model development](/wiki/gcp-model-development), we are at the final stage of the ML workflow: _model serving_.

Two steps:

1. Model deployment
2. Model monitoring

Model management exists throughout this whole workflow to manage the underlying machine learning infrastructure.

## Model deployment

We have two options:

1. Deploy the model to an endpoint for real-time predictions (or often called online predictions); best when immediate results with low latency are needed
2. Request the prediction job directly from the model resource for batch prediction; best when no immediate response is required and no endpoint is needed

Deploying the model off-cloud is also possible. This approach is generally adopted when the model needs to be deployed in a specific environment to mitigate latency, ensure privacy, or enable offline functionality.


## Model monitoring

Once the model is deployed and begins making predictions or generating contents, it is important to monitor its performance.

The backbone of automating ML workflow on Vertex AI is a toolkit called Vertex AI Pipelines. It automates, monitors, and governs machine learning systems by orchestrating the workflow in a serverless manner.

With Vertex AI Workbench, which is a notebook tool, you can define your own pipeline using SDKs.
