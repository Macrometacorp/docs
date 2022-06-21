---
title: UUID (Function)
---

Generates a UUID (Universally Unique Identifier).

Syntax

```js
    <STRING> UUID()
```

## Example 1

```js
    insert into RoomTempStream
    select convert(roomNo, 'string') as roomNo, temp, UUID() as messageID
    from TempStream;
```

This will converts a room number to string, introducing a message ID to each event asUUID() returns `a34eec40-32c2-44fe-8075-7f4fde2e2dd8` from TempStream select convert(roomNo, `string`) as roomNo, temp, UUID() as messageID insert into RoomTempStream;
