---
title: "Data Engineering Mastery Plan"
date: 2025-10-16
draft: false
description: "A comprehensive roadmap combining Data Engineering Zoomcamp with fundamental CS concepts for interview preparation"
tags: ["data-engineering", "study-plan", "career-development"]
---

## Overview

**Your Python proficiency + 3 months of focused study = Data Engineering Interview Ready**

This plan integrates the complete [Data Engineering Zoomcamp](https://github.com/DataTalksClub/data-engineering-zoomcamp) curriculum with deep theoretical foundations. You'll learn both practical tools and the fundamental concepts that separate senior engineers from tool operators.

---

## Month 1: Foundations & Workflow

### Week 1-2: Docker, Terraform & SQL Mastery

#### Week 1: Environment Setup + SQL Intensive

**Days 1-3: Zoomcamp Module 1 - Docker & Terraform**

- **Module 1**: [Docker & Terraform](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/01-docker-terraform) (6-8 hours)
  - Docker fundamentals with PostgreSQL
  - Running Postgres containers
  - Infrastructure as Code with Terraform
  - NYC taxi dataset introduction
- **LeetCode Setup**: Get Premium subscription ($35/month)
- **Complete**: [SQL 50 Study Plan](https://leetcode.com/studyplan/top-sql-50/) (10-12 hours)
  - Focus on SELECT, WHERE, JOIN basics
  - Target: 15-20 Easy problems

**Days 4-7: SQL Pattern Mastery**

- **Daily Target**: 5-6 LeetCode database problems (2-3 hours/day)
  - Window Functions: ROW_NUMBER, RANK, DENSE_RANK
  - LAG/LEAD for time-series
- **DataLemur**: Complete all [free tier questions](https://datalemur.com/questions)
- **Study**: [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/) - Window Functions

#### Week 2: Advanced SQL + Module 1 Completion

**Days 8-10: Complex Queries**

- **LeetCode Medium**: 4-5 problems daily focusing on:
  - Recursive CTEs (hierarchies, trees)
  - Complex JOINs (self-joins, multiple tables)
  - Subqueries vs CTEs
- **HackerRank SQL**: [Advanced Select](https://www.hackerrank.com/domains/sql) (2 hours/day)
- **Read**: [PostgreSQL CTE Documentation](https://www.postgresql.org/docs/current/queries-with.html)

**Days 11-14: Query Optimization**

- **EXPLAIN ANALYZE Practice**:
  - [PostgreSQL EXPLAIN Visualizer](https://explain.depesz.com/)
  - [PG Exercises](https://pgexercises.com/) - Complete all
- **LeetCode Hard**: 2-3 problems daily
- **Complete**: [Module 1 Homework](https://github.com/DataTalksClub/data-engineering-zoomcamp/blob/main/cohorts/2025/01-docker-terraform/homework.md)

**Week 2 Target**: 80+ LeetCode problems solved, comfortable with Medium difficulty in <20 minutes

---

### Week 3-4: Workflow Orchestration & Database Internals

#### Week 3: Zoomcamp Module 2 + B-Trees Deep Dive

**Days 15-17: Workflow Orchestration Fundamentals**

- **Module 2**: [Workflow Orchestration](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/02-workflow-orchestration) (8-10 hours)
  - Kestra orchestration basics
  - Building data pipelines
  - Scheduling and dependencies
- **Theory**: [CMU Database Systems Intro](https://www.youtube.com/watch?v=aZjYr87r1b8) (3 hours)
  - B-Tree operations and structure
  - Page splits, node organization
  - Take detailed notes

**Days 18-21: Storage Engines Deep Dive**

- **Interactive Learning**:
  - [B-Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/BTree.html) (2 hours)
  - [B+ Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html)
- **Implementation**: Code a simple B-Tree in Python (4-6 hours)
- **Complete**: Module 2 Homework

#### Week 4: Data Warehouse Foundations

**Days 22-24: Zoomcamp Module 3 - Data Warehouse**

- **Module 3**: [Data Warehouse](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/03-data-warehouse) (10-12 hours)
  - BigQuery fundamentals
  - Partitioning and clustering strategies
  - Cost optimization techniques
  - OLAP vs OLTP understanding
- **Reading**: "Designing Data-Intensive Applications" Ch. 3 - Storage and Retrieval

**Days 25-28: Index Strategies + Module 3 Homework**

- **Deep Dive**: [Use The Index, Luke!](https://use-the-index-luke.com/) - Complete course
  - Clustered vs Non-clustered indexes
  - Covering indexes, Partial indexes
- **Practical Lab**: 
  - Load 10GB dataset into PostgreSQL
  - Benchmark different index types
  - Compare with BigQuery query performance
- **Complete**: Module 3 Homework

---

## Month 2: Analytics Engineering & Distributed Systems

### Week 5-6: dbt & MapReduce Paradigm

#### Week 5: Analytics Engineering with dbt

**Days 29-31: Zoomcamp Module 4 - Analytics Engineering**

- **Module 4**: [Analytics Engineering](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/04-analytics-engineering) (12-15 hours)
  - dbt fundamentals and philosophy
  - Building transformation layers
  - Testing and documentation
  - Deployment strategies
- **Supplementary**: [dbt Learn Fundamentals](https://courses.getdbt.com/courses/fundamentals)

**Days 32-35: MapReduce Theory + dbt Practice**

- **Essential Reading**: [Google MapReduce Paper (2004)](https://research.google.com/archive/mapreduce-osdi04.pdf) (4-5 hours)
  - Implement word count from scratch
  - Understand Map, Shuffle, Reduce phases
- **dbt Project**: Build complete transformation pipeline
  - Bronze/Silver/Gold layers
  - Data quality tests
  - Documentation
- **Complete**: Module 4 Homework

#### Week 6: Batch Processing Foundations

**Days 36-38: File Formats Deep Dive**

- **Study**: 
  - [Apache Parquet Documentation](https://parquet.apache.org/docs/)
  - [Dremel Paper (Google)](https://research.google.com/pubs/archive/36632.pdf) - Columnar storage foundation
- **Hands-on** (6 hours):
  - Convert 1GB CSV to Parquet, ORC, Avro
  - Measure: file size, write time, read time, query performance
  - Use PyArrow, fastparquet

**Days 39-42: Hadoop Context + Spark Introduction**

- **Understanding Hadoop**:
  - [Hadoop Architecture](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/ClusterSetup.html)
  - HDFS: block size, replication, rack awareness
  - Why Spark replaced MapReduce (10-100x faster)
- **Reading**: [Spark RDD Paper (2012)](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf)

---

### Week 7-8: Batch Processing Mastery

#### Week 7: Zoomcamp Module 5 - Batch Processing

**Days 43-46: Spark Core Concepts**

- **Module 5**: [Batch Processing](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/05-batch) (15-20 hours)
  - Spark architecture and internals
  - RDDs, DataFrames, Datasets
  - Transformations vs Actions
  - DAG execution model
- **Databricks**: Sign up for [Community Edition](https://community.databricks.com/)
- **Academy**: [Spark Programming](https://academy.databricks.com/) - Free courses

**Days 47-49: Spark SQL & Performance**

- **Deep Dive**: [Catalyst Optimizer](https://www.databricks.com/blog/2015/04/13/deep-dive-into-spark-sqls-catalyst-optimizer.html)
  - Logical Plan → Optimized Logical Plan → Physical Plan
  - Code generation phase
- **Practice**: Implement same logic in:
  - RDD API (low-level understanding)
  - DataFrame API (optimization)
  - Spark SQL (Catalyst)
- **Complete**: Module 5 Homework

#### Week 8: Streaming Foundations

**Days 50-53: Zoomcamp Module 6 - Streaming**

- **Module 6**: [Streaming](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/06-streaming) (12-15 hours)
  - Kafka fundamentals
  - Topics, Partitions, Consumer Groups
  - Producer and Consumer APIs
  - Stream processing concepts
- **Confluent**: [Kafka 101 Course](https://developer.confluent.io/courses/apache-kafka/get-started/)

**Days 54-56: Structured Streaming**

- **Deep Dive**: [Spark Streaming Guide](https://spark.apache.org/docs/latest/streaming-programming-guide.html)
  - Micro-batching vs continuous processing
  - Watermarks and late data handling
  - Stateful operations
- **Mini Project**: Real-time word count from Kafka
- **Complete**: Module 6 Homework

---

## Month 3: NoSQL, Cloud & Production Systems

### Week 9-10: Advanced Topics & NoSQL

#### Week 9: LSM Trees & Cassandra

**Days 57-60: LSM Tree Architecture**

- **Essential Reading**:
  - [LSM Trees Explained](https://tikv.org/deep-dive/key-value-engine/b-tree-vs-lsm/)
  - [RocksDB Architecture](https://github.com/facebook/rocksdb/wiki/RocksDB-Basics)
  - [Amazon Dynamo Paper (2007)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)
- **Key Concepts**:
  - Write amplification vs Read amplification
  - Compaction strategies (Size-tiered, Leveled)
  - Why Cassandra/ScyllaDB chose LSM
- **Practical**: Benchmark PostgreSQL (B+ Tree) vs RocksDB (LSM Tree)

**Days 61-63: Cassandra & CAP Theorem**

- **Course**: [ScyllaDB University](https://university.scylladb.com/) - ScyllaDB Essentials (Free)
- **Data Modeling**:
  - Query-first design
  - Partition key selection
  - Denormalization patterns
- **CAP in Practice**:
  - Consistency levels (ONE, QUORUM, ALL)
  - Hinted handoff, Read repair
- **Lab**: Design time-series data model

#### Week 10: Document Stores & Module 7

**Days 64-66: MongoDB Fundamentals**

- **Course**: [MongoDB M001 Basics](https://university.mongodb.com/courses/M001/about) (Free)
- **Understanding**:
  - B+ Trees in MongoDB (not LSM)
  - BSON format advantages
  - Aggregation pipeline
- **Schema Patterns**:
  - Embedding vs Referencing
  - Bucket pattern for time-series
  - [MongoDB Design Patterns](https://www.mongodb.com/blog/post/building-with-patterns-a-summary)

**Days 67-70: Zoomcamp Module 7 - Project**

- **Module 7**: [Project](https://github.com/DataTalksClub/data-engineering-zoomcamp/tree/main/projects) (8-10 hours initial planning)
  - Choose project topic
  - Design architecture
  - Set up infrastructure
  - Begin implementation
- **Reading**: [Google Bigtable Paper (2006)](https://research.google.com/archive/bigtable-osdi06.pdf)

---

### Week 11-12: Cloud Platforms & Final Project

#### Week 11: Cloud Services & Advanced Topics

**Days 71-73: Cloud Data Services**

**Choose your focus based on job market:**

**AWS (Most companies)**:
- S3, Glue, EMR, Redshift, Kinesis
- [AWS Data Analytics Fundamentals](https://aws.amazon.com/training/digital/aws-data-analytics-fundamentals/)

**GCP (Analytics-heavy companies)**:
- Cloud Storage, Dataflow, Dataproc, BigQuery, Pub/Sub
- [GCP Data Engineering Path](https://cloud.google.com/training/data-engineering-and-analytics)

**Quick Lab**: Replicate local pipeline in cloud

**Days 74-77: Modern Data Stack & Project Development**

- **Continue Module 7 Project** (15-20 hours)
  - Implement core pipeline
  - Add monitoring and data quality
  - Document architecture decisions
- **Data Quality**:
  - Great Expectations basics
  - dbt tests implementation
  - Data contracts concept

#### Week 12: Project Completion & Interview Prep

**Days 78-81: Finalize Capstone Project**

- **Complete Module 7 Project Requirements**:
  - Ingest from 3+ sources (API, Database, Files)
  - Process with Spark (batch) + Kafka (streaming)
  - Store in Data Lake (Bronze/Silver/Gold)
  - Serve via Data Warehouse
  - Orchestrate with Kestra/Airflow
  - Monitor with data quality checks
- **Documentation**:
  - Architecture diagram (draw.io)
  - Design decisions and trade-offs
  - Performance metrics
  - README with setup instructions

**Days 82-84: SQL Interview Grind**

- **LeetCode Database**: Solve all Hard problems
- **Target**: 150+ total problems
- **Company-Specific**: [DataLemur Company Questions](https://datalemur.com/questions)
- **Practice**: Solve Medium problems in <20 minutes consistently

**Days 85-87: System Design Practice**

**Common Scenarios**:
- Design YouTube Analytics Pipeline
- Build Uber's Real-time Pricing System
- Create Netflix Recommendation Data Pipeline
- Design Twitter's Tweet Processing System

**Resources**:
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Data Engineering Interview Book](https://www.amazon.com/Ace-Data-Engineering-Interview/dp/B0CLKDWBWN)

**Days 88-90: Mock Interviews**

**Practice Sessions**:
- SQL coding: 45 minutes, 3 problems
- Python/Spark coding: 45 minutes, 2 problems
- System design: 60 minutes whiteboard
- Behavioral: STAR method stories ready

---

## Daily Schedule Template

### Weekday (2-3 hours)

- **6:00-7:00 AM**: Theory/Reading (Papers, Documentation)
- **8:00-9:00 PM**: Practical (Coding, LeetCode)
- **9:00-9:30 PM**: Project work or Zoomcamp videos

### Weekend (4-5 hours)

- **Saturday**: Deep learning (Watch lectures, read papers)
- **Sunday**: Build projects, complete homework

---

## Complete Zoomcamp Module Coverage

| Module | Week | Focus | Hours |
|--------|------|-------|-------|
| Module 1 | Week 1-2 | Docker & Terraform | 6-8 |
| Module 2 | Week 3 | Workflow Orchestration | 8-10 |
| Module 3 | Week 4 | Data Warehouse | 10-12 |
| Module 4 | Week 5 | Analytics Engineering | 12-15 |
| Module 5 | Week 7 | Batch Processing | 15-20 |
| Module 6 | Week 8 | Streaming | 12-15 |
| Module 7 | Week 10-12 | Project | 30-40 |

**Total Zoomcamp Time**: 93-120 hours  
**Total Plan Time**: 270-360 hours (includes theory, practice, interview prep)

---

## Essential Papers (Reading Order)

1. [Google MapReduce (2004)](https://research.google.com/archive/mapreduce-osdi04.pdf)
2. [Google Bigtable (2006)](https://research.google.com/archive/bigtable-osdi06.pdf)
3. [Amazon Dynamo (2007)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)
4. [Google Dremel (2010)](https://research.google.com/pubs/archive/36632.pdf)
5. [Spark RDD Paper (2012)](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf)

---

## Books (Priority Order)

1. **"Designing Data-Intensive Applications"** - Martin Kleppmann ($40)
   - Ch. 1-4 (Month 1), Ch. 5-9 (Month 2), Ch. 10-12 (Month 3)
2. **"Database Internals"** - Alex Petrov ($35)
   - Part 1: Storage Engines (Month 1)
3. **"Learning Spark"** 2nd Edition - Free from Databricks
   - Ch. 1-8 during Month 2

---

## Courses & Platforms

- **LeetCode Premium**: $35/month (Essential for SQL)
- **DataLemur**: Free tier + Premium $19/month (optional)
- **Data Engineering Zoomcamp**: Free (Core curriculum)
- **Databricks Academy**: Free community edition
- **ScyllaDB University**: Free
- **MongoDB University**: Free
- **Confluent Developer**: Free tier

---

## Success Metrics

### Month 1 Checkpoint

- 100+ LeetCode SQL problems solved
- Can explain B-Tree operations and draw diagrams
- Understand OLTP vs OLAP trade-offs
- Completed Zoomcamp Modules 1-3
- Built orchestrated data pipeline with Kestra

### Month 2 Checkpoint

- Read MapReduce, Spark RDD papers
- Built 3+ Spark applications
- Understand Parquet format internals
- Can explain Catalyst optimizer phases
- Completed Zoomcamp Modules 4-6
- Built streaming pipeline with Kafka

### Month 3 Checkpoint

- Understand LSM vs B-Tree trade-offs
- Deployed full pipeline to cloud
- 150+ LeetCode problems total
- Completed Zoomcamp Module 7 (Final Project)
- Portfolio with production-quality end-to-end project
- Can design distributed systems on whiteboard

---

## Interview Ready Checklist

### Technical Skills

- Solve SQL medium problems in <20 minutes
- Explain database index types and use cases
- Design partition strategies for Spark jobs
- Choose appropriate NoSQL database for requirements
- Debug performance using execution plans

### System Design

- Design batch ETL pipeline (sources → processing → warehouse)
- Design streaming pipeline (Kafka → processing → sink)
- Explain CAP theorem with real examples
- Calculate resource requirements for pipelines
- Design data models for different paradigms

### Behavioral Stories (STAR Format)

- Debugging critical pipeline failure
- Optimizing slow queries/jobs
- Collaborating with stakeholders
- Learning new technology quickly
- Handling ambiguous requirements

---

## Total Investment

### Time: 270-360 hours over 3 months

- **Month 1**: 90-120 hours (SQL + Databases + Workflow + DW)
- **Month 2**: 90-120 hours (Analytics Eng + Distributed Systems + Streaming)
- **Month 3**: 90-120 hours (NoSQL + Cloud + Final Project)

### Cost: $170-$300

- LeetCode Premium (3 months): $105
- DataLemur Premium (optional): $57
- Books: $75-$115
- Cloud credits: Free tier sufficient
- **Zoomcamp: Free**

### Alternative Free Path

- LeetCode free tier + HackerRank
- Library books or shared subscriptions
- All courses have free tiers
- **Total cost: $0-$50**

---

## Community & Support

- **Slack**: [DataTalks.Club Slack](https://datatalks.club/slack.html) - `#course-data-engineering`
- **Reddit**: r/dataengineering for questions
- **Discord**: Data Engineering Discord for real-time help
- **GitHub**: Star and watch [Zoomcamp repo](https://github.com/DataTalksClub/data-engineering-zoomcamp)

---

## Why This Approach Works

This plan follows the "fundamentalist approach" - you're not just learning tools, you're understanding **why** things work. By month 3, you'll understand:

- Why Cassandra uses LSM trees
- Why Spark's Catalyst beats hand-written code
- Why schemaless designs create complexity
- How to make informed architectural decisions

The complete Zoomcamp integration ensures you have hands-on experience with modern tools while the theoretical deep dives give you the knowledge to explain and defend your design choices in interviews.

**Remember**: "SQL leetcode will get you further than anything else" - Start there, build systematically, and by month 3 you'll be designing distributed systems with confidence.


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
