---
title: group (Aggregate Function)
---

This function aggregates the JSON elements and returns a JSON object by adding `enclosing.element` if it is provided. If `enclosing.element` is not provided, then it aggregate the JSON elements returns a JSON array.

## Syntax

```sql
<OBJECT> json:group(<STRING|OBJECT> json)
<OBJECT> json:group(<STRING|OBJECT> json, <BOOL> distinct)
<OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element)
<OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element, <BOOL> distinct)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| json     | The JSON element that needs to be aggregated.   |         | STRING OBJECT     | No       | Yes     |
| enclosing.element | The JSON element used to enclose the aggregated JSON elements.    | EMPTY_STRING | STRING      | Yes      | Yes     |
| distinct     | This is used to only have distinct JSON elements in the concatenated JSON object/array that is returned. | false         | BOOL       | Yes      | Yes     |

## Example 1

```sql
@info(name = 'query1')
SELECT json:group("json") AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

The given query uses the `json:group` function to aggregate the JSON objects from the `InputStream` within a sliding window of five events. Given the input events:

- `{"date":"2013-11-19","time":"10:30"}`
- `{"date":"2013-11-19","time":"12:20"}`

The output `groupedJSONArray` contains:

`[{"date":"2013-11-19","time":"10:30"}, {"date":"2013-11-19","time":"12:20"}]`

This aggregated result is sent to the `OutputStream`.

## Example 2

```sql
@info(name = 'query1')
SELECT json:group("json", true) AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

The given query uses the `json:group` function with `true` as the second parameter to aggregate the unique JSON objects from the `InputStream` within a sliding window of five events. Given the input events:

- `{"date":"2013-11-19","time":"10:30"}`
- `{"date":"2013-11-19","time":"10:30"}`

The output `groupedJSONArray` contains:

`[{"date":"2013-11-19","time":"10:30"}]`

This aggregated result is sent to the `OutputStream`.

## Example 3

```sql
@info(name = 'query1')
SELECT json:group("json", "result") AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

The given query uses the `json:group` function with `"result"` as the second parameter to aggregate the JSON objects from the `InputStream` within a sliding window of five events and creates a JSON object with a key named "result". Given the input events:

- `{"date":"2013-11-19","time":"10:30"}`
- `{"date":"2013-11-19","time":"12:20"}`

The output `groupedJSONArray` contains:

`{"result":[{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}}`

This aggregated result is sent to the `OutputStream`.

## Example 4

```sql
@info(name = 'query1')
SELECT json:group("json", "result", true) AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

The given query uses the `json:group` function with the parameters `"result"` and `true` to aggregate unique JSON objects from the `InputStream` within a sliding window of five events and creates a JSON object with a key named "result". Given the input events:

- `{"date":"2013-11-19","time":"10:30"}`
- `{"date":"2013-11-19","time":"10:30"}`

The output `groupedJSONArray` contains:

`{"result":[{"date":"2013-11-19","time":"10:30"}]}`

Since the `true` parameter is used, only unique JSON objects are included in the result. This aggregated result is sent to the `OutputStream`.
