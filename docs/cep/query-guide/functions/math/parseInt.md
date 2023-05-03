---
title: parseInt (Function)
---


This function returns the integer value of the received string.

## Syntax

```sql
<INT> math:parseInt(<STRING> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to an integer. |         | STRING | No  | Yes  |

## Example 1

```sql
CREATE STREAM InValueStream (inValue string);

@info(name = 'parseToInt')
INSERT INTO OutMediationStream
SELECT math:parseInt(inValue) AS output
FROM InValueStream;
```

The query converts the given string input `inValue` from `InValueStream` into its corresponding integer value and directs the result to the output stream `OutMediationStream`. For example, `parseInt("123")` returns 123.
