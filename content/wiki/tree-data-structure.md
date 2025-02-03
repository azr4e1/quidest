+++
toc = true
hideReply = true
title = "Tree Data Structure"
author = "Lorenzo Drumond"
date = "2024-08-19T21:38:33"
tags = ["list",  "linked",  "tree",  "memory",  "boot_dev",  "computer_science",  "structure",  "programming",  "data"]
+++



![Tree Data Structure](/images/tree-data-structure.png)

A tree is a widely used data structure that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes.

A tree is a collection of nodes starting at a root or head node, similar to how a linked list was a collection of nodes starting with a head (root). The big difference between a LL and a tree is that a tree's nodes can have multiple children instead of just one.

A generic tree structure has the following rules:

- Each node has a value and a list of "children"
- Children can only have a single "parent"
- Duplicate values are allowed, multiple nodes can have the same value

## List

```
node -> node -> node
```

## Tree

```
            > node
      > node
            > node
> node
            > node
      > node
            > node
```

## References

- boot.dev

Next -> [binary-tree-data-structure](/wiki/binary-tree-data-structure/)
