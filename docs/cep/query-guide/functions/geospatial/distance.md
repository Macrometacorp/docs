---
title: distance (Function)
---

Returns the distance between two coordinates in meters.

## Syntax

    <DOUBLE> geo:distance(<DOUBLE> location1.latitude, <DOUBLE> location1.longitude, <DOUBLE> location2.latitude, <DOUBLE> location2.longitude)

## Query Parameters

| Name              | Description                   | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------------|----------|---------|
| location1.latitude 	              | Latitude of 1st location.          | DOUBLE       | No       | No     |
| location1.longitude | Longitude of 1st location.                  | DOUBLE              | No      | No     |
| location2.latitude          | Latitude of 2nd location. | DOUBLE                | No      | No     |
| location2.longitude         | Longitude of 2nd location. | DOUBLE                | No      | No     |

## Example

    geo:distance(10.45, 77.38, 83.98, 59.93)
