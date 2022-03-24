---
sidebar_position: 9
---

# Error Handling

## Logging

Errors in stream apps can be handled at the Streams and in the Sinks. This example explains how errors are handled at Sink level.

There can be cases where external systems becoming unavailable or coursing errors when the events are published to them.
By default sinks log and drop the events causing event losses, and this can be handled gracefully by adding `OnError.action="<action>",` to the `WITH()` property for creating a sink.

Refer to the [stream query guide](query-guide#error-handling) for more information.

In the following example, we attempt to publish abnormal Glucose reading events to an unavailable HTTP endpoint, and the error is recorded to the logs.

```sql
-- Defines `GlucoseReadingStream` stream which contains events related to Glucose readings.
CREATE STREAM GlucoseReadingStream (locationRoom string,
    locationBed string, timeStamp string, sensorID long,
    patientFirstName string, patientLastName string,
    sensorValue double);


-- If `HTTP` endpoint which defined in `sink` annotation is unavailable then it logs the event with the error and drops the event.
-- Errors can be gracefully handled by configuring `on.error` parameter.

CREATE SINK AbnormalGlucoseReadingStream WITH (type = 'http', OnError.action="log", publisher.url = "http://xyz:8080/logger", method = "POST", map.type = 'json') (timeStampInLong long, locationRoom string, locationBed string, sensorID long, patientFullName string, sensorReadingValue double);

@info(name='abnormal-reading-identifier')
insert into AbnormalGlucoseReadingStream
select math:parseLong(timeStamp) as timeStampInLong,
    locationRoom, locationBed, sensorID,
    -- Concatenate string attributes `patientFirstName` and `patientLastName`
    str:concat(patientFirstName, " ", patientLastName) as patientFullName, sensorValue as sensorReadingValue
-- Identifies the abnormal Glucose reading if `sensorValue > 220`
from GlucoseReadingStream[sensorValue > 220];
```

### Input

Below event is sent to `GlucoseReadingStream` stream,

[`'Get-1024'`, `'Level2'`, `'1576829362'`, `10348`, `'Alex'`, `'John'`, `250`]


### Output

After processing, the following log gets printed in the console:

```bash
ERROR {io.macrometa.cep.core.stream.output.sink.Sink} - Error on 'ErrorHandling'. Dropping event at Sink 'http' at 'AbnormalGlucoseReadingStream' as its still trying to reconnect!, events dropped '{"event":{"timeStampInLong":1576829362,"locationRoom":"1024","locationBed":"Level2","sensorID":10348,"patientFullName":"Alex John","sensorReadingValue":250.0}}'`
```

## Wait & Retry

This example shows how errors are handled at Sink level by `wait and retry` mode.

In this mode, publishing threads wait in back-off and re-trying mode, and only send the events when the connection is re-established. During this time the threads will not consume any new messages causing the systems to introduce back pressure on the systems that publish to it.

Refer to the [stream query guide](../query-guide/#error-handling) for more information.


```sql
-- Defines `GlucoseReadingStream` stream which contains events related to Glucose readings.
CREATE STREAM GlucoseReadingStream (locationRoom string,
    locationBed string, timeStamp string, sensorID long,
    patientFirstName string, patientLastName string,
    sensorValue double);

-- If `HTTP` endpoint is unavailable then threads who bring events via `AbnormalGlucoseReadingStream` wait in `back-off and re-trying` mode.

-- Errors can be gracefully handled by configuring `on.error` parameter.

CREATE SINK AbnormalGlucoseReadingStream WITH (type = 'http', OnError.action="wait", publisher.url = "http://localhost:8080/logger", method = "POST", map.type = 'json') (timeStampInLong long, locationRoom string, locationBed string, sensorID long, patientFullName string, sensorReadingValue double);

@info(name='abnormal-reading-identifier')
insert into AbnormalGlucoseReadingStream
select math:parseLong(timeStamp) as timeStampInLong,
    locationRoom, locationBed, sensorID,
    -- Concatenate string attributes `patientFirstName` and `patientLastName`
    str:concat(patientFirstName, " ", patientLastName) as patientFullName, sensorValue as sensorReadingValue
-- Identifies the abnormal Glucose reading if `sensorValue > 220`
from GlucoseReadingStream[sensorValue > 220];
```

Above is a simple example to publish abnormal Glucose reading events to an unavailable HTTP endpoint and error is handled by `wait and retry` mode.

### Prerequisites

Download the mock logger service from [here](https://github.com/mohanvive/siddhi-mock-services/releases/download/v2.0.0/logservice-1.0.0.jar).


### Input & Output

- Below event is sent to `GlucoseReadingStream` stream,

    [`'Get-1024'`, `'Level2'`, `'1576829362'`, `10348`, `'Alex'`, `'John'`, `250`]

    You could see ConnectException is get printed since logger service is unavailable.

- Then, execute the below command to start the mock logger service.

    `java -jar logservice-1.0.0.jar`

- Now, you could see the event sent in step #1 is get logged in the logger service console as given below.

    ```bash
    LoggerService:42 - {event={timeStampInLong=1.576829362E9, locationRoom=Get-1024, locationBed=Level2, sensorID=10348.0, patientFullName=Alex John, sensorReadingValue=250.0}}
    ```
