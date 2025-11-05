+++
date = '2025-11-05T14:03:31Z'
title = 'Sql Fundamentals'
hideReply = true
tags = ["data-engineering", "study-plan", "career-development", "zoomcamp"]
+++

SQL (Structured Query Language) is the standard language for interacting with relational databases. It's declarative—you specify what you want, not how to get it.

Common types across systems (syntax varies by RDBMS):

- **Numeric**:`INT`, `BIGINT`, `SMALLINT`, `DECIMAL(p,s)`, `NUMERIC`, `FLOAT`, `REAL`, `DOUBLE`
- **Character**:`CHAR(n)`, `VARCHAR(n)`, `TEXT`
- **Date/Time**:`DATE`, `TIME`, `DATETIME`, `TIMESTAMP`, `INTERVAL`
- **Binary**:`BLOB`, `BYTEA`, `VARBINARY`
- **Boolean**:`BOOLEAN (some systems use TINYINT)`
- **Other**:`JSON`, `XML`, `UUID`, `ENUM`, `ARRAY (PostgreSQL)`

# Creating Tables

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
```

Constraints:

- `NOT NULL`
- `UNIQUE`
- `PRIMARY KEY`
- `FOREIGN KEY`
- `CHECK`
- `DEFAULT`

# Inserting Data

```sql
-- Single row
INSERT INTO employees (first_name, last_name, email, hire_date, salary)
VALUES ('John', 'Doe', 'john@example.com', '2024-01-15', 75000);

-- Multiple rows
INSERT INTO employees (first_name, last_name, email) 
VALUES 
    ('Jane', 'Smith', 'jane@example.com'),
    ('Bob', 'Johnson', 'bob@example.com');

-- From another table
INSERT INTO archived_employees
SELECT * FROM employees WHERE hire_date < '2020-01-01';
```

# Select Queries

```sql
-- Basic select
SELECT first_name, last_name, salary FROM employees;

-- All columns
SELECT * FROM employees;

-- With WHERE clause
SELECT * FROM employees WHERE salary > 60000;

-- Multiple conditions
SELECT * FROM employees 
WHERE salary > 60000 AND department_id = 3;

-- Pattern matching
SELECT * FROM employees WHERE last_name LIKE 'S%';

-- IN operator
SELECT * FROM employees WHERE department_id IN (1, 3, 5);

-- BETWEEN
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 80000;

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE email IS NOT NULL;

-- DISTINCT
SELECT DISTINCT department_id FROM employees;

-- ORDER BY
SELECT * FROM employees ORDER BY salary DESC, last_name ASC;

-- LIMIT (MySQL/PostgreSQL) or TOP (SQL Server)
SELECT * FROM employees ORDER BY salary DESC LIMIT 10;
```

# Aggregate Functions

```sql
SELECT 
    COUNT(*) as total_employees,
    AVG(salary) as avg_salary,
    MIN(salary) as min_salary,
    MAX(salary) as max_salary,
    SUM(salary) as total_payroll
FROM employees;
```

# GROUP BY and HAVING

```sql
-- Group by department
SELECT department_id, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id;

-- HAVING filters groups (WHERE filters rows)
SELECT department_id, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 70000;
```

Key difference: WHERE filters before grouping, HAVING filters after grouping.

# INNER JOIN

Returns rows with matches in both tables

```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;
```

or

```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id
```

# LEFT JOIN

Returns all rows from left table, matching rows from right (NULL if no match).

```sql
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;
```

# RIGHT JOIN

Returns all rows from right table, matching rows from left.

# FULL OUTER JOIN

Returns all rows from both tables (not supported in MySQL).

# CROSS JOIN

Cartesian product of both tables.

```sql
SELECT * FROM table1 CROSS JOIN table2;
```

# SELF JOIN

Joining a table to itself

```sql
SELECT e1.first_name, e2.first_name as manager_name
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.employee_id;
```

# Subqueries

```sql
-- In WHERE clause
SELECT first_name, last_name
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- In FROM clause (derived table)
SELECT dept_stats.department_id, dept_stats.avg_salary
FROM (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
) as dept_stats
WHERE dept_stats.avg_salary > 70000;

-- Correlated subquery
SELECT e1.first_name, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);

-- EXISTS
SELECT d.department_name
FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.department_id = d.department_id
);
```

# Set Operations

```sql
-- UNION (removes duplicates)
SELECT first_name FROM employees
UNION
SELECT first_name FROM contractors;

-- UNION ALL (keeps duplicates)
SELECT first_name FROM employees
UNION ALL
SELECT first_name FROM contractors;

-- INTERSECT
SELECT first_name FROM employees
INTERSECT
SELECT first_name FROM contractors;

-- EXCEPT (or MINUS in Oracle)
SELECT first_name FROM employees
EXCEPT
SELECT first_name FROM contractors;
```

# UPDATE

```sql
-- Update single column
UPDATE employees SET salary = 80000 WHERE employee_id = 5;

