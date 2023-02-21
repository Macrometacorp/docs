---
title: ever
---

Window that retains the latest events based on a given unique keys. When a new event arrives with the same key it replaces the one that exist in the window.

:::caution
This function is not recommended if the maximum number of unique attributes are undefined, as there is a risk of
system going out to memory.
:::

## Syntax

```sql
    WINDOW UNIQUE:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key)
    WINDOW UNIQUE:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG|FLOAT|BOOL|DOUBLE|STRING> ...)
```

## Query Parameters

| Name       | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|------------|-----------------------------------------------|---------------|------------------------|----------|---------|
| unique.key | The attribute used to checked for uniqueness. | | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |

## Example 1

```sql
    CREATE STREAM LoginEvents (timestamp long, ip string);

    INSERT events INTO UniqueIps
    SELECT count(ip) AS ipCount
    FROM LoginEvents WINDOW UNIQUE:ever(ip)    
    
```

This query collects all unique events based on the `ip` attribute by
retaining the latest unique events from the `LoginEvents` stream. Then
the query counts the unique `ip`s arrived so far and outputs the
`ipCount` via the `UniqueIps` stream.

## Example 2

```sql
    CREATE STREAM DriverChangeStream (trainID string, driver string);

    INSERT expired events INTO PreviousDriverChangeStream;
    SELECT trainID, driver
    FROM DriverChangeStream WINDOW UNIQUE:ever(trainID)
```

Query collects all unique events based on the `trainID` attribute by
retaining the latest unique events from the `DriverChangeStream`.
The query outputs the previous unique event stored in the window as the
expired events are emitted via `PreviousDriverChangeStream`.

## Example 3

```sql
    CREATE STREAM StockStream (symbol string, price float);
    CREATE STREAM PriceRequestStream(symbol string);

    INSERT events INTO PriceResponseStream;
    SELECT s.symbol AS symbol, s.price AS price
    FROM StockStream WINDOW UNIQUE:ever(symbol) AS s JOIN PriceRequestStream AS p
    ON s.symbol == p.symbol
```

Query stores the last unique event for each `symbol` attribute of
`StockStream`, and joins them with events arriving on the
`PriceRequestStream` for equal `symbol` attributes to fetch the latest
`price` for each requested `symbol` and output it to `PriceResponseStream`.
