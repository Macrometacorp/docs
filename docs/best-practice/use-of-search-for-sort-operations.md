---
sidebar_position: 50
title: Use of SEARCH for SORT operations
---

Due to known limitations, if `SORT` operation is specified in the query, indexes are not used for attributes specified in `FILTER` part. The alternative to this is to create a `SEARCH VIEW` with the required attributes. The attribute on which sort need to be done, use it as a primary sort attribute in the `SEARCH VIEW` 
Note: Only `1` attribute can be added as a `Primary Sort` attribute
```
FOR city in cities
   FILTER city.continent == "ASIA" AND
          city.country == "CHINA" AND
          city.type == "RURAL" AND
          city.population > 40000
   SORT city.population DESC     
   return { city : city}

/* 
 * Query on Search view with SEARCH 
 * Search VIEW is created with the required attributes.
 * Add PrimarySort with the required attribute and order
 */
FOR city in CITIES_VIEW
   SEARCH ANALYZER(city.continent == "ASIA" AND
          city.country == "CHINA" AND
          city.type == "RURAL" AND
          city.population > 40000 ), "identity")
   return { city : city}
```