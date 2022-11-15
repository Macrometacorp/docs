---
title: charFrequency (Function)
---

Gives the frequency of a char in `input string`.

Syntax

    <LONG> str:charFrequency(<STRING> input.string, <STRING> char)

## Query Parameters

| Name         | Description                                        | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to be processed.                  |               | STRING              | No       | Yes     |
| char         | The char's number of occurrences to be calculated |               | STRING              | No       | Yes     |

## Example 1

    str:charFrequency("gdn,ABM,NSFT", ",")

This counts the number of occurrences of `,` in the given
`input.string`. In this scenario, the output will is `2`.
