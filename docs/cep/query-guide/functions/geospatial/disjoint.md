---
title: disjoint (Function)
---

Two available sets of parameters:

- First set returns `true` if the incoming `geo.json.geometry` event is disjointed from the given `geo.json.geometryFence`.
- Second set returns `true` if the specified coordinates are disjointed from the given `geo.json.geometryFence`.

## Syntax

```sql
<BOOL> geo:disjoint(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:disjoint(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name       | Description             | Possible Data Types | Optional | Dynamic |
|------------|-------------------------|---------------------|----------|---------|
| longitude 	   | Longitude of the geo location.     | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.       | DOUBLE        | Yes      | Yes     |
| geo.json.geometry       | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING     | Yes      | Yes     |
| geo.json.geometry.fence    | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String    | No      | Yes     |

## Example 1

```sql
@info(name = 'query1')
geo:disjoint( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
```

In this example, the `geo:disjoint()` function is used to determine whether the two specified polygons are disjoint, meaning they don't intersect or touch each other. The first polygon is defined by the coordinates `[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]`, while the second polygon is defined by the coordinates `[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]`. The function returns `true` because the two polygons are indeed disjoint and do not intersect or touch each other.

## Example 2

```sql
@info(name = 'query1')
geo:disjoint(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

In this example, the `geo:disjoint()` function is used to determine whether the specified point (10.5, 20.5) is disjoint from the specified polygon defined by the coordinates `[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]`. The function returns `true` because the point is indeed disjoint, meaning it does not lie within or on the boundary of the polygon.
