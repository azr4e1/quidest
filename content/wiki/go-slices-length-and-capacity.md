+++
toc = true
hideReply = true
title = "Go slices length and capacity"
author = "Lorenzo Drumond"
date = "2024-02-23T14:01:29"
tags = ["slice",  "structured",  "capacity",  "length",  "array",  "data",  "golang",  "type"]
+++


A slice has both a _length_ and a _capacity_.

The _length_ of a slice is the number of elements it contains.

The _capacity_ of a slice is the number of elements in the _underlying array_, counting from the _first_ element in the slice.

The length and capacity of a slice `s` can be obtained using the expressions `len(s)` and `cap(s)`

You can extend a slice's length by re-slicing it, provided it has sufficient capacity. If you try to extend it beyond its capacity, it will panic

```golang
package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}
	printSlice(s)

	// Slice the slice to give it zero length.
	s = s[:0]
	printSlice(s)

	// Extend its length.
	s = s[:4]
	printSlice(s)

	// Drop its first two values.
	s = s[2:]
	printSlice(s)

	s = s[:]
	printSlice(s)
}

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

// Output:
// len=6 cap=6 [2 3 5 7 11 13]
// len=0 cap=6 []
// len=4 cap=6 [2 3 5 7]
// len=2 cap=4 [5 7]
// len=2 cap=4 [5 7]
```

## References
- https://go.dev/tour/moretypes/11

Next -> [slice-zero-value](/wiki/slice-zero-value/)

Next -> [creating-a-slice-with-make](/wiki/creating-a-slice-with-make/)
