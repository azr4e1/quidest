+++
date = '2026-01-23T16:49:33Z'
title = 'Go range-over-func'
hideReply = true
+++

# Range Over Function (Custom Iterators) in Go

Range-over-func was introduced in Go 1.23 (released August 2024) and allows you to use the `range` keyword with custom iterator functions, making it possible to create your own iterable types.

## Core Concepts

### The Iterator Function Signature

Iterator functions have specific signatures defined in the `iter` package:

```go
// Iterator that yields single values
type Seq[V any] func(yield func(V) bool)

// Iterator that yields key-value pairs
type Seq2[K, V any] func(yield func(K, V) bool)
```

### Basic Usage

```go
import "iter"

// Simple iterator that yields numbers 1 to n
func Count(n int) iter.Seq[int] {
    return func(yield func(int) bool) {
        for i := 1; i <= n; i++ {
            if !yield(i) {
                return // Consumer stopped iterating
            }
        }
    }
}

// Use it with range
for num := range Count(5) {
    fmt.Println(num) // Prints 1, 2, 3, 4, 5
}
```

### How It Works

The `yield` function is called by the iterator to produce values:

- Returns `true`: Consumer wants more values (continue iterating)
- Returns `false`: Consumer stopped (break, return, or finished)

```go
func Fibonacci(max int) iter.Seq[int] {
    return func(yield func(int) bool) {
        a, b := 0, 1
        for a <= max {
            if !yield(a) {
                return // Stop if consumer breaks
            }
            a, b = b, a+b
        }
    }
}

for num := range Fibonacci(100) {
    fmt.Println(num)
    if num > 50 {
        break // yield returns false, iterator stops
    }
}
```

## Seq2: Key-Value Iterators

For iterating pairs of values (like map entries):

```go
// Iterator that yields index and value
func Enumerate[V any](slice []V) iter.Seq2[int, V] {
    return func(yield func(int, V) bool) {
        for i, v := range slice {
            if !yield(i, v) {
                return
            }
        }
    }
}

// Usage
fruits := []string{"apple", "banana", "cherry"}
for idx, fruit := range Enumerate(fruits) {
    fmt.Printf("%d: %s\n", idx, fruit)
}
```

## Creating Custom Iterators

### Tree Traversal

```go
type Tree[T any] struct {
    Value T
    Left  *Tree[T]
    Right *Tree[T]
}

// In-order traversal
func (t *Tree[T]) InOrder() iter.Seq[T] {
    return func(yield func(T) bool) {
        t.inOrder(yield)
    }
}

func (t *Tree[T]) inOrder(yield func(T) bool) bool {
    if t == nil {
        return true
    }
    if !t.Left.inOrder(yield) {
        return false
    }
    if !yield(t.Value) {
        return false
    }
    return t.Right.inOrder(yield)
}

// Usage
tree := &Tree[int]{
    Value: 5,
    Left:  &Tree[int]{Value: 3},
    Right: &Tree[int]{Value: 7},
}

for value := range tree.InOrder() {
    fmt.Println(value) // 3, 5, 7
}
```

### File Line Iterator

```go
func Lines(filename string) iter.Seq[string] {
    return func(yield func(string) bool) {
        file, err := os.Open(filename)
        if err != nil {
            return
        }
        defer file.Close()

        scanner := bufio.NewScanner(file)
        for scanner.Scan() {
            if !yield(scanner.Text()) {
                return
            }
        }
    }
}

// Usage
for line := range Lines("data.txt") {
    fmt.Println(line)
}
```

### Infinite Iterators

```go
func Repeat[T any](value T) iter.Seq[T] {
    return func(yield func(T) bool) {
        for {
            if !yield(value) {
                return
            }
        }
    }
}

func Natural() iter.Seq[int] {
    return func(yield func(int) bool) {
        for i := 0; ; i++ {
            if !yield(i) {
                return
            }
        }
    }
}

// Usage (must break or it runs forever)
count := 0
for n := range Natural() {
    fmt.Println(n)
    count++
    if count >= 10 {
        break
    }
}
```

