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
geo:disjoint( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} )
```

The `geo:disjoint()` function takes in two GeoJSON geometries and returns `true` if they do not intersect or touch each other. Here, two polygons are specified as inputs. The first polygon is defined by the coordinates `[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]` and the second polygon is defined by the coordinates `[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]`. As the two polygons do not intersect or touch, the function returns `true`.

## Example 2

```sql
geo:disjoint(10.5, 20.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

Here, `geo:disjoint()` is used to determine if a point, given by the coordinates (10.5, 20.5), is disjoint from a specified polygon. The polygon is defined by the coordinates `[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]`. Since the point does not fall within or on the boundary of the polygon, the function returns `true`, indicating they are disjoint.

## Example 3

```sql
CREATE STREAM GeoStream (longitude double, latitude double, geoFence string);
CREATE SINK STREAM DisjointStream (isDisjoint bool);

@info(name = 'CheckDisjoint')
INSERT INTO DisjointStream
SELECT geo:disjoint(longitude, latitude, geoFence) AS isDisjoint
FROM GeoStream;
```

In this stream worker example, two streams are defined: `GeoStream` for input and `DisjointStream` for output.

The `CheckDisjoint` query operates on the `GeoStream`. Each event in this stream consists of a pair of coordinates (longitude, latitude) and a GeoJSON geometry fence represented as a string.

The function `geo:disjoint(longitude, latitude, geoFence)` is used in the query to determine if the specified coordinates are disjoint from the geometry fence. The resulting boolean value is then inserted into the `DisjointStream`.

The query continuously processes each set of coordinates and GeoJSON geometry fence from `GeoStream`, checks if they are disjoint, and feeds the boolean results into `DisjointStream`. This facilitates real-time disjoint analysis for the input stream data.
