---
title: isExists (Function)
---

Function checks whether there is a JSON element present in the given path or not.

## Syntax

```sql
<BOOL> json:isExists(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| json | The JSON input that needs to be searched for an elements. |     | STRING OBJECT  | No | Yes     |
| path | The JSON path to check for the element.  |        | STRING     | No      | Yes |

## Example 1

```sql
json:isExists(json, '$.name')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:isExists(json,'$.name')` checks if an element exists at the key `name`. In this instance, it returns `true` because there is a matching element at `$.name`.

## Example 2

```sql
json:isExists(json, '$.salary')
```

With a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:isExists(json,'$.salary')` checks if an element exists at the key `salary`. In this instance, it returns `false` because there is no matching element at `$.salary`.

## Example 3

```sql
json:isExists(json, '$.age')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:isExists(json,'$.age')` checks if an element exists at the key `age`. In this instance, it returns `true` because there is a matching element at `$.age`.

## Example 4

```sql
json:isExists(json, '$.address.city')
```

For a JSON object like `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function `json:isExists(json,'$.address.city')` checks if an element exists at the key `address.city`. In this instance, it returns `true` because there is a matching element at `$.address.city`.

## Example 5

```sql
CREATE STREAM PersonStream (json string);
CREATE SINK STREAM AddressExistsStream (name string, addressExists bool);

@info(name = 'ExtractAddressData')
INSERT INTO AddressExistsStream
SELECT json:getString(json, '$.name') AS name, 
       json:isExists(json, '$.address') AS addressExists
FROM PersonStream;
```

In this example, `PersonStream` is defined for the input data and `AddressExistsStream` for the output.

The `ExtractAddressData` stream worker listens for events from the `PersonStream`. Each event is a JSON string representing a person's details.

The function `json:getString(json, '$.name')` is used to extract the name (a string) from each JSON string. The function `json:isExists(json, '$.address')` is used to check if the `address` key exists in each JSON string.

The extracted name and the result of the existence check are then inserted into the `AddressExistsStream`.

The stream worker continuously processes each person's details from `PersonStream`, extracts the name, checks the existence of the address, and feeds these values into the `AddressExistsStream`. This allows real-time analysis of whether the address details of the persons in the incoming data stream exist or not.
