---
title: fillTemplate (Function)
---

fillTemplate(string, map) will replace all the keys in the string using
values in the map. fillTemplate(string, r1, r2 ..) replace all the
entries {{1}}, {{2}}, {{3}} with r1 , r2, r3.

Syntax

    <STRING> str:fillTemplate(<STRING> template, <STRING|INT|LONG|DOUBLE|FLOAT|BOOL> replacement.type, <STRING|INT|LONG|DOUBLE|FLOAT|BOOL> ...)
    <STRING> str:fillTemplate(<STRING> template, <OBJECT> map)

## Query Parameters

| Name             | Description                                                                                                                                                                                                                                                                                                                                | Default Value | Possible Data Types               | Optional | Dynamic |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| template         | The string with templated fields that needs to be filled with the given strings. The format of the templated fields should be as follows: {{KEY}} where `KEY` is a STRING if you are using fillTemplate(string, map) {{KEY}} where `KEY` is an INT if you are using fillTemplate(string, r1, r2 ..) This KEY is used to map the values |               | STRING                            | No       | Yes     |
| replacement.type | A set of arguments with any type string\|int\|long\|double\|float\|bool.                                                                                                                                                                                                                                                                   | \-            | STRING INT LONG DOUBLE FLOAT BOOL | Yes      | Yes     |
| map              | A map with key-value pairs to be replaced.                                                                                                                                                                                                                                                                                                 | \-            | OBJECT                            | Yes      | Yes     |

## Example 1

    str:fillTemplate("{{prize}} > 100 && {{salary}} < 10000", map:create('prize', 300, 'salary', 10000))

In this example, the template is `{{prize}} > 100 && {{salary}} <
10000`.Here, the templated string {{prize}} is replaced with the value
corresponding to the `prize` key in the given map. Likewise salary
replace with the salary value of the map

## Example 2

    str:fillTemplate("{{1}} > 100 && {{2}} < 10000", 200, 300)

In this example, the template is `{{1}} > 100 && {{2}} <
10000`.Here, the templated string {{1}} is replaced with the
corresponding 1st value 200. Likewise {{2}} replace with the 300
