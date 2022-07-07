---
title: substr (Function)
---

Returns a substring of the input string by considering a subset or all
of the following factors: starting index, length, regular expression,
and regex group number.

Syntax

    <STRING> str:substr(<STRING> input.string, <INT> begin.index)
    <STRING> str:substr(<STRING> input.string, <INT> begin.index, <INT> length)
    <STRING> str:substr(<STRING> input.string, <STRING> regex)
    <STRING> str:substr(<STRING> input.string, <STRING> regex, <INT> group.number)

## Query Parameters

| Name         | Description                                                          | Default Value                             | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------------------------|-------------------------------------------|---------------------|----------|---------|
| input.string | The input string to be processed.                                    |                                           | STRING              | No       | Yes     |
| begin.index  | Starting index to consider for the substring.                        | \-                                        | INT                 | Yes      | Yes     |
| length       | The length of the substring.                                         | \`input.string\`.length - \`begin.index\` | INT                 | Yes      | Yes     |
| regex        | The regular expression that should be matched with the input string. | \-                                        | STRING              | Yes      | Yes     |
| group.number | The regex group number                                               | 0                                         | INT                 | Yes      | Yes     |

## Example 1

    substr("AbCDefghiJ KLMN", 4)

This outputs the substring based on the given `begin.index`. In this
scenario, the output is "efghiJ KLMN".

## Example 2

    substr("AbCDefghiJ KLMN",  2, 4)

This outputs the substring based on the given `begin.index` and length.
In this scenario, the output is "CDef".

## Example 3
```
    substr("gdnD efghiJ KLMN", '^gdn(.*)')
```

This outputs the substring by applying the regex. In this scenario, the
output is "gdnD efghiJ KLMN".

## Example 4

    substr("gdn cep gdn XX E hi hA gdn heAllo",  'gdn(.*)A(.*)',  2)

This outputs the substring by applying the regex and considering the
`group.number`. In this scenario, the output is " ello".
