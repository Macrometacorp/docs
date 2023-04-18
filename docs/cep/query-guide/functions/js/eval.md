---
title: eval (Function)
---

This extension evaluates a given string and return the output according to the user specified data type.

## Syntax

```sql
<INT|LONG|DOUBLE|FLOAT|STRING|BOOL> js:eval(<STRING> expression, <STRING> return.type)
```

## Query Parameters

| Name        | Description           | Default Value | Possible Data Types | Optional | Dynamic |
|-------------|-----------------------|---------------|---------------------|----------|---------|
| expression  | Any single line js expression or function.     |           | STRING          | No       | Yes     |
| return.type | The return type of the evaluated expression. Supported types are int|long|float|double|bool|string. |          | STRING              | No       | No      |

## Example

```sql
@info(name = 'query1')
js:eval("700 > 800", 'bool')
```

In this example, the `js:eval()` function is used to evaluate the JavaScript expression `700 > 800` and return the result as a boolean. Since the expression `700 > 800` is false, the function returns `false` as the result.
