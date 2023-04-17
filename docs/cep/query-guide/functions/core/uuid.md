---
title: UUID (Function)
---

Generates a UUID (Universally Unique Identifier).

## Syntax

```sql
<STRING> UUID()
```

## Query Parameters

None

## Example

```sql
@info(name = 'query1')
INSERT INTO RoomTempStream
SELECT convert(roomNo, 'string') AS roomNo, temp, UUID() AS messageID
FROM TempStream;
```

This query, named 'query1', processes records from the `TempStream` and performs the following operations:

1. Converts the `roomNo` field to a string using the `convert(roomNo, 'string')` function.
2. Adds a unique `messageID` to each event using the `UUID()` function, which generates a UUID like 'a34eec40-32c2-44fe-8075-7f4fde2e2dd8'.

The resulting data, including the converted `roomNo`, the `temp`, and the generated `messageID`, is then inserted into the `RoomTempStream`.

Essentially, this query processes records from the `TempStream`, converts the room number to a string, and adds a unique message ID to each event before inserting the data into the `RoomTempStream`.
