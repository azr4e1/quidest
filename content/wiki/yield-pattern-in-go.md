+++
toc = true
hideReply = true
title = "Yield pattern in Go"
author = "Lorenzo Drumond"
date = "2024-07-09T11:01:16"
tags = ["golang",  "computer_science",  "pattern",  "concurrency",  "yield",  "goroutine"]
+++



```golang
func YieldFunction() <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := 0; i < 10; i++ {
            ch <- i // Yield data to the consumer
        }
    }()
    return ch
}

func main() {
    data := YieldFunction()
    for val := range data {
        // Process data concurrently
        fmt.Println(val)
    }
}
```

## References
- https://www.codingexplorations.com/blog/harnessing-the-power-of-the-yield-function-in-go#:~:text=The%20concept%20behind%20the%20%27yield,goroutine%20reads%20from%20that%20channel.
