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
geo:geoLocationApproximate("person1", 6.876657, 79.897648, "ENTER", "uuid1", 20.0d, 1452583935L)
```

The `geo:geoLocationApproximate()` function calculates an approximate location given the parameters. Here, the function takes "person1" as the identifier, 6.876657 and 79.897648 as the latitude and longitude respectively, "ENTER" as the action, "uuid1" as the UUID, 20.0d as the accuracy, and 1452583935L as the timestamp. The function outputs an approximation of the location, returning `6.876657000000001` for latitude and `79.89764800000001` for longitude. 

## Example 2

```sql
CREATE STREAM InputStream (id string, latitude double, longitude double, action string, uuid string, accuracy double, timestamp long);
CREATE SINK STREAM OutputStream (approximateLatitude double, approximateLongitude double);

@info(name = 'approximateLocation')
INSERT INTO OutputStream
SELECT geo:geoLocationApproximate(id, latitude, longitude, action, uuid, accuracy, timestamp)
FROM InputStream;
```

In this example, `approximateLocation` processes events from the `InputStream`, which contains parameters such as an identifier (`id`), geographic coordinates (`latitude`, `longitude`), an action (`action`), a UUID (`uuid`), an accuracy (`accuracy`), and a timestamp (`timestamp`). It uses the `geo:geoLocationApproximate(id, latitude, longitude, action, uuid, accuracy, timestamp)` function to calculate an approximate location based on these parameters. The results, approximate latitude and longitude, are then sent as events to the `OutputStream`.
