---
title: coalesce (Function)
---

This returns the first input parameter value of the given argument, that is not null.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> str:coalesce(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ...)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types  | Optional | Dynamic |
|------|-------------|---------------|----------------------|----------|---------|
| arg  | It can have one or more input parameters in any data type. However, all the specified parameters are required to be of the same type. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

```sql
@info(name = 'coalesceExample')
SELECT coalesce(NULL, 'BBB', 'CCC') AS firstNonNullValue;
```

The `coalesceExample` demonstrates the use of the `coalesce()` function to return the first non-null input parameter. In this example, the input parameters are NULL, 'BBB', and 'CCC'. The function returns 'BBB' because it is the first non-null value.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, value1 string, value2 string, value3 string);

CREATE STREAM OutputStream (eventTime long, firstNonNullValue string);

@info(name = 'coalesceStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, coalesce(value1, value2, value3) AS firstNonNullValue
FROM InputDataStream;
```

The `coalesceStreamWorker` processes events from the `InputDataStream` and uses the `coalesce()` function to return the first non-null value among the `value1`, `value2`, and `value3` attributes. The query outputs the `eventTime` and the calculated `firstNonNullValue` for each event to the `OutputStream`.
