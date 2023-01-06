---
sidebar_position: 10
title: Enrich Data with a Collection
---

This section explains how to enrich the data in a specific stream by joining it with c8db collection. For this purpose, consider
a scenario where you receive sales records generated from multiple locations as events via a system.

1. Open the GUI. Click the **Stream Worker** tab.
2. Click **New** to define a new stream worker.
3. Type a **Name** for the stream worker. For example, `EnrichingTransactionsApp`.
4. Type a **Description**.
5. Add the following sample stream worker.

6. Define the input stream and the c8db collection that need to be joined as follows.

    1. Define the stream as follows.

        ```sql
        CREATE STREAM TrasanctionStream (userId long, transactionAmount double, location string);
        ```

    2. Define the table as follows.

        ```sql
        CREATE TABLE GLOBAL UserTable (userId long, firstName string, lastName string);
        ```
    3. Define the sink stream as follows.

        ```sql
	CREATE SINK EnrichedTrasanctionStream WITH (type='stream', stream='EnrichedTrasanctionStream', map.type='json') (userId long, userName string, transactionAmount double, location string);
	```

7. Then define the query for a stream to join the stream and the table, and handle the result as required.
    1. Add the `from` clause as follows with the `join` keyword to join the table and the stream.

        ```sql
        from UserTable as u join TransactionStream as t on u.userId == t.userId
        ```

        :::info
            Note the following about the `from` clause:

            * In this example, the input data is taken from both a stream and a table. You need to assign a unique reference for each of them to allow the query to differentiate between the common attributes. In this example, `TransactionStream` stream is referred to as `t`, and the `UserTable` table is referred to as `u`.
            * The `join ` keyword joins the stream and the table together while specifying the unique references.
            * The condition for the stream and the table to be joined is `t.userId == u.userId `, which means that for an event to be taken from the `TransactionStream` for the join, one or more events that have the same value for the `userId` must exist in the `UserTable` table and vice versa.
        :::
    2. To specify how the value for each attribute in the output stream is derived, add a `select` clause as follows.

        ```sql
        select u.userId, str:concat( u.firstName, " ", u.lastName) as userName, transactionAmount, location
        ```

        :::info
            Note the following in the `select` statement:

            * The `userId` attribute name is common to both the stream and the table. Therefore, you need to specify from where this attribute needs to be taken. Here, you can also specify `t.userId` instead of `u.userId`.
            * You are specifying the output generated to include an attribute named `userName`. The value for that is derived
            by concatenating the values of two attributes in the `UserTable` table (i.e., `firstName` and `lastName` attributes)
            by applying the `str:concat()` function. 
            * Similarly, you can apply any of the range of streams functions available to further enrich the joined output.
        :::
    3. To infer an output stream into which the enriched data must be directed, add the `insert into` clause as follows.
       `insert into EnrichedTrasanctionStream;`

    4. The completed stream worker is as follows.

        ```sql
        @App:name("EnrichingTransactionsApp")
        @App:qlVersion("2")

        CREATE STREAM TransactionStream (userId long, transactionAmount double, location string);

        CREATE TABLE GLOBAL UserTable (userId long, firstName string, lastName string);

        CREATE SINK EnrichedTransactionStream WITH (type='stream', stream='EnrichedTransactionStream', map.type='json') (userId long, userName string, transactionAmount double, location string);

        insert into EnrichedTransactionStream
        select u.userId, str:concat( u.firstName, " ", u.lastName) as userName, transactionAmount, location
        from UserTable as u join TransactionStream as t on u.userId == t.userId ;
        ```

    5. To check whether the above stream worker works as expected follow below steps

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
