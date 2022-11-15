---
title: unionSet (Aggregate Function)
---

Union multiple sets.  This attribute aggregator maintains a union of sets. The given input set is put into the union set and the union set is returned.

Syntax

```js
    <OBJECT> unionSet(<OBJECT> set)
```

QUERY PARAMETERS

| Name | Description                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|---------------------|----------|---------|
| set  | The java.util.Set object that needs to be added into the union set. |               | OBJECT              | No       | Yes     |

## Example 1

```js
    insert into initStream
    select createSet(symbol) as initialSet
    from stockStream

    insert into distinctStockStream
    select unionSet(initialSet) as distinctSymbols
    from initStream WINDOW TUMBLING_TIME(10 sec);
```

`distinctStockStream` returns the set object which contains the distinct set of stock symbols received during a sliding window of 10 seconds.