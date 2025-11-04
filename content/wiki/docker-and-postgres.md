+++
date = '2025-10-31T17:16:42Z'
draft = false
title = 'Docker and Postgres'
hideReply = true
tags = ["data-engineering", "study-plan", "career-development", "zoomcamp"]
+++

A _data pipeline_ is a processing service that gets in data and produces more data

_Docker_ is a software platform that allows you to build, test, and deploy applications quickly. Docker packages software into standardized units called containers that have everything the software needs to run including libraries, system tools, code, and runtime. Using Docker, you can quickly deploy and scale applications into any environment and know your code will run.

We can have multiple databases and pipelines running in separate docker containers, completely separated from each other.

Docker images are snapshots of a container; they contain all the instructions needed to create a specific environment. This gurantees reproducibility anywhere.

Data Engineers care about Docker because:

- reproducibilty
- local experiments and integration tests
- running pipelines on the cloud (AWS Batch, Kubernetes)
- Spark: we can specify all the requirements of the pipelines using spark within docker
- Serverless (AWS Lambda, Google Functions)


## Basics

We can pull images from Docker Hub and run them directly in our machine:

`docker run -it ubuntu` will pull and create an interactive ubuntu container running bash

`docker run -it python:3.9` will pull a ubuntu image with Python 3.9, and run the Python interpreter.

If we want to create the `python:3.9` container, but starting it with bash instead of with Python (maybe because we want to install some libraries like `pandas`), we can change the `entrypoint`:

`docker run -it --entrypoint=bash python:3.9`

## Dockerfile

A `Dockerfile` is a list of instructions on how to create and run a Docker image. For example, we can translate the command `docker run -it --entrypoint=bash python:3.9` into

```Dockerfile
FROM python:3.9

RUN pip install pandas

ENTRYPOINT ["bash"]
```

and then `docker build -t test:pandas .`, which will build an image with tag `test:pandas` using the Dockerfile in the current dir. This image will contain python3.9 and pandas, and when we run `docker run -it test:pandas`, the container will start in interactive mode with bash

## Dockerize Scripts

Let's assume we have a script `pipeline.py`, that we want to run from a container with the required dependencies (e.g. pandas), something as simple as

```python
import pandas as pd
import sys

day = sys.argv[1]
print(f"Job finished successfully for day = {day}.")
```

then we can write the following Dockerfile:

```Dockerfile
FROM python:3.9

RUN pip install pandas

WORKDIR /app

COPY pipeline.py pipeline.py

ENTRYPOINT [ "python", "pipeline.py" ]
```

We can build like before, and when running something like `docker run test:pandas 2023-01-01`, it will print `Job finished successfully for day = 2023-01-01.`

## Postgres in Docker

We can run a postgres database in docker with the following command, that will pull an image, set environment variables for username, password and database name, and map a port inside the container (5432) to a host port (5433); it will also map a host volume (`ny_taxi_postgres_data`) to a container volume; this allows for data persistency when taking down or setting up a container.

```bash
docker run -it -e POSTGRES_USER=root \
               -e POSTGRES_PASSWORD=root \
               -e POSTGRES_DB=ny_taxi \
               -v $(pwd)/ny_taxi_postgres_data:/var/lib/postgresql/data \
               -p 5433:5432 postgres:13
```

Once the postgres database is up and running, we can query with a CLI tool called `pgcli`; just run

```bash
pgcli --host localhost --port 5433 --user root --password root --dbname ny_taxi
```

and then run queries in the interactive cli with autocompletion.


## Ingesting Data

Let's assume we have a dataset in CSV that we want to ingest into postgres. We can do this in Python; we first need to install the following libraries: `psycopg2-binary, pandas, sqlalchemy`

We can inspect the first 100 rows of a dataset with

```python
import pandas as pd

df = pd.read_csv("./yellow_taxi_data.csv.gz", nrows=100)
df.head(10)
```

If we want to ingest the data into postgres, we will need to generate the sql schema. We can do that with

