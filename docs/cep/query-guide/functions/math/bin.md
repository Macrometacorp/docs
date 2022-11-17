---
title: bin (Function)
---

This function returns a string representation of the p1 argument, that is of either `integer` or `long` data type, as an unsigned integer in base 2. It wraps the `java.lang.Integer.toBinaryString` and java.lang.Long.toBinaryString\` methods.

Syntax

    <STRING> math:bin(<INT|LONG> p1)

## Query Parameters

| Name | Description                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value in either `integer` or `long`, that should be converted into an unsigned integer of base 2. |               | INT LONG            | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue long);

    insert into OutMediationStream
    select math:bin(inValue) as binValue
    from InValueStream;

If the `inValue` in the input stream is given, the function converts it into an unsigned integer in base 2 and directs the output to the output stream, OutMediationStream. For example, bin(9) returns `1001`.
