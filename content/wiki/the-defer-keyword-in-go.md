+++
toc = true
hideReply = true
title = "The defer keyword in Go"
author = "Lorenzo Drumond"
date = "2024-01-29T10:37:06"
tags = ["expression",  "golang",  "body",  "variadic",  "parameters",  "bubble",  "type",  "literals",  "closure",  "functions",  "values",  "leak",  "declare",  "signature",  "first_class_citizens",  "programming",  "list",  "stack",  "defer",  "tuple"]
+++


Sometimes we need to clean up resources, like when we open a file: we need to close the handle before we exit. We could do something like:
```golang
f, err := os.Open("testdata/somefile.txt")
... // do something with f
f.Close()
```

However if something panics before we can close f, or if the function exits before that, then f will hang around in memory forever (it will _leak_)

To make sure the `f.Close()` line is executed no matter what, we can use the `defer` keyword.

A `defer` statements takes some function call and _defers_ it, that is, it doesn't call the function now, but it remembers to call it right before the function exits:

```golang
f, err := os.Open("testdata/somefile.txt")
if err != nil {
  return err
}
defer f.Close()
... // do stuff with f
```

We can call multiple defers in the same function for different function calls. All the defer functions will be executed when the function exits in _inversed_ order. This is referred to as _stacking defers_.

A defer statement defers the execution of a function until the surrounding function returns.

The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.


## References
- John Arundel, For the Love of Go
- https://go.dev/tour/flowcontrol/12
- https://go.dev/tour/flowcontrol/13

Next -> [modifying-results-parameter-after-exit-in-go](/wiki/modifying-results-parameter-after-exit-in-go/)
