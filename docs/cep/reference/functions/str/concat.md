---
title: concat (Function)
---

This function returns a string value that is obtained as a result of
concatenating two or more input string values.

Syntax

    <STRING> str:concat(<STRING> arg, <STRING> ...)

## Query Parameters

| Name | Description                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------|---------------|---------------------|----------|---------|
| arg  | This can have two or more `string` type input parameters. |               | STRING              | No       | Yes     |

## Example 1

    concat("D533", "8JU^", "XYZ")

This returns a string value by concatenating two or more given
arguments. In the example shown above, it returns "D5338JU\^XYZ".
