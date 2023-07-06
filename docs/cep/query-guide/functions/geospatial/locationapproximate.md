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
geo:locationApproximate("person1", 6.876657, 79.897648, "ENTER", "uuid1", 20.0d, 1452583935L)
```

The `geo:locationApproximate()` function calculates an approximate location given the parameters. Here, the function takes "person1" as the identifier, 6.876657 and 79.897648 as the latitude and longitude respectively, "ENTER" as the action, "uuid1" as the UUID, 20.0d as the accuracy, and 1452583935L as the timestamp. The function outputs an approximation of the location, returning `6.876657000000001` for latitude and `79.89764800000001` for longitude.

## Example 2

```sql
CREATE STREAM InputStream (id string, latitude double, longitude double, action string, uuid string, accuracy double, timestamp long);
CREATE SINK STREAM OutputStream (id string, averagedLatitude double, averagedLongitude double, averageExist bool);

@info(name = 'approximateLocation')
INSERT INTO OutputStream
SELECT id, averagedLatitude, averagedLongitude, averageExist
FROM InputStream#geo:locationApproximate(id, latitude, longitude, action, uuid, accuracy, timestamp);
```

In this streaming data example, two streams are created: `InputStream` for input data and `OutputStream` for the output.

The `InputStream` includes fields for `id` (representing the unique ID of the specific object or item being tracked), `latitude` and `longitude` (representing the coordinates of the iBeacon device), `action` (representing the proximity provided by the iBeacon), `uuid` (representing the unique ID of the iBeacon), `accuracy` (representing the approximation weight of the iBeacon), and `timestamp` (representing the timestamp of the log).

The `OutputStream` is set to receive the `id`, `averagedLatitude`, `averagedLongitude`, and a boolean field `averageExist` that will be `true` if the calculation was successful, and `false` otherwise.

The query named `approximateLocation` listens for events from the `InputStream` and applies the function `geo:locationApproximate(id, latitude, longitude, action, uuid, accuracy, timestamp)` to each event. This function calculates the average location of the `location.recorder` using the collection of iBeacons where the location recorder resides.

The output from this function - the `id`, `averagedLatitude`, `averagedLongitude`, and `averageExist` - is then inserted into the `OutputStream`. In essence, this query is continually calculating an average position based on the inputs from the `InputStream` and updating `OutputStream` with the calculated averages.
