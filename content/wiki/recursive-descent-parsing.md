+++
date = '2026-01-29T15:04:24Z'
title = 'Recursive Descent Parsing'
hideReply = true
tags = ['EBNF', 'parsing', 'lexer', 'computer-science', 'programming']
+++

**Recursive descent parsing** is a top-down parsing technique where each non-terminal in the grammar is implemented as a recursive procedure. The parser begins with the start symbol and recursively expands non-terminals according to production rules, consuming input tokens in a left-to-right scan with lookahead to select appropriate productions.

## Characteristics

- Top-down construction: Builds the parse tree from the root (start symbol) down to the leaves (terminals), in contrast to bottom-up parsers which work from leaves to root.
- Predictive parsing: Uses lookahead tokens to deterministically select which production to apply
- Direct grammar mapping: Each non-terminal maps to a parsing function, making the implementation structurally isomorphic to the grammar specification.
- Left-to-right, leftmost derivation: Processes input tokens sequentially from left to right while constructing a leftmost derivation of the input string.

# Step by Step

## 1. One Function Per Grammar Rule

Each grammar rule becomes a function. When a rule says "do A then B", the function calls A's function, then B's function. When a rule says "do A or B", the function looks at the next token to decide which one to call. The "recursive" part happens when rules reference each other in circles.

```
Grammar:
  expression → term (('+' | '-') term)*
  term → number

Parser:
  function expression() { ... }
  function term() { ... }
```

## 2. Reading the Input

The parser keeps track of:

- Current token (what we're looking at right now)
- A way to get the next token (from the lexer)

```
parser:
  current_token = first token from lexer
  
  function advance():
    current_token = get next token from lexer
```

## 3. Matching Terminals

When the grammar says _expect this specific token_, we check and consume it:

```
function eat(expected_token_type):
  if current_token.type == expected_token_type:
    advance()  // Move to next token
  else:
    error("Expected " + expected_token_type)
```

This is like checking: "Do I have the ingredient I need next?"

## 4. Handling Sequences

When the grammar says "A then B then C":

```
Grammar:
  statement → 'if' expression 'then' body

Parser:
function statement():
  eat('if')
  expression()
  eat('then')
  body()
```

Just call each part in order.

## 5. Handling Choices

When the grammar says "A or B or C":

```
Grammar:
  value → number | string | boolean

Parser:
function value():
  if current_token is NUMBER:
    return number()
  else if current_token is STRING:
    return string()
  else if current_token is BOOLEAN:
    return boolean()
  else:
    error("Expected value")
```

Look at the current token to decide which path to take.

## 6. Handling Repetition

When the grammar says "zero or more of X":

```
Grammar:
  list → item (',' item)*

Parser:
function list():
  result = [item()]
  
  while current_token is COMMA:
    eat(COMMA)
    result.append(item())
  
  return result
```

Keep going while the pattern continues.

### 7. Handling Optionals

When the grammar says "maybe X":

```
Grammar:
  number → ['-'] digits

Parser:
function number():
  negative = false
  
  if current_token is MINUS:
    eat(MINUS)
    negative = true
  
  value = digits()
  
  if negative:
    value = -value
  
  return value
```

Check if the optional part is there, process it if so.
