---
title: closestPoints (Stream Function)
---

Returns the closest coordinate to `geo.json.geometry.fence`.

### Syntax

```sql
geo:closestPoints(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description   | Possible Data Types | Optional | Dynamic |
|-------------------|---------------|---------------------|----------|---------|
| longitude    | Longitude of the geo location.     | DOUBLE       | No       | No     |
| latitude | Latitude of the geo location.  | DOUBLE         | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String| No      | No     |

## Extra Return Attributes

| Name             | Description   | Possible Data Types |
|-------------------|--------------------|---------------|
| closestPointOf1From2Latitude 	  | closest point's latitude to the fence from the location.    |   DOUBLE  |
| closestPointOf1From2Longitude   | closest point's longitude to the fence from the location.   |   DOUBLE  |
| closestPointOf2From1Latitude   | closest point's latitude to the location from the fence.    |   DOUBLE  |
| closestPointOf2From1Longitude  | closest point's longitude to the location from the fence.    |   DOUBLE  |

## Example 1

```sql
geo:closestPoints(0.5, 0.5, "{'type':'Polygon','coordinates':[[[0, 0],[0, 2],[2, 2],[2, 0],[0, 0]]]}")
```

The `geo:closestPoints()` function identifies the closest points on the specified polygon from the given point (0.5, 0.5). The polygon is defined by the coordinates `[[0, 0],[0, 2],[2, 2],[2, 0],[0, 0]]`. The function returns `0.5, 0.5, 0.5, 0.5` as the nearest points on the polygon from the reference point.

## Example 2

```sql
CREATE STREAM InputGeoStream (longitude double, latitude double, geoJsonFence string);
CREATE SINK STREAM OutputGeoStream (closestPointOf1From2Latitude double, closestPointOf1From2Longitude double, closestPointOf2From1Latitude double, closestPointOf2From1Longitude double);

@info(name = 'closestPoints')
INSERT INTO OutputGeoStream
SELECT closestPointOf1From2Latitude, closestPointOf1From2Longitude, closestPointOf2From1Latitude, closestPointOf2From1Longitude
FROM InputGeoStream#geo:closestPoints(longitude, latitude, geoJsonFence);
```

In this stream worker example, `InputGeoStream` is created to feed input data and `OutputGeoStream` is set up to receive the output.

The query `closestPoints` listens for events from `InputGeoStream`, each of which contains geographical coordinates (`longitude`, `latitude`), and a GeoJSON fence (`geoJsonFence`).

The `geo:closestPoints(longitude, latitude, geoJsonFence)` function is then applied to these events. This function computes the closest points between the provided geographic location and the GeoJSON fence. It returns the latitude and longitude of the closest point on the fence from the location (`closestPointOf1From2Latitude`, `closestPointOf1From2Longitude`) and the closest point on the location from the fence (`closestPointOf2From1Latitude`, `closestPointOf2From1Longitude`).

The resulting four attributes are then forwarded to the `OutputGeoStream`. The process continually updates `OutputGeoStream` with the closest points for each incoming event from `InputGeoStream`.
