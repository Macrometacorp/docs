---
sidebar_position: 30
title: Filter Based on Multiple Criteria
---

In this example, assume that you need to filter the readings for a range of rooms (e.g., rooms 100-210) where the temperature is greater than 40.

The `AND` logical expression is used to indicate that both the filter conditions provided need to be considered.

```sql
@App:name("TemperatureApp2")
@App:description("This stream worker receives a object with properties 'deviceID', 'roomNo', and 'temp' in InputTempStream, If roomNo is 2233, and temperature is more than 20 and less than 50 degrees, and where deviceID is more than 1 and less than 9, send the object to the stream")
@App:qlVersion("2")

CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);
    
CREATE SINK Room2233Stream WITH (type='stream', stream='Room2233Stream', map.type='json') (deviceID long, roomNo string, temp double);
    
@info(name = 'Get temperature for roomNo: 2233')
INSERT INTO Room2233Stream
SELECT *
FROM InputTempStream [(temp > 20 AND temp < 50) AND (deviceID > 1 AND deviceID < 9) AND roomNo == "2233"];
```
