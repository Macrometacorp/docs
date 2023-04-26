---
title: tokenize (Stream Processor)
---

Tokenize the list and return each key, value as new attributes in events

## Syntax

```sql
list:tokenize(<OBJECT> list)
list:tokenize(<OBJECT> list, <OBJECT> ...)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| list | Array list which needs to be tokenized |         | OBJECT   | No  | Yes |

## Extra Return Attributes

| Name  | Description                             | Possible Types |
|-------|-----------------------------------------|----------------|
| index | Index of an entry consisted in the list | INT            |
| value | Value of an entry consisted in the list | OBJECT         |

## Example 1

```sql
@info(name = 'query1')
list:tokenize(customList)
```

The `list:tokenize(customList)` function takes a list named `customList`, and for each element in the list, it generates an event with the corresponding value. In this example, if `customList` contains elements (`gdn`, `IBM`, `XYZ`), the function will generate three events with value attributes `gdn`, `IBM`, and `XYZ` respectively.
