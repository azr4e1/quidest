+++
toc = true
hideReply = true
title = "Pointer methods in Go"
author = "Lorenzo Drumond"
date = "2024-01-27T00:55:15"
tags = ["golang",  "stack",  "programming",  "pass_by",  "reference",  "heap",  "for_the_love_of_go",  "value",  "pointer",  "methods"]
+++


A pointer type can also have methods. These are defined like normal methods, but taking care that the receiver ([go-types-and-methods](/wiki/go-types-and-methods/)) is a pointer and thus needs to be dereferenced.

E.g.:
```golang
type MyInt int

func (input *MyInt) Double() {
  *input *= 2
}
```

Methods with pointer receiver can modify the value to which the receiver points.

N.B.: while functions with a pointer argument must take a pointer, methods with pointer receivers take either a value or a pointer as the receiver when they are called. When they are passed the value, the method with the pointer receiver is called automatically.
```golang
x = MyInt(3)
// you can do this:
(&x).Double()
// you can also do this:
x.Double()
```

In the example above, when you pass `x` by value, Go will interpret the statement as `(&x).Double()` as a convenience.

Moreover, Go supports automatic de-referencing. We know that when a function (or a method) wants to do something with a pointer, it needs to dereference it first, using the `*` operator, to get the value that it points to.

E.g.:
```golang
func (b *Book) SetPriceCents(price int) error {
    (*b).PriceCents = price
    return nil
}
```

where `Book` is a struct with `PriceCents` field.

In structs, Go knows that pointers don’t have fields, only structs do. So if you write something like `b.PriceCents` that looks like a struct field, Go is smart enough to assume you meant “dereference b to get the struct it points to, then modify its PriceCents field”.

```golang
func (b *Book) SetPriceCents(price int) error {
    b.PriceCents = price
    return nil
}
```

This is called automatic dereferencing, and since most methods on structs are pointer methods, it’s very helpful.

## References
- John Arundel, For the Love of Go
- https://go.dev/tour/methods/6

Next -> [choosing-a-value-or-pointer-receiver-in-go](/wiki/choosing-a-value-or-pointer-receiver-in-go/)
