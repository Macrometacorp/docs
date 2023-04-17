---
title: unionSet (Aggregate Function)
---

Union multiple sets. This attribute aggregator maintains a union of sets. The given input set is put into the union set and the union set is returned.

## Syntax

```sql
    <OBJECT> unionSet(<OBJECT> set)
```

## Query Parameters

| Name | Description                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|---------------------|----------|---------|
| set  | The java.util.Set object that needs to be added into the union set. |               | OBJECT              | No       | Yes     |

## Example

```sql
INSERT INTO initStream
SELECT createSet(symbol) AS initialSet
FROM stockStream

INSERT INTO distinctStockStream
SELECT unionSet(initialSet) AS distinctSymbols
FROM initStream WINDOW TUMBLING_TIME(10 sec);
```

`distinctStockStream` returns the set object which contains the distinct set of stock symbols received during a sliding window of 10 seconds.
