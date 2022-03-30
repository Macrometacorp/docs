---
sidebar_position: 4
---

# List

This extension provides capability to generate and manipulate list data objects.

## Features

* **[collect (Aggregate Function)](#collect)**

    Collects multiple values to construct a list.

* **[merge (Aggregate Function)](#merge)**

    Collects multiple lists to merge as a single list.

* **[add (Function)](#add)**

    Function returns the updated list after adding the given value.

* **[addAll (Function)](#addall)**

    Function returns the updated list after adding all the values from
    the given list.

* **[clear (Function)](#clear)**

    Function returns the cleared list.

* **[clone (Function)](#clone)**

    Function returns the cloned list.

* **[contains (Function)](#contains)**

    Function checks whether the list contains the specific value.

* **[containsAll (Function)](#containsall)**

    Function checks whether the list contains all the values in the
    given list.

* **[create (Function)](#create)**

    Function creates a list containing all values provided.

* **[get (Function)](#get)**

    Function returns the value at the specific index, null if index is
    out of range.

* **[indexOf (Function)](#indexof)**

    Function returns the last index of the given element.

* **[isEmpty (Function)](#isempty)**

    Function checks if the list is empty.

* **[isList (Function)](#islist)**

    Function checks if the object is type of a list.

* **[lastIndexOf (Function)](#lastindexof)**

    Function returns the index of the given value.

* **[remove (Function)](#remove)**

    Function returns the updated list after removing the element with
    the specified value.

* **[removeAll (Function)](#removeall)**

    Function returns the updated list after removing all the element
    with the specified list.

* **[removeByIndex (Function)](#removebyindex)**

    Function returns the updated list after removing the element with
    the specified index.

* **[retainAll (Function)](#retainall)**

    Function returns the updated list after retaining all the elements
    in the specified list.

* **[setValue (Function)](#setvalue)**

    Function returns the updated list after replacing the element in the
    given index by the given value.

* **[size (Function)](#size)**

    Function to return the size of the list.

* **[sort (Function)](#sort)**

    Function returns lists sorted in ascending or descending order.

* **[tokenize (StreamProcessor)](#tokenize)**

    Tokenize the list and return each key, value as new attributes in
    events

## collect

Collects multiple values to construct a list.

Syntax

    <OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
    <OBJECT> list:collect(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <BOOL> is.distinct)

QUERY PARAMETERS

| Name        | Description                                    | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------------|------------------------------------------------|---------------|------------------------------------------|----------|---------|
| value       | Value of the list element                      |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| is.distinct | If `true` only distinct elements are collected | false         | BOOL                                     | Yes      | Yes     |

Examples EXAMPLE 1

    select list:collect(symbol) as stockSymbols
    from StockStream#window.lengthBatch(10)
    insert into OutputStream;

For the window expiry of 10 events, the collect() function will collect
attributes of `symbol` to a single list and return as stockSymbols.

## merge

Collects multiple lists to merge as a single list.

Syntax

    <OBJECT> list:merge(<OBJECT> list)
    <OBJECT> list:merge(<OBJECT> list, <BOOL> is.distinct)

QUERY PARAMETERS

| Name        | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|---------------------------------------------|---------------|---------------------|----------|---------|
| list        | List to be merged                           |               | OBJECT              | No       | Yes     |
| is.distinct | Whether to return list with distinct values | false         | BOOL                | Yes      | Yes     |

Examples EXAMPLE 1
    
    select list:merge(list) as stockSymbols
    from StockStream#window.lengthBatch(2)
    insert into OutputStream;

For the window expiry of 2 events, the merge() function will collect
attributes of `list` and merge them to a single list, returned as
stockSymbols.

## add

Function returns the updated list after adding the given value.

Syntax

    <OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
    <OBJECT> list:add(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value, <INT> index)

QUERY PARAMETERS

| Name  | Description                                      | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|--------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to which the value should be added.     |               | OBJECT                                   | No       | Yes     |
| value | The value to be added.                           |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |
| index | The index in which the value should to be added. | last          | INT                                      | Yes      | Yes     |

Examples EXAMPLE 1

    list:add(stockSymbols, 'IBM')

Function returns the updated list after adding the value `IBM` in the
last index.

EXAMPLE 2

    list:add(stockSymbols, 'IBM', 0)

Function returns the updated list after adding the value `IBM` in the
0th index.

## addAll

Function returns the updated list after adding all the values from the
given list.

Syntax

    <OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list)
    <OBJECT> list:addAll(<OBJECT> to.list, <OBJECT> from.list, <BOOL> is.distinct)

QUERY PARAMETERS

| Name        | Description                                    | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|------------------------------------------------|---------------|---------------------|----------|---------|
| to.list     | The list into which the values need to copied. |               | OBJECT              | No       | Yes     |
| from.list   | The list from which the values are copied.     |               | OBJECT              | No       | Yes     |
| is.distinct | If `true` returns list with distinct values    | false         | BOOL                | Yes      | Yes     |

Examples EXAMPLE 1

    list:putAll(toList, fromList)

If `toList` contains values *('IBM', 'GDN')*, and if `fromList`
contains values *('IBM', 'XYZ')* then the function returns updated
`toList` with values *('IBM', 'GDN', 'IBM', 'XYZ')*.

EXAMPLE 2

    list:putAll(toList, fromList, true)

If `toList` contains values *('IBM', 'GDN')*, and if `fromList`
contains values *('IBM', 'XYZ')* then the function returns updated
`toList` with values *('IBM', 'GDN', 'XYZ')*.

## clear

Function returns the cleared list.

Syntax

    <OBJECT> list:clear(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                        | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------|---------------|---------------------|----------|---------|
| list | The list which needs to be cleared |               | OBJECT              | No       | Yes     |

Examples EXAMPLE 1

    list:clear(stockDetails)

Returns an empty list.

## clone

Function returns the cloned list.

Syntax

    <OBJECT> list:clone(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| list | The list to which needs to be cloned. |               | OBJECT              | No       | Yes     |

Examples EXAMPLE 1

    list:clone(stockSymbols)

Function returns cloned list of stockSymbols.

## contains

Function checks whether the list contains the specific value.

Syntax

    <BOOL> list:contains(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                                                | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list that needs to be checked on whether it contains the value or not. |               | OBJECT                                   | No       | Yes     |
| value | The value that needs to be checked.                                        |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

Examples EXAMPLE 1

    list:contains(stockSymbols, 'IBM')

Returns `true` if the stockSymbols list contains value `IBM` else it
returns `false`.

## containsAll

Function checks whether the list contains all the values in the given
list.

Syntax

    <BOOL> list:containsAll(<OBJECT> list, <OBJECT> given.list)

QUERY PARAMETERS

| Name       | Description                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|------------|---------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be checked on whether it contains all the values or not. |               | OBJECT              | No       | Yes     |
| given.list | The list which contains all the values to be checked.                           |               | OBJECT              | No       | Yes     |

Examples EXAMPLE 1

    list:containsAll(stockSymbols, latestStockSymbols)

Returns `true` if the stockSymbols list contains values in
latestStockSymbols else it returns `false`.

## create

Function creates a list containing all values provided.

Syntax

    <OBJECT> list:create()
    <OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1)
    <OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> ...)

QUERY PARAMETERS

| Name   | Description | Default Value | Possible Data Types                      | Optional | Dynamic |
|--------|-------------|---------------|------------------------------------------|----------|---------|
| value1 | Value 1     |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | Yes      | Yes     |

Examples EXAMPLE 1

    list:create(1, 2, 3, 4, 5, 6)

This returns a list with values `1`, `2`, `3`, `4`, `5` and `6`.

EXAMPLE 2

    list:create()

This returns an empty list.

## get

Function returns the value at the specific index, null if index is out
of range.

Syntax

    <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> list:get(<OBJECT> list, <INT> index)

QUERY PARAMETERS

| Name  | Description                   | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------------------------|---------------|---------------------|----------|---------|
| list  | Attribute containing the list |               | OBJECT              | No       | Yes     |
| index | Index of the element          |               | INT                 | No       | Yes     |

Examples EXAMPLE 1

    list:get(stockSymbols, 1)

This returns the element in the 1st index in the stockSymbols list.

## indexOf

Function returns the last index of the given element.

Syntax

    <INT> list:indexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to be checked to get index of an element. |               | OBJECT                                   | No       | Yes     |
| value | Value for which last index needs to be identified. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

Examples EXAMPLE 1

    list:indexOf(stockSymbols. `IBM`)

Returns the last index of the element `IBM` if present else it returns
-1.

## isEmpty

Function checks if the list is empty.

Syntax

    <BOOL> list:isEmpty(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                                                   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|---------------------|----------|---------|
| list | The list that needs to be checked whether it's empty or not. |               | OBJECT              | No       | Yes     |

Examples EXAMPLE 1

    list:isEmpty(stockSymbols)

Returns `true` if the stockSymbols list is empty else it returns
`false`.

## isList

Function checks if the object is type of a list.

Syntax

    <BOOL> list:isList(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> arg)

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | The argument the need to be determined whether it's a list or not. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

Examples EXAMPLE 1

    list:isList(stockSymbols)

Returns `true` if the stockSymbols is and an instance of
`java.util.List` else it returns `false`.

## lastIndexOf

Function returns the index of the given value.

Syntax

    <INT> list:lastIndexOf(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to be checked to get index of an element. |               | OBJECT                                   | No       | Yes     |
| value | Value for which last index needs to be identified. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

Examples EXAMPLE 1

    list:lastIndexOf(stockSymbols. `IBM`)

Returns the last index of the element `IBM` if present else it returns
-1.

## remove

Function returns the updated list after removing the element with the
specified value.

Syntax

    <OBJECT> list:remove(<OBJECT> list, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                     | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|-------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list that needs to be updated.              |               | OBJECT                                   | No       | Yes     |
| value | The value of the element that needs to removed. |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

Examples EXAMPLE 1

    list:remove(stockSymbols, 'IBM')

This returns the updated list, stockSymbols after stockSymbols the value
`IBM`.

## removeAll

Function returns the updated list after removing all the element with
the specified list.

Syntax

    <OBJECT> list:removeAll(<OBJECT> list, <OBJECT> given.list)

QUERY PARAMETERS

| Name       | Description                                           | Default Value | Possible Data Types | Optional | Dynamic |
|------------|-------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.                    |               | OBJECT              | No       | Yes     |
| given.list | The list with all the elements that needs to removed. |               | OBJECT              | No       | Yes     |

Examples EXAMPLE 1

    list:removeAll(stockSymbols, latestStockSymbols)

This returns the updated list, stockSymbols after removing all the
values in latestStockSymbols.

## removeByIndex

Function returns the updated list after removing the element with the
specified index.

Syntax

    <OBJECT> list:removeByIndex(<OBJECT> list, <INT> index)

QUERY PARAMETERS

| Name  | Description                                     | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------------------------------------------|---------------|---------------------|----------|---------|
| list  | The list that needs to be updated.              |               | OBJECT              | No       | Yes     |
| index | The index of the element that needs to removed. |               | INT                 | No       | Yes     |

Examples EXAMPLE 1

    list:removeByIndex(stockSymbols, 0)

This returns the updated list, stockSymbols after removing value at 0 th
index.

## retainAll

Function returns the updated list after retaining all the elements in
the specified list.

Syntax

    <OBJECT> list:retainAll(<OBJECT> list, <OBJECT> given.list)

QUERY PARAMETERS

| Name       | Description                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------------|--------------------------------------------------------|---------------|---------------------|----------|---------|
| list       | The list that needs to be updated.                     |               | OBJECT              | No       | Yes     |
| given.list | The list with all the elements that needs to reatined. |               | OBJECT              | No       | Yes     |

Examples EXAMPLE 1

    list:retainAll(stockSymbols, latestStockSymbols)

This returns the updated list, stockSymbols after retaining all the
values in latestStockSymbols.

## setValue

Function returns the updated list after replacing the element in the
given index by the given value.

Syntax

    <OBJECT> list:setValue(<OBJECT> list, <INT> index, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)

QUERY PARAMETERS

| Name  | Description                                        | Default Value | Possible Data Types                      | Optional | Dynamic |
|-------|----------------------------------------------------|---------------|------------------------------------------|----------|---------|
| list  | The list to which the value should be updated.     |               | OBJECT                                   | No       | Yes     |
| index | The index in which the value should to be updated. |               | INT                                      | No       | Yes     |
| value | The value to be updated with.                      |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

Examples EXAMPLE 1

    list:set(stockSymbols, 0, 'IBM')

Function returns the updated list after replacing the value at 0th index
with the value `IBM`

## size

Function to return the size of the list.

Syntax

    <INT> list:size(<OBJECT> list)

QUERY PARAMETERS

| Name | Description                                 | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------|---------------|---------------------|----------|---------|
| list | The list for which size should be returned. |               | OBJECT              | No       | Yes     |

Examples EXAMPLE 1

    list:size(stockSymbols)

Returns size of the `stockSymbols` list.

## sort

Function returns lists sorted in ascending or descending order.

Syntax

    <OBJECT> list:sort(<OBJECT> list)
    <OBJECT> list:sort(<OBJECT> list, <STRING> order)

QUERY PARAMETERS

| Name  | Description                                                | Default Value | Possible Data Types | Optional | Dynamic |
|-------|------------------------------------------------------------|---------------|---------------------|----------|---------|
| list  | The list which should be sorted.                           |               | OBJECT              | No       | Yes     |
| order | Order in which the list needs to be sorted (ASC/DESC/REV). | REV           | STRING              | Yes      | No      |

Examples EXAMPLE 1

    list:sort(stockSymbols)

Function returns the sorted list in ascending order.

EXAMPLE 2

    list:sort(stockSymbols, 'DESC')

Function returns the sorted list in descending order.

## tokenize

Tokenize the list and return each key, value as new attributes in events

Syntax

    list:tokenize(<OBJECT> list)
    list:tokenize(<OBJECT> list, <OBJECT> ...)

QUERY PARAMETERS

| Name | Description                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------|---------------|---------------------|----------|---------|
| list | Array list which needs to be tokenized |               | OBJECT              | No       | Yes     |

Extra Return Attributes

| Name  | Description                             | Possible Types |
|-------|-----------------------------------------|----------------|
| index | Index of an entry consisted in the list | INT            |
| value | Value of an entry consisted in the list | OBJECT         |

Examples EXAMPLE 1

    list:tokenize(customList)

If custom list contains *('GDN', 'IBM', 'XYZ')* elements, then
tokenize function will return 3 events with value attributes `GDN`, `IBM`
and `XYZ` respectively.
