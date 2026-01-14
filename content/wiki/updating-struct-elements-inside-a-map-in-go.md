+++
toc = true
hideReply = true
title = "Updating struct elements inside a map in Go"
author = "Lorenzo Drumond"
date = "2024-01-22T14:42:22"
tags = ["programming",  "golang",  "struct",  "for_the_love_of_go",  "map",  "element"]
+++


Go doesn't allow you to modify fields of map elements directly like this:
```golang
catalog[1].Title = "For the Love of Go"
// This doesn't work

// compiler error:
// cannot assign to struct field catalog[1].Title in map
```

We have to get the element out of the map, assign it to some variable, and modify the variable instead. We can then use the modified value to overwrite the original book:
```golang
b := catalog[1]
b.Title = "For the Love of Go"
catalog[1] = b
```

## References
- John Arundel, For the Love of Go

Next -> [non-existent-keys-in-go-maps](/wiki/non-existent-keys-in-go-maps/)

