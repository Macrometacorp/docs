---
title: instanceOfFloat (Function)
---

Checks if the parameter is an instance of float or not.

## Syntax

```sql
<BOOL> instanceOfFloat(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)
```

## Query Parameters

| Name | Description         | Default Value | Possible Data Types         | Optional | Dynamic |
|------|---------------------|---------------|-----------------------------|----------|---------|
| arg  | The parameter to be checked. |          | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT INSTANCEOFFLOAT(value) AS state
FROM fooStream;
```

This query, named 'query1', selects records from the `fooStream` and calculates a new field called `state`. The `INSTANCEOFFLOAT` function is used to determine if the `value` is of float data type. If `value` is a float, then the value of `state` will be TRUE; otherwise, it will be FALSE. The resulting data, including the calculated `state`, is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `state` field, where `state` is determined based on the data type of the `value`.

For example, it returns TRUE if the `value` field format is 56.45f.

## Example 2

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT INSTANCEOFFLOAT(switchState) AS state
FROM fooStream;
```

This query, named 'query1', selects records from the `fooStream` and calculates a new field called `state`. The `INSTANCEOFFLOAT` function is used to determine if the `switchState` is of float data type. If `switchState` is a float, then the value of `state` will be TRUE; otherwise, it will be FALSE. The resulting data, including the calculated `state`, is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `state` field, where `state` is determined based on the data type of the `switchState`.

For example, if the `switchState = true`, then this returns FALSE, because the value is not a float.
