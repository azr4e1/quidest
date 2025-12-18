+++
toc = true
hideReply = true
title = "Controlling nested loops with labels in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T18:00:20"
tags = ["programming",  "nested",  "loops",  "range",  "break",  "init",  "goto",  "flow",  "assignments",  "continue",  "labels",  "repeat",  "for",  "infinite",  "statement",  "golang",  "post"]
+++


Loops can be nested. When you use `break` inside a nested loop, it will jump out of the _current_ loop; `continue` will continue the _current_ loop.

If we want to break out of both loops from inside the inner loop, we can use a _label_.

A label in Go is simply a way of giving a name to a particular location in the code, so that we can refer to it later. The syntax for a label is just the name of the label followed by a colon.

```golang
outer:
    for x := 0; x < 10; x++ {
        for y := 0; y < 10; y++ {
            fmt.Println(x, y)
            if y == 5 {
                break outer
            }
        }
    }
```

If we wanted to continue the outer loop instead of exiting it, we could have written `continue outer`.

The `goto` keyword will simply jump directly to the specified label.

## References
- John Arundel, For the Love of Go
