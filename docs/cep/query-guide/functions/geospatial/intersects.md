---
title: intersects (Function)
---

Two available sets of parameters:

- First set returns `true` if the incoming `geo.json.geometry` event intersects the given `geo.json.geometryFence`.
- Second set returns `true` if the specified coordinates intersect the given `geo.json.geometryFence`.

## Syntax

```sql
<BOOL> geo:intersects(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:intersects(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description                 | Possible Data Types | Optional | Dynamic |
|-------------|-----------------------------------|---------------------|----------|---------|
| longitude 	   | Longitude of the geo location.        | Double      | Yes       | Yes     |
| latitude | Latitude of the geo location.        | Double             | Yes      | Yes     |
| geo.json.geometry      | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING        | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String       | No      | Yes     |

## Example 1

```sql
geo:disjoint( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
```

The `geo:disjoint()` function checks if the two given polygons are disjoint, that is, they don't intersect or touch each other. The first polygon has vertices `[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]`, and the second one `[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]`. As the polygons don't intersect or overlap, the function returns `true`.

## Example 2

```sql
geo:disjoint(10.5, 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

Here, the `geo:disjoint()` function checks if the point (10.5, 20.5) is disjoint from the polygon defined by `[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]`. The point isn't inside or on the border of the polygon, so the function returns `true`.

## Example 3

```sql
CREATE STREAM InputGeoStream (geoJsonFence1 string, geoJsonFence2 string);
CREATE SINK STREAM OutputGeoStream (isDisjoint boolean);

@info(name = 'disjointnessCheck')
INSERT INTO OutputGeoStream
SELECT geo:disjoint(geoJsonFence1, geoJsonFence2) 
FROM InputGeoStream;
```

In this example, `disjointnessCheck` processes events from `InputGeoStream`, which contains two GeoJSON fences (`geoJsonFence1`, `geoJsonFence2`). The query uses the `geo:disjoint(geoJsonFence1, geoJsonFence2)` function to check if the fences are disjoint. The result is then sent as an event to `OutputGeoStream`.
