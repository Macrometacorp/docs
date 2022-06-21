---
title: addAll (Function)
---

Function returns the updated list after adding all the values from the given list.

Syntax

    <OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list)
    <OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list, <BOOL> is.distinct)

## Query Parameters

| Name        | Description                                    | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|------------------------------------------------|---------------|---------------------|----------|---------|
| to.list     | The list into which the values need to copied. |               | OBJECT              | No       | Yes     |
| from.list   | The list from which the values are copied.     |               | OBJECT              | No       | Yes     |
| is.distinct | If `true` returns list with distinct values    | false         | BOOL                | Yes      | Yes     |

## Example 1

    list:putAll(toList, fromList)

If `toList` contains values (`IBM`, `gdn`), and if `fromList` contains values (`IBM`, `XYZ`) then the function returns updated `toList` with values (`IBM`, `gdn`, `IBM`, `XYZ`).

## Example 2

    list:putAll(toList, fromList, true)

If `toList` contains values (`IBM`, `gdn`), and if `fromList` contains values (`IBM`, `XYZ`) then the function returns updated `toList` with values (`IBM`, `gdn`, `XYZ`).
