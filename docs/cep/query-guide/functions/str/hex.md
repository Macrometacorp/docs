---
title: hex (Function)
---

This function returns a hexadecimal string by converting each byte of
each character in the input string to two hexadecimal digits.

Syntax

    <STRING> str:hex(<STRING> input.string)

## Query Parameters

| Name         | Description                                       | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|---------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to derive the hexadecimal value. |               | STRING              | No       | Yes     |

## Example 1

    hex("MySQL")

This returns the hexadecimal value of the input.string. In this
scenario, the output is "4d7953514c".
