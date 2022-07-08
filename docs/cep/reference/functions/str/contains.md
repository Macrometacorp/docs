---
title: contains (Function)
---

This function returns `true` if the`input.string` contains the specified
sequence of char values in the `search.string`.

Syntax

    <BOOL> str:contains(<STRING> input.string, <STRING> search.string)

## Query Parameters

| Name          | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|---------------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string  | Input string value.                                        |               | STRING              | No       | Yes     |
| search.string | The string value to be searched for in the `input.string`. |               | STRING              | No       | Yes     |

## Example 1

    contains("21 products are produced by gdn currently", "gdn")

This returns a boolean value as the output. In this case, it
returns`true`.
