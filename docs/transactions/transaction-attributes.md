---
sidebar_position: 30
title: Transaction Attributes
---

This guide provides an in-depth understanding of the transaction attributes in Macrometa's Global Data Network (GDN). Each attribute plays a critical role in ensuring efficient, secure, and reliable transactions.

## `allowImplicit` Attribute

The `allowImplicit` attribute determines if a transaction can read from collections not declared at the start. By default, `allowImplicit` is set to `true`, allowing this flexibility. However, setting it to `false` restricts the transaction to only the declared collections, enhancing isolation but requiring upfront knowledge of all needed collections.

## `collections` Attribute

The `collections` attribute is central to transaction management. It ensures data integrity and governs access levels to collections within a transaction by specifiying which collections the transaction interacts with and in what manner. The options are:

- `read`: Lists collections accessed only for reading, which is recommended to prevent deadlocks. This is optional if `allowImplicit` is set to `true`. Deadlocks might occur if a collection that is read from within the transaction is not declared in the read sub-attribute.
- `write`: Includes collections where data might be read or modified.
- `exclusive`: Specifies collections for exclusive write access, preventing concurrent write operations. It essentially "locks" the collection.

## `lockTimeout` Attribute

`lockTimeout` sets a time limit in seconds for how long a transaction waits to acquire a lock on a collection. It's particularly relevant for transactions requiring exclusive access. Setting `lockTimeout` to 0 causes the transaction to wait indefinitely. Default lock timeout is 900 seconds.

## `maxTransactionSize` Attribute

This attribute defines the maximum size of a transaction in bytes, capping it to ensure system stability. The limit is set to a maximum of 128 MB. Adjusting `maxTransactionSize` is crucial for maintaining performance and avoiding oversized transactions that could strain the system.

## `waitForSync` Attribute

`waitForSync` influences how transaction data is written to disk. When true, it ensures data is immediately synchronized to disk, offering higher data safety at the cost of performance. Conversely, false allows for delayed disk synchronization, improving performance but with a slight risk of data loss in the event of a crash.

## Understanding Transaction Deadlocks and Detection

Deadlocks occur when transactions block each other, unable to proceed. They are a risk in complex transactions involving multiple collections. Macrometa detects and resolves deadlocks by aborting one of the transactions, ensuring the system remains responsive.
