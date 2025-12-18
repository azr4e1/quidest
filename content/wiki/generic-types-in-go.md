+++
toc = true
hideReply = true
title = "Generic Types in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T15:26:31"
tags = ["generics",  "type",  "parameters",  "generic_types",  "comparable",  "golang",  "type_theory"]
+++


In addition to generic functions, Go also supports generic types. A type can be parametrized with a type parameter, which could be useful for implementing generic data structures.

```golang
package main

// List represents a singly-linked list that holds
// values of any type
type List[T any] struct {
  val T
  next *List[T]
}
```

## References
