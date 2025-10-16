+++
date = '2025-10-14T09:51:16+01:00'
draft = false
title = 'Data Engineering Roadmap'
hideReply = true
+++

# 3-Month Data Engineering Mastery Plan
## Following Reddit Fundamentalist Approach + Data Engineering Zoomcamp

*Your Python proficiency + 3 months of focused study = Data Engineering Interview Ready*

---

## Month 1: SQL Mastery & Database Fundamentals
### "Learn SQL to death" + Deep Database Understanding

### Week 1-2: SQL Foundations to Advanced (60-80 hours)
**Primary Resource: LeetCode Premium + Data Engineering Zoomcamp Week 1**

#### Week 1: Setup + SQL Intensive
**Day 1-3: Environment Setup + Zoomcamp Module 1 Start**
- [ ] **Data Engineering Zoomcamp Module 1**: [Docker & Terraform](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/01-docker-terraform) (6-8 hours)
  - Docker fundamentals with PostgreSQL
  - Running Postgres with Docker
  - Basic SQL refresher with NYC taxi data
- [ ] **LeetCode Premium Setup**: Get subscription ($35/month) - [LeetCode Database Problems](https://leetcode.com/problemset/database/)
- [ ] **Complete LeetCode's Database Course**: [SQL 50 Study Plan](https://leetcode.com/studyplan/top-sql-50/) (10-12 hours)
  - Start with Easy problems (15-20 problems)
  - Focus on SELECT, WHERE, JOIN basics

**Day 4-7: SQL Pattern Mastery**
- [ ] **Daily LeetCode Target**: 5-6 database problems (2-3 hours/day)
  - Window Functions focus: Complete all ROW_NUMBER, RANK, DENSE_RANK problems
  - Master LAG/LEAD for time-series analysis
- [ ] **DataLemur Free Tier**: [SQL Interview Questions](https://datalemur.com/questions) (1-2 hours/day)
  - Complete all free Facebook, Google, Amazon questions
- [ ] **Study Resource**: [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/) - Window Functions section

#### Week 2: Advanced SQL + CTEs
**Day 8-10: Complex Queries**
- [ ] **LeetCode Medium Problems**: 4-5 per day focusing on:
  - Recursive CTEs (employee hierarchies, tree structures)
  - Complex JOINs (self-joins, multiple tables)
  - Subqueries vs CTEs performance
- [ ] **HackerRank SQL**: [Advanced Select](https://www.hackerrank.com/domains/sql?filters%5Bstatus%5D%5B%5D=unsolved&filters%5Bdifficulty%5D%5B%5D=medium) (2 hours/day)
- [ ] **Read**: [PostgreSQL CTE Documentation](https://www.postgresql.org/docs/current/queries-with.html)

**Day 11-14: Query Optimization**
- [ ] **EXPLAIN ANALYZE Mastery**: 
  - [PostgreSQL EXPLAIN Visualizer](https://explain.depesz.com/)
  - [PG Exercises](https://pgexercises.com/) - Complete all exercises
- [ ] **LeetCode Hard Problems**: 2-3 per day
- [ ] **Complete Zoomcamp Week 1 Homework**: [Homework Link](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/cohorts/2025/01-docker-terraform/homework.md)

**Target by Week 2 End**: 
- ✅ 80+ LeetCode SQL problems solved
- ✅ Comfortable with Medium difficulty in 20 minutes
- ✅ Can read and optimize execution plans

---

### Week 3-4: Database Internals Deep Dive
**"Really understand OLTP databases"**

#### Week 3: B-Trees, B+ Trees, and Storage Engines
**Day 15-17: The Foundation Video + Practice**
- [ ] **MANDATORY WATCH**: [CMU Database Group - Intro to Database Systems](https://www.youtube.com/watch?v=aZjYr87r1b8) (3 hours)
  - This is THE video the Reddit comment references
  - Take detailed notes on B-Tree operations
  - Understand page splits, node structures
- [ ] **Interactive Learning**:
  - [B-Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/BTree.html) (2 hours practice)
  - [B+ Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)
- [ ] **Implementation**: Code a simple B-Tree in Python (4-6 hours)
  ```python
  # Template: https://github.com/noahgift/btree-python
  ```

**Day 18-21: OLTP vs OLAP Systems**
- [ ] **Read Chapter 3** of "Designing Data-Intensive Applications" by Martin Kleppmann
  - [Free preview available](https://dataintensive.net/)
  - Focus on: Storage and Retrieval (20 hours total for book)
- [ ] **CMU Advanced Database Systems**: [Lecture 2 - In-Memory Databases](https://www.youtube.com/watch?v=aKMLgFVxmCI) (1.5 hours)
- [ ] **Practical Exercise**: 
  - Set up both PostgreSQL (OLTP) and ClickHouse (OLAP)
  - Load same dataset, compare query performance
  - Document findings in markdown

#### Week 4: Advanced Indexing Strategies
**Day 22-24: Index Types and Strategies**
- [ ] **PostgreSQL Index Deep Dive**:
  - [Use The Index, Luke!](https://use-the-index-luke.com/) - Complete SQL Performance course
  - Focus on: Clustered vs Non-clustered, Covering indexes, Partial indexes
- [ ] **Practical Lab**: 
  - Load 10GB dataset into PostgreSQL
  - Create different index types, measure performance
  - Practice with [NYC Taxi Dataset](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)

**Day 25-28: Complete Zoomcamp Module 2**
- [ ] **Data Engineering Zoomcamp Module 2**: [Workflow Orchestration](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/02-workflow-orchestration)
  - Learn Kestra for orchestration
  - Build first data pipeline
  - Complete homework

---

## Month 2: Big Data & Distributed Systems
### "Understand how hardware interacts with data"

### Week 5-6: MapReduce & File Formats
**The paradigm shift to distributed computing**

#### Week 5: MapReduce Foundation
**Day 29-31: The Original Paper**
- [ ] **READ CAREFULLY**: [Google MapReduce Paper (2004)](https://research.google.com/archive/mapreduce-osdi04.pdf) (4-5 hours)
  - Implement word count in Python from scratch
  - Understand: Map phase, Shuffle, Reduce phase
  - Code example: [MapReduce from Scratch](https://github.com/adilmoujahid/MapReduce)

**Day 32-35: File Formats Deep Dive**
- [ ] **Parquet Understanding**:
  - [Apache Parquet Documentation](https://parquet.apache.org/docs/)
  - [Parquet vs CSV vs Avro Benchmark](https://www.databricks.com/glossary/what-is-parquet) (2 hours)
- [ ] **Hands-on Exercise** (6 hours):
  ```python
  # Convert 1GB CSV to Parquet, ORC, Avro
  # Measure: File size, Write time, Read time, Query performance
  # Use PyArrow, fastparquet libraries
  ```
- [ ] **Academic Paper**: [Dremel Paper (Google)](https://research.google.com/pubs/archive/36632.pdf) - Foundation of columnar storage

#### Week 6: Hadoop Context & Modern Reality
**Day 36-38: Hadoop Ecosystem**
- [ ] **Essential Understanding**:
  - [Hadoop Architecture Overview](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/ClusterSetup.html)
  - HDFS concepts: Block size, replication, rack awareness
  - YARN resource management
- [ ] **Modern Context**: 
  - Why Spark replaced MapReduce (10-100x faster)
  - When HDFS still matters (on-prem, data sovereignty)
- [ ] **Complete Zoomcamp Module 3**: [Data Warehouse](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/03-data-warehouse)
  - BigQuery fundamentals
  - Partitioning and clustering

**Day 39-42: Start Spark Deep Dive**
- [ ] **Begin Zoomcamp Module 5**: [Batch Processing](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/05-batch)
- [ ] **Spark Architecture Understanding**:
  - [Spark Internals Presentation](https://databricks.com/session/a-deeper-understanding-of-spark-internals)
  - DAG vs MapReduce linear flow
  - Catalyst Optimizer basics

---

### Week 7-8: Apache Spark Mastery
**"Learn Apache Spark and its relationship with MapReduce"**

#### Week 7: Spark Core & SQL
**Day 43-45: RDDs to DataFrames Evolution**
- [ ] **Databricks Free Community Edition**: Sign up at [community.databricks.com](https://community.databricks.com/)
- [ ] **Complete Courses**:
  - [Spark Programming](https://academy.databricks.com/) - Free tier
  - Focus on: Transformations vs Actions, Lazy evaluation, DAG construction
- [ ] **Practical Exercises**:
  ```python
  # Implement same logic in:
  # 1. RDD API (understand low-level)
  # 2. DataFrame API (understand optimization)
  # 3. Spark SQL (understand Catalyst)
  ```

**Day 46-49: Spark Internals**
- [ ] **Deep Dive into Catalyst**:
  - [Catalyst Optimizer Deep Dive](https://www.databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)
  - Logical Plan → Optimized Logical Plan → Physical Plan
  - Code generation phase
- [ ] **Performance Tuning**:
  - Understand: Shuffle operations, Broadcast joins, Partitioning strategies
  - [Spark UI Guide](https://spark.apache.org/docs/latest/web-ui.html) - Master reading execution plans
- [ ] **Complete Zoomcamp Module 5 Homework**

#### Week 8: PySpark & Advanced Spark
**Day 50-52: PySpark API Mastery**
- [ ] **LeetCode-style Problems in PySpark**:
  - Reimplement 20 SQL problems in PySpark
  - Compare performance and readability
- [ ] **Window Functions in Spark**:
  - Moving averages, Running totals, Rank operations
  - [PySpark Window Functions Guide](https://sparkbyexamples.com/pyspark/pyspark-window-functions/)

**Day 53-56: Spark Streaming Introduction**
- [ ] **Structured Streaming**:
  - [Spark Streaming Programming Guide](https://spark.apache.org/docs/latest/streaming-programming-guide.html)
  - Micro-batching vs true streaming
  - Watermarks and late data handling
- [ ] **Mini Project**: Real-time word count from Kafka topic

---

## Month 3: NoSQL, Cloud, and Production Systems
### "Accept schemaless designs make life difficult"

### Week 9-10: NoSQL Deep Dive & LSM Trees
**Understanding different database architectures**

#### Week 9: LSM Trees vs B-Trees Trade-offs
**Day 57-59: LSM Tree Architecture**
- [ ] **Essential Reading**:
  - [LSM Trees Explained](https://tikv.org/deep-dive/key-value-engine/b-tree-vs-lsm/)
  - [RocksDB Architecture](https://github.com/facebook/rocksdb/wiki/RocksDB-Basics)
- [ ] **Key Concepts**:
  - Write amplification vs Read amplification
  - Compaction strategies (Size-tiered, Leveled)
  - Why Cassandra/ScyllaDB chose LSM
- [ ] **Practical Comparison** (8 hours):
  ```python
  # Benchmark same workload on:
  # PostgreSQL (B+ Tree) vs RocksDB (LSM Tree)
  # Measure: Write throughput, Read latency, Space usage
  ```

**Day 60-63: Cassandra & ScyllaDB**
- [ ] **Free Course**: [ScyllaDB University](https://university.scylladb.com/) - Complete "ScyllaDB Essentials"
- [ ] **Data Modeling**:
  - Query-first design principle
  - Partition key selection strategies
  - Denormalization patterns
- [ ] **CAP Theorem in Practice**:
  - Consistency levels (ONE, QUORUM, ALL)
  - Hinted handoff, Read repair
- [ ] **Lab**: Design and implement a time-series data model

#### Week 10: MongoDB & Document Stores
**Day 64-66: MongoDB Fundamentals**
- [ ] **MongoDB University**: [M001 Basics](https://university.mongodb.com/courses/M001/about) (Free)
- [ ] **Key Understanding**:
  - Why MongoDB uses B+ Trees (not LSM)
  - BSON format advantages
  - Aggregation pipeline vs SQL
- [ ] **Schema Design Patterns**:
  - Embedding vs Referencing
  - Bucket pattern for time-series
  - [MongoDB Patterns](https://www.mongodb.com/blog/post/building-with-patterns-a-summary)

**Day 67-70: Complete Streaming Module**
- [ ] **Zoomcamp Module 6**: [Streaming](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/06-streaming)
- [ ] **Kafka Fundamentals**:
  - Topics, Partitions, Consumer Groups
  - [Confluent Kafka 101](https://developer.confluent.io/courses/apache-kafka/get-started/)

---

### Week 11-12: Cloud Platforms & Interview Prep
**Bringing it all together**

#### Week 11: Cloud Services Crash Course
**Day 71-73: Cloud Vendor Comparison**
- [ ] **AWS Data Services** (Pick if targeting most companies):
  - S3, Glue, EMR, Redshift, Kinesis
  - [AWS Data Analytics Fundamentals](https://aws.amazon.com/training/digital/aws-data-analytics-fundamentals/)
- [ ] **GCP Data Services** (Pick if targeting analytics-heavy):
  - Cloud Storage, Dataflow, Dataproc, BigQuery, Pub/Sub
  - [GCP Data Engineering Path](https://cloud.google.com/training/data-engineering-and-analytics)
- [ ] **Quick Lab**: Replicate local pipeline in cloud

**Day 74-77: Modern Data Stack**
- [ ] **Complete Zoomcamp Module 4**: [Analytics Engineering](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/04-analytics-engineering)
- [ ] **dbt Fundamentals**: [dbt Learn](https://courses.getdbt.com/courses/fundamentals)
- [ ] **Data Quality**: 
  - Great Expectations basics
  - dbt tests
  - Data contracts concept

#### Week 12: Final Project & Interview Preparation
**Day 78-81: Capstone Project**
- [ ] **Build End-to-End Pipeline**:
  ```
  Requirements:
  - Ingest from 3+ sources (API, Database, Files)
  - Process with Spark (batch) + Kafka (streaming)
  - Store in Data Lake (Bronze/Silver/Gold)
  - Serve via Data Warehouse
  - Orchestrate with Airflow/Dagster
  - Monitor with data quality checks
  ```
- [ ] **Document Everything**:
  - Architecture diagram (draw.io)
  - Design decisions and trade-offs
  - Performance metrics

**Day 82-84: SQL Interview Grind**
- [ ] **LeetCode Database**: Solve all Hard problems (aim for 150+ total)
- [ ] **Company-Specific Prep**:
  - [DataLemur Company Questions](https://datalemur.com/questions)
  - Focus on your target companies

**Day 85-87: System Design Practice**
- [ ] **Common Scenarios**:
  - Design YouTube Analytics Pipeline
  - Build Uber's Real-time Pricing System
  - Create Netflix Recommendation Data Pipeline
- [ ] **Resources**:
  - [System Design Interview Guide](https://github.com/donnemartin/system-design-primer)
  - [Data Engineering Interview Book](https://www.amazon.com/Ace-Data-Engineering-Interview/dp/B0CLKDWBWN)

**Day 88-90: Mock Interviews**
- [ ] **Practice Sessions**:
  - SQL coding: 45 minutes, 3 problems
  - Python/Spark coding: 45 minutes, 2 problems
  - System design: 60 minutes whiteboard
  - Behavioral: STAR method stories ready

---

## Daily Schedule Template (3-4 hours/day)

### Weekday (2-3 hours)
- **6:00-7:00 AM**: Theory/Reading (Papers, Documentation)
- **8:00-9:00 PM**: Practical (Coding, LeetCode)
- **9:00-9:30 PM**: Project work or Zoomcamp videos

### Weekend (4-5 hours)
- **Saturday**: Deep learning (Watch lectures, read papers)
- **Sunday**: Build projects, complete homework

---

## Resources Library

### Essential Papers (Read in Order)
1. [Google MapReduce (2004)](https://research.google.com/archive/mapreduce-osdi04.pdf)
2. [Google Bigtable (2006)](https://research.google.com/archive/bigtable-osdi06.pdf)
3. [Amazon Dynamo (2007)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)
4. [Google Dremel (2010)](https://research.google.com/pubs/archive/36632.pdf)
5. [Spark RDD Paper (2012)](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf)

### Books (Priority Order)
1. **"Designing Data-Intensive Applications"** - Martin Kleppmann ($40)
   - Chapters 1-4 (Month 1), 5-9 (Month 2), 10-12 (Month 3)
2. **"Database Internals"** - Alex Petrov ($35)
   - Part 1: Storage Engines (Month 1)
3. **"Learning Spark"** 2nd Edition - Free from Databricks
   - Chapters 1-8 during Month 2

### Courses & Platforms
- **LeetCode Premium**: $35/month (Essential for SQL)
- **DataLemur**: Free tier + Premium $19/month
- **Data Engineering Zoomcamp**: Free (Core curriculum)
- **Databricks Academy**: Free community edition
- **ScyllaDB University**: Free
- **MongoDB University**: Free
- **Confluent Developer**: Free tier

### YouTube Channels & Videos
- **CMU Database Group**: Start with Andy Pavlo's intro course
- **DataTalks.Club**: All Zoomcamp videos
- **Hussein Nasser**: Database engineering deep dives
- **Databricks**: Spark architecture talks

### Community & Support
- **Slack**: [DataTalks.Club Slack](https://datatalks.club/slack.html) - #course-data-engineering
- **Reddit**: r/dataengineering for questions
- **Discord**: Data Engineering Discord for real-time help
- **GitHub**: Star and watch Zoomcamp repo for updates

---

## Success Metrics

### Month 1 Checkpoint
- [ ] 100+ LeetCode SQL problems solved
- [ ] Can explain B-Tree operations and draw diagrams
- [ ] Understand OLTP vs OLAP trade-offs
- [ ] Completed Zoomcamp Modules 1-2

### Month 2 Checkpoint
- [ ] Read MapReduce paper and can explain the paradigm
- [ ] Built 3+ Spark applications
- [ ] Understand Parquet format internals
- [ ] Can explain Catalyst optimizer phases
- [ ] Completed Zoomcamp Modules 3-5

### Month 3 Checkpoint
- [ ] Understand LSM vs B-Tree trade-offs
- [ ] Built streaming pipeline with Kafka
- [ ] Deployed pipeline to cloud
- [ ] 150+ LeetCode problems total
- [ ] Portfolio with 3 production-quality projects
- [ ] Can design distributed systems on whiteboard

---

## Interview Ready Checklist

### Technical Skills
- [ ] Solve SQL medium problems in <20 minutes
- [ ] Explain database index types and when to use each
- [ ] Design partition strategies for Spark jobs
- [ ] Choose appropriate NoSQL database for use cases
- [ ] Debug performance issues using execution plans

### System Design
- [ ] Design batch ETL pipeline (sources → processing → warehouse)
- [ ] Design streaming pipeline (Kafka → processing → sink)
- [ ] Explain CAP theorem with real examples
- [ ] Calculate resource requirements for data pipelines
- [ ] Design data models for different paradigms (relational, document, columnar)

### Behavioral Stories (STAR Format)
- [ ] Debugging a critical pipeline failure
- [ ] Optimizing slow queries/jobs
- [ ] Collaborating with stakeholders
- [ ] Learning new technology quickly
- [ ] Handling ambiguous requirements

---

## Total Investment

### Time: 270-360 hours over 3 months
- Month 1: 90-120 hours (SQL + Databases)
- Month 2: 90-120 hours (Distributed Systems)
- Month 3: 90-120 hours (NoSQL + Production)

### Cost: $170-$300
- LeetCode Premium (3 months): $105
- DataLemur Premium (optional): $57
- Books: $75-$115
- Cloud credits: Free tier sufficient
- Zoomcamp: Free

### Alternative Free Path
Replace paid resources with:
- LeetCode free tier + HackerRank
- Library books or shared subscriptions
- All courses mentioned have free tiers
- Total cost: $0-$50 (just books)

---

## The Reddit Comment Was Right

This plan follows the "fundamentalist approach" - you're not just learning tools, you're understanding WHY things work. By month 3, you'll understand why Cassandra uses LSM trees, why Spark's Catalyst beats hand-written code, and yes, why schemaless designs can make life difficult. This deep understanding is what separates senior engineers from tool operators.

Remember: **"SQL leetcode will get you further than anything else"** - Start there, build up systematically, and by month 3 you'll be designing distributed systems with confidence.

# Reddit Comments

## r/dataengineering

**Certain_Leader9946 says**:

> the sql leetcode will teach you to solve the problems.
> 
> understanding how the hardware interacts with the data and its file formats will make painfully obvious why a solution like spark is even used.
> 
> you will then understand that... a lot of these big data products are just applications of map reduce algorithms over parallalisable and partitioned file reads, and that systems to query data lakes, are largely derivations of the same underlying concepts. i really don't think reading those big chunky textbooks is as worth it as taking a fundementalist approach but, eh?
> 
> here's what i would do, in order:
> 1. learn sql to death, thats just leetcode, nothing will get you further than leetcode. www.leetcode.com get a premium subscription. you can access their data structures and algorithms content for 2. get comfortable with LC Medium questions for SQL.
> 2. understand OLTP databases (btrees and b+ trees), i mean really understand it, this guy does a great. talk, in fact, just absorb everything he says: https://www.youtube.com/watch?v=aZjYr87r1b8
> 3. read the map reduce paper and learn about parquet and understand how map reduce and parquet would work together for scaling a data problem horizontally. you will need to at least understand some basic functional programming idioms to get this far.
> 4. learn apache spark and its relationship with map reduce (how the DAG works and how catalyst works for query planning). read up on classic hadoop.
> 5. learn the apache spark api, spark sql, and pyspark .etc.
> 6. now look at cloud technology implementations of data services to understand how cloud services make it easier to deploy 1 through 5, not that they are magic beans (except amazon athena, that's actually really cool).
> 7. learn no sql solutions and how they are built. look up the inner workings of scylla and cassandra. understand what trade offs their data structures make to achieve their 'web scale' like performance characteristics and the limitations involved there (SS tables and LSM trees). try to be able to compare them by their O complexity series and their query performance. understand MongoDB uses B+ trees in ways that don't make it too dissimilar from RDBMS except it stores data in JSON documents (which has its own issues).
> 8. (optional). accept in your heart that schemaless designs make life difficult for everyone involved when it comes to data-sanity, because you quickly run into problems where you want to do a migration and can't depend on the contents on your data. e.g. ive ran into a problem this last week with a 'schemaless' application design where people were having a shouting match about 'where did the data come from'. well if you designed your schemas up front instead of fronting for agile that wouldn't be an issue but dont mind me :)
> 
> congratulations. you can now derive your understanding of almost any large data application under the sun from your fundamental understanding of the core technologies which will make each of them a breeze to work with.
