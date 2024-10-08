This example uses CEP logs, which are not yet available to customers.

---
sidebar_position: 50
title: Logging Example
---

# Error Handling: Logging Example

This example explains how errors are handled at the sink level with `log` mode. In the following example, the stream worker attempts to publish abnormal glucose reading events to an unavailable HTTP endpoint, and the error is recorded to the logs.

For more information, refer to [Source Error Handling](source-error-handling.md) and [Sink Error Handling](sink-error-handling.md).

```sql
-- Defines `GlucoseReadingStream` stream, which contains events related to glucose readings.
CREATE STREAM GlucoseReadingStream (locationRoom string,
    locationBed string, timeStamp string, sensorID long,
    patientFirstName string, patientLastName string,
    sensorValue double);


-- If `HTTP` endpoint defined in `sink` annotation is unavailable, then it logs the event with the error and drops the event.

@OnError(action='log')
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

## Input

Below event is sent to `GlucoseReadingStream` stream:

[`'Get-1024'`, `'Level2'`, `'1576829362'`, `10348`, `'Alex'`, `'John'`, `250`]

## Output

After processing, the following log is printed in the console:

```bash
ERROR {io.macrometa.cep.core.stream.output.sink.Sink} - Error on 'ErrorHandling'. Dropping event at Sink 'http' at 'AbnormalGlucoseReadingStream' as its still trying to reconnect!, events dropped '{"event":{"timeStampInLong":1576829362,"locationRoom":"1024","locationBed":"Level2","sensorID":10348,"patientFullName":"Alex John","sensorReadingValue":250.0}}'`
```
