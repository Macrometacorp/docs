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
CREATE STREAM InputGeoStream (pointLongitude float, pointLatitude float, geoJsonFence string);
CREATE SINK STREAM OutputGeoStream (isContained boolean);

@info(name = 'geoContainmentCheck')
INSERT INTO OutputGeoStream
SELECT geo:contains(pointLongitude, pointLatitude, geoJsonFence) 
FROM InputGeoStream;
```

In this example, the `geoContainmentCheck` processes events from the `InputGeoStream`, consisting of geographical coordinates (`pointLongitude`, `pointLatitude`) and a GeoJSON fence (`geoJsonFence`). The `geo:contains(pointLongitude, pointLatitude, geoJsonFence)` function is used to verify if the specified point is within the GeoJSON fence. The query then outputs this boolean result for each event to the `OutputGeoStream`.
