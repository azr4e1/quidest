+++
date = '2025-11-03T02:09:26Z'
title = 'Terraform'
hideReply = true
tags = ["data-engineering", "study-plan", "career-development", "zoomcamp"]
+++

Terraform is an infrastructure as code tool that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, re-use, and share. You can then use a consistent workflow to provision and manage all your infrastructure throughout its life-cycle.

# Why use it

- Simplicity in keeping track of your infrastructure
- Easier collaboration
- Reproducibility
- Ensure resources are removed


# How it works

You download the Terraform software on your machine. Through a _provider_, you can communicate to different services that allow to bring up infrastructure (e.g. AWS provider, GCP provider etc), and enact your terraform configuration file.

Providers is code that allows terraform to manage resources on Cloud services.

# Key commands

- `init`    - get the providers needed
- `plan`    - show the resources that will be created
- `apply`   - apply the plan
- `destroy` - brings down everything defined in the terraform file

# GCP

GCP is Google Cloud Platform, Google's Cloud Service. In order to let terraform create and manage infrastructure, we need to give an authentication method.

On GCP, in IAM and Admin, head over to service accounts. Service accounts are like user accounts, but for automated services. You can give them permissions like Storage Admin etc, and a number of other restrictions. When you want a service to operate on a GCP project automatically (like using terraform), you can create a service account, and then create an API key for that service account.

For our excercise, let's create a service account and let's give it Cloud Storage and BigQuery Admin permissions. After it's created, let's create a JSON API key, and store it in `./keys/my-credentials.json`

Terraform can authenticate by using the env variable `export GOOGLE_APPLICATION_CREDENTIALS="<path/to/your/service-account-authkeys>.json"`, or you can hardcode the credentials path in the script

# main.tf

The main file for a terraform service is `main.tf`. Let's see an example:

```terraform
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
# Credentials only needs to be set if you do not have the GOOGLE_APPLICATION_CREDENTIALS set
#  credentials = 
  project = "<Your Project ID>"
  region  = "us-central1"
}



resource "google_storage_bucket" "data-lake-bucket" {
  name          = "<Your Unique Bucket Name>"
  location      = "US"

  # Optional, but recommended settings:
  storage_class = "STANDARD"
  uniform_bucket_level_access = true

  versioning {
    enabled     = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 30  # days
    }
  }

  force_destroy = true
}


resource "google_bigquery_dataset" "dataset" {
  dataset_id = "<The Dataset Name You Want to Use>"
  project    = "<Your Project ID>"
  location   = "US"
}
```

this example will create a bucket with specified settings, and will also create a bigquery table. You specify resources using the `resource` keyword, and providing a type (like `google_bigquery_dataset`), and a resource name that you can reference elsewhere in the file.

To download the required provider, we can run `terraform init`. This will download the binary of the provider in `.terraform` folder. To see the planned action that terraform will take to create our infrastructure, we can use `terraform plan`. To act on those actions, we can run `terraform apply`. This will create a `.tfstate` state json file describing the current state of the infrastructure. Finally, if we want to take down what we created, we can run `terraform destroy`.


The main files for a terraform declarations are:
- main.tf (the main file)
- variables.tf (where we specify variables that can be used elsewhere)
- Optional: resources.tf, output.tf
- .tfstate

Let's go over the various elements of the script:
- terraform: configure basic Terraform settings to provision your infrastructure
  - required_version: minimum Terraform version to apply to your configuration
  - backend: stores Terraform's "state" snapshots, to map real-world resources to your configuration.
    - local: stores state file locally as terraform.tfstate
  - required_providers: specifies the providers required by the current module

- provider:
  - adds a set of resource types and/or data sources that Terraform can manage
  - The Terraform Registry is the main directory of publicly available providers from most major infrastructure platforms.

- resource
  - blocks to define components of your infrastructure
  - Project modules/resources: google_storage_bucket, google_bigquery_dataset, google_bigquery_table
- variable & locals
  - runtime arguments and constants

# variables.tf

Let's see how we can improve our `main.tf` script using variables:

main.tf

```terraform
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.6.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials)
  project     = var.project
  region      = var.region
}


resource "google_storage_bucket" "demo-bucket" {
  name          = var.gcs_bucket_name
  location      = var.location
  force_destroy = true


  lifecycle_rule {
    condition {
      age = 1
    }
    action {
      type = "AbortIncompleteMultipartUpload"
    }
  }
}



resource "google_bigquery_dataset" "demo_dataset" {
  dataset_id = var.bq_dataset_name
  location   = var.location
}
```

variables.tf

```terraform
variable "credentials" {
  description = "My Credentials"
  default     = "<Path to your Service Account json file>"
  #ex: if you have a directory where this file is called keys with your service account json file
  #saved there as my-creds.json you could use default = "./keys/my-creds.json"
}


variable "project" {
  description = "Project"
  default     = "<Your Project ID>"
}

variable "region" {
  description = "Region"
  #Update the below to your desired region
  default     = "us-central1"
}

variable "location" {
  description = "Project Location"
  #Update the below to your desired location
  default     = "US"
}

variable "bq_dataset_name" {
  description = "My BigQuery Dataset Name"
  #Update the below to what you want your dataset to be called
  default     = "demo_dataset"
}

variable "gcs_bucket_name" {
  description = "My Storage Bucket Name"
  #Update the below to a unique bucket name
  default     = "terraform-demo-terra-bucket"
}

variable "gcs_storage_class" {
  description = "Bucket Storage Class"
  default     = "STANDARD"
}
```

so we can define variables using the `variable` keyword, and then access the value through the `var` namespace in the `main.tf` file.

If a default value is set, the variable is optional. Otherwise, the variable is required. If you run terraform plan now, Terraform will prompt you for the values for the variables without defaults.

You can populate variables using values from a file. Terraform automatically loads files called `terraform.tfvars` or matching `*.auto.tfvars` in the working directory when running operations.

For more, look at the documentation: [Get Started](https://developer.hashicorp.com/terraform/tutorials/gcp-get-started)
