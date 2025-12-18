+++
toc = true
hideReply = true
title = "Go basic types"
author = "Lorenzo Drumond"
date = "2024-02-23T10:21:02"
tags = ["rune",  "golang",  "int",  "basic",  "type",  "blocks",  "float",  "factored",  "unsigned",  "complex"]
+++


Go's basic types are

```golang
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128
```

The example shows variables of several types, and also that variable declarations may be "factored" into blocks, as with import statements.
E.g.:
```golang
package main

import (
	"fmt"
	"math/cmplx"
)

// you can factor var statements
var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf("Type: %T Value: %v\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\n", z, z)
}
```

The int, uint, and uintptr types are usually 32 bits wide on 32-bit systems and 64 bits wide on 64-bit systems. When you need an integer value you should use int unless you have a specific reason to use a sized or unsigned integer type.

## References
- https://go.dev/tour/basics/11
