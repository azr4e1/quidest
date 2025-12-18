+++
toc = true
hideReply = true
title = "Interface values with nil underlying values in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T13:49:42"
tags = ["nil",  "pointer",  "heap",  "interface",  "pass_by",  "golang",  "value",  "panic",  "stack",  "values",  "reference",  "methods",  "for_the_love_of_go",  "programming"]
+++


If the concrete value inside the interface itself is nil, the method will be called with a nil receiver.

In some languages this would trigger a null pointer exception, but in Go it is common to write methods that gracefully handle being called with a nil receiver (as with the method M in this example.)

Note that an interface value that holds a nil concrete value is itself non-nil.

E.g.:
```golang
package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}

func main() {
	var i I

	var t *T
	i = t
	describe(i)
	i.M()

	i = &T{"hello"}
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}

// Output
// (<nil>, *main.T)
// <nil>
// (&{hello}, *main.T)
// hello
```

## References
- [go-types-and-methods](/wiki/go-types-and-methods/)

Next -> [the-empty-interface-in-go](/wiki/the-empty-interface-in-go/)