## Iterator Adapters/Combinators

### Filter

```go
func Filter[V any](seq iter.Seq[V], predicate func(V) bool) iter.Seq[V] {
    return func(yield func(V) bool) {
        for v := range seq {
            if predicate(v) {
                if !yield(v) {
                    return
                }
            }
        }
    }
}

// Usage
evens := Filter(Count(10), func(n int) bool {
    return n%2 == 0
})

for n := range evens {
    fmt.Println(n) // 2, 4, 6, 8, 10
}
```

### Map/Transform

```go
func Map[V, U any](seq iter.Seq[V], transform func(V) U) iter.Seq[U] {
    return func(yield func(U) bool) {
        for v := range seq {
            if !yield(transform(v)) {
                return
            }
        }
    }
}

// Usage
doubled := Map(Count(5), func(n int) int {
    return n * 2
})

for n := range doubled {
    fmt.Println(n) // 2, 4, 6, 8, 10
}
```

### Take

```go
func Take[V any](seq iter.Seq[V], n int) iter.Seq[V] {
    return func(yield func(V) bool) {
        count := 0
        for v := range seq {
            if count >= n {
                return
            }
            if !yield(v) {
                return
            }
            count++
        }
    }
}

// Usage
first5 := Take(Natural(), 5)
for n := range first5 {
    fmt.Println(n) // 0, 1, 2, 3, 4
}
```

### Zip

```go
func Zip[A, B any](a iter.Seq[A], b iter.Seq[B]) iter.Seq2[A, B] {
    return func(yield func(A, B) bool) {
        next, stop := iter.Pull(b)
        defer stop()

        for valA := range a {
            valB, ok := next()
            if !ok {
                return
            }
            if !yield(valA, valB) {
                return
            }
        }
    }
}

// Usage
letters := []string{"a", "b", "c"}
numbers := []int{1, 2, 3}

for letter, num := range Zip(slices.Values(letters), slices.Values(numbers)) {
    fmt.Printf("%s: %d\n", letter, num)
}
```

### Chain

```go
func Chain[V any](seqs ...iter.Seq[V]) iter.Seq[V] {
    return func(yield func(V) bool) {
        for _, seq := range seqs {
            for v := range seq {
                if !yield(v) {
                    return
                }
            }
        }
    }
}

// Usage
combined := Chain(Count(3), Count(3))
for n := range combined {
    fmt.Println(n) // 1, 2, 3, 1, 2, 3
}
```

## Pull Iterators

Go 1.23 also introduced `iter.Pull` and `iter.Pull2` for converting push-style iterators to pull-style:

```go
// Pull converts a push iterator to a pull iterator
next, stop := iter.Pull(Count(5))
defer stop() // Important: always call stop to clean up

for {
    val, ok := next()
    if !ok {
        break
    }
    fmt.Println(val)
}
```

### When to Use Pull

Pull iterators are useful when you need:

- Manual control over iteration timing
- To iterate multiple sequences in parallel
- To implement complex control flow

```go
func Merge[T constraints.Ordered](a, b iter.Seq[T]) iter.Seq[T] {
    return func(yield func(T) bool) {
        nextA, stopA := iter.Pull(a)
        defer stopA()
        nextB, stopB := iter.Pull(b)
        defer stopB()

        valA, okA := nextA()
        valB, okB := nextB()

        for okA && okB {
            if valA <= valB {
                if !yield(valA) {
                    return
                }
                valA, okA = nextA()
            } else {
                if !yield(valB) {
                    return
                }
                valB, okB = nextB()
            }
        }

        // Drain remaining
        for okA {
            if !yield(valA) {
                return
            }
            valA, okA = nextA()
        }
        for okB {
            if !yield(valB) {
                return
            }
            valB, okB = nextB()
        }
    }
}
```

## Standard Library Integration

