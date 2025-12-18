+++
toc = true
hideReply = true
title = "Assignment statement in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T14:34:22"
tags = ["basics",  "assignment",  "programming",  "golang",  "statement"]
+++


The following statement:
```golang
b = Book{Title: "The Making of a Butterfly"}
```
is an _assignment statement_: it assigns a literal value of the Book struct to a variable named b, which must already exist.

We can think of this as assigning labels to values; from now own, we can refer to that `Book` value via the name b, and everytime the name b occurs in the code, it will be translated to that `Book` value.

## Short Variable Declaration
It’s so common in Go to want to declare a variable and then assign a value to it that there’s actually a special syntax form to do just this: the short variable declaration.

It looks like this:
```golang
b := Book{Title: "The Making of a Butterfly"}
```

The type is inferred from the type of the literal.

N.B. Short variable declaration is only allowed inside functions.


This both declares a new variable b, and assigns it a `Book` literal, in a single statement. It is a shorthand for
```golang
var b = Book{Title: "The Making of a Butterfly"}
```

or even
```golang
var b Book = Book{Title: "The Making of a Butterfly"}
```

```golang
var c float64 = 2
```

## References
- https://groups.google.com/g/golang-nuts/c/VHusi510LIg?pli=1

Next -> [declaration-in-go](/wiki/declaration-in-go/)

Next -> [assigning-more-than-one-value-in-go](/wiki/assigning-more-than-one-value-in-go/)
