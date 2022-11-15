---
title: text (Source Mapper)
---

This extension is a text to Stream App event input mapper. Transports that
accept text messages can utilize this extension to convert the incoming
text message to Stream App event. Users can either use a pre-defined text
format where event conversion happens without any additional
configurations, or specify a regex to map a text message using custom
configurations.

Syntax

    CREATE SOURCE <NAME> WITH (map.type="text", regex.groupid="<STRING>", fail.on.missing.attribute="<BOOL>", event.grouping.enabled="<BOOL>", delimiter="<STRING>", new.line.character="<STRING>")


## Query Parameters

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                         | Default Value        | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|---------------------|----------|---------|
| regex.groupid             | This parameter specifies a regular expression group. The `groupid` can be any capital letter (e.g., regex.A,regex.B .. etc). You can specify any number of regular expression groups. In the attribute annotation, you need to map all attributes to the regular expression group with the matching group index. If you need to to enable custom mapping, it is required to specifythe matching group for each and every attribute. |                      | STRING              | No       | No      |
| fail.on.missing.attribute | This parameter specifies how unknown attributes should be handled. If it is set to `true` a message is dropped if its execution fails, or if one or more attributes do not have values. If this parameter is set to `false`, null values are assigned to attributes with missing values, and messages with such attributes are not dropped.                                                                                         | true                 | BOOL                | Yes      | No      |
| event.grouping.enabled    | This parameter specifies whether event grouping is enabled or not. To receive a group of events together and generate multiple events, this parameter must be set to `true`.                                                                                                                                                                                                                                                        | false                | BOOL                | Yes      | No      |
| delimiter                 | This parameter specifies how events must be separated when multiple events are received. This must be whole line and not a single character.                                                                                                                                                                                                                                                                                        | ~~~~~~~~~~ | STRING              | Yes      | No      |
| new.line.character        | This attribute indicates the new line character of the event that is expected to be received. This is used mostly when communication between 2 types of operating systems is expected. For example, Linux uses `\n` as the end of line character whereas windows uses `\r\n`.                                                                                                                                                       | \\n                  | STRING              | Yes      | No      |

## Example 1

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='text') (symbol string, price float, volume long);

This query performs a default text input mapping. The expected input is
as follows: symbol:"gdn", price:55.6, volume:100 OR symbol:`gdn`,
price:55.6, volume:100 If group events is enabled then input should be
as follows: symbol:"gdn", price:55.6, volume:100 ~~~~~~~~~~
symbol:"gdn", price:55.6, volume:100

## Example 2

    CREATE SOURCE FooStream WITH (type='inMemory', topic='stock', map.type='text', map.fail.on.missing.attribute='true', map.regex.A='(\w+)\s([-0-9]+)', map.regex.B='volume\s([-0-9]+)', map.attributes="symbol='A[1]', price='A[2]', volume='B'") (symbol string, price float, volume long);

This query performs a custom text mapping. The expected input is as
follows: wos2 550 volume 100 If group events is enabled then input
should be as follows: wos2 550 volume 100 ~~~~~~~~~~ wos2 550
volume 100 ~~~~~~~~~~ wos2 550 volume 100
