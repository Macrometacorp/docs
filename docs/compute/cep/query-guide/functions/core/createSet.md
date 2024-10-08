---
title: createSet (Function)
---

Includes the given input parameter in a `java.util.HashSet` and returns the set.

## Syntax

```sql
<OBJECT> createSet(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL> input)
```

## Query Parameters

| Name  | Description             | Default Value | Possible Data Types       | Optional | Dynamic |
|-------|-------------------------|---------------|-------------------------|----------|---------|
| input | The input that needs to be added into the set. |       | INT LONG DOUBLE FLOAT STRING BOOL | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO initStream
SELECT createSet(symbol) AS initialSet
FROM stockStream;
```

This query selects records from the `stockStream` and uses the `createSet` function to create a set containing unique `symbol` values. The result is aliased as `initialSet` and inserted into the `initStream`.

Essentially, this query processes records in the `stockStream` and creates new records in the `initStream` with a unique set of `symbol` values.
