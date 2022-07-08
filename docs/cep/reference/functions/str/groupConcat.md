---
title: groupConcat (Aggregate Function)
---

This function aggregates the received events by concatenating the keys
in those events using a separator, e.g.,a comma (,) or a hyphen (-), and
returns the concatenated key string.

Syntax

    <STRING> str:groupConcat(<STRING> key)
    <STRING> str:groupConcat(<STRING> key, <STRING> ...)
    <STRING> str:groupConcat(<STRING> key, <STRING> separator, <BOOL> distinct)
    <STRING> str:groupConcat(<STRING> key, <STRING> separator, <BOOL> distinct, <STRING> order)

## Query Parameters

| Name      | Description                                                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|----------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| key       | The string that needs to be aggregated.                                                                                          |               | STRING              | No       | Yes     |
| separator | The separator that separates each string key after concatenating the keys.                                                       | ,             | STRING              | Yes      | Yes     |
| distinct  | This is used to only have distinct values in the concatenated string that is returned.                                           | false         | BOOL                | Yes      | Yes     |
| order     | This parameter accepts `ASC` or `DESC` strings to sort the string keys in either ascending or descending order respectively. | No order      | STRING              | Yes      | Yes     |

## Example 1

    from InputStream WINDOW SLIDING_TIME(5 min)
    select str:groupConcat("key") as groupedKeys
    input OutputStream;

When we input events having values for the `key` as `'A'`, `'B'`, `'S'`,
`'C'`, `'A'`, it returns `"A,B,S,C,A"` to the `OutputStream`.

## Example 2

    from InputStream WINDOW SLIDING_TIME(5 min)
    select groupConcat("key","-",true,"ASC") as groupedKeys
    input OutputStream;

When we input events having values for the `key` as `'A'`, `'B'`, `'S'`,
`'C'`, `'A'`, specify the seperator as hyphen and choose the order to be
ascending, the function returns `"A-B-C-S"` to the `OutputStream`.
