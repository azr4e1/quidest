+++
toc = true
hideReply = true
title = "Go types and methods"
author = "Lorenzo Drumond"
date = "2024-01-22T16:47:27"
tags = ["non_local",  "golang",  "methods",  "programming",  "types",  "receiver"]
+++


It’s quite common to deal with things in our programs that represent objects or entities in the real world.

We use Go’s struct keyword to define types to represent objects like this in Go programs.

E.g.:
```golang
type Book struct {
    Title  string
    Author string
    Copies int
    ID     int
    PriceCents int
    DiscountPercent int
}
```

`struct`s allow us to define _properties_ of an object in the form of __fields__: static information that defines the object.

However objects have also _behaviours_ that we may want to represent; that is, some logic in the form of code that produces dynamic results.

We could write functions that take a struct as parameter and perform actions on its fields. This is common enough that Go has a shorthand for this: _methods_:
```golang
book.SomeAction()
```

A method in Go is defined similarly to a function, but we need to specify a _receiver_: that is, the object that owns the method:
```golang
func (b Book) NetPriceCents() int {
    saving := b.PriceCents * b.DiscountPercent / 100
    return b.PriceCents - saving
}
```

A _method_ is a function with a special _receiver_ argument.

The receiver appears in its own argument list between the `func` keyword and the method name.

```golang
package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

## References
- John Arundel, For the Love of Go

Next -> [go-struct-wrappers](/wiki/go-struct-wrappers/)

Next -> [go-methods-on-non-local-types](/wiki/go-methods-on-non-local-types/)

Next -> [methods-on-non-struct-types](/wiki/methods-on-non-struct-types/)
