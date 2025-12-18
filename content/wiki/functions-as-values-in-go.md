+++
toc = true
hideReply = true
title = "Functions as values in Go"
author = "Lorenzo Drumond"
date = "2024-01-29T10:20:59"
tags = ["variadic",  "values",  "list",  "signature",  "type",  "golang",  "first_class_citizens",  "body",  "parameters",  "programming",  "expression",  "tuple",  "functions",  "declare"]
+++


In Go, functions are values. We can do anything with a function that we could do with a value; we can:
- assign a function to a variable or struct field
- pass a function as an argument to another function
- return a function as the result from another function


To declare a variable with a function type, we can write:
```golang
var function func(float64, float64) float64
```

We've declared a variable named `function` whose type is `func(float64, float64) float64`

## References
- John Arundel, For the Love of Go

Next -> [function-literals-in-go](/wiki/function-literals-in-go/)