-- Update multiple columns
UPDATE employees 
SET salary = salary * 1.1, last_updated = NOW()
WHERE department_id = 3;

-- Update with JOIN (syntax varies)
UPDATE employees e
INNER JOIN departments d ON e.department_id = d.department_id
SET e.bonus = d.bonus_multiplier * e.salary
WHERE d.department_name = 'Sales';
```

# DELETE

```sql
-- Delete specific rows
DELETE FROM employees WHERE employee_id = 5;

-- Delete based on condition
DELETE FROM employees WHERE hire_date < '2015-01-01';

-- Delete all rows (slower, logged)
DELETE FROM employees;

-- TRUNCATE (faster, minimal logging, resets auto-increment)
TRUNCATE TABLE employees;
```

# Transactions

```sql
START TRANSACTION; -- or BEGIN

UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- If everything is correct
COMMIT;

-- If there's an error
ROLLBACK;

-- Savepoints
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
SAVEPOINT sp1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
-- If second update fails
ROLLBACK TO sp1;
COMMIT;
```

# Window Functions

Perform calculations across rows related to the current row without collapsing results.

```sql
-- Row number
SELECT 
    first_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- Partition by department
SELECT 
    first_name,
    department_id,
    salary,
    AVG(salary) OVER (PARTITION BY department_id) as dept_avg
FROM employees;

-- Running total
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM orders;

-- Ranking functions
SELECT 
    first_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num,
    RANK() OVER (ORDER BY salary DESC) as rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) as dense_rank,
    NTILE(4) OVER (ORDER BY salary DESC) as quartile
FROM employees;

-- LAG and LEAD
SELECT 
    order_date,
    amount,
    LAG(amount, 1) OVER (ORDER BY order_date) as previous_amount,
    LEAD(amount, 1) OVER (ORDER BY order_date) as next_amount
FROM orders;
```

# Common Table Expressions (CTEs)

```sql
-- Basic CTE
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 100000
)
SELECT * FROM high_earners WHERE department_id = 3;

