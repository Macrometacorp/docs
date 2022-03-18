---
sidebar_position: 3
---

# JSON

This extension provides capability to retrieve, insert, and modify JSON elements.

## Features

* **[group (Aggregate Function)](#group)**

    This function aggregates the JSON elements and returns a JSON object
    by adding enclosing.element if it is provided. If enclosing.element
    is not provided it aggregate the JSON elements returns a JSON array.

* **[groupAsObject (Aggregate Function)](#groupasobject)**

    This function aggregates the JSON elements and returns a JSON object
    by adding enclosing.element if it is provided. If enclosing.element
    is not provided it aggregate the JSON elements returns a JSON array.

* **[getBool (Function)](#getbool)**

    Function retrieves the `boolean` value specified in the given path
    of the JSON element.

* **[getDouble (Function)](#getdouble)**

    Function retrieves the `double` value specified in the given path
    of the JSON element.

* **[getFloat (Function)](#getfloat)**

    Function retrieves the `float` value specified in the given path
    of the JSON element.

* **[getInt (Function)](#getint)**

    Function retrieves the `int` value specified in the given path of
    the JSON element.

* **[getLong (Function)](#getlong)**

    Function retrieves the `long` value specified in the given path of
    the JSON element.

* **[getObject (Function)](#getobject)**

    Function retrieves the object specified in the given path of the
    JSON element.

* **[getString (Function)](#getstring)**

    Function retrieves value specified in the given path of the JSON
    element as a string.

* **[isExists (Function)](#isexists)**

    Function checks whether there is a JSON element present in the given
    path or not.

* **[setElement (Function)](#setelement)**

    Function sets JSON element into a given JSON at the specific path.

* **[toObject (Function)](#toobject)**

    Function generate JSON object from the given JSON string.

* **[toString (Function)](#tostring)**

    Function generates a JSON string corresponding to a given JSON
    object.

* **[tokenize (StreamProcessor)](#tokenize)**

    Stream processor tokenizes the given JSON into to multiple JSON
    string elements and sends them as separate events.

* **[tokenizeAsObject (StreamProcessor)](#tokenizeasobject)**

    Stream processor tokenizes the given JSON into to multiple JSON
    object elements and sends them as separate events.

## group

This function aggregates the JSON elements and returns a JSON object by
adding enclosing.element if it is provided. If enclosing.element is not
provided it aggregate the JSON elements returns a JSON array.

Syntax

    <OBJECT> json:group(<STRING|OBJECT> json)
    <OBJECT> json:group(<STRING|OBJECT> json, <BOOL> distinct)
    <OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element)
    <OBJECT> json:group(<STRING|OBJECT> json, <STRING> enclosing.element, <BOOL> distinct)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json              | The JSON element that needs to be aggregated.                                                            |               | STRING OBJECT       | No       | Yes     |
| enclosing.element | The JSON element used to enclose the aggregated JSON elements.                                           | EMPTY\_STRING | STRING              | Yes      | Yes     |
| distinct          | This is used to only have distinct JSON elements in the concatenated JSON object/array that is returned. | false         | BOOL                | Yes      | Yes     |

EXAMPLE 1

    select json:group("json") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}{"date":"2013-11-19","time":"12:20"}]`
to the `OutputStream`.

EXAMPLE 2

    select json:group("json", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"10:30"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}]` to the `OutputStream`.

EXAMPLE 3

    select json:group("json", "result") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`{"result":[{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}}`
to the `OutputStream`.

EXAMPLE 4

    select json:group("json", "result", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"10:30"}`, it returns
`{"result":[{"date":"2013-11-19","time":"10:30"}]}` to the
`OutputStream`.

## groupAsObject

This function aggregates the JSON elements and returns a JSON object by
adding enclosing.element if it is provided. If enclosing.element is not
provided it aggregate the JSON elements returns a JSON array.

Syntax

    <OBJECT> json:groupAsObject(<STRING|OBJECT> json)
    <OBJECT> json:groupAsObject(<STRING|OBJECT> json, <BOOL> distinct)
    <OBJECT> json:groupAsObject(<STRING|OBJECT> json, <STRING> enclosing.element)
    <OBJECT> json:groupAsObject(<STRING|OBJECT> json, <STRING> enclosing.element, <BOOL> distinct)

QUERY PARAMETERS

| Name              | Description                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|-------------------|----------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json              | The JSON element that needs to be aggregated.                                                            |               | STRING OBJECT       | No       | Yes     |
| enclosing.element | The JSON element used to enclose the aggregated JSON elements.                                           | EMPTY\_STRING | STRING              | Yes      | Yes     |
| distinct          | This is used to only have distinct JSON elements in the concatenated JSON object/array that is returned. | false         | BOOL                | Yes      | Yes     |

EXAMPLE 1

    select json:groupAsObject("json") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}{"date":"2013-11-19","time":"12:20"}]`
to the `OutputStream`.

EXAMPLE 2

    select json:groupAsObject("json", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"10:30"}`, it returns
`[{"date":"2013-11-19","time":"10:30"}]` to the `OutputStream`.

EXAMPLE 3

    select json:groupAsObject("json", "result") as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"12:20"}`, it returns
`{"result":[{"date":"2013-11-19","time":"10:30"},{"date":"2013-11-19","time":"12:20"}}`
to the `OutputStream`.

EXAMPLE 4

    select json:groupAsObject("json", "result", true) as groupedJSONArray
    from InputStream#window.length(5)
    input OutputStream;

When we input events having values for the `json` as
`{"date":"2013-11-19","time":"10:30"}` and
`{"date":"2013-11-19","time":"10:30"}`, it returns
`{"result":[{"date":"2013-11-19","time":"10:30"}]}` to the
`OutputStream`.

## getBool

Function retrieves the `boolean` value specified in the given path of
the JSON element.

Syntax

    <BOOL> json:getBool(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing boolean value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the boolean value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getBool(json,'$.married')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the
function returns `true` as there is a matching boolean at `$.married`.

EXAMPLE 2

    json:getBool(json,'$.name')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the
function returns `null` as there is no matching boolean at `$.name`.

EXAMPLE 3

    json:getBool(json,'$.foo')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the
function returns `null` as there is no matching element at `$.foo`.

## getDouble

Function retrieves the `double` value specified in the given path of
the JSON element.

Syntax

    <DOUBLE> json:getDouble(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing double value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the double value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getDouble(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'salary' : 12000.0}`, the
function returns `12000.0` as there is a matching double at `$.salary`.

EXAMPLE 2

    json:getDouble(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getDouble(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching double at `$.name`.

## getFloat

Function retrieves the `float` value specified in the given path of
the JSON element.

Syntax

    <FLOAT> json:getFloat(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing float value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the float value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getFloat(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'salary' : 12000.0}`, the
function returns `12000` as there is a matching float at `$.salary`.

EXAMPLE 2

    json:getFloat(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getFloat(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching float at `$.name`.

## getInt

Function retrieves the `int` value specified in the given path of the
JSON element.

Syntax

    <INT> json:getInt(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing int value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the int value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getInt(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `23` as there is a matching int at `$.age`.

EXAMPLE 2

    json:getInt(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getInt(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching int at `$.name`.

## getLong

Function retrieves the `long` value specified in the given path of the
JSON element.

Syntax

    <LONG> json:getLong(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing long value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the long value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getLong(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `23` as there is a matching long at `$.age`.

EXAMPLE 2

    json:getLong(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getLong(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching long at `$.name`.

## getObject

Function retrieves the object specified in the given path of the JSON
element.

Syntax

    <OBJECT> json:getObject(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing the object. |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the object.    |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getObject(json,'$.address')

If the `json` is the format
`{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the
function returns `{'city' : 'NY', 'country' : 'USA'}` as there is a
matching object at `$.address`.

EXAMPLE 2

    json:getObject(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `23` as there is a matching object at `$.age`.

EXAMPLE 3

    json:getObject(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching element at `$.salary`.

## getString

Function retrieves value specified in the given path of the JSON element
as a string.

Syntax

    <STRING> json:getString(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the value. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:getString(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `John` as there is a matching string at `$.name`.

EXAMPLE 2

    json:getString(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `null` as there are no matching element at `$.salary`.

EXAMPLE 3

    json:getString(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `23` as a string as there is a matching element at
`$.age`.

EXAMPLE 4

    json:getString(json,'$.address')

If the `json` is the format
`{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the
function returns `{'city' : 'NY', 'country' : 'USA'}` as a string as
there is a matching element at `$.address`.

## isExists

Function checks whether there is a JSON element present in the given
path or not.

Syntax

    <BOOL> json:isExists(<STRING|OBJECT> json, <STRING> path)

QUERY PARAMETERS

| Name | Description                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input that needs to be searched for an elements. |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to check for the element.                   |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:isExists(json, '$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `true` as there is an element in the given path.

EXAMPLE 2

    json:isExists(json, '$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the
function returns `false` as there is no element in the given path.

## setElement

Function sets JSON element into a given JSON at the specific path.

Syntax

    <OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element)
    <OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element, <STRING> key)

QUERY PARAMETERS

| Name         | Description                                                            | Default Value                                                                                           | Possible Data Types                      | Optional | Dynamic |
|--------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------|----------|---------|
| json         | The JSON to which a JSON element needs to be added/replaced.           |                                                                                                         | STRING OBJECT                            | No       | Yes     |
| path         | The JSON path where the JSON element should be added/replaced.         |                                                                                                         | STRING                                   | No       | Yes     |
| json.element | The JSON element being added.                                          |                                                                                                         | STRING BOOL DOUBLE FLOAT INT LONG OBJECT | No       | Yes     |
| key          | The key to be used to refer the newly added element in the input JSON. | Assumes the element is added to a JSON array, or the element selected by the JSON path will be updated. | STRING                                   | Yes      | Yes     |

EXAMPLE 1

    json:setElement(json, '$', "{'country' : 'USA'}", 'address')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the
function updates the `json` as
`{'name' : 'John', 'married' : true, 'address' : {'country' : 'USA'}}`
by adding `address` element and returns the updated JSON.

EXAMPLE 2

    json:setElement(json, '$', 40, 'age')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the
function updates the `json` as
`{'name' : 'John', 'married' : true, 'age' : 40}` by adding `age`
element and returns the updated JSON.

EXAMPLE 3

    json:setElement(json, '$', 45, 'age')

If the `json` is the format
`{'name' : 'John', 'married' : true, 'age' : 40}`, the function updates
the `json` as `{'name' : 'John', 'married' : true, 'age' : 45}` by
replacing `age` element and returns the updated JSON.

EXAMPLE 4

    json:setElement(json, '$.items', 'book')

If the `json` is the format
`{'name' : 'Stationary', 'items' : ['pen', 'pencil']}`, the function
updates the `json` as
`{'name' : 'John', 'items' : ['pen', 'pencil', 'book']}` by adding
`book` in the items array and returns the updated JSON.

EXAMPLE 5

    json:setElement(json, '$.item', 'book')

If the `json` is the format `{'name' : 'Stationary', 'item' : 'pen'}`,
the function updates the `json` as `{'name' : 'John', 'item' : 'book'}`
by replacing `item` element and returns the updated JSON.

EXAMPLE 6

    json:setElement(json, '$.address', 'city', 'SF')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the
function will not update, but returns the original JSON as there are no
valid path for `$.address`.

## toObject

Function generate JSON object from the given JSON string.

Syntax

    <OBJECT> json:toObject(<STRING> json)

QUERY PARAMETERS

| Name | Description                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json | A valid JSON string that needs to be converted to a JSON object. |               | STRING              | No       | Yes     |

EXAMPLE 1

    json:toJson(json)

This returns the JSON object corresponding to the given JSON string.

## toString

Function generates a JSON string corresponding to a given JSON object.

Syntax

    <STRING> json:toString(<OBJECT> json)

QUERY PARAMETERS

| Name | Description                                     | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------|---------------|---------------------|----------|---------|
| json | A valid JSON object to generates a JSON string. |               | OBJECT              | No       | Yes     |

EXAMPLE 1

    json:toString(json)

This returns the JSON string corresponding to a given JSON object.

## tokenize

Stream processor tokenizes the given JSON into to multiple JSON string
elements and sends them as separate events.

Syntax

    json:tokenize(<STRING|OBJECT> json, <STRING> path)
    json:tokenize(<STRING|OBJECT> json, <STRING> path, <BOOL> fail.on.missing.attribute)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json                      | The input JSON that needs to be tokenized.                                                                                                                                                     |               | STRING OBJECT       | No       | Yes     |
| path                      | The path of the set of elements that will be tokenized.                                                                                                                                        |               | STRING              | No       | Yes     |
| fail.on.missing.attribute | If there are no element on the given path, when set to `true` the system will drop the event, and when set to `false` the system will pass `null` value to the jsonElement output attribute. | true          | BOOL                | Yes      | No      |

Extra Return Attributes

| Name        | Description                                                                                                                                                                                                          | Possible Types |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| jsonElement | The JSON element retrieved based on the given path will be returned as a JSON string. If the `path` selects a JSON array then the system returns each element in the array as a JSON string via a separate events. | STRING         |

EXAMPLE 1

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path)
    insert into OutputStream;

If the input `json` is
`{name:'John', enrolledSubjects:['Mathematics', 'Physics']}`, and the
`path` is passed as `$.enrolledSubjects` then for both the elements in
the selected JSON array, it generates it generates events as
`('$.enrolledSubjects', 'Mathematics')`, and
`('$.enrolledSubjects', 'Physics')`. For the same input JSON, if the
`path` is passed as `$.name` then it will only produce one event
`('$.name', 'John')` as the `path` provided a single JSON element.

EXAMPLE 2

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path, true)
    insert into OutputStream;

If the input `json` is `{name:'John', age:25}`,and the `path` is
passed as `$.salary` then the system will produce `('$.salary', null)`,
as the `fail.on.missing.attribute` is `true` and there are no matching
element for `$.salary`.

## tokenizeAsObject

Stream processor tokenizes the given JSON into to multiple JSON object
elements and sends them as separate events.

Syntax

    json:tokenizeAsObject(<STRING|OBJECT> json, <STRING> path)
    json:tokenizeAsObject(<STRING|OBJECT> json, <STRING> path, <BOOL> fail.on.missing.attribute)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json                      | The input JSON that needs to be tokenized.                                                                                                                                                     |               | STRING OBJECT       | No       | Yes     |
| path                      | The path of the set of elements that will be tokenized.                                                                                                                                        |               | STRING              | No       | Yes     |
| fail.on.missing.attribute | If there are no element on the given path, when set to `true` the system will drop the event, and when set to `false` the system will pass `null` value to the jsonElement output attribute. | true          | BOOL                | Yes      | No      |

Extra Return Attributes

| Name        | Description                                                                                                                                                                                                          | Possible Types |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| jsonElement | The JSON element retrieved based on the given path will be returned as a JSON object. If the `path` selects a JSON array then the system returns each element in the array as a JSON object via a separate events. | OBJECT         |

EXAMPLE 1

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement    
    from InputStream#json:tokenizeAsObject(json, path)
    insert into OutputStream;

If the input `json` is
`{name:'John', enrolledSubjects:['Mathematics', 'Physics']}`, and the
`path` is passed as `$.enrolledSubjects` then for both the elements in
the selected JSON array, it generates it generates events as
`('$.enrolledSubjects', 'Mathematics')`, and
`('$.enrolledSubjects', 'Physics')`. For the same input JSON, if the
`path` is passed as `$.name` then it will only produce one event
`('$.name', 'John')` as the `path` provided a single JSON element.

EXAMPLE 2

    define stream InputStream (json string, path string);

    @info(name = 'query1')
    select path, jsonElement    
    from InputStream#json:tokenizeAsObject(json, path, true)
    insert into OutputStream;

If the input `json` is `{name:'John', age:25}`,and the `path` is
passed as `$.salary` then the system will produce `('$.salary', null)`,
as the `fail.on.missing.attribute` is `true` and there are no matching
element for `$.salary`.
