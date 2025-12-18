+++
toc = true
hideReply = true
title = "Type assertions in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T14:07:26"
tags = ["nil",  "pointer",  "heap",  "interface",  "empty",  "assertion",  "pass_by",  "golang",  "value",  "type",  "panic",  "stack",  "values",  "reference",  "methods",  "for_the_love_of_go",  "programming"]
+++


A type assertion provides access to an interface value's underlying concrete value.

```golang
t := i.(T)
```

This statement asserts that the interface value `i` holds the concrete type `T` and assigns the underlying `T` value to the variable `t`.

If `i` does not hold a `T`, the statement will trigger a panic.

To test whether an interface value holds a specific type, a type assertion can return two values: the underlying value and a boolean value that reports whether the assertion succeeded.

```golang
t, ok := i.(T)
```

If `i` holds a `T`, then `t` will be the underlying value and `ok` will be `true`.

If not, `ok` will be `false` and `t` will be the zero value of type `T`, and no panic occurs.

## References
- [go-types-and-methods](/wiki/go-types-and-methods/)

Next -> [type-switches-in-go](/wiki/type-switches-in-go/)
