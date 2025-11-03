+++
date = '2025-10-31T17:16:42Z'
draft = false
title = 'Docker and Postgres'
hideReply = true
tags = ["data-engineering", "study-plan", "career-development", "zoomcamp"]
+++

A _data pipeline_ is a processing service that gets in data and produces more data

_Docker_ is a software platform that allows you to build, test, and deploy applications quickly. Docker packages software into standardized units called containers that have everything the software needs to run including libraries, system tools, code, and runtime. Using Docker, you can quickly deploy and scale applications into any environment and know your code will run.

We can have multiple databases and pipelines running in separate docker containers, completely separated from each other.

Docker images are snapshots of a container; they contain all the instructions needed to create a specific environment. This gurantees reproducibility anywhere.

Data Engineers care about Docker because:

- reproducibilty
- local experiments and integration tests
- running pipelines on the cloud (AWS Batch, Kubernetes)
- Spark: we can specify all the requirements of the pipelines using spark within docker
- Serverless (AWS Lambda, Google Functions)


## Basics

We can pull images from Docker Hub and run them directly in our machine:

`docker run -it ubuntu` will pull and create an interactive ubuntu container running bash

`docker run -it python:3.9` will pull a ubuntu image with Python 3.9, and run the Python interpreter.

If we want to create the `python:3.9` container, but starting it with bash instead of with Python (maybe because we want to install some libraries like `pandas`), we can change the `entrypoint`:

`docker run -it --entrypoint=bash python:3.9`

## Dockerfile

A `Dockerfile` is a list of instructions on how to create and run a Docker image. For example, we can translate the command `docker run -it --entrypoint=bash python:3.9` into

```Dockerfile
FROM python:3.9

RUN pip install pandas

ENTRYPOINT ["bash"]
```

and then `docker build -t test:pandas .`, which will build an image with tag `test:pandas` using the Dockerfile in the current dir. This image will contain python3.9 and pandas, and when we run `docker run -it test:pandas`, the container will start in interactive mode with bash

## Dockerize Scripts

Let's assume we have a script `pipeline.py`, that we want to run from a container with the required dependencies (e.g. pandas), something as simple as

```python
import pandas as pd
import sys

day = sys.argv[1]
print(f"Job finished successfully for day = {day}.")
```

then we can write the following Dockerfile:

```Dockerfile
FROM python:3.9

RUN pip install pandas

WORKDIR /app

COPY pipeline.py pipeline.py

ENTRYPOINT [ "python", "pipeline.py" ]
```

We can build like before, and when running something like `docker run test:pandas 2023-01-01`, it will print `Job finished successfully for day = 2023-01-01.`

## Postgres in Docker
