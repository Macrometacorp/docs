---
sidebar_position: 5
---

# Enriching Data

## Introduction

Enriching data involves integrating the data received in the stream with data from c8db or another data stream, or an external service to derive an expected result. To understand the different ways in which this is done, follow the sections below.

## Enrich data with a Collection

This section explains how to enrich the data in a specific stream by joining it with c8db collection. For this purpose, consider 
a scenario where you receive sales records generated from multiple locations as events via a system. 

1. Open the GUI. Click the **Stream Apps** tab.
1. Click **New** to define a new stream application.
1. Type a **Name** for the stream application. For example, `EnrichingTransactionsApp`.
1. Type a **Description**.
1. Add the following sample stream application.
 
2. Define the input stream and the c8db collection that need to be joined as follows.

    1. Define the stream as follows.
        ```sql
        CREATE STREAM TrasanctionStream (userId long, transactionAmount double, location string);
        ```
        
    2. Define the table as follows.
        ```sql
        CREATE TABLE UserTable (userId long, firstName string, lastName string);
        ```
        
3. Then define the stream query to join the stream and the table, and handle the result as required.
    1. Add the `from` clause as follows with the `join` keyword to join the table and the stream.

        ```sql
        from TransactionStream as t join UserTable as u on t.userId == u.userId
        ```

        :::info
            Note the following about the `from` clause:

            * In this example, the input data is taken from both a stream and a table. You need to assign a unique reference for each of them to allow the query to differentiate between the common attributes. In this example, `TransactionStream` stream is referred to as `t`, and the `UserTable` table is referred to as `u`.
            * The `join ` keyword joins the stream and the table together while specifying the unique references.
            * The condition for the stream and the table to be joined is `t.userId == u.userId `, which means that for an event to be taken from the `TransactionStream` for the join, one or more events that have the same value for the `userId` must exist in the `UserTable` table and vice versa.
        :::        
    2. To specify how the value for each attribute in the output stream is derived, add a `select` clause as follows.

        ```sql
        select t.userId, str:concat( u.firstName, " ", u.lastName) as userName, transactionAmount, location
        ```

        :::info
            Note the following in the `select` statement:

            * The `userId` attribute name is common to both the stream and the table. Therefore, you need to specify from where this attribute needs gto be taken. Here, you can also specify `u.userId` instead of `t.userId`.
            * You are specifying the output generated to include an attribute named `userName`. The value for that is derived
            by concatenating the values of two attributes in the `UserTable` table (i.e., `firstName` and `lastName` attributes)
            by applying the `str:concat()` function. 
            * Similarly, you can apply any of the range of streams functions available to further enrich the joined output.
        :::     
    3. To infer an output stream into which the enriched data must be directed, add the `insert into` clause as follows.
       `insert into EnrichedTrasanctionStream;`

    4. The completed stream application is as follows.

        ```sql
        @App:name("EnrichingTransactionsApp")
        @App:qlVersion("2")


        CREATE STREAM TrasanctionStream (userId long, transactionAmount double, location string);

        CREATE TABLE UserTable (userId long, firstName string, lastName string);

		CREATE STREAM EnrichedTrasanctionStream WITH (type='stream', stream='EnrichedTrasanctionStream', map.type='json') (userId long, userName string, transactionAmount double, location string);

        insert into EnrichedTrasanctionStream
        select t.userId, str:concat( u.firstName, " ", u.lastName) as userName, transactionAmount, location
        from TrasanctionStream as t join UserTable as u on t.userId == u.userId ;
        ```

    5. To check whether the above stream application works as expected follow below steps

        1. Load `UserTable` Collection with User Data

            ```json
            {"userId":1200001,"firstName":"Raleigh","lastName":"McGilvra"}
            {"userId":1200002,"firstName":"Marty","lastName":"Mueller"}
            {"userId":1200003,"firstName":"Kelby","lastName":"Mattholie"}
            ```

        2. Publish events on the `TrasanctionStream`

            ```json
            {"userId":1200002,"transactionAmount":803,"location":"Chicago"}
            {"userId":1200001,"transactionAmount":1023,"location":"New York"}
            ```

        3. You can observe the following events on `EnrichedTrasanctionStream`

            ```json
            {"event":{"userId":1200002,"userName":"Marty Mueller","transactionAmount":803.0,"location":"Chicago"}}
            {"event":{"userId":1200001,"userName":"Raleigh McGilvra","transactionAmount":1023.0,"location":"New York"}}
            ```

