---
title: overlaps (Function)
---

Two available sets of parameters:

- First set returns `true` if the incoming `geo.json.geometry` event overlaps the given `geo.json.geometryFence`.
- Second set returns `true` if the specified coordinates overlap the given `geo.json.geometryFence`.

## Syntax

```sql
<BOOL> geo:overlaps(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:overlaps(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description                | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------|---------------------|----------|---------|
| longitude     | Longitude of the geo location.         | Double       | Yes       | Yes     |
| latitude | Latitude of the geo location.           | Double              | Yes      | Yes     |
| geo.json.geometry     | String that contains geometry type and coordinates for a GeoJSON geometry. | String        | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String     | No      | Yes     |

## Example 1

```sql
geo:overlaps( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
```

The `geo:overlaps()` function checks if two geometries overlap. Here, it compares two Polygon geometries: one with coordinates `[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]` and another with coordinates `[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]`. The function returns `false`, indicating that the two polygons do not overlap.

## Example 2

```sql
geo:overlaps(10.5, 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

The `geo:overlaps()` function is used here to check if a point overlaps with a polygon. The function takes a point with coordinates (10.5, 20.5) and a Polygon geometry with coordinates `[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]`. The function returns `false` because the point does not overlap with the Polygon geometry.

## Example 3

```sql
CREATE STREAM InputGeoStream (geometry1 string, geometry2 string);
CREATE SINK STREAM OutputGeoStream (overlapResult bool);

@info(name = 'overlappingGeometries')
INSERT INTO OutputGeoStream
SELECT geo:overlaps(geometry1, geometry2) AS overlapResult
FROM InputGeoStream;
```

The `overlappingGeometries` query processes events from the `InputGeoStream`, which contains two geometries (`geometry1` and `geometry2`). It uses the `geo:overlaps(geometry1, geometry2)` function to check if these geometries overlap. The result of the overlap check is then sent as an event to the `OutputGeoStream`.
