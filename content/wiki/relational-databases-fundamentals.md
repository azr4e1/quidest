+++
date = '2025-11-05T12:14:09Z'
title = 'Relational Databases Fundamentals'
hideReply = true
tags = ["data-engineering", "study-plan", "career-development", "zoomcamp"]
+++


A relational database organizes data into tables (relations) with rows and columns. Each table represents an entity type, rows represent individual instances, and columns represent attributes.

A relational database consists of multiple tables that relate to each other. The relation between tables is formed in the sense of shared columns.

Relational databases are created using the structured query language (SQL) to create, store, update, and retrieve data. Therefore, SQL is the critical programming language for all relational database management systems.

# Relational Model

Developed by E.F. Codd in 1970, the model is based on mathematical set theory and predicate logic.

Core components of the relational model:

- **Relations (Tables)**: A set of tuples with the same attribute
- **Tuples (Rows)**: An ordered set of attribute values
- **Attributes (Columns)**: Named properties of a relation
- **Domain**: The set of allowable values for an attribute

# Transactions

A transaction is a sequential group of statements or queries to perform single or multiple tasks in a database. Transactions may consist of a single read, write, delete, or update operations or a combination of these.

For example, if you are updating a record or deleting a record of a table, then you are performing a transaction on the table. It might look like this:

```sql
INSERT INTO Cinema VALUES (12, 'The Lion King', 'Cartoon', 140)
UPDATE Cinema SET duration = 110 WHERE id = 12
```

Relational databases follow the ACID properties; this is a set of principles that ensure database transactions are processed reliably:

- **Atomicity**: Transactions are all-or-nothing. If one part fails, the entire transaction rolls back.
- **Consistency**: Transactions move the database from one valid state to another, maintaining all constraints.
- **Isolation**: Concurrent transactions don't interfere with each other.
- **Durability**: Once committed, changes persist even after system failure.

# Schemas

Database schema is the structure of a database, refers to the organization of data as a blueprint that demonstrates how the database is constructed.

So, a database schema describes how the data may relate to other tables or other data models. However, the schema does not actually contain data.

# Instance

Database instance is a snap shot of data in a database at a single moment in time . It contains all the properties that the schema describes as data values.

Since database instances are just a snapshot at a given moment, they’re likely to change over time, unlike database schemas.

# Keys

Keys are a column or set of columns that identify rows within a relational table. They establish and identify the relationship between tables. There are many different types of keys in RDBMS:

- **Primary Key**: Uniquely identifies each row in a table. Must be unique and NOT NULL.
- **Foreign Key**: A column that references a primary key in another table, establishing relationships.
- **Candidate Key**: Any column or combination of columns that could serve as a primary key.
- **Composite Key**: A primary key composed of multiple columns.
- **Surrogate Key**: An artificial key (often auto-incrementing integer) with no business meaning.
- **Natural Key**: A key derived from actual data (e.g., Social Security Number).

e.g.:

```sql
--define primary key 
CREATE TABLE students(
  student_id integer PRIMARY KEY,
  name varchar(20));

--specify primary key for already-built table
ALTER TABLE students
ADD PRIMARY KEY (student_id);

--add a column and change the primary key
ALTER TABLE student ADD COLUMN real_id NOT NULL;
ALTER TABLE student ALTER PRIMARY KEY USING COLUMNS (real_id);

CREATE TABLE teachers(
  id integer PRIMARY KEY,
  teache_name varchar(30),
);

CREATE TABLE classes(
  id integer PRIMARY KEY,
  teacher_id varchar(30) REFERENCES teachers(id), --foreign key is created
  category varchar(40),
);
```

A table can have as many foreign keys as you need—there's no practical limit in modern relational databases.

## Referential Integrity

Referential integrity ensures that relationships between tables remain consistent. Specifically: a foreign key value must either be NULL or match an existing primary key value in the referenced table.
It prevents orphaned records—rows that reference non-existent data.

Example of violation:

```sql
-- departments table
department_id | department_name
1            | Sales
2            | Engineering

-- employees table with foreign key
employee_id | name  | department_id
101        | Alice | 1              -- OK: department 1 exists
102        | Bob   | 99             -- VIOLATION: department 99 doesn't exist
```

Without referential integrity enforced, you could insert Bob with `department_id = 99`, creating an orphaned record. With a foreign key constraint, the database rejects this insert.

Foreign keys have the following benefits:

### Validation on INSERT/UPDATE

The database checks that the foreign key value exists in the parent table.

```sql
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(50),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- This works
INSERT INTO departments VALUES (1, 'Sales');
INSERT INTO employees VALUES (101, 'Alice', 1);

-- This FAILS with referential integrity error
INSERT INTO employees VALUES (102, 'Bob', 99);
-- Error: Cannot add or update a child row: a foreign key constraint fails
```

