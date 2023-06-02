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
geo:equals( 
    {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , 
    {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]}
)
```

The `geo:equals()` function in this query is used to compare two GeoJSON geometries to check if they are equal. In this specific case, it compares two polygons. The first polygon is defined by the coordinates `[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]` and the second one is defined by `[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]`. The function returns `false` because these two polygons do not have the same coordinates, hence they are not equal.

## Example 2

```sql
geo:equals(10.5, 20.5, {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

This query uses the `geo:equals()` function to compare a point specified by its coordinates (10.5, 20.5) with a GeoJSON polygon defined by the coordinates `[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]`. The function checks if the point and the polygon are equal, which in this case they are not, as they don't share the same type (point vs polygon) and identical coordinates, hence the function returns `false`.

## Example 3

```sql
CREATE STREAM GeoStream (geometry1 string, geometry2 string);
CREATE SINK STREAM EqualsStream (isEqual boolean);

@info(name = 'CheckGeometryEquality')
INSERT INTO EqualsStream
SELECT geo:equals(geometry1, geometry2) AS isEqual
FROM GeoStream;
```

This stream worker example has two streams: `GeoStream` for input and `EqualsStream` for output. The `GeoStream` is set to receive pairs of GeoJSON geometries.

The 'CheckGeometryEquality' query operates on the `GeoStream`. For each event in this stream, the `geo:equals(geometry1, geometry2)` function compares the two provided GeoJSON geometries to see if they are equal. The result of this comparison, a boolean value indicating whether the geometries are equal, is then inserted into the `EqualsStream`.

This stream worker can be used for continuous real-time comparisons of GeoJSON geometries received in the `GeoStream`.
