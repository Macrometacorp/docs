---
title: getBool (Function)
---

Function retrieves the `boolean` value specified in the given path of the JSON element.

## Syntax

```sql
<BOOL> json:getBool(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------|---------------|---------------------|----------|---------|
| json | The JSON input containing a boolean value. |        | STRING OBJECT    | No       | Yes   |
| path | The JSON path to fetch the boolean value. |          | STRING      | No       | Yes    |

## Example 1

```sql
@info(name = 'query1')
json:getBool(json,'$.married')
```

The `json:getBool(json,'$.married')` function attempts to find a boolean value in the JSON object `json` at the path `$.married`. If the value exists and is a boolean, the function will return that value. For instance, given a JSON object like `{'name' : 'John', 'married' : true}`, this function would return `true`.

## Example 2

```sql
@info(name = 'query1')
json:getBool(json,'$.name')
```

The `json:getBool(json,'$.name')` function tries to find a boolean value in the JSON object `json` at the path `$.name`. If the value exists and is a boolean, the function will return that value. However, if the value at the specified path is not a boolean or doesn't exist, the function will return `null`. For instance, given a JSON object like `{'name' : 'John', 'married' : true}`, this function would return `null` because the value at `$.name` is a string, not a boolean.

## Example 3

```sql
@info(name = 'query1')
json:getBool(json,'$.foo')
```

The `json:getBool(json,'$.foo')` function attempts to find a boolean value in the JSON object `json` at the path `$.foo`. If the value exists and is a boolean, the function will return that value. However, if the value at the specified path does not exist or is not a boolean, the function will return `null`. For instance, given a JSON object like `{'name' : 'John', 'married' : true}`, this function would return `null` because there is no `foo` key in the JSON object.

## Example 4

```sql
CREATE STREAM PersonStream (json string);
CREATE SINK STREAM MarriedPersonStream (name string, married bool);

@info(name = 'ExtractMaritalStatus')
INSERT INTO MarriedPersonStream
SELECT json:getString(json, '$.name') AS name, json:getBool(json, '$.married') AS married
FROM PersonStream WINDOW TUMBLING_LENGTH(1);
```

In this example, two streams are defined: `PersonStream` for input data and `MarriedPersonStream` for the output.

The `ExtractMaritalStatus` query listens for events from the `PersonStream`. Each event is a JSON string representing a person's details.

The `json:getString(json, '$.name')` and `json:getBool(json, '$.married')` functions are used to extract the name (a string) and marital status (a boolean) from each JSON string. These extracted values are then inserted into the `MarriedPersonStream`.

The query continuously processes each person's details from `PersonStream`, extracts the name and marital status, and feeds these values into the `MarriedPersonStream`.
