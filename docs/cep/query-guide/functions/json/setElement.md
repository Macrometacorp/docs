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
@info(name = 'query1')
json:setElement(json, '$', "{'country' : 'USA'}", 'address')
```

This query, named 'query1', uses the `json:setElement` function to add a new element to the input JSON. In this case, the function adds the `address` element with the value `{'country' : 'USA'}` to the root of the JSON.

When the input `json` has the format `{'name' : 'John', 'married' : true}`, the function updates the JSON to `{'name' : 'John', 'married' : true, 'address' : {'country' : 'USA'}}` and returns the updated JSON.

## Example 2

```sql
@info(name = 'query1')
json:setElement(json, '$', 40, 'age')
```

This query, named 'query1', uses the `json:setElement` function to add a new element to the input JSON. In this case, the function adds the `age` element with the value `40` to the root of the JSON.

When the input `json` has the format `{'name' : 'John', 'married' : true}`, the function updates the JSON to `{'name' : 'John', 'married' : true, 'age' : 40}` and returns the updated JSON.

## Example 3

```sql
@info(name = 'query1')
json:setElement(json, '$', 45, 'age')
```

This query, named 'query1', uses the `json:setElement` function to modify an existing element in the input JSON. In this case, the function updates the `age` element with the new value `45` at the root of the JSON.

When the input `json` has the format `{'name' : 'John', 'married' : true, 'age' : 40}`, the function updates the JSON to `{'name' : 'John', 'married' : true, 'age' : 45}` and returns the updated JSON.

## Example 4

```sql
@info(name = 'query1')
json:setElement(json, '$.items', 'book')
```

This query, named 'query1', uses the `json:setElement` function to modify an existing element in the input JSON. In this case, the function adds a new value 'book' to the `items` array.

When the input `json` has the format `{'name' : 'Stationary', 'items' : ['pen', 'pencil']}`, the function updates the JSON to `{'name' : 'Stationary', 'items' : ['pen', 'pencil', 'book']}` by adding `book` to the `items` array and returns the updated JSON.

## Example 5

```sql
@info(name = 'query1')
json:setElement(json, '$.address', 'city', 'SF')
```

This query, named 'query1', uses the `json:setElement` function to modify an existing element in the input JSON. In this case, the function attempts to update the `city` element within the `address` element.

When the input `json` has the format `{'name' : 'John', 'married' : true}`, the function will not update the JSON because there is no valid path for `$.address`. Instead, it returns the original JSON unmodified.
