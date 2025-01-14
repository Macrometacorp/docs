---
sidebar_position: 1
title: SQL in Macrometa
---

Structured Query Language (SQL) is a standardized programming language that is used to manage relational databases and perform various operations on the data in them. You can use SQL to create, retrieve, and modify data that are stored in the Macrometa geo-distributed fast data platform.

Although SQL is an ANSI/ISO standard, there are different versions of the SQL language. Macrometa SQL dialect supports DQL (SELECT statement), DML statements (UPDATE, INSERT and DELETE) and a subset of DDL statements.

:::note
This is a beta feature. While you can use SQL in API, CLI, and SDK queries, it is not yet supported in the Query Editor in the Macrometa console.
:::

## SQL Workflow

The general workflow when executing a query is as follows:

- A client application sends a SQL query to the Macrometa platform. The query text contains everything Macrometa needs to compile the result set.
- Macrometa parses the query, executes it, and compiles the results. If the query is invalid or cannot be executed, then the server returns an error that the client can process and react to. If the query can be executed successfully, then the server returns the query results (if any) to the client.

## Resources

- [API Reference](https://www.macrometa.com/docs/api#/operations/createSqlQueryCursor)
- [JavaScript SDK](https://github.com/Macrometacorp/jsC8)
- [Python SDK](https://github.com/Macrometacorp/pyC8)

If this is your first time with SQL, then you might want to check out the [SQL Getting Started](getting-started-sql.md) before you head off to the in-depth documentation.
