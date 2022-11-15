---
title: cast (Function)
---

Converts the first parameter according to the cast.to parameter. Incompatible arguments cause Class Cast exceptions if further processed. This function is used with map extension that returns attributes of the object type. You can use this function to cast the object to an accurate and concrete type.

Syntax

```js
    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> cast(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> to.be.caster, <STRING> cast.to)
```

QUERY PARAMETERS

| Name         | Description                                                                                                                                | Default Value | Possible Data Types                      | Optional | Dynamic |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| to.be.caster | This specifies the attribute to be casted.                                                                                                 |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |
| cast.to      | A string constant parameter expressing the cast to type using one of the following strings values: int, long, float, double, string, bool. |               | STRING                                   | No       | Yes     |

## Example 1

```js
    insert into barStream
    select symbol as name, cast(temp, 'double') as temp
    from fooStream;
```

This casts the fooStream temp field value into `double` format.