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
@info(name = 'query1')
geo:intersects( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]} )
```

This example returns `true` because the `geo.json.geometry` (the first polygon) intersects with the `geo.json.geometry.fence` (the second polygon). The `geo:intersects()` function checks if the two geometries have any points in common, and in this case, the two polygons share some common area, so the function returns `true`.

## Example 2

```sql
@info(name = 'query1')
geo:intersects(0.5. 0.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

This example returns `true` because the coordinates intersect with `geo.json.geometry.fence`.
