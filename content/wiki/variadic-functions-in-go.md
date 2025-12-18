+++
toc = true
hideReply = true
title = "Variadic Functions in Go"
author = "Lorenzo Drumond"
date = "2024-01-29T10:57:51"
tags = ["parameters",  "body",  "signature",  "functions",  "slice",  "type",  "variadic",  "golang",  "tuple",  "multiple",  "list",  "expression",  "declare",  "programming",  "arguments"]
+++


Some GO functions can take a variable number of parameters: these are called _variadic functions_.

To define a variadic function in Go, we need to use the `...` symbol, followed by a type.

The `...` indicates that there can be zero, one, two or any number of parameters of that type to the function:
```golang
func AddMany(inputs ...float64) float64 {
  var total float64
  for _, val := range inputs {
    total += val
  }

  return total
}
```

Inside the function body, `inputs` acts like a slice.

## References
- [multiple-values-in-go-functions](/wiki/multiple-values-in-go-functions/)
- [functions-as-values-in-go](/wiki/functions-as-values-in-go/)
- [named-result-parameters-in-go](/wiki/named-result-parameters-in-go/)
