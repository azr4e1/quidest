+++
toc = true
hideReply = true
title = "Go maps"
author = "Lorenzo Drumond"
date = "2024-01-27T01:03:08"
tags = ["slice",  "hash",  "programming",  "map",  "golang",  "computer_science"]
+++


A `map` is a data structure that allows to store values with arbitrary indexes called _keys_.

A map maps keys to values.

The zero value of a map is `nil`. A nil map has no keys, nor can keys be added.

The `make` function returns a map of the given type, initialized and ready for use.

A map literal in go is defined like this:
```golang
catalog := map[int]Book{
  1: Book{ID: 1, Title: "For the Love of Go"}
}
```

so you specify the type of the key inside square brackets, and the type of the values afterwards.

If the top-level type is just a type name, you can omit it from the elements of the literal.
```golang
catalog := map[int]Book{
  1: {ID: 1, Title: "For the Love of Go"}
}
```

## Operations
To access elements, you just need to specify their key in square brackets:
```golang
catalog[1]
```

To insert or update an element:
```golang
catalog[key] = elem
```

To delete an element:
```golang
delete(catalog, key)
```

Test that a key is present with a two-value assignment:
```golang
val, ok := catalog[key]
```

`ok` will return `true` if `key` is in the map, otherwise `false`. In the latter, `val` will be zero value.

```golang
package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex // nil

func main() {
	m = make(map[string]Vertex) // not nil
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])
}
```

## References
- John Arundel, For the Love of Go

Next -> [updating-struct-elements-inside-a-map-in-go](/wiki/updating-struct-elements-inside-a-map-in-go/)
