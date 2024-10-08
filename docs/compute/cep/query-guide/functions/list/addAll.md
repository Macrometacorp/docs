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
list:addAll(toList, fromList)
```

This function call takes two lists as inputs: `toList` and `fromList`. It appends all elements from `fromList` to `toList`. For example, if `toList` initially contains ('IBM', 'GDN') and `fromList` contains ('IBM', 'XYZ'), the resulting `toList` includes all these values: ('IBM', 'GDN', 'IBM', 'XYZ').

## Example 2

```sql
list:addAll(toList, fromList, true)
```

In this function call, the third input is a Boolean flag set to `true`. This setting means that only unique elements from `fromList` are appended to `toList`. Using the same initial list values as in the previous example, this function call appends only the unique element 'XYZ' from `fromList` to `toList`. The updated `toList` includes these values: ('IBM', 'GDN', 'XYZ').

## Example 3

```sql
CREATE STREAM InputListsStream (toList OBJECT, fromList OBJECT);
CREATE SINK STREAM OutputListStream (updatedList OBJECT);

@info(name = 'AddAllToListStreamWorker')
INSERT INTO OutputListStream
SELECT list:addAll(toList, fromList) AS updatedList
FROM InputListsStream;
```

The `AddAllToListStreamWorker` handles events from the `InputListsStream`, which includes two list attributes: `toList` and `fromList`. It uses the `list:addAll(toList, fromList)` function to append all elements from `fromList` to `toList`. The updated `toList`, now containing all elements from both lists, is output as the `updatedList` attribute for each event to the `OutputListStream`.
