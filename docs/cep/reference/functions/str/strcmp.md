---
title: strcmp (Function)
---

Compares two strings lexicographically and returns an integer value. If
both strings are equal, 0 is returned. If the first string is
lexicographically greater than the second string, a positive value is
returned. If the first string is lexicographically greater than the
second string, a negative value is returned.

Syntax

    <INT> str:strcmp(<STRING> arg1, <STRING> arg2)

## Query Parameters

| Name | Description                                                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| arg1 | The first input string argument.                                                                    |               | STRING              | No       | Yes     |
| arg2 | The second input string argument that should be compared with the first argument lexicographically. |               | STRING              | No       | Yes     |

## Example 1

    strcmp("AbCDefghiJ KLMN", 'Hello')

This compares two strings lexicographically and outputs an integer
value.
