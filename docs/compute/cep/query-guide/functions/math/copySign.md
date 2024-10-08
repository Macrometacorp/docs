---
title: copySign (Function)
---

This function returns a value of an input with the received `magnitude` and `sign` of another input. It wraps the `java.lang.Math.copySign()` function.

## Syntax

```sql
<DOUBLE> math:copySign(<INT|LONG|FLOAT|DOUBLE> magnitude, <INT|LONG|FLOAT|DOUBLE> sign)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|-------|--------------|---------------|-----------------------|----------|---------|
| magnitude | The magnitude of this parameter is used in the output attribute. |       | INT LONG FLOAT DOUBLE | No       | Yes     |
| sign      | The sign of this parameter is used in the output attribute. |     | INT LONG FLOAT DOUBLE | No    | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue1 double, inValue2 double);

@info(name = 'copySignValues')
INSERT INTO OutMediationStream
SELECT math:copySign(inValue1, inValue2) AS copysignValue
FROM InValueStream;
```

The query takes two input values `inValue1` and `inValue2` from the `InValueStream`. The `math:copySign()` function is used to copy the sign of `inValue2` to `inValue1` while keeping the magnitude of `inValue1`. The result is directed to the output stream `OutMediationStream`. For example, when `inValue1` is 5.6 and `inValue2` is -3.0, the `copysignValue` returned is -5.6.
