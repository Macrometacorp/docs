---
title: count (Aggregate Function)
---

Returns the count of all the events.

## Syntax

```sql
    <LONG> count()
    <LONG> count(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|-----------------------|---------------|-----------------------|----------|---------|
| arg  | This function accepts one parameter. It can belong to any one of the available types. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | Yes      | Yes     |

## Example

```sql
    insert into barStream
    select count() as count
    from fooStream WINDOW TUMBLING_TIME(10 sec);
```

This returns the count of all the events for time batch in 10 seconds.