## Enrich data with another Stream 

This section explains how to enrich the data in a specific stream by joining it with another stream.

To understand how this is done, consider a scenario where you receive information about cash withdrawals and cash deposits at different bank branches from two separate applications. Therefore, this two types of information are captured via two separate streams. To compare the withdrawals with deposits and observe whether enough deposits are being made to manage the withdrawals, you need to join both these streams. To do this, follow the procedure below.

1. Open the GUI. Click the **Stream Apps** tab.

1. Click **New** to define a new stream application.

1. Type a **Name** for the stream application. For example, `BankTransactionsApp`.

1. Type a **Description**.

1. Define the two input streams via which you are receiving information about withdrawals and deposits.
        
    1. Create a stream named `CashWithdrawalStream` to capture information about withdrawals as follows.
        ```sql
        CREATE STREAM CashWithdrawalStream(branchID int, amount long);
        ```

    2. Create a stream named `CashDepositsStream` to capture information about deposits as follows.
        ```sql
        CREATE STREAM CashDepositsStream(branchID string, amount long);
        ```
        
3. Now let's define an output stream to which the combined information from both the input streams need to be directed after the join.

    ```sql
	CREATE STREAM CashFlowStream WITH (type='stream', stream.list='CashFlowStream') (branchID string, withdrawalAmount long, depositAmount long);
    ```

    !!!info
        A sink annotation is connected to the output stream to publish the output events. For more information about adding sinks to publish events, see the [Publishing Data guide](publishing-data.md).
        
4. To specify how the join is performed, and how to use the combined information, write a stream query as follows.

    1. To perform the join, add the `from` clause as follows.

        ```sql
        from CashWithdrawalStream as w
            join CashDepositStream as d
            on w.branchID == d.branchID
        ```

        :::info
            Observe the following about the above `from` clause:

            * Both the input streams have attributes of the same name. To identify each name, you must specify a reference
             for each stream. In this example, the reference for the `CashWithdrawalStream` is `w`, and the reference for the `CashDepositsStream` stream is `d`.
            * You need to use `join` as the keyword to join two streams. The join condition is ` w.branchID == d.branchID` 
              where branch IDs are matched. An event in the `CashWithdrawalStream` stream is directed to the `CashFlowStream` if there are events with the same branch ID in the `CashDepositStream` and vice versa.
        :::      
    2. To specify how the value for each attribute is derived, add a `select` statement as follows.

        ```sql
        select w.branchID as branchID, w.amount as withdrawals, d.amount as deposits
        ```
        
        :::info
            The `branchID` attribute name is common to both input streams. Therefore, you can also specify `d.branchID as branchID` instead of `w.branchId as branchId`.
        :::    
    3. To filter only events where total cash withdrawals are greater than 95% of the cash deposits, add a `having` clause as follows.

        ```sql
        having w.amount > d.amount * 0.95 
        ```
        
    4. To insert the results into the `CashFlowStream` output stream, add the `insert into` clause as follows.

        ```sql
        insert into CashFlowStream;
        ```
        
    5. The completed stream application is as follows:

        ```sql
        @App:name("BankTransactionsApp")
        @App:qlVersion("2")

        CREATE STREAM CashWithdrawalStream(branchID string, amount long);

        CREATE STREAM CashDepositsStream(branchID string, amount long);

		CREATE STREAM CashFlowStream WITH (type='stream', stream='CashFlowStream') (branchID string, withdrawalAmount long, depositAmount long);

        insert into CashFlowStream
        select w.branchID as branchID, w.amount as withdrawalAmount, d.amount as depositAmount
        from CashWithdrawalStream as w join CashDepositsStream as d 
            on w.branchID == d.branchID
        having w.amount > d.amount * 0.95;
        ```

