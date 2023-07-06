---
title: getFloat (Function)
---

Function retrieves the `float` value specified in the given path of the JSON element.

## Syntax

```sql
<FLOAT> json:getFloat(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing float value.  |           | STRING OBJECT  | No     | Yes   |
| path | The JSON path to fetch the float value. |           | STRING         | No     | Yes   |

## Example 1

```sql
@info(name = 'query1')
json:getFloat(json,'$.salary')
```

The `json:getFloat(json,'$.salary')` function is designed to extract a floating-point number (a float) from the `json` object at the path `$.salary`. If a matching float value is present, it returns that value. For example, given a JSON object such as `{'name' : 'John', 'salary' : 12000.0}`, it would return `12000.0`.

## Example 2

```sql
@info(name = 'query1')
json:getFloat(json,'$.salary')
```

The `json:getFloat(json,'$.salary')` function tries to locate a float value in the `json` object at the path `$.salary`. If there is no value at this location, or if the value isn't a float, the function returns `null`. For instance, with a JSON object like `{'name' : 'John', 'age' : 23}`, the function returns `null` because there is no `salary` key in the JSON object.

## Example 3

```sql
@info(name = 'query1')
json:getFloat(json,'$.name')
```

The `json:getFloat(json,'$.name')` function is designed to find a float value in the `json` object at the path `$.name`. If the value at `$.name` isn't a float, or if no value is present, the function returns `null`. For example, given a JSON object such as `{'name' : 'John', 'age' : 23}`, the function returns `null` because the value at `$.name` is a string, not a float.

## Example 4

```sql
CREATE STREAM InputStream (json string);
CREATE SINK STREAM AverageIncomeStream (country string, averageIncome float);

@info(name = 'AverageIncome')
INSERT INTO AverageIncomeStream
SELECT json:getString(json, '$.country') AS country, json:getFloat(json, '$.averageIncome') AS averageIncome
FROM InputStream WINDOW TUMBLING_LENGTH(100);
```

In this example, an `InputStream` is created to receive JSON strings, each representing country income details. The `AverageIncomeStream` is created to output the extracted country name and average income data.

The `AverageIncome` query listens for events on `InputStream`. For each batch of 100 events, the query uses `json:getString(json, '$.country')` and `json:getFloat(json, '$.averageIncome')` to extract the country (as a string) and average income (as a float) from each JSON string. These extracted values are then inserted into the `AverageIncomeStream`.
