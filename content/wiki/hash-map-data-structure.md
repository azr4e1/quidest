+++
toc = true
hideReply = true
title = "Hash Map Data Structure"
author = "Lorenzo Drumond"
date = "2024-08-21T15:22:10"
tags = ["boot_dev",  "search",  "data",  "structure",  "memory",  "programming",  "computer_science"]
+++



A hash map or hash table is a structure that maps keys to values. A hash table uses a hash function to compute an index into an array of buckets, from which the desired value can be found. During lookup, the key is hashed and the resulting hash indicates where the corresponding value is stored. A key must be hashable in order to be a key in a hashmap.

Ideally the hash function hashes each key to a unique index, but most hash table designs employ an _imperfect_ hash function, which might cause __hash collisions__ where the hash function generates the same index for more than one key. This collisions are usually accomodated for, for example through [linear probing](/wiki/linear-probing) or [resizing](/wiki/hash-map-resizing)

In a well-built hash map, the average computational cost for each lookup, insertion, and deletion is independent of the number of elements stored in the table. In other words, all these basic operations are O(1).

Python has a built-in hashmap called _dictionary_:

- Dictionaries handle collisions gracefully, two distinct keys will never overwrite each other's values. If there is a collision that for some crazy, unlikely reason can't be handled, a failure is reported
- Hash tables are stored in contiguous blocks (the same place) in memory
- Each entry in the table is actually a combination of the three values: hash, key, value
- New dictionaries start with 8 slots and grow when they become 2/3 full

Hashmaps are easy to use but the implementation is a bit trickier.

Hashmaps are built on top of arrays. They use a [hash function](/wiki/hash-function) to convert a "hashable" key into an index in the array. From a high-level, all that matters to us is that the hash function:

1. Takes a key and returns an integer.
1. Always returns the same integer for the same key.
1. Always returns a valid index in the array (e.g. not negative, and not greater than the array size)


## References

- boot.dev

Next -> [hash-function](/wiki/hash-function/)
