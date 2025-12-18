+++
toc = true
hideReply = true
title = "Errors in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T14:29:34"
tags = ["pointer",  "errors",  "stack",  "for_the_love_of_go",  "interface",  "methods",  "pass_by",  "reference",  "value",  "golang",  "programming",  "heap"]
+++


Go programs express error state with `error` values.

The `error` type is a built-in interface similar to `fmt.Stringer`:
```golang
type error interface {
  Error() string
}
```

functions often return an `error` value, and calling code should handle errors by testing whether the error equals to `nil`:
```golang
i, err := strconv.Atoi("42")
if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
    return
}
fmt.Println("Converted integer:", i)
```

## References
- [interface-values-in-go](/wiki/interface-values-in-go/)
- [stringers-interface-in-go](/wiki/stringers-interface-in-go/)
