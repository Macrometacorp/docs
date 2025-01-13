---
sidebar_position: 20
title: Building Queries
---

This page explains how to create a query in Macrometa. To learn more about what you can do with queries and the language for writing them, refer to [SQL in Macrometa](sql/) and [C8 Query Language](c8ql/).

## Query Editor

To write a query, log into Macrometa and navigate to the Editor tab of the Query Workers section. Type the content for queries starting with Line 1 of the Query Editor.

![Query Editor](/img/queries/query-builder.png)

## Bind Parameters

[Bind parameters](bind-parameters) are created with the '@' symbol and display fields for the corresponding key and value. You can use this to pass values to your query or query worker in the Query Builder.

![Bind parameters](/img/queries/bind-parameters.png)

## Syntax Helper

Macrometa has a built-in tool to help you with C8QL syntax. Click **Syntax** and start typing to see a list of available options.

In the following screenshot, the user typed **min**.

![Syntax helper](/img/queries/syntax-helper.png)

This tool is not available with SQL.

## Next Steps

After you write a query, you can do the following:

- [Run the query](running-queries).
- Save the query as a [query worker](../../queryworkers/query-workers).
