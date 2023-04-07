---
title: convert (Function)
---

Converts the first input parameter according to the `convertedTo` parameter.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT|STRING|BOOL> convert(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> to.be.converted, <STRING> converted.to)
```

## Query Parameters

| Name            | Description     | Default Value | Possible Data Types                      | Optional | Dynamic |
|------------|-----------------------------------|---------------|-----------------|----------|---------|
| to.be.converted | This specifies the value to be converted.    |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| converted.to    | A string constant parameter to which type the attribute need to be converted using one of the following strings values: `int`, `long`, `float`, `double`, `string`, `bool`. |               | STRING                                   | No       | Yes     |

## Example 1

```sql
INSERT INTO barStream
SELECT CONVERT(temp, 'double') AS temp
FROM fooStream;
```

This query selects records from the `fooStream` collection and uses the `CONVERT` function to convert the `temp` field to a `double` data type. The result is aliased as `temp` and inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `temp` field converted to a `double` data type.

## Example 2

```sql
INSERT INTO barStream
SELECT CONVERT(temp, 'int') AS temp
FROM fooStream;
```

This query selects records from the `fooStream` collection and uses the `CONVERT` function to convert the `temp` field to an `int` data type. The result is aliased as `temp` and inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `temp` field converted to an `int` data type.
