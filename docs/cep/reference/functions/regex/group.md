---
title: group (Function)
---

Returns the subsequence captured by the given group during the regex match operation.

Syntax

    <STRING> regex:group(<STRING> regex, <STRING> input.sequence, <INT> group.id)

## Query Parameters

| Name           | Description                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|----------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| regex          | A regular expression. For example, `\d\d(.*)gdn.`                                                             |               | STRING              | No       | Yes     |
| input.sequence | The input sequence to be matched with the regular expression. For example, 2`1 products are produced by gdn`. |               | STRING              | No       | Yes     |
| group.id       | The given group id of the regex expression. For example, `2`.                                                  |               | INT                 | No       | Yes     |

## Example 1
```
    regex:group('\d\d(.*)(gdn.*)(gdn.*)', '21 products are produced within 10 years by gdn currently by gdn employees', 3)
```

Function returns `gdn employees`, the subsequence captured by the groupID 3 according to the regex pattern, `\d\d(.*)(gdn.*)(gdn.*)`.
