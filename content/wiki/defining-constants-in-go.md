+++
toc = true
hideReply = true
title = "Defining constants in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T14:13:36"
tags = ["values",  "constants",  "define",  "variables",  "golang",  "sets",  "programming"]
+++


We define a constant with the `const` keyword:

```golang
const CategoryAutobiography = "Autobiography"
```

We can group multiple constants between brackets:

```golang
const (
    CategoryAutobiography = "Autobiography"
    CategoryLargePrintRomance = "Large Print Romance"
    CategoryParticlePhysics = "Particle Physics"
)
```

When the set of constants need to be of a certain type, we can specify the type for the first constant, and the rest will infer it automatically:
```golang
type Category int

const (

    CategoryAutobiography Category = 0
    CategoryLargePrintRomance = 1
    CategoryParticlePhysics = 2
)
```

Numeric constants are _high-precision_ values.

An untyped constant takes the type needed by its context.

## References
- John Arundel, For the Love of Go
- https://go.dev/tour/basics/16

Next -> [iota-constant-in-go](/wiki/iota-constant-in-go/)
