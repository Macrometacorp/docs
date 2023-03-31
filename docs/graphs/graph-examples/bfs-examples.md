---
sidebar_position: 100
title: bfs Examples
---

This page provides examples of traversing graphs using the `bfs` option. For more information about this option, refer to [Traversal Query Syntax](../graph-queries/traversal-queries/traversal-syntax.md).

## Use Case: Fraud Detection in Bank Accounts Network

For the financial services industry, a useful application of the `bfs` traversal option in Macrometa graphs would be to identify potential fraud within a network of bank accounts.

### Bank Accounts Graph Structure

The bank has the following graph structure:

- Vertex collections: `accounts`
- Edge collections: `transactions` (edges represent transactions between two accounts)

Each vertex in the `accounts` collection represents a bank account, and each edge in the `transactions` collection represents a transaction between two accounts.

### C8QL Query

We can use the `bfs` traversal option to traverse the graph and identify patterns of suspicious activity that may indicate fraudulent behavior. 

For example, suppose we have identified a single account as potentially fraudulent. We can use the `bfs` traversal option to identify all accounts that are directly or indirectly connected to the fraudulent account through a sequence of transactions. Then, we can analyze the transaction patterns of these connected accounts to see if there are any commonalities or anomalies that suggest fraudulent behavior.
