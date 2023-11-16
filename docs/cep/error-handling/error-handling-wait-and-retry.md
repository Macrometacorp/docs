---
sidebar_position: 60
title: Wait and Retry Example
---

# Error Handling: Wait and Retry Example

This section demonstrates the implementation of the `OnError.action='wait'` property in a wait and retry error handling strategy at the sink level.

## Wait and Retry Strategy

In a scenario where connections to external systems are intermittent, the `OnError.action='wait'` property enables a sink to temporarily hold event publication until the connection is re-established. This behavior introduces back pressure, preventing new events from being consumed until the issue is resolved.

Here is an example demonstrating how to configure a sink to handle connection errors by using a wait and retry strategy:

```sql
-- Defines the stream for handling glucose readings
CREATE STREAM GlucoseReadingStream (locationRoom string, locationBed string, timeStamp string, sensorID long, patientFirstName string, patientLastName string, sensorValue double);

-- Sink configuration with the OnError.action='wait' property for wait and retry strategy
CREATE SINK AbnormalGlucoseReadingStream WITH (type = 'http', OnError.action='wait', publisher.url = "http://<customer's host>:8080/logger", method = "POST", map.type = 'json') (timeStampInLong long, locationRoom string, locationBed string, sensorID long, patientFullName string, sensorReadingValue double);

@info(name='abnormal-reading-identifier')
insert into AbnormalGlucoseReadingStream
select math:parseLong(timeStamp) as timeStampInLong, locationRoom, locationBed, sensorID, str:concat(patientFirstName, " ", patientLastName) as patientFullName, sensorValue as sensorReadingValue
from GlucoseReadingStream[sensorValue > 220];
```

## Prerequisites

[Download the mock logger service](https://github.com/mohanvive/siddhi-mock-services/releases/download/v2.0.0/logservice-1.0.0.jar).

## Input and Output

- The event sent to `GlucoseReadingStream` should be formatted as follows:

    [`'Get-1024'`, `'Level2'`, `'1576829362'`, `10348`, `'Alex'`, `'John'`, `250`]

- In the case of a service unavailability, the sink will retry sending the event as per the configured wait and retry logic.

- Upon service restoration, events that were held will be published to the HTTP endpoint and logged accordingly.
