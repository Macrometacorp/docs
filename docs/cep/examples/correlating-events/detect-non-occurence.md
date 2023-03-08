---
sidebar_position: 20
title: Detecting Non-Occurrence of Events
---

This example demonstrates how to analyze data by observing scenarios where events do not occur. To understand how this is done, consider a taxi service company that tracks the movements of the taxis it runs and wants to be notified of unexpected delays. The manager needs to contact SDK if the taxi has not reached either of two specified locations within 15 minutes.

For the complete list of methods in which you can apply patterns to detect non-occurring events, refer to [Non-Occurring Events](../../query-guide/patterns/non-occurring-events).

## Stream Worker Code

```sql
@App:name("DelayDetectionApp")
@App:qlVersion("2")

-- Input stream to receive information about the location of taxis.
CREATE STREAM LocationStream (taxiID string, driverID string, latitude double, longitude double);

-- Output stream to publish delay notification as a message.
CREATE SINK AlertStream WITH (type='http', publisher.url='http://headoffice:8080/endpoint', map.type = 'json') (taxiID string, driverID string, message string);

-- Query to detect delays.
INSERT INTO AlertStream
SELECT LocationStream.taxiID, LocationStream.driverID, 'Unexpected Delay' AS message
FROM NOT LocationStream[latitude == 44.0096 AND longitude == 81.2735] FOR 15 minutes OR NOT LocationStream[latitude == 43.0096 AND longitude == 81.2737] FOR 15 minutes;
```

## Query Explanation

- The `NOT` keyword is added to indicate that the stream worker should look for instances where an event has _not_ occurred when the given conditions are met.

- Two conditions are given. The alert is generated when either of the two conditions has not occurred. To indicate this, the `OR` keyword is used between the two conditions.

- The given conditions indicate that the taxi should have reached either the `latitude == 44.0096 and longitude == 81.2735` location or the `latitude == 43.0096 and longitude == 81.2737` location. Either of the locations should be reached within 15 minutes. Therefore, each location is specified as a separate condition and a time window of 15 minutes is applied to each condition in a sliding manner.
