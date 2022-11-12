---
title: oct (Function)
---

This function converts the input parameter `p1` to octal.

Syntax

    <STRING> math:oct(<INT|LONG> p1)

## Query Parameters

| Name | Description                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose octal representation should be found. |               | INT LONG            | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue long);

    insert into OutMediationStream
    select math:oct(inValue) as octValue
    from InValueStream;

If the `inValue` in the input stream is given, this function calculates the octal value corresponding to the same and directs it to the output stream, OutMediationStream. For example, oct(99l) returns "143".
