+++
date = '2024-12-30T13:23:04+01:00'
title = 'Twelve Factor App - Build, Release, Run'
hideReply = true
tags = ['twelve', 'factor', 'app', 'webapp', 'scaling', 'internet', 'saas', 'software', 'as', 'a', 'service', 'api', 'codebase', 'dependencies', 'config', 'tfa', 'backing services', 'build', 'release', 'run', 'processes', 'sql', 'database', 'port', 'binding', 'concurrency', 'disposability', 'dev/prod', 'development', 'production', 'container', 'parity', 'logs', 'admin']
+++

A _codebase_ is transformed into a (non-development) deploy through three stages:

1. The _build stage_ is a transform which converts a code repo into an executable bundle known as a build. Using a version of the code at a commit specified by the deployment process, the build stage fetches vendors dependencies and compiles binaries and assets.
2. The _release stage_ takes the build produced by the build stage and combines it with the deploy’s current config. The resulting release contains both the build and the config and is ready for immediate execution in the execution environment.
3. The _run stage_ (also known as “runtime”) runs the app in the execution environment, by launching some set of the app’s processes against a selected release.

__The twelve-factor app uses strict separation between the build, release, and run stages__. For example, it is impossible to make changes to the code at runtime, since there is no way to propagate those changes back to the build stage.

Every release should always have a unique release ID, such as a timestamp of the release (such as __2011-04-06-20:32:17__) or an incrementing number (such as __v100__). Releases are an append-only ledger and a release cannot be mutated once it is created. Any change must create a new release.

## References

- https://12factor.net/build-release-run
