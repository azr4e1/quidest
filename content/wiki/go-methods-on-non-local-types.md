+++
toc = true
hideReply = true
title = "Go methods on non-local types"
author = "Lorenzo Drumond"
date = "2024-01-27T00:24:53"
tags = ["types",  "golang",  "methods",  "non_local",  "programming",  "custom",  "receiver",  "local"]
+++


We cannot add methods to _non-local_ types, that is, types not defined in our package.

We can however create a new type that inherits from the type we want to add the method too:
```golang
type MyInt int
```

Now, `MyInt` is a local type we can add methods to.
```golang
func (i MyInt) Twice() MyInt {
    return i * 2
}
```

Careful that Go considers `int` and `MyInt` two distinct types. You can’t pass an `int` value where a `MyInt` is expected, and vice versa.

This means we have to convert `int`s to `MyInt`s using _type conversion_:
```golang
input := MyInt(9)
```

Not every type conversion is possible.

## References
- [go-struct-wrappers](/wiki/go-struct-wrappers/)
- John Arundel, For the Love of Go

Next -> [go-struct-wrappers](/wiki/go-struct-wrappers/)
