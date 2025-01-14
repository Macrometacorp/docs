---
title: FIRST
---

This is a window that holds only the first set of unique events according to the unique key parameter. When a new event arrives with a key that is already in the window, that event is not processed by the window.

## Syntax

```sql
    WINDOW UNIQUE:FIRST(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key)
    WINDOW UNIQUE:FIRST(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG|FLOAT|BOOL|DOUBLE|STRING> ...)
```

## Query Parameters

| Name       | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------------|-------------------|---------------|-------------------|----------|---------|
| unique.key | The attribute that should be checked for uniqueness. If there is more than one parameter to check for uniqueness, it can be specified as an array separated by commas. | | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |

## Example 1

```sql
    CREATE STREAM LoginEvents (timeStamp long, ip string);

    INSERT INTO UniqueIps 
    FROM LoginEvents WINDOW UNIQUE:FIRST(ip);
```

This returns the first set of unique items that arrive from the `LoginEvents` stream, and returns them to the `UniqueIps` stream. The unique events are only those with a unique value for the `ip` attribute.
