---
title: or (Aggregate Function)
---

Returns the results of OR operation for all the events.

## Syntax

```sql
<BOOL> OR(<BOOL> arg)
```

## Query Parameters

| Name | Description        | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------|---------------|---------------------|----------|---------|
| arg  | The value that needs to be OR operation. |             | BOOL         | No       | Yes     |

## Example

```sql
@info(name = 'query1')
INSERT INTO alertStream
SELECT OR(isFraud) AS isFraudTransaction
FROM cscStream WINDOW TUMBLING_LENGTH(10);
```

This query, named 'query1', processes records from the `cscStream` in tumbling windows of length 10. It calculates the logical OR of the `isFraud` field using the `OR(isFraud)` function. If at least one record in the window has `isFraud` set to true, then the resulting `isFraudTransaction` will be true. The calculated `isFraudTransaction` value is then inserted into the `alertStream`.

Essentially, this query identifies if there's any fraudulent transaction within a window of 10 records in the `cscStream`, and then creates new records in the `alertStream` with the `isFraudTransaction` field.
