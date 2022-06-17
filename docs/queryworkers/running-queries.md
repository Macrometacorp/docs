---
sidebar_position: 20
title: Running Queries
---

After you [build a query](building-queries.md), you might want to run it. You might run a query to perform an action on your data (such as INSERT or DELETE), or you might test a query that you intend to save as a [Query Worker](query-workers.md).

## Run a Query


run query
    - run query with bind parameters

Query results
- query profile
- JSON vs Table view, clear, download csv

## Execution Plan

After you write a query, click **Execution Plan** to see a detailed breakdown of the query compilation and execution pipeline. The details given can be helpful when tuning or debugging complex queries.

![Execution Plan](/img/queries/execution-plan.png)

## API Endpoint

For more information, refer to [API Endpoints](api-endpoints.md).

## Running Queries tab

Click the **Running Queries** tab to see information about any queries currently running, including the bind parameters, runtime, and when the query started.

![Running Queries tab](/img/queries/running-queries-tab.png)

## Slow Query History tab

Click the **Slow Query History** tab to see information about any queries currently running, including the bind parameters, runtime, and when the query started.

![Slow Query History tab](/img/queries/slow-query-history-tab.png)