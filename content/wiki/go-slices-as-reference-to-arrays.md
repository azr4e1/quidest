+++
toc = true
hideReply = true
title = "Go slices as reference to arrays"
author = "Lorenzo Drumond"
date = "2024-02-23T13:52:54"
tags = ["slice",  "structured",  "reference",  "array",  "data",  "golang",  "type"]
+++


A slice does not store any data, it just describes a section of an underlying array.

Changing the elements of a slice modifies the corresponding elements of its underlying array.

Other slices that share the same underlying array will see those changes.

```golang
package main

import "fmt"

func main() {
	names := [4]string{
		"John",
		"Paul",
		"George",
		"Ringo",
	}
	fmt.Println(names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println(a, b)

	b[0] = "XXX"
	fmt.Println(a, b)
	fmt.Println(names)
}

// Output
// [John Paul George Ringo]
// [John Paul] [Paul George]
// [John XXX] [XXX George]
// [John XXX George Ringo]
```

## References
- https://go.dev/tour/moretypes/8
Next -> [go-slices](/wiki/go-slices/)

Next -> [slice-zero-value](/wiki/slice-zero-value/)

Next -> [creating-a-slice-with-make](/wiki/creating-a-slice-with-make/)
