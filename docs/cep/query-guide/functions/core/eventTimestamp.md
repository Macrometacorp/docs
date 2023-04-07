---
title: eventTimestamp (Function)
---

Returns the timestamp of the processed event.

## Syntax

```sql
<LONG> eventTimestamp()
```

## Example

```sql
    insert into barStream
    select symbol as name, eventTimestamp() as eventTimestamp
    from fooStream;
```

This returns the timestamp for the current event.
