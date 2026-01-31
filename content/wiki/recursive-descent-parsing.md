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

## 7. Handling Optionals

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


# Python Example

```python
# Parse arithmetic expressions

from enum import Enum
from dataclasses import dataclass
import re

# ============================================================================
# TOKENS (Terminal Symbols)
# ============================================================================

class TokenType(Enum):
    # Literals
    NUMBER = 'NUMBER'
    
    # Operators
    PLUS = 'PLUS'
    MINUS = 'MINUS'
    MULTIPLY = 'MULTIPLY'
    DIVIDE = 'DIVIDE'
    
    # Grouping
    LPAREN = 'LPAREN'
    RPAREN = 'RPAREN'
    
    # Special
    EOF = 'EOF'

@dataclass
class Token:
    type: TokenType
    value: any
    position: int  # Where in the input this token starts
    
    def __repr__(self):
        return f'Token({self.type.name}, {repr(self.value)}, pos={self.position})'


# ============================================================================
# LEXER (Tokenizer) - Recognizes Terminal Symbols
# ============================================================================

class Lexer:
    """
    Converts input text into a stream of tokens.
    Implements the terminal definitions from our grammar.
    """
    
    def __init__(self, text):
        self.text = text
        self.pos = 0
        self.current_char = self.text[0] if text else None
    
    def error(self, msg):
        raise Exception(f"Lexer error at position {self.pos}: {msg}")
    
    def advance(self):
        """Move to next character"""
        self.pos += 1
        if self.pos < len(self.text):
            self.current_char = self.text[self.pos]
        else:
            self.current_char = None
    
    def peek(self, offset=1):
        """Look ahead without consuming"""
        peek_pos = self.pos + offset
        if peek_pos < len(self.text):
            return self.text[peek_pos]
        return None
    
    def skip_whitespace(self):
        """
        WHITESPACE → (' ' | '\t' | '\n' | '\r')+
        Whitespace is ignored between tokens
        """
        while self.current_char and self.current_char in ' \t\n\r':
            self.advance()
    
    def read_number(self):
        """
        NUMBER → DIGIT+ ('.' DIGIT+)?
        DIGIT  → '0' | '1' | ... | '9'
        
        Reads integers (42) or floats (3.14)
        """
        start_pos = self.pos
        result = ''
        
        # Read digits before decimal point
        while self.current_char and self.current_char.isdigit():
            result += self.current_char
            self.advance()
        
        # Check for decimal point
        if self.current_char == '.' and self.peek() and self.peek().isdigit():
            result += self.current_char
            self.advance()
            
            # Read digits after decimal point
            while self.current_char and self.current_char.isdigit():
                result += self.current_char
                self.advance()
            
            return Token(TokenType.NUMBER, float(result), start_pos)
        
        return Token(TokenType.NUMBER, int(result), start_pos)
    
    def get_next_token(self):
        """
        Main lexer method - returns next token from input.
        Implements recognition of all terminal symbols.
        """
        while self.current_char:
            
            # Skip whitespace (not a token)
            if self.current_char in ' \t\n\r':
                self.skip_whitespace()
                continue
            
            # NUMBER terminal
            if self.current_char.isdigit():
                return self.read_number()
            
            # PLUS terminal: '+'
            if self.current_char == '+':
                token = Token(TokenType.PLUS, '+', self.pos)
                self.advance()
                return token
            
            # MINUS terminal: '-'
            if self.current_char == '-':
                token = Token(TokenType.MINUS, '-', self.pos)
                self.advance()
                return token
            
            # MULTIPLY terminal: '*'
            if self.current_char == '*':
                token = Token(TokenType.MULTIPLY, '*', self.pos)
                self.advance()
                return token
            
            # DIVIDE terminal: '/'
            if self.current_char == '/':
                token = Token(TokenType.DIVIDE, '/', self.pos)
                self.advance()
                return token
            
            # LPAREN terminal: '('
            if self.current_char == '(':
                token = Token(TokenType.LPAREN, '(', self.pos)
                self.advance()
                return token
            
            # RPAREN terminal: ')'
            if self.current_char == ')':
                token = Token(TokenType.RPAREN, ')', self.pos)
                self.advance()
                return token
            
            # Invalid character - not recognized by any terminal
            self.error(f"Invalid character '{self.current_char}'")
        
        # EOF terminal (end of input)
        return Token(TokenType.EOF, None, self.pos)


# ============================================================================
# AST NODES (Abstract Syntax Tree)
# ============================================================================

@dataclass
class Number:
    """
    Represents a numeric literal.
    Created by: factor → NUMBER
    """
    value: float
    
    def __repr__(self):
        return f'Number({self.value})'

@dataclass
class BinOp:
    """
    Represents a binary operation (left op right).
    Created by: expression → term (op term)*
                term → factor (op factor)*
    """
    left: any
    op: str
    right: any
    
    def __repr__(self):
        return f'BinOp({self.left} {self.op} {self.right})'


# ============================================================================
# PARSER (Syntax Analyzer) - Implements Grammar Rules
# ============================================================================

class Parser:
    """
    Recursive descent parser implementing the grammar:
    
    expression → term (('+' | '-') term)*
    term       → factor (('*' | '/') factor)*
    factor     → NUMBER | '(' expression ')'
    """
    
    def __init__(self, lexer):
        self.lexer = lexer
        self.current_token = self.lexer.get_next_token()
    
    def error(self, msg):
        raise Exception(f"Parser error at position {self.current_token.position}: {msg}")
    
    def eat(self, token_type):
        """
        Consume current token if it matches expected type.
        Move to next token.
        """
        if self.current_token.type == token_type:
            self.current_token = self.lexer.get_next_token()
        else:
            self.error(f"Expected {token_type.name}, got {self.current_token.type.name}")
    
    def factor(self):
        """
        factor → NUMBER | '(' expression ')'
        
        A factor is the most basic unit:
        - A number literal
        - An expression wrapped in parentheses
        """
        token = self.current_token
        
        if token.type == TokenType.NUMBER:
            self.eat(TokenType.NUMBER)
            return Number(token.value)
        
        elif token.type == TokenType.LPAREN:
            self.eat(TokenType.LPAREN)
            node = self.expression()
            self.eat(TokenType.RPAREN)
            return node
        
        self.error(f"Expected NUMBER or '(', got {token.type.name}")
    
    def term(self):
        """
        term → factor (('*' | '/') factor)*
        
        A term handles multiplication and division (high precedence).
        Reads: factor, then zero or more (operator factor) pairs.
        """
        node = self.factor()
        
        while self.current_token.type in (TokenType.MULTIPLY, TokenType.DIVIDE):
            op_token = self.current_token
            
            if op_token.type == TokenType.MULTIPLY:
                self.eat(TokenType.MULTIPLY)
            elif op_token.type == TokenType.DIVIDE:
                self.eat(TokenType.DIVIDE)
            
            node = BinOp(left=node, op=op_token.value, right=self.factor())
        
        return node
    
    def expression(self):
        """
        expression → term (('+' | '-') term)*
        
        An expression handles addition and subtraction (low precedence).
        Reads: term, then zero or more (operator term) pairs.
        
        This is the start symbol of our grammar.
        """
        node = self.term()
        
        while self.current_token.type in (TokenType.PLUS, TokenType.MINUS):
            op_token = self.current_token
            
            if op_token.type == TokenType.PLUS:
                self.eat(TokenType.PLUS)
            elif op_token.type == TokenType.MINUS:
                self.eat(TokenType.MINUS)
            
            node = BinOp(left=node, op=op_token.value, right=self.term())
        
        return node
    
    def parse(self):
        """
        Entry point for parsing.
        Parses complete expression and ensures we consumed all input.
        """
        ast = self.expression()
        
        if self.current_token.type != TokenType.EOF:
            self.error(f"Unexpected token after expression: {self.current_token}")
        
        return ast


# ============================================================================
# INTERPRETER (Evaluator) - Walks AST and Computes Result
# ============================================================================

class Interpreter:
    """
    Walks the AST and evaluates the expression to a numeric result.
    Uses the Visitor pattern.
    """
    
    def visit(self, node):
        """Dispatch to appropriate visit method"""
        if isinstance(node, Number):
            return self.visit_number(node)
        elif isinstance(node, BinOp):
            return self.visit_binop(node)
        else:
            raise Exception(f"Unknown node type: {type(node)}")
    
    def visit_number(self, node):
        """Number node: just return its value"""
        return node.value
    
    def visit_binop(self, node):
        """Binary operation: evaluate left and right, apply operator"""
        left_val = self.visit(node.left)
        right_val = self.visit(node.right)
        
        if node.op == '+':
            return left_val + right_val
        elif node.op == '-':
            return left_val - right_val
        elif node.op == '*':
            return left_val * right_val
        elif node.op == '/':
            if right_val == 0:
                raise Exception("Division by zero")
            return left_val / right_val
        else:
            raise Exception(f"Unknown operator: {node.op}")


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def tokenize(text):
    """Show all tokens for debugging"""
    lexer = Lexer(text)
    tokens = []
    while True:
        token = lexer.get_next_token()
        tokens.append(token)
        if token.type == TokenType.EOF:
            break
    return tokens

def print_ast(node, indent=0):
    """Pretty print the AST"""
    spacing = "  " * indent
    if isinstance(node, Number):
        print(f"{spacing}Number({node.value})")
    elif isinstance(node, BinOp):
        print(f"{spacing}BinOp({node.op})")
        print_ast(node.left, indent + 1)
        print_ast(node.right, indent + 1)

def calculate(text, verbose=False):
    """Main function: lex, parse, and evaluate"""
    if verbose:
        print(f"\nInput: {text}")
        print("\n--- TOKENS ---")
        tokens = tokenize(text)
        for token in tokens:
            print(token)
    
    lexer = Lexer(text)
    parser = Parser(lexer)
    ast = parser.parse()
    
    if verbose:
        print("\n--- AST ---")
        print_ast(ast)
    
    interpreter = Interpreter()
    result = interpreter.visit(ast)
    
    if verbose:
        print(f"\n--- RESULT ---")
        print(f"{text} = {result}\n")
    
    return result


# ============================================================================
# TESTS
# ============================================================================

if __name__ == '__main__':
    # Test cases
    test_cases = [
        "42",
        "3 + 5",
        "10 - 2 * 3",
        "(10 - 2) * 3",
        "7 + 3 * (10 / (12 / (3 + 1) - 1))",
        "3.14 * 2",
        "100 / 4 / 5",
        "2 + 3 * 4 - 5 / 2",
    ]
    
    print("=" * 60)
    print("ARITHMETIC PARSER - Test Results")
    print("=" * 60)
    
    for expr in test_cases:
        result = calculate(expr)
        print(f"{expr:40} = {result}")
    
    print("\n" + "=" * 60)
    print("VERBOSE EXAMPLE")
    print("=" * 60)
    
    # Show detailed breakdown for one expression
    calculate("3 + 5 * 2", verbose=True)
```
