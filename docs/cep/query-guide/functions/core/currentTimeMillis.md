---
title: currentTimeMillis (Function)
---

Returns the current timestamp of stream processor application in milliseconds.

## Syntax

```sql
    <LONG> currentTimeMillis()
```

## Example

```sql
    insert into barStream
    select symbol as name, currentTimeMillis() as eventTimestamp
    from fooStream;
```

This extracts current stream processor application timestamp.
