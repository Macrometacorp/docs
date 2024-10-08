---
title: default (Function)
---

Checks if the `attribute` parameter is null and if so returns the value of the `default` parameter.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> default(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> attribute, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> default)
```

## Query Parameters

| Name      | Description    | Default Value | Possible Data Types         | Optional | Dynamic |
|-----------|----------------|---------------|-----------------------------|----------|---------|
| attribute | The attribute that could be null.           |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| default   | The default value that will be used when `attribute` parameter is null |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO StandardTempStream
SELECT default(temp, 0.0) AS temp, roomNum
FROM TempStream;
```

This query selects records from the `TempStream` and uses the `default` function to ensure that the `temp` field has a `value`, substituting it with `0.0` if the original value is NULL. The transformed `temp` field and the `roomNum` field are then inserted into the `StandardTempStream`.

Essentially, this query processes records in the `TempStream` and creates new records in the `StandardTempStream` with the `temp` and `roomNum` fields, where the `temp` field has a default value of `0.0` if it was originally NULL.
