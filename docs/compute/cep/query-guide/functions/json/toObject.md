---
title: toObject (Function)
---

Function generate JSON object from the given JSON string.

## Syntax

```sql
<OBJECT> json:toObject(<STRING> json)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------|---------------|---------------------|----------|---------|
| json | A valid JSON string that needs to be converted to a JSON object. |       | STRING    | No       | Yes     |

## Example 1

```sql
json:toObject(json)
```

The function `json:toObject(json)` is utilized to convert a JSON string into a corresponding JSON object. When provided with a JSON string, this function parses the string and outputs the JSON object, enabling further operations or manipulations on the JSON object that were not possible with the string format.

## Example 2

```sql
CREATE STREAM PersonStream (json string);
CREATE SINK STREAM PersonJsonStream (json object);

@info(name = 'ConvertToJson')
INSERT INTO PersonJsonStream
SELECT json:toObject(json) AS json
FROM PersonStream;
```

This stream worker creates two streams: `PersonStream` for the input data and `PersonJsonStream` for the output data.

The `ConvertToJson` query is structured to process events from the `PersonStream`. Each event in this stream is a JSON string that contains information about a person.

The function `json:toObject(json)` is used within the query to convert each JSON string into a corresponding JSON object. The resulting JSON object is then inserted into the `PersonJsonStream`.

This query operates continuously, processing each person's JSON string details from `PersonStream`, converting them into JSON objects, and then feeding the JSON objects into `PersonJsonStream`. This allows for real-time conversion of JSON strings into JSON objects for further processing.
