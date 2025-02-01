+++
toc = true
hideReply = true
title = "ACID properties"
author = "Lorenzo Drumond"
date = "2024-10-07T11:45:57"
tags = ["database",  "acid", 'boot_dev', 'programming', 'computer_science']
+++



ACID is an acronym that refers to the set of 4 key properties that define a transaction: Atomicity, Consistency, Isolation, and Durability. If a database operation has these ACID properties, it can be called an ACID transaction, and data storage systems that apply these operations are called transactional systems. ACID transactions guarantee that each read, write, or modification of a table has the following properties:

1. Atomicity - each statement in a transaction (to read, write, update or delete data) is treated as a single unit. Either the entire statement is executed, or none of it is executed. This property prevents data loss and corruption from occurring if, for example, if your streaming data source fails mid-stream.
2. Consistency - ensures that transactions only make changes to tables in predefined, predictable ways. Transactional consistency ensures that corruption or errors in your data do not create unintended consequences for the integrity of your table.
3. Isolation - when multiple users are reading and writing from the same table all at once, isolation of their transactions ensures that the concurrent transactions don't interfere with or affect one another. Each request can occur as though they were occurring one by one, even though they're actually occurring simultaneously.
4. Durability - ensures that changes to your data made by successfully executed transactions will be saved, even in the event of system failure.

## References

- https://www.databricks.com/glossary/acid-transactions#:~:text=properties%3A%20Atomicity%2C%20Consistency%2C%20Isolation,Consistency%2C%20Isolation%2C%20and%20Durability.
