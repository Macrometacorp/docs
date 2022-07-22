---
sidebar_position: 20
title: Running Queries
---

After you [build a query](building-queries.md), you might want to run it. You might run a query to perform an action on your data (such as INSERT or DELETE), or you might test a query that you intend to save as a [query worker](query-workers.md).

## Run a Query

You can run a query in the Macrometa console, from the Macrometa CLI, or using an [API endpoint](api-endpoints.md).

### Run a Query in the Console

1. Write a [C8QL](../c8ql/) query.
1. Enter any required [bind parameter](fundamentals.md#bind-parameters) values.
1. Click **Run Query**.

Macrometa runs the query and displays the [Query Result](#query-result) for that query. Each query you run displays another Query Result unless you navigate away from the page or clear the results.

### Run a Query with CLI

1. Install the CLI as described in [Install gdnsl](../CLI/#install-gdnsl).
2. Enter queries using `gdnsl query`. For more information and examples, refer to the CLI [Queries](../cli/queries-cli.md) documentation.

## API Endpoint

For more information, refer to [API Endpoints](api-endpoints.md).

## Execution Plan

After you write a query, click **Execution Plan** to see a detailed breakdown of the query compilation and execution pipeline. Basically, it shows you _how_ Macrometa performs the query. The details given can be helpful when tuning or debugging complex queries.

![Execution Plan](/img/queries/execution-plan.png)

## Query Result

Query results vary based on the query. Queries that return information display that information. Queries that do not, perhaps because they are entering or deleting information, just display empty brackets `[]`. The following screenshot shows a query with information returned.

![Query Result](/img/queries/query-result.png)

### Query Info

Click **Query Info** to display detailed performance information about the query.

### View options

If your query returned results, then you can display them in **Table** or **JSON** format. Default is **Table**.

### Clear results

To clear a specific result, click **Clear** next to the result.

To clear all results, click **Clear All** under the Query Editor.

## Running Queries tab

Click the **Running Queries** tab to see information about any queries currently running, including the bind parameters, runtime, and when the query started.

![Running Queries tab](/img/queries/running-queries-tab.png)

## Slow Query History tab

Click the **Slow Query History** tab to see information about any queries currently running, including the bind parameters, runtime, and when the query started.

![Slow Query History tab](/img/queries/slow-query-history-tab.png)
