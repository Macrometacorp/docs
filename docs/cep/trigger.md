---
sidebar_position: 40
title: Create Triggers
---

Triggers allow events to be periodically generated. A trigger also works like a [stream source](source/source-types/stream-source.md) with a predefined schema.

## Purpose

For some use cases, the system should be able to periodically generate events based on a specified time interval to perform some periodic executions.

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
|`'start'`| An event is triggered when a stream is started.|
|`every <time interval>`| An event is triggered periodically at the given time interval. Minimum supported time interval is millisecond. |
|`'<cron expression>'`| An event is triggered periodically based on the given cron expression. For configuration details, see <a target="_blank" href="http://www.quartz-scheduler.org/documentation/quartz-2.1.7/tutorials/tutorial-lesson-06.html">quartz-scheduler</a>. |

## Examples

- Triggering events regularly at specific time intervals

    The following query triggers events every five minutes:

    ```js
    CREATE TRIGGER FiveMinTriggerStream WITH(interval= 5 min);
    ```

- Triggering events at a specific time on specified days

    The following query triggers an event at 10.15 AM every weekday:

    ```js
    CREATE TRIGGER FiveMinTriggerStream1 WITH (expression='0 15 10 ? * MON-FRI');
    ```
