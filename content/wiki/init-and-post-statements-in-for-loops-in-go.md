+++
toc = true
hideReply = true
title = "Init and Post statements in For loops in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T17:48:29"
tags = ["programming",  "range",  "statement",  "post",  "infinite",  "golang",  "repeat",  "for",  "loops",  "init",  "assignments"]
+++


Go has only one looping construct, the for loop.

The basic for loop has three components separated by semicolons:

the _init statement_: executed before the first iteration
the _condition expression_: evaluated before every iteration
the _post statement_: executed at the end of every iteration

The init statement will often be a short variable declaration, and the variables declared there are visible only in the scope of the for statement.

The loop will stop iterating once the boolean condition evaluates to false.


```golang
for x:= 0; x < 10; x++ {
  fmt.Println(x)
}
```

The init and post statement are optional
```golang
package main

import "fmt"

func main() {
	sum := 1
	for sum < 1000 {
		sum += sum
	}
	fmt.Println(sum)
}
```

## References
- https://go.dev/tour/flowcontrol/2

Next -> [continue-and-break-in-for-loops-in-go](/wiki/continue-and-break-in-for-loops-in-go/)
