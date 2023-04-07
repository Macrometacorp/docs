---
title: cast (Function)
---

Converts the first parameter according to the cast.to parameter. Incompatible arguments cause Class Cast exceptions if further processed. This function is used with map extension that returns attributes of the object type. You can use this function to cast the object to an accurate and concrete type.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> cast(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> to.be.caster, <STRING> cast.to)
```

## Query Parameters

| Name         | Description           | Default Value | Possible Data Types             | Optional | Dynamic |
|-----------|--------------------------|-----------|----------------|----------|---------|
| to.be.caster | This specifies the attribute to be casted.        |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| cast.to    | A string constant parameter expressing the cast to type using one of the following strings values: int, long, float, double, string, bool. |               | STRING        | No       | Yes     |

## Example 1

```sql
INSERT INTO barStream
SELECT symbol AS name, CAST(temp, 'double') AS temp
FROM fooStream;
```

This query selects records from the `fooStream` collection and transforms the data by renaming the `symbol` field to `name` and casting the `temp` field to a `double` data type. The resulting transformed data is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `name` and `temp` fields, where `temp` is converted to a `double` data type.
