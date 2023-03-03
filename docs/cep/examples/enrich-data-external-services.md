---
sidebar_position: 110
title: Enrich Data with External Services
---

This example demonstrates how to enrich the data in a specific stream by connecting with an external service and adding information received from that service to the existing data.

To understand how this is done, assume you have some credit card numbers, but need to connect with an external service to identify the credit card companies that issued them, and then save that information in a database.

```sql
@APP:name("CCTypeIdentificationApp")
@APP:qlVersion("2")

-- Define the input stream for the credit card numbers.
CREATE STREAM CreditCardStream (creditCardNo STRING);

-- Define a sink to publish the data to the external application.
CREATE SINK GetCreditCardInfoStream WITH (type='http-call', publisher.url='http://postman-echo.com/post', method='POST', headers="'Content-Type:application/json'", sink.id="cardTypeSink", map.type='json', map.payload='{{creditCardNo}}') (creditCardNo STRING);

-- Define a source to receive the output from the external application.
CREATE SOURCE EnrichedCreditCardInfoStream WITH (source.type='http-call-response', sink.id='cardTypeSink', map.type='json', attributes.creditCardNo = 'trp:creditCardNo', attributes.creditCardType = ".") (creditCardNo STRING, creditCardType STRING);

-- Define a table (collection) to store the response of the external application.
CREATE TABLE GLOBAL CCInfoTable (creditCardNo STRING, creditCardType STRING);

-- Query to send credit card numbers to external service.
INSERT INTO GetCreditCardInfoStream
SELECT creditCardNo
FROM CreditCardStream;

-- Query to update or insert records into the table from the external service.
UPDATE OR INSERT INTO CCInfoTable ON CCInfoTable.creditCardNo == creditCardNo
SELECT *
FROM EnrichedCreditCardInfoStream;
```
