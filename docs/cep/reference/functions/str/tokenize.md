---
title: tokenize (Stream Processor)
---

This function splits the input string into tokens using a given regular
expression and returns the split tokens.

Syntax

    str:tokenize(<STRING> input.string, <STRING> regex)
    str:tokenize(<STRING> input.string, <STRING> regex, <BOOL> distinct)

## Query Parameters

| Name         | Description                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|------------------------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string which needs to be split.                        |               | STRING              | No       | Yes     |
| regex        | The string value which is used to tokenize the `input.string`. |               | STRING              | No       | Yes     |
| distinct     | This flag is used to return only distinct values.                | false         | BOOL                | Yes      | Yes     |

Extra Return Attributes

| Name  | Description                                  | Possible Types |
|-------|----------------------------------------------|----------------|
| token | The attribute which contains a single token. | STRING         |

## Example 1

    CREATE STREAM inputStream (str string);
    @info(name = 'query1')

    insert into outputStream
    select token
    from inputStream#str:tokenize(str , ',');

This query performs tokenization on the given string. If the str is
"Android,Windows8,iOS", then the string is split into 3 events
containing the `token` attribute values, i.e., `Android`, `Windows8` and
`iOS`.
