---
title: eval (Function)
---

This extension evaluates a given string and return the output according to the user specified data type.

Syntax

    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL> js:eval(<STRING> expression, <STRING> return.type)

## Query Parameters

| Name        | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| expression  | Any single line js expression or function.                                                               |               | STRING              | No       | Yes     |
| return.type | The return type of the evaluated expression. Supported types are int\|long\|float\|double\|bool\|string. |               | STRING              | No       | No      |

## Example 1

    js:eval("700 > 800", 'bool')

In this example, the expression `700 > 800` will be evaluated and return result as false because user specified return type as bool.
