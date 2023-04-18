---
title: unionSet (Aggregate Function)
---

Union multiple sets. This attribute aggregator maintains a union of sets. The given input set is put into the union set and the union set is returned.

## Syntax

```sql
<OBJECT> unionSet(<OBJECT> set)
```

## Query Parameters

| Name | Description          | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------|---------------|---------------------|----------|---------|
| set  | The java.util.Set object that needs to be added into the union set. |       | OBJECT      | No       | Yes     |

## Example

```sql
@info(name = 'query1')
INSERT INTO initStream
SELECT createSet(symbol) AS initialSet
FROM stockStream

@info(name = 'query2')
INSERT INTO distinctStockStream
SELECT unionSet(initialSet) AS distinctSymbols
FROM initStream WINDOW TUMBLING_TIME(10 sec);
```

These two queries work together to create a set object containing the distinct set of stock symbols received during a tumbling time window of 10 seconds:

1. The first query, named 'query1', processes records from the `stockStream` and creates an initial set of `symbol` values using the `createSet(symbol)` function. The resulting set, named `initialSet`, is inserted into the `initStream`.

2. The second query, named 'query2', processes records from the `initStream` and applies a tumbling time window of 10 seconds. For each window, the `unionSet(initialSet)` function is applied to create a single set containing the union of all `initialSet` values within that window. The resulting set, named `distinctSymbols`, contains unique stock symbols from the window and is inserted into the `distinctStockStream`.

In summary, `distinctStockStream` returns the set object which contains the distinct set of stock symbols received during a tumbling time window of 10 seconds.
