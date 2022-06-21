---
title: and (Aggregate Function)
---

Returns the results of AND operation for all the events.

Syntax

```js
    <BOOL> and(<BOOL> arg)
```

QUERY PARAMETERS

| Name | Description                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------|---------------|---------------------|----------|---------|
| arg  | The value that needs to be AND operation. |               | BOOL                | No       | Yes     |

## Example 1

```js
    insert into alertStream
    select and(isFraud) as isFraudTransaction
    from cscStream WINDOW TUMBLING_LENGTH(10);
```

This will returns the result for AND operation of isFraud values as a boolean value for event chunk expiration by window length batch.