---
sidebar_position: 50
title: Ensuring Data Integrity
---

Transactions in Macrometa GDN are executed initially in main memory. The outcome of these transactions can be either a rollback or a commit. In case of a rollback, data is not written to disk; instead, the operations from the transaction are reversed in memory.

Macrometa allows you to choose between full durability and delayed synchronization in single collection transactions, balancing throughput and performance against the risk of data loss.

## Committing Transactions

When a transaction is committed, all modifications made within it are written to the collection data files. If the modified collections have the `waitForSync` property set to _true_ or if any operation in the transaction was executed with the `waitForSync` attribute, then these writes are synchronized to disk.

## Server Crashes

In a server crash scenario, transactions that are uncommitted or in the process of being committed are rolled back upon server restart.