### Restrictions on DELETE from Parent Table

You cannot delete a parent row if child rows reference it:


```sql
-- This FAILS
DELETE FROM departments WHERE department_id = 1;
-- Error: Cannot delete or update a parent row: a foreign key constraint fails

-- You must first handle the child rows:
DELETE FROM employees WHERE department_id = 1;
DELETE FROM departments WHERE department_id = 1;  -- Now works
```

### Restrictions on UPDATE of Parent Primary Key

You cannot change a primary key value if child rows reference it:

```sql
-- This FAILS
UPDATE departments SET department_id = 10 WHERE department_id = 1;
-- Error: Cannot delete or update a parent row: a foreign key constraint fails
```

### CASCADE Options

You can define what happens when parent rows are deleted or updated:

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(50),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

- `ON DELETE CASCADE`: Deleting a department automatically deletes all employees in that department.
- `ON DELETE SET NULL`: Deleting a department sets department_id to NULL in employee records.
- `ON DELETE RESTRICT / NO ACTION`: Prevents deletion (default behavior).
- `ON UPDATE CASCADE`: Updating department_id in parent updates all child references.
- `ON UPDATE SET NULL`: Updating department_id in parent sets child values to NULL.


# Relationships

Two tables in the database can be connected by using keys (above). However, there are many types of connections between tables, which are usually called _relationship_:

- **One-to-One (1:1)**: Each record in Table A relates to one record in Table B.
- **One-to-Many (1:N)**: Each record in Table A can relate to multiple records in Table B.
- **Many-to-Many (M:N)**: Multiple records in Table A relate to multiple records in Table B. Requires a junction/bridge table.

# Constraints

In a database table, we can add rules to a column known as constraints. These are used to limit the type of data that can go into a table.

There are a few frequently-used constrains when creating a new column:

```sql
CREATE TABLE products (

-- NOT NULL constraints 
product_name text NOT NULL,
price int NOT NULL,
-- enforces a column to NOT accept NULL values.

-- DEFAULT constraints
product_type varchar(255) DEFAULT 'Man Shoes'
-- set a default value for a column.

-- UNIQUE constraints 
product_id int UNIQUE,
-- ensures that all values in a column are different.

-- Primary constraints
product_key int PRIMARY KEY,
);
-- uniquely identifies each record in a table.

-- Check constraints 
product_expired_duration int,
CHECK (product_expired_duration > 22)
-- limit the value range that can be placed in a column.

-- Foreign constraints
CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products (product_id),
-- prevent actions that would destroy links between tables.
```

# Normalization

Normalization is the process of organizing data in a database. It includes creating tables and establishing relationships between those tables according to rules designed both to protect the data and to make the database more flexible by eliminating redundancy and inconsistent dependency.

Normalization rules divide large tables into smaller tables and join them using relationships. The purpose of normalization in SQL is:

- Eliminate redundant (repetitive) data
- Ensure that data is stored logically.

## First Normal Form (1NF):

- Eliminate repeating groups in individual tables.
- Create a separate table for each set of related data.
- Identify each set of related data with a primary key.

Don't use multiple fields in a single table to store similar data. For example, to track an inventory item that may come from two possible sources, an inventory record may contain fields for Vendor Code 1 and Vendor Code 2.

What happens when you add a third vendor? Adding a field isn't the answer; it requires program and table modifications and doesn't smoothly accommodate a dynamic number of vendors. Instead, place all vendor information in a separate table called Vendors, then link inventory to vendors with an item number key, or vendors to inventory with a vendor code key.

## Second Normal Form (2NF):

- Create separate tables for sets of values that apply to multiple records.
- Relate these tables with a foreign key.

Records shouldn't depend on anything other than a table's primary key (a compound key, if necessary). For example, consider a customer's address in an accounting system. The address is needed by the Customers table, but also by the Orders, Shipping, Invoices, Accounts Receivable, and Collections tables. Instead of storing the customer's address as a separate entry in each of these tables, store it in one place, either in the Customers table or in a separate Addresses table.

## Third Normal Form (3NF):

- Must be in 2NF
- No transitive dependencies (non-key attributes depend only on the primary key)

## Boyce-Codd Normal Form (BCNF):

- Stricter version of 3NF
- Every determinant must be a candidate key

Fourth Normal Form (4NF) and Fifth Normal Form (5NF) exist but are rarely applied in practice.

**Denormalization**: Intentionally introducing redundancy for performance reasons. Trade data integrity for query speed.

# Postgres Cheatsheet

![Sheet1](/images/postgresql-cheatsheet1.png)
![Sheet2](/images/postgresql-cheatsheet2.png)
