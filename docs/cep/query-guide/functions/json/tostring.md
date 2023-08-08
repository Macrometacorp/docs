---
title: toString (Function)
---

Function generates a JSON string corresponding to a given JSON object.

## Syntax

```sql
<STRING> json:toString(<OBJECT> json)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| json | A valid JSON object to generates a JSON string. |       | OBJECT  | No  | Yes  |

## Example 1

```sql
json:toString(json)
```

The function `json:toString(json)` is utilized to convert a JSON object into a corresponding JSON string. When provided with a JSON object, this function serializes the object and outputs the JSON string. This conversion is useful in scenarios where the data needs to be stored or transmitted in a string format, as it allows for easy handling and communication.

## Example 2

```sql
CREATE STREAM PersonJsonObjectStream (json object);
CREATE SINK STREAM PersonJsonStringStream (json string);

@info(name = 'ConvertToString')
INSERT INTO PersonJsonStringStream
SELECT json:toString(json) AS json
FROM PersonJsonObjectStream;
```

In this stream worker, two streams are defined: `PersonJsonObjectStream` for the input data and `PersonJsonStringStream` for the output.

The `ConvertToString` query listens for events from the `PersonJsonObjectStream`. Each event in this stream is a JSON object containing person details.

The function `json:toString(json)` is used in the query to convert each JSON object into a corresponding JSON string. The resulting JSON string is then inserted into the `PersonJsonStringStream`.

The query continuously processes each person's JSON object details from `PersonJsonObjectStream`, converts them into JSON strings, and feeds these strings into `PersonJsonStringStream`. This facilitates real-time conversion of JSON objects into JSON strings for storage or other processing tasks.
