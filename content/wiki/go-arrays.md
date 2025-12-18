+++
toc = true
hideReply = true
title = "Go Arrays"
author = "Lorenzo Drumond"
date = "2024-02-23T13:48:15"
tags = ["array",  "data",  "length",  "go",  "golang",  "type",  "structured",  "fixed"]
+++


The type `[n]T` is an array of `n` values of type `T`.

The expression

```golang
var a [10]int
```

declares a variable `a` as an array of ten integers.

An array's length is part of its type, so arrays cannot be resized.

An array literal is declared as:
```golang
names := [4]string{"John", "Paul", "George", "Ringo"}
```

## References
- https://go.dev/tour/moretypes/6

Next -> [go-slices](/wiki/go-slices/)
Next -> [go-slices-as-reference-to-arrays](/wiki/go-slices-as-reference-to-arrays/)
