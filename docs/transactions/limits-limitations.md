---
sidebar_position: 40
title: Transaction Limits and Limitations
---

Macrometa's transaction system is designed for specific use cases, focusing on short and small operations. This document details the limits and limitations inherent in transactions within Macrometa, ensuring you can effectively plan and execute their operations.

## Transaction Execution Limits

In Macrometa, transaction execution is governed by specific limits designed to optimize performance and resource allocation. These limits include the maximum idle time a transaction can remain active, the total size of operations within a transaction, and the number of concurrent transactions allowed.

### Maximum Idle Timeout

This is the duration for which a transaction can remain active without any operations. Set by default to 60 seconds, transactions exceeding this idle period are automatically aborted to conserve resources and maintain system efficiency.

### Maximum Transaction Size

Transactions are restricted by the size of operations they can contain, with a default limit of 128MB. This limit encompasses all insert, update, and delete operations within a transaction. Exceeding this limit results in the failure of further operations within that transaction.

### Maximum Transactions Count

Macrometa limits the number of concurrent transactions to maintain system performance and stability. The default limit is five active transactions at any given time. Additional transaction attempts are blocked once this threshold is reached.

## Transactional Operation Limitations

Transactional operation limitations within Macrometa are put in place to ensure the integrity and stability of the database system. These limitations cover the range of operations that are not supported within transactions, constraints on transaction implementation, and requirements for declaring collections for modification.

### Unsupported Operations

Certain actions are prohibited within transactions to maintain system integrity and performance. These include:

- Creation and deletion of databases
- Creation and deletion of collections
- Creation and deletion of indexes
- Nesting a transaction within another transaction

### Transaction Implementation Constraints

Transactions are not optimized for long-running or voluminous tasks. They require all transactional information, such as record pointers and rollback data, to fit within the main memory. Additionally, transactions cannot be nested, and all collections that will be modified must be declared at the start of the transaction.

## Atomicity in Multi-Collection Transactions

Macrometa's approach to transaction atomicity is tailored for speed and efficiency but can be affected by server outages. In multi-collection transactions, atomicity across servers cannot be guaranteed if a server outage occurs during the commit phase.

## Handling Large Transactions

Macrometa stores transaction data in RAM. Transactions that become too large are automatically committed and divided into smaller transactions. This approach helps manage memory usage but may affect the ACID properties of the original large transaction.

## Error Codes and Transactional Integrity

Transactions that violate Macrometa's operational rules, such as attempting nested transactions or unauthorized operations within a transaction, trigger specific error codes. These codes help in identifying and rectifying issues promptly.