For the different types of joins you can perform via streams, see [Stream Query Guide - Join](../reference/query-guide.md#join-stream)

## Enrich data with External Services

This section explains how to enrich the data in a specific stream by connecting with an external service and adding information received from that service to the existing data.

To understand how this is done, consider an example where you have some credit card numbers, but need to connect with an external service to identify the credit card companies that issued them, and then save that information in a database.

1. Start creating a new stream application. You can name it `CCTypeIdentificationApp` For instructions, see [Creating a Stream Application](./create-stream-app.md).

2. Define the input stream from which the input data (i.e., the credit card no in this example) must be taken.

   ```js
   define stream CreditCardStream (creditCardNo string);
   ```
   
3. To publish the input data to the external application, connect a sink to the stream you created as shown below. For more information about publishing information, see the [Publishing Data guide](publishing-data.md).

    ```sql
	CREATE STREAM CreditCardStream WITH (type='http-request', publisher.url='https://secure.ftipgw.com/ArgoFire/validate.asmx/GetCardType', method='POST', headers="'Content-Type:application/x-www-form-urlencoded'", sink.id="cardTypeSink", sink.map.type='keyvalue', sink.map.payload = (CardNumber='{{creditCardNo}}')) (creditCardNo string);
    ```

    :::info
        Note the following about the above sink definition:
        - It is assumed that the external application receives requests in HTTP. Therefore, the sink type is `http-request`.
        - The `publisher.url` parameter specifies the URL to which the outgoing events need to be published via HTTP.
        - For more information about the HTTP transport, see [Plugins - HTTP](../reference/extensions/io/http.md).
    :::    
4. To capture the response of the external application once it returns the credit card type, create a stream as follows. For more information about consuming data, see the [Consuming Data guide](./consuming-data.md).

    ```sql
    CREATE STREAM EnrichedCreditCardStream (creditCardNo string, creditCardType string);
    ```
    
5. Assuming the external application sends its output via HTTP transport, connect a source of the `http`type to the `EnrichedCreditCardStream` stream as follows. For more information about consuming events, see the [Consuming Data guide](./consuming-data.md).

    ```sql
	CREATE STREAM EnrichedCreditCardInfoStream WITH (source.type='http-response', sink.id='cardTypeSink', map.type='xml', map.namespaces = "xmlns=http://localhost/SmartPayments/", attributes.creditCardNo = 'trp:creditCardNo',creditCardType = ".") (creditCardNo string,creditCardType string);
    ```

    !!!info
        It is assumed that the external application sends requests in HTTP. Therefore, the source type is `http-request`. For more information about the HTTP transport, see [Plugins - HTTP](../reference/extensions/io/http.md).
        
6. To save the response of the external application, define a table named `CCInfoTable`.

    ```sql
    CREATE TABLE CCInfoTable (cardNo long, cardType string);
    ```
    
7. To save the data enriched by integrating the information received from the external service, add a stream query as follows.

    ```sql
    update or insert into CCInfoTable 
        on CCInfoTable.creditCardNo == creditCardNo
    select *
    from EnrichedCreditCardInfoStream;
    ```

    The above query selects all the attributes in the `EnrichedCreditCardInfoStream` and inserts them into the `CCInfoTable` table. If a specific record already exists,the query updates it by replacing the attribute values with the latest values taken from the `EnrichedCreditCardInfoStream`. 
     
8. The completed stream application is as follows:

    ```sql
    @App:name("CCTypeIdentificationApp")
    @App:qlVersion("2")

    CREATE STREAM CreditCardStream (creditCardNo string);

	CREATE STREAM GetCreditCardInfoStream WITH (type='http-call', publisher.url='http://secure.ftipgw.com/ArgoFire/validate.asmx/GetCardType', method='POST', headers="'Content-Type:application/x-www-form-urlencoded'", sink.id="cardTypeSink", sink.map.type='keyvalue', sink.map.payload = (CardNumber='{{creditCardNo}}')) (creditCardNo string);

	CREATE STREAM EnrichedCreditCardInfoStream WITH (source.type='http-response', sink.id='cardTypeSink', map.type='xml', map.namespaces = "xmlns=http://localhost/SmartPayments/", attributes.creditCardNo = 'trp:creditCardNo',creditCardType = ".") (creditCardNo string,creditCardType string);

    CREATE TABLE CCInfoTable (creditCardNo string,creditCardType string);

    insert into GetCreditCardInfoStream
    select creditCardNo
    from CreditCardStream;

    update or insert into CCInfoTable 
        on CCInfoTable.creditCardNo == creditCardNo
    select *
    from EnrichedCreditCardInfoStream;
    ```

## Enrich data using built-in Plugins

The following is a list of stream plugins  with which you can enrich data.

 - [streamingml](../reference/extensions/execution/streamingml.md)
 - [math](../reference/extensions/execution/math.md)
 - [time](../reference/extensions/execution/time.md)
 - [json](../reference/extensions/execution/json.md)
