+++
date = '2025-10-14T09:51:16+01:00'
draft = false
title = 'Data Engineering Roadmap'
hideReply = true
+++

# Reddit Comments

## r/dataengineering

**Certain_Leader9946 says**:

  the sql leetcode will teach you to solve the problems.

  understanding how the hardware interacts with the data and its file formats will make painfully obvious why a solution like spark is even used.

  you will then understand that... a lot of these big data products are just applications of map reduce algorithms over parallalisable and partitioned file reads, and that systems to query data lakes, are largely derivations of the same underlying concepts. i really don't think reading those big chunky textbooks is as worth it as taking a fundementalist approach but, eh?

  here's what i would do, in order:

  learn sql to death, thats just leetcode, nothing will get you further than leetcode. www.leetcode.com get a premium subscription. you can access their data structures and algorithms content for 2. get comfortable with LC Medium questions for SQL.

  understand OLTP databases (btrees and b+ trees), i mean really understand it, this guy does a great. talk, in fact, just absorb everything he says: https://www.youtube.com/watch?v=aZjYr87r1b8

  read the map reduce paper and learn about parquet and understand how map reduce and parquet would work together for scaling a data problem horizontally. you will need to at least understand some basic functional programming idioms to get this far.

  learn apache spark and its relationship with map reduce (how the DAG works and how catalyst works for query planning). read up on classic hadoop.

  learn the apache spark api, spark sql, and pyspark .etc.

  now look at cloud technology implementations of data services to understand how cloud services make it easier to deploy 1 through 5, not that they are magic beans (except amazon athena, that's actually really cool).

  learn no sql solutions and how they are built. look up the inner workings of scylla and cassandra. understand what trade offs their data structures make to achieve their 'web scale' like performance characteristics and the limitations involved there (SS tables and LSM trees). try to be able to compare them by their O complexity series and their query performance. understand MongoDB uses B+ trees in ways that don't make it too dissimilar from RDBMS except it stores data in JSON documents (which has its own issues).

  (optional). accept in your heart that schemaless designs make life difficult for everyone involved when it comes to data-sanity, because you quickly run into problems where you want to do a migration and can't depend on the contents on your data. e.g. ive ran into a problem this last week with a 'schemaless' application design where people were having a shouting match about 'where did the data come from'. well if you designed your schemas up front instead of fronting for agile that wouldn't be an issue but dont mind me :)

  congratulations. you can now derive your understanding of almost any large data application under the sun from your fundamental understanding of the core technologies which will make each of them a breeze to work with.