### slices Package

```go
import "slices"

// Iterate over values
for v := range slices.Values([]int{1, 2, 3}) {
    fmt.Println(v)
}

// Iterate over indices and values
for i, v := range slices.All([]string{"a", "b", "c"}) {
    fmt.Printf("%d: %s\n", i, v)
}

// Backward iteration
for i, v := range slices.Backward([]int{1, 2, 3}) {
    fmt.Printf("%d: %d\n", i, v) // 2:3, 1:2, 0:1
}
```

### maps Package

```go
import "maps"

m := map[string]int{"a": 1, "b": 2}

// Iterate over keys
for k := range maps.Keys(m) {
    fmt.Println(k)
}

// Iterate over values
for v := range maps.Values(m) {
    fmt.Println(v)
}

// Iterate over key-value pairs
for k, v := range maps.All(m) {
    fmt.Printf("%s: %d\n", k, v)
}
```

## Error Handling

Iterators don't have built-in error handling. Common patterns:

### Pattern 1: Panic on Error

```go
func MustLines(filename string) iter.Seq[string] {
    return func(yield func(string) bool) {
        file, err := os.Open(filename)
        if err != nil {
            panic(err)
        }
        defer file.Close()

        scanner := bufio.NewScanner(file)
        for scanner.Scan() {
            if !yield(scanner.Text()) {
                return
            }
        }
        if err := scanner.Err(); err != nil {
            panic(err)
        }
    }
}
```

### Pattern 2: Return Seq2 with Error

```go
func LinesWithError(filename string) iter.Seq2[string, error] {
    return func(yield func(string, error) bool) {
        file, err := os.Open(filename)
        if err != nil {
            yield("", err)
            return
        }
        defer file.Close()

        scanner := bufio.NewScanner(file)
        for scanner.Scan() {
            if !yield(scanner.Text(), nil) {
                return
            }
        }
        if err := scanner.Err(); err != nil {
            yield("", err)
        }
    }
}

// Usage
for line, err := range LinesWithError("data.txt") {
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(line)
}
```

### Pattern 3: Separate Error Check

```go
type LinesIter struct {
    filename string
    err      error
}

func NewLinesIter(filename string) *LinesIter {
    return &LinesIter{filename: filename}
}

func (li *LinesIter) Iter() iter.Seq[string] {
    return func(yield func(string) bool) {
        file, err := os.Open(li.filename)
        if err != nil {
            li.err = err
            return
        }
        defer file.Close()

        scanner := bufio.NewScanner(file)
        for scanner.Scan() {
            if !yield(scanner.Text()) {
                return
            }
        }
        li.err = scanner.Err()
    }
}

func (li *LinesIter) Err() error {
    return li.err
}

// Usage
linesIter := NewLinesIter("data.txt")
for line := range linesIter.Iter() {
    fmt.Println(line)
}
if err := linesIter.Err(); err != nil {
    log.Fatal(err)
}
```

## Advanced Patterns

### Stateful Iterator

```go
type Counter struct {
    count int
}

func (c *Counter) Next(n int) iter.Seq[int] {
    return func(yield func(int) bool) {
        for i := 0; i < n; i++ {
            c.count++
            if !yield(c.count) {
                return
            }
        }
    }
}

// Usage
counter := &Counter{}
for n := range counter.Next(3) {
    fmt.Println(n) // 1, 2, 3
}
for n := range counter.Next(2) {
    fmt.Println(n) // 4, 5
}
```

### Generator Pattern

```go
func Generate[T any](generator func() (T, bool)) iter.Seq[T] {
    return func(yield func(T) bool) {
        for {
            val, ok := generator()
            if !ok {
                return
            }
            if !yield(val) {
                return
            }
        }
    }
}

// Usage: random numbers
rng := rand.New(rand.NewSource(time.Now().UnixNano()))
randomInts := Generate(func() (int, bool) {
    return rng.Intn(100), true
})

for n := range Take(randomInts, 5) {
    fmt.Println(n)
}
```

