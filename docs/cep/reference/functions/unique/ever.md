---
title: ever (Window)
---

Window that retains the latest events based on a given unique keys. When
a new event arrives with the same key it replaces the one that exist in
the window.\<b\>This function is not recommended to be used when the
maximum number of unique attributes are undefined, as there is a risk of
system going out to memory\</b\>.

Syntax

    unique:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key)
    unique:ever(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG|FLOAT|BOOL|DOUBLE|STRING> ...)

## Query Parameters

| Name       | Description                                   | Default Value | Possible Data Types               | Optional | Dynamic |
|------------|-----------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key | The attribute used to checked for uniqueness. |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |

## Example 1

    CREATE STREAM LoginEvents (timestamp long, ip string);

    from LoginEvents WINDOW UNIQUE:ever(ip)
    select count(ip) as ipCount
    insert events into UniqueIps;

Query collects all unique events based on the `ip` attribute by
retaining the latest unique events from the `LoginEvents` stream. Then
the query counts the unique `ip`s arrived so far and outputs the
`ipCount` via the `UniqueIps` stream.

## Example 2

    CREATE STREAM DriverChangeStream (trainID string, driver string);

    from DriverChangeStream WINDOW UNIQUE:ever(trainID)
    select trainID, driver
    insert expired events into PreviousDriverChangeStream;

Query collects all unique events based on the `trainID` attribute by
retaining the latest unique events from the `DriverChangeStream` stream.
The query outputs the previous unique event stored in the window as the
expired events are emitted via `PreviousDriverChangeStream` stream.

## Example 3

    CREATE STREAM StockStream (symbol string, price float);
    CREATE STREAM PriceRequestStream(symbol string);

    from StockStream WINDOW UNIQUE:ever(symbol) as s join PriceRequestStream as p
    on s.symbol == p.symbol
    select s.symbol as symbol, s.price as price
    insert events into PriceResponseStream;

Query stores the last unique event for each `symbol` attribute of
`StockStream` stream, and joins them with events arriving on the
`PriceRequestStream` for equal `symbol` attributes to fetch the latest
`price` for each requested `symbol` and output via `PriceResponseStream`
stream.
