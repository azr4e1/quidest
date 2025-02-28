+++
date = '2025-02-28T14:31:55Z'
title = 'GCP Dataproc Api Example'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development',  'lab', 'data preparation']
+++

Dataproc is a fast, easy-to-use, fully-managed cloud service for running Apache Spark and Apache Hadoop clusters in a simpler, more cost-efficient way. Operations that used to take hours or days take seconds or minutes instead. Create Dataproc clusters quickly and resize them at any time, so you don't have to worry about your data pipelines outgrowing your clusters.


To run a apache job, we need to create clusters. Clusters can be created through Compute Engine or GKE (Google Kubernetes Engine).

First, let's set the region:

```shell
gcloud config set dataproc/region Region
```

Dataproc creates staging and temp buckets that are shared among clusters in the same region. Since we're not specifying an account for Dataproc to use, it will use the Compute Engine default service account, which doesn't have storage bucket permissions by default. Let's add those.

Run the following commands to grab the PROJECT_ID and PROJECT_NUMBER:

```shell
PROJECT_ID=$(gcloud config get-value project) && \
gcloud config set project $PROJECT_ID

PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
```

Run the following command to give the Storage Admin role to the Compute Engine default service account:

```shell
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --role=roles/storage.admin
```

Enable Private Google Access on your subnetwork by running the following command:

```shell
gcloud compute networks subnets update default --region=REGION  --enable-private-ip-google-access
```

Run the following command to create a cluster called `example-cluster` with e2-standard-4 VMs and default Cloud Dataproc settings:

```shell
gcloud dataproc clusters create example-cluster --worker-boot-disk-size 500 --worker-machine-type=e2-standard-4 --master-machine-type=e2-standard-4
```

Run this command to submit a sample Spark job that calculates a rough value for pi:

```shell
gcloud dataproc jobs submit spark --cluster example-cluster \
  --class org.apache.spark.examples.SparkPi \
  --jars file:///usr/lib/spark/examples/jars/spark-examples.jar -- 1000
```

The command specifies:

- That you want to run a spark job on the `example-cluster` cluster
- The class containing the main method for the job's pi-calculating application
- The location of the jar file containing your job's code
- The parameters you want to pass to the job—in this case, the number of tasks, which is 1000

## Update a cluster

To change the number of workers in the cluster to four, run the following command:

```shell
gcloud dataproc clusters update example-cluster --num-workers 4
```
