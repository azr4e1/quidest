+++
date = '2026-01-29T11:37:32Z'
title = 'Integration vs Unit Tests'
hideReply = true
+++

Unit tests test a single function or method in isolation. The inputs and expected outputs are for that specific function
only. Most of your tests are unit tests — e.g., TestImageParser calls ImageParser() directly and checks its return value.

Integration tests test multiple components working together through a real execution path. TestMarkdownToHTML is an
integration test — a single input string flows through the entire pipeline:

string → MarkdownToBlocks → BlockParser → LineParser → NodeParser
       → SimpleParser/ImageParser/HyperlinkParser
       → ToHTML → HTMLRender → string

A bug in any of those layers would cause the integration test to fail, but it wouldn't tell you which layer broke. That's
the tradeoff:

|                   | Unit                              | Integration                       |
|-------------------|-----------------------------------|-----------------------------------|
| Scope             | One function                      | Multiple components               |
| Failure diagnosis | Pinpoints the broken function     | Tells you something broke         |
| Fragility         | Only breaks if its target changes | Breaks if any layer changes       |
| Confidence        | Function works correctly          | Functions work correctly together |

You want both: unit tests to catch and locate bugs quickly, integration tests to verify the pieces actually compose
correctly.

