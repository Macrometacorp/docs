---
title: parseLong (Function)
---

This function returns the long value of the string received.

## Syntax

```sql
<LONG> math:parseLong(<STRING> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to a long value. |       | STRING | No | Yes |

## Example 1

```sql
CREATE STREAM InValueStream (inValue string);

@info(name = 'parseToLong')
INSERT INTO OutMediationStream
SELECT math:parseLong(inValue) AS output
FROM InValueStream;
```

The query converts the given string input `inValue` from `InValueStream` into its corresponding long value and directs the result to the output stream `OutMediationStream`. For example, `parseLong("123")` returns 123.
