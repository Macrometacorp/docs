---
title: containsKey (Function)
---

Function checks if the map contains the key.

## Syntax

```sql
<BOOL> map:containsKey(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| map  | The map the needs to be checked on containing the key or not. |               | OBJECT  | No   | Yes   |
| key | The key to be checked. |          | INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes  |

## Example 1

```sql
map:containsKey(stockDetails, '1234')
```

The `map:containsKey(stockDetails, '1234')` function checks whether the `stockDetails` map contains a specific key, which is `'1234'` in this case. If the key is present in the map, the function returns `true`, otherwise, it returns `false`. This allows for efficient verification of key presence in a map without the need to traverse or inspect the entire map.

## Example 2

```sql
CREATE STREAM InputMapStream (id string, stockDetails map<string, double>);
CREATE SINK STREAM OutputKeyPresenceStream (id string, keyPresence bool);

@info(name = 'KeyPresenceCheck')
INSERT INTO OutputKeyPresenceStream
SELECT id, map:containsKey(stockDetails, '1234')
FROM InputMapStream;
```

In this stream worker named `KeyPresenceCheck`, `InputMapStream` is created to provide input to the query, which includes an identifier (`id`) and a map (`stockDetails`). A sink stream, `OutputKeyPresenceStream`, is created to collect the output, which includes the identifier and a boolean value indicating the presence of a specific key in the map.

The query processes events from `InputMapStream`, using the `map:containsKey(stockDetails, '1234')` function to check whether the `stockDetails` map in each event contains the key `'1234'`. The resulting boolean value, along with the identifier, is then inserted into `OutputKeyPresenceStream`. This approach provides real-time checking of key presence in maps within a data stream.
