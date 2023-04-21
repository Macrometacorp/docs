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
@info(name = 'query1')
geo:overlaps( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
```

This example demonstrates the usage of `geo:overlaps()` function, which checks whether two geometries overlap. In this case, the function takes two Polygon geometries as input: the first one with coordinates [[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]], and the second one with coordinates [[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]. The function returns `false` because the two geometries do not overlap.

## Example 2

```sql
@info(name = 'query1')
geo:overlaps(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

This example demonstrates the usage of `geo:overlaps()` function, which checks whether two geometries overlap. In this case, the function takes a point with coordinates (10.5, 20.5) and a Polygon geometry with coordinates [[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]. The function returns `false` because the point does not overlap with the Polygon geometry.
