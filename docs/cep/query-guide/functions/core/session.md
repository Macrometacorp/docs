---
title: session (Window)
---

Holds events that belong to a session. Events belong to a specific session are identified by a session key, and a session gap is determines the time period after which the session is considered to be expired. To have meaningful aggregation on session windows, the events need to be aggregated based on session key via a `group by` clause.

Syntax

    session(<INT|LONG|TIME> session.gap)
    session(<INT|LONG|TIME> session.gap, <STRING> session.key)
    session(<INT|LONG|TIME> session.gap, <STRING> session.key, <INT|LONG|TIME> allowed.latency)

## Query Parameters

| Name            | Description                                                                                                                                                                                 | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| session.gap     | The time period after which the session is considered to be expired.                                                                                                                        |               | INT LONG TIME       | No       | No      |
| session.key     | The session identification attribute. Used to group events belonging to a specific session.                                                                                                 | default-key   | STRING              | Yes      | Yes     |
| allowed.latency | The time period for which the session window is valid after the expiration of the session, to accept late event arrivals. This time period should be less than the `session.gap` parameter. | 0             | INT LONG TIME       | Yes      | No      |

## Example 1

    CREATE STREAM PurchaseEventStream (user string, item_number int, price float, quantity int);

    @info(name='query1)
    insert into OutputStream
    select user, sum(quantity) as totalQuantity, sum(price) as totalPrice
    from PurchaseEventStream WINDOW SESSION(5 sec, user)
    group by user;

From the events arriving at the PurchaseEventStream, a session window with 5 seconds session gap is processed based on `user` attribute as the session group identification key. All events falling into the same session are aggregated based on `user` attribute, and outputted to the OutputStream.

## Example 2

    CREATE STREAM PurchaseEventStream (user string, item_number int, price float, quantity int);

    @info(name='query2)
    insert into OutputStream
    select user, sum(quantity) as totalQuantity, sum(price) as totalPrice
    from PurchaseEventStream WINDOW SESSION(5 sec, user, 2 sec)
    group by user;

From the events arriving at the PurchaseEventStream, a session window with 5 seconds session gap is processed based on `user` attribute as the session group identification key. This session window is kept active for 2 seconds after the session expiration to capture late (out of order) event arrivals. If the event timestamp falls in to the last session the session is reactivated. Then all events falling into the same session are aggregated based on `user` attribute, and outputted to the OutputStream.
