+++
date = '2024-12-29T18:03:02+01:00'
title = 'Twelve Factor App'
hideReply = true
tags = ['twelve', 'factor', 'app', 'webapp', 'scaling', 'internet', 'saas', 'software', 'as', 'a', 'service', 'api', 'codebase', 'dependencies', 'config', 'tfa', 'backing services', 'build', 'release', 'run', 'processes', 'sql', 'database', 'port', 'binding', 'concurrency', 'disposability', 'dev/prod', 'development', 'production', 'container', 'parity', 'logs', 'admin']
+++

The twelve-factor app is a methodology for building software-as-a-service apps that:

- Use declarative formats for setup automation, to minimize time and cost for new developers joining the project;
- Have a clean contract with the underlying operating system, offering maximum portability between execution environments;
- Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration;
- Minimize divergence between development and production, enabling continuous deployment for maximum agility;
- And can scale up without significant changes to tooling, architecture, or development practices.

## Twelve Factors

1. [Codebase](/wiki/tfa-codebase): One codebase tracked in revision control, many deploys
1. [Dependencies](/wiki/tfa-dependencies): Explicitly declare and isolate dependencies
1. [Config](/wiki/tfa-config): Store config in the environment
1. [Backing services](/wiki/tfa-backing-services): Treat backing services as attached resources
1. [Build, release, run](/wiki/tfa-build-release-run): Strictly separate build and run stages
1. [Processes](/wiki/tfa-processes): Execute the app as one or more stateless processes
1. [Port binding](/wiki/tfa-port-binding): Export services via port binding
1. [Concurrency](/wiki/tfa-concurrency): Scale out via the process model
1. [Disposability](/wiki/tfa-disposability): Maximize robustness with fast startup and graceful shutdown
1. [Dev/prod parity](/wiki/tfa-dev_prod-parity): Keep development, staging, and production as similar as possible
1. [Logs](/wiki/tfa-logs): Treat logs as event streams
1. [Admin processes](/wiki/tfa-admin-processes): Run admin/management tasks as one-off processes

## References

- https://12factor.net/
