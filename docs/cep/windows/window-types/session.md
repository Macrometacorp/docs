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

@info(name='query2')
INSERT INTO OutputStream
SELECT user, sum(quantity) AS totalQuantity, sum(price) AS totalPrice
FROM PurchaseEventStream WINDOW SESSION(5 sec, user, 2 sec)
GROUP BY user;
```

From the events arriving at the PurchaseEventStream, a session window with five seconds session gap is processed based on the `user` attribute as the session group identification key. This session window is kept active for two seconds after the session expiration to capture late (out-of-order) event arrivals. If the event timestamp falls in to the last session the session is reactivated. Then all events falling into the same session are aggregated based on the `user` attribute and output to the OutputStream.
