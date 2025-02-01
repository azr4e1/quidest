+++
date = '2025-01-30T14:30:03Z'
title = 'GCP Dataflow Flex Templates vs Classic Templates'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development',  'lab', 'data preparation']
+++

Dataflow supports two types of template: Flex templates, which are newer, and classic templates. If you are creating a new Dataflow template, we recommend creating it as a Flex template.

With a Flex template, the pipeline is packaged as a Docker image in Artifact Registry, along with a template specification file in Cloud Storage. The template specification contains a pointer to the Docker image. When you run the template, the Dataflow service starts a launcher VM, pulls the Docker image, and runs the pipeline. The execution graph is dynamically built based on runtime parameters provided by the user.

A classic template contains the JSON serialization of a Dataflow job graph. The code for the pipeline must wrap any runtime parameters in the ValueProvider interface. This interface allows users to specify parameter values when they deploy the template.
