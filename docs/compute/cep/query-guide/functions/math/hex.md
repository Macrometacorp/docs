---
title: hex (Function)
---

This function wraps the `java.lang.Double.toHexString() function. It returns a hexadecimal string representation of the input, `p1\`.

## Syntax

```sql
<STRING> math:hex(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hexadecimal value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue int);

@info(name = 'convertToHexString')
INSERT INTO OutMediationStream
SELECT math:hex(inValue) AS hexString
FROM InValueStream;
```

The query converts the provided `inValue` from the `InValueStream` into its corresponding hexadecimal format using the `math:hex()` function. The result is directed to the output stream `OutMediationStream`. For example, `hex(200)` returns `"c8"`.
