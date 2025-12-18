+++
toc = true
hideReply = true
title = "Values and Variables in Go"
author = "Lorenzo Drumond"
date = "2024-01-20T16:46:16"
tags = ["for_the_love_of_go",  "programming",  "golang",  "type"]
+++


A value is a piece of data, like 'Hello, World!'. Values have types: the type of 'Hello, World!' is named `string`. So we call this a _string value_.

A variable is a name identifying a particular place in the computer's memory that can store some specific value. A variable (in Go and other programming languages like C and Haskell) also has a type, which determines what values it can hold.

A string variable can only hold string values, etc.

In Go, we _declare_ a variable and its type with the following syntax
```golang
var title string
var copies int
```

The Go compiler will use the type information you've provided to check whether you accidentally assigned a value to the wrong type of variable.

## References
- John Arundel, For the love of Go

Next -> [zero-values-and-default-values-in-go](/wiki/zero-values-and-default-values-in-go/)

Next -> [composite-values-and-structs-in-go](/wiki/composite-values-and-structs-in-go/)

Next -> [shorthand-assignment-in-go](/wiki/shorthand-assignment-in-go/)
