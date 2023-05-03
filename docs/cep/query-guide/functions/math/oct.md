---
title: oct (Function)
---

This function converts the input parameter `p1` to octal.

## Syntax

```sql
<STRING> math:oct(<INT|LONG> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose octal representation should be found. |               | INT LONG            | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue long);

@info(name = 'convertToOctal')
INSERT INTO OutMediationStream
SELECT math:oct(inValue) AS octValue
FROM InValueStream;
```

The query calculates the octal value of the given input `inValue` from `InValueStream`, and directs the result to the output stream `OutMediationStream`. For example, `oct(99l)` returns "143".
