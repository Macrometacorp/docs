---
title: touches (Function)
---

Two available sets of parameters:

- First set returns `true` if the incoming `geo.json.geometry` event touches the given `geo.json.geometryFence`.
- Second set returns `true` if the coordinates touch the given `geo.json.geometryFence`.

## Syntax

```sql
<BOOL> geo:touches(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:touches(<STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description   | Possible Data Types | Optional | Dynamic |
|-------------------|---------------|---------------------|----------|---------|
| longitude           | Longitude of the geo location.     | DOUBLE       | Yes       | Yes     |
| latitude | Latitude of the geo location.  | DOUBLE       | Yes      | Yes     |
| geo.json.geometry       | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING| Yes      | Yes     |
| geo.json.geometry.fence    | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String| No      | Yes     |

## Example 1

```sql
geo:touches( 
    {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]}, 
    {'type':'Polygon','coordinates':[[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]]} 
)
```

In this example, the `geo:touches()` function checks if the two given polygons share any boundary points. The first polygon is defined by the coordinates `[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]`, and the second polygon is defined by the coordinates `[[10, 10],[10, 11],[11, 11],[11, 10],[10, 10]]`. The function returns `false` because these two polygons do not share any boundary points - they do not touch each other.

## Example 2

```sql
geo:touches(10.5, 20.5, {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]})
```

This example returns `false` because the point with coordinates (10.5, 20.5) does not touch the polygon defined by the coordinates `[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]`. In other words, the point does not share any boundary points with the polygon.

## Example 3

```sql
CREATE STREAM InputGeoStream (longitude float, latitude float, geoJsonFence string);
CREATE SINK STREAM OutputGeoStream (touchesStatus bool);

@info(name = 'TouchesStatusCheck')
INSERT INTO OutputGeoStream
SELECT geo:touches(longitude, latitude, geoJsonFence)
FROM InputGeoStream;
```

In this stream worker example, the `TouchesStatusCheck` query processes events from the `InputGeoStream`, which includes geographical coordinates (`longitude`, `latitude`) and a GeoJSON fence (`geoJsonFence`). The query uses the `geo:touches(longitude, latitude, geoJsonFence)` function to check if the given point shares any boundary points with the GeoJSON fence. The touch status is then sent to the `OutputGeoStream` for each processed event.
