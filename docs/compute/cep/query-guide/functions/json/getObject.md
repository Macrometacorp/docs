---
title: getObject (Function)
---

Function retrieves the object specified in the given path of the JSON element.

## Syntax

```sql
<OBJECT> json:getObject(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing the object. |         | STRING OBJECT   | No   | Yes   |
| path | The JSON path to fetch the object.    |         | STRING          | No   | Yes   |

## Example 1

```sql
@info(name = 'query1')
json:getObject(json,'$.address')
```

Given a JSON object like `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function `json:getObject(json,'$.address')` searches for a JSON object associated with the key `address`. In this case, it returns `{'city' : 'NY', 'country' : 'USA'}` as there is a matching object at `$.address`.

## Example 2

```sql
@info(name = 'query2')
json:getObject(json,'$.age')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getObject(json,'$.age')` attempts to retrieve a JSON object associated with the key `age`. However, it returns `null` because the value at `$.age` is not a JSON object, it's an integer.

## Example 3

```sql
@info(name = 'query3')
json:getObject(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getObject(json,'$.salary')` attempts to retrieve a JSON object associated with the key `salary`. In this case, it returns `null` as there is no matching element at `$.salary`.

## Example 4

```sql
CREATE STREAM PersonStream (json string);
CREATE SINK STREAM AddressStream (name string, city string, country string);

@info(name = 'ExtractAddress')
INSERT INTO AddressStream
SELECT json:getString(json, '$.name') AS name, 
       json:getString(json:getObject(json, '$.address'), '$.city') AS city, 
       json:getString(json:getObject(json, '$.address'), '$.country') AS country
FROM PersonStream;
```

In this example, two streams are defined: `PersonStream` for input and `AddressStream` for output.

The `ExtractAddress` query listens for events from the `PersonStream`. Each event is a JSON string representing a person's details.

The function `json:getString(json, '$.name')` is used to extract the name (a string) from each JSON string. The functions `json:getString(json:getObject(json, '$.address'), '$.city')` and `json:getString(json:getObject(json, '$.address'), '$.country')` are used to extract the city and country from the nested address object. 

These extracted values are then inserted into the `AddressStream`.

The query continuously processes each person's details from `PersonStream`, extracts the name, city, and country, and feeds these values into the `AddressStream`. This enables real-time analysis of the address details of the persons in the incoming data stream.
