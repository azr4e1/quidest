+++
toc = true
hideReply = true
title = "Switch expressions"
author = "Lorenzo Drumond"
date = "2024-01-28T17:25:35"
tags = ["switch",  "flow",  "golang",  "cascade",  "path",  "break",  "value",  "happy",  "multiple",  "expression",  "if",  "fallthrough",  "condition",  "programming"]
+++


If we want to take conditional actions on the value of some variable, `switch` gives us a handy shortcut: the _switch expression_:
```golang
switch x {
case 1:
    fmt.Println("one")
case 2:
    fmt.Println("two")
case 3:
    fmt.Println("three")
}
```
We say this statement switches on x, that is, the different cases represent different possible values of the switch expression x. You can use any Go expression here instead of x, providing that it evaluates to a value of the same type as your switch cases.

You can supply multiple values in the same case, as a comma-separated list. If any of the values match, the case will be triggered:
```golang
switch x {
  case 1, 2, 3:
    fmt.Println("one, two, or three")
...
}
```

One important difference from C is that Go only runs the selected case, not all cases that follow (so you don't need a `break` statement).

Another difference is that Go's switch cases need not be constants, and the values involved need not be integers.

Switch with no condition is the same as `switch true`, and can be a clean way to write long if-else chains

## References
- John Arundel, For the Love of Go
