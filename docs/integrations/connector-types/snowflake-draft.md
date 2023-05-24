---
title: Snowflake - DRAFT
---

Macrometa collection connectors allow you to extract data from or send data to an existing Snowflake collection.

## Prerequisites

- Macrometa account with admin permissions.
- Remotely accessible, running Snowflake instance running Snowflake Enterprise Edition or higher.
- A connection to the Snowflake instance with necessary privileges.
- Source collections must not be empty.

## Snowflake Source

UI:
- Integration name
- Account vs Account Name
- Table vs Table Name
- Password in different place in list
- Unique Primary Key vs Primary Key

Repo:

| Config keys    | Type    | Required? | Description       | Default    | Example     |
| -------------- | ------- | --------- | ----------------- | ---------- | ----------- |
| Connection Name        | String  | Yes       | Name of the connection          | None       | FromSF      |
| Account Name           | String  | Yes       | Snowflake account.| None       | my_account  |
| Database Name          | String  | Yes       | Snowflake database name.        | None       | SNOWFLAKE   |
| Username | String  | Yes       | Snowflake username.             | None       | my_user     |
| Password | String  | No        | Snowflake password.             | None       | my_password |
| Warehouse| String  | Yes       | Snowflake virtual warehouse name.             | None       | my_warehouse|
| Table Name             | String  | Yes       | Name of the table that you want to sync. The table name should be fully qualified including the db and schema name. | None       | my_db.my_schema.my_table  |
| Replication Method     | String  | Yes       | Choose from INCREMENTAL, FULL_TABLE, CDC      | FULL_TABLE | FULL_TABLE  |
| Primary Key            | String  | No        | Unique Primary Key (to be used as _key for the collection) | None       | my_primary_key            |
| Role     | String  | No        | Snowflake role to use.          | None       | my_role     |
| Private Key       | String  | No        | Private Key (used for Key Pair authentication, only PEM format supported) | None       | my_private_key            |
| Private Key Passphrase | String  | No        | Private Key Passphrase (used for Key Pair authentication)   | None       | my_private_key_passphrase |
| Insecure Mode          | Boolean | No        | Insecure Mode (to avoid "Failed to get OCSP response" warnings)           | False      | False       |

## Snowflake Target

UI:
- Integration Name
- Password in Advanced Section

Repo:

| Config keys       | Type    | Required? | Description    | Default | Example     |
| ----------------- | ------- | --------- | -------------- | ------- | ----------- |
| Account           | String  | Yes       | Snowflake account     | None    | my_account  |
| Username          | String  | Yes       | Snowflake user name   | None    | my_username |
| Password          | String  | No        | Snowflake password    | None    | my_password |
| Database          | String  | Yes       | Snowflake target database           | None    | my_database |
| Target Schema     | String  | Yes       | Snowflake target schema             | None    | my_schema   |
| Target Table      | String  | Yes       | Snowflake target table| None    | my_table    |
| Warehouse         | String  | Yes       | Snowflake target warehouse          | None    | my_warehouse|
| File Format       | String  | Yes       | Snowflake file format for loading. Currently supported CSV and PARQUET        | None    | my_file_format            |
| Role | String  | No        | Snowflake role (optional)           | None    | my_role     |
| Primary Key Required  | Boolean | No        | Indicates whether primary key is required (optional)            | false | false  |
| Batch Size Rows   | Integer | No     | Number of rows per batch            | 100000  | 100000      |
| Batch Wait Limit (seconds)  | Integer | No    | Maximum time to wait for a batch in seconds       | 60  | 60  |
| Target Schema Select Permission | String  | No        | SELECT permission for target schema | None    | SELECT   |
| Hard Delete       | Boolean | No     | Indicates whether to perform a hard delete on records   | false | false  |
| Private Key       | String  | No        | A private key used for authenticating using Key Pair authentication instead of user/pass. At the moment, only PEM format is supported | None    | my_private_key            |
| Private Key Passphrase          | String  | No        | The private key passphrase used for authenticating using Key Pair authentication instead of user/pass     | None    | my_private_key_passphrase |
| Flush All Streams | Boolean | No      | Indicates whether to flush all streams (optional) | false   | false  |
| Parallelism       | Integer | No      | Number of parallel threads (optional)       | 1       | 1     |
| Parallelism Max   | Integer | No      | Maximum number of parallel threads (optional)     | 10      | 10   |
