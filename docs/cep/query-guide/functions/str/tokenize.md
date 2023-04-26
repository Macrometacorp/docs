---
title: tokenize (Stream Processor)
---

This function splits the input string into tokens using a given regular
expression and returns the split tokens.

## Syntax

```sql
str:tokenize(<STRING> input.string, <STRING> regex)
str:tokenize(<STRING> input.string, <STRING> regex, <BOOL> distinct)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string which needs to be split.   |               | STRING  | No       | Yes     |
| regex | The string value which is used to tokenize the `input.string`. |          | STRING | No       | Yes     |
| distinct  | This flag is used to return only distinct values.    | false         | BOOL   | Yes      | Yes     |

## Extra Return Attributes

| Name  | Description             | Possible Types |
|-------|----------------------------------------------|----------------|
| token | The attribute which contains a single token. | STRING         |

## Example 1

```sql
CREATE STREAM inputStream (str string);

@info(name = 'query1')
INSERT INTO outputStream
SELECT token
FROM inputStream#str:tokenize(str, ',');
```

The `query1` processes events from the `inputStream` and uses the `#str:tokenize(str, ',')` function to split the `str` attribute based on the specified delimiter, which is a comma (`,`). The query outputs the resulting `token` attribute values as separate events to the `outputStream`.

For example, if the input string is "Android,Windows8,iOS", the query will produce three events in the `outputStream` with `token` attribute values of "Android", "Windows8", and "iOS".
