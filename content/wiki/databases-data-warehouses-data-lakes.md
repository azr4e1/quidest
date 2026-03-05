+++
date = '2026-03-05T10:04:05Z'
title = 'Databases, Data Warehouses and Data Lakes'
hideReply = true
tags = ["zoomcamp", "data engineering", "programming", "pipeline", "ACID"]
+++

## Databases

A database is a collection of data or information. Databases are typically accessed electronically and are used to support Online Transaction Processing (OLTP). Database Management Systems (DBMS) store data in the database and enable users and applications to interact with the data. The term “database” is commonly used to reference both the database itself as well as the DBMS.

### Characteristics of a Database

A variety of database types have emerged over the last several decades. All databases store information, but each database will have its own characteristics. Relational databases store data in tables with fixed rows and columns. Non-relational databases (also known as NoSQL databases) store data in a variety of models including JSON (JavaScript Object Notation), BSON (Binary JSON), key-value pairs, tables with rows and dynamic columns, and nodes and edges. Databases store structured and/or semi-structured data, depending on the type.

You may also find database characteristics like:

- Security features to ensure the data can only be accessed by authorized users.
- ACID (Atomicity, Consistency, Isolation, Durability) transactions to ensure data integrity.
- Query languages and APIs to easily interact with the data in the database.
- Indexes to optimize query performance.
- Full-text search.
- Optimizations for mobile devices.
- Flexible deployment topologies to isolate workloads (e.g., analytics workloads) to a specific set of resources.
- On-premises, private cloud, public cloud, hybrid cloud, and/or multi-cloud hosting options.

## OLAP + data warehouses and data lakes

Both data warehouses and data lakes are meant to support Online Analytical Processing (OLAP). OLAP systems are typically used to collect data from a variety of sources. The data is then used to power a range of analytical use cases ranging from business intelligence and reporting (e.g., quarterly sales reports by store) to forecasting (e.g., predicting home sales for the next six months based on historical trends).

### Data Warehouses

A data warehouse is a system that stores highly structured information from various sources. Data warehouses typically store current and historical data from one or more systems. The goal of using a data warehouse is to combine disparate data sources in order to analyze the data, look for insights, and create business intelligence (BI) in the form of reports and dashboards.

A data warehouse is a giant database that is optimized for analytics.

#### Characteristics of a Data Warehouse

Data warehouses store large amounts of current and historical data from various sources. They contain a range of data, from raw ingested data to highly curated, cleansed, filtered, and aggregated data.

Extract, transform, load (ETL) processes move data from its original source to the data warehouse. The ETL processes move data on a regular schedule (for example, hourly or daily), so data in the data warehouse may not reflect the most up-to-date state of the systems.

Data warehouses typically have a pre-defined and fixed relational schema. Therefore, they work well with structured data. Some data warehouses also support semi-structured data.

Once the data is in the warehouse, business analysts can connect data warehouses with BI tools. These tools allow business analysts and data scientists to explore the data, look for insights, and generate reports for business stakeholders.

### Data Lakes

A data lake is a repository of data from disparate sources that is stored in its original, raw format. Like data warehouses, data lakes store large amounts of current and historical data. What sets data lakes apart is their ability to store data in a variety of formats including JSON, BSON, CSV, TSV, Avro, ORC, and Parquet.

Typically, the primary purpose of a data lake is to analyze the data to gain insights. However, organizations sometimes use data lakes simply for their cheap storage with the idea that the data may be used for analytics in the future.

A data lake is a repository for data stored in a variety of ways including databases. With modern tools and technologies, a data lake can also form the storage layer of a database. Tools like Starburst, Presto, Dremio, and Atlas Data Lake can give a database-like view into the data stored in your data lake. In many cases, these tools can power the same analytical workloads as a data warehouse.

#### Characteristics of a Data Lake

Data lakes store large amounts of structured, semi-structured, and unstructured data. They can contain everything from relational data to JSON documents to PDFs to audio files.

Data does not need to be transformed in order to be added to the data lake, which means data can be added (or “ingested”) incredibly efficiently without upfront planning.

The primary users of a data lake can vary based on the structure of the data. Business analysts will be able to gain insights when the data is more structured. When the data is more unstructured, data analysis will likely require the expertise of developers, data scientists, or data engineers.
