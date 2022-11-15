---
title: replaceAll (Function)
---

Finds all the substrings of the input string that matches with the given
expression, and replaces them with the given replacement string.

Syntax

    <STRING> str:replaceAll(<STRING> input.string, <STRING> regex, <STRING> replacement.string)

## Query Parameters

| Name               | Description                                                                                | Default Value | Possible Data Types | Optional | Dynamic |
|--------------------|--------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string       | The input string to be replaced.                                                           |               | STRING              | No       | Yes     |
| regex              | The regular expression to be matched with the input string.                                |               | STRING              | No       | Yes     |
| replacement.string | The string with which each substring that matches the given expression should be replaced. |               | STRING              | No       | Yes     |

## Example 1

    replaceAll("hello hi hello",  'hello', 'test')

This returns a string after replacing the substrings of the input string
with the replacement string. In this scenario, the output is "test hi
test" .
