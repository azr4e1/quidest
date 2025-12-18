+++
toc = true
hideReply = true
title = "Continue and Break in For loops in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T17:54:14"
tags = ["programming",  "loops",  "range",  "break",  "init",  "flow",  "assignments",  "continue",  "repeat",  "for",  "infinite",  "statement",  "golang",  "post"]
+++


If we want to skip onto the next element in succession in a for loop, we can use the `continue` keyword:
```golang
for _, el := range employees {
  if !e.IsCurrent {
    continue
  }
  e.PrintCheck()
}
```

When we need to terminate the loop early, we can use the `break` keyword:
```golang
for _, e := range employees {
    if MoneyLeft() <= 0 {
        fmt.Println("Oops, out of cash!")
        break
    }
    ... // otherwise, print check
}
```

As soon as Go encounters a break statement, it immediately stops the loop and jumps to the code immediately following the closing brace at the end of the for statement.

## References

Next -> [controlling-nested-loops-with-labels-in-go](/wiki/controlling-nested-loops-with-labels-in-go/)
