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

In this stream worker example, two streams are created: `InputGeoStream` for input data and `OutputGeoStream` for the output.

The `InputGeoStream` consists of `longitude` and `latitude` representing the geographical coordinates of a location, and `geoJsonFence`, which is a GeoJSON string that contains the geometry type and coordinates of a geographical fence.

The `OutputGeoStream` is set to receive the attributes `closestPointOf1From2Latitude`, `closestPointOf1From2Longitude`, `closestPointOf2From1Latitude`, and `closestPointOf2From1Longitude`, which respectively represent the closest point's latitude and longitude to the fence from the location and the closest point's latitude and longitude to the location from the fence.

The `closestPoints` query is defined to select and process events from the `InputGeoStream` using the function `geo:closestPoints(longitude, latitude, geoJsonFence)`. This function calculates the closest points between the provided location and the defined GeoJSON fence. 

The result of this function, which consists of the coordinates of the closest points between the location and the GeoJSON fence, is then inserted into the `OutputGeoStream`. This stream now holds the resulting closest point data for each processed event from the `InputGeoStream`. 

In summary, this streaming data setup provides a mechanism to continually evaluate geographical data (longitude, latitude) against a GeoJSON-defined fence and output the closest points between the location and the fence.
