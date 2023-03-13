---
title: Calling Functions
---

These functions allow you to invoke user-defined functions.

## APPLY()

`APPLY(functionName, arguments) → retVal`

Dynamically call the function *funcName* with the arguments specified. Arguments are given as array and are passed as separate parameters to the called function.

Both built-in and user-defined functions can be called. 

- **funcName** (string): a function name
- **arguments** (array, *optional*): an array with elements of arbitrary type
- returns **retVal** (any): the return value of the called function

```js
APPLY( "SUBSTRING", [ "this is a test", 0, 7 ] )
// "this is"
```

## ASSERT() / WARN()

`ASSERT(expr, message) → retVal`<br />
`WARN(expr, message) → retVal`

The two functions evaluate an expression. In case the expression evaluates to *true* both functions will return *true*. If the expression evaluates to *false* *ASSERT* will throw an error and *WARN* will issue a warning and return *false*. This behavior allows the use of *ASSERT* and *WARN* in `FILTER` conditions.

- **expr** (expression): AQL expression to be evaluated
- **message** (string): message that will be used in exception or warning if expression evaluates to false
- returns **retVal** (bool): returns true if expression evaluates to true

```js
FOR i IN 1..3 FILTER ASSERT(i > 0, "i is not greater 0") RETURN i
FOR i IN 1..3 FILTER WARN(i < 2, "i is not smaller 2") RETURN i
```

## CALL()

`CALL(funcName, arg1, arg2, ... argN) → retVal`

Dynamically call the function *funcName* with the arguments specified. Arguments are given as multiple parameters and passed as separate parameters to the called function.

Both built-in and user-defined functions can be called.

- **funcName** (string): a function name
- **args** (any, *repeatable*): an arbitrary number of elements as
  multiple arguments, can be omitted
- returns **retVal** (any): the return value of the called function

```js
CALL( "SUBSTRING", "this is a test", 0, 4 )
// "this"
```
