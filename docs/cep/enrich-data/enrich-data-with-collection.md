---
sidebar_position: 10
title: Enrich Data with a Collection
---

This page explains how to enrich the data in a specific stream by joining it with a Macrometa [collection](../../collections/index.md).

For this purpose, consider a scenario where you receive sales records generated from multiple locations as events from an external system.

## Create a Stream Worker

For more information about stream workers and how they work, refer [Stream Workers](index.md).

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Stream Worker**.
1. In the Editor tab, you must define the stream worker. Copy and paste the following code block in the code editor on the Editor tab.

    ```sql
    @App:name("EnrichingTransactionsApp")
    @App:qlVersion("2")
    @App:description('An application for enriching transactions.')
    /**
    Test the stream worker:
    1. If they are not already present, then run the following query to add the records to the UserTable collection.

        LET data = [
        {"userId":1200001,"firstName":"Raleigh","lastName":"McGilvra"},
        {"userId":1200002,"firstName":"Marty","lastName":"Mueller"},
        {"userId":1200003,"firstName":"Kelby","lastName":"Mattholie"}
        ]

        FOR d IN data
            INSERT d INTO UserTable

    2. Open a stream window to view c8locals.EnrichedTransactionStream output.

    3. Send the following message to c8locals.TransactionStream:

        "userId":1200002,"transactionAmount":803,"location":"Chicago",

        c8locals.EnrichedTransactionStream output should be:

        {"transactionAmount":803.0,"location":"Chicago","userName":"Marty Mueller","userId":1200002,}

   4. Send the following message to c8locals.TransactionStream:

        "userId":1200001,"transactionAmount":1023,"location":"New York"

        c8locals.EnrichedTransactionStream output should be:

        {"transactionAmount":1023.0,"location":"New York","userName":"Raleigh McGilvra","userId":1200001}

    **/

    -- Define the stream.
    CREATE STREAM TransactionStream (userId long, transactionAmount double, location string);

    -- Define the table (collection).
    CREATE TABLE GLOBAL UserTable (userId long, firstName string, lastName string);

    CREATE SINK EnrichedTransactionStream WITH (type='stream', stream='EnrichedTransactionStream', map.type='json') (userId long, userName string, transactionAmount double, location string);

    insert into EnrichedTransactionStream
    from UserTable as u join TransactionStream as t on u.userId == t.userId;
    select u.userId, str:concat( u.firstName, " ", u.lastName) as userName, transactionAmount, location
   
    ```

1. Click **Validate**. Macrometa checks to see that your code is valid.
1. Click **Save**.
1. Select edge locations, and then click **Save**. The locations that you select represent where the data for this stream worker will live.
1. Click **Publish** to publish your stream worker. When you do this, it will begin to run the code as defined and will continue until you unpublish it.

## Test the Stream Worker

Use the following procedure to verify that the stream worker functions as expected.

### 1. Load UserTable Collection with User Data

Run the following query using one of the methods described in [Running Queries](../../queryworkers/running-queries.md) to add the records to the collection. Each line is a separate record.

```sql
LET data = [
   {"userId":1200001,"firstName":"Raleigh","lastName":"McGilvra"},
   {"userId":1200002,"firstName":"Marty","lastName":"Mueller"},
   {"userId":1200003,"firstName":"Kelby","lastName":"Mattholie"}
   ]

FOR d IN data
    INSERT d INTO UserTable
```

### 2. Open a Stream Window

The Macrometa Streams console does not persist messages, so to see them, you must have the console open before you send.

1. In a new tab or window, open the Macrometa console.
1. Click **Streams**.
1. Click **c8locals.EnrichedTransactionStream**.

### 3. Publish Events and Observe Output

There are several ways to [publish messages to streams](../../streams/stream-tasks/publish-messages.md), this page shows you how to do it in the Macrometa console API reference.

1. In the original tab or window (not the one with the stream open), click **API Reference**.
1. In the API Reference pane, click to expand **Streams** and then click the POST command **Publish message**.
1. Click **Try it out**.
1. In **fabric**, enter the fabric your stream worker is associated with. This is the fabric you were logged in to when you created the stream worker, probably `_system`.
1. In **stream**, enter `c8locals.TransactionStream`.
1. Copy and paste the following transaction code block into **Message**, between the curly brackets:

    ```json
    "userId":1200002,"transactionAmount":803,"location":"Chicago",
    ```

   The stream worker enriches the transaction information and sends the following message to `EnrichedTransactionStream`:

    ```json
    {"transactionAmount":803.0,"location":"Chicago","userName":"Marty Mueller","userId":1200002,}
    ```

1. To test a second time, copy and paste the following transaction code block into **Message**, between the curly brackets:

    ```json
    "userId":1200001,"transactionAmount":1023,"location":"New York"
    ```

   ```json
   {"transactionAmount":1023.0,"location":"New York","userName":"Raleigh McGilvra","userId":1200001}
   ```
