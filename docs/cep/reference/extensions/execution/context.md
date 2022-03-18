---
sidebar_position: 1
---

# Context

This extension provides useful environment properties such as current region where the Stream App is running.

## Features

* **[getVar (var, default.value)](#getVar)**

    This functions returns the value of the `var` if present. If the `var` is unknown to the Stream App, `default.value` (if specified) will be returned.

## getVar

This functions returns the value of the `var` if present. If the `var` is unknown to the Stream App, `default.value` (if specified) will be returned.

Syntax

    <STRING> context:getVar(<STRING> var, <STRING> default.value)

QUERY PARAMETERS

| Name | Description                                                                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| var  | The variable name whose value should be returned.                                                                 |               | STRING | No       | Yes     |
| default.value    | If the `var` is unknown `default.value` will be returned. | null | STRING                | Yes       | Yes     |

SUPPORTED CONTEXT VARIABLES

| Name | Description | 
|------|-------------|
| region  | Current region where the Stream App is ruuning e.g. `gdn-sfo2` |               | STRING | No       | Yes     |

EXAMPLE 1

    select customerName, context:getVar('region') as region
    from InputStream
    insert into OutputStream;
    
EXAMPLE 2

    select customerName
    from InputStream[region == context:getVar('region')]
    insert into OutputStream;
