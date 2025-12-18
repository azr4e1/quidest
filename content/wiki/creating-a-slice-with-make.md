+++
toc = true
hideReply = true
title = "Creating a slice with make"
author = "Lorenzo Drumond"
date = "2024-02-23T14:16:12"
tags = ["slice",  "structured",  "capacity",  "reference",  "length",  "zero",  "array",  "nil",  "make",  "data",  "golang",  "create",  "type"]
+++


Slices can be created with the built-in `make` function; this is how you create dynamically-sized arrays.

The `make` function allocates a zeroed array and returns a slice that refers to that array:
```golang
a := make([]int, 5) // len(a) = 5
```

To specify a capacity, pass a third argument to `make`:
```golang
b := make([]int, 0, 5) // len(b) = 0, cap(b)=5

b = b[:cap(b)] // len(b)=5, cap(b)=5
b = b[1:] // len(b)=4, cap(b)=4
```

## References
- [go-slices-length-and-capacity](/wiki/go-slices-length-and-capacity/)
- [slice-zero-value](/wiki/slice-zero-value/)
- [go-slices](/wiki/go-slices/)
