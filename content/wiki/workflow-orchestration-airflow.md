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

# Core Components

1. __API Server__ - FastAPI server serving the UI and handling task execution requests.
2. __Scheduler__ - Schedules tasks when dependencies are fulfilled.
3. __DAG File Processor__ - Dedicated process for parsing DAGs.
4. __Metadata Database__ - A database where all metadata are stored.
5. __Executor__ - Defines _how_ tasks are executed. It does _not_ execute the tasks.
6. __Queue__ - Defines the _execution task order_.
7. __Worker__ - Process executing the tasks, defined by the executor.
8. __Triggerer__ - Process running __asyncio__ to support deferrable operators.

## Lifecycle of a DAG

1. You create the DAG and add it to the DAG folder
2. Every 5 minutes by default, the DAG processor checks the DAG folder, parses and serializes the DAG into the Metadata database
3. The Scheduler reads from the metadata database to check for new workflows to run
4. The scheduler creates and schedules new Task Instances and pass them to the Executor
