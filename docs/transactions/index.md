---
sidebar_position: 1
title: Transactions
---

Macrometa provides support for user-definable transactions within a region. _Transactions_ allow you to perform multi-document transactions with individual begin, commit, abort commands. They work similar to the BEGIN, COMMIT, and ROLLBACK operations in relational database systems.

## How They Work

Simply put, transactions are a way to aggregate, or group, multiple API calls. The process is as follows:

### 1. Create a Transaction

When you create the transaction, you specify which collections the transaction will write to.

Once you create a transaction, you will be given a transaction identifier.

### 2. Make API Calls

Make API calls that include the transaction identifier to include them in the transaction. All actions will run, but they are not permanent until you commit the transaction.

### 3. Commit or Abort Transaction

- To make all changes made within the transaction permanent, commit the transaction.
- To roll back the actions, perhaps because one of them failed, abort the transaction.

## Supported Operations

Supported operations include:

- Read and write documents to collections.
- Get the number of documents in a collection.
- Get the number of key-value pairs in a collection.
- Truncate collections.
- Run queries.

## ACID Properties

Transactions in Macrometa within a region are atomic, consistent, isolated, and durable (ACID).

These ACID properties provide the following guarantees:

- The _atomicity_ property makes transactions either complete in their entirety or have no effect at all.
- The _consistency_ property ensures that no constraints or other invariants will be violated during or after any transaction.
- The _isolation_ property hides the modifications of a transaction from other transactions until the transaction commits.
- The _durability_ property ensures that operations from transactions that have committed will be made persistent.

:::note
ACID is not guaranteed across shards in a multi-node setup.
:::
