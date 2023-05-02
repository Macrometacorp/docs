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
@info(name = 'query1')
geo:crosses(km-4354, -0.5, 0.5, {'type':'Polygon','coordinates':[[[0, 0],[2, 0],[2, 1],[0, 1],[0, 0]]]} )
