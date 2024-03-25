---
sidebar_position: 30
title: Manage Query Workers
---

After you build a query, you can save it as a _query worker_, similar to a SQL stored procedures. Query workers are cached across all fabric locations. You can edit query workers while they are running, but an unsaved query must be redeployed if you need to update it.

You can create and update query workers from the Macrometa web console, command line, or REST API. Each query worker is tied to a specific query text and parameter set. You can set optional or mandatory default values for query parameters.

Each query worker functions as an endpoint. Query workers exist on the fabric level along with other data like collections and documents.

Query workers can be used as sources and sinks for [stream workers](../cep/). For more information, refer to [Query Worker Source](../cep/source/query-worker-source) and [Query Worker Sink](../cep/sink/query-worker-sink).

## Create a New Query Worker

When you save a query, it becomes a query worker.

1. Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Compute > Query Workers**.
3. In the Editor, select **C8QL** or **SQL**, depending on which language you want to write the query worker in.
4. Write a [SQL](../queries/sql/index.md) or [C8QL](../queries/c8ql/index.md) query.
5. Click **Save Query**.
6. Enter a **Name** and then click **Save**.

## View Query Workers

To view query workers, click **Compute > Query Workers**.

Macrometa displays a list of default queries and user-defined queries. You cannot delete or overwrite default queries. In the following screenshot, the user selected a default query:

![Query Workers](/img/queries/saved-queries.png)

### Copy a Query Worker

Click the stacked pages to copy any query worker and edit it in the Query Editor.

### Explain a Query Worker

Click the chat bubbles to display the [Execution Plan](../queries/running-queries.md#execution-plan) of the query worker without running the query.

### Run a Query Worker

Click the play icon to run the query.

### Delete a Query Worker

Click the red minus sign to permanently delete the query worker.

## Edit a Query Worker

To edit a query worker:

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Compute > Query Workers**.
1. Click **Query Workers**.
1. Double-click the query worker that you want to change. Macrometa opens it in the Editor tab.
1. Make any changes to the query and then click **Update Query**.

## Import Query Workers

To import custom queries from a saved file:

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Compute > Query Workers**.
3. Click **Query Workers**.
4. Click **Import Queries**.
5. Select a file and then click **Import**.

:::note
The file must be a JSON file matching the format on the screen, otherwise Macrometa cannot understand the query.
:::

## Export Query Workers

To export custom queries and download them as a JSON file:

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Compute > Query Workers**.
3. Click **Query Workers**.
4. Click **Export Queries**.
