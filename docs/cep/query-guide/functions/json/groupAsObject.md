---
title: groupAsObject (Aggregate Function)
---

This function aggregates the JSON elements and returns a JSON object by adding `enclosing.element` if it is provided. If `enclosing.element` is not provided, then it aggregate the JSON elements returns a JSON array.

## Syntax

```sql
<OBJECT> json:groupAsObject(<STRING|OBJECT> json)
<OBJECT> json:groupAsObject(<STRING|OBJECT> json, <BOOL> distinct)
<OBJECT> json:groupAsObject(<STRING|OBJECT> json, <STRING> enclosing.element)
<OBJECT> json:groupAsObject(<STRING|OBJECT> json, <STRING> enclosing.element, <BOOL> distinct)
```

## Query Parameters

| Name    | Description    | Default Value | Possible Data Types | Optional | Dynamic |
|---------|----------------|---------------|---------------------|----------|---------|
| json      | The JSON element that needs to be aggregated.  |          | STRING OBJECT   | No     | Yes     |
| enclosing.element | The JSON element used to enclose the aggregated JSON elements.      | EMPTY_STRING | STRING     | Yes      | Yes     |
| distinct       | This is used to only have distinct JSON elements in the concatenated JSON object/array that is returned. | false     | BOOL     | Yes      | Yes     |

## Example 1

```sql
@info(name = 'query1')
SELECT json:groupAsObject("json") AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

This query, named 'query1', processes events from the `InputStream` using a sliding window of length 5. It utilizes the `json:groupAsObject` function to aggregate JSON elements from the input events and returns them as a JSON array. The resulting JSON array, named `groupedJSONArray`, is directed to the `OutputStream`.

When input events have values for the `json` as {"date":"2013-11-19","time":"10:30"} and {"date":"2013-11-19","time":"12:20"}, the function returns [{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}] to the `OutputStream`.

## Example 2

```sql
@info(name = 'query1')
SELECT json:groupAsObject("json", true) AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

This query, named 'query1', processes events from the `InputStream` using a sliding window of length 5. It uses the `json:groupAsObject` function with the `distinct` parameter set to true to aggregate distinct JSON elements from the input events and returns them as a JSON array. The resulting JSON array, named `groupedJSONArray`, is directed to the `OutputStream`.

When input events have values for the `json` as {"date":"2013-11-19","time":"10:30"} and {"date":"2013-11-19","time":"10:30"}, the function returns [{"date":"2013-11-19","time":"10:30"}] to the `OutputStream`, as it only includes distinct JSON elements.

## Example 3

```sql
@info(name = 'query1')
SELECT json:groupAsObject("json", "result") AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

This query, named 'query1', processes events from the `InputStream` using a sliding window of length 5. It uses the `json:groupAsObject` function with the `enclosing.element` parameter set to "result" to aggregate JSON elements from the input events and returns them as a JSON object. The resulting JSON object, named `groupedJSONArray`, is directed to the `OutputStream`.

When input events have values for the `json` as {"date":"2013-11-19","time":"10:30"} and {"date":"2013-11-19","time":"12:20"}, the function returns {"result":[{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}]} to the `OutputStream`, as it includes the aggregated JSON elements enclosed by the "result" element.

## Example 4

```sql
@info(name = 'query1')
SELECT json:groupAsObject("json", "result", true) AS groupedJSONArray
FROM InputStream WINDOW SLIDING_LENGTH(5)
INPUT OutputStream;
```

This query, named 'query1', processes events from the `InputStream` using a sliding window of length 5. It uses the `json:groupAsObject` function with the `enclosing.element` parameter set to "result" and the `distinct` parameter set to true to aggregate distinct JSON elements from the input events and returns them as a JSON object. The resulting JSON object, named `groupedJSONArray`, is directed to the `OutputStream`.

When input events have values for the `json` as {"date":"2013-11-19","time":"10:30"} and {"date":"2013-11-19","time":"10:30"}, the function returns {"result":[{"date":"2013-11-19","time":"10:30"}]} to the OutputStream, as it includes the distinct aggregated JSON elements enclosed by the "result" element.
