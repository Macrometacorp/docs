---
sidebar_position: 20
title: Enrich Data with Another Stream
---

This section explains how to enrich the data in a specific stream by joining it with another stream.

To understand how this is done, consider a scenario where you receive information about cash withdrawals and cash deposits at different bank branches from two separate applications. Therefore, this two types of information are captured via two separate streams. To compare the withdrawals with deposits and observe whether enough deposits are being made to manage the withdrawals, you need to join both these streams. To do this, follow the procedure below.

1. Open the GUI. Click the **Stream Worker** tab.

1. Click **New** to define a new stream worker.

1. Type a **Name** for the stream worker. For example, `BankTransactionsApp`.

1. Type a **Description**.

1. Define the two input streams via which you are receiving information about withdrawals and deposits.

    1. Create a stream named `CashWithdrawalStream` to capture information about withdrawals as follows.

        ```sql
        CREATE STREAM CashWithdrawalStream(branchID int, amount long);
        ```

    2. Create a stream named `CashDepositsStream` to capture information about deposits as follows.

        ```sql
        CREATE STREAM CashDepositsStream(branchID int, amount long);
        ```

3. Now let's define an output stream to which the combined information from both the input streams need to be directed after the join.

    ```sql
	CREATE SINK CashFlowStream WITH (type='stream', stream.list='CashFlowStream') (branchID int, withdrawalAmount long, depositAmount long);
    ```

    !!!info
        A sink annotation is connected to the output stream to publish the output events. For more information about adding sinks to publish events, see the [Publishing Data guide](../tutorials/publishing-data.md).

4. To specify how the join is performed, and how to use the combined information, write a query to a stream as follows.

    1. To perform the join, add the `from` clause as follows.

        ```sql
        from CashWithdrawalStream window sliding_time(1 min) as w 
		join CashDepositsStream window sliding_time(1 min) as d 
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
        select w.branchID as branchID, w.amount as withdrawalAmount, d.amount as depositAmount
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

    5. The completed stream worker is as follows:

        ```sql
        @App:name("BankTransactionsApp")
        @App:qlVersion("2")

        CREATE STREAM CashWithdrawalStream(branchID int, amount long);

        CREATE STREAM CashDepositsStream(branchID int, amount long);

        CREATE SINK CashFlowStream WITH (type='stream', stream='CashFlowStream') (branchID int, withdrawalAmount long, depositAmount long);

        insert into CashFlowStream
        select w.branchID as branchID, w.amount as withdrawalAmount, d.amount as depositAmount
        from CashWithdrawalStream window sliding_time(1 min) as w 
            join CashDepositsStream window sliding_time(1 min) as d 
            on w.branchID == d.branchID
            having w.amount > d.amount * 0.95;
        ```

For the different types of joins you can perform via streams, see [Stream Query Guide - Join](../query-guide/query.md#join-stream)
