+++
date = '2024-12-30T15:21:06+01:00'
title = 'Twelve Factor App - Processes'
hideReply = true
tags = ['twelve', 'factor', 'app', 'webapp', 'scaling', 'internet', 'saas', 'software', 'as', 'a', 'service', 'api', 'codebase', 'dependencies', 'config', 'tfa', 'backing services', 'build', 'release', 'run', 'processes', 'sql', 'database', 'port', 'binding', 'concurrency', 'disposability', 'dev/prod', 'development', 'production', 'container', 'parity', 'logs', 'admin']
+++

The app is executed in the execution environment as one or more processes.

__Twelve-factor processes are stateless and share-nothing.__ Any data that needs to persist must be stored in a stateful backing service, typically a database.

The memory space or filesystem of the process can be used as a brief, single-transaction cache. The twelve-factor app never assumes that anything cached in memory or on disk will be available on a future request or job.

## References

- https://12factor.net/processes
