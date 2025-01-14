---
title: getString (Function)
---

Function retrieves value specified in the given path of the JSON element as a string.

## Syntax

```sql
<STRING> json:getString(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description    | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------|---------------|---------------------|----------|---------|
| json | The JSON input containing value.  |       | STRING OBJECT    | No     | Yes   |
| path | The JSON path to fetch the value. |       | STRING           | No     | Yes   |

## Example 1

```sql
json:getString(json,'$.name')
```

In a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getString(json,'$.name')` searches for a string value associated with the key `name`. Here, it returns `John` as there is a matching string at `$.name`.

## Example 2

```sql
json:getString(json,'$.salary')
```

For a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getString(json,'$.salary')` looks for a string value associated with the key `salary`. Here, it returns `null` as there is no matching element at `$.salary`.

## Example 3

```sql
json:getString(json,'$.age')
```

In a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getString(json,'$.age')` looks for a string value associated with the key `age`. Here, it returns `"23"` as a string, since the function can convert the numeric value at `$.age` to a string representation.

## Example 4

```sql
json:getString(json,'$.address')
```

For a JSON object like `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function `json:getString(json,'$.address')` searches for a string associated with the key `address`. Here, it returns `'{"city":"NY","country":"USA"}'` as a string, since the function can convert the nested JSON object at `$.address` into a string representation.

## Example 5

```sql
CREATE STREAM UserDetailsStream (json string);
CREATE SINK STREAM NameStream (name string);

@info(name = 'ExtractNameFromJson')
INSERT INTO NameStream
SELECT json:getString(json, '$.name') AS name
FROM UserDetailsStream;
```

In this example, two streams are defined: `UserDetailsStream` for input data and `NameStream` for output. The `ExtractNameFromJson` stream worker listens for events from the `UserDetailsStream`. Each event is a JSON string representing a user's details. The function `json:getString(json, '$.name')` is used to extract the name (a string) from each JSON string. This extracted name is then inserted into the `NameStream`. The stream worker continuously processes each user's details from `UserDetailsStream`, extracts the name, and feeds this value into the `NameStream`. This setup enables real-time analysis of the names of the users in the incoming data stream.
