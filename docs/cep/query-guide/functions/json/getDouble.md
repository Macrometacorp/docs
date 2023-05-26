---
title: getDouble (Function)
---

Function retrieves the `double` value specified in the given path of the JSON element.

## Syntax

```sql
<DOUBLE> json:getDouble(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description        | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing double value.  |          | STRING OBJECT  | No       | Yes     |
| path | The JSON path to fetch the double value. |          | STRING         | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
json:getDouble(json,'$.salary')
```

The `json:getDouble(json,'$.salary')` function searches the `json` object for a floating-point (double) value associated with the key `salary`. Given a JSON object like `{'name' : 'John', 'salary' : 12000.0}`, it would return `12000.0` as there is a matching double value at `$.salary`.

## Example 2

```sql
@info(name = 'query1')
json:getDouble(json,'$.salary')
```

The `json:getDouble(json,'$.salary')` function attempts to find a double value in the `json` object at the path `$.salary`. However, if no value exists at this location, or if the value is not a double, the function returns `null`. For example, given a JSON object like `{'name' : 'John', 'age' : 23}`, it would return `null` as there is no `salary` key in the JSON object.

## Example 3

```sql
@info(name = 'query1')
json:getDouble(json,'$.name')
```

The `json:getDouble(json,'$.name')` function searches the `json` object for a double value associated with the key `name`. If there is no matching double value at `$.name`, or if the value isn't a double, the function will return `null`. For instance, given a JSON object like `{'name' : 'John', 'age' : 23}`, this function would return `null` because the value at `$.name` is a string, not a double.

## Example 4

```sql
CREATE STREAM EmployeeStream (json string);
CREATE SINK STREAM SalaryStream (name string, salary double);

@info(name = 'ExtractSalary')
INSERT INTO SalaryStream
SELECT json:getString(json, '$.name') AS name, json:getDouble(json, '$.salary') AS salary
FROM EmployeeStream#window.lengthBatch(1);
```

In this example, an `EmployeeStream` is created to receive JSON strings, each representing an employee's details. The `SalaryStream` is created to output the extracted name and salary data.

The `ExtractSalary` query listens for events on `EmployeeStream`. For each event, the query uses `json:getString(json, '$.name')` and `json:getDouble(json, '$.salary')` to extract the name (as a string) and salary (as a double) from the JSON string. These extracted values are then inserted into the `SalaryStream`.
