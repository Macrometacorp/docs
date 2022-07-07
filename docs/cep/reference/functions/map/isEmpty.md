---
title: isEmpty (Function)
---

Function checks if the map is empty.

Syntax

    <BOOL> map:isEmpty(<OBJECT> map)

## Query Parameters

| Name | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| map  | The map the need to be checked whether it's empty or not. |               | OBJECT              | No       | Yes     |

## Example 1

    map:isEmpty(stockDetails)

Returns `true` if the stockDetails map is empty else it returns `false`.
