---
title: instanceOfInteger (Function)
---

Checks whether the parameter is an instance of integer or not.

## Syntax

```sql
<BOOL> instanceOfInteger(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)
```

## Query Parameters

| Name | Description           | Default Value | Possible Data Types       | Optional | Dynamic |
|------|---------------------|---------------|----------------------------|----------|---------|
| arg  | The parameter to be checked. |           | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT instanceOfInteger(value) AS state
FROM fooStream;
```

This query, named 'query1', selects records from the `fooStream` and calculates a new field called `state`. The `instanceOfInteger` function is used to determine if the `value` is of integer data type. If `value` is an integer, then the value of `state` will be TRUE; otherwise, it will be FALSE. The resulting data, including the calculated `state`, is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `state` field, where `state` is determined based on the data type of the `value`.

## Example 2

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT instanceOfInteger(switchState) AS state
FROM fooStream;
```

This query, named 'query1', selects records from the `fooStream` and calculates a new field called `state`. The `instanceOfInteger` function is used to determine if the `switchState` is of integer data type. If `switchState` is an integer, then the value of `state` will be TRUE; otherwise, it will be FALSE. The resulting data, including the calculated `state`, is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `state` field, where `state` is determined based on the data type of the `switchState`.
