---
sidebar_position: 10
title: Correlating Events to Find a Pattern
---

This section explains how you can detect trends and patterns in the streams. There are two types of patterns as follows:

- [Counting Patterns](../../query-guide/patterns/counting-patterns): These count the number of instances that match the given pattern condition.
- [Logical Patterns](../../query-guide/patterns/logical-patterns): These identify logical relationships between events.

## Count and Match Multiple Events for a Given Pattern Condition

To understand how to count and match multiple events that match a specific condition, consider the example where a store
wants to check the frequency with which a specific product needs to be repaired within two months after it is purchased.
If a specific product is brought back for repairs within two months more than five times, then the manager of purchases needs
to be notified.

### Single Pattern Stream Worker

```sql
@App:name("DefectDetectionApp")
@App:qlVersion("2")

-- Define the input streams into which the events compared are received.

-- Capture information about purchases.
CREATE STREAM PurchasesStream (productName string, custID string);

-- Capture information about repairs.
CREATE STREAM RepairsStream (productName string, custID string);

-- Define the output stream where the message is published.
CREATE SINK STREAM DefectiveProductsStream (message string);

-- Query to count occurrences where a product is brought back for repairs within two months following its purchase, and identify products where the threshold for such occurrences is reached.
INSERT INTO DefectiveProductsStream
SELECT str:concat("Hello,The product ", e1.productName, " is identified as defective.\n\nThis message was generated automatically.") AS message
FROM EVERY (e1=PurchasesStream) -> e2=RepairsStream[e1.productName==e2.productName AND e1.custID==e2.custID]<5:> WITHIN 2 months
```

### Single Pattern Query Explanation

- The input is derived from two streams. Therefore, first, both streams considered are specified and a unique reference is assigned to each stream. The `PurchasesStream` is referred to as `e1` and the `RepairsStream` is referred to as `e2`.

- The matching condition to be met is that both streams should have an event where the values for both `productName` and `custID` attributes are the same.

- The event in the `PurchasesStream` stream need to arrive before the matching event in the `RepairsStream` stream.

- The matching event in the `RepairsStream` stream should arrive within two months after the arrival of the event in the `PurchasesStream` stream.

- `<5:>` indicates that an output is generated only when the matching condition is met five times.

- A time window of `2 months` is added to consider only a period of two months in a sliding manner when counting the number of times the matching condition for the pattern is met.

## Combine Several Patterns Logically and Match Events

To understand how to combine several patterns logically and match events, consider an example of a factory supervisor who
needs to observe the factory output, identify any production decreases, and check whether those decreases have reached a
maximum threshold that requires the supervisor to take action.

```sql
@App:name("ProductionDecreaseDetectionApp")
@App:qlVersion("2")

-- Define an input stream as follows to capture the factory output.
CREATE STREAM ProductionStream(productName string, factoryBranch string, productionAmount long);

-- Define an output stream to present the observed production trend after applying the logical pattern.
CREATE SINK ProductionDecreaseAlertStream WITH (type='log', prefix='Decrease in production detected:') (productName string, originalAmount long, laterAmount long, factoryBranch string);

-- Query to apply the pattern so that the production decrease can be observed.
INSERT INTO ProductionDecreaseAlertStream
SELECT e1.productName, e1.productionAmount AS originalAmount, e2.productionAmount AS laterAmount, e1.factoryBranch
FROM EVERY (e1=ProductionStream) -> e2=ProductionStream[e1.productName == e2.productName AND e1.productionAmount - e2.productionAmount > 10] WITHIN 10 min;
```

### Multi-Pattern Query Explanation

- Two events from the same stream are compared to identify whether the production has decreased. The unique reference for the first event is `e1`, and the unique reference for the second event is `e2`.

- `e2` arrives after `e1`, but it is not necessarily the event that arrives immediately after `e1`.

- The condition that should be met for `e1` and `e2` to be compared is `e1.productName == e2.productName and e1.productionAmount - e2.productionAmount > 10`. This means, both the events should report the production of the same product, and there should be a decrease in production that is greater than 10 between the `e1` and `e2` events.

- A `10 min` time window is included to indicate that an output event is generated only if the decrease in production by 10 or more units takes place every ten minutes in a sliding manner.
