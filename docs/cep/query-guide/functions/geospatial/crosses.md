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
CREATE STREAM dataInForGeoCrossesStream (id string, longitude double, latitude double, timestamp long);
CREATE SINK STREAM dataOutForGeoCrossesStream (id string, crosses  bool);
CREATE TRIGGER GeoCrossesTrigger WITH(interval = 5 sec);

@info(name = 'generateGeoCrossesData')
INSERT INTO dataInForGeoCrossesStream
SELECT  "12" AS id, 6.876657 AS longitude, 79.897648 AS latitude,  eventTimestamp() AS timestamp
FROM GeoCrossesTrigger;

@info(name = 'geoCrossesQuery')
INSERT INTO dataOutForGeoCrossesStream
SELECT "id" AS id, crosses AS crosses
FROM dataInForGeoCrossesStream#geo:crosses("12", 0.5, 0.5,"{'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]}");

```

In this example, a stream `dataInForGeoCrossesStream` is created with the following attributes: id, longitude, latitude, and timestamp. A sink stream, `dataOutForGeoCrossesStream`, is created to store the output data, which includes id and a boolean value `crosses` to indicate whether the given point crosses the defined polygon.

A trigger named `GeoCrossesTrigger` is created with a 5-second interval to periodically generate events.

The `generateGeoCrossesData` query generates a new event every 5 seconds with predefined id, longitude, and latitude values, as well as a timestamp based on the current time.

The `geoCrossesQuery` processes events from `dataInForGeoCrossesStream` and uses the `geo:crosses` function to check if the given point (longitude, latitude) crosses the specified polygon. The result is a boolean value indicating whether the point crosses the polygon. The query then inserts the id and `crosses` result into the `dataOutForGeoCrossesStream` sink stream.

Note that the given polygon coordinates in the example form a simple polygon with four vertices, and the point (0.5, 0.5) lies within this polygon.
