---
sidebar_position: 2
title: Crypto Trading Bot
---

## Crypto App details

| **Tenant** | **Fabric** | **Stream App** | **GUI** | **Source Code**|
|----------- |----------|----|-----------|-----------|
|  `demo@macrometa.io` | `crypto_trading_bot` | `Crypto-Trading-App` | [**Crypto Trading GUI**](https://macrometacorp.github.io/tutorial-cryptotrading/) |[github](https://github.com/Macrometacorp/tutorial-cryptotrading)|

Read our blog post [How To Build A Crypto Arbitrage Trading Bot](https://www.macrometa.com/blog/cryptocurrency-trading-building-a-multi-exchange-global-trading-bot) to learn more about exchange arbitrage and how the app works.

## Configure the Crypto App

1. Log in to the [Macrometa Console](https://auth-play.macrometa.io/) 
2. Go to the Collections tab and create a new document collection named `trades` with `collection stream enabled` checked. For more information about creating document collections, refer to [Create a Document Collection](https://macrometa.com/docs/collections/documents/create-document-store).
3. Click **Stream Workers**.
4. Click **New Stream Worker** named `Crypto-Trading-App`.
5. Copy and past the [code example](#crypto-app-stream-worker-code) into the editor.
6. Click **Save**. Macrometa validates your code.
7. Select one or more locations to deploy your stream worker. Choose the location that is closest to where you are located, and then click **Save**.
8. Click **Publish**.

After you the publish the stream worker, navigate to the [live frontend](https://macrometacorp.github.io/tutorial-cryptotrading/) and use your Macrometa account credentials to log in to your account. Select the location you deployed the stream worker to, and you will see the app come to life!
## Crypto App Stream Worker Code

```js
@App:name("Crypto-Trading-App")
@App:description("Crypto Trading demo")
@App:qlVersion('2')

-- The trigger
CREATE TRIGGER CryptoTraderEventsTrigger WITH ( interval = 5 sec );

/*
This app reads every 5 seconds the close prices from Coinbase, Bitstamp and Bitflyer exchanges APIs.
Then it calculates the average prices within 10 events window and creates a "BUY/SELL" trading strategy.
The close and average prices are stored in CryptoTraderQuotesAvgXXX streams.
The strategy is kept in the trades collection.
*/

-- Streams for the HTTP call requests
-------------------------------------------------------------------------------------------------------------------------------------

CREATE SINK UsdCryptoTraderRequestStream WITH (type='http-call', publisher.url='https://api.pro.coinbase.com/products/btc-usd/ticker', method='GET', headers="'User-Agent:c8cep'", sink.id='coinbase-ticker', map.type='json') (triggered_time string);

CREATE SINK EurCryptoTraderRequestStream WITH (type='http-call', publisher.url='https://www.bitstamp.net/api/v2/ticker/btceur', method='GET', sink.id='bitstamp-ticker', map.type='json') (triggered_time string);

CREATE SINK JpyCryptoTraderRequestStream WITH (type='http-call', publisher.url='https://api.bitflyer.com/v1/ticker', method='GET', sink.id='bitflyer-ticker', map.type='json') (triggered_time string);

-- Streams for the HTTP call responses
-------------------------------------------------------------------------------------------------------------------------------------

CREATE SOURCE UsdCryptoTraderTickerResponseStream WITH (type='http-call-response', sink.id='coinbase-ticker', http.status.code='200', map.type='json', map.enclosing.element='$.*') (time string, price string);

CREATE SOURCE EurCryptoTraderTickerResponseStream WITH (type='http-call-response', sink.id='bitstamp-ticker', http.status.code='200', map.type='json') (timestamp string, last string);

CREATE SOURCE JpyCryptoTraderTickerResponseStream WITH (type='http-call-response', sink.id='bitflyer-ticker', http.status.code='200', map.type='json') (timestamp string, ltp double);

-- Streams for the close and average prices
-------------------------------------------------------------------------------------------------------------------------------------
CREATE SINK STREAM GLOBAL CryptoTraderQuotesAvgUSDNew(exchange string, quote_region string, symbol string, ma double, close double, timestamp long);

CREATE SINK STREAM GLOBAL CryptoTraderQuotesAvgEURNew(exchange string, quote_region string, symbol string, ma double, close double, timestamp long);

CREATE SINK STREAM GLOBAL CryptoTraderQuotesAvgJPYNew(exchange string, quote_region string, symbol string, ma double, close double, timestamp long);

CREATE SINK TradesBuy WITH (type="log", prefix='BUY') (exchange string, quote_region string, symbol string, timestamp long, trade_location string,
                          trade_price double, trade_strategy string, trade_type string);

CREATE SINK TradesSell WITH (type="log", prefix='SELL') (exchange string, quote_region string, symbol string, timestamp long, trade_location string,
                          trade_price double, trade_strategy string, trade_type string);                      

-- Common trades store
CREATE TABLE GLOBAL trades(exchange string, quote_region string, symbol string, timestamp long, trade_location string,
                          trade_price double, trade_strategy string, trade_type string);
                          
-- Common trades store inserts
-------------------------------------------------------------------------------
INSERT INTO trades
SELECT exchange, quote_region, symbol, timestamp, trade_location,
          trade_price, trade_strategy, trade_type
FROM TradesBuy;

INSERT INTO trades
SELECT exchange, quote_region, symbol, timestamp, trade_location,
          trade_price, trade_strategy, trade_type
FROM TradesSell;
                          
-- Fire Coinbase Pro BTC/USD requests initiated by a trigger
-------------------------------------------------------------------------------
INSERT INTO UsdCryptoTraderRequestStream
SELECT time:currentTimestamp() AS triggered_time 
FROM CryptoTraderEventsTrigger;

-- Fire Bitstamp BTC/EUR requests initiated by a trigger
-------------------------------------------------------------------------------
INSERT INTO EurCryptoTraderRequestStream
SELECT time:currentTimestamp() AS triggered_time 
FROM CryptoTraderEventsTrigger;

-- Fire Bitflyer BTC/JPY requests initiated by a trigger
-------------------------------------------------------------------------------
INSERT INTO JpyCryptoTraderRequestStream
SELECT time:currentTimestamp() AS triggered_time 
FROM CryptoTraderEventsTrigger;

-- Coinbase Pro BTC/USD strategy generation
-------------------------------------------------------------------------------------------------
@info(name='Query for BTC/USD close and average prices within moving 10 events windows')
INSERT INTO CryptoTraderQuotesAvgUSDNew
SELECT "Coinbase Pro" AS exchange, "USA" AS quote_region,
        "BTC/USD" AS symbol, avg(convert(price, 'double')) AS ma, convert(price, 'double') AS close, 
        time:timestampInMilliseconds()/1000 AS timestamp
FROM UsdCryptoTraderTickerResponseStream[context:getVar('region') == 'play-us-west'] WINDOW SLIDING_LENGTH(10);

@info(name='Query for BTC/USD trading strategy BUY')
INSERT INTO TradesBuy
SELECT e2.exchange, e2.quote_region, e2.symbol, e2.timestamp,
       context:getVar('region') AS trade_location,
       e2.close AS trade_price, "MA Trading" AS trade_strategy,
          'BUY' AS trade_type
FROM every e1=CryptoTraderQuotesAvgUSDNew[e1.close < e1.ma], e2=CryptoTraderQuotesAvgUSDNew[e2.close > e2.ma];

@info(name='Query for BTC/USD trading strategy SELL')
INSERT INTO TradesSell
SELECT e2.exchange, e2.quote_region, e2.symbol, e2.timestamp,
       context:getVar('region') AS trade_location,
       e2.close AS trade_price, "MA Trading" AS trade_strategy,
          'SELL' AS trade_type
FROM every e1=CryptoTraderQuotesAvgUSDNew[e1.close > e1.ma], e2=CryptoTraderQuotesAvgUSDNew[e2.close < e2.ma];

DELETE trades for expired events 
       ON trades.trade_location == trade_location and trades.symbol == symbol and trades.timestamp < timestamp 
SELECT context:getVar('region') AS trade_location, symbol, timestamp
FROM CryptoTraderQuotesAvgUSDNew WINDOW SLIDING_TIME(10);

-- Bitstamp BTC/EUR trading strategy generation
-----------------------------------------------------------------------------------------
@info(name='Query for BTC/EUR close and average prices within moving 10 events windows')
INSERT INTO CryptoTraderQuotesAvgEURNew
SELECT "Bitstamp" AS exchange, "Europe" AS quote_region,
        "BTC/EUR" AS symbol, avg(convert(last, 'double')) AS ma, convert(last, 'double') AS close, 
        time:timestampInMilliseconds()/1000 AS timestamp
FROM EurCryptoTraderTickerResponseStream[context:getVar('region') == 'play-us-west'] WINDOW SLIDING_LENGTH(10);

@info(name='Query for BTC/EUR trading strategy BUY')
INSERT INTO TradesBuy
SELECT e2.exchange, e2.quote_region, e2.symbol, e2.timestamp,
       context:getVar('region') AS trade_location,
       e2.close AS trade_price, "MA Trading" AS trade_strategy,
          'BUY' AS trade_type
FROM every e1=CryptoTraderQuotesAvgEURNew[e1.close < e1.ma], e2=CryptoTraderQuotesAvgEURNew[e2.close > e2.ma];

@info(name='Query for BTC/EUR trading strategy SELL')
INSERT INTO TradesSell
SELECT e2.exchange, e2.quote_region, e2.symbol, e2.timestamp,
       context:getVar('region') AS trade_location,
       e2.close AS trade_price, "MA Trading" AS trade_strategy,
          'SELL' AS trade_type
FROM every e1=CryptoTraderQuotesAvgEURNew[e1.close > e1.ma], e2=CryptoTraderQuotesAvgEURNew[e2.close < e2.ma];

DELETE trades for expired events 
       ON trades.trade_location == trade_location and trades.symbol == symbol and trades.timestamp < timestamp 
SELECT context:getVar('region') AS trade_location, symbol, timestamp
FROM CryptoTraderQuotesAvgEURNew WINDOW SLIDING_TIME(10);

-- Bitflyer BTC/JPY strategy generation
----------------------------------------------------------------------------------------------
@info(name='Query for BTC/JPY close and average prices within moving 10 events windows')
INSERT INTO CryptoTraderQuotesAvgJPYNew
SELECT "Bitflyer" AS exchange, "Asia-Pacific" AS quote_region,
        "BTC/JPY" AS symbol, avg(ltp) AS ma, ltp AS close, 
        time:timestampInMilliseconds()/1000 AS timestamp
FROM JpyCryptoTraderTickerResponseStream[context:getVar('region') == 'play-us-west'] WINDOW SLIDING_LENGTH(10);

@info(name='Query for BTC/JPY trading strategy BUY')
INSERT INTO TradesBuy
SELECT e2.exchange, e2.quote_region, e2.symbol, e2.timestamp,
       context:getVar('region') AS trade_location,
       e2.close AS trade_price, "MA Trading" AS trade_strategy,
          'BUY' AS trade_type
FROM every e1=CryptoTraderQuotesAvgJPYNew[e1.close < e1.ma], e2=CryptoTraderQuotesAvgJPYNew[e2.close > e2.ma];

@info(name='Query for BTC/JPY trading strategy SELL')
INSERT INTO TradesSell
SELECT e2.exchange, e2.quote_region, e2.symbol, e2.timestamp,
       context:getVar('region') AS trade_location,
       e2.close AS trade_price, "MA Trading" AS trade_strategy,
          'SELL' AS trade_type
FROM every e1=CryptoTraderQuotesAvgJPYNew[e1.close > e1.ma], e2=CryptoTraderQuotesAvgJPYNew[e2.close < e2.ma];
 
DELETE trades for expired events 
       ON trades.trade_location == trade_location and trades.symbol == symbol and trades.timestamp < timestamp 
SELECT context:getVar('region') AS trade_location, symbol, timestamp
FROM CryptoTraderQuotesAvgJPYNew WINDOW SLIDING_TIME(10);
```
