---
title: intersects (Function)
---

Two available sets of parameters:

- First set returns `true` if the incoming `geo.json.geometry` event intersects the given `geo.json.geometryFence`.
- Second set returns `true` if the specified coordinates intersect the given `geo.json.geometryFence`.

## Syntax

    <BOOL> geo:intersects(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:intersects(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)

## Query Parameters

| Name              | Description                   | Possible Data Types | Optional | Dynamic |
|-------------|------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.         | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                  | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |

## Example 1

    geo:intersects( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]} )

This example returns `true` because `geo.json.geometry` intersects with `geo.json.geometry.fence`.

## Example 2

    geo:intersects(0.5. 0.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})

This example returns `true` because the coordinates intersect with `geo.json.geometry.fence`.
