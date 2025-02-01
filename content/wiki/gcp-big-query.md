+++
date = '2025-01-22T10:35:56Z'
title = 'GCP Big Query'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model', 'database', 'sql']
+++

[BigQuery](/wiki/gcp-google-cloud-infrastructur) provides two services in one:

- Fully managed storage facility for datasets
- Fast SQL-based analytical engine

These two services are connected by Google's high speed internal network that allows to scale compute and storage independently.

You can build ML models with BigQuery.

Steps to build ML models:

- Import and clean the data
- Experiment with and tune different ML models
- Train the model with new data to improve its performance
- Deploy the model

With BigQueryML you can manage tabular data  and execute ML models in a few steps. It tunes the parameters for you and helps manage the ML workflow.

Steps to build ML models in BigQuery:

1. ETL into BigQuery (evaluate, transform and load)
2. Select and preprocess features with SQL. BigQuery does some preprocessing for you (one-hot encoding)
3. Create the model in BigQuery with the `CREATE MODEL` command. Example:
  - ```sql
    CREATE MODEL
    ecommerce.classification -- name of model

    OPTIONS
    (
      model_type="logistic_reg",
      input_label_cols='will_buy_later'
    ) AS

    -- SQL query with training data
    ```
  - BigQuery supports different models like logistic and linear regression, k-means clustering and time series forecasting
  - BigQuery supports MLOps, which helps deploy, monitor and manage the ML model
4. Evaluate the performance of the model. Example :
  - ```sql
    SELECT (
      roc_auc,
      accuracy,
      precision,
      recall
    )
    FROM
    ML.EVALUATE(MODEL
    `ecommerce.classification`)

    -- SQL query with evaluation data
    ```
5. Use the model to make predictions. Example:
  - ```sql
    SELECT * FROM 
    ML.PREDICT (
      MODEL `ecommerce.classification`
    )
    ```
  - with the results the label field will have "predicted" added to the field name.
