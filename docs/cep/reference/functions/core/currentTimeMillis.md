---
title: currentTimeMillis (Function)
---

Returns the current timestamp of stream processor application in milliseconds.

Syntax

```js
    <LONG> currentTimeMillis()
```

## Example 1

```js
    insert into barStream
    select symbol as name, currentTimeMillis() as eventTimestamp
    from fooStream;
```

This extracts current stream processor application timestamp.