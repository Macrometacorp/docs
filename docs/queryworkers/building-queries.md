---
sidebar_position: 10
title: Building Queries
---

This page explains how to enter a query in Macrometa. To learn more about what you can do with queries and the language for writing them, refer to [C8 Query Language](c8ql/../index.md).

## Query Builder

To write a query, log in to Macromenta and then navigate to the QUERIES section. Enter queries in the Query Builder on the Editor tab, starting with line 1.

![Query Builder](/img/queries/query-builder.png)

## Bind Parameters

[Bind parameters](fundamentals.md#bind-parameters), created with the '@' symbol, display fields for the corresponding Key and Value on the right-hand side. You can use this to pass values to your query or query worker in the Query Builder.

![Bind parameters](/img/queries/bind-parameters.png)

## Syntax Helper

Macrometa has a built-in tool to help you with C8QL syntax. Click **Syntax**, then start typing to see a list of available options.

In the screenshot below, the user typed **in**.

![Syntax helper](/img/queries/syntax-helper.png)

## Execution Plan

Shows a detailed breakdown of the query compilation and execution pipeline.

Details given can also be helpful when tuning or debugging complex queries.

## Save Query

Save Query:

To complete the creation of the query worker click "Save Query". Query Workers are saved with a custom name, let’s save our query as “queryWorker”. When you save your Query Worker a new option, “Update Query”, will appear. Use this to save changes to existing Query Workers.
