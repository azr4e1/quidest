+++
date = '2025-01-17T10:18:23Z'
title = 'GCP Google Cloud Infrastructure'
hideReply = true
tags = ["certification", "engineer", "machine", "platform", "cloud", "path", "learning", "gcp", "google", 'AI', 'Infrastructure']
+++

The Google Cloud Infrastucture has three layers:

1. Networking and Security Layer (Base layer);
2. Compute and Storage. They are decoupled so they can scale independently based on need;
3. Data and AI LM products.


## Compute

Google offers a range of computing services to accomodate different needs and scales. 
- *Compute Engine*: it is an _IaaS_ (Infrastucture as a services) that provides compute, storage and network resources similar to a physical machine.
- _Google Kubernete Engine (GKE)_: it runs contenerized applications in a cloud environment.
- _App Engine (PaaS)_: Platform as a Service bind codes to libraries and is focused on application logic. It allows you to easily run and serve a web app


### Cloud Run

A fully managed compute platform that enables you to run requests or event-driven stateless workloads without having to worry about servers.

It abstract platform managements, and can automatically scale up and down.

It charges you only for the resources you use.


### Cloud Run Functions

Functions that are executed in response to events. It completely serverless execution environment.

## Storage

Storage is decoupled from Compute and can scale separately

GCP offers fully managed storage solutions like:

- Cloud Storage: best for [Unstructured Data](/wiki/gcp-structured-vs-unstructured-data), like standard storage of _hot data_ (frequently accessed), _nearline storage_ (once per month), _coldline storage_ (once every 90 days) and _archive storage_ (once a year)
- BigTable: Best for analytical structured data [Structured Data](/wiki/gcp-structured-vs-unstructured-data) _without_ SQL
- CloudSQL: Best for transactional structured data [Structured Data](/wiki/gcp-structured-vs-unstructured-data) with SQL at local scalability
- Spanner: Best for transactional structured data [Structured Data](/wiki/gcp-structured-vs-unstructured-data) with SQL at global scalability
- FireStorm: Best for transactional structured data [Structured Data](/wiki/gcp-structured-vs-unstructured-data) _without_ SQL
- BigQuery: Best for analytical structured data [Structured Data](/wiki/gcp-structured-vs-unstructured-data) with SQL
