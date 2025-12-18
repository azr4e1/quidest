+++
toc = true
hideReply = true
title = "Struct in Go"
author = "Lorenzo Drumond"
date = "2024-01-19T13:29:34"
tags = ["structured",  "data",  "go",  "type"]
+++


A `struct` in Go is a structured data type: something that contains multiple different bits of information, united into a single record.

A `struct` is a colection of fields.

```golang
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	fmt.Println(Vertex{1, 2})
}
```

Struct fields are accessed using a dot.
```golang
package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	v.X = 4
	fmt.Println(v.X)
}
```

A struct literal denotes a newly allocated struct value by listing the values of its fields.

You can list just a subset of fields by using the `Name: ` syntax. (And the order of named fields is irrelevant.)

The special prefix & returns a pointer to the `struct` value.

E.g.:
```golang
package main

import "fmt"

type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)

func main() {
	fmt.Println(v1, p, v2, v3)
}
```

## References
- https://go.dev/tour/moretypes/2

Next -> [go-slices](/wiki/go-slices/)

Next -> [go-arrays](/wiki/go-arrays/)
