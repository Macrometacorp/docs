---
title: groupConcat (Aggregate Function)
---

This function aggregates the received events by concatenating the keys
in those events using a separator, e.g.,a comma (,) or a hyphen (-), and
returns the concatenated key string.

## Syntax

```sql
<STRING> str:groupConcat(<STRING> key)
<STRING> str:groupConcat(<STRING> key, <STRING> ...)
<STRING> str:groupConcat(<STRING> key, <STRING> separator, <BOOL> distinct)
<STRING> str:groupConcat(<STRING> key, <STRING> separator, <BOOL> distinct, <STRING> order)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| key  | The string that needs to be aggregated.  |      | STRING  | No       | Yes     |
| separator | The separator that separates each string key after concatenating the keys.   | ,   | STRING  | Yes      | Yes     |
| distinct  | This is used to only have distinct values in the concatenated string that is returned.  | false      | BOOL | Yes      | Yes     |
| order     | This parameter accepts `ASC` or `DESC` strings to sort the string keys in either ascending or descending order respectively. | No order      | STRING              | Yes      | Yes     |

## Example 1

```sql
CREATE STREAM InputStream (eventTime long, key string);
CREATE SINK STREAM OutputStream (eventTime long, groupedKeys string);

@info(name = 'groupConcatExample')
INSERT INTO OutputStream
SELECT eventTime, str:groupConcat(key) AS groupedKeys
FROM InputStream WINDOW SLIDING_TIME(5 min);
```

The `groupConcatExample` processes events from the `InputStream` using a sliding time window of 5 minutes and concatenates the `key` attribute values using the `str:groupConcat()` function. In this example, if the input events within the 5-minute window have values for the `key` attribute as `'A'`, `'B'`, `'S'`, `'C'`, and `'A'`, the function returns `'A,B,S,C,A'` to the `OutputStream`.

## Example 2

```sql
CREATE STREAM InputStream (eventTime long, key string);
CREATE SINK STREAM OutputStream (eventTime long, groupedKeys string);

@info(name = 'groupConcatWithSeparatorExample')
INSERT INTO OutputStream
SELECT eventTime, str:groupConcat(key, '-', true, 'ASC') AS groupedKeys
FROM InputStream WINDOW SLIDING_TIME(5 min);
```

The `groupConcatWithSeparatorExample` processes events from the `InputStream` using a sliding time window of 5 minutes and concatenates the `key` attribute values using the `str:groupConcat()` function with a specified separator, distinct values, and sorting order. In this example, if the input events within the 5-minute window have values for the `key` attribute as `'A'`, `'B'`, `'S'`, `'C'`, and `'A'`, the separator is a hyphen, distinct values are set to `true`, and the sorting order is ascending, the function returns `'A-B-C-S'` to the `OutputStream`.
