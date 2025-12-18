+++
toc = true
hideReply = true
title = "Functions in Go"
author = "Lorenzo Drumond"
date = "2024-01-29T10:03:41"
tags = ["signature",  "declare",  "variadic",  "parameters",  "body",  "functions",  "programming",  "type",  "tuple",  "expression",  "golang",  "list"]
+++


A function in Go is declared by specifying name, input parameters, result that it returns, and the body of the function

Functions in Go are declared at _package_ level. Named functions cannot be declared inside other functions.

A function declaration is introduced by the keyword _func_:
```golang
func double(x float64) float64 {
  return x * 2
}
```

In the parameter list, we need to give the type expected for each parameter.

For multiple parameter, we write a comma-separated list:
```golang
func add(x float64, y float64, z float64) float64 {
  return x + y + z
}
```

If the sequence of parameters have the same type, we can write it shorter:
```golang
func add(x, y, z float 64) float 64 {
```

For the results, we also need to specify the type with a comma-separated list:
```golang
func location() (float64, float64, error) {
```

We can give names to result parameters as well.


The combination of parameters and return values of a function is called _signature_ of the function.

The function body is a list of statements contained within curly braces.

The statements of a function body are not executed until the function is called. A function call affects the control flow by redirecting it to the start of the function body, and when it reaches the end of it, it resumes from where it was interrupted (the line below the function call).

We can call a function by giving its name, followed by some arguments in brackets.

A function call that returns a value is an _expression_. It can be combined with other expressions:
```golang
answer := 3 * (double(2.5) + 7)
```

Functions can return multiple values. The only thing we can do with multiple results is to use them in a _tuple assignment_:
```golang
lat, long, err := location()
```


If a function is declared with no results parameters, it implicitly exits when the end is reached.

To return before that point we can use a `return` statement:
```golang
if err != nil {
  return
}
```

If the function declares some results, we can't use return on its now, but we must return the values declared.

## References
- John Arundel, For the Love of Go

Next -> [functions-as-values-in-go](/wiki/functions-as-values-in-go/)
Next -> [multiple-values-in-go-functions](/wiki/multiple-values-in-go-functions/)

Next -> [named-result-parameters-in-go](/wiki/named-result-parameters-in-go/)

Next -> [variadic-functions-in-go](/wiki/variadic-functions-in-go/)
