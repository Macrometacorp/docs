---
title: coalesce (Function)
---

Returns the value of the first input parameter that is not null, and all input parameters have to be on the same type.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> coalesce(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ...)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types       | Optional | Dynamic |
|------|---------------------|-------------|---------------|----------|---------|
| arg  | This function accepts one or more parameters. They can belong to any one of the available types. All the specified parameters should be of the same type. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
INSERT INTO barStream
SELECT COALESCE('123', NULL, '789') AS value
FROM fooStream;
```

This query selects records from the `fooStream` collection and uses the `COALESCE` function to return the first non-null value among the provided values ('123', NULL, '789'). In this case, the first non-null value is '123'. The result is aliased as `value` and inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with a constant `value` field set to '123'.

## Example 2

```sql
INSERT INTO barStream
SELECT COALESCE(NULL, 76, 567) AS value
FROM fooStream;
```

This query selects records from the `fooStream` collection and uses the `COALESCE` function to return the first non-null value among the provided values (NULL, 76, 567). In this case, the first non-null value is 76. The result is aliased as `value` and inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with a constant `value` field set to 76.

## Example 3

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT COALESCE(NULL, NULL, NULL) AS value
FROM fooStream;
```

This query selects records from the `fooStream` and uses the `COALESCE` function to return the first non-null value among the provided values (NULL, NULL, NULL). In this case, all values are null, so the `COALESCE` function returns NULL. The result is aliased as `value` and inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with a constant `value` field set to NULL.
