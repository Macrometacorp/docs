---
title: createSet (Function)
---

Includes the given input parameter in a java.util.HashSet and returns the set.

Syntax

```js
    <OBJECT> createSet(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL> input)
```

QUERY PARAMETERS

| Name  | Description                                    | Default Value | Possible Data Types               | Optional | Dynamic |
|-------|------------------------------------------------|---------------|-----------------------------------|----------|---------|
| input | The input that needs to be added into the set. |               | INT LONG DOUBLE FLOAT STRING BOOL | No       | Yes     |

## Example 1

```js
    insert into initStream
    select createSet(symbol) as initialSet
    from stockStream;
```

For every incoming stockStream event, the initStream stream produces a set object having only one element: the symbol in the incoming stockStream.