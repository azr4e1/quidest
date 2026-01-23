+++
date = '2026-01-23T16:48:25Z'
title = 'Go Generics'
hideReply = true
tags = ['golang', 'programming', 'generics', 'syntax', 'coding', 'software', 'engineering', 'computer']
+++

# Generics in Go

Generics were introduced in Go 1.18 (released March 2022) and represent one of the most significant additions to the language since its inception.

## Core Concepts

### Type Parameters

Type parameters allow functions and types to work with any type that satisfies certain constraints:

```go
func Print[T any](value T) {
    fmt.Println(value)
}

// Usage
Print[int](42)
Print[string]("hello")
Print(3.14) // Type inference: T inferred as float64
```

### Type Constraints

Constraints specify what operations are permitted on a type parameter. They are defined using interfaces:

```go
// Built-in constraint: any (alias for interface{})
func Identity[T any](v T) T {
    return v
}

// Built-in constraint: comparable (supports == and !=)
func Contains[T comparable](slice []T, target T) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}
```

### Custom Constraints

You can define your own constraints using interface syntax:

```go
// Method-based constraint
type Stringer interface {
    String() string
}

func Stringify[T Stringer](v T) string {
    return v.String()
}

// Type set constraint (union of types)
type Number interface {
    int | int8 | int16 | int32 | int64 |
    uint | uint8 | uint16 | uint32 | uint64 |
    float32 | float64
}

func Sum[T Number](values []T) T {
    var total T
    for _, v := range values {
        total += v
    }
    return total
}
```

### The `~` Operator (Underlying Type)

The tilde operator matches types with the same underlying type:

```go
type MyInt int

type Integer interface {
    ~int | ~int64  // Matches int, int64, AND any type with int or int64 as underlying type
}

func Double[T Integer](v T) T {
    return v * 2
}

var x MyInt = 5
Double(x) // Works because MyInt's underlying type is int
```

### Combining Constraints

You can combine method requirements with type sets:

```go
type OrderedStringer interface {
    ~int | ~string
    String() string
}
```

## Generic Types

### Generic Structs

```go
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

// Usage
intStack := Stack[int]{}
intStack.Push(1)
intStack.Push(2)
```

### Generic Maps and Slices

```go
type Set[T comparable] map[T]struct{}

func NewSet[T comparable]() Set[T] {
    return make(Set[T])
}

func (s Set[T]) Add(v T) {
    s[v] = struct{}{}
}

func (s Set[T]) Contains(v T) bool {
    _, ok := s[v]
    return ok
}
```

## The `constraints` Package

The `golang.org/x/exp/constraints` package provides useful predefined constraints:

```go
import "golang.org/x/exp/constraints"

// constraints.Ordered: types that support < > <= >=
func Max[T constraints.Ordered](a, b T) T {
    if a > b {
        return a
    }
    return b
}

// constraints.Integer: all integer types
// constraints.Float: all float types
// constraints.Complex: all complex types
// constraints.Signed: all signed integer types
// constraints.Unsigned: all unsigned integer types
```

## Multiple Type Parameters

```go
type Pair[K comparable, V any] struct {
    Key   K
    Value V
}

func NewPair[K comparable, V any](k K, v V) Pair[K, V] {
    return Pair[K, V]{Key: k, Value: v}
}

// Map function with two type parameters
func Map[T, U any](slice []T, f func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = f(v)
    }
    return result
}

// Usage
nums := []int{1, 2, 3}
strs := Map(nums, func(n int) string {
    return fmt.Sprintf("%d", n)
})
```

## Type Inference

Go can often infer type parameters from arguments:

```go
func First[T any](slice []T) T {
    return slice[0]
}

// Explicit
result := First[int]([]int{1, 2, 3})

// Inferred (preferred when unambiguous)
result := First([]int{1, 2, 3})
```

## Limitations and Gotchas

### 1. No Method Type Parameters

Methods cannot have their own type parameters (only the receiver can be generic):

```go
type Container[T any] struct { value T }

// ❌ Invalid: methods cannot have additional type parameters
// func (c Container[T]) Convert[U any]() U { ... }

// ✅ Valid: use a standalone function instead
func Convert[T, U any](c Container[T], f func(T) U) U {
    return f(c.value)
}
```

### 2. No Specialization

You cannot provide specialized implementations for specific types:

```go
// ❌ Not possible in Go
func Print[T any](v T) { fmt.Println(v) }
func Print[int](v int) { fmt.Printf("Integer: %d\n", v) } // Cannot specialize
```

### 3. Zero Values

Getting the zero value of a generic type:

```go
func Zero[T any]() T {
    var zero T
    return zero
}

// Or using *new(T)
func Zero2[T any]() T {
    return *new(T)
}
```

### 4. Type Assertions with Generics

```go
func Process[T any](v T) {
    // Type switch works
    switch val := any(v).(type) {
    case int:
        fmt.Println("int:", val)
    case string:
        fmt.Println("string:", val)
    default:
        fmt.Println("other:", val)
    }
}
```

### 5. Pointer Constraints

A common pattern for methods that require a pointer receiver:

```go
type Setter interface {
    Set(string)
}

// Constraint: *T must implement Setter
func SetAll[T any, PT interface { *T; Setter }](items []T, value string) {
    for i := range items {
        PT(&items[i]).Set(value)
    }
}
```

## Practical Patterns

### Generic Result Type

```go
type Result[T any] struct {
    Value T
    Err   error
}

func Ok[T any](v T) Result[T] {
    return Result[T]{Value: v}
}

func Err[T any](err error) Result[T] {
    return Result[T]{Err: err}
}
```

### Generic Optional Type

```go
type Optional[T any] struct {
    value *T
}

func Some[T any](v T) Optional[T] {
    return Optional[T]{value: &v}
}

func None[T any]() Optional[T] {
    return Optional[T]{}
}

func (o Optional[T]) IsSome() bool {
    return o.value != nil
}

func (o Optional[T]) Unwrap() T {
    if o.value == nil {
        panic("called Unwrap on None")
    }
    return *o.value
}
```

### Generic Cache

```go
type Cache[K comparable, V any] struct {
    mu    sync.RWMutex
    items map[K]V
}

func NewCache[K comparable, V any]() *Cache[K, V] {
    return &Cache[K, V]{items: make(map[K]V)}
}

func (c *Cache[K, V]) Get(key K) (V, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()
    v, ok := c.items[key]
    return v, ok
}

func (c *Cache[K, V]) Set(key K, value V) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.items[key] = value
}
```

## Performance Considerations

Go generics use a hybrid implementation:

- **GCShape stenciling**: Functions are compiled once per "GC shape" (types with the same memory layout share implementations)
- **Dictionary passing**: Runtime type information is passed via hidden dictionary parameters

This means:
- Generic code has minimal runtime overhead in most cases
- Very hot loops with primitives may benefit from non-generic specialized implementations
- Interface-based polymorphism and generics have similar performance characteristics
