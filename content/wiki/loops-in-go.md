+++
toc = true
hideReply = true
title = "Loops in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T17:42:25"
tags = ["programming",  "loops",  "range",  "repeat",  "for",  "infinite",  "statement",  "golang"]
+++


A set of statements which can be repeated is called a loop, and in Go loops are introduced by the keyword `for`.

We begin with the for keyword, followed by an (optional) conditional expression, and an opening curly brace. Then follows an (optional) set of statements, and a final closing curly brace.
```golang
for x < 10 {
    fmt.Println("x is less than 10")
    ... // update X, perhaps
}
```

Omitting a condition is equivalent to specifying the condition true, which is always true. A for loop without a condition will execute forever.

To loop over a collection of elements one by one, we can use the `range` keyword:
```golang
for i, e := range employees {
    fmt.Println("Employee number %d: %v", i, e)
}
```

`range` can return up to two values from a slice: the index value of each element (0, 1, 2, 3…) and the element value (the element itself).

If we only want the index value, we just needn’t bother to supply any variable to receive the element value.

## References

Next -> [init-and-post-statements-in-for-loops-in-go](/wiki/init-and-post-statements-in-for-loops-in-go/)
