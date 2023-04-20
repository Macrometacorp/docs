---
title: tokenize (Stream Processor)
---

Stream processor tokenizes the given JSON into to multiple JSON string elements and sends them as separate events.

## Syntax

```sql
json:tokenize(<STRING|OBJECT> json, <STRING> path)
json:tokenize(<STRING|OBJECT> json, <STRING> path, <BOOL> fail.on.missing.attribute)
```

## Query Parameters

| Name  | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------|---------------|---------------------|----------|---------|
| json | The input JSON that needs to be tokenized. |     | STRING OBJECT  | No   | Yes   |
| path | The path of the set of elements that will be tokenized. |   | STRING  | No  | Yes |
| fail.on.missing.attribute | If there are no element on the given path, when set to `true` the system will drop the event, and when set to `false` the system will pass `null` value to the jsonElement output attribute. | true     | BOOL       | Yes      | No      |

## Extra Return Attributes

| Name        | Description            | Possible Types |
|-------------|------------------------|----------------|
| jsonElement | The JSON element retrieved based on the given path will be returned as a JSON string. If the `path` selects a JSON array then the system returns each element in the array as a JSON string via a separate events. | STRING         |

## Example 1

```sql
CREATE STREAM InputStream (json STRING, path STRING);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT path, jsonElement
FROM InputStream#json:tokenizeAsObject(json, path);
```

In this example, the query named 'query1' processes records from the `InputStream` and extracts JSON elements based on the provided `path` using the `json:tokenizeAsObject(json, path)` function. The resulting `(path, jsonElement)` pairs are inserted into the `OutputStream`.

For example, if the input `json` is `{name:'John', enrolledSubjects:['Mathematics', 'Physics']}`, and the `path` is passed as `$.enrolledSubjects`, then for both the elements in the selected JSON array, the query generates events as `('$.enrolledSubjects', 'Mathematics')` and `('$.enrolledSubjects', 'Physics')`. For the same input JSON, if the `path` is passed as `$.name`, then it will only produce one event `('$.name', 'John')` as the `path` provided a single JSON element.

## Example 2

```sql
CREATE STREAM InputStream (json STRING, path STRING);

@info(name = 'query1')
INSERT INTO OutputStream
SELECT path, jsonElement
FROM InputStream#json:tokenizeAsObject(json, path, true);
```

In this example, the query named 'query1' processes records from the `InputStream` and extracts JSON elements based on the provided `path` using the `json:tokenizeAsObject(json, path, true)` function. The `true` parameter means that the function will fail on missing attributes. The resulting `(path, jsonElement)` pairs are inserted into the `OutputStream`.

For example, if the input `json` is `{name:'John', age:25}`, and the `path` is passed as `$.salary`, then the system will produce `('$.salary', null)`, as the `fail.on.missing.attribute` is `true` and there are no matching elements for `$.salary`.
