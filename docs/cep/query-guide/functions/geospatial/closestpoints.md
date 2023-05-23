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
CREATE STREAM InputGeoStream (longitude float, latitude float, geoJsonFence string);
CREATE SINK STREAM OutputGeoStream (closestPointOf1From2Latitude float, closestPointOf1From2Longitude float, closestPointOf2From1Latitude float, closestPointOf2From1Longitude float);

@info(name = 'closestPoints')
INSERT INTO OutputGeoStream
SELECT geo:closestPoints(longitude, latitude, geoJsonFence) 
FROM InputGeoStream;
```

In this example, the `closestPoints` processes events from the `InputGeoStream`, which consists of the geographical coordinates (`longitude`, `latitude`) and a GeoJSON fence (`geoJsonFence`). It uses the `geo:closestPoints(longitude, latitude, geoJsonFence)` function to determine the closest points on the fence from the provided location. The query then sends these points as attributes for each event to the `OutputGeoStream`.
