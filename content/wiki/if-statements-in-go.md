+++
toc = true
hideReply = true
title = "If statements in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T16:33:28"
tags = ["programming",  "control",  "statement",  "flow",  "basics",  "golang",  "if",  "conditional"]
+++


An if statement begins with the keyword if, followed by some expression whose value is true or false. This is the conditional expression which determines whether or not the code in the if statement will be executed.

```golang
if x > 0 {
    fmt.Println("x is positive")
}
```

## Else statements
Whereas an if statement on its own just does or doesn’t do something based on the condition, an if ... else statement does one thing or another (but never both).

```golang
fmt.Println("Let's see what the sign of x is:")
if x <= 0 {
    fmt.Println("x is zero or negative")
} else {
    fmt.Println("x is positive")
}
fmt.Println("Well, that clears that up!")
```

You can also write `else if` statements:
```golang
fmt.Println("Let's see what the sign of x is:")
if x < 0 {
    fmt.Println("x negative")
} else if x == 0 {
    fmt.Println("x is zero")
} else {
    fmt.Println("x is negative")
}
fmt.Println("Well, that clears that up!")
```

## References

Next -> [happy-path](/wiki/happy-path/)

Next -> [early-return](/wiki/early-return/)

Next -> [compound-if-statements-in-go](/wiki/compound-if-statements-in-go/)
