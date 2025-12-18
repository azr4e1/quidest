+++
toc = true
hideReply = true
title = "Composite values and structs in Go"
author = "Lorenzo Drumond"
date = "2024-01-20T18:13:53"
tags = ["programming",  "type",  "golang",  "composite",  "struct",  "github",  "for_the_love_of_go",  "documentation"]
+++


A data type made up of several values that you can treat as a single unit is called a _composite type_.

A `struct` in Go groups together related pieces of data, called _fields_.

E.g.:
```golang
// Customer represents information about a customer.
type Customer struct {
  Name string
  Email string
}
```

Comments before a struct definition get turned into browsable documentation when published to github.

The `type` keyword introduces a new _type definition_. The `struct` keyword specifies which kind of new type we are creating.

Everything after `type Customer ...` is a _type literal_.

## References
- John Arundel, For the Love of Go

Next -> [exported-identifiers-in-go](/wiki/exported-identifiers-in-go/)

Next -> [writing-struct-literals-in-go](/wiki/writing-struct-literals-in-go/)
