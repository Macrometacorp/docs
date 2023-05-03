---
title: locationApproximate (Stream Function)
---

Calculates the average location of `locationRecorder` using the collection iBeacons in which the location recorder resides.

## Syntax

```sql
geo:locationApproximate(<STRING> location.recorder, <DOUBLE> latitude, <DOUBLE> longitude, <STRING> sensor.proximity, <STRING> sensor.uuid, <DOUBLE> sensor.weight, <LONG> timestamp)
```

## Query Parameters

| Name              | Description   | Possible Data Types | Optional | Dynamic |
|-------------------|---------------|---------------------|----------|---------|
| location.recorder  | Unique ID of the specified object or item.   | STRING       | No       | No     |
| latitude | Latitude of the iBeacon.  | DOUBLE              | No      | No     |
| longitude        | Longitude of the iBeacon. | DOUBLE| No      | No     |
| sensor.proximity        | Proximity given by the iBeacon (eg: ENTER, RANGE, EXIT). | STRING| No      | No     |
| sensor.uuid     | Unique ID of the iBeacon. | STRING| No      | No     |
| sensor.weight     | Approximation weight of the iBeacon (e.g. approximate distance from the iBeacon). | DOUBLE| No      | No     |
| timestamp      | Timestamp of the log you want to use to remove iBeacon from a collection after no new log for 5 minutes. | LONG| No      | No     |

## Example 1

```sql
@info(name = 'query1')
geo:geoLocationApproximate("person1", 6.876657, 79.897648, "ENTER", "uuid1", 20.0d, 1452583935L)
```

This example demonstrates the usage of `geo:geoLocationApproximate()` function. It returns an approximation of the specified location with the given parameters. In this case, the function takes "person1" as the ID, 6.876657 as latitude, 79.897648 as longitude, "ENTER" as the action, "uuid1" as the UUID, 20.0 as the accuracy, and 1452583935L as the timestamp. The function approximates the location and returns the value `6.876657000000001` for the latitude. Note that the longitude approximation is not shown in the example, but it would also be calculated.
