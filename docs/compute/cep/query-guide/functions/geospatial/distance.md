---
title: distance (Function)
---

Returns the distance between two coordinates in meters.

## Syntax

```sql
<DOUBLE> geo:distance(<DOUBLE> location1.latitude, <DOUBLE> location1.longitude, <DOUBLE> location2.latitude, <DOUBLE> location2.longitude)
```

## Query Parameters

| Name              | Description              | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------|---------------------|----------|---------|
| location1.latitude 	     | Latitude of 1st location.   | DOUBLE       | No       | No     |
| location1.longitude | Longitude of 1st location.      | DOUBLE       | No      | No     |
| location2.latitude          | Latitude of 2nd location. | DOUBLE        | No      | No     |
| location2.longitude         | Longitude of 2nd location. | DOUBLE      | No      | No     |

## Example 1

```sql
@info(name = 'query1')
geo:distance(10.45, 77.38, 83.98, 59.93)
```

This query uses the `geo:distance()` function to calculate the distance between two points specified by their latitude and longitude coordinates. The first point has coordinates (10.45, 77.38), and the second point has coordinates (83.98, 59.93). The function returns the distance between the two points in meters.

## Example 2

```sql
@info(name = 'query2')
geo:distance(35.6895, 139.6917, 51.5074, 0.1278)
```

This query, named 'query2', uses the `geo:distance()` function to calculate the distance between Tokyo, Japan (with coordinates 35.6895, 139.6917) and London, UK (with coordinates 51.5074, 0.1278). The function returns the distance between these two points in meters, allowing you to quantify the geographical distance between these two major cities.

## Example 3

```sql
CREATE STREAM LocationStream (lat1 double, lon1 double, lat2 double, lon2 double);
CREATE SINK STREAM DistanceStream (distance double);

@info(name = 'CalculateDistance')
INSERT INTO DistanceStream
SELECT geo:distance(lat1, lon1, lat2, lon2) AS distance
FROM LocationStream;
```

In this stream worker example, we have two streams: `LocationStream` for input and `DistanceStream` for output. The `LocationStream` is set to receive pairs of coordinates (latitude and longitude).

The 'CalculateDistance' query operates on the `LocationStream`. For each event in this stream, the `geo:distance(lat1, lon1, lat2, lon2)` function calculates the distance between the two points specified by their latitude and longitude coordinates.

The resulting distance (in meters) is then inserted into the `DistanceStream`.

This stream worker can be used for continuous real-time calculations of distances between different geographical coordinates received in the `LocationStream`.
