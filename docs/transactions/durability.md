---
sidebar_position: 50
title: Ensuring Data Integrity
---

Transactions in Macrometa GDN are executed initially in main memory. The outcome of these transactions can be either a rollback or a commit. In case of a rollback, data is not written to disk; instead, the operations from the transaction are reversed in memory.

Macrometa allows users to choose between full durability and delayed synchronization in single collection transactions, balancing throughput and performance against the risk of data loss.

In a server crash scenario, multi-collection transactions that are uncommitted or in the process of being committed are rolled back upon server restart.

## Committing Transactions

When a transaction is committed, all modifications made within it are written to the collection data files. If the modified collections have the `waitForSync` property set to _true_ or if any operation in the transaction was executed with the `waitForSync` attribute, then these writes are synchronized to disk.

## Durability in Multi-Collection Transactions

Transactions involving multiple collections automatically synchronize to disk to ensure both durability and consistency in case of a server crash.

## Single Collection Transactions

Single collection transactions with `waitForSync` set to _false_ are not immediately synchronized to disk, posing a risk of data loss between the transaction's commit and the subsequent delayed disk synchronization.

In cases where `waitForSync` is false, a server crash may lead to complete visibility or invisibility of the transaction's operations, depending on the timing of the synchronization.

## Performance Considerations

The performance of multi-collection transactions is significantly influenced by the disk sync speed, as these transactions require at least one disk sync operation per modified collection.
