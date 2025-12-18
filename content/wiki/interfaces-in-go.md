+++
toc = true
hideReply = true
title = "Interfaces in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T13:23:47"
tags = ["heap",  "for_the_love_of_go",  "programming",  "reference",  "pointer",  "value",  "pass_by",  "methods",  "interface",  "golang",  "stack"]
+++



An _interface_ type is defined as a set of method signatures.

We say a type _implements_ an interface if the type has all the methods defined in the interface. There is no explicit declaration of intent.

A value of interface type can hold any value that implements those methods.

E.g.
```golang
package main

import (
  "fmt"
  "math"
)

type Abser interface {
  Abs() float64
}

type Vertex struc {
  X, Y float64
}

type MyFloat float64

func (v *Vertex) Abs() float64 {
  return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (mf MyFloat) Abs() float64 {
  if mf < 0 {
    return float64(-mf)
  }

  return float64(mf)
}

func main() {
  var a Abser
  f := MyFloat(-math.Sqrt2)
  v := Vertex{3, 4}

  a = f // a MyFloat implements Abser
  a = &v // a *Vertex implements Abser

  // In the following line, v is a Vertex (not *Vertex)
  // and does NOT implement Abser
  a = v

  fmt.Println(a.Abs())
}
```

## References
- [go-types-and-methods](/wiki/go-types-and-methods/)

Next -> [interface-values-in-go](/wiki/interface-values-in-go/)

Next -> [stringers-interface-in-go](/wiki/stringers-interface-in-go/)

Next -> [errors-in-go](/wiki/errors-in-go/)

Next -> [readers-in-go](/wiki/readers-in-go/)
