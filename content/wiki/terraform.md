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
