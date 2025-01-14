---
title: parseFloat (Function)
---

This function returns the float value of the received string.

## Syntax

```sql
<FLOAT> math:parseFloat(<STRING> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a float value. |               | STRING   | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue string);

@info(name = 'parseToFloat')
INSERT INTO OutMediationStream
SELECT math:parseFloat(inValue) AS output
FROM InValueStream;
```

The query converts the given string input `inValue` from `InValueStream` into its corresponding float value and directs the result to the output stream `OutMediationStream`. For example, `parseFloat("123.45")` returns 123.45.
