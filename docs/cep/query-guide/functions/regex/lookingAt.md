---
title: lookingAt (Function)
---

Matches the input.sequence from the beginning against the regex pattern, and unlike `regex:matches() it does not require that the entire input.sequence be matched.`

Syntax

    <BOOL> regex:lookingAt(<STRING> regex, <STRING> input.sequence)

## Query Parameters

| Name           | Description                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression. For example, `\d\d(.*)gdn`.                                                             |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`. |               | STRING              | No       | Yes     |

## Example 1

    regex:lookingAt('\d\d(.*)(gdn.*)', '21 products are produced by gdn currently in Sri Lanka')

Function matches the input.sequence against the regex pattern, `\d\d(.*)(gdn.*)` from the beginning, and as it matches it returns `true`.

## Example 2

    regex:lookingAt('gdn(.*)middleware(.*)', 'sample test string and gdn is situated in trace and it's a middleware company')

Function matches the input.sequence against the regex pattern, `gdn(.*)middleware(.*)` from the beginning, and as it does not match it returns `false`.
