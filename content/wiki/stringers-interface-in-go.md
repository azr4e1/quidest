+++
toc = true
hideReply = true
title = "Stringers interface in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T14:23:13"
tags = ["golang",  "for_the_love_of_go",  "heap",  "methods",  "stringers",  "pass_by",  "programming",  "reference",  "pointer",  "interface",  "fmt",  "stack",  "print",  "string",  "value"]
+++


One of the most common interfaces is `Stringer` defined by the `fmt` package:
```golang
type Stringer interface {
  String() string
}
```

A `Stringer` is a type that can describe itself as a string. The `fmt` package look for this interface to print values.

E.g.:
```golang
package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a, z)
}

// Output:
// Arthur Dent (42 years) Zaphod Beeblebrox (9001 years)
```

## References
- [interface-values-in-go](/wiki/interface-values-in-go/)
- [go-types-and-methods](/wiki/go-types-and-methods/)
