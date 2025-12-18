+++
toc = true
hideReply = true
title = "Modifying result parameters after exit in Go"
author = "Lorenzo Drumond"
date = "2024-01-29T10:48:13"
tags = ["expression",  "values",  "defer",  "programming",  "type",  "bubble",  "functions",  "body",  "closure",  "parameters",  "declare",  "signature",  "leak",  "first_class_citizens",  "tuple",  "literals",  "golang",  "variadic",  "stack",  "list"]
+++


The `defer` keyword is useful for clean up operations. However sometimes we want to be able for the deferred call to modify the return value of the enclosing function.

Suppose we have some function that writes data to a file, and returns a `error` result to indicate whether is succeeded.

We want to defer closing the file. However, the closing operation itself could fail. In that case we need to return error. But since the error happens in the deferred function, the return value has already been set to be `nil`:
```golang
... // we open f
defer f.Close()
... // write to f
return nil
```

We can defer _any_ function call. So instead of deferring `f.Close()` directly, we could defer a wrapper function literal:
```golang
defer func() {
  closeErr = f.Close()
  if closeErr != nil {
    fmt.Println("Error")
  }
}()
```

However we can do even better: if we name this function's error result parameter `err`, then it's declared inside the function. A function literal is a closure on the function's variables, therefore we can access `err` from inside the closure:
```golang
defer func() {
  closeErr = f.Close()
  if closeErr != nil {
    err = closeErr
  }
}()
```

This will modify the function's result _after_ it exited, but before it returned

## References
- John Arundel, For the Love of Go
