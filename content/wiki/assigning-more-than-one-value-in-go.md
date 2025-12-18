+++
toc = true
hideReply = true
title = "Assigning more than one value in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T14:52:07"
tags = ["basics",  "assignment",  "programming",  "golang",  "tuples",  "statement"]
+++


When you have several assignments to do, Go has a nice feature to help you: the tuple assignment. A tuple is an ordered list of things.

Suppose we have three variables a, b, and c, and we want to assign them the values 1, 2, and 3 respectively.

We can write
```golang
a, b, c := 1, 2, 3
```

`var x, y = 2, 3` is slightly safer to use than `x, y := 2, 3`. The former ensures that both `x` and `y` do not already exist in the _current_ scope.

## References
- [declaration-in-go](/wiki/declaration-in-go/)
