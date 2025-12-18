+++
toc = true
hideReply = true
title = "Blank identifier in Go"
author = "Lorenzo Drumond"
date = "2024-01-19T16:02:02"
tags = ["value",  "syntax",  "variable",  "map",  "programming",  "compiler",  "error",  "panic",  "golang",  "variables",  "blank",  "identifier"]
+++


The Go compiler won't let us declare a variable that we never refer to again (it correctly infers that this must be a mistake)

Sometimes however we _need_ a variable syntactically, as in the left-hand side of an assignment statement: in this case, we can use the _blank identifier_ `_` to act as a placeholder.

For example, if we're only interested into knowing whether a key is present in a map or not, we can write
```golang
_, ok := menu["eggs"]
```

## References
