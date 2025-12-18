+++
toc = true
hideReply = true
title = "Go Switch cases"
author = "Lorenzo Drumond"
date = "2024-01-28T17:16:46"
tags = ["golang",  "flow",  "cascade",  "programming",  "break",  "switch",  "fallthrough",  "condition",  "path",  "multiple",  "if",  "happy"]
+++


Switch cases is a conditional statement that let's us specify any number of _cases_ (possible conditions), linking each case to a different code path.

```golang
switch {
  case x < 0:
    fmt.Println("negative")
  case x > 0:
    fmt.Println("positive")
  default:
    fmt.Println("zero")
}
```

We begin with the keyword switch, followed by an opening curly brace, and then a list of cases, and a final closing curly brace.

Each case is introduced by the keyword case, followed by some conditional expression (for example, x < 0) and a colon.

When Go encounters a switch statement like this, it looks at the first case and evaluates the conditional expression there. If this expression is true, the statements for this case are executed, and that’s the end of the switch statement; control moves on to the next part of the program.

If the expression is false, execution moves on to the next case, and so on, until it finds a case that matches (that is, whose conditional expression evaluates to true). If no case matches, then nothing happens and the program moves on.

Once a case has been matched, Go doesn’t examine any further cases, and skips to the end of the statement instead.

There’s a special statement to change this behaviour: writing `fallthrough` at the end of a case tells Go to execute the statements in the next case, instead of skipping to the end.

The special case `default` matches only if no other case has been matched.

If we want to interrupt the execution of a case early, we can use the `break` keyword. The execution will resume from the end of the `switch` statement.

```golang
switch x {
case 1:
    if SomethingWentWrong() {
        break
    }
    ... // otherwise carry on
}
```

## References
- John Arundel, For the Love of Go

Next -> [switch-expressions](/wiki/switch-expressions/)
Next -> [type-switches-in-go](/wiki/type-switches-in-go/)
