---
sidebar_position: 70
title: Trigger
---

Triggers allow events to be periodically generated. **Trigger definition** can be used to define a trigger. A trigger also works like a stream with a predefined schema.

**Purpose**

For some use cases the system should be able to periodically generate events based on a specified time interval to perform some periodic executions.

A trigger can be performed for a `'start'` operation, for a given `<time interval>`, or for a given `'<cron expression>'`.

**Syntax**

The syntax for a trigger definition is as follows.

```
CREATE TRIGGER <trigger name> at ('start'| every <time interval>| '<cron expression>');
```

Similar to streams, triggers can be used as inputs. They adhere to the following stream definition and produce the `triggered_time` attribute of the `long` type.

```
CREATE STREAM <trigger name> (triggered_time long);
```

The following types of triggeres are currently supported:

|Trigger type| Description|
|-------------|-----------|
|`'start'`| An event is triggered when Stream is started.|
|`every <time interval>`| An event is triggered periodically at the given time interval.
|`'<cron expression>'`| An event is triggered periodically based on the given cron expression. For configuration details, see <a target="_blank" href="http://www.quartz-scheduler.org/documentation/quartz-2.1.7/tutorials/tutorial-lesson-06.html">quartz-scheduler</a>.

**Examples**

- Triggering events regularly at specific time intervals

    The following query triggers events every 5 minutes.

    ```
    CREATE TRIGGER FiveMinTriggerStream at every 5 min;
    ```

- Triggering events at a specific time on specified days

    The following query triggers an event at 10.15 AM on every weekdays.

    ```
    CREATE TRIGGER FiveMinTriggerStream at '0 15 10 ? * MON-FRI';
    ```