```python
print(pd.io.sql.get_schema(df, name='yellow_taxi_trips'))

# CREATE TABLE "yellow_taxi_trips" (
# "VendorID" INTEGER,
#   "tpep_pickup_datetime" TEXT,
#   "tpep_dropoff_datetime" TEXT,
#   "passenger_count" INTEGER,
#   "trip_distance" REAL,
#   "RatecodeID" INTEGER,
#   "store_and_fwd_flag" TEXT,
#   "PULocationID" INTEGER,
#   "DOLocationID" INTEGER,
#   "payment_type" INTEGER,
#   "fare_amount" REAL,
#   "extra" REAL,
#   "mta_tax" REAL,
#   "tip_amount" REAL,
#   "tolls_amount" REAL,
#   "improvement_surcharge" REAL,
#   "total_amount" REAL,
#   "congestion_surcharge" REAL
# )
```

We can see that some datetime fields are read as text. We can convert that with

```python
df["tpep_pickup_datetime"] = pd.to_datetime(df["tpep_pickup_datetime"])
df["tpep_dropoff_datetime"] = pd.to_datetime(df["tpep_dropoff_datetime"])
```

and now

```python
print(pd.io.sql.get_schema(df, name='yellow_taxi_trips'))

# CREATE TABLE "yellow_taxi_trips" (
# "VendorID" INTEGER,
#   "tpep_pickup_datetime" TIMESTAMP,
#   "tpep_dropoff_datetime" TIMESTAMP,
#   "passenger_count" INTEGER,
#   "trip_distance" REAL,
#   "RatecodeID" INTEGER,
#   "store_and_fwd_flag" TEXT,
#   "PULocationID" INTEGER,
#   "DOLocationID" INTEGER,
#   "payment_type" INTEGER,
#   "fare_amount" REAL,
#   "extra" REAL,
#   "mta_tax" REAL,
#   "tip_amount" REAL,
#   "tolls_amount" REAL,
#   "improvement_surcharge" REAL,
#   "total_amount" REAL,
#   "congestion_surcharge" REAL
# )
```

However, we must get schema specific to postgresql dialect. We can do that by telling pandas what database we are working with. To do that, we need to connect to our database first:

```python
from sqlalchemy import create_engine

engine = create_engine("postgresql://root:root@localhost:5433/ny_taxi")
con = engine.connect()

print(pd.io.sql.get_schema(df, name='yellow_taxi_trips', con=con))

# CREATE TABLE yellow_taxi_trips (
#         "VendorID" BIGINT,
#         tpep_pickup_datetime TIMESTAMP WITHOUT TIME ZONE,
#         tpep_dropoff_datetime TIMESTAMP WITHOUT TIME ZONE,
#         passenger_count BIGINT,
#         trip_distance FLOAT(53),
#         "RatecodeID" BIGINT,
#         store_and_fwd_flag TEXT,
#         "PULocationID" BIGINT,
#         "DOLocationID" BIGINT,
#         payment_type BIGINT,
#         fare_amount FLOAT(53),
#         extra FLOAT(53),
#         mta_tax FLOAT(53),
#         tip_amount FLOAT(53),
#         tolls_amount FLOAT(53),
#         improvement_surcharge FLOAT(53),
#         total_amount FLOAT(53),
#         congestion_surcharge FLOAT(53)
# )
```

