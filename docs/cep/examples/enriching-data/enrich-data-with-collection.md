---
sidebar_position: 100
title: Enrich Data with a Collection
---

This example explains how to enrich the data in a specific stream by joining it with a Macrometa [collection](../../../collections/index.md).

For this purpose, consider a scenario where you receive sales records generated from multiple locations as events from an external system.

## Stream Worker Code

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

1. Send the following message to c8locals.TransactionStream:

    "userId":1200001,"transactionAmount":1023,"location":"New York"

    c8locals.EnrichedTransactionStream output should be:

    {"transactionAmount":1023.0,"location":"New York","userName":"Raleigh McGilvra","userId":1200001}

**/

-- Define the stream.
CREATE STREAM TransactionStream (userId long, transactionAmount double, location string);

-- Define the table (collection).
CREATE TABLE GLOBAL UserTable (userId long, firstName string, lastName string);

CREATE SINK EnrichedTransactionStream WITH (type='stream', stream='EnrichedTransactionStream', map.type='json') (userId long, userName string, transactionAmount double, location string);

INSERT INTO EnrichedTransactionStream
SELECT u.userId, str:concat( u.firstName, " ", u.lastName) AS userName, transactionAmount, location
FROM UserTable AS u JOIN TransactionStream AS t ON u.userId == t.userId
```

## Stream Worker Explanation

This section explains the parts of this stream worker and what they are doing.

### Metadata

This information defines basic information about the stream worker. Every stream worker must have at least a name and query language version in order to be valid. For more information about stream worker metadata, refer to [Metadata](../../metadata).

- **Name** - `@App:name("EnrichingTransactionsApp")`
- **Query language version (optional)** - @App:qlVersion("2")
- **Description (optional)** - @App:description('An application for enriching transactions.')
- **Other information (optional)** - By convention, you can enter a comment with testing information, update logs, or other useful information at the beginning of the stream worker definition between `/**` and `**/`. This is similar to a docstring in functions.

:::note
`qlVersion` is only used for backwards compatibility with deprecated stream workers.
:::

### Input and Output

Define the input stream and the Macrometa collection that need to be joined as follows. If the stream or collection do not exist, then Macrometa creates them when you publish the stream worker.

#### Define the Source Stream

This stream is where the data is coming from. For more information about defining a stream in a stream worker, refer to [Stream Source](../../source/stream-source.md). For more information about streams in general, refer to [Streams](../../../streams/index.md).

```sql
CREATE STREAM TransactionStream (userId long, transactionAmount double, location string);
```

#### Define the Table (Collection)

`CREATE TABLE` defines where the stream worker stores your data. In this case, it will be a [Document Collection](../../../collections/documents/index.md) For more information about defining a TABLE in a stream worker, refer to [Table (Collection)](../../table/index.md). For more information about collections in general, refer to [Collections](../../../collections/index.md).

```sql
CREATE TABLE GLOBAL UserTable (userId long, firstName string, lastName string);
```

#### Define the Sink

The sink is where the stream worker sends your data.

```sql
CREATE SINK EnrichedTransactionStream WITH (type='stream', stream='EnrichedTransactionStream', map.type='json') (userId long, userName string, transactionAmount double, location string);
```

### Data Enrichment Query

Define the query for a stream to join the stream and the table, and then handle the result. This section examines the query line by line.

#### Insert Data

The `INSERT INTO` clause defines an output stream into which the enriched data is directed.

```sql
INSERT INTO EnrichedTransactionStream;
```

#### Select Data

A `SELECT` clause specifies how the value for each attribute in the output stream is derived. The variables used for the attributes are defined in the next line where you [join data](#join-data).

```sql
SELECT u.userId, str:concat( u.firstName, " ", u.lastName) AS userName, transactionAmount, location
```

Note the following in the `SELECT` statement:

- The `userId` attribute name is common to both the stream and the table. Therefore, you need to specify from where this attribute needs to be taken. Here, you can also specify `t.userId` instead of `u.userId`.
- You are specifying the output generated to include an attribute named `userName`. The value for that is derived
by concatenating the values of the `firstName` and `lastName` attributes in the `UserTable` table using the `str:concat()` function.
- You can apply any of the range of streams functions available to further enrich the joined output.

#### Join Data

The `FROM` clause together with the `JOIN` keyword join the table and the stream.

```sql
FROM UserTable AS u JOIN TransactionStream AS t ON u.userId == t.userId
```

Note the following about the `FROM` clause:

- The input data is taken from both a stream and a table. You need to assign a unique reference for each of them to allow the query to differentiate between the common attributes. In this example, `TransactionStream` stream is referred to as `t`, and the `UserTable` table is referred to as `u`.
- The `JOIN` keyword joins the stream and the table together and defines the unique references.
- The condition for the stream and the table to be joined is `t.userId == u.userId`, which means that for an event to be taken from the `TransactionStream` for the join, one or more events that have the same value for the `userId` must exist in the `UserTable` table and vice versa.

## Test the Stream Worker

Use the following procedure to verify that the stream worker functions as expected.

### 1. Load UserTable Collection with User Data

Run the following query using one of the methods described in [Running Queries](../../../queries/running-queries.md) to add the records to the collection. Each line is a separate record.

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

There are several ways to [publish messages to streams](../../../streams/stream-tasks/publish-messages.md), this page shows you how to do it in the Macrometa console API reference.

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
