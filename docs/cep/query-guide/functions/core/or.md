---
title: or (Aggregate Function)
---

Returns the results of OR operation for all the events.

## Syntax

```sql
<BOOL> or(<BOOL> arg)
```

## Query Parameters

| Name | Description                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------|---------------|---------------------|----------|---------|
| arg  | The value that needs to be OR operation. |               | BOOL                | No       | Yes     |

## Example

```sql
insert into alertStream
select or(isFraud) as isFraudTransaction
from cscStream WINDOW TUMBLING_LENGTH(10);
```

This returns the result for OR operation of `isFraud` values as a boolean value for event chunk expiration by window length batch.
