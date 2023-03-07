---
title: closestPoints (Stream Function)
---

Returns the closest coordinate to `geo.json.geometry.fence`.

### Syntax

    geo:closestPoints(<DOUBLE> longitude, <DOUBLE> latitude, <STRING> geo.json.geometry.fence)

## Query Parameters

| Name              | Description   | Possible Data Types | Optional | Dynamic |
|-------------------|---------------------------------------------------------------|---------------------|----------|---------|
| longitude 	              | Longitude of the geo location.         | DOUBLE       | No       | No     |
| latitude | Latitude of the geo location.  | DOUBLE              | No      | No     |
| geo.json.geometry.fence         | String that contains geometry type and coordinates for a GeoJSON geometry fence. | String| No      | No     |

## Extra Return Attributes

| Name              | Description   | Possible Data Types |
|-------------------|----------------------------------------------------------------|---------------|
| closestPointOf1From2Latitude 	  | closest point's latitude to the fence from the location.       |   DOUBLE            |
| closestPointOf1From2Longitude   | closest point's longitude to the fence from the location.       |   DOUBLE            |
| closestPointOf2From1Latitude   | closest point's latitude to the location from the fence.       |   DOUBLE            |
| closestPointOf2From1Longitude  | closest point's longitude to the location from the fence.       |   DOUBLE            |

## Example

    geo:closestPoints(0.5,0.5,"{'type':'Polygon','coordinates':[[[0,0],[0,2],[1,2],[1,0],[0,0]]]}")

This example returns `0.5, 0.5, 0.5, 0.5`.
