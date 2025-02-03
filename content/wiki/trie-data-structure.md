+++
toc = true
hideReply = true
title = "Trie Data Structure"
author = "Lorenzo Drumond"
date = "2024-08-22T09:48:52"
tags = ["data",  "function",  "memory",  "structure",  "search",  "computer_science",  "boot_dev",  "hash",  "trie",  "programming"]
+++


![trie data structure](/images/trie-data-structure.png)

A trie is a specialized search tree data structure used to store and retrieve strings from a dictionary or set. Unlike a [binary search tree](/wiki/binary-search-algorithm), nodes in a trie do not store their associated key. Instead, each node's position within the trie determines its associated key, with the connections between nodes defined by individual characters rather than the entire key.

Every child node shares a common prefix with its parent node, and the root node represents the empty string.

While tries commonly store character strings, they can be adapted to work with any ordered sequence of elements, such as permutations of digits or shapes. A notable variant is the bitwise trie, which uses individual bits from fixed-length binary data

Tries support various operations: insertion, deletion, and lookup of a string key. Tries are composed of nodes that contain links, which either point to other suffix child nodes or null. As for every tree, each node but the root is pointed to by only one other node, called its parent. Each node contains as many links as the number of characters in the applicable alphabet

Tries are particularly effective for tasks such as autocomplete, spell checking, and IP routing, offering advantages over hash tables due to their prefix-based organization and lack of hash collisions.

At its core, a trie is often represented as a nested tree of dictionaries where each key is a character, and it maps to the next character in the word. For example, the words "hello", "help" and "hi" would be represented as:

```python
{
  "h": {
    "e": {
      "l": {
        "l": {
          "o": {
            "*": True
          }
        },
        "p": {
          "*": True
        }
      }
    },
    "i": {
      "*": True
    }
  }
}
```

A trie is also often referred to as a _prefix tree_ because it can be used to efficiently find all of the words that start with a given prefix.

You would typically be interested in a trie if you want to do some kind of prefix matching. For example, if you wanted to find all the words in a dictionary that start with a given prefix, a trie works great!

Remember, a hashtable is only good for exact matches. A trie allows you to look up all of the words that match a given prefix.

Tries are super efficient when it comes to finding substrings in a large document of text.

## References

Next -> [graph-data-structure](/wiki/graph-data-structure/)