Now that we have everything set up, we can read our whole dataset in chunks (so that we don't load the whole thing in memory, risking to crash the program), and load the chunks into postgres.

```python
# now let's read the whole dataset in batches
df_iter = pd.read_csv("./yellow_taxi_data.csv.gz", iterator=True, chunksize=100_000)

df_chunk: pd.DataFrame = next(df_iter).iloc[:, 1:]
df_chunk['tpep_pickup_datetime'] = pd.to_datetime(
    df_chunk['tpep_pickup_datetime'])
df_chunk['tpep_dropoff_datetime'] = pd.to_datetime(
    df_chunk['tpep_dropoff_datetime'])

# create empty table first
df_chunk.head(0).to_sql('yellow_taxi_trips', con=con, if_exists='replace')

# now append rows
df_chunk.to_sql('yellow_taxi_trips', con=con, if_exists='append')


for chunk in tqdm(df_iter):
    df_chunk = chunk.iloc[:, 1:]
    df_chunk['tpep_pickup_datetime'] = pd.to_datetime(
        df_chunk['tpep_pickup_datetime'])
    df_chunk['tpep_dropoff_datetime'] = pd.to_datetime(
        df_chunk['tpep_dropoff_datetime'])
    df_chunk.to_sql('yellow_taxi_trips', con=con, if_exists='append')

con.close()
```

Let's recreate the script in a more flexible way; we can use the `argparse` library to parse commandline arguments so that they can be provided at runtime (like username, password, dbname, etc)

```python
import pandas as pd
from sqlalchemy import create_engine
import argparse
import os
import time


def ingest_data(user: str,
                password: str,
                dbname: str,
                tablename: str,
                url: str,
                host: str = "localhost",
                port: str = "5432") -> None:

    csv_name = url.split("/")[-1]
    os.system(f"wget {url} -O {csv_name}")

    engine = create_engine(
        f'postgresql://{user}:{password}@{host}:{port}/{dbname}')

    with engine.connect() as con:
        df_iter = pd.read_csv(csv_name, iterator=True, chunksize=100_000)

        df_chunk: pd.DataFrame = next(df_iter)
        df_chunk['tpep_pickup_datetime'] = pd.to_datetime(
            df_chunk['tpep_pickup_datetime'])
        df_chunk['tpep_dropoff_datetime'] = pd.to_datetime(
            df_chunk['tpep_dropoff_datetime'])

        df_chunk.head(0).to_sql(tablename,
                                con=con, if_exists='replace')

        start = time.time()
        df_chunk.to_sql(tablename, con=con, if_exists='append')
        end = time.time()
        print(f"Inserted chunk in {end-start} seconds")

        for df_chunk in df_iter:
            df_chunk['tpep_pickup_datetime'] = pd.to_datetime(
                df_chunk['tpep_pickup_datetime'])
            df_chunk['tpep_dropoff_datetime'] = pd.to_datetime(
                df_chunk['tpep_dropoff_datetime'])
            start = time.time()
            df_chunk.to_sql(tablename, con=con, if_exists='append')
            end = time.time()
            print(f"Inserted chunk in {end-start} seconds")


def main():
    parser = argparse.ArgumentParser(
        description="Ingest CSV data into Postgres")
    parser.add_argument("--user", required=True)
    parser.add_argument("--password", required=True)
    parser.add_argument("--dbname", required=True)
    parser.add_argument("--tablename", required=True)
    parser.add_argument("--url", required=True)
    parser.add_argument("--host", required=False, default="localhost")
    parser.add_argument("--port", required=False, default="5432")

    args = parser.parse_args()

    user = args.user
    password = args.password
    dbname = args.dbname
    tablename = args.tablename
    url = args.url
    host = args.host
    port = args.port

    ingest_data(user, password, dbname, tablename, url, host, port)


if __name__ == "__main__":
    main()
```

Now we can run this script in our environment with:

```bash
python ingest_data.py --user root --password root --dbname ny_taxi --tablename yellow_taxi_trips --host localhost --port 5433 --url https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_2021-01.csv.gz
```

Similarly to what we did for our `pipeline.py` script, we can dockerize this script so that it is runnable everywhere through docker. Let's create a Dockerfile that we will use to build an image:

```Dockerfile
FROM python:3.9

RUN pip install pandas sqlalchemy psycopg2
RUN apt install wget

WORKDIR /app
COPY ingest_data.py ingest_data.py

ENTRYPOINT ["python", "ingest_data.py"]
```

let's build it:

```bash
docker build -t ingest:v001 .
```

However, if we try to run it with

```bash
 docker run -it ingest:v001 --user root --password root --dbname ny_taxi --tablename yellow_taxi_trips --host localhost --port 5433 --url https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_2021-01.csv.gz

# sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) connection to server at "localhost" (127.0.0.1), port 5433 failed: Connection refused
#        Is the server running on that host and accepting TCP/IP connections?
```

it fails. This is because docker operates on its own networks. This is why we need to map container ports to host ports when creating a container if we want to be able to expose the port to the host machine.

The postgres container is operating in a isolated docker network, and port 5432 has been mapped to the host 5433 port. The ingest_data docker container is operating in its own isolated docker network, and cannot access the host machine ports, nor the postgres container ports. In order to make the two containers communicate, we need to put them in the same network and assign them names, so that the internal docker DNS can resolve the request to the internal IP address of each container.

## Docker Networks

Docker networks are like virtual LANs for your containers.

When you run containers, they need to talk to each other and to the outside world. Docker networks are the plumbing that makes this happen.
Think of it like this: you have multiple apps running in separate containers (a web server, a database, a cache). They're isolated from each other by default. A Docker network is what lets you say "these containers can talk to each other, but that one over there can't."

Docker networks allow containers to communicate with each other and the outside world. Here's what matters:


### Network Drivers

- bridge (default): Creates an isolated network on your host. Containers on the same bridge can talk to each other. Each container gets its own IP. Good for single-host setups.
- host: Container shares the host's network stack directly. No isolation, no port mapping needed. Faster but less secure.
- overlay: Spans multiple Docker hosts. Required for Swarm services or multi-host container communication. Uses VXLAN encapsulation.
- macvlan: Assigns a MAC address to each container, making it appear as a physical device on your network. Useful when you need containers to look like physical hosts.
- none: No networking. Complete isolation.
- ipvlan: Similar to macvlan but shares the parent's MAC address. Better for environments with MAC address limitations.

### Key Concepts

- DNS resolution: Containers can reach each other by name automatically. Docker runs an embedded DNS server (127.0.0.11) in each container.
- Port mapping: -p host_port:container_port exposes container ports to the host. Only needed for bridge networks.
- Network namespaces: Each network is isolated via Linux namespaces. Containers can't see other networks unless explicitly connected.
- Multiple networks: A container can connect to multiple networks simultaneously.

From the [Docker documentation](https://docs.docker.com/engine/network/):

> Container networking refers to the ability for containers to connect to and communicate with each other, and with non-Docker network services.
>
> Containers have networking enabled by default, and they can make outgoing connections. A container has no information about what kind of network it's attached to, or whether its network peers are also Docker containers. A container only sees a network interface with an IP address, a gateway, a routing table, DNS services, and other networking details.
>
> When Docker Engine on Linux starts for the first time, it has a single built-in network called the "default bridge" network. When you run a container without the --network option, it is connected to the default bridge.
>
> Containers attached to the default bridge have access to network services outside the Docker host. They use "masquerading" which means, if the Docker host has Internet access, no additional configuration is needed for the container to have Internet access.
>
> With the default configuration, containers attached to the default bridge network have unrestricted network access to each other using container IP addresses. They cannot refer to each other by name.
>
> It can be useful to separate groups of containers that should have full access to each other, but restricted access to containers in other groups.
>
> You can create custom, user-defined networks, and connect groups of containers to the same network. Once connected to a user-defined network, containers can communicate with each other using container IP addresses or container names.

## Connect postgres container to script container

With this out of the way, we can make the two containers communicate easily by putting them inside their own network. Let's create a new docker network:

```bash
docker network create pg-network
```

Now let's rerun the postgres container specifying the network, and the container name:

```bash
docker run -it -e POSTGRES_USER=root \
               -e POSTGRES_PASSWORD=root \
               -e POSTGRES_DB=ny_taxi \
               -v $(pwd)/ny_taxi_postgres_data:/var/lib/postgresql/data \
               --network pg-network \
               --name pgdatabase \
               -p 5433:5432 \
               postgres:13
```

Now we can run our dockerized ingest script, with a couple of changes: the script is now inside the `pg-network` network; here, the host name of the database is the IP address of the postgres container, which is resolved by the container name `pgdatabase`. Also, the port is going to be the actual port of postgres _inside_ the container, not the one we expose to the host machine:

```bash
docker run -it --network pg-network ingest:v001 --user root --password root --dbname ny_taxi --tablename yellow_taxi_trips --host pgdatabase --port 5432 --url https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_2021-01.csv.gz

# [...]
# yellow_tripdata_2 100%[=============>]  23.87M  54.0MB/s    in 0.4s
# 
# 2025-11-04 11:10:02 (54.0 MB/s) - ‘yellow_tripdata_2021-01.csv.gz’ saved [25031880/25031880]
# 
# Inserted chunk in 10.459648609161377 seconds
# Inserted chunk in 9.797333717346191 seconds
# Inserted chunk in 9.827284336090088 seconds
# Inserted chunk in 9.83919906616211 seconds
# Inserted chunk in 10.140096187591553 seconds
# Inserted chunk in 9.996657848358154 seconds
# Inserted chunk in 10.016377210617065 seconds
# Inserted chunk in 10.257993698120117 seconds
# Inserted chunk in 9.91151237487793 seconds
# Inserted chunk in 9.781015634536743 seconds
# Inserted chunk in 9.51760482788086 seconds
# Inserted chunk in 10.054514646530151 seconds
# /app/ingest_data.py:39: DtypeWarning: Columns (6) have mixed types. Specify dtype option on import or set low_memory=False.
#   for df_chunk in df_iter:
# Inserted chunk in 10.027701377868652 seconds
# Inserted chunk in 6.70109748840332 seconds
```

## PgAdmin4

Let's connect a user interface to our database. [PgAdmin4](https://www.pgadmin.org/) is a webapp that allows us to connect a UI to a database. It has a docker image, so we can simply spin up a docker container to connect to our postgres database. Since the database is running within the `pg-network` network, we will need to run the pgadmin container inside it as well:

```bash
docker run -it \
  -e PGADMIN_DEFAULT_EMAIL="admin@admin.com" \
  -e PGADMIN_DEFAULT_PASSWORD="root" \
  -p 8080:80 \
  --network=pg-network \
  --name pgadmin-2 \
  dpage/pgadmin4
```

Now, we can go to `localhost:8080` and be greeted by the login page. Insert credentials, and then right-click on servers, top-right of screen. Click on register server, and name the server something (Docker Postgres for example). Under Connections, use the container name of postgres for hostname, and insert username and password. Click save, and now you can navigate your ny_taxi database, and query the yellow_taxi_trips table.

## Docker Compose

`docker-compose` is a tool that allows us to specify, create and run multiple services (containers) in a single yml script. Services that have been created in the same docker-compose file will also share a network. Let's create the postgres database and the pgadmin container in a docker-compose script:

```yml
services:
  db:
    container_name: pgdatabase
    image: postgres:13
    environment:
      POSTGRES_USER: 'root'
      POSTGRES_PASSWORD: 'root'
      POSTGRES_DB: 'ny_taxi'
    ports:
      - '5433:5432'
    volumes:
      - vol-pgdata:/var/lib/postgresql/data

  pgadmin:
    container_name: pgadmin
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: "admin@admin.com"
      PGADMIN_DEFAULT_PASSWORD: "root"
    ports:
      - "8080:80"
    volumes:
      - vol-pgadmin_data:/var/lib/pgadmin  

volumes:
  vol-pgdata:
    name: vol-pgdata
  vol-pgadmin_data:
    name: vol-pgadmin_data
```

we can create the services in the background with

```bash
docker compose up -d
```

you can tear down those services with

```bash
docker compose down
```

This file also specifies managed volumes in the `volumes` section; these are similar to binding volumes like we did with the `-v` flag when creating the postgres database, but in this case the host machine volume is managed entirely by Docker; you don't need to worry about where to bind the container volume; docker will create a volume on the host machine and assign it the name you specified, and you'll be able to reference it in the future by that name. You can manage named volume through `docker volume`


## SQL Refresher

Now that we have our postgres database up and running, and a UI with PgAdmin, we can run queries against our `yellow_taxi_trips` table. Let's also ingest the `taxi_zone_lookup` table, and call it `zones`.

Let's look at some SQL queries we can make:

### Joining Yellow Taxi table with Zones Lookup table (implicit INNER JOIN)

```sql
SELECT
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    total_amount,
    CONCAT(zpu."Borough", ' | ', zpu."Zone") AS "pickup_loc",
    CONCAT(zdo."Borough", ' | ', zdo."Zone") AS "dropoff_loc"
FROM 
    yellow_taxi_trips t,
    zones zpu,
    zones zdo
WHERE
    t."PULocationID" = zpu."LocationID"
    AND t."DOLocationID" = zdo."LocationID"
LIMIT 100;
```

### Joining Yellow Taxi table with Zones Lookup table (Explicit INNER JOIN)

```sql
SELECT
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    total_amount,
    CONCAT(zpu."Borough", ' | ', zpu."Zone") AS "pickup_loc",
    CONCAT(zdo."Borough", ' | ', zdo."Zone") AS "dropoff_loc"
FROM 
    yellow_taxi_trips t
JOIN 
-- or INNER JOIN but it's less used, when writing JOIN, postgreSQL understands implicitly that we want to use an INNER JOIN
    zones zpu ON t."PULocationID" = zpu."LocationID"
JOIN
    zones zdo ON t."DOLocationID" = zdo."LocationID"
LIMIT 100;
```

### Checking for records with NULL Location IDs in the Yellow Taxi table

```sql
SELECT
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    total_amount,
    "PULocationID",
    "DOLocationID"
FROM 
    yellow_taxi_trips
WHERE
    "PULocationID" IS NULL
    OR "DOLocationID" IS NULL
LIMIT 100;
```

### Checking for Location IDs in the Zones table NOT IN the Yellow Taxi table

```sql
SELECT
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    total_amount,
    "PULocationID",
    "DOLocationID"
FROM 
    yellow_taxi_trips
WHERE
    "DOLocationID" NOT IN (SELECT "LocationID" from zones)
    OR "PULocationID" NOT IN (SELECT "LocationID" from zones)
LIMIT 100;
```

### Using LEFT, RIGHT, and OUTER JOINS when some Location IDs are not in either Tables

```sql
DELETE FROM zones WHERE "LocationID" = 142;

SELECT
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    total_amount,
    CONCAT(zpu."Borough", ' | ', zpu."Zone") AS "pickup_loc",
    CONCAT(zdo."Borough", ' | ', zdo."Zone") AS "dropoff_loc"
FROM 
    yellow_taxi_trips t
LEFT JOIN 
    zones zpu ON t."PULocationID" = zpu."LocationID"
JOIN
    zones zdo ON t."DOLocationID" = zdo."LocationID"
LIMIT 100;
```

```sql
SELECT
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    total_amount,
    CONCAT(zpu."Borough", ' | ', zpu."Zone") AS "pickup_loc",
    CONCAT(zdo."Borough", ' | ', zdo."Zone") AS "dropoff_loc"
FROM 
    yellow_taxi_trips t
RIGHT JOIN 
    zones zpu ON t."PULocationID" = zpu."LocationID"
JOIN
    zones zdo ON t."DOLocationID" = zdo."LocationID"
LIMIT 100;
```

```sql
SELECT
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    total_amount,
    CONCAT(zpu."Borough", ' | ', zpu."Zone") AS "pickup_loc",
    CONCAT(zdo."Borough", ' | ', zdo."Zone") AS "dropoff_loc"
FROM 
    yellow_taxi_trips t
OUTER JOIN 
    zones zpu ON t."PULocationID" = zpu."LocationID"
JOIN
    zones zdo ON t."DOLocationID" = zdo."LocationID"
LIMIT 100;
```

### Using GROUP BY to calculate number of trips per day

```sql
SELECT
    CAST(tpep_dropoff_datetime AS DATE) AS "day",
    COUNT(1)
FROM 
    yellow_taxi_trips
GROUP BY
    CAST(tpep_dropoff_datetime AS DATE)
LIMIT 100;
```

### Using ORDER BY to order the results of your query

```sql
-- Ordering by day

SELECT
    CAST(tpep_dropoff_datetime AS DATE) AS "day",
    COUNT(1)
FROM 
    yellow_taxi_trips
GROUP BY
    CAST(tpep_dropoff_datetime AS DATE)
ORDER BY
    "day" ASC
LIMIT 100;

-- Ordering by count

SELECT
    CAST(tpep_dropoff_datetime AS DATE) AS "day",
    COUNT(1) AS "count"
FROM 
    yellow_taxi_trips
GROUP BY
    CAST(tpep_dropoff_datetime AS DATE)
ORDER BY
    "count" DESC
LIMIT 100;
```

### Other kinds of aggregations

```sql
SELECT
    CAST(tpep_dropoff_datetime AS DATE) AS "day",
    COUNT(1) AS "count",
    MAX(total_amount) AS "total_amount",
    MAX(passenger_count) AS "passenger_count"
FROM 
    yellow_taxi_trips
GROUP BY
    CAST(tpep_dropoff_datetime AS DATE)
ORDER BY
    "count" DESC
LIMIT 100;
```

### Grouping by multiple fields

```sql
SELECT
    CAST(tpep_dropoff_datetime AS DATE) AS "day",
    "DOLocationID",
    COUNT(1) AS "count",
    MAX(total_amount) AS "total_amount",
    MAX(passenger_count) AS "passenger_count"
FROM 
    yellow_taxi_trips
GROUP BY
    1, 2
ORDER BY
    "day" ASC, 
    "DOLocationID" ASC
LIMIT 100;
```
