---
title: collect (Aggregate Function)
---

Collect multiple key-value pairs to construct a map. Only distinct keys are collected. If a duplicate key arrives, then it overrides the old value.

## Syntax

```sql
<OBJECT> map:collect(<INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|--------------------|----------|---------|
| key  | Key of the map entry  |       | INT LONG FLOAT DOUBLE FLOAT BOOL STRING  | No | Yes |
| value | Value of the map entry |       | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | No   | Yes  |

## Example 1

```sql
@info(name = 'StockDetailsCollection')
INSERT INTO OutputStream
SELECT map:collect(symbol, price) AS stockDetails
FROM StockStream WINDOW TUMBLING_LENGTH(10);
```

In this example, the query named 'StockDetailsCollection' applies a tumbling window of length 10 to `StockStream`. The `map:collect(symbol, price)` function is used to create a map for each window of events, where it pairs the `symbol` attribute as the key and the `price` attribute as the value. This means that for every ten events in the `StockStream`, it forms a map of stock symbols to their respective prices.

Upon the expiration of the window (i.e., after processing 10 events), the query emits a single event into `OutputStream`. This event contains a map named `stockDetails`, which holds the collected key-value pairs of stock symbols and their corresponding prices from the events in the window.

## Example 2

```sql
CREATE STREAM StockInputStream (symbol string, price double, volume int);
CREATE SINK STREAM StockPriceVolumeMapStream (priceVolumeMap map<string, map<string, double>>);

@info(name = 'CollectPriceAndVolumeDetails')
INSERT INTO StockPriceVolumeMapStream
SELECT symbol AS symbol, map:collect('Price', price, 'Volume', volume) AS priceVolumeMap
FROM StockInputStream WINDOW TUMBLING_LENGTH(5);
```

In this example, the stream worker 'CollectPriceAndVolumeDetails' uses a stream named `StockInputStream` to provide input to the query, which consists of stock symbols, their prices, and trading volumes. `StockPriceVolumeMapStream` is created to receive the output, which is a map of stock symbols to a nested map of price and volume.

The query applies a tumbling window of length 5 to `StockInputStream`. For each window of events, it uses the `map:collect('Price', price, 'Volume', volume)` function to create a nested map pairing the keys 'Price' and 'Volume' with their respective values.

After processing 5 events, the query emits an event into `StockPriceVolumeMapStream`. This event contains the symbol and a nested map named `priceVolumeMap` that holds the collected key-value pairs of 'Price' and 'Volume' and their corresponding values from the window of events.
