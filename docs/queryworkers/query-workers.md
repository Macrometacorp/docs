---
sidebar_position: 30
title: Query Workers
---

After you build a query, you can save it to create a _Query Worker_. A query worker is cached across all locations in the fabric and can be edited without updating production code.

You can create and update query workers with the GDN console or by using the REST API. Each Query Worker is tied to a specific query text and parameter set. You can set optional or mandatory default values for query parameters.

Each Query Worker is protected and exposed as its own endpoint. Query Workers are organized by fabric (or database) so you can have query workers for different geo-regions or fabrics within same region.

## Create a New Query Worker

When you save a query, it becomes a Query Worker.

1. Write a [C8QL](../c8ql/) query.
2. Click **Save Query**.
3. Enter a **Name** and then click **Save**.

## Saved Queries

So view saved queries, click **Saved Queries**.

Macrometa displays a list of system-defined queries and user-defined queries. You cannot delete or overwrite system-defined queries, so they display fewer options than user-defined queries. In the screenshot below, the user selected a system query.

![Saved queries](/img/queries/saved-queries.png)

### Copy a Query Worker

Click the stacked pages to copy any Query Worker and then edit it in the Query Builder. This is useful if you need to make a similar Query Worker.

### Explain a Query Worker

Click the chat bubbles to display the [Execution Plan](running-queries.md#execution-plan) of the Query Worker without running the query.

### Run a Query Worker

Click the play icon to run the query.

### Delete a Query Worker

Click the red minus sign to permanently delete the Query Worker.

## Edit a Query Worker

To edit a Query Worker, do the following.

1. In **Queries**, click **Saved Queries**.
2. Double-click the Query Worker that you want to change. Macrometa opens that Query Worker in the Editor tab.
3. Make any changes to the query and then click **Update Query**.

## Import Query Workers

You can import custom queries from a saved file.

1. In Macrometa, navigate to **Queries**.
2. Click **Saved Queries**.
3. Click **Import Queries**.
4. Select a file and then click **Import**.

:::note
The file must be a JSON file matching the format on the screen, otherwise Macrometa cannot understand the query.
:::

## Export Query Workers

You can export custom queries and download them as a JSON file.

1. In Macrometa, navigate to **Queries**.
2. Click **Saved Queries**.
3. Click **Export Queries**.