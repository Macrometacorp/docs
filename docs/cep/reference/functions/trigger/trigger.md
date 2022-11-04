---
title: Cron Trigger
---

Triggers allow events to be periodically generated. Trigger definition can be used to define a trigger. A trigger also works like a stream with a predefined schema.

## Features

For some use cases the system should be able to periodically generate events based on a specified time interval to perform some periodic executions.

A trigger can be performed for a 'start' operation, for a given 'time interval', or for a given 'cron expression'.

The following types of triggers are currently supported:

| Trigger type           | Description                                                                                                        |	
|------------------------|--------------------------------------------------------------------------------------------------------------------|
| every time_interval    | An event is triggered periodically at the given time interval (Minimum supported time interval is millisec)        |
| cron expression        | An event is triggered periodically based on the given cron expression                                              |
| start                  | An event is triggered when Siddhi is started                                                                       |

## Syntax

Trigger uses the following syntax:

```js
	CREATE TRIGGER <trigger name> WITH ( interval = 'time interval' );
	CREATE TRIGGER <trigger name> WITH ( expression = 'start' or 'cron expression' ); 
```


## Example

```js
-- A trigger to generate events every 5 seconds.
1. CREATE TRIGGER FiveSecTrigger WITH ( interval = 5 sec );

-- A trigger to generate events every 100 millisec.
2. CREATE TRIGGER FiveSecTrigger WITH ( interval = 100 millisec );

-- A trigger to generate events at 10.15 AM on every weekdays.
3. CREATE TRIGGER WorkStartTrigger WITH ( expression = '0 15 10 ? * MON-FRI' );

-- A trigger to generate an event at App startup.
4. CREATE TRIGGER InitTrigger WITH ( expression = 'start' );
```