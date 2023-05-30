---
title: PostgresSQL - DRAFT
---

A Macrometa connector that extracts data from or sends data to an existing Postgres database.

## Prerequisites

- Macrometa account with admin permissions
- A remotely accessible, running Postgres instance
- The source from where the data is extracted for the target connector to consume, cannot be empty. It must have some data.

## PostgresSQL Source

UI

Required
- Integration Name
- Host
- Username
- Password
- Auth Database

Advanced
- Port
- Replication Method
- Enable SRV
- Replica Set
- Use SSL
- Verify Mode
- Direct Connection
- SSL/TLS CA Certificate
- SSL/TLS Client Certificate
- SSL/TLS Client Key Password


| Config keys   | Type    | Required?  | Description       |  Default             |  Example         |
|---------------|---------|------------|-------------------|----------------------|------------------|
| Connection Name      | String  | Yes        | Name of the connection   | None  | FromPG          |
| Host          | String  | Yes        | PostgreSQL host   | None  | postgres_host   |
| Port          | Integer | Yes        | PostgreSQL port   | None  | 5432            |
| Username      | String  | Yes        | PostgreSQL user   | None  | postgres        |
| Password      | String  | Yes        | PostgreSQL password      | None  | password        |
| Database Name | String  | Yes        | PostgreSQL database name | None  | postgres        |
| Source Schema | String  | Yes        | Source Schema to scan    | None  | my_schema       |
| Source Table  | String  | Yes        | Source Table to scan  | None  | my_table        |
| Replication Method          | String  | Yes        | Choose from LOG_BASED, FULL_TABLE | None  | FULL_TABLE      |
| Use SSL       | String  | No         | If set to `true` then use SSL via postgres sslmode `require` option. If the server does not accept SSL connections or the client certificate is not recognized the connection will fail | false  | false      |
| SSL CA Certificate   | String  | No         | Specific CA certificate in PEM string format. This is most often the case when using `self-signed` server certificate | None  | my_ca_certificate      |
| SSL Client Certificate              | String  | No         | Specific client certificate in PEM string format. The private key for client certificate should be specfied in a different parameter, SSL Client Key | None  | my_client_certificate      |
| SSL Client Key| String  | No         | Specific client key in PEM string format | None  | my_client_key      |
| SSL Client Password  | String  | No         | If the private key contained in the SSL Client Key is encrypted, users can provide a password or passphrase to decrypt the encrypted private keys | None  | my_client_key_password      |
| Replication Slot (LOG_BASED)         | String  | No         |  PostgreSQL replication slot name for LOG_BASED replication method. This replication slot will be used to retrieve the required WAL files. If no value is provided replication slot is set as `macrometa_dbname` (dbname will be replaced by your database name). |
| Break at No Data Received (Seconds) | Integer | No         | Stop running when no data received from WAL after certain number of seconds | 10800  | 10800           |
| Break at End LSN     | Boolean | No         | Stop running if the newly received LSN is after the max LSN that was initially detected | false  | false    |
| WAL Sender Timeout (milliseconds)         | Integer | No         | Terminate replication connections that are inactive for longer than this amount of time. This is useful for the sending server to detect a standby crash or network outage. Unit is milliseconds. The default value is 3600000 ms.    | 3600000 | 10000000           |
| Debug LSN     | Boolean  | No         | If set to `true` then add _sdc_lsn property to the singer messages to debug postgres LSN position in the WAL stream   | false | false        |
| Iterator Size | Integer | No         | PG cursor size for FULL_TABLE    | 20000 | 20000           |
| Use Secondary | Boolean | No         | Use a database replica for FULL_TABLE replication | false            | false           |
| Secondary Host | String  | No         | Required when using a secondary replica | None  | secondary_postgres_host|
| Secondary Port | Integer | No         | Required when using a secondary replica | None  | 5432            |

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

UI:

Required
- Integration Name
- Host
- Port
- Username
- Password
- Database Name
- Target Schema
- Target Table

Advanced
- Hard Delete
- Use SSL
- SSL CA Certificate
- SSL Client Certificate
- SSL Client Key
- SSL Client Password
- Connection Timeout (Seconds)
- Batch Size
- Batch Flush Interval (Seconds)
- Batch Flush Minimum Time Gap (Seconds)
- Target Schema Privileges
- Add Metadata Columns
- Data Flattening Maximum Level
- Primary Key Required
- Validate Records

