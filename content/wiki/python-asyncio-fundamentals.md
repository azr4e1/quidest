+++
date = '2026-02-25T13:56:00Z'
title = 'Python asyncio Fundamentals'
hideReply = true
tags = ['programming', 'python', 'software engineering', 'computer science', 'concurrency', 'preemptive', 'cooperative', 'asyncio', 'await', 'yield', 'generators']
+++

Asyncio is Python's standard library for writing concurrent code using async/await syntax. It's built around an event loop that manages cooperative multitasking.

# Core Concepts

- **Event Loop**: The central execution mechanism that runs async tasks and handles I/O operations. When a task awaits something, the loop switches to another task instead of blocking.
- **Coroutines**: Functions defined with `async def`. They're suspended execution units that can yield control back to the event loop using `await`.
- **Tasks**: Wrapped coroutines scheduled to run on the event loop. They enable concurrent execution.

## Basic Usage

```python
import asyncio

async def fetch_data(id):
    await asyncio.sleep(1)  # Simulates I/O
    return f"Data {id}"

async def main():
    # Sequential - takes 3 seconds
    result1 = await fetch_data(1)
    result2 = await fetch_data(2)
    result3 = await fetch_data(3)
    
    # Concurrent - takes 1 second
    results = await asyncio.gather(
        fetch_data(1),
        fetch_data(2),
        fetch_data(3)
    )

asyncio.run(main())
```

Key Functions:

- `asyncio.run()`: Entry point that creates and closes the event loop
- `await`: Suspends coroutine execution until the awaited operation completes
- `asyncio.gather()`: Runs multiple coroutines concurrently, returns results in order
- `asyncio.create_task()`: Schedules a coroutine to run as a Task
- `asyncio.sleep()`: Non-blocking sleep

## When to Use

Asyncio excels at I/O-bound operations where you're waiting on external resources (network requests, file operations, database queries). It's ineffective for CPU-bound tasks—those need multiprocessing.

## Common Pitfalls

1. Blocking calls kill performance: Regular `time.sleep()` or synchronous I/O blocks the entire event loop. Use async equivalents or run blocking code in executors.
1. Can't await non-async functions: You can't make synchronous code asynchronous just by adding `await`.
1. Exception handling: Exceptions in tasks won't propagate unless you await them or use proper exception handling with gather.
1. Not a magic bullet: Adds complexity. Only worth it when you have significant I/O wait times and many concurrent operations.

The syntax is straightforward, but debugging async code and understanding execution flow takes practice.

# Creating Coroutines

Basic method: use `async def`

```python
async def my_coro():
  return "result"
```

**NB**: calling a coroutine doesn't run it - it returns a coroutine object that needs to be awaited:

```python
async def fetch_data():
    return "data"

# This creates a coroutine OBJECT, doesn't execute anything
coro = fetch_data()  

# Must await it or schedule it to actually run
result = await coro  # Inside another async function
# OR
result = asyncio.run(coro)  # From sync code
```

# Tasks

A Task wraps a coroutine and schedules it to run on the event loop. Unlike bare coroutines, Tasks start executing immediately (as soon as the event loop gets control).

```python
async def fetch(id):
    await asyncio.sleep(1)
    return f"Result {id}"

async def main():
    # Create a task - starts running immediately
    task = asyncio.create_task(fetch(1))
    
    # Do other work while task runs in background
    print("Task is running...")
    
    # Wait for it to complete
    result = await task
```

Tasks run concurrently with other code. Creating a task doesn't block—it schedules the coroutine and returns immediately.

## Running multiple coroutines

**Method 1**: `asyncio.gather()` - Run all, collect all results
```python
async def main():
    results = await asyncio.gather(
        fetch(1),
        fetch(2),
        fetch(3)
    )
    # results = ["Result 1", "Result 2", "Result 3"]
```

Returns results in the order you passed coroutines. If one fails, by default it raises the exception (use `return_exceptions=True` to collect exceptions as values).

**Method 2**: Create tasks explicitly

```python
async def main():
    task1 = asyncio.create_task(fetch(1))
    task2 = asyncio.create_task(fetch(2))
    task3 = asyncio.create_task(fetch(3))
    
    # All three are now running concurrently
    
    result1 = await task1
    result2 = await task2
    result3 = await task3
```

More control over individual tasks. You can cancel them, check their status, etc.

**Method 3**: `asyncio.wait()` - More control over completion

```python
async def main():
    tasks = [asyncio.create_task(fetch(i)) for i in range(3)]
    
    # Wait for first one to complete
    done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
    
    # Or wait for all
    done, pending = await asyncio.wait(tasks)
```

Returns sets of done and pending tasks. Useful when you don't care about order or want partial results.

**Method 4**: `asyncio.as_completed()` - Process as they finish
```python
async def main():
    coros = [fetch(i) for i in range(3)]
    
    for coro in asyncio.as_completed(coros):
        result = await coro
        print(f"Got {result}")  # Prints in completion order, not submission order
```

## Key Differences

- `gather()`: Simple, maintains order, good for "run all and get all results"
- `create_task()`: Maximum control, can cancel/monitor individual tasks
- `wait()`: Control over completion conditions (first, all, or some)
- `as_completed()`: Process results as they arrive

## Task Methods

