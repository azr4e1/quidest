+++
date = '2025-01-16T14:16:34Z'
title = 'Database Index'
hideReply = true
tags = ['database', 'computer science', 'programming', 'data', 'data science', 'big data', 'efficient', 'sql', 'relational', 'table']
+++

An index is a pointer to data in a table. An index in a database is very similar to an index in the back of a book.

A database index contains all the necessary information to access data quickly and efficiently. One way of solving the access issue when it comes to large amounts of data is through the use of indexes. Indexes serve as lookup tables that efficiently store data for quicker retrieval.

## How are indexes created

In a database, data is stored in rows which are organized into tables. Each row has a unique key which distinguishes it from all other rows and those keys are stored in an index for quick retrieval.

Since keys are stored in indexes, each time a new row with a unique key is added, the index is automatically updated. However, sometimes we need to be able to quickly lookup data that is not stored as a key. For example, we may need to quickly lookup customers by telephone number. It would not be a good idea to use a unique constraint because we can have multiple customers with the same phone number. In these cases, we can create our own indexes.

The users cannot see the indexes, they are just used to speed up searches/queries.

The syntax for creating an index will vary depending on the database. However, the syntax typically includes a `CREATE` keyword followed by the `INDEX` keyword and the name we’d like to use for the index. Next should come the `ON` keyword followed by the name of the table that has the data we’d like to quickly access. Finally, the last part of the statement should be the name(s) of the columns to be indexed.

```sql
CREATE INDEX <index_name>
ON <table_name> (column1, column2, ...)
```

## Caveats

Updating a table with indexes takes more time than updating a table without (because the indexes also need an update). So, only create indexes on columns that will be frequently searched against.

## References

- https://www.codecademy.com/article/sql-indexes
