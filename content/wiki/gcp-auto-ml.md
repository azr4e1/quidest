+++
date = '2025-01-23T14:23:02Z'
title = 'GCP AutoML'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql', 'development', 'neural architecture search', 'transfer learning']
+++

AutoML, which stands for automated machine learning, aims to automate the process to develop and deploy an ML model.

AutoML is powered by the latest research from Google. There are four distinct phases:

1. Data processing: AutoML provides functions to automate part of data preparation process, e.g. numbers, dates, categories encoding, etc...
2. Searching best models and tuning parameters. It's powered by two technologies:
  - **Neural architecture search**: helps search the best models and tune the parameters automatically.
  - **Transfer learning**: helps speed the searching by using pre-trained models, tailoring them to the specific problem
3. Bagging ensamble: best models are assembled from phase 2 and prepared for prediction in phase 4. AutoML does not rely on one single model, but on the top number of models, typically 10. The assembly can be as simple as averaging the predictions of the top number of models
4. Prediction

The best feature of AutoML is that it provides a no-code solution.
