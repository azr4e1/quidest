+++
date = '2024-12-30T16:40:03+01:00'
title = 'Twelve Factor App - Concurrency'
hideReply = true
tags = ['twelve', 'factor', 'app', 'webapp', 'scaling', 'internet', 'saas', 'software', 'as', 'a', 'service', 'api', 'codebase', 'dependencies', 'config', 'tfa', 'backing services', 'build', 'release', 'run', 'processes', 'sql', 'database', 'port', 'binding', 'concurrency', 'disposability', 'dev/prod', 'development', 'production', 'container', 'parity', 'logs', 'admin']
+++

Any computer program, once run, is represented by one or more processes.

__In the twelve-factor app, processes are a first class citizen__. Processes in the twelve-factor app take strong cues from the unix process model for running service daemons. Using this model, the developer can architect their app to handle diverse workloads by assigning each type of work to a process type. For example, HTTP requests may be handled by a web process, and long-running background tasks handled by a worker process.

Twelve-factor app processes should never daemonize or write PID files. Instead, rely on the operating system’s process manager to manage output streams, respond to crashed processes, and handle user-initiated restarts and shutdowns.

## References

- https://12factor.net/concurrency
