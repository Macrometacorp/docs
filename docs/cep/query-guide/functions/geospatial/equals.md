---
title: equals (Function)
---

Two available sets of parameters:

- First set returns `true` if the incoming `geo.json.geometry` event equals the given `geo.json.geometryFence`.
- Second set returns `true` if the location pointed by longitude and latitude equals the given `geo.json.geometryFence`.

## Syntax

```sql
<BOOL> geo:equals(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:equals(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description                   | Possible Data Types | Optional | Dynamic |
|-------------------|-------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.         | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                  | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | String                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |

## Example 1

```sql
@info(name = 'query1')
geo:equals( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
```

This example returns `false` because the two provided geometries, represented by `geo.json.geometry` and `geo.json.geometry.fence`, are not equal. The `geo:equals()` function checks if the two geometries have the same type and identical coordinate values.

## Example 2

```sql
@info(name = 'query1')
geo:equals(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

This example returns `false` because the coordinates (10.5, 20.5) are not equal to the provided `geo.json.geometry.fence`. The `geo:equals()` function checks if the two geometries have the same type and identical coordinate values. In this case, the point with coordinates (10.5, 20.5) is not equal to the provided polygon.
