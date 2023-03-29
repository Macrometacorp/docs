---
sidebar_position: 50
title: FILTER operation with SORT
---

Due to known limitations, if the `SORT` operation is specified in the query, indexes are not used for attributes specified in the `FILTER` part.  For example in the following query, even if there are indexes created on `continent`, `country`, and `type`, those will not be used.

```
FOR city in cities
   FILTER city.continent == "ASIA" AND
          city.country == "CHINA" AND
          city.type == "RURAL" AND
          city.population > 40000
   SORT city.population DESC     
   return { city : city}
```