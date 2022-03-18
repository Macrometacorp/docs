---
sidebar_position: 1
title: Introduction
---

# Introduction

The C8 query language (C8QL) can be used to create, retrieve and modify data that are stored in C8 Geo distributed fast data platform.

:::note
If this is your first time with C8QL then be sure to check out the [**C8QL Tutorial**](c8ql-tutorial.md) before you head off to the in-depth documentation!
:::

The general workflow when executing a query is as follows:

- A client application ships a C8QL query to the C8  fabric. The query text contains everything C8 needs to compile the result set

- C8 will parse the query, execute it and compile the results. If the query is invalid or cannot be executed, the server will return an error that the client can process and react to. If the query can be executed successfully, the server will return the query results (if any) to the client

C8QL is mainly a declarative language, meaning that a query expresses what result should be achieved but not how it should be achieved. C8QL aims to be human-readable and therefore uses keywords from the English language.

Another design goal of C8QL was client independency, meaning that the language and syntax are the same for all clients, no matter what programming language the clients may use.  Further design goals of C8QL were the support of complex query patterns and the different data models C8 offers.

In its purpose, C8QL is similar to the Structured Query Language (SQL). C8QL supports reading and modifying collection data, but it doesn't support data-definition operations such as creating and dropping databases, collections and indexes.

It is a pure data manipulation language (DML), not a data definition language (DDL) or a data control language (DCL). The syntax of C8QL queries is different to SQL, even if some keywords overlap. Nevertheless, C8QL should be easy to understand for anyone with an SQL background.

We have drivers for [JavaScript](https://github.com/Macrometacorp/jsC8) & [Python](https://github.com/Macrometacorp/pyC8)

For some example queries, please refer to the chapters [Data Queries](data-queries.md), [Data Query Patterns](../c8ql/examples/overview.md) and [Tutorial](../c8ql/data-queries.md).
