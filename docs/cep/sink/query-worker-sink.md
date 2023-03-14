---
sidebar_position: 60
title: Query Worker Sink
---

You can use a new or existing [query worker](../../queryworkers/query-workers) as a stream worker sink.

For more information about writing queries and creating query workers, refer to [Query Workers](../../queryworkers/).

## Syntax

```sql
CREATE SINK <NAME> WITH (type="query-worker", map.type="<STRING>", query.worker.name="<STRING>", sink.id="<STRING>")
```

## Query Parameters

| Name     | Description                   | Default Value            | Possible Data Types | Optional | Dynamic |
|----------|---------------------------|--------------------------|---------------------|----------|---------|
| query.worker.name  | TThe name of an existing query worker. | | string | No | Yes |
| sink.id | Identifier to correlate the `query-worker` source with its corresponding `query-worker` sink that published the messages. | | string | No | No |

## Example 1

```sql
CREATE SINK queryWorkerStream WITH (type='query-worker', query.worker.name="queryWorkerSample") (startTime string);

CREATE TRIGGER InitTrigger WITH (interval=1 minute);

INSERT INTO queryWorkerStream
SELECT time:dateFormat(eventTimestamp(), 'yyyy/MM/dd HH:mm:ss') as startTime
FROM InitTrigger;
```

Each minute, the sink `query-worker` calls the query worker named `queryWorkerSample`, which inserts data into the collection `numbers` as specified in the query worker.

## Example 2

```sql
CREATE TRIGGER Trigger1 WITH (interval = 10 seconds);

-- always passthrough
CREATE SINK queryWorkerStream WITH (type='query-worker', query.worker.name="testql", `sink.id`="test") (value long);

-- json or passthrough
CREATE SOURCE queryWorkerStreamResponse WITH (type='query-worker', `sink.id`="test", map.type="json") (_id string, value long);

CREATE SINK STREAM TestStream(id string, message long);

INSERT INTO queryWorkerStream
SELECT eventTimestamp() as value
FROM Trigger1;

INSERT INTO TestStream
SELECT _id as id, value as message
FROM queryWorkerStreamResponse;
```

This example is identical to **Sample-Query-Worker-Response** in the Stream Workers Samples tab.
