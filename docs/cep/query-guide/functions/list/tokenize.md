---
title: tokenize (Stream Processor)
---

Tokenize the list and return each key, value as new attributes in events

Syntax

    list:tokenize(<OBJECT> list)
    list:tokenize(<OBJECT> list, <OBJECT> ...)

## Query Parameters

| Name | Description                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------|---------------|---------------------|----------|---------|
| list | Array list which needs to be tokenized |               | OBJECT              | No       | Yes     |

Extra Return Attributes

| Name  | Description                             | Possible Types |
|-------|-----------------------------------------|----------------|
| index | Index of an entry consisted in the list | INT            |
| value | Value of an entry consisted in the list | OBJECT         |

## Example 1

    list:tokenize(customList)

If custom list contains (`gdn`, `IBM`, `XYZ`) elements, then tokenize function returns 3 events with value attributes gdn, IBM and XYZ respectively.
