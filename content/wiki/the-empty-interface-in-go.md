+++
toc = true
hideReply = true
title = "The empty interface in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T14:00:56"
tags = ["nil",  "pointer",  "heap",  "interface",  "empty",  "pass_by",  "golang",  "value",  "panic",  "stack",  "values",  "reference",  "methods",  "for_the_love_of_go",  "programming"]
+++


The interface type that specifies zero methods is knows as the _empty interface_:
```golang
interface{}
```

An empty interface may hold values of any type. (Every type implements at least zero methods.)

Empty interfaces are used by code that handles values of unknown type. For example, `fmt.Print` takes any number of arguments of type `interface{}`

## References
- [go-types-and-methods](/wiki/go-types-and-methods/)

Next -> [type-assertions-in-go](/wiki/type-assertions-in-go/)
