---
title: getVar
---

This functions returns the value of the `var` if present. If the `var` is unknown to the stream worker, `default.value` (if specified) are returned.

## Syntax

    <STRING> context:getVar(<STRING> var, <STRING> default.value)

## Query Parameters

| Name | Description                                                                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| var  | The variable name whose value should be returned.                                                                 |               | STRING | No       | Yes     |
| default.value    | If the `var` is unknown `default.value` will be returned. | null | STRING                | Yes       | Yes     |

## Supported Context Variables

| Name | Description |
|------|-------------|
| region  | Current region where the Stream App is running e.g. `gdn-sfo2` |               | STRING | No       | Yes     |

## Example 1

    insert into OutputStream
    select customerName, context:getVar('region') as region
    from InputStream;

## Example 2

    insert into OutputStream
    select customerName
    from InputStream[region == context:getVar('region')];
