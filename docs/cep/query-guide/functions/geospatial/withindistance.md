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
geo:withinDistance( 0.5 , 0.5, {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)
```

In this example, the `geo:withinDistance()` function checks if the given point (0.5, 0.5) is within a certain distance from the specified polygon defined by the coordinates `[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]`. The distance specified is 110574.61087757687 meters. As the point lies within the polygon, it is indeed within the given distance, so the function returns `true`.

## Example 2

```sql
geo:withinDistance( {'type':'Polygon','coordinates':[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]} , {'type':'Polygon','coordinates':[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]}, 110574.61087757687)
```

In this example, the `geo:withinDistance()` function checks if the first polygon, defined by the coordinates `[[[0.5, 0.5],[0.5, 1.5],[1.5, 1.5],[1.5, 0.5],[0.5, 0.5]]]`, is within a certain distance from the second polygon defined by the coordinates `[[[0, 0],[0, 1],[1, 1],[1, 0],[0, 0]]]`. The distance specified is 110574.61087757687 meters. Given that the two polygons overlap, they are indeed within the specified distance of each other, so the function returns `true`.

## Example 3

```sql
CREATE STREAM InputGeoStream (longitude float, latitude float, geoJsonFence string, radius double);
CREATE SINK STREAM OutputGeoStream (withinDistanceStatus bool);

@info(name = 'WithinDistanceStatusCheck')
INSERT INTO OutputGeoStream
SELECT geo:withinDistance(longitude, latitude, geoJsonFence, radius)
FROM InputGeoStream;
```

In this stream worker example, the `WithinDistanceStatusCheck` query processes events from the `InputGeoStream`, which includes geographical coordinates (`longitude`, `latitude`), a GeoJSON fence (`geoJsonFence`), and a radius. The query uses the `geo:withinDistance(longitude, latitude, geoJsonFence, radius)` function to check if the given point is within the specified distance from the GeoJSON fence. The distance status is then sent to the `OutputGeoStream` for each processed event.
