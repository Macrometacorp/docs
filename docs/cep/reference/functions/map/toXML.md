---
title: toXML (Function)
---

Function returns the map as an XML string.

Syntax

    <STRING> map:toXML(<OBJECT> map)
    <STRING> map:toXML(<OBJECT> map, <OBJECT|STRING> root.element.name)

## Query Parameters

| Name              | Description                                | Default Value                        | Possible Data Types | Optional | Dynamic |
|-------------------|--------------------------------------------|--------------------------------------|---------------------|----------|---------|
| map               | The map that needs to be converted to XML. |                                      | OBJECT              | No       | Yes     |
| root.element.name | The root element of the map.               | The XML root element will be ignored | OBJECT STRING       | Yes      | Yes     |

## Example 1

    toXML(company, 'abcCompany')

If `company` is a map with key-value pairs, (`symbol` : `gdn`),(`volume` : 100), and (`price` : 200), this function returns XML as a string, `<abcCompany><symbol>gdn</symbol><volume><100></volume><price>200</price></abcCompany>`.

## Example 2

    toXML(company)

If `company` is a map with key-value pairs, (`symbol` : `gdn`), (`volume` : 100), and (`price` : 200), this function returns XML without root element as a string, `<symbol>gdn</symbol><volume><100></volume><price>200</price>`.
