+++
toc = true
hideReply = true
title = "Readers in Go"
author = "Lorenzo Drumond"
date = "2024-02-27T14:46:17"
tags = ["heap",  "snippet",  "for_the_love_of_go",  "programming",  "reference",  "pointer",  "value",  "readers",  "pass_by",  "methods",  "interface",  "golang",  "stack"]
+++


The `io` package specifies the `io.Reader` interface, which represents the read end of a stream of data.

The Go standard library contains many implementations of this interface, including files, network connections, compressors, ciphers, and others.

The `io.Reader` interface has a `Read` method:

```golang
func (T) Read(b []byte) (n int, err error)
```

Read populates the given byte slice with data and returns the number of bytes populated and an error value. It returns an `io.EOF` error when the stream ends.

The example code creates a `strings.Reader` and consumes its output 8 bytes at a time.

```golang
package main

import (
	"fmt"
	"io"
	"strings"
)

func main() {
	r := strings.NewReader("Hello, Reader!")

	b := make([]byte, 8)
	for {
		n, err := r.Read(b)
		fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
		fmt.Printf("b[:n] = %q\n", b[:n])
		if err == io.EOF {
			break
		}
	}
}
```

## References
- [interface-values-in-go](/wiki/interface-values-in-go/)
- [errors-in-go](/wiki/errors-in-go/)
- [go-types-and-methods](/wiki/go-types-and-methods/)
- [stringers-interface-in-go](/wiki/stringers-interface-in-go/)
