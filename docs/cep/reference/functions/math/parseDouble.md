---
title: parseDouble (Function)
---

This function returns the double value of the string received.

Syntax

    <DOUBLE> math:parseDouble(<STRING> p1)

## Query Parameters

| Name | Description                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a double value. |               | STRING              | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue string);

    insert into OutMediationStream
    select math:parseDouble(inValue) as output
    from InValueStream;

If the `inValue` in the input stream holds a value, this function converts it into the corresponding double value and directs it to the output stream, OutMediationStream. For example, parseDouble("123") returns 123.0.
