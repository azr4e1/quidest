+++
toc = true
hideReply = true
title = "Function literals in Go"
author = "Lorenzo Drumond"
date = "2024-01-29T10:25:18"
tags = ["variadic",  "values",  "list",  "signature",  "type",  "golang",  "first_class_citizens",  "body",  "parameters",  "declare",  "programming",  "expression",  "tuple",  "functions",  "literals"]
+++


We don't need to assign a name to functions in Go. Functions can be written as literals. This is called `function literal`:
```golang
function := func(a, b float64) float64 {
  return math.Pow(a, b)
}
```

## References
- John Arundel, For the Love of Go

Next -> [closures-in-go](/wiki/closures-in-go/)