-- Multiple CTEs
WITH 
dept_totals AS (
    SELECT department_id, SUM(salary) as total_salary
    FROM employees
    GROUP BY department_id
),
dept_averages AS (
    SELECT department_id, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT 
    t.department_id,
    t.total_salary,
    a.avg_salary
FROM dept_totals t
JOIN dept_averages a ON t.department_id = a.department_id;

-- Recursive CTE (for hierarchies)
WITH RECURSIVE employee_hierarchy AS (
    -- Anchor member
    SELECT employee_id, first_name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive member
    SELECT e.employee_id, e.first_name, e.manager_id, eh.level + 1
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy;
```

# CASE Expressions

```sql
-- Simple CASE
SELECT 
    first_name,
    salary,
    CASE department_id
        WHEN 1 THEN 'Sales'
        WHEN 2 THEN 'Engineering'
        WHEN 3 THEN 'HR'
        ELSE 'Other'
    END as department_name
FROM employees;

-- Searched CASE
SELECT 
    first_name,
    salary,
    CASE 
        WHEN salary < 50000 THEN 'Low'
        WHEN salary BETWEEN 50000 AND 100000 THEN 'Medium'
        ELSE 'High'
    END as salary_bracket
FROM employees;
```

# Views

```sql
-- Create view
CREATE VIEW high_salary_employees AS
SELECT first_name, last_name, salary, department_id
FROM employees
WHERE salary > 80000;

-- Use view
SELECT * FROM high_salary_employees WHERE department_id = 3;

-- Updatable views (restrictions apply)
CREATE VIEW engineering_staff AS
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE department_id = 2;

-- Update through view
UPDATE engineering_staff SET salary = salary * 1.1;

-- Drop view
DROP VIEW high_salary_employees;

-- Materialized views (PostgreSQL)
CREATE MATERIALIZED VIEW dept_summary AS
SELECT department_id, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department_id;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW dept_summary;
```

# Indexes

Improve query performance by creating data structures that allow faster lookups

```sql
-- Create index
CREATE INDEX idx_employee_lastname ON employees(last_name);

-- Composite index
CREATE INDEX idx_dept_salary ON employees(department_id, salary);

-- Unique index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- Drop index
DROP INDEX idx_employee_lastname ON employees;

-- Full-text index (MySQL)
CREATE FULLTEXT INDEX idx_description ON products(description);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_employees ON employees(last_name) 
WHERE active = true;
```

When to use indexes:

- Columns frequently used in WHERE clauses
- Foreign keys
- Columns used in JOIN conditions
- Columns used in ORDER BY

Trade-offs:

- Indexes speed up reads but slow down writes
- Indexes consume storage space
- Too many indexes can hurt performance

# Stored Procedures

```sql
-- MySQL/PostgreSQL syntax
DELIMITER //
CREATE PROCEDURE give_raise(IN emp_id INT, IN raise_pct DECIMAL(5,2))
BEGIN
    UPDATE employees 
    SET salary = salary * (1 + raise_pct / 100)
    WHERE employee_id = emp_id;
END //
DELIMITER ;

-- Call procedure
CALL give_raise(5, 10);

-- Procedure with OUT parameter
DELIMITER //
CREATE PROCEDURE get_employee_count(OUT emp_count INT)
BEGIN
    SELECT COUNT(*) INTO emp_count FROM employees;
END //
DELIMITER ;

-- Use OUT parameter
CALL get_employee_count(@count);
SELECT @count;
```

# Triggers

Automatically execute code in response to events

```sql
-- Before insert trigger
CREATE TRIGGER before_employee_insert
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
    SET NEW.email = LOWER(NEW.email);
END;

-- After update trigger
CREATE TRIGGER after_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary != OLD.salary THEN
        INSERT INTO salary_history (employee_id, old_salary, new_salary, changed_at)
        VALUES (NEW.employee_id, OLD.salary, NEW.salary, NOW());
    END IF;
END;

-- Drop trigger
DROP TRIGGER before_employee_insert;
```

# Functions

User-defined functions return a single value

```sql
-- Scalar function
CREATE FUNCTION calculate_bonus(emp_salary DECIMAL(10,2)) 
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    RETURN emp_salary * 0.1;
END;

-- Use function
SELECT first_name, salary, calculate_bonus(salary) as bonus
FROM employees;

-- Table-valued function (SQL Server)
CREATE FUNCTION get_department_employees(@dept_id INT)
RETURNS TABLE
AS
RETURN (
    SELECT employee_id, first_name, last_name, salary
    FROM employees
    WHERE department_id = @dept_id
);

-- Use table function
SELECT * FROM get_department_employees(3);
```

# Constraints

```sql
-- Add constraint to existing table
ALTER TABLE employees
ADD CONSTRAINT chk_salary CHECK (salary > 0);

ALTER TABLE employees
ADD CONSTRAINT fk_department 
FOREIGN KEY (department_id) REFERENCES departments(department_id)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Drop constraint
ALTER TABLE employees
DROP CONSTRAINT chk_salary;

-- Check constraint
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    order_date DATE,
    ship_date DATE,
    CONSTRAINT chk_dates CHECK (ship_date >= order_date)
);
```

Foreign key actions:

- `CASCADE`: Propagate changes/deletes to child rows
- `SET NULL`: Set foreign key to NULL
- `SET DEFAULT`: Set foreign key to default value
- `RESTRICT/NO ACTION`: Prevent operation if child rows exist

# Locking

```sql
-- Explicit locking (MySQL)
LOCK TABLES employees WRITE;
-- Perform operations
UNLOCK TABLES;

-- Row-level locking
SELECT * FROM employees WHERE employee_id = 5 FOR UPDATE;

-- Pessimistic locking
BEGIN;
SELECT * FROM accounts WHERE account_id = 1 FOR UPDATE;
-- Perform operations
COMMIT;

-- Optimistic locking (application-level with version column)
UPDATE accounts 
SET balance = balance - 100, version = version + 1
WHERE account_id = 1 AND version = @old_version;
```

# Query Optimization

`EXPLAIN/EXPLAIN ANALYZE`: Shows query execution plan.

```sql
EXPLAIN SELECT * FROM employees WHERE salary > 50000;

EXPLAIN ANALYZE SELECT e.*, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;
```

Optimization techniques:

1. Use indexes on columns in WHERE, JOIN, ORDER BY
1. Avoid SELECT *, specify needed columns
1. Use LIMIT when appropriate
1. Avoid functions on indexed columns in WHERE (breaks index usage)
1. Use EXISTS instead of IN for subqueries when checking existence
1. Use JOIN instead of subqueries when possible
1. Avoid LIKE with leading wildcard ('%value')
1. Consider partitioning large tables
1. Update statistics regularly
1. Use appropriate data types

# Partitioning

Splitting large tables into smaller, more manageable pieces

```sql
-- Range partitioning (MySQL)
CREATE TABLE sales (
    sale_id INT,
    sale_date DATE,
    amount DECIMAL(10,2)
)
PARTITION BY RANGE (YEAR(sale_date)) (
    PARTITION p2020 VALUES LESS THAN (2021),
    PARTITION p2021 VALUES LESS THAN (2022),
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- List partitioning
CREATE TABLE employees_partitioned (
    employee_id INT,
    first_name VARCHAR(50),
    region VARCHAR(10)
)
PARTITION BY LIST (region) (
    PARTITION p_west VALUES IN ('CA', 'OR', 'WA'),
    PARTITION p_east VALUES IN ('NY', 'MA', 'CT'),
    PARTITION p_other VALUES IN (DEFAULT)
);

-- Hash partitioning
CREATE TABLE orders_partitioned (
    order_id INT,
    customer_id INT,
    order_date DATE
)
PARTITION BY HASH(customer_id)
PARTITIONS 4;
```
