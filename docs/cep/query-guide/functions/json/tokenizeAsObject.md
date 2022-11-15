---
title: tokenizeAsObject (Stream Processor)
---

Stream processor tokenizes the given JSON into to multiple JSON object elements and sends them as separate events.

Syntax

    json:tokenizeAsObject(<STRING|OBJECT> json, <STRING> path)
    json:tokenizeAsObject(<STRING|OBJECT> json, <STRING> path, <BOOL> fail.on.missing.attribute)

## Query Parameters

| Name                      | Description                                                                                                                                                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| json                      | The input JSON that needs to be tokenized.                                                                                                                                                     |               | STRING OBJECT       | No       | Yes     |
| path                      | The path of the set of elements that will be tokenized.                                                                                                                                        |               | STRING              | No       | Yes     |
| fail.on.missing.attribute | If there are no element on the given path, when set to `true` the system will drop the event, and when set to `false` the system will pass `null` value to the jsonElement output attribute. | true          | BOOL                | Yes      | No      |

Extra Return Attributes

| Name        | Description                                                                                                                                                                                                          | Possible Types |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| jsonElement | The JSON element retrieved based on the given path will be returned as a JSON object. If the `path` selects a JSON array then the system returns each element in the array as a JSON object via a separate events. | OBJECT         |

## Example 1

    CREATE STREAM InputStream (json string, path string);

    @info(name = 'query1')
    insert into OutputStream
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path);

If the input `json` is `{name:'John', enrolledSubjects:['Mathematics', 'Physics']}`, and the `path` is passed as `$.enrolledSubjects` then for both the elements in the selected JSON array, it generates it generates events as `('$.enrolledSubjects', 'Mathematics')`, and `('$.enrolledSubjects', 'Physics')`. For the same input JSON, if the `path` is passed as `$.name` then it will only produce one event `('$.name', 'John')` as the `path` provided a single JSON element.

## Example 2

    CREATE STREAM InputStream (json string, path string);

    @info(name = 'query1')
    insert into OutputStream
    select path, jsonElement
    from InputStream#json:tokenizeAsObject(json, path, true);

If the input `json` is `{name:'John', age:25}`,and the `path` is passed as `$.salary` then the system will produce `('$.salary', null)`, as the `fail.on.missing.attribute` is `true` and there are no matching element for `$.salary`.
