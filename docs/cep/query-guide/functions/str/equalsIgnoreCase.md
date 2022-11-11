---
title: equalsIgnoreCase (Function)
---

This returns a boolean value by comparing two strings lexicographically
without considering the letter case.

Syntax

    <BOOL> str:equalsIgnoreCase(<STRING> arg1, <STRING> arg2)

## Query Parameters

| Name | Description                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| arg1 | The first input string argument.                                            |               | STRING              | No       | Yes     |
| arg2 | The second input string argument. This is compared with the first argument. |               | STRING              | No       | Yes     |

## Example 1

    equalsIgnoreCase("gdn", "gdn")

This returns a boolean value as the output. In this scenario, it returns
"true".
