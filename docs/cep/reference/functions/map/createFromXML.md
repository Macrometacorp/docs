---
title: createFromXML (Function)
---

Function returns the map created by pairing the keys with their corresponding values,given as an XML string.

Syntax

    <OBJECT> map:createFromXML(<STRING> xml.string)

## Query Parameters

| Name       | Description                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------------------------------------------|---------------|---------------------|----------|---------|
| xml.string | The XML string, which is used to create the map. |               | STRING              | No       | Yes     |

## Example 1

    map:createFromXML("<stock>
                          <symbol>IBM</symbol>
                          <price>200</price>
                          <volume>100</volume>
                       </stock>")

This returns a map with the keys `symbol`, `price`, `volume`, and with their values `IBM`, `200` and `100` respectively.
