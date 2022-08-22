---
title: Query Errors
---

This page describes errors that might occur during the C8QL parsing or execution.

Issuing an invalid query to the server will result in a parse error if the query is syntactically invalid. C8 will detect such errors during query inspection and abort further processing. Instead, the error number and an error message are returned so that the errors can be fixed.

If a query passes the parsing stage, all collections referenced in the query will be opened. If any of the referenced collections is not present, query execution will again be aborted and an appropriate error message will be returned.

Under some circumstances, executing a query may also produce run-time errors that cannot be predicted from inspecting the query text alone. This is because queries may use data from collections that may also be inhomogeneous.  Some examples that will cause run-time errors are:

## Division by Zero

The `Division by zero` error is triggered when an attempt is made to use the value _0_ as the divisor in an arithmetic division or modulus operation

## Invalid Operands for Arithmetic Operations

The `Invalid operands for arithmetic operations` error is triggered when an attempt is made to use any non-numeric values as operands in arithmetic operations. This includes unary (unary minus, unary plus) and binary operations (plus, minus, multiplication, division, and modulus)

## Invalid Operands for Logical Operations

The `Invalid operands for logical operations` is triggered when an attempt is made to use any non-boolean values as operand(s) in logical operations. This includes unary (logical not/negation), binary (logical and, logical or), and the ternary operators

## Other Errors

- Refer to the [Common Errors](../c8ql/common-errors.md) for more information about C8QL errors.
- Refer to [Error Codes](../references/error-codes.md) for a list of error codes and meanings.
