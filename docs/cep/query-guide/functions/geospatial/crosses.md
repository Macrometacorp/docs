---
title: crosses (Stream Processor)
---

Determines if the specified object or location crosses a geographic location specified by `geo.json.geometry.fence`.

## Syntax

```sql
<BOOL> geo:crosses(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)
<BOOL> geo:crosses(<STRING> id, <STRING> geo.json.geometry, <STRING> geo.json.geometry.fence)
```

## Query Parameters

| Name              | Description              | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------|-------------------|----------|---------|
| id 	     | Location ID.         | STRING       | No       | No     |
| longitude 	     | Longitude of the geo location.         | DOUBLE       | Yes       | No     |
| latitude | Latitude of the geo location.                  | DOUBLE              | Yes      | No     |
| geo.json.geometry     | String that contains geometry type and coordinates for a GeoJSON geometry. | STRING        | Yes      | No     |
| geo.json.geometry.fence     | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING    | No      | No     |

## Example 1

```sql
FROM InputStream#geo:crosses('km-4354', -0.5, 0.5, '{"type":"Polygon","coordinates":[[[0, 0],[2, 0],[2, 1],[0, 1],[0, 0]]]}') AS crosses;
```

This query uses the `geo:crosses()` function to determine if a line, defined by the coordinates `(-0.5, 0.5)` and `(km-4354)`, crosses the specified polygon. The polygon is represented as a GeoJSON string with coordinates `[[0, 0], [2, 0], [2, 1], [0, 1], [0, 0]]`.

## Example 2

```sql
CREATE STREAM InputStream (lineStart double, lineEnd double);
CREATE SINK STREAM OutputStream (crosses bool);

@info(name = 'geoCrossesQuery')
INSERT INTO OutputStream
SELECT *
FROM InputStream#geo:crosses(lineStart, -0.5, 0.5, '{"type":"Polygon","coordinates":[[[0, 0],[2, 0],[2, 1],[0, 1],[0, 0]]]}') AS crosses;
```

In this example, an input stream called `InputStream` is created with two attributes, `lineStart` and `lineEnd`, representing the start and end points of a line. Then, an output stream called `OutputStream` is defined, which will contain a boolean value indicating whether the line crosses the specified polygon.

The `geoCrossesQuery` processes events from the `InputStream`. It uses the `geo:crosses()` function to determine if a line, defined by the `lineStart` and `lineEnd` attributes from the `InputStream`, crosses the specified polygon. The result is assigned to the `crosses` attribute in the `OutputStream`.

The query outputs a boolean value indicating whether the line crosses the polygon for each event to the `OutputStream`.
