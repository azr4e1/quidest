+++
toc = true
hideReply = true
title = "Iota constant in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T14:16:34"
tags = ["programming",  "constants",  "values",  "define",  "golang",  "variables",  "sets"]
+++


When we are only interested in representing the allowed value of something, but we don't care what those actual values are, we can use the `iota` constant. It will get the value 0, and successive constants will get successively increasing values: 1, 2, 3...

```golang
type Category int

const (
    CategoryAutobiography Category = iota
    CategoryLargePrintRomance
    CategoryParticlePhysics
)
```

## References
- John Arundel, For the Love of Go
