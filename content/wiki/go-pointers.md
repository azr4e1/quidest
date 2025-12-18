+++
toc = true
hideReply = true
title = "Go pointers"
author = "Lorenzo Drumond"
date = "2024-01-22T17:59:45"
tags = ["stack",  "indirecting",  "golang",  "reference",  "pass_by",  "value",  "programming",  "heap",  "pointer",  "for_the_love_of_go",  "dereferencing"]
+++


In Go parameters are _passed by value_; the __value__ of a variable is passed to a function, and the function will use that value without modifying the original variable.

If we want the function to be able to access the variables outside, we need to pass it their _pointers_. Pointers are objects that provide the memory address of the variable.

A pointer holds the memory address of a value.

The `&` operator generates a pointer to its operand.

E.g.:
```golang
Double(&x)
```

we are passing the pointer to `x` to the function `Double`

Pointers have their own type: a pointer to an integer has type `*int`, a pointer to a floating point value has type `*float64` and so on. You get the type of the pointer by preceding the type of the variable with *.

Pointers' type is not just _pointer_: `*int` is distinct from `*float64`.


Inside the function, you can't do operations with the pointer itself. Instead, you'll have the _de-reference_ it, that is, you'll need to get the variable the pointer is pointing to.

The `*` operator denotes the pointer's underlying value.

E.g.:
```golang
func Double(input *int) {
  *input *= 2
}
```

You dereference a pointer by preceding it with asterisk.

The default value of a pointer is `nil`.

If you try to dereference `nil`, you'll get panic.

## References
- John Arundel, For the Love of Go

Next -> [pointer-methods-in-go](/wiki/pointer-methods-in-go/)

Next -> [pointers-to-struct](/wiki/pointers-to-struct/)
