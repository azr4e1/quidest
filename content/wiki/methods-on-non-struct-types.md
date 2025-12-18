+++
toc = true
hideReply = true
title = "Methods on non struct-types"
author = "Lorenzo Drumond"
date = "2024-02-23T17:27:53"
tags = ["non_local",  "golang",  "methods",  "programming",  "types",  "receiver"]
+++


Methods are functions with a receiver parameter

The receiver doesn't need to be a struct. We can declare methods on non-struct types too.

You can only declare a method with a receiver whose type is defined in the same package as the method. You cannot declare a method with receiver whose type is defined in another package (which includes built-in types such as `int`)

```golang
package main

import (
	"fmt"
	"math"
)

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```

## References
- [go-struct-wrappers](/wiki/go-struct-wrappers/)
- [go-methods-on-non-local-types](/wiki/go-methods-on-non-local-types/)
