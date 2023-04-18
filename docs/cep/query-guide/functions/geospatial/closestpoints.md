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

## Example

```sql
@info(name = 'query1')
geo:closestPoints(0.5,0.5,"{'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]}")
```

In this example, the `geo:closestPoints()` function is used to find the closest points on a given polygon to a specified point. The input point is (0.5, 0.5), and the polygon is represented by the coordinates `[[0,0],[0,2],[1,2],[1,0],[0,0]]`. The function returns the closest points `0.5, 0.5, 0.5, 0.5` as the result.
