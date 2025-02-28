+++
date = '2025-02-28T14:21:00Z'
title = 'GCP Dataflow Api Example'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'model',  'development',  'lab', 'data preparation']
+++

Let's create a streaming pipeline using Dataflow templates. We'll use the Pub/Sub to BigQuery template, which reads messages written in JSON from a Pub/Sub topic and pushes them to a BigQuery table.

Create a dataset called `taxirides`:

```shell
bq mk taxirides
```

Instantiate a BQ table in that dataset:

```
bq mk \
--time_partitioning_field timestamp \
--schema ride_id:string,point_idx:integer,latitude:float,longitude:float,\
timestamp:timestamp,meter_reading:float,meter_increment:float,ride_status:string,\
passenger_count:integer -t taxirides.realtime  
```

Now we create a storage bucket to hold temporary data:

```shell
export BUCKET_NAME="Bucket Name"
gsutil mb gs://$BUCKET_NAME/
```

Finally, deploy the dataflow template:

```shell
gcloud dataflow jobs run iotflow \
    --gcs-location gs://dataflow-templates-"Region"/latest/PubSub_to_BigQuery \
    --region "Region" \
    --worker-machine-type e2-medium \
    --staging-location gs://"Bucket Name"/temp \
    --parameters inputTopic=projects/pubsub-public-data/topics/taxirides-realtime,outputTableSpec="Table Name":taxirides.realtime
```

Now we can submit queries using SQL:

```sql
SELECT * FROM `"Bucket Name".taxirides.realtime` LIMIT 1000
```


## References

- https://cloud.google.com/dataflow/docs/templates/provided-templates#cloudpubsubtobigquery

