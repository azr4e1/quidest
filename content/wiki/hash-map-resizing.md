+++
date = '2025-02-03T09:26:44Z'
title = 'Hash Map Resizing'
hideReply = true
tags = ["boot_dev",  "search",  "data",  "structure",  "memory",  "programming",  "computer_science"]
+++

A [hash map](/wiki/hash-map-data-structure) or hash table is a structure that maps keys to values. A hash table uses a hash function to compute an index into an array of buckets, from which the desired value can be found. During lookup, the key is hashed and the resulting hash indicates where the corresponding value is stored. A key must be hashable in order to be a key in a hashmap.

One issue that can arise when implementing a hash map is _collision_,  where the hash function generates the same index for more than one key. One way to account for this is to _resize_ the hashmap. To reduce the chances of a collision, we can increase the number of slots in our hashmap. This is called __resizing__. This will not eliminate all possible collisions, but it will help reduce the chance of one happening.

When resizing, we create a new hashmap with a larger number of slots. Then, we re-insert all the key-value pairs from the old hashmap into the new hashmap.
