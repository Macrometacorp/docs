---
sidebar_position: 5
title: Indexing Scenarios
---
# When indexes will not work?

## Scenario 1: `FILTER` operation with `SORT`

Due to known limitations, if the `SORT` operation is specified in the query, indexes are not used for attributes specified in the `FILTER` part.  For example in the following query, even if there are indexes created on `continent`, `country`, and `type`, those will not be used.

```sql
FOR city in cities
   FILTER city.continent == "ASIA" AND
          city.country == "CHINA" AND
          city.type == "RURAL" AND
          city.population > 40000
   SORT city.population DESC     
   return { city : city}
```

## Scenario 2: Use of functions on indexed attributes

If there is a DB function used on the indexed attribute, index metadata is not used to optimize the query. In the following example, the `LOWER` function is used on attributes `continent` and `city`. Due to this even if there are indexes created on these attributes, those will not be used.

```sql
 FOR city in cities
   FILTER LOWER(city.continent) == "ASIA" AND
          LOWER(city.country) == "CHINA" AND
          city.population > 40000  
   return { city : city}
```

## Scenario 3:  Array operators `ANY`, `ANY IN`, `IN`, `==`

If there is an index created on array attributes then the following `FILTER` conditions will not use the array index

```
FOR doc IN posts
  FILTER 'JAPAN' IN doc.tags[*]
  RETURN doc

FILTER doc.tags ANY == 'JAPAN'
FILTER doc.tags ANY IN 'JAPAN'
FILTER doc.tags IN 'JAPAN'
FILTER doc.tags == 'JAPAN'
FILTER 'JAPAN' == doc.tags
```

[https://support.macrometa.com/hc/en-us/articles/7935771264269](https://support.macrometa.com/hc/en-us/articles/7935771264269)