---
sidebar_position: 30
title: Query Workers
---

After you build a query, you can save it as a _query worker_, similar to a SQL stored procedures. Query workers are cached across all GeoFabric locations. You can edit query workers while they are running, but an unsaved query must be redeployed if you need to update it.

You can create and update query workers from the GUI, command line, or REST API. Each query worker is tied to a specific query text and parameter set. You can set optional or mandatory default values for query parameters.

Each query worker functions as an endpoint. Query workers exist on the GeoFabric level along with other data like collections and documents.

## Create a New Query Worker

When you save a query, it becomes a query worker.

1. Write a [C8QL](../c8ql/) query.
2. Click **Save Query**.
3. Enter a **Name** and then click **Save**.

## View Query Workers

To view query workers, click **Query Workers**.

Macrometa displays a list of default queries and user-defined queries. You cannot delete or overwrite default queries. In the following screenshot, the user selected a default query:

![Query Workers](/img/queries/saved-queries.png)

### Copy a Query Worker

Click the stacked pages to copy any query worker and edit it in the Query Editor.

### Explain a Query Worker

Click the chat bubbles to display the [Execution Plan](running-queries.md#execution-plan) of the query worker without running the query.

### Run a Query Worker

Click the play icon to run the query.

### Delete a Query Worker

Click the red minus sign to permanently delete the query worker.

## Edit a Query Worker

To edit a query worker:

1. In **Queries**, click **Query Workers**.
2. Double-click the query worker that you want to change. Macrometa opens it in the Editor tab.
3. Make any changes to the query and then click **Update Query**.

## Import Query Workers

To import custom queries from a saved file:

1. In Macrometa, navigate to **Queries**.
2. Click **Query Workers**.
3. Click **Import Queries**.
4. Select a file and then click **Import**.

:::note
The file must be a JSON file matching the format on the screen, otherwise Macrometa cannot understand the query.
:::

## Export Query Workers

To export custom queries and download them as a JSON file:

1. In Macrometa, navigate to **Queries**.
2. Click **Query Workers**.
3. Click **Export Queries**.
