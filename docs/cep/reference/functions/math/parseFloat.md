---
title: parseFloat (Function)
---

This function returns the float value of the received string.

Syntax

    <FLOAT> math:parseFloat(<STRING> p1)

## Query Parameters

| Name | Description                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted into a float value. |               | STRING              | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue string);

    insert into OutMediationStream
    select math:parseFloat(inValue) as output
    from InValueStream;

The function converts the input value given in `inValue`,into its corresponding float value and directs the result into the output stream, OutMediationStream. For example, parseFloat("123") returns 123.0.
