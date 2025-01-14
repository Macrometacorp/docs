---
title: and (Aggregate Function)
---

Returns the results of `AND` operation for all the events.

## Syntax

```sql
<BOOL> and(<BOOL> arg)
```

## Query Parameters

| Name | Description            | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------|---------------|---------------------|----------|---------|
| arg  | The value that needs to be `AND` operation. |         | BOOL        | No      | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO alertStream
SELECT and(isFraud) AS isFraudTransaction
FROM cscStream WINDOW TUMBLING_LENGTH(10);
```

This query processes records from the `cscStream` using a tumbling window of length 10. For each window, it aggregates the `isFraud` values using the `and` function, which returns true if all `isFraud` values are true within the window. The result is aliased as `isFraudTransaction` and inserted into the `alertStream`.

Essentially, this query detects windows of 10 consecutive records where all transactions are marked as fraudulent and inserts the aggregated result into the `alertStream`.
