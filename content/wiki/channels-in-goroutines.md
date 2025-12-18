+++
toc = true
hideReply = true
title = "Channels in Goroutines"
author = "Lorenzo Drumond"
date = "2024-02-27T20:24:33"
tags = ["thread",  "computer_science",  "scheduler",  "process",  "golang",  "concurrency",  "data",  "channels",  "CPU",  "PCB",  "programming",  "pipe"]
+++


Channels are a typed conduit (a passage, pipe) through which you can send and receive values with the channel operator `<-`
```golang
ch <- v  // send v to channel ch.
v := <- ch // receive from ch, and assign value to v.
```

The data flows in the direction of the arrow.

Like maps and slices, channels must be created before use:
```golang
ch := make(chan int)
```

By default, sends and receives block until the other side is ready. This allows goroutines to synchronize without explicit locks or condition variables.

The example code sums the numbers in a slice, distributing the work between two goroutines. Once both goroutines have completed their computation, it calculates the final result.

```golang
package main

import "fmt"

func sum(s []int, c chan int) {
  sum := 0
  for _, v := range s {
    sum += v
  }
  c <- sum // send sum to c
}

func main() {
  s := []int{7,2,8,-9,4,0}

  c := make(chan int)
  go sum(s[:len(s)/2], c)
  go sum(s[len(s)/2:], c)
  x, y := <-c, <-c //receive from c

  fmt.Println(x, y, x+y)
}

// Output:
// -5 17 12
```

## References
