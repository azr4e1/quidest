+++
date = '2025-01-23T15:54:56Z'
title = 'GCP Model Development'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql', 'development', 'pipelines', 'feature engineering', 'precision', 'recall', 'confusion matrix']
+++


When [data preparation](/wiki/gcp-data-preparation) is ready, we move to model development, where we train the model and evaluate the results.

This involves two steps:

1. Model training
2. Model evaluation

This is an iterative process.

In [Vertex AI](/wiki/gcp-vertex-ai), we need to specify:

- training method (dataset)
- training objective: the goal of the model training and the task you want to solve
- training method: AutoML or custom training
- training details
- budget and pricing

Vertex AI provides extensive evaluation metrics to help determine a model’s performance.

Among these metrics we have Precision and Recall from a _confusion matrix_:

- _Precision_ is the fraction of predicted positives that are actually positive: $\frac{TP}{TP + FP}$
- _Recall_ is the fraction of actual positives that were correctly labelled: $\frac{TP}{TP + FN}$

where TP is _True Positives_, FP is _False Positives_ and FN is _False Negatives_

Precision and recall are often a trade-off.

In addition to the confusion matrix and the metrics generated to measure recall and precision, the other useful measurement is feature importance. In Vertex AI, feature importance is displayed through a bar chart to illustrate how each feature contributes to a prediction.

This information helps decide which features are included in a machine learning model to predict the goal.

Explanable AI is a set of tools and frameworks to help understand and interpret predictions made by machine learning models in Vertex AI

