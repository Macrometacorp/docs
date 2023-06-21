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

### Log-Based Replication Requirements

This section explains what you need in order to use log-based replication with your PostgreSQL source.

#### Minimum Version

To avoid a critical PostgreSQL bug, your PostgreSQL database must have PostgreSQL versions 9.4.x or greater.

#### Master Instance Connection

Log-based replication only works when the integration connects to the master instance.

#### wal2json Plugin

You must install the wal2json plugin. The wal2json plugin outputs JSON objects for logical decoding, which the source connector then uses to perform log-based replication.

Steps for installing the plugin vary depending on your operating system. Instructions for each operating system type are in the wal2json's GitHub repository:

- [Unix-based operating systems](https://github.com/eulerto/wal2json#unix-based-operating-systems)
- [Windows](https://github.com/eulerto/wal2json#windows)

#### Update Postgres Config File

Locate the database configuration file (usually `postgresql.conf`) and define the parameters as follows:

```bash
wal_level=logical
max_replication_slots=5
max_wal_senders=5
```

For `max_replication_slots` and `max_wal_senders`, we recommend a value of 5. This should be sufficient unless you have a large number of read replicas connected to the master instance.

Restart your PostgreSQL service to ensure the changes take effect.

#### Existing Replication Slot

Log-based replication requires a dedicated logical replication slot. In PostgreSQL, a logical replication slot represents a stream of database changes that can then be replayed to a client in the order they were made on the original server. Each slot streams a sequence of changes from a single database.

Log in to the master instance as a superuser and using the `wal2json` plugin, create a logical replication slot:

```sql
  SELECT *
  FROM pg_create_logical_replication_slot('macrometa_<database_name>', 'wal2json');
```

You can pass this `replication slot` in the configuration parameter for LOG_BASED replication method.

:::note
Replication slots are specific to a given database in a cluster. If you want to connect multiple
databases, whether in one integration or several, then you must create a replication slot for each database.
:::

## PostgresSQL Target

No additional notes.
