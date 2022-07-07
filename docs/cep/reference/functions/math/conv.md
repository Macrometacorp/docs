---
title: conv (Function)
---

This function converts `a` from the `fromBase` base to the `toBase` base.

Syntax

    <STRING> math:conv(<STRING> a, <INT> from.base, <INT> to.base)

## Query Parameters

| Name      | Description                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|--------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| a         | The value whose base should be changed. Input should be given as a `String`. |               | STRING              | No       | Yes     |
| from.base | The source base of the input parameter `a`.                                  |               | INT                 | No       | Yes     |
| to.base   | The target base that the input parameter `a` should be converted into.       |               | INT                 | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue string,fromBase int,toBase int);

    insert into OutMediationStream
    select math:conv(inValue,fromBase,toBase) as convertedValue
    from InValueStrea;

If the `inValue` in the input stream is given, and the base in which it currently resides in and the base to which it should be converted to is specified, the function converts it into a string in the target base and directs it to the output stream, OutMediationStream. For example, conv("7f", 16, 10) returns "127".
