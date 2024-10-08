---
title: getVar
---

This functions returns the value of the `var` if present. If the `var` is unknown to the stream worker, `default.value` (if specified) are returned.

## Syntax

```sql
    <STRING> context:getVar(<STRING> var, <STRING> default.value)
```

## Query Parameters

| Name | Description       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------|---------------|-----------------------|----------|---------|
| var  | The variable name whose value should be returned.   |               | STRING | No       | Yes     |
| default.value    | If the `var` is unknown `default.value` will be returned. | null | STRING      | Yes       | Yes     |

## Supported Context Variables

| Name | Description |
|------|-------------|
| region  | Current region where the Stream App is running e.g. `gdn-sfo2` |               | STRING | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO OutputStream
SELECT customerName, context:getVar('region') AS region
FROM InputStream;
```

This query selects the `customerName` and the `region` value from the context for each record in the `InputStream` collection and inserts the resulting data into the `OutputStream`.

## Example 2

```sql
@info(name = 'query1')
INSERT INTO OutputStream
SELECT customerName
FROM InputStream[region == context:getVar('region')];
```

The query selects the `customerName` from the `InputStream` for each record where the `region` value matches the value obtained from the `context:getVar('region')` function. The resulting data is then inserted into the `OutputStream`. Essentially, this query filters records based on the matching region and inserts only the `customerName` into the `OutputStream`.
