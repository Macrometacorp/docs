---
title: matches (Function)
---

Matches the entire input.sequence against the regex pattern.

Syntax

    <BOOL> regex:matches(<STRING> regex, <STRING> input.sequence)

## Query Parameters

| Name           | Description                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression. For example, `\d\d(.*)gdn`.                                                             |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`. |               | STRING              | No       | Yes     |

## Example 1

    regex:matches('gdn(.*)middleware(.*)', 'gdn is situated in trace and its a middleware company')

Function matches the entire input.sequence against `gdn(.*)middleware(.*)` regex pattern, and as it matches it returns `true`.

## Example 2
```
    regex:matches('gdn(.*)middleware', 'gdn is situated in trace and its a middleware company')
```

Function matches the entire input.sequence against `gdn(.*)middleware` regex pattern. As it does not match it returns `false`.
