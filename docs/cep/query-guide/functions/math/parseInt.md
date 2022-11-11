---
title: parseInt (Function)
---


This function returns the integer value of the received string.

Syntax

    <INT> math:parseInt(<STRING> p1)

## Query Parameters

| Name | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be converted to an integer. |               | STRING              | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue string);

    insert into OutMediationStream
    select math:parseInt(inValue) as output
    from InValueStream;

The function converts the `inValue` into its corresponding integer value and directs the output to the output stream, OutMediationStream. For example, parseInt("123") returns 123.
