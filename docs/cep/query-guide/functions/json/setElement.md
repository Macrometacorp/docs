---
title: setElement (Function)
---

Function sets JSON element into a given JSON at the specific path.

## Syntax

```sql
<OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element)
<OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element, <STRING> key)
```

## Query Parameters

| Name  | Description    | Default Value | Possible Data Types  | Optional | Dynamic |
|-------|----------------|-------------|----------------|----------|---------|
| json   | The JSON to which a JSON element needs to be added/replaced.      |       | STRING OBJECT    | No       | Yes     |
| path     | The JSON path where the JSON element should be added/replaced.   |           | STRING     | No       | Yes     |
| json.element | The JSON element being added.    |           | STRING BOOL DOUBLE FLOAT INT LONG OBJECT | No       | Yes     |
| key  | The key to be used to refer the newly added element in the input JSON. | Assumes the element is added to a JSON array, or the element selected by the JSON path will be updated. | STRING     | Yes      | Yes     |

## Example 1

```sql
json:setElement(json, '$', "{'country' : 'USA'}", 'address')
```

The `json:setElement` function in this example is used to add a new element to the input JSON. Here, it adds the `address` element with the value `{'country' : 'USA'}` at the root of the JSON (`$`). 

For instance, if the input `json` is `{'name' : 'John', 'married' : true}`, the function modifies the JSON to include the new `address` element, resulting in `{'name' : 'John', 'married' : true, 'address' : {'country' : 'USA'}}`.

## Example 2

```sql
json:setElement(json, '$', 40, 'age')
```

The `json:setElement` function in this example is used to add a new `age` element with the value `40` to the root of the input JSON (`$`). 

If the input `json` is `{'name' : 'John', 'married' : true}`, the function updates the JSON to `{'name' : 'John', 'married' : true, 'age' : 40}`.

## Example 3

```sql
json:setElement(json, '$', 45, 'age')
```

The `json:setElement` function here modifies an existing `age` element in the input JSON, updating its value to `45` at the root level (`$`). 

If the input `json` is `{'name' : 'John', 'married' : true, 'age' : 40}`, the function updates the JSON to `{'name' : 'John', 'married' : true, 'age' : 45}`.

## Example 4

```sql
json:setElement(json, '$.items', 'book')
```

In this example, `json:setElement` is used to modify an existing `items` array in the input JSON, adding a new value 'book' to it. 

For example, if the input `json` is `{'name' : 'Stationary', 'items' : ['pen', 'pencil']}`, the function adds `book` to the `items` array, updating the JSON to `{'name' : 'Stationary', 'items' : ['pen', 'pencil', 'book']}`.

## Example 5

```sql
json:setElement(json, '$.address', 'city', 'SF')
```

The `json:setElement` function in this example is used to modify an existing element in the input JSON. Here, it attempts to update the `city` element within the `address` object. 

However, if the input `json` is `{'name' : 'John', 'married' : true}`, the function will not modify the JSON, because there is no valid path for `$.address`. Therefore, it returns the original JSON unmodified.

## Example 6

```sql
CREATE STREAM PersonStream (json string);
CREATE SINK STREAM UpdatedPersonStream (json string);

@info(name = 'AddAddressDetails')
INSERT INTO UpdatedPersonStream
SELECT json:setElement(json, '$', "{'city' : 'SF', 'country' : 'USA'}", 'address') AS json
FROM PersonStream;
```

In this stream worker, two streams are defined: `PersonStream` for the incoming data, and `UpdatedPersonStream` for the outgoing data.

The `AddAddressDetails` query is designed to process events from the `PersonStream`. Each event is a JSON string that contains information about a person.

The function `json:setElement(json, '$', "{'city' : 'SF', 'country' : 'USA'}", 'address')` is used within the query to add or modify an `address` object at the root of each JSON string. This address object includes a `city` and `country`.

The resulting updated JSON string, which now includes an address, is inserted into the `UpdatedPersonStream`.

In operation, this query continuously processes each person's details from `PersonStream`, adds or updates the address, and outputs the updated JSON strings into `UpdatedPersonStream`. This enables the real-time enhancement of person details within the incoming data stream.
