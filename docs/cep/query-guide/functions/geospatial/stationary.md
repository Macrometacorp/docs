---
title: stationary (Stream Processor)
---

Determines if the specified object or location becomes stationary within a specified radius. Returns `false` when the object moves out of the specified radius.

This function will return `true` when the object (defined in terms of longitude and latitude) becomes stationary within the specified radius. Returns `false` when the object moves out of the specified radius.

## Syntax

```sql
<BOOL> geo:stationary(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)
```

## Query Parameters

| Name              | Description      | Possible Data Types | Optional | Dynamic |
|-------------------|-------------------------------|---------------------|----------|---------|
| id  | ID of the specified object.           | STRING       | No       | No     |
| longitude  | Longitude value of the geo location.           | DOUBLE       | No       | No     |
| latitude | Latitude value of the geo location.     | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING       | No      | No     |
| radius      | Proximity distance (radial). | DOUBLE     | No      | No     |

## Example 1

```sql
geo:stationary('km-4354', 0, 0, 110574.61087757687)
```

In this example, the `geo:stationary()` function checks if the given geofence with ID `km-4354` is considered stationary within the given radius of `110574.61087757687` from the reference point `(0, 0)`. The function returns `true` if the geofence is stationary.

## Example 2

```sql
CREATE STREAM InputGeoStream (geofenceId string, longitude float, latitude float, radius float);
CREATE STREAM OutputGeoStream (stationaryStatus bool);

@info(name = 'StationaryStatusCheck')
INSERT INTO OutputGeoStream
SELECT geofenceId AS id, stationary 
FROM InputGeoStream#geo:stationary(geofenceId, longitude, latitude, radius);
```

In this example, a stream named `InputGeoStream` is created to provide input to the query, and `OutputGeoStream` is created to collect the output. The `StationaryStatusCheck` query processes events from `InputGeoStream`, which consists of a geofence ID, geographical coordinates (`longitude`, `latitude`), and a radius. It uses the `geo:stationary(geofenceId, longitude, latitude, radius)` function in the FROM clause of the query to check if each geofence is stationary within its specified radius. The result, along with the geofence ID, is inserted into `OutputGeoStream`.
