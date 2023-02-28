---
sidebar_position: 30
title: Enrich Data with External Services
---

This section explains how to enrich the data in a specific stream by connecting with an external service and adding information received from that service to the existing data.

To understand how this is done, consider an example where you have some credit card numbers, but need to connect with an external service to identify the credit card companies that issued them, and then save that information in a database.

1. Start creating a new stream worker. You can name it `CCTypeIdentificationApp`.

2. Define the input stream from which the input data (i.e., the credit card no in this example) must be taken.

   ```js
   create stream CreditCardStream (creditCardNo string);
   ```

3. To publish the input data to the external application, connect a sink to the stream you created as shown below. For more information about publishing information, see the [Publishing Data guide](../tutorials/publishing-data.md).

    ```sql
	CREATE SINK GetCreditCardInfoStream WITH (type='http-call', publisher.url='http://postman-echo.com/post', method='POST', headers="'Content-Type:application/json'", sink.id="cardTypeSink", map.type='json', map.payload='{{creditCardNo}}') (creditCardNo string);
    ```

    :::info
    Note the following about the above sink definition:
    - It is assumed that the external application receives requests in HTTP. Therefore, the sink type is `http-request`.
    - The `publisher.url` parameter specifies the URL to which the outgoing events need to be published via HTTP.
    :::

4. To capture the response of the external application once it returns the credit card type, create a stream as follows. For more information about consuming data, see the [Consuming Data guide](../tutorials/consuming-data.md).

    ```sql
    CREATE SOURCE EnrichedCreditCardInfoStream WITH (creditCardNo string, creditCardType string);
    ```

5. Assuming the external application sends its output via HTTP transport, connect a source of the `http`type to the `EnrichedCreditCardStream` stream as follows. For more information about consuming events, see the [Consuming Data guide](../tutorials/consuming-data.md).

    ```sql
	CREATE SOURCE EnrichedCreditCardInfoStream WITH (source.type='http-call-response', sink.id='cardTypeSink', map.type='json', attributes.creditCardNo = 'trp:creditCardNo', attributes.creditCardType = ".") (creditCardNo string,creditCardType string);
    ```

6. To save the response of the external application, define a table named `CCInfoTable`.

    ```sql
    CREATE TABLE GLOBAL CCInfoTable (cardNo long, cardType string);
    ```

7. To save the data enriched by integrating the information received from the external service, add a query for a stream as follows.

    ```sql
    update or insert into CCInfoTable 
        on CCInfoTable.creditCardNo == creditCardNo
    select *
    from EnrichedCreditCardInfoStream;
    ```

    The above query selects all the attributes in the `EnrichedCreditCardInfoStream` and inserts them into the `CCInfoTable` table. If a specific record already exists,the query updates it by replacing the attribute values with the latest values taken from the `EnrichedCreditCardInfoStream`.

8. The completed stream worker is as follows:

    ```sql
	@App:name("CCTypeIdentificationApp")
	@App:qlVersion("2")

	CREATE STREAM CreditCardStream (creditCardNo string);

	CREATE SINK GetCreditCardInfoStream WITH (type='http-call', publisher.url='http://postman-echo.com/post', method='POST', headers="'Content-Type:application/json'", sink.id="cardTypeSink", map.type='json', map.payload='{{creditCardNo}}') (creditCardNo string);

	CREATE SOURCE EnrichedCreditCardInfoStream WITH (source.type='http-call-response', sink.id='cardTypeSink', map.type='json', attributes.creditCardNo = 'trp:creditCardNo', attributes.creditCardType = ".") (creditCardNo string,creditCardType string);

	CREATE TABLE GLOBAL CCInfoTable (creditCardNo string, creditCardType string);

	insert into GetCreditCardInfoStream
	select creditCardNo
	from CreditCardStream;

	update or insert into CCInfoTable on CCInfoTable.creditCardNo == creditCardNo
	select *
	from EnrichedCreditCardInfoStream;
    ```
