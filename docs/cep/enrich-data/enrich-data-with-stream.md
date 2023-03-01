---
sidebar_position: 110
title: Enrich Data with Another Stream
---

This example explains how to enrich the data in a specific stream by joining it with another stream.

Consider a scenario where you receive information about cash withdrawals and cash deposits at different bank branches from two separate applications. Therefore, this two types of information are captured via two separate streams. To compare the withdrawals with deposits and observe whether enough deposits are being made to manage the withdrawals, you need to join both these streams.

## Stream Worker Code

```sql
@App:name("BankTransactionsApp")
@App:qlVersion("2")

-- Define an input stream to capture information about withdrawals.
CREATE STREAM CashWithdrawalStream(branchID int, amount long);

-- Define an input stream to capture information about deposits.
CREATE STREAM CashDepositsStream(branchID int, amount long);

-- Define an output stream to which the combined information from both the input streams can to be directed after the join.
CREATE SINK CashFlowStream WITH (type='stream', stream='CashFlowStream') (branchID int, withdrawalAmount long, depositAmount long);

INSERT INTO CashFlowStream
SELECT w.branchID AS branchID, w.amount AS withdrawalAmount, d.amount AS depositAmount
FROM CashWithdrawalStream WINDOW SLIDING_TIME(1 min) AS w 
    JOIN CashDepositsStream WINDOW SLIDING_TIME(1 min) AS d 
    ON w.branchID == d.branchID
    HAVING w.amount > d.amount * 0.95;
```

## Stream Worker Explanation

This section explains the parts of this stream worker and what they are doing.

### Metadata

This information defines basic information about the stream worker. Every stream worker must have at least a name and query language version in order to be valid. For more information about stream worker metadata, refer to [Metadata](../metadata).

- **Name** - `@App:name("BankTransactionsApp")`
- **Query language version (optional)** - @App:qlVersion("2")

:::note
`qlVersion` is only used for backwards compatibility with deprecated stream workers.
:::

### Input and Output

Define the input stream and  that need to be joined as follows. If the stream or collection do not exist, then Macrometa creates them when you publish the stream worker.

#### Define the Source Streams

This stream is where the data is coming from. For more information about defining a stream in a stream worker, refer to [Create Stream as Source](../source/stream-source.md). For more information about streams in general, refer to [Streams](../../streams/index.md).

Define the two input streams via which you are receiving information about withdrawals and deposits.

- `CashWithdrawalStream` to capture information about withdrawals.

    ```sql
    CREATE STREAM CashWithdrawalStream(branchID int, amount long);
    ```

- `CashDepositsStream` to capture information about deposits.

    ```sql
    CREATE STREAM CashDepositsStream(branchID int, amount long);
    ```

#### Define the Sink

The sink is where the stream worker sends your data. This output stream is where the combined information from both the input streams will to be sent after the join.

```sql
CREATE SINK CashFlowStream WITH (type='stream', stream.list='CashFlowStream') (branchID int, withdrawalAmount long, depositAmount long);
```

### Data Enrichment Query

Define the query for a stream to join the streams and then handle the result. This section examines the query line by line.

#### Insert Data

The `INSERT INTO` clause inserts the results into the `CashFlowStream` output stream

```sql
INSERT INTO CashFlowStream
```

#### Select Data

A `SELECT` clause specifies how the value for each attribute in the output stream is derived. The variables used for the attributes are defined in the next line where you [join data](#join-data).

```sql
SELECT w.branchID AS branchID, w.amount AS withdrawalAmount, d.amount AS depositAmount
```

Note the following in the `SELECT` statement:

- The `branchID` attribute name is common to both input streams. Therefore, you can also specify `d.branchID as branchID` instead of `w.branchId as branchId`.
- You can apply any of the range of streams functions available to further enrich the joined output.

#### Join Data

The `FROM` clause together with the `JOIN` keyword join the two input streams and create a [SLIDING_TIME window](../windows/window-types/sliding-time.md).

To perform the join, add the `from` clause as follows.

```sql
FROM CashWithdrawalStream WINDOW SLIDING_TIME(1 min) AS w 
    JOIN CashDepositsStream WINDOW SLIDING_TIME(1 min) AS d 
    ON w.branchID == d.branchID
```

Note the following about the above `FROM` clause:

- Both the input streams have attributes of the same name. To identify each name, you must specify a reference for each stream. In this example, the reference for the `CashWithdrawalStream` is `w`, and the reference for the `CashDepositsStream` stream is `d`.
- You need to use `join` as the keyword to join two streams. The join condition is ` w.branchID == d.branchID` where branch IDs are matched. An event in the `CashWithdrawalStream` stream is directed to the `CashFlowStream` if there are events with the same branch ID in the `CashDepositStream` and vice versa.

#### Filter Events

The `HAVING` clause filters events so that only events where total cash withdrawals are greater than 95% of the cash deposits are inserted into the sink stream.

```sql
HAVING w.amount > d.amount * 0.95 
```
