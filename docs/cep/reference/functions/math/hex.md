---
title: hex (Function)
---

This function wraps the `java.lang.Double.toHexString() function. It returns a hexadecimal string representation of the input, `p1\`.

Syntax

    <STRING> math:hex(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hexadecimal value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue int);

    insert into OutMediationStream
    select math:hex(inValue) as hexString
    from InValueStream;

If the `inValue` in the input stream is provided, the function converts this into its corresponding hexadecimal format and directs the output to the output stream, OutMediationStream. For example, hex(200) returns "c8".
