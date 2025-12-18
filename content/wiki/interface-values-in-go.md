+++
toc = true
hideReply = true
title = "Interface Values in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T13:45:46"
tags = ["nil",  "pointer",  "heap",  "interface",  "pass_by",  "golang",  "value",  "stack",  "values",  "reference",  "methods",  "for_the_love_of_go",  "programming"]
+++


Under the hood, interface values can be thought of as a tuple of a value and a concrete type:  `(value, type)`

An interface value holds a value of a specific underlying concrete type.

Calling a method on an interface value executes the method of the same name on its underlying type.

```golang
package main

import (
	"fmt"
	"math"
)

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	fmt.Println(t.S)
}

type F float64

func (f F) M() {
	fmt.Println(f)
}

func main() {
	var i I

	i = &T{"Hello"}
	describe(i)
	i.M()

	i = F(math.Pi)
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}

// Output
// (&{Hello}, *main.T)
// Hello
// (3.141592653589793, main.F)
// 3.141592653589793
```

A nil interface value holds neither value nor concrete type.

Calling a method on a nil interface is a run-time error because there is no type inside the interface tuple to indicate which concrete method to call.

## References
- [go-types-and-methods](/wiki/go-types-and-methods/)

Next -> [interface-values-with-nil-underlying-values-in-go](/wiki/interface-values-with-nil-underlying-values-in-go/)
