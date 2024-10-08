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
geo:contains(0.5, 0.5, {'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]} )
```

The `geo:contains()` function checks whether the provided point (0.5, 0.5) lies within the defined polygon. The polygon's vertices are `[[0,0],[0,2],[1,2],[1,0],[0,0]]`. As the point is inside the polygon, the function returns `true`.

## Example 2

```sql
geo:contains( {'type': 'Circle', 'radius': 110575, 'coordinates':[1.5, 1.5]} , {'type':'Polygon','coordinates':[[[0,0],[0,4],[3,4],[3,0],[0,0]]]} )
```

In this case, `geo:contains()` function evaluates whether the specified circle, centered at coordinates (1.5, 1.5) with a radius of 110575, is completely enclosed by the polygon delineated by the vertices `[[0,0],[0,4],[3,4],[3,0],[0,0]]`. Given that the circle fits entirely within the polygon, the function returns `true`.

## Example 3

```sql
CREATE STREAM InputGeoStream (pointLongitude double, pointLatitude double, geoJsonFence string);
CREATE SINK STREAM OutputGeoStream (isContained bool);

@info(name = 'geoContainmentCheck')
INSERT INTO OutputGeoStream
SELECT geo:contains(pointLongitude, pointLatitude, geoJsonFence) AS isContained
FROM InputGeoStream;
```

In this stream worker example, `InputGeoStream` is created to feed input data, which includes the geographical coordinates (`pointLongitude`, `pointLatitude`), and a GeoJSON fence (`geoJsonFence`). The `OutputGeoStream` is then set up to receive the output.

The query named `geoContainmentCheck` listens for events from the `InputGeoStream` and applies the function `geo:contains(pointLongitude, pointLatitude, geoJsonFence)` to each event. This function checks whether the specified coordinates (`pointLongitude`, `pointLatitude`) lie within the boundaries defined by the `geoJsonFence`. The function returns `true` if the coordinates are contained within the fence and `false` otherwise. 

The output, a boolean value named `isContained`, is then forwarded to `OutputGeoStream`. In essence, this query is continually assessing the containment of the provided geographical points within the GeoJSON fence for each incoming event from `InputGeoStream` and updating `OutputGeoStream` accordingly.
