+++
date = '2025-02-28T14:27:57Z'
title = 'GCP Dataflow Api Example Python'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development',  'lab', 'data preparation']
+++

The Apache Beam SDK is an open source programming model for data pipelines. In Google Cloud, you can define a pipeline with an Apache Beam program and then use Dataflow to run your pipeline.


Run the Python3.9 Docker image in the cloud terminal:

```shell
docker run -it -e DEVSHELL_PROJECT_ID=$DEVSHELL_PROJECT_ID python:3.9 /bin/bash
```

This command pulls a Docker container with the latest stable version of Python 3.9 and then opens up a command shell for you to run the following commands inside your container.

Now install the apache Beam SDK:

```shell
pip install 'apache-beam[gcp]'==2.42.0
```

To test it, run the wordcount example:

```shell
python -m apache_beam.examples.wordcount --output OUTPUT_FILE
```

## Run a Dataflow pipeline

Create a bucket, and set a environment variable with its name:

```shell
BUCKET=gs://<bucket name provided earlier>
```

Let's run the `wordcount.py` example remotely:

```shell
python -m apache_beam.examples.wordcount --project $DEVSHELL_PROJECT_ID \
  --runner DataflowRunner \
  --staging_location $BUCKET/staging \
  --temp_location $BUCKET/temp \
  --output $BUCKET/results/output \
  --region "filled in at lab start"
```
