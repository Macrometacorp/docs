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

## Example 1

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT COUNT() AS count
FROM fooStream WINDOW TUMBLING_TIME(10 sec);
```

This query processes records from the `fooStream` using a tumbling time-based window of 10 seconds. For each window, it calculates the total number of records using the `COUNT()` function. The result is aliased as `count` and inserted into the `barStream`.

Essentially, this query computes the count of records within each 10-second window in the `fooStream` and inserts the resulting `count` value into the `barStream`.
