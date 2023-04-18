---
title: withinDistance (Function)
---
Two available sets of parameters:

- First set returns `true` if the specified coordinates are within a given distance of the `geo.json.geometry.fence`.
- Second set returns `true` if the area specified by `geo.json.geometry` is within a given distance of the `geo.json.geometry.fence`.

## Syntax

```sql
<BOOL> geo:withinDistance(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)
<BOOL> geo:withinDistance(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence,  <DOUBLE> radius)
```

## Query Parameters

| Name  | Description      | Possible Data Types | Optional | Dynamic |
|-------|------------------|---------------------|----------|---------|
| longitude 	    | Longitude of the geo location.      | Double       | Yes       | Yes     |
| latitude | Latitude of the geo location.      | Double    | Yes      | Yes     |
| geo.json.geometry    | String that contains geometry type and coordinates for a GeoJSON geometry. | String    | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String   | No      | Yes     |
| radius        | The distance parameter. | DOUBLE    | No      | Yes     |

## Example 1

```sql
@info(name = 'query1')
geo:withinDistance( 0.5 , 0.5, {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)
```

This example returns `true` because the coordinates (0.5, 0.5) are within the specified radius of 110574.61087757687 meters from the `geo.json.geometry.fence`. The point lies inside the polygon, and therefore, is definitely within the given distance.

## Example 2

```sql
@info(name = 'query1')
geo:withinDistance( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)
```

This example returns `true` because the `geo.json.geometry` represented by the first polygon is within the specified radius of 110574.61087757687 meters from the `geo.json.geometry.fence` represented by the second polygon. The two polygons overlap, which means they are within the given distance.
