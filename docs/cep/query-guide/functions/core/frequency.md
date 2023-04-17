---
title: frequency (Aggregate Function)
---

Counts the number of occurrences of different values of a given attribute without needing to use `GROUP BY {attribute}`.

## Syntax

    <LONG> frequency(<STRING> arg)

## Query Parameters

| Name | Description                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value that needs frequency calculation. |               | STRING | No       | Yes     |

## Example

```js
INSERT INTO HeartbeatSecAggPerStream
SELECT contentId AS identifier, frequency(contentId) AS count
FROM TumblingWindow;
```

This returns the frequency of all the events with given attribute.
