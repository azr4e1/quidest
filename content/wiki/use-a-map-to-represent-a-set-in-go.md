+++
toc = true
hideReply = true
title = "Use a map to represent a set in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T14:09:28"
tags = ["set",  "map",  "programming",  "booleans",  "values",  "variables",  "golang"]
+++


When you want to represent a set of objects in Go, a nice trick is to use a map with keys as your objects, and values as booleans.

E.g.:
```golang
var myMap = map[Object]bool{
  Object1: true,
  Object2: true,
  Object3: true,
  ...,
}
```

This will make it very natural when checking the existence of an object in your set:
```golang
if myMap[obj] {
  ...
}
```

in fact, if the object doesn't exist, by default Go returns the empty value ([non-existent-keys-in-go-maps]]), which for booleans is `false` ([[zero-values-and-default-values-in-go](/wiki/non-existent-keys-in-go-maps]]), which for booleans is `false` ([[zero-values-and-default-values-in-go/))

## References
- John Arundel, For the Love of Go
