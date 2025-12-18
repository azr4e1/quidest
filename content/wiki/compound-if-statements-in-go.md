+++
toc = true
hideReply = true
title = "Compound if statements in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T17:10:25"
tags = ["programming",  "if",  "control",  "basics",  "statement",  "conditional",  "golang",  "flow"]
+++


It’s very common in Go to assign or compute the value of some variable, and then use an if statement to take some decision about it. So common, indeed, that Go provides a special form to make this easier. We can write the assignment statement after the if keyword, but before the condition, separated from it by a semicolon (;):
```golang
if _, ok := menu["eggs"]; ok {
    fmt.Println("Eggs are on the menu!")
}
```

The rules of scope for Go variables mean that, in this form, the ok variable can’t be used outside the if block.

You’re telling the reader that the ok variable is only needed within this one if block, and you won’t be using it afterwards.

Any variables declared in this statement are available in the current and all subsequent branches, like `else if` and `else`

## References
- [early-return](/wiki/early-return/)
- [happy-path](/wiki/happy-path/)
