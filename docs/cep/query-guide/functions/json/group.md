---
title: group (Aggregate Function)
---

This function aggregates the JSON elements and returns a JSON object by adding enclosing.element if it is provided. If enclosing.element is not provided it aggregate the JSON elements returns a JSON array.

Syntax

    <OBJECT> json:group(<STRING|OBJECT> json)
    <OBJECT> json:group(<STRING|OBJECT> json, <BOOL> distinct)
    <OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element)
    <OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element, <BOOL> distinct)

## Query Parameters

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json              | The JSON element that needs to be aggregated.                                                            |               | STRING OBJECT       | No       | Yes     |
| enclosing.element | The JSON element used to enclose the aggregated JSON elements.                                           | EMPTY\_STRING | STRING              | Yes      | Yes     |
| distinct          | This is used to only have distinct JSON elements in the concatenated JSON object/array that is returned. | false         | BOOL                | Yes      | Yes     |

## Example 1

    select json:group("json") as groupedJSONArray
    from InputStream WINDOW SLIDING_LENGTH(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}{"date":"2013-11-19","time":"12:20"}]`
to the `OutputStream`.

## Example 2

    select json:group("json", true) as groupedJSONArray
    from InputStream WINDOW SLIDING_LENGTH(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"10:30"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}]` to the `OutputStream`.

## Example 3

    select json:group("json", "result") as groupedJSONArray
    from InputStream WINDOW SLIDING_LENGTH(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`{"result":[{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}}`
to the `OutputStream`.

## Example 4

    select json:group("json", "result", true) as groupedJSONArray
    from InputStream WINDOW SLIDING_LENGTH(5)
    input OutputStream;

When we input events having values for the `json` as `{"date":"2013-11-19","time":"10:30"}` and `{"date":"2013-11-19","time":"10:30"}`, it returns `{"result":[{"date":"2013-11-19","time":"10:30"}]}` to the `OutputStream`.
