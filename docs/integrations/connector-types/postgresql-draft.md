---
title: PostgreSQL - DRAFT
---

A Macrometa connector that extracts data from or sends data to an existing Postgres database.

## Prerequisites

- Macrometa account with admin permissions
- A remotely accessible, running Postgres instance
- The source from where the data is extracted for the target connector to consume, cannot be empty. It must have some data.

## PostgreSQL Source

Read this section carefully before you set up your PostgresSQL source connector.

### Log Based replication requirements

- PostgreSQL database's running **PostgreSQL versions 9.4.x or greater**. To avoid a critical PostgreSQL bug,
  use at least one of the following minor versions:
  - PostgreSQL 12.0
  - PostgreSQL 11.2
  - PostgreSQL 10.7
  - PostgreSQL 9.6.12
  - PostgreSQL 9.5.16
  - PostgreSQL 9.4.21

- **A connection to the master instance**. Log-based replication will only work by connecting to the master instance.

- **wal2json plugin**: To use Log Based for your PostgreSQL integration, you must install the wal2json plugin.
  The wal2json plugin outputs JSON objects for logical decoding, which the source connector then uses to perform Log-based Replication.
  Steps for installing the plugin vary depending on your operating system. Instructions for each operating system type are in the wal2json's GitHub repository:

  - [Unix-based operating systems](https://github.com/eulerto/wal2json#unix-based-operating-systems)
  - [Windows](https://github.com/eulerto/wal2json#windows)

- **postgres config file**: Locate the database configuration file (usually `postgresql.conf`) and define
  the parameters as follows:

    ```
    wal_level=logical
    max_replication_slots=5
    max_wal_senders=5
    ```

  Restart your PostgreSQL service to ensure the changes take effect.

  **Note**: For `max_replication_slots` and `max_wal_senders`, we're defaulting to a value of 5.
  This should be sufficient unless you have a large number of read replicas connected to the master instance.

- **Existing replication slot**: Log based replication requires a dedicated logical replication slot.
  In PostgreSQL, a logical replication slot represents a stream of database changes that can then be replayed to a
  client in the order they were made on the original server. Each slot streams a sequence of changes from a single
  database.

  Login to the master instance as a superuser and using the `wal2json` plugin, create a logical replication slot:

  ```sql
    SELECT *
    FROM pg_create_logical_replication_slot('macrometa_<database_name>', 'wal2json');
  ```

  You can pass this `replication slot` in the configuration parameter for LOG_BASED replication method.

  **Note**: Replication slots are specific to a given database in a cluster. If you want to connect multiple
  databases - whether in one integration or several - you'll need to create a replication slot for each database.

## PostgresSQL Target

No additional notes.
