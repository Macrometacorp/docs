---
sidebar_position: 50
title: Geospatial Search
---

Geospatial search is a less frequently found but very useful feature when it comes to implementing geography-related information processing in general data analytics applications. Traditionally a special class of information systems called Geographic Information Systems (GIS) have been used to deal with spatial data extensively. However, NoSQL data store such as Macrometa GDN has the capability of storing and searching on spatial data which has become very useful when developing applications where geospatial search has become one of the requirements of the complete application.

Macrometa GDN supports geospatial queries such as finding coordinates and shapes within a radius or an area. 

## Geospatial Datasets

In order to tryout geospatial search capabilities of Macrometa GDN we have selected two datasets from Seattle metropolis of the USA. The [first](https://github.com/Macrometacorp/datasets/blob/master/geospatial-search/city.json) is a map of council districts of the Seattle city. The [second](https://github.com/Macrometacorp/datasets/blob/master/geospatial-search/schools.json) dataset corresponds to public schools of Seattle. These two refined datasets were obtained from the [DATA.GOV](http://DATA.GOV) website.

```bash
curl --location --request POST 'https://<HOST>/_fabric/SeattleSchools/_api/import/schools' \
--header 'Authorization: <BEARER_TOKEN>' \
--header 'Accept: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "data": [
{ "type": "Feature", "properties": { "OBJECTID": 1, "TYPE": "NonStandard", "SCHOOL": "QUEEN ANNE GYM", "ADDRESS": "1431 2nd Ave N", "SE_ANNO_CAD_DATA": "null", "NAME": "Queen Anne Gym", "GRADE": "9-12", "CITY": "Seattle", "ZIP": "98109", "PHONE": "null", "WEBSITE": "null", "XCOORD": 1265680.67393531, "YCOORD": 234243.29115321999, "SITE_USE": "Active", "PRJ_ENRLLMNT": "null" }, "geometry": { "type": "Point", "coordinates": [ -122.353265218350501, 47.632022747314181 ] } }
],
  "details": false,
  "primaryKey": "",
  "replace": false
}'
```

The following example shows insertion of only one data item using the cURL command for the illustration purposes. However, one needs to replace [] of "data" element with the content from the schools file before running the following sample queries. Furthermore, `HOST` and BEARER_TOKEN` values have to be replaced similar to the previous examples.

```bash
curl --location --request POST 'https://<HOST>/_fabric/SeattleSchools/_api/import/city' \
--header 'Authorization: <BEARER_TOKEN>' \
--header 'Accept: application/json' \
--header 'Content-Type: text/plain' \
--data-raw '{
  "data": <DATA>,
  "details": false,
  "primaryKey": "",
  "replace": false
}'
```

Before running the next cURL example, we need to replace the label `DATA` with the complete content from Seattle's council districts data file.

First, we will execute a query to identify all the schools which are located within 1,000 meters of Saint George Church. This can be specified as follows, 

```sql
LET loc = GEO_POINT(-122.31551191249362, 47.55458207164884)
FOR x IN schools
  FILTER GEO_DISTANCE(loc, x.geometry) <= 1000
  RETURN x.properties.NAME
```

This should result in two schools named Cleveland STEM and Maple. These two schools along with the Saint George Church can be visualized on a map as shown in Figure 3.

![Visualization of geospatial query results](/img/search/map.png)