---
title: contains (Function)
---

Two available sets of parameters:

- First set returns `true` if the specified coordinates are contained within the `geo.json.geometry.fence`.
- Second set returns `true` if the `geo.json.geometry` is contained within the `geo.json.geometry.fence`.

## Syntax

```sql
<BOOL> geo:contains(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:contains(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description                   | Possible Data Types | Optional | Dynamic |
|------------|--------------------------------------|---------------------|----------|---------|
| longitude    | Longitude of the geo location.         | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.        | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING        | Yes      | Yes     |
| geo.json.geometry.fence       | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String      | No      | Yes     |

## Example 1

```sql
@info(name = 'query1')
geo:contains(0.5, 0.5, {'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]} )
```

In this example, the `geo:contains()` function is used to determine whether the given point (0.5, 0.5) is within the specified polygon. The polygon is represented by the coordinates `[[0,0],[0,2],[1,2],[1,0],[0,0]]`. The function returns `true` because the point is indeed within the polygon, which is represented as a `geo.json.geometry.fence`.

## Example 2

```sql
@info(name = 'query1')
geo:contains( {'type': 'Circle', 'radius': 110575, 'coordinates':[1.5, 1.5]} , {'type':'Polygon','coordinates':[[[0,0],[0,4],[3,4],[3,0],[0,0]]]} )
```

In this example, the `geo:contains()` function is used to determine whether the specified circle, with a center at coordinates (1.5, 1.5) and radius of 110575, is entirely within the specified polygon represented by the coordinates `[[0,0],[0,4],[3,4],[3,0],[0,0]]`. The function returns `true` because the circle is indeed contained within the polygon, which is represented as a `geo.json.geometry.fence`.
