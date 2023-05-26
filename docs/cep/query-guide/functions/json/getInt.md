---
title: getInt (Function)
---

Function retrieves the `int` value specified in the given path of the JSON element.

## Syntax

```sql
<INT> json:getInt(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing int value.  |             | STRING OBJECT   | No     | Yes   |
| path | The JSON path to fetch the int value. |             | STRING          | No     | Yes   |

## Example 1

```sql
@info(name = 'query1')
json:getLong(json,'$.id')
```

For a JSON object like `{'name' : 'John', 'id' : 1234567890}`, the function `json:getLong(json,'$.id')` searches for a long integer (a long) associated with the key `id`. If a matching value is present, it returns that value. In this example, it would return `1234567890`.

## Example 2

```sql
@info(name = 'query1')
json:getLong(json,'$.id')
```

The `json:getLong(json,'$.id')` function attempts to locate a long value in the `json` object at the path `$.id`. If there is no value at this location, or if the value isn't a long, the function returns `null`. For instance, given a JSON object such as `{'name' : 'John', 'age' : 23}`, the function returns `null` because there is no `id` key in the JSON object.

## Example 3

```sql
@info(name = 'query1')
json:getLong(json,'$.name')
```

The `json:getLong(json,'$.name')` function attempts to find a long value in the `json` object at the path `$.name`. If the value at `$.name` isn't a long, or if no value is present, the function returns `null`. For example, given a JSON object such as `{'name' : 'John', 'age' : 23}`, the function returns `null` because the value at `$.name` is a string, not a long.

## Example 4

```sql
CREATE STREAM InputStream (json string);
CREATE SINK STREAM AgeStream (name string, age int);

@info(name = 'ExtractAge')
INSERT INTO AgeStream
SELECT json:getString(json, '$.name') AS name, json:getInt(json, '$.age') AS age
FROM InputStream#window.lengthBatch(100);
```

This stream worker reads JSON strings from the `InputStream` and for each batch of 100 events, it extracts the name and age from the JSON string. The extracted data is then inserted into the `AgeStream`. 

In the JSON string, it is expected that there are `name` and `age` fields for this query to function correctly. The `json:getString(json, '$.name')` function retrieves the name from the JSON string, and `json:getInt(json, '$.age')` retrieves the age. If the expected fields do not exist in the JSON string, null values will be inserted into the `AgeStream`.
