---
title: containsValue (Function)
---

Function checks if the map contains the value.

## Syntax

```sql
<BOOL> map:containsValue(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------|---------------|---------------------|----------|---------|
| map   | The map the needs to be checked on containing the value or not. |               | OBJECT  | No     | Yes     |
| value | The value to be checked.    |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

```sql
map:containsValue(stockDetails, 'IBM')
```

This function checks if the `stockDetails` map contains the value 'IBM'. If 'IBM' is found as a value in any of the key-value pairs within the map, the function returns `true`, otherwise, it returns `false`.

## Example 2

```sql
CREATE STREAM InputMapStream (id string, stockDetails object);
CREATE SINK STREAM OutputValuePresenceStream (id string, valuePresence bool);

@info(name = 'ValuePresenceCheck')
INSERT INTO OutputValuePresenceStream
SELECT id, map:containsValue(stockDetails, 'IBM') AS valuePresence
FROM InputMapStream;
```

In this example, a stream worker named `ValuePresenceCheck` is created. The stream `InputMapStream` is defined to provide input to the query, which includes an identifier (`id`) and a map (`stockDetails`). A sink stream, `OutputValuePresenceStream`, is defined to collect the output, which includes the identifier and a boolean value indicating the presence of a specific value in the map.

The query processes each event from `InputMapStream`, using the `map:containsValue(stockDetails, 'IBM')` function to check if the `stockDetails` map in the event contains the value 'IBM'. The resulting boolean value, along with the identifier, is then inserted into `OutputValuePresenceStream`. This setup allows for real-time checking of value presence in maps within a data stream.
