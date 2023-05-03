---
title: proximity (Stream Processor)
---

Determines if the specified object or location is within the radius of another object. Returns false when the object moves out of the specified radius.

## Syntax

```sql
<BOOL> geo:proximity(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)
```

## Query Parameters

| Name              | Description    | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------------------|---------------------|----------|---------|
| id  | ID of the specified object.         | STRING       | No       | No     |
| longitude  | Longitude of the geo location.         | DOUBLE       | No       | No     |
| latitude | Latitude of the geo location.                  | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING                | No      | No     |
| radius          | Proximity distance (radial). | DOUBLE                | No      | No     |

## Example 1

```sql
@info(name = 'query1')
geo:proximity(1, 0, 0, 110574.61087757687)
```

This example returns `true` because the coordinates `(1, 0)` are within the given radius of `110574.61087757687` from the reference point `(0, 0)`.
