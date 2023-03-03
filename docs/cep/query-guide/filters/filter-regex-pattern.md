---
sidebar_position: 20
title: Filter Based on Regex Pattern
---

You can filter events by providing a condition where only events that match a specific Regex pattern are taken for further processing.

Assume that you want to filter the temperature readings for a specific rage of rooms located in the Southern wing and used for purpose B. Also assume that this can be derived from the room number because the first three characters of the room number represent the wing, and the eighth character represents the purpose. e.g., in room no `SOU5438B765`, the first three characters `SOU` represent the Southern wing, and the eighth character `B` represents purpose B.

This stream worker filters the events as described. It builds on the stream worker in [Filter Based on Exact Attribute Match](filter-match-attribute).

```sql
@App:name("TemperatureApp1")
@App:description("Streams Room2233Stream and FilteredResultsStream are waiting for results from queries 'Get temperature for roomNo: 2233' and 'Southern wing room range filter'")
@App:qlVersion("2")

/*
Part-1: This stream worker receives an object with properties 'deviceID', 'roomNo', and 'temp' in InputTempStream. If the roomNo is '2233', the query will send the object to Room2233Stream 

Part 2: The FilteredRoomRange query will filter values using a regular expression. In this case, any roomNo starting with 'SOU' with some random characters plus a 'B' plus some random character will match the pattern, and the object that matches that expression will be sent to 'FilteredResultsStream'
*/

-- Define an input stream to specify the schema based on which events are selected.
CREATE STREAM InputTempStream (deviceID long, roomNo string, temp double);

-- Define an output stream to publish the Room 2233 results.
CREATE SINK Room2233Stream WITH (type='stream', stream='Room2233Stream', map.type='json') (deviceID long, roomNo string, temp double);

-- Define an output stream to publish the Southern wing filtered results.
CREATE SINK FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json') (deviceID long, roomNo string, temp double);

-- Query to generate filtered temperature readings for a specific room number (e.g., room no `2233`).
@info(name = 'Get temperature for roomNo: 2233')
INSERT INTO Room2233Stream
SELECT *
FROM InputTempStream [roomNo=='2233'];

-- Query to filter results from the Southern wing for purpose B.
@info(name = 'Southern wing room range filter')
INSERT INTO FilteredResultsStream
SELECT deviceID, roomNo, temp
FROM InputTempStream[regex:matches('SOU(.*)B(.*)', roomNo)];
```
