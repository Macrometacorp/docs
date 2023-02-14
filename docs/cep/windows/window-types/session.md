---
title: SESSION()
---

Holds events that belong to a session. Events that belong to a specific session are identified by a session key, and a session gap is determines the time period after which the session is considered to be expired. To have meaningful aggregation on session windows, the events need to be aggregated based on the session key via a `group by` clause.

## Syntax

    WINDOW SESSION()(<INT|LONG|TIME> session.gap)
    WINDOW SESSION()(<INT|LONG|TIME> session.gap, <STRING> session.key)
    WINDOW SESSION()(<INT|LONG|TIME> session.gap, <STRING> session.key, <INT|LONG|TIME> allowed.latency)

## Query Parameters

| Name            | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------|---------------|---------------------|----------|---------|
| session.gap     | The time period after which the session is considered to be expired.         |               | INT LONG TIME       | No       | No      |
| session.key     | The session identification attribute. Used to group events belonging to a specific session.          | default-key   | STRING              | Yes      | Yes     |
| allowed.latency | The time period for which the session window is valid after the expiration of the session, to accept late event arrivals. This time period should be less than the `session.gap` parameter. | 0             | INT LONG TIME       | Yes      | No      |

## Example 1

```sql
CREATE STREAM PurchaseEventStream (user string, item_number int, price float, quantity int);
CREATE SINK STREAM OutputStream (user string, totalQuantity long, totalPrice double);

@info(name='query1')
INSERT INTO OutputStream
SELECT user, sum(quantity) AS totalQuantity, sum(price) AS totalPrice
FROM PurchaseEventStream WINDOW SESSION(5 sec, user)
GROUP BY user;
```

From the events arriving at the PurchaseEventStream, a session window with five seconds session gap is processed based on the `user` attribute as the session group identification key. All events falling into the same session are aggregated based on the `user` attribute and output to the OutputStream.

## Example 2

```sql
CREATE STREAM PurchaseEventStream (user string, item_number int, price float, quantity int);
CREATE SINK STREAM OutputStream (user string, totalQuantity long, totalPrice double);

@info(name='query2')
INSERT INTO OutputStream
SELECT user, sum(quantity) AS totalQuantity, sum(price) AS totalPrice
FROM PurchaseEventStream WINDOW SESSION(5 sec, user, 2 sec)
GROUP BY user;
```

From the events arriving at the PurchaseEventStream, a session window with five seconds session gap is processed based on the `user` attribute as the session group identification key. This session window is kept active for two seconds after the session expiration to capture late (out-of-order) event arrivals. If the event timestamp falls in to the last session the session is reactivated. Then all events falling into the same session are aggregated based on the `user` attribute and output to the OutputStream.

## Example 3

This example shows aggregating events over continuous activity sessions in a sliding manner.

### Stream Worker Code

```sql
CREATE STREAM PurchaseStream(userId string, item string, price double);

CREATE SINK STREAM OutOfOrderUserIdPurchaseStream(userId string, totalItems long, totalPrice double);
CREATE SINK STREAM UserIdPurchaseStream(userId string, totalItems long, totalPrice double);

@info(name = 'Session-analysis')
-- Calculate count and sum of `price` per `userId` during the session.
INSERT INTO OutOfOrderUserIdPurchaseStream
SELECT userId,
       count() as totalItems,
       sum(price) as totalPrice
-- Aggregate events over a `userId` based session window with `1 minute` session gap.
FROM PurchaseStream WINDOW SESSION(1 min, userId)
GROUP BY userId;
-- Output when events are added to the session.

@info(name = 'Session-analysis-with-late-event-arrivals')
-- Calculate count and sum of `price` per `userId` during the session.
INSERT INTO UserIdPurchaseStream
SELECT userId,
       count() AS totalItems,
       sum(price) AS totalPrice
-- Aggregate events over a `userId` based session window with `1 minute` session gap,
-- and `20 seconds` of allowed latency to capture late event arrivals.
FROM PurchaseStream WINDOW SESSION(1 min, userId, 20 sec)
GROUP BY userId;
-- Output when events are added to the session.
```

### Session Aggregation Behavior

When events are sent to `PurchaseStream`, the following events are emitted at `UserIdPurchaseStream` via the `Session-analysis` query, and `OutOfOrderUserIdPurchaseStream` via the `Session-analysis-with-late-event-arrivals` query.

| Time |Event Timestamp | Input to `PurchaseStream` | Output at `UserIdPurchaseStream` | Output at `OutOfOrderUserIdPurchaseStream` |
|---|---|---|---|---|
| 9:00:00 | 9:00:00 | [`'1001'`, `'cake'`, `18.0`]        | [`'1001'`, `1`, `18.0`]  | [`'1001'`, `1`, `18.0`]|
| 9:00:20 | 9:00:20 | [`'1002'`, `'croissant'`, `23.0`]   | [`'1002'`, `1`, `23.0`]  | [`'1002'`, `1`, `23.0`] |
| 9:00:40 | 9:00:40 | [`'1002'`, `'cake'`, `22.0`]        | [`'1002'`, `2`, `45.0`]  | [`'1002'`, `2`, `45.0`]  |
| 9:01:05 | **9:00:50** | [`'1001'`, `'pie'`, `22.0`]         |  No events, as event arrived late, and did not fall into a session.|[`'1001'`, `2`, `40.0`] |
| 9:01:10 | 9:01:10 | [`'1001'`, `'cake'`, `10.0`]        | [`'1001'`, `1`, `10.0`]  | [`'1001'`, `3`, `50.0`]|
| 9:01:50 | 9:01:50 | [`'1002'`, `'cake'`, `20.0`]        | [`'1002'`, `1`, `20.0`]  | [`'1002'`, `1`, `23.0`] |
| 9:02:40 | 9:02:40 | [`'1001'`, `'croissant'`, `23.0`]   | [`'1001'`, `1`, `23.0`]  | [`'1001'`, `1`, `23.0`] |

