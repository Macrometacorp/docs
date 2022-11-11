---
title: find (Function)
---

Finds the subsequence that matches the given regex pattern.

Syntax

    <BOOL> regex:find(<STRING> regex, <STRING> input.sequence)
    <BOOL> regex:find(<STRING> regex, <STRING> input.sequence, <INT> starting.index)

## Query Parameters

| Name           | Description                                                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression that is matched to a sequence in order to find the subsequence of the same. For example, `\d\d(.*)gdn`.    |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`.                   |               | STRING              | No       | Yes     |
| starting.index | The starting index of the input sequence from where the input sequence ismatched with the given regex pattern.For example, `10`. | 0             | INT                 | Yes      | Yes     |

## Example 1
```
    regex:find('\d\d(.*)gdn', '21 products are produced by gdn currently')
```

This method attempts to find the subsequence of the input.sequence that matches the regex pattern, `\d\d(.*)gdn`. It returns `true` as a subsequence exists.

## Example 2
```
    regex:find('\d\d(.*)gdn', '21 products are produced by gdn.', 4)
```
This method attempts to find the subsequence of the input.sequence that matches the regex pattern, `\d\d(.*)gdn` starting from index `4`. It returns `false` as subsequence does not exists.
