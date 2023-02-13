---
title: DELAY()
---

A delay window holds events for a specific time period that is regarded as a delay period before processing them.

## Syntax

    WINDOW DELAY(delay <INT|LONG|TIME>)

## Query Parameters

| Name         | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|---------------|---------------|---------------------|----------|---------|
| delay | The time period (specified in sec, min, ms) for which the window should delay the events. |       | INT LONG TIME       | No       | No      |

## Example

```sql
CREATE WINDOW delayWindow(symbol string, volume int) DELAY(1 hour);
CREATE STREAM PurchaseStream(symbol string, volume int);
CREATE STREAM DeliveryStream(symbol string);
CREATE SINK STREAM OutputStream(symbol string);

@info(name='query1')
INSERT INTO delayWindow
SELECT symbol, volume
FROM PurchaseStream;

@info(name='query2')
INSERT INTO OutputStream
SELECT delayWindow.symbol
FROM delayWindow JOIN DeliveryStream
ON delayWindow.symbol == DeliveryStream.symbol;
```

In this example, purchase events that arrive in the `PurchaseStream` stream are directed to a delay window. At any given time, this delay window holds purchase events that have arrived within the last hour.

These purchase events in the window are matched by the `symbol` attribute, with delivery events that arrive in the `DeliveryStream` stream. This monitors whether the delivery of products is done with a minimum delay of one hour after the purchase.
