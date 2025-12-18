+++
toc = true
hideReply = true
title = "Goroutines"
author = "Lorenzo Drumond"
date = "2024-02-27T20:20:21"
tags = ["thread",  "computer_science",  "process",  "scheduler",  "golang",  "concurrency",  "CPU",  "PCB",  "programming"]
+++


A _goroutine_ is a lightweight thread managed by the Go runtime.

```golang
go f(x, y, z)
```

starts a new goroutine running
```golang
f(x, y, z)
```

The evaluation of `f`, `x`, `y`, `z` happens in the current goroutine and the execution of `f` happens in the new goroutine.

Goroutines run in the same address space, so access to shared memory must by synchronized. The `sync` package provides useful primitives, although you won't need them much in Go as there are other primitives.

```golang
package main

import (
  "fmt"
  "time"
)

func say(s string) {
  for i := 0; i < 5; i++ {
    time.Sleep(100 * time.Millisecond)
    fmt.Println(s)
  }
}

func main() {
  go say("world")
  say("hello")
}

// Output:
// world
// hello
// hello
// world
// world
// hello
// hello
// world
// world
// hello
```

## References

Next -> [channels-in-goroutines](/wiki/channels-in-goroutines/)
