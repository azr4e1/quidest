+++
date = '2025-01-30T14:21:26Z'
title = 'GCP Dataflow'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development',  'lab', 'data preparation']
+++

Dataflow is a Google Cloud service that provides unified stream and batch data processing at scale. Use Dataflow to create data pipelines that read from one or more sources, transform the data, and write the data to a destination.

Typical use cases for Dataflow include the following:

- Data movement: Ingesting data or replicating data across subsystems.
- ETL (extract-transform-load) workflows that ingest data into a data warehouse such as BigQuery.
- Powering BI dashboards.
- Applying ML in real time to streaming data.
- Processing sensor data or log data at scale.

Dataflow is:

### Managed

Dataflow is a fully managed service. That means Google manages all of the resources needed to run Dataflow. When you run a Dataflow job, the Dataflow service allocates a pool of worker VMs to execute the pipeline. You don't need to provision or manage these VMs. When the job completes or is cancelled, Dataflow automatically deletes the VMs. You're billed for the compute resources that your job uses. For more information about costs, see Dataflow pricing.

### Scalable

Dataflow is designed to support batch and streaming pipelines at large scale. Data is processed in parallel, so the work is distributed across multiple VMs.

Dataflow can autoscale by provisioning extra worker VMs, or by shutting down some worker VMs if fewer are needed

### Portable

Dataflow is built on the open source Apache Beam project. Apache Beam lets you write pipelines using a language-specific SDK. Apache Beam supports Java, Python, and Go SDKs.

## How it works

Dataflow uses a data pipeline model, where data moves through a series of stages. Stages can include reading data from a source, transforming and aggregating the data, and writing the results to a destination.

Pipelines can range from very simple to more complex processing. For example, a pipeline might do the following:

- Move data as-is to a destination.
- Transform data to be more useable by the target system.
- Aggregate, process, and enrich data for analysis.
- Join data with other data.

## Apache Beam pipelines

A pipeline that is defined in Apache Beam does not specify how the pipeline is executed. Running the pipeline is the job of a runner. The purpose of a runner is to run an Apache Beam pipeline on a specific platform. Apache Beam supports multiple runners, including a Dataflow runner.

To use Dataflow with your Apache Beam pipelines, specify the Dataflow runner. The runner uploads your executable code and dependencies to a Cloud Storage bucket and creates a Dataflow job. Dataflow then allocates a pool of VMs to execute the pipeline.

## References 

- https://cloud.google.com/dataflow/docs/overview