| Config keys   | Type    | Required?  | Description        |  Default             | Example       |
|---------------|---------|------------|--------------------|----------------------|---------------|
| Connection Name         | String  | Yes        | Name of the connection            | None  | ToPG          |
| Host     | String  | Yes        | PostgreSQL host    | None  | postgres_host |
| Port     | Integer | Yes        | PostgreSQL port    | None  | 5432          |
| Username | String  | Yes        | PostgreSQL user    | None  | postgres      |
| Password | String  | Yes        | PostgreSQL password| None  | password      |
| Database Name           | String  | Yes        | PostgreSQL database name          | None  | postgres      |
| Target Schema           | String  | Yes        | Destination Schema name           | None  | public        |
| Target Table            | String  | Yes        | Destination Table name            | None  | my_table      |
| Use SSL              | String  | No         | If set to `true` then use SSL via postgres sslmode `require` option. If the server does not accept SSL connections or the client certificate is not recognized the connection will fail | false  | false             |
| SSL CA Certificate   | String  | No         | Specific CA certificate in PEM string format. This is most often the case when using `self-signed` server certificate | None  | my_ca_certificate             |
| SSL Client Certificate              | String  | No         | Specific client certificate in PEM string format. The private key for client certificate should be specfied in a different parameter, SSL Client Key | None  | my_client_certificate             |
| SSL Client Key       | String  | No         | Specific client key in PEM string format | None  | my_client_key             |
| SSL Client Password  | String  | No         | If the private key contained in the SSL Client Key is encrypted, users can provide a password or passphrase to decrypt the encrypted private keys | None  | my_client_key_password    |
| Hard Delete             | Boolean | No         | When `hard_delete` option is true then DELETE SQL commands will be performed in Postgres to delete rows in tables. It is achieved by continuously checking the `_SDC_DELETED_AT` metadata column. Due to deleting rows requires metadata columns, `hard_delete` option automatically enables the `add_metadata_columns` option as well. Only LOG_BASED replication method detects deletion of rows        | false    | false         |
| Connection Timeout      | Integer | No         | Maximum time to wait while connecting, in seconds (write as a decimal integer, e.g., 10). Zero or negative means wait indefinitely.| 30| 20        |
| Batch Size              | Integer | No         | Maximum number of rows inserted per batch        | 10000| 10000        |
| Batch Flush Interval (Seconds)         | Integer | No         | Time between batch flush executions              | 60    | 100           |
| Batch Flush Minimum Time Gap (Seconds) | Integer | No         | Minimum time gap between two batch flush tasks   | 60    | 100           |
| Flush All Streams       | Boolean | No         | Flush and load every stream into Postgres when one batch is full. This may trigger the COPY command to use files with low number of records.              | false| false         |
| Parallelism             | Integer | No         | Number of threads used to flush tables. "0" will create a thread for each stream, up to parallelism_max. "-1" will create a thread for each CPU core. Any other positive number will create that number of threads, up to parallelism_max           | 0    | 2             |
| Maximum Paralellism     | Integer | No         | Maximum number of parallel threads used to flush tables         | 16    | 10            |
| Target Schema Privileges              | String  | No         | Grant privileges to newly created schemas. Choose from USAGE, SELECT           | None  | SELECT        |
| Add Metadata Columns    | Boolean | No         | Metadata columns add extra row level information about data ingestions, (i.e. when was the row read in source, when was inserted or deleted in postgres etc.) Metadata columns are creating automatically by adding extra columns to the tables with a column prefix `_SDC_`. Enabling metadata columns will flag the deleted rows by setting the `_SDC_DELETED_AT` metadata column. Without the `add_metadata_columns` option the deleted rows will not be recognisable in Postgres | false    | false         |
| Data Flattening Maximum Level          | Integer | No         | Object type RECORD items can be transformed to flattened columns by creating columns automatically. When value is 0 (default) then flattening functionality is turned off| 0  | 0             |
| Primary Key Required    | Boolean | No         | Log based and Incremental replications on tables with no Primary Key cause duplicates when merging UPDATE events. When set to true, stop loading data if no Primary Key is defined      | true  | true          |
| Validate Records        | Boolean | No         | Validate every single record message to the corresponding JSON schema. This option is disabled by default and invalid RECORD messages will fail only at load time by Postgres. Enabling this option will detect invalid records earlier but could cause performance degradation   | false  | false         |
