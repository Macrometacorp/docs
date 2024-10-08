---
title: Query Worker Source
sidebar_position: 50
---

You can use a new or existing [query worker](../../queryworkers/query-workers) as a stream worker source.

For more information about writing queries and creating query workers, refer to [Query Workers](../../queryworkers/).

## Syntax

You can define a query worker source several different ways.

### CREATE QUERY-WORKER

The syntax for a new query worker definition is as follows:

```sql
CREATE QUERY-WORKER worker-name [WITH (properties...)] (parameters_for_query_worker...)
```

### CREATE QUERY-WORKER AS SELECT

The `CREATE QUERY-WORKER AS SELECT` statement creates a new query worker by selecting data from an existing stream and applying filters or transformations. The new query worker can be used for further processing and analysis.

```sql
CREATE QUERY-WORKER worker-name [WITH (properties...)] (parameters_for_query_worker...)
  AS SELECT  select_expr [, ...]
FROM from_stream … ;
```

### CREATE SOURCE

You can also use general source syntax:

```sql
CREATE SOURCE <source_name> WITH (type = 'query-worker', sink.id='<value>', map.type='json') (<attribute1>='<attribute mapping>', <attribute2>='<attribute mapping>')
```

## Parameters

The following table shows the parameters for creating a query worker:

| Parameter                   | Description                                              | Type   |
| --------------------------- | -------------------------------------------------------- | ------ |
| worker-name                 | Name of the query worker.                                | string |
| parameters_for_query_worker | One or more parameter attributes for the query worker. This must be provided with the type (i.e `id int`). | string |
| properties                  | Optional properties for the query worker.                | string |
| sink.id                     | Identifier to correlate the `query-worker` source with its corresponding `query-worker` sink that published the messages.       |  string      |

## Properties

The following table shows the properties that can be used when creating a query worker. If you are using a variant of `CREATE QUERY WORKER`, then you must include either `query` or `query.worker.name`.

| Property          | Description           | Sample     |
| ----------------- | --------------------- | --------- |
| query             | A C8QL query. If you provide a new query, then the stream worker creates a new query worker using the query. | query='FOR i IN 1..3 RETURN { value: i, time: @startTime } ' |
| query.worker.name | The name of an existing query worker.   | query.worker name=’queryWorkerReturn’   |

## Example 1

```sql
CREATE QUERY-WORKER queryWorkerReturn WITH (query='FOR i IN 1..3 return { value: i, time: @startTime } ') (startTime string);
```

This example creates a query worker called `queryWorkerReturn` that returns `startTime` as a string.

## Example 2

```sql
CREATE SOURCE queryWorkerResponse WITH (type='query-worker', `sink.id`="queryWorkerReturn", map.type="json") (value long, time string);
```

This example creates a source based on an existing query worker called `queryWorkerResponse`. It maps the content to JSON format and sends it to the `queryWorkerReturn` sink.

## Example 3

```sql
-- Creates the `queryWorker` query-worker sink with the given query.
CREATE QUERY-WORKER queryWorker WITH (query='FOR i IN 1..3 return { value: i, time: @startTime } ') (startTime string);

-- Sources to listen to query-worker responses.
CREATE SOURCE queryWorkerResponse WITH (type='query-worker', `sink.id`="queryWorker", map.type="json") (value long, time string);
CREATE SOURCE queryWorkerAsSelectResponse WITH (type='query-worker', `sink.id`="queryWorkerReturnAsSelect", map.type="json") (value long, time string);

-- Define output stream
CREATE SINK STREAM QWResponseStream(value long, time string);

-- Define 10sec event trigger
CREATE TRIGGER InitTrigger WITH (interval=10 sec);

-- Create query-worker as select creates the `queryWorkerReturnAsSelect` query-worker and executes it every time when an event receives by the InitTrigger.
CREATE QUERY-WORKER queryWorkerReturnAsSelect WITH (query='FOR i IN 4..6 return { value: i, time: @startTime } ') (startTime string)
AS SELECT time:dateFormat(eventTimestamp(), 'yyyy/MM/dd HH:mm:ss') as startTime
FROM InitTrigger;

-- Executes `queryWorker` when an event receives by the InitTrigger.
INSERT INTO queryWorker
SELECT time:dateFormat(eventTimestamp(), 'yyyy/MM/dd HH:mm:ss') as startTime
FROM InitTrigger;

-- Emits events received by queryWorkerResponse and queryWorkerAsSelectResponse sources into the QWResponseStream.
INSERT INTO QWResponseStream
SELECT *
FROM queryWorkerResponse;

INSERT INTO QWResponseStream
SELECT *
FROM queryWorkerAsSelectResponse;
```

This example is identical to **Sample-Query-Worker-Create** in the Stream Workers Samples tab.
