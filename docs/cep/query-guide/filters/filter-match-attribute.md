---
sidebar_position: 10
title: Filter Based on Exact Match
---

This example demonstrates how you can filter data based on the exact match of an attribute.

```sql
@App:name("TemperatureApp")
@App:description("This stream worker receives an object with properties 'deviceID', 'roomNo', and 'temp' in InputTempStream, if the roomNo is '2233', the query will send the object to Room2233Stream")
@App:qlVersion("2")

-- Define an input stream to specify the schema based on which events are selected.
CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);

-- Define an output stream to publish the results.
CREATE SINK Room2233Stream WITH (type='stream', stream='Room2233Stream', map.type='json') (deviceID long, roomNo string, temp double);

-- Query to generate filtered temperature readings for a specific room number (e.g., room no `2233`).
@info(name = 'Get temperature for roomNo: 2233')
INSERT INTO Room2233Stream
SELECT *
FROM InputTempStream [roomNo=='2233'];
```
