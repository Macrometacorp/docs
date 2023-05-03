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
