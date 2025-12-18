+++
toc = true
hideReply = true
title = "Declaration in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T14:35:27"
tags = ["basics",  "assignment",  "programming",  "declaration",  "golang",  "memory",  "effect",  "statement"]
+++


A variable in Go comes to existence via _declaration_:
```golang
var b string
```

This introduces a new variable b that can hold string values.

A declaration doesn’t actually make anything happen when your program runs: instead, it asks the Go compiler “please reserve some space for a variable of a certain type that I’m going to do something with later”.

A declaration isn’t technically a statement, because it doesn’t produce any effect at run time.

It’s worth knowing that in Go, almost all our code must be inside some function, and no statements are allowed outside functions (at package level). The only kind of code allowed outside a function is a declaration.


## References
