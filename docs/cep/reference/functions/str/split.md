---
title: split (Function)
---

Splits the `input.string` into substrings using the value parsed in the
`split.string` and returns the substring at the position specified in
the `group.number`.

Syntax

    <STRING> str:split(<STRING> input.string, <STRING> split.string, <INT> group.number)

## Query Parameters

| Name         | Description                                              | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to be replaced.                         |               | STRING              | No       | Yes     |
| split.string | The string value to be used to split the `input.string`. |               | STRING              | No       | Yes     |
| group.number | The index of the split group                             |               | INT                 | No       | Yes     |

## Example 1

    split("gdn,ABM,NSFT", ",", 0)

This splits the given `input.string` by given `split.string` and returns
the string in the index given by group.number. In this scenario, the
output will is "gdn".
