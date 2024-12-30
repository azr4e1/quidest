+++
date = '2024-12-30T16:46:34+01:00'
title = 'Twelve Factor App - Dev/Prod Parity'
hideReply = true
tags = ['twelve', 'factor', 'app', 'webapp', 'scaling', 'internet', 'saas', 'software', 'as', 'a', 'service', 'api', 'codebase', 'dependencies', 'config', 'tfa', 'backing services', 'build', 'release', 'run', 'processes', 'sql', 'database', 'port', 'binding', 'concurrency', 'disposability', 'dev/prod', 'development', 'production', 'container', 'parity', 'logs', 'admin']
+++

__The twelve-factor app is designed for continuous deployment by keeping the gap between development and production small__:

- Make the time gap small: a developer may write code and have it deployed hours or even just minutes later.
- Make the personnel gap small: developers who wrote code are closely involved in deploying it and watching its behavior in production.
- Make the tools gap small: keep development and production as similar as possible.

__The twelve-factor developer resists the urge to use different backing services between development and production__, even when adapters theoretically abstract away any differences in backing services. Differences between backing services mean that tiny incompatibilities crop up, causing code that worked and passed tests in development or staging to fail in production. These types of errors create friction that disincentivizes continuous deployment. The cost of this friction and the subsequent dampening of continuous deployment is extremely high when considered in aggregate over the lifetime of an application.

## References

- https://12factor.net/dev-prod-parity
