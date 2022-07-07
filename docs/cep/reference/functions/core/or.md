---
title: or (Aggregate Function)
---

eturns the results of OR operation for all the events.

Syntax

```js
    <BOOL> or(<BOOL> arg)
```

QUERY PARAMETERS

| Name | Description                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------|---------------|---------------------|----------|---------|
| arg  | The value that needs to be OR operation. |               | BOOL                | No       | Yes     |

## Example 1

```js
    insert into alertStream
    select or(isFraud) as isFraudTransaction
    from cscStream WINDOW TUMBLING_LENGTH(10);
```

This returns the result for OR operation of isFraud values as a boolean value for event chunk expiration by window length batch.