---
title: repeat (Function)
---

Repeats the input string for a specified number of times.

Syntax

    <STRING> str:repeat(<STRING> input.string, <INT> times)

## Query Parameters

| Name         | Description                                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|-------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string that is repeated the number of times as defined by the user. |               | STRING              | No       | Yes     |
| times        | The number of times the input.string needs to be repeated .                   |               | INT                 | No       | Yes     |

## Example 1

    repeat("StRing 1", 3)

This returns a string value by repeating the string for a specified
number of times. In this scenario, the output is "StRing 1StRing
1StRing 1".
