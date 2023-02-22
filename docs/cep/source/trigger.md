---
sidebar_position: 40
title: Create Triggers
---

Triggers allow events to be periodically generated. A trigger also works like a [stream source](source-types/stream-source.md) with a predefined schema.

## Purpose

For some use cases, the system should be able to periodically generate events based on a specified time interval to periodically execute queries.

A trigger can be performed for a `'start'` operation, for a given `<time interval>`, or for a given `'<cron expression>'`.

## Syntax

The syntax for a trigger definition is as follows:

```js
CREATE TRIGGER <trigger name> at ('start'| every <time interval>| '<cron expression>');
```

Similar to streams, triggers can be used as inputs. They adhere to the following stream definition and produce the `triggered_time` attribute of the `long` type.

```js
CREATE STREAM <trigger name> (triggered_time long);
```

## Supported Triggers

The following types of triggers are currently supported:

|Trigger type| Description|
|-------------|-----------|
|`start`| An event is triggered when a stream is started.|
|`every <time interval>`| An event is triggered periodically at the given time interval. Minimum supported time interval is millisecond. |
|`<cron expression>`| An event is triggered periodically based on the given cron expression. For configuration details, see [CronTrigger](http://www.quartz-scheduler.org/documentation/quartz-2.1.7/tutorials/tutorial-lesson-06.html). |

## Examples

- Trigger an event when the stream is started.
  
  The following query triggers an event when the stream is started:

  ```sql
  CREATE TRIGGER InitTrigger WITH (expression = 'start');
  ```

- Trigger events regularly at specific time intervals.

  The following query triggers events every five minutes:

  ```sql
  CREATE TRIGGER FiveMinTriggerStream WITH(interval = 5 min);
  ```

- Trigger events at a specific time on specified days.

  The following query triggers an event at 10.15 AM every weekday:

  ```sql
  CREATE TRIGGER FiveMinTriggerStream1 WITH (expression = '0 15 10 ? * MON-FRI');
  ```

- The following stream worker uses a trigger that runs a query worker every minute as the source.

  ```sql
  @App:name("runQueryWorker")
  @App:description("Execute a query worker every minute.")
  @App:qlVersion("2")

  CREATE TRIGGER InitTrigger WITH (interval = 1 minute);

  -- query.worker.name is the name of a query worker that already exists in the GeoFabric.
  CREATE SINK queryWorkerStream WITH (type='query-worker', query.worker.name='queryWorkerSample')(startTime string);

  INSERT INTO queryWorkerStream
  SELECT time:dateFormat(eventTimestamp(), 'yyyy/MM/dd HH:mm:ss') as startTime
  FROM InitTrigger
  ```
