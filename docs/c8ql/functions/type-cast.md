---
title: Type Cast Functions
---

Some operators expect their operands to have a certain data type. For example, logical operators expect their operands to be boolean values, and the arithmetic operators expect their operands to be numeric values. If an operation is performed with operands of other types, an automatic conversion to the expected types is tried. This is called implicit type casting. It helps to avoid query aborts.

Type casts can also be performed upon request by invoking a type cast function. This is called explicit type casting. C8QL offers several functions for this. Each of the these functions takes an operand of any data type and returns a result value with the type corresponding to the function name. For example, _TO_NUMBER()_ will return a numeric value.

## TO_BOOL()

`TO_BOOL(value) → bool`

Take an input _value_ of any type and convert it into the appropriate boolean value.

- **value** (any): input of arbitrary type
- returns **bool** (boolean):
  - _null_ is converted to _false_
  - Numbers are converted to _true_, except for 0, which is converted to _false_
  - Strings are converted to _true_ if they are non-empty, and to _false_ otherwise
  - Arrays are always converted to _true_ (even if empty)
  - Objects / documents are always converted to _true_

It's also possible to use double negation to cast to boolean:

```js
!!1 // true
!!0 // false
!!-0.0 // false
not not 1 // true
!!"non-empty string" // true
!!"" // false
```

`TO_BOOL()` is preferred however, because it states the intention clearer.

## TO_NUMBER()

`TO_NUMBER(value) → number`

Take an input _value_ of any type and convert it into a numeric value.

- **value** (any): input of arbitrary type
- returns **number** (number):
  - _null_ and _false_ are converted to the value _0_
  - _true_ is converted to _1_
  - Numbers keep their original value
  - Strings are converted to their numeric equivalent if the string contains a valid representation of a number. Whitespace at the start and end of the string is allowed. String values that do not contain any valid representation of a number will be converted to the number _0_.
  - An empty array is converted to _0_, an array with one member is converted into the result of `TO_NUMBER()` for its sole member. An array with two or more members is converted to the number _0_.
  - An object / document is converted to the number _0_.
  
    A unary plus will also cast to a number, but `TO_NUMBER()` is the preferred way:
    ```js

+'5' // 5
+[8] // 8
+[8,9] // 0
+{} // 0
    ```
    A unary minus works likewise, except that a numeric value is also negated:
    ```js
-'5' // -5
-[8] // -8
-[8,9] // 0
-{} // 0
    ```

## TO_STRING()

`TO_STRING(value) → str`

Take an input _value_ of any type and convert it into a string value.

- **value** (any): input of arbitrary type
- returns **str** (string):
  - _null_ is converted to an empty string `""`
  - _false_ is converted to the string _"false"_, _true_ to the string _"true"_
  - Numbers are converted to their string representations. This can also be a scientific notation (e.g. "2e-7")
  - Arrays and objects / documents are converted to string representations, which means JSON-encoded strings with no additional whitespace

```js
TO_STRING(null) // ""
TO_STRING(true) // "true"
TO_STRING(false) // "false"
TO_STRING(123) // "123"
TO_STRING(+1.23) // "1.23"
TO_STRING(-1.23) // "-1.23"
TO_STRING(0.0000002) // "2e-7"
TO_STRING( [1, 2, 3] ) // "[1,2,3]"
TO_STRING( { foo: "bar", baz: null } ) // "{\"foo\":\"bar\",\"baz\":null}"
```

## TO_ARRAY()

`TO_ARRAY(value) → array`

Take an input _value_ of any type and convert it into an array value.

- **value** (any): input of arbitrary type
- returns **array** (array):
  - _null_ is converted to an empty array
  - Boolean values, numbers and strings are converted to an array containing the original value as its single element
  - Arrays keep their original value
  - Objects / documents are converted to an array containing their attribute **values** as array elements, just like [VALUES()](document.md#values)

```js
TO_ARRAY(null) // []
TO_ARRAY(false) // [false]
TO_ARRAY(true) // [true]
TO_ARRAY(5) // [5]
TO_ARRAY("foo") // ["foo"]
TO_ARRAY([1, 2, "foo"]) // [1, 2, "foo"]
TO_ARRAY({foo: 1, bar: 2, baz: [3, 4, 5]}) // [1, 2, [3, 4, 5]]
```

## TO_LIST()

`TO_LIST(value) → array`

This is an alias for [TO_ARRAY()](#to_array).
