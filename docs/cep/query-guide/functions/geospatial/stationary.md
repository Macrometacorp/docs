---
title: stationary (Stream Processor)
---

Determines if the specified object or location becomes stationary within a specified radius. Returns `false` when the object moves out of the specified radius.

This function will return `true` when the object (defined in terms of longitude and latitude) becomes stationary within the specified radius. Returns `false` when the object moves out of the specified radius.

## Syntax

```sql
<BOOL> geo:stationary(<STRING> id, <DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence, <DOUBLE> radius)
```

## Query Parameters

| Name              | Description      | Possible Data Types | Optional | Dynamic |
|-------------------|-------------------------------|---------------------|----------|---------|
| id  | ID of the specified object.           | STRING       | No       | No     |
| longitude  | Longitude value of the geo location.           | DOUBLE       | No       | No     |
| latitude | Latitude value of the geo location.     | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | STRING       | No      | No     |
| radius      | Proximity distance (radial). | DOUBLE     | No      | No     |

## Example 1

```sql
@info(name = 'query1')
geo:stationary(km-4354,0,0, 110574.61087757687)
```

This example returns `true` because the given geofence with ID `km-4354` is considered stationary within the given radius of `110574.61087757687` from the reference point `(0, 0)`.
