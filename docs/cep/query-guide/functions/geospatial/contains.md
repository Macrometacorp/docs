---
title: contains (Function)
---

Two available sets of parameters:

- First set returns `true` if the specified coordinates are contained within the `geo.json.geometry.fence`.
- Second set returns `true` if the `geo.json.geometry` is contained within the `geo.json.geometry.fence`.

## Syntax

    <BOOL> geo:contains(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:contains(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)

## Query Parameters

| Name              | Description                   | Possible Data Types | Optional | Dynamic |
|------------|----------------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.         | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                  | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |

## Example 1

    geo:contains(0.5, 0.5, {'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]} )

This example returns `true` because the coordinates are within the `geo.json.geometry.fence`.

## Example 2

    geo:contains( {'type': 'Circle', 'radius': 110575, 'coordinates':[1.5, 1.5]} , {'type':'Polygon','coordinates':[[[0,0],[0,4],[3,4],[3,0],[0,0]]]} )

This example returns `true` because `geo.json.geometry` is within `geo.json.geometry.fence`.
