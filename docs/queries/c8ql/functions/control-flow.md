---
title: Control Flow Functions
---

C8QL includes control flow functions.

## NOT_NULL()

`NOT_NULL(alternative, ...) → value`

Return the first element that is not *null*, and *null* if all alternatives are *null* themselves. It is also known as `COALESCE()` in SQL.

- **alternative** (any, *repeatable*): input of arbitrary type
- returns **value** (any): first non-null parameter, or *null* if all arguments are *null*

## FIRST_LIST()

Return the first alternative that is an array, and *null* if none of the alternatives is an array.

- **alternative** (any, *repeatable*): input of arbitrary type
- returns **list** (array\|null): array / list or null

## FIRST_DOCUMENT()

`FIRST_DOCUMENT(value) → doc`

Return the first alternative that is a document, and *null* if none of the alternatives is a document.

- **alternative** (any, *repeatable*): input of arbitrary type
- returns **doc** (object\|null): document / object or null

## Ternary operator

For conditional evaluation, check out the [ternary operator](../operators.md#ternary-operator).
