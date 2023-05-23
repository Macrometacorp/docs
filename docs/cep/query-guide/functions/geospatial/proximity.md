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
geo:proximity(1, 0, 0, 110574.61087757687)
```

The `geo:proximity()` function is used to determine if the point (1, 0) lies within the radius of 110574.61087757687 units from the reference point (0, 0). It returns `true`, indicating that the point is indeed within the given radius from the reference location.

## Example 2

```sql
geo:proximity(2, 0, 0, 110574.61087757687)
```

In this case, the `geo:proximity()` function checks if the point (2, 0) lies within the radius of 110574.61087757687 units from the reference point (0, 0). The function returns `false` as the point is not within the given radius from the reference point.

## Example 3

```sql
CREATE STREAM InputGeoStream (longitude1 double, latitude1 double, longitude2 double, latitude2 double, radius double);
CREATE SINK STREAM OutputGeoStream (proximityResult bool);

@info(name = 'proximityCheck')
INSERT INTO OutputGeoStream
SELECT "id" AS id, proximity 
FROM InputGeoStream#geo:proximity(longitude1, latitude1, longitude2, latitude2, radius);
```

The `proximityCheck` processes events from the `InputGeoStream`. The stream includes pairs of geographical coordinates (`longitude1`, `latitude1`), a reference pair of geographical coordinates (`longitude2`, `latitude2`), and a radius. The `geo:proximity(longitude1, latitude1, longitude2, latitude2, radius)` function is used to determine if the first point lies within the given radius from the second point. The result is then forwarded as an event to the `OutputGeoStream`.