```python
task = asyncio.create_task(fetch(1))

task.cancel()           # Cancel the task
task.done()            # Check if finished
task.cancelled()       # Check if cancelled
task.result()          # Get result (blocks if not done)
task.exception()       # Get exception if failed
```

Most common pattern: use `gather()` for simple concurrent execution, use explicit tasks when you need control.

# HTTP Requests

Asyncio doesn't include HTTP functionality. You need an async HTTP library. `aiohttp` is the standard choice.

```python
import asyncio
import aiohttp

# basic request
async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    html = await fetch('https://example.com')
    print(html)

asyncio.run(main())

# multiple requests
async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = [
        'https://example.com',
        'https://httpbin.org/delay/1',
        'https://api.github.com'
    ]
    
    # Reuse same session for all requests
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
    
    print(f"Fetched {len(results)} pages")

asyncio.run(main())
```

Common operations:

JSON response:

```python
async with session.get(url) as response:
  data = await response.json()
```

POST request

```python
async with session.post(url, json={'key': 'value'}) as response:
  result = await response.json()
```

Headers and parameters:

```python
headers = {'Authorization': 'Bearer token'}
params = {'q': 'search term'}

async with session.get(url, headers=headers, params=params) as response:
  data = await response.text()
```

Status and error handling:

```python
async with session.get(url) as response:
    if response.status == 200:
        data = await response.json()
    else:
        print(f"Error: {response.status}")
```

`httpx` is a newer library with a requests-like API that supports both sync and async:

```python
import httpx

async def fetch(url):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.text

# Or multiple requests
async with httpx.AsyncClient() as client:
    responses = await asyncio.gather(
        client.get(url1),
        client.get(url2)
    )
```

# Semaphores

A semaphore limits how many coroutines can execute a section of code simultaneously.

```python
import asyncio
import aiohttp

async def fetch(session, url, semaphore):
    async with semaphore:
        # Only 3 requests will be here at once
        async with session.get(url) as response:
            return await response.text()

async def main():
    urls = [f'https://httpbin.org/delay/1?id={i}' for i in range(10)]
    
    semaphore = asyncio.Semaphore(3)  # Max 3 concurrent
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url, semaphore) for url in urls]
        results = await asyncio.gather(*tasks)
    
    print(f"Fetched {len(results)} pages")

asyncio.run(main())
```

The semaphore acts as a gatekeeper. When 3 requests are running, the 4th waits at `async with semaphore` until one completes.

# Key Differences with `threading` library

## Concurrency Model

- **Threading**: *Preemptive* multitasking. The OS decides when to switch between threads, can happen anytime.
- **Asyncio**: *Cooperative* multitasking. You explicitly yield control with await. Context switches only happen at await points.

## Parallelism

- **Threading**: Can achieve true parallelism for I/O operations, but Python's GIL (Global Interpreter Lock) prevents true parallel CPU execution. Only one thread executes Python bytecode at a time.
- **Asyncio**: Single-threaded, no parallelism at all. Everything runs on one thread via the event loop.

## Overhead

- **Threading**: Each thread has its own stack (typically 1-8 MB). Creating 10,000 threads will exhaust memory.
- **Asyncio**: Coroutines are extremely lightweight (few KB). You can easily run 10,000+ concurrent tasks.

## Complexity & Bugs

- **Threading**: Race conditions, deadlocks, and data corruption from shared state are real problems. Requires locks, semaphores, careful synchronization.
- **Asyncio**: Much safer. Since execution is cooperative and single-threaded, you know exactly when context switches occur. Shared state is less problematic.

## Performance

- **Threading**: Better for I/O when you have moderate concurrency (dozens to hundreds of operations). Lower overhead per operation.
- **Asyncio**: Better for high concurrency scenarios (thousands of connections). Network servers, web scrapers, etc.

## Quick comparison

```python
# Threading
import threading
import time

def task(n):
    time.sleep(1)  # Blocking call is fine
    return n * 2

threads = [threading.Thread(target=task, args=(i,)) for i in range(5)]
for t in threads: t.start()
for t in threads: t.join()

# Asyncio
import asyncio

async def task(n):
    await asyncio.sleep(1)  # Must use async version
    return n * 2

asyncio.run(asyncio.gather(*[task(i) for i in range(5)]))
```

# Relationship with generators

Coroutines in Python were originally implemented using generators. Before async/await syntax (Python 3.5+), coroutines were just generators that followed certain conventions.

Both coroutines and generators are **suspendable functions**:

```python
# Generator - suspends at yield
def gen():
    print("Start")
    yield 1
    print("Middle")
    yield 2
    print("End")

g = gen()
next(g)  # Prints "Start", returns 1
next(g)  # Prints "Middle", returns 2

# Coroutine - suspends at await
async def coro():
    print("Start")
    await asyncio.sleep(0)
    print("Middle")
    await asyncio.sleep(0)
    print("End")
```

Both maintain state between suspension points. The difference is what controls resumption:

- **Generators**: You control with `next()` or `send()`
- **Coroutines**: The event loop controls resumption

However they differ in:

- type: they are not the same type
- protocol: generators implement the iterator protocol, coroutines implement the awaitable protocol:

```python
# iterator
def gen():
  yield 1

g = gen()
next(g)  # you pull values out

# awaitable
async def coro():
  return 1

c = coro()
await c  # Event loop drives execution
```
