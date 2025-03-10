+++
toc = true
hideReply = true
title = "Generic type parameters in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T15:20:01"
tags = ["type",  "generics",  "parameters",  "golang",  "type_theory",  "comparable"]
+++


Go functions can be written to work on multiple types using type parameters. The type parameters of a function appear between brackets, before the function's argument:
```go
func Index[T comparable](s []T, x T) int
```

This declaration means that `s` is a slice of any type `T` that fulfills the built-in constraint `comparable`. `x` is also a value of the same type.

`comparable` is a useful constraint that makes it possible to use the `==` and `!=` operators on values of the same type. In this example, we use it to compare a value to all slice elements until a match is found. This `Index` function works for any type that supports comparison.

```go
package main

import "fmt"

// Index returns the index of x in s, or -1 if not found.
func Index[T comparable](s []T, x T) int {
  for i, v := range s {
    // v and x are type T, which has the comparable constraint
    if v == x {
      return i
    }
  }
  return -1
}

func main() {
  // Index works on a slice of ints
  si := []int{10, 20, 15, -10}
  fmt.Println(Index(si, 15))

  // Index also works on a slice of strings
  ss := []string{"foo", "bar", "baz"}
  fmt.Println(Index(ss, "hello"))
}

// Output:
// 2
// -1
```

## References

Next -> [generic-types-in-go](/wiki/generic-types-in-go/)
