---
title: Type Check Functions
---

C8QL offers functions to check the data type of a value at runtime. The following type check functions are available. Each of these functions takes an argument of any data type and returns true if the value has the type that is checked for, and false otherwise.

## IS_NULL()

`IS_NULL(value) → bool`

Check whether *value* is *null*. Identical to `value == null`.

To test if an attribute exists, see [HAS()](document.md#has) instead.

- **value** (any): value to test
- returns **bool** (boolean): *true* if *value* is `null`, *false* otherwise

## IS_BOOL()

`IS_BOOL(value) → bool`

Check whether *value* is a *boolean* value

- **value** (any): value to test
- returns **bool** (boolean): *true* if *value* is `true` or `false`, *false* otherwise

## IS_NUMBER()

`IS_NUMBER(value) → bool`

Check whether *value* is a number

- **value** (any): value to test
- returns **bool** (boolean): *true* if *value* is a number, *false* otherwise

## IS_STRING()

`IS_STRING(value) → bool`

Check whether *value* is a string

- **value** (any): value to test
- returns **bool** (boolean): *true* if *value* is a string, *false* otherwise

## IS_ARRAY()

`IS_ARRAY(value) → bool`

Check whether *value* is an array / list

- **value** (any): value to test
- returns **bool** (boolean): *true* if *value* is an array / list, *false* otherwise

## IS_LIST()

`IS_LIST(value) → bool`

This is an alias for [IS_ARRAY()](#is_array)

## IS_OBJECT()

`IS_OBJECT(value) → bool`

Check whether *value* is an object / document

- **value** (any): value to test
- returns **bool** (boolean): *true* if *value* is an object / document, *false* otherwise

## IS_DOCUMENT()

`IS_DOCUMENT(value) → bool`

This is an alias for [IS_OBJECT()](#is_object)

## IS_DATESTRING()

`IS_DATESTRING(str) → bool`

Check whether *value* is a string that can be used in a date function. This includes partial dates such as *"2015"* or *"2015-10"* and strings containing properly formatted but invalid dates such as *"2015-02-31"*.

- **str** (string): date string to test
- returns **bool** (boolean): *true* if *str* is a correctly formatted date string, *false* otherwise including all non-string values, even if some of them may be usable in date functions (numeric timestamps)

## IS_KEY()

`IS_KEY(str) → bool`

Check whether *value* is a string that can be used as a document key, i.e. as the value of the *_key* attribute. See [Naming Conventions for Document Keys](../../references/naming-conventions.md#document-keys).

- **str** (string): document key to test
- returns **bool** (boolean): whether *str* can be used as document key

## TYPENAME()

`TYPENAME(value) → typeName`

Return the data type name of *value*.

- **value** (any): input of arbitrary type
- returns **typeName** (string): data type name of *value*
  (`"null"`, `"bool"`, `"number"`, `"string"`, `"array"` or `"object"`)

Example Value   | Data Type Name
---------------:|---------------
`null`          | `"null"`
`true`          | `"bool"`
`false`         | `"bool"`
`123`           | `"number"`
`-4.56`         | `"number"`
`0`             | `"number"`
`"foobar"`      | `"string"`
`"123"`         | `"string"`
`""`            | `"string"`
`[ 1, 2, 3 ]`   | `"array"`
`["foo",true]`  | `"array"`
`[ ]`           | `"array"`
`{"foo":"bar"}` | `"object"`
`{"foo": null}` | `"object"`
`{ }`           | `"object"`
