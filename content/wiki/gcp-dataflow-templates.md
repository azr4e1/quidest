+++
date = '2025-01-30T14:26:56Z'
title = 'GCP Dataflow Templates'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development',  'lab', 'data preparation']
+++

[Dataflow](/wiki/gcp-dataflow) templates allow you to package a Dataflow pipeline for deployment. Anyone with the correct permissions can then use the template to deploy the packaged pipeline. You can create your own custom Dataflow templates, and Google provides pre-built templates for common scenarios.

## Worflow

Using Dataflow templates involves the following high-level steps:

1. Developers set up a development environment and develop their pipeline. The environment includes the Apache Beam SDK and other dependencies.
1. Depending on the template type (Flex or classic):
    - For Flex templates, the developers package the pipeline into a Docker image, push the image to Artifact Registry, and upload a template specification file to Cloud Storage.
    - For classic templates, developers run the pipeline, create a template file, and stage the template to Cloud Storage.
1. Other users submit a request to the Dataflow service to run the template.
1. Dataflow creates a pipeline from the template. The pipeline can take as much as five to seven minutes to start running.