### Lazy Evaluation

```go
func LazyMap[V, U any](seq iter.Seq[V], f func(V) U) iter.Seq[U] {
    return func(yield func(U) bool) {
        for v := range seq {
            // f is only called when needed
            if !yield(f(v)) {
                return
            }
        }
    }
}

// Expensive operation only runs when values are consumed
expensive := LazyMap(Count(1000000), func(n int) int {
    time.Sleep(100 * time.Millisecond) // Expensive!
    return n * n
})

// Only computes first 3 values
for n := range Take(expensive, 3) {
    fmt.Println(n)
}
```

## Limitations and Gotchas

### 1. No Direct Return of Error

Unlike channels, iterators can't directly return errors. You must use one of the error handling patterns above.

### 2. Cleanup Must Be Explicit

```go
func WithResource() iter.Seq[string] {
    return func(yield func(string) bool) {
        resource := acquireResource()
        defer resource.Close() // Always runs, even on break

        for item := range resource.Items() {
            if !yield(item) {
                return // defer ensures cleanup
            }
        }
    }
}
```

### 3. Pull Iterators Must Be Stopped

```go
next, stop := iter.Pull(someIterator)
defer stop() // CRITICAL: prevents resource leaks

// If you forget stop(), goroutines may leak
```

### 4. No Concurrency in yield

The `yield` function is not safe to call from multiple goroutines:

```go
// ❌ WRONG: calling yield concurrently
func BadConcurrent() iter.Seq[int] {
    return func(yield func(int) bool) {
        var wg sync.WaitGroup
        for i := 0; i < 10; i++ {
            wg.Add(1)
            go func(n int) {
                defer wg.Done()
                yield(n) // NOT SAFE
            }(i)
        }
        wg.Wait()
    }
}

// ✅ CORRECT: collect then yield
func GoodConcurrent() iter.Seq[int] {
    return func(yield func(int) bool) {
        ch := make(chan int, 10)
        var wg sync.WaitGroup

        for i := 0; i < 10; i++ {
            wg.Add(1)
            go func(n int) {
                defer wg.Done()
                ch <- n
            }(i)
        }

        go func() {
            wg.Wait()
            close(ch)
        }()

        for n := range ch {
            if !yield(n) {
                return
            }
        }
    }
}
```

### 5. Performance Considerations

- Iterator functions have minimal overhead (inlined in many cases)
- Pull iterators allocate a goroutine and channel internally
- Deeply nested adapters may impact performance in hot paths

## Comparison with Channels

| Feature     | Iterators            | Channels                 |
|-------------|----------------------|--------------------------|
| Concurrency | Sequential only      | Concurrent safe          |
| Buffering   | No buffering         | Configurable buffer      |
| Cleanup     | Automatic (defer)    | Manual (close)           |
| Errors      | No built-in support  | Can send error values    |
| Performance | Lower overhead       | Higher overhead          |
| Use case    | Sequential pipelines | Concurrent communication |

## Real-World Example: Database Rows

```go
type DB struct {
    // ...
}

func (db *DB) Query(query string, args ...any) iter.Seq2[Row, error] {
    return func(yield func(Row, error) bool) {
        rows, err := db.queryInternal(query, args...)
        if err != nil {
            yield(Row{}, err)
            return
        }
        defer rows.Close()

        for rows.Next() {
            var row Row
            if err := rows.Scan(&row); err != nil {
                yield(Row{}, err)
                return
            }
            if !yield(row, nil) {
                return
            }
        }

        if err := rows.Err(); err != nil {
            yield(Row{}, err)
        }
    }
}

// Usage
for row, err := range db.Query("SELECT * FROM users WHERE age > ?", 18) {
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("User: %s\n", row.Name)
}
```

Range-over-func provides a clean, idiomatic way to create custom iteration logic in Go while maintaining the familiar `range` syntax and proper resource cleanup semantics.

