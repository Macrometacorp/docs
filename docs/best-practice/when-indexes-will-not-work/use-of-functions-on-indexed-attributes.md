---
sidebar_position: 50
title: Use of functions on indexed attributes
---

If there is a DB function used on the indexed attribute, index metadata is not used to optimize the query. In the following example, the `LOWER` function is used on attributes `continent` and `city`. Due to this even if there are indexes created on these attributes, those will not be used.

```
 FOR city in cities
   FILTER LOWER(city.continent) == "ASIA" AND
          LOWER(city.country) == "CHINA" AND
          city.population > 40000  
   return { city : city}
```