---
title: conv (Function)
---

This function converts `a` from the `fromBase` base to the `toBase` base.

## Syntax

```sql
<STRING> math:conv(<STRING> a, <INT> from.base, <INT> to.base)
```

## Query Parameters

| Name   | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|--------|--------------|---------------|---------------------|----------|---------|
| a   | The value whose base should be changed. Input should be given as a `String`. |               | STRING              | No       | Yes     |
| from.base | The source base of the input parameter `a`.    |               | INT    | No  | Yes |
| to.base | The target base that the input parameter `a` should be converted into. |      | INT | No  | Yes   |

## Example 1

```sql
CREATE STREAM InValueStream (inValue string, fromBase int, toBase int);

@info(name = 'convertBaseValue')
INSERT INTO OutMediationStream
SELECT math:conv(inValue, fromBase, toBase) AS convertedValue
FROM InValueStream;
```

The query takes the `inValue`, `fromBase`, and `toBase` from the input stream `InValueStream`. The `math:conv()` function is used to convert the `inValue` from its current base `fromBase` to the target base `toBase`. The result is directed to the output stream `OutMediationStream`. For example, when `inValue` is "7f", `fromBase` is 16, and `toBase` is 10, the `convertedValue` returned is "127".
