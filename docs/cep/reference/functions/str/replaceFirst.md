---
title: replaceFirst (Function)
---

Finds the first substring of the input string that matches with the
given regular expression, and replaces itwith the given replacement
string.

Syntax

    <STRING> str:replaceFirst(<STRING> input.string, <STRING> regex, <STRING> replacement.string)

## Query Parameters

| Name               | Description                                                                                                       | Default Value | Possible Data Types | Optional | Dynamic |
|--------------------|-------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string       | The input string that should be replaced.                                                                         |               | STRING              | No       | Yes     |
| regex              | The regular expression with which the input string should be matched.                                             |               | STRING              | No       | Yes     |
| replacement.string | The string with which the first substring of input string that matches the regular expression should be replaced. |               | STRING              | No       | Yes     |

## Example 1
```
    replaceFirst("hello gdn A hello",  'gdn(.*)A', 'XXXX')
```

This returns a string after replacing the first substring with the given
replacement string. In this scenario, the output is "hello XXXX
hello".
