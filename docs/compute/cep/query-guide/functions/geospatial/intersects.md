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
geo:intersects( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]} )
```

This `geo:intersects()` function call checks whether the two given polygons intersect. The first polygon's vertices are `[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]`, and the second polygon's vertices are `[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]`. As the polygons intersect, the function returns `true`.

## Example 2

```sql
geo:intersects(0.5, 0.5 , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

Here, the `geo:intersects()` function determines whether the point (0.5, 0.5) intersects the polygon defined by `[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]`. Since the point is inside the polygon, the function returns `true`.

## Example 3

```sql
CREATE STREAM InputGeoStream (geoJsonFence1 string, geoJsonFence2 string);
CREATE SINK STREAM OutputGeoStream (intersects bool);

@info(name = 'IntersectionCheckQuery')
INSERT INTO OutputGeoStream
SELECT geo:intersects(geoJsonFence1, geoJsonFence2) AS intersects
FROM InputGeoStream;
```

In this example, the `IntersectionCheckQuery` processes events from the `InputGeoStream`, which contains two GeoJSON fences (`geoJsonFence1`, `geoJsonFence2`). The stream worker uses the `geo:intersects(geoJsonFence1, geoJsonFence2)` function to check if the fences intersect. The outcome, either `true` or `false`, is output as the `intersects` attribute for each event to the `OutputGeoStream`.
