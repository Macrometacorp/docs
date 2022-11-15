---
title: regexp (Function)
---

Returns a boolean value based on the matchability of the input string
and the given regular expression.

Syntax

    <BOOL> str:regexp(<STRING> input.string, <STRING> regex)

## Query Parameters

| Name         | Description                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|--------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to match with the given regular expression. |               | STRING              | No       | Yes     |
| regex        | The regular expression to be matched with the input string.  |               | STRING              | No       | Yes     |

## Example 1
```
    regexp("gdn abcdh", "GDN(.*h)")
```

This returns a boolean value after matching regular expression with the
given string. In this scenario, it returns "true" as the output.
