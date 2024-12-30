+++
date = '2024-12-30T16:52:43+01:00'
title = 'Twelve Factor App - Admin Processes'
hideReply = true
tags = ['twelve', 'factor', 'app', 'webapp', 'scaling', 'internet', 'saas', 'software', 'as', 'a', 'service', 'api', 'codebase', 'dependencies', 'config', 'tfa', 'backing services', 'build', 'release', 'run', 'processes', 'sql', 'database', 'port', 'binding', 'concurrency', 'disposability', 'dev/prod', 'development', 'production', 'container', 'parity', 'logs', 'admin']
+++

The _process formation_ is the array of processes that are used to do the app’s regular business (such as handling web requests) as it runs. Separately, developers will often wish to do one-off administrative or maintenance tasks for the app

One-off admin processes should be run in an identical environment as the regular long-running processes of the app. They run against a release, using the same codebase and config as any process run against that release. Admin code must ship with application code to avoid synchronization issues.

Twelve-factor strongly favors languages which provide a REPL shell out of the box, and which make it easy to run one-off scripts. In a local deploy, developers invoke one-off admin processes by a direct shell command inside the app’s checkout directory. In a production deploy, developers can use ssh or other remote command execution mechanism provided by that deploy’s execution environment to run such a process.

## References

- https://12factor.net/admin-processes
