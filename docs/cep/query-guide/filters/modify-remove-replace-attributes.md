---
sidebar_position: 40
title: Modifying, Removing, and Replacing Attributes
---

The input data might include attributes that are not required in order to generate the required output, attributes with values that need to be updated or replaced before further processing.

Assume that you do not need the device ID for further processing, and you need to remove some unnecessary white spaces from the `roomNo` before sending the input data for further processing. The stream worker below performs these tasks.

```sql
@App:name("TemperatureApp3")
@App:description("")
@App:qlVersion("2")

/*

Part 1: The  'Southern wing room range filter' query will filter values using a regular expression. In this case, any roomNo starting with 'SOU' with some random characters plus a 'B' plus some random character will match the pattern, and the object that matches that expression will be sent to 'FilteredResultsStream'.

Part 2: The query 'CleaningData' eliminates the deviceID property and any unnecessary white spaces.

*/

CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);

CREATE SINK FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json') (deviceID long, roomNo string, temp double);

CREATE SINK CleansedDataStream WITH (type='stream', stream='CleansedDataStream', map.type='json') (roomNo string, temp double);

@info(name = 'Southern wing room range filter')
INSERT INTO FilteredResultsStream
SELECT deviceID, roomNo, temp
FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];

@info(name = 'CleaningData')
INSERT INTO CleansedDataStream
SELECT str:trim(roomNo) AS roomNo, temp
FROM FilteredResultsStream;
```
