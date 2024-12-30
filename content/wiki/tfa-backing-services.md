+++
date = '2024-12-29T18:18:00+01:00'
title = 'Twelve Factor App - Backing Services'
hideReply = true
tags = ['twelve', 'factor', 'app', 'webapp', 'scaling', 'internet', 'saas', 'software', 'as', 'a', 'service', 'api', 'codebase', 'dependencies', 'config', 'tfa', 'backing services', 'build', 'release', 'run', 'processes', 'sql', 'database', 'port', 'binding', 'concurrency', 'disposability', 'dev/prod', 'development', 'production', 'container', 'parity', 'logs', 'admin']
+++

A backing service is any service the app consumes over the network as part of its normal operation. Examples include datastores (such as __MySQL__ or __CouchDB__), messaging/queueing systems (such as __RabbitMQ__ or __Beanstalkd__), SMTP services for outbound email (such as __Postfix__), and caching systems (such as __Memcached__).

Some backing services like the database are usually managed locally (same server as the app); others are third party services, like SMTP or API-accessible consumer services (OpenAI,  Twitter, etc...)

__The code for a twelve-factor app makes no distinction between local and third party services__. To the app, both are attached resources, accessed via a URL or other locator/credentials stored in the config. A deploy of the twelve-factor app should be able to swap out a local MySQL database with one managed by a third party without any changes to the app’s code.

Each distinct backing service is a _resource_. Resources can be attached to and detached from deploys at will.

## References

- https://12factor.net/backing-services
