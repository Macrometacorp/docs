---
title: addAll (Function)
---

Function returns the updated list after adding all the values from the given list.

## Syntax

```sql
<OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list)
<OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list, <BOOL> is.distinct)
```

## Query Parameters

| Name     | Description     | Default Value | Possible Data Types | Optional | Dynamic |
|----------|-----------------|---------------|---------------------|----------|---------|
| to.list     | The list into which the values need to copied. |               | OBJECT     | No       | Yes     |
| from.list   | The list from which the values are copied.     |               | OBJECT   | No       | Yes     |
| is.distinct | If `true` returns list with distinct values    | false         | BOOL     | Yes      | Yes     |

## Example 1

```sql
@info(name = 'query1')
list:putAll(toList, fromList)
```

The `list:putAll(toList, fromList)` function takes two lists as input: `toList` and `fromList`. In this example, `toList` contains values ('IBM', 'gdn'), and `fromList` contains values ('IBM', 'XYZ'). The function appends all elements from `fromList` to the `toList` and returns the updated `toList` with values ('IBM', 'gdn', 'IBM', 'XYZ').

## Example 2

```sql
@info(name = 'query1')
list:putAll(toList, fromList, true)
```

The `list:putAll(toList, fromList, true)` function takes three inputs: `toList`, `fromList`, and a boolean flag. In this example, the flag is set to `true`, which means only unique elements from `fromList` will be appended to `toList`. The `toList` contains values ('IBM', 'gdn'), and `fromList` contains values ('IBM', 'XYZ'). The function appends only the unique element 'XYZ' from `fromList` to `toList`, and returns the updated `toList` with values ('IBM', 'gdn', 'XYZ').
