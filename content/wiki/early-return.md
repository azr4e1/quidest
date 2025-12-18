+++
toc = true
hideReply = true
title = "Early return"
author = "Lorenzo Drumond"
date = "2024-01-28T16:45:52"
tags = ["return",  "basics",  "programming",  "conditional",  "if",  "golang",  "control",  "flow",  "statement"]
+++


Early return is a design patter that combines with the [happy-path](/wiki/happy-path/) design pattern. When a function deviates from the happy path, we include a return inside the deviation so that the function interrupts.

```golang
if x <= 0 {
    fmt.Println("Nope, x is zero or negative")
    return false
}
```

It’s clear that if the function gets past this point, the condition must have been false, or we would have returned already.


This often makes `else` statements pointless

## References
- [happy-path](/wiki/happy-path/)
