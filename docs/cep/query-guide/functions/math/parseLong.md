---
title: parseLong (Function)
---

This function returns the long value of the string received.

Syntax

    <LONG> math:parseLong(<STRING> p1)

## Query Parameters

| Name | Description                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to a long value. |               | STRING              | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue string);

    insert into OutMediationStream
    select math:parseLong(inValue) as output
    from InValueStream;

The function converts the `inValue` to its corresponding long value and directs the result to the output stream, OutMediationStream. For example, parseLong("123") returns 123.
