---
title: Projection Queries
---

You can return a projection of the documents in `OLD` or `NEW` instead of returning the entire documents. This can be used to reduce the amount of data returned by queries.

For example, the following query will return only the keys of the inserted documents:

```js
FOR i IN 1..100
    INSERT { value: i } IN test 
    RETURN NEW._key
```

## Using OLD and NEW in the same query

For `UPDATE`, `REPLACE` and `UPSERT` statements, both `OLD` and `NEW` can be used to return the previous revision of a document together with the updated revision:

```js
FOR u IN users
    FILTER u.status == "not active"
    UPDATE u WITH { status: "inactive" } IN users 
    RETURN { old: OLD, new: NEW }
```

## Calculations with OLD or NEW

It is also possible to run additional calculations with `LET` statements between the data-modification part and the final `RETURN` of a C8QL query. 

For example, the following query performs an upsert operation and returns whether an existing document was updated, or a new document was inserted. It does so by checking the `OLD` variable after the `UPSERT` and using a `LET` statement to store a temporary string for the operation type:
  
```js
UPSERT { name: "test" }
    INSERT { name: "test" }
    UPDATE { } IN users
LET opType = IS_NULL(OLD) ? "insert" : "update"
RETURN { _key: NEW._key, type: opType }
```
