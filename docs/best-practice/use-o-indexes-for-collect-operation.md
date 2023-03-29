---
sidebar_position: 50
title: Use of indexes for COLLECT operation
---

If there is a `COLLECT` operation in the query, the records with similar attribute values are grouped.  Persistent index on the attribute value on which `COLLECT` operation is performed helps to optimize the query. In the following example, the persistent index on the `country` attribute will help to optimize the query.

```
FOR p IN players
  COLLECT country = p.country
  RETURN {
    "country" : country
  }
```