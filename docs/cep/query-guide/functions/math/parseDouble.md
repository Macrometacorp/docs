---
title: parseDouble (Function)
---

This function returns the double value of the string received.

## Syntax

```sql
<DOUBLE> math:parseDouble(<STRING> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a double value. |               | STRING  | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue string);

@info(name = 'parseToDouble')
INSERT INTO OutMediationStream
SELECT math:parseDouble(inValue) AS output
FROM InValueStream;
```

The query converts the given string input `inValue` from `InValueStream` into its corresponding double value and directs the result to the output stream `OutMediationStream`. For example, `parseDouble("123")` returns 123.0.
