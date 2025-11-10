+++
date = '2025-11-07T09:42:23Z'
title = 'Workflow Orchestration Airflow'
hideReply = true
tags = ["data-engineering", "study-plan", "career-development", "zoomcamp", "astro", "etl"]
+++

Data orchestration is the _coordination_ and _automation_ of data flow across various tools and systems to deliver quality data products and analytics

ETL: Extract, Transform and Load

Airflow is an open source tool for programmatically authoring, scheduling and monitoring your data pipelines

Airflow has become the de-facto choice for orchestration for the following reasons:

- Airflow uses Python to create pipelines.
- Airflow is a community driven open source project, and improves every month. 
- Airflow has good observability, through easy to use user interface
- Airflow allows use to create data base scheduling
- Airflow is extremely extensible with third-party integrations

There are four cases where data is business critical where airflow can help:

- data-powered applications: programs or systems that rely on data to function and provide value
- critical operational processes: the essential workflows that are crucial for a business to function
- analytics and reporting: systematic analysis of data to derive insights
- MLOps and AI: MLOps involves the deployment and management of machine learning models withing operational workflows


Airflow is _not_ a streaming solution; it can be combined with Kafka to provide this capability.

# How does Airflow work?

Airflow is based on DAG (Directed Acyclic Graph). A DAG is a single data pipeline. A DAG is made up of **tasks**. A task is a single unit of work in a DAG, and can be represented as a node in the graph. An **operator** defines the work that a task does.

Operators can be divided into three main categories:

1. Action operators: any operator that execute something
2. Transfer operator: Perform transfer operations that move data between two systems
3. Sensor operator: wait for an event before executing the next task.
