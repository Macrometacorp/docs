---
title: sizeOfSet (Function)
---

Returns the size of an object of type `java.util.Set`.

## Syntax

```sql
<INT> sizeOfSet(<OBJECT> set)
```

## Query Parameters

| Name | Description        | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------|---------------|---------------------|----------|---------|
| set  | The set object. This parameter should be of type java.util.Set. A set object may be created by the `set` attribute aggregator. |            | OBJECT    | No       | Yes     |

## Example

This example demonstrates the use of the `sizeOfSet()` function to calculate the size of a set containing unique stock symbols. The example consists of a series of queries that process records from an input stream of stock data, create a set of unique stock symbols, and then calculate the size of that set.

### Query 1

```sql
@info(name = 'query1')
INSERT INTO initStream
SELECT initSet(symbol) AS initialSet
FROM stockStream;
```

This query, named 'query1', processes records from the `stockStream` and creates an initial set of `symbol` values using the `initSet(symbol)` function. For each record in the `stockStream`, the function adds the `symbol` to the set. The resulting set, named `initialSet`, is then inserted into the `initStream`.

Essentially, this query processes records in the `stockStream` and creates a new record in the `initStream` containing a set of unique `symbol` values.

### Query 2

```sql
@info(name = 'query1')
INSERT INTO distinctStockStream
SELECT union(initialSet) AS distinctSymbols
FROM initStream WINDOW TUMBLING_TIME(10 sec);
```

This query, named 'query1', processes records from the `initStream` and applies a tumbling time window of 10 seconds. For each window, the `union(initialSet)` function is applied to create a single set containing the union of all `initialSet` values within that window. The resulting set, named `distinctSymbols`, contains unique stock symbols from the window and is inserted into the `distinctStockStream`.

Essentially, this query processes records in the `initStream` using a tumbling time window and creates new records in the `distinctStockStream` containing the union of unique stock symbols from each window.

## Query 3

```sql
@info(name = 'query1')
INSERT INTO sizeStream
SELECT sizeOfSet(distinctSymbols) AS sizeOfSymbolSet
FROM distinctStockStream;
```

This query, named 'query1', processes records from the `distinctStockStream` and calculates the size of the `distinctSymbols` set using the `sizeOfSet(distinctSymbols)` function. The resulting value, named `sizeOfSymbolSet`, represents the number of unique stock symbols in the set and is inserted into the `sizeStream`.

Essentially, this query processes records in the `distinctStockStream` and creates new records in the `sizeStream` containing the size of the unique stock symbols set.
