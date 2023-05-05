---
title: bin (Function)
---

This function returns a string representation of the p1 argument, that is of either `integer` or `long` data type, as an unsigned integer in base 2. It wraps the `java.lang.Integer.toBinaryString` and `java.lang.Long.toBinaryString` methods.

## Syntax

```sql
<STRING> math:bin(<INT|LONG> p1)
```

## Query Parameters

| Name | Description     | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------|---------------|---------------------|----------|---------|
| p1   | The value in either `integer` or `long`, that should be converted into an unsigned integer of base 2. |               | INT LONG            | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue long);

@info(name = 'convertToBinary')
INSERT INTO OutMediationStream
SELECT math:bin(inValue) AS binValue
FROM InValueStream;
```

The query takes the `inValue` from the input stream `InValueStream` and uses the `math:bin()` function to convert it into an unsigned integer in base 2 (binary representation). The result is directed to the output stream `OutMediationStream`. For example, when `inValue` is 9, the `binValue` returned is 1001 (not 1000 as mentioned in the initial description).
