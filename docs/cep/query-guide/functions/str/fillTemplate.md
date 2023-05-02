---
title: fillTemplate (Function)
---

fillTemplate(string, map) will replace all the keys in the string using
values in the map. fillTemplate(string, r1, r2 ..) replace all the
entries {{1}}, {{2}}, {{3}} with r1 , r2, r3.

## Syntax

```sql
<STRING> str:fillTemplate(<STRING> template, <STRING|INT|LONG|DOUBLE|FLOAT|BOOL> replacement.type, <STRING|INT|LONG|DOUBLE|FLOAT|BOOL> ...)
<STRING> str:fillTemplate(<STRING> template, <OBJECT> map)
```

## Query Parameters

| Name  | Description    | Default Value | Possible Data Types   | Optional | Dynamic |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------|----------|---------|
| template         | The string with templated fields that needs to be filled with the given strings. The format of the templated fields should be as follows: {{KEY}} where `KEY` is a STRING if you are using fillTemplate(string, map) {{KEY}} where `KEY` is an INT if you are using fillTemplate(string, r1, r2 ..) This KEY is used to map the values |               | STRING       | No       | Yes     |
| replacement.type | A set of arguments with any type: string, int, long, double, float, or bool.                                                                   | -            | STRING, INT, LONG, DOUBLE, FLOAT, BOOL | Yes      | Yes     |
| map              | A map with key-value pairs to be replaced.                                                                                                    | -            | OBJECT       | Yes      | Yes     |

## Example 1

```sql
@info(name = 'hexExample')
SELECT hex('MySQL') AS hexadecimalValue;
```

The `hexExample` demonstrates the use of the `hex()` function to convert a given input string to its hexadecimal representation. In this example, the input string is 'MySQL'. The function returns '4D7953514C', which is the hexadecimal representation of the input string.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string);

CREATE SINK STREAM OutputStream (eventTime long, hexadecimalValue string);

@info(name = 'hexStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, hex(inputString) AS hexadecimalValue
FROM InputDataStream;
```

The `hexStreamWorker` processes events from the `InputDataStream` and uses the `hex()` function to convert the `inputString` attribute to its hexadecimal representation. The query outputs the `eventTime` and the calculated `hexadecimalValue` for each event to the `OutputStream`.

## Example 3

```sql
@info(name = 'fillTemplateExample')
SELECT str:fillTemplate('{{1}} > 100 && {{2}} < 10000', 200, 300) AS filledTemplate;
```

The `fillTemplateExample` demonstrates the use of the `str:fillTemplate()` function to replace placeholders within a template string with the provided values. In this example, the template string is '{{1}} > 100 && {{2}} < 10000', with placeholders '{{1}}' and '{{2}}'. The function replaces '{{1}}' with the first value '200' and '{{2}}' with the second value '300'. The resulting filled template is '200 > 100 && 300 < 10000'.

## Example 4

```sql
CREATE STREAM InputDataStream (eventTime long, value1 int, value2 int);

CREATE SINK STREAM OutputStream (eventTime long, filledTemplate string);

@info(name = 'fillTemplateStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:fillTemplate('{{1}} > 100 && {{2}} < 10000', value1, value2) AS filledTemplate
FROM InputDataStream;
```

The `fillTemplateStreamWorker` processes events from the `InputDataStream` and uses the `str:fillTemplate()` function to replace placeholders within the template string '{{1}} > 100 && {{2}} < 10000' with the corresponding `value1` and `value2` attributes. The query outputs the `eventTime` and the filled template string `filledTemplate` for each event to the `OutputStream`.
