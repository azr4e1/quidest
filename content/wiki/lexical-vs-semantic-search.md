+++
date = '2025-02-04T09:37:41Z'
title = 'Lexical vs Semantic Search'
hideReply = true
tags = ['machine_learning', 'nlp', 'natural', 'language', 'information', 'text', 'corpus']
+++

For searching content within a corpus of text, there are two primary methodologies:

- lexical/keyword search
- semantic/vector similarity search

Keyword search relies on matching exact words in the text. It's a simple and fast approach, but has limitations (e.g. mispellings, synonyms etc). It doesn't take into account context either.

Vector semantic similarity uses NLP to analyze the meaning of words and their _relationships_. It represents words as high-dimensional vectors, where the distance between vectors indicates their semantic similarity.

Semantic search requires large amount of data to train the NLP models, and is computationally and time consuming.

## References

- https://docs.pinecone.io/troubleshooting/differences-between-lexical-semantic-search
