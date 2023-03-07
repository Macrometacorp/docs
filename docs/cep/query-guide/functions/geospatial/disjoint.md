---
title: disjoint (Function)
---

Two available sets of parameters:

- First set returns `true` if the incoming `geo.json.geometry` event is disjointed from the given `geo.json.geometryFence`.
- Second set returns `true` if the specified coordinates are disjointed from the given `geo.json.geometryFence`.

## Syntax

    <BOOL> geo:disjoint(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
    <BOOL> geo:disjoint(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)

## Query Parameters

| Name              | Description                   | Possible Data Types | Optional | Dynamic |
|------------|------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.         | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.                  | DOUBLE              | Yes      | Yes     |
| geo.json.geometry          | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING                | Yes      | Yes     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String                | No      | Yes     |

## Example 1

    geo:disjoint( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )

This example returns `true` because `geo.json.geometry` is disjointed from `geo.json.geometry.fence`.

## Example 2

    geo:disjoint(10.5. 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})

This example returns `true` because the coordinates are disjointed from `geo.json.geometry.fence`.
