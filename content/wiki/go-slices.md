+++
toc = true
hideReply = true
title = "Go slices"
author = "Lorenzo Drumond"
date = "2024-01-19T13:32:18"
tags = ["slice",  "array",  "type",  "data",  "append",  "structured",  "golang"]
+++


An array has a fixed size. A _slice_, on the other hand, is a dynamically-sized, flexible _view_ into the elements of an array.

The type `[]T` is a slice with elements of type `T`

It is a kind of Go type that represents an _ordered_ collection of elements, all of the same type.

A slice literal specifies the name of the slice type, followed by some element in curly braces:
```golang
[]string{'a', 'b', 'c',}
```

It is like an array literal without the length. The statement above will create the array
```golang
[3]string{'a', 'b', 'c'}
```

and then build a slice that references it.

In a slice literal of some custom type, such as a struct, we don’t need to repeat that type name as part of every element literal: the compiler can infer it.

We use the square-bracket notation to refer to a particular numbered element of the slice:
```golang
mySlice[0]
```

is the first element of the slice `mySlice`. Index starts from 0.

`len` is a built-in function that returns the length of a slice. `append` is a function that appends elements to a slice.

```golang
func append(s []T, ...T) []T
```

The resulting value of `append` is a slice containing all the elements of the original slice plus the provided values.

If the backing array of `s` is too small to fit all the given values a bigger array will be allocated. The returned slice will point to the newly allocated array.

A slice is formed by specifying two indices, a low and high bound, separated by a colon:
```golang
var a [10]int

a[low:high]
```


When slicing, you may omit the high or low bounds to use their defaults instead.

The default is zero for the low bound and the length of the slice for the high bound.

```golang
var a [10]int

a[0:10]
a[:10]
a[0:]
a[:]
```

are all equivalent.

## References
- John Arundel, For the Love of Go
- https://go.dev/tour/moretypes/7
- https://go.dev/tour/moretypes/10

Next -> [go-slices-length-and-capacity](/wiki/go-slices-length-and-capacity/)

Next -> [slice-zero-value](/wiki/slice-zero-value/)

Next -> [creating-a-slice-with-make](/wiki/creating-a-slice-with-make/)
