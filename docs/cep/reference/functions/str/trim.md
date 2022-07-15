---
title: trim (Function)
---

Returns a copy of the input string without the leading and trailing
whitespace (if any).

Syntax

    <STRING> str:trim(<STRING> input.string)

## Query Parameters

| Name         | Description                                | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|--------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string that needs to be trimmed. |               | STRING              | No       | Yes     |

## Example 1

    trim("  AbCDefghiJ KLMN  ")

This returns a copy of the `input.string` with the leading and/or
trailing white-spaces omitted. In this scenario, the output is
"AbCDefghiJ KLMN".
