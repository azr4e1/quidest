+++
date = '2026-01-29T14:43:02Z'
title = 'Backus-Naur Syntax'
hideReply = true
tags = ['computer-science', 'coding', 'parsing', 'BNF']
+++

**EBNF** is a code that expresses the syntax of a formal language. An EBNF consists of terminal symbols and non-terminal production rules which are the restrictions governing how terminal symbols can be combined into a valid sequence. Examples of terminal symbols include alphanumeric characters, punctuation marks, and whitespace characters.

In formal languages, terminal and nonterminal symbols are parts of the vocabulary under a formal grammar. Vocabulary is a finite, nonempty set of symbols. Terminal symbols are symbols that cannot be replaced by other symbols of the vocabulary. Nonterminal symbols are symbols that can be replaced by other symbols of the vocabulary by the production rules under the same formal grammar.

## Core Syntax

### Basic Structure

```ebnf
rule_name = definition ;
```

Every rule ends with semicolon. Rule names are typically lowercase or capitalized.

### Terminal vs Non-terminal

```ebnf
non_terminal = "terminal" ;
digit = "0" | "1" | "2" ;
```

- Terminals: Actual text in quotes (what appears in input)
- Non-terminals: Rule names without quotes (references to other rules)

## EBNF Operators

### Concatenation (sequence)

```ebnf
full_name = first_name, " ", last_name ;
```

Comma means "followed by". Can also use space in some dialects.

### Alternation (choice)

```ebnf
operator = "+" | "-" | "*" | "/" ;
```

Pipe means "or". Pick one option.

### Optional (zero or one)

```ebnf
sign = ["+"] | ["-"] ;
number = [sign], digit, {digit} ;
```

Square brackets `[]` mean optional. May appear once or not at all.

### Repetition (zero or more)

```ebnf
identifier = letter, {letter | digit} ;
```

Curly braces `{}` mean repeat zero or more times.

### Grouping

```ebnf
expression = term, {("+" | "-"), term} ;
```

Parentheses `()` group things together.

### One or More

Some EBNF variants add:

```ebnf
digits = digit, {digit} ;
```

Or explicit "one or more":

```ebnf
digits = digit+ ;  (* In some notations *)
```

### Range

```ebnf
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
(* Or in some dialects: *)
digit = "0".."9" ;
```

### Comments

```ebnf
(* This is a comment *)
```

### Complete Example: JSON Grammar

```ebnf
ebnf(* JSON Grammar in EBNF *)

json = value ;

value = object
      | array
      | string
      | number
      | "true"
      | "false"
      | "null" ;

object = "{", [members], "}" ;
members = pair, {",", pair} ;
pair = string, ":", value ;

array = "[", [elements], "]" ;
elements = value, {",", value} ;

string = '"', {character}, '"' ;
character = letter | digit | " " | "!" (* simplified *) ;

number = ["-"], digits, [".", digits] ;
digits = digit, {digit} ;
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
letter = "a" | "b" (* ... simplified ... *) | "z" ;
```

Breakdown:

- `json` starts with any `value`
- `value` can be object, array, string, number, or literal
- `object` is `{` + optional members + `}`
- `members` is one pair + zero or more `, pair`
- `[members]` makes members optional (empty object `{}` allowed)

### Complete Example: Arithmetic Grammar

```ebnf
factor = number | "(", expr, ")" ;
term = factor, { ( "*" | "/" ), factor } ;
expr = term, { ( "+" | "-" ), term } ;

number = digit, { digit }, [ ".", digit, { digit } ] ;
digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
```

## Table of Symbols

| Usage            | Notation  | Alternative | Meaning      |
|------------------|-----------|-------------|--------------|
| definition       | =         |             |              |
| concatenation    | ,         |             |              |
| termination      | ;         | .           |              |
| alternation      | / or !    |             |              |
| optional         | [ ... ]   | (/ ... /)   | none or once |
| repetition       | { ... }   | (: ... :)   | none or more |
| grouping         | ( ... )   |             |              |
| terminal string  | " ... "   | ' ... '     |              |
| comment          | (* ... *) |             |              |
| special sequence | ? ... ?   |             |              |
| exception        | -         |             |              |
