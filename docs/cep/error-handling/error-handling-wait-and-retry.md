---
sidebar_position: 60
title: Wait and Retry Example
---

# Error Handling: Wait and Retry Example

This example shows how errors are handled at the sink level with `wait and retry` mode.

In this mode, publishing threads wait in back-off and re-trying mode, and only send the events when the connection is re-established. During this time the threads will not consume any new messages causing the systems to introduce back pressure on the systems that publish to it.

For more information, refer to [Source Error Handling](source-error-handling.md) and [Sink Error Handling](sink-error-handling.md).

Here is a simple example to publish abnormal glucose reading events to an unavailable HTTP endpoint. The error is handled by `wait and retry` mode.

```sql
-- Defines `GlucoseReadingStream` stream which contains events related to glucose readings.
CREATE STREAM GlucoseReadingStream (locationRoom string,
    locationBed string, timeStamp string, sensorID long,
    patientFirstName string, patientLastName string,
    sensorValue double);

-- If `HTTP` endpoint is unavailable then threads who bring events via `AbnormalGlucoseReadingStream` wait in `back-off and re-trying` mode.

@OnError(action='wait')
CREATE SINK AbnormalGlucoseReadingStream WITH (type = 'http', OnError.action="wait", publisher.url = "http://localhost:8080/logger", method = "POST", map.type = 'json') (timeStampInLong long, locationRoom string, locationBed string, sensorID long, patientFullName string, sensorReadingValue double);

@info(name='abnormal-reading-identifier')
insert into AbnormalGlucoseReadingStream
select math:parseLong(timeStamp) as timeStampInLong,
    locationRoom, locationBed, sensorID,
    -- Concatenate string attributes `patientFirstName` and `patientLastName`
    str:concat(patientFirstName, " ", patientLastName) as patientFullName, sensorValue as sensorReadingValue
-- Identifies the abnormal glucose reading if `sensorValue > 220`
from GlucoseReadingStream[sensorValue > 220];
```

## Prerequisites

Download the mock logger service from [here](https://github.com/mohanvive/siddhi-mock-services/releases/download/v2.0.0/logservice-1.0.0.jar).

## Input and Output

- Below event is sent to `GlucoseReadingStream` stream,

    [`'Get-1024'`, `'Level2'`, `'1576829362'`, `10348`, `'Alex'`, `'John'`, `250`]

    You could see ConnectException is get printed since logger service is unavailable.

- Then, execute the below command to start the mock logger service.

    `java -jar logservice-1.0.0.jar`

- Now, you could see the event sent in step #1 is get logged in the logger service console as given below.

    ```bash
    LoggerService:42 - {event={timeStampInLong=1.576829362E9, locationRoom=Get-1024, locationBed=Level2, sensorID=10348.0, patientFullName=Alex John, sensorReadingValue=250.0}}
    ```
