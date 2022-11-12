---
title: createFromJSON (Function)
---

Function returns the map created by pairing the keys with their corresponding values given in the JSON string.

Syntax

    <OBJECT> map:createFromJSON(<STRING> json.string)

## Query Parameters

| Name        | Description                                        | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------|---------------|---------------------|----------|---------|
| json.string | JSON as a string, which is used to create the map. |               | STRING              | No       | Yes     |

## Example 1

    map:createFromJSON("{€˜symbol' : 'IBM', 'price' : 200, 'volume' : 100}")

This returns a map with the keys `symbol`, `price`, and `volume`, and their values, `IBM`, `200` and `100` respectively.
