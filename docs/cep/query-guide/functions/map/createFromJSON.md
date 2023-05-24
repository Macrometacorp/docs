---
title: createFromJSON (Function)
---

Function returns the map created by pairing the keys with their corresponding values given in the JSON string.

## Syntax

```sql
<OBJECT> map:createFromJSON(<STRING> json.string)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|---------------------|----------|---------|
| json.string | JSON as a string, which is used to create the map. |               | STRING   | No   | Yes   |

## Example 1

```sql
map:createFromJSON('{"symbol" : "IBM", "price" : 200, "volume" : 100}')
```

This function creates a map from a JSON string. The provided JSON string `{"symbol" : "IBM", "price" : 200, "volume" : 100}` is converted into a map with keys `symbol`, `price`, and `volume` mapped to their corresponding values `IBM`, `200`, and `100`.

## Example 2

```sql
CREATE STREAM InputStream (jsonString string);
CREATE SINK STREAM OutputStream (mapOutput map<string, object>);

@info(name = 'CreateMapFromJSON')
INSERT INTO OutputStream
SELECT map:createFromJSON(jsonString) AS mapOutput
FROM InputStream;
```

In this example, a stream worker is created that uses the `map:createFromJSON` function to convert each `jsonString` event in the `InputStream` into a map. This map is then output as `mapOutput` in the `OutputStream`. 

This example allows you to create maps dynamically from JSON strings coming in through a stream, which can be a powerful tool when dealing with JSON data in real-time streaming scenarios.
