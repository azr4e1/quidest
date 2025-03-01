+++
toc = true
hideReply = true
title = "DFS vs BFS"
author = "Lorenzo Drumond"
date = "2024-08-23T00:17:03"
tags = ["computer_science",  "search",  "bfs",  "dfs",  "function",  "structure",  "boot_dev",  "hash",  "graph",  "adjacency",  "first",  "breadth",  "programming",  "data",  "memory",  "depth",  "list"]
+++



Should you use depth first search or breadth first search? It depends:

## Is the solution close to the root?

If you have a good reason to believe the vertex you're looking for is close to the root (where you plan to start searching) then BFS should be faster.
Is the graph extremely wide, but not very deep (from the root)?

Imagine a tree with 10 vertices on the first level. Each of those ten vertices point to another ten vertices. The number of vertices at each level would be:

level 0: 1
level 1: 10
level 2: 100
level 3: 1000
level 4: 10000

Because BFS stores entire horizontal levels in memory, you may not have enough memory on your machine to execute the search.

## Is the search space infinite?

In some searches, the graph has infinite size. For example, imagine a simulation of a game of chess.

The first level of the graph would be all the possible current moves, the next level would be all the possible 2nd moves, and this could go on forever, especially when you consider that there are loops within the game. For example, each player could just move their queens back and forth forever.

In these cases, true DFS is practically impossible, you would need to either use BFS, another algorithm, or put a limit on how far your DFS algorithm can search before returning.

## Are you trying to reach an "end"?

Think of a maze simulator. You want your algorithm to explore the end of a path before exiting to know if it has hit a dead end. DFS will typically find a solution much more quickly than BFS for this kind of exhaustive search.

## Are you trying to find the shortest path between two nodes?

Then BFS is the best choice, as it will explore all the adjacent nodes to A one by one, stopping as soon as B is found.

## References

- boot.dev
