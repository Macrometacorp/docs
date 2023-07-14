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
list:tokenize(customList)
```

The `list:tokenize(customList)` function takes a list named `customList`, and for each element in the list, it generates an event with the corresponding value. In this example, if `customList` contains elements (`gdn`, `IBM`, `XYZ`), the function will generate three events with value attributes `gdn`, `IBM`, and `XYZ` respectively.

## Example 2

```sql
CREATE STREAM ListStream (customList OBJECT);
CREATE SINK STREAM OutputStream (index INT, value STRING);

@info(name = 'TokenizeList')
INSERT INTO OutputStream
SELECT index, value
FROM ListStream#list:tokenize(customList);
```

In this corrected stream worker, the `list:tokenize` function is invoked as part of the FROM clause, directly on the `ListStream`. It generates an event for each element in `customList`, with each event containing the index and the value of the corresponding list element. These events are inserted into the `OutputStream`. The `OutputStream` will then contain the index and value of each element in `customList`.
