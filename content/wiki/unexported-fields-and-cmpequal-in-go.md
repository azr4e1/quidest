+++
toc = true
hideReply = true
title = "Unexported fields and cmp.Equal in Go"
author = "Lorenzo Drumond"
date = "2024-01-28T14:05:07"
tags = ["exported",  "programming",  "for_the_love_of_go",  "values",  "struct",  "panic",  "cmp",  "golang",  "variables",  "methods",  "validation",  "Equal",  "unexported"]
+++


When you have unexported fields in your struct, but you want to be able to use `cmp.Equal` in your tests, you'll run in compilation errors because `cmp.Equal` cannot see all the fields.

```
--- FAIL: TestGetAllBooks (0.00s)
panic: cannot handle unexported field at
    {[]bookstore.Book}[1].category: "bookstore".Book
consider using a custom Comparer; if you control the
implementation of type, you can also consider using an
Exporter, AllowUnexported, or cmpopts.IgnoreUnexported
[recovered]
```

Since it’s quite common in Go to define types with unexported fields, and cmp.Equal is invaluable in tests, you’re bound to run into this problem at some point, so let’s see how to solve it.

Add the following import to your package:

```golang
"github.com/google/go-cmp/cmp/cmpopts"
```

Modify the calls to `cmp.Equal` in your tests to change them from this:

```golang
if !cmp.Equal(want, got) {
```

to this:

```golang
if !cmp.Equal(want, got,
    cmpopts.IgnoreUnexported(bookstore.Book{})) {
```

This tells `cmp.Equal` to ignore any unexported fields on the `bookstore.Book` struct, preventing the unpleasant panic message.

## References
- [exported-identifiers-in-go](/wiki/exported-identifiers-in-go/)
- John Arundel, For the Love of Go
