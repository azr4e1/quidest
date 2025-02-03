+++
date = '2025-02-03T09:26:35Z'
title = 'Linear Probing'
hideReply = true
tags = ["boot_dev",  "search",  "data",  "structure",  "memory",  "programming",  "computer_science"]
+++

A [hash map](/wiki/hash-map-data-structure) or hash table is a structure that maps keys to values. A hash table uses a hash function to compute an index into an array of buckets, from which the desired value can be found. During lookup, the key is hashed and the resulting hash indicates where the corresponding value is stored. A key must be hashable in order to be a key in a hashmap.

One issue that can arise when implementing a hash map is _collision_,  where the hash function generates the same index for more than one key. __Linear Probing__ is one way to solve this issue.

Linear probing works by finding the next available slot after the collision index and placing the new __key__, __value__ pair there.

When calculating the hash, if the right bucket is already filled, we iterate through all the possible buckets to find an empty spot. When we find it, we place the key value pair there. Then, to fetch the value, we calculate the hash; if the key at the right index is not the same as the one we're trying to fetch, we iterate through all the occupied buckets until we find our key.
