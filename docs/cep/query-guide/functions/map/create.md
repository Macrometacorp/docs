---
title: create (Function)
---

Function creates a map pairing the keys and their corresponding values.

## Syntax

```sql
<OBJECT> map:create()
<OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1)
<OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> ...)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types  | Optional | Dynamic |
|--------|-------------|---------------|----------------------|----------|---------|
| key1   | Key 1       | -      | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |
| value1 | Value 1     | -      | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

## Example 1

```sql
map:create(1, 'one', 2, 'two', 3, 'three')
```

In this example, the `map:create(1, 'one', 2, 'two', 3, 'three')` function is used to create a new map. The function takes an even number of arguments where each pair of arguments represents a key-value pair. Here, the keys `1`, `2`, and `3` are mapped to their corresponding values, `one`, `two`, and `three`. This results in a map `{1='one', 2='two', 3='three'}`.

## Example 2

```sql
map:create()
```

In this example, the `map:create()` function is used without any arguments. This results in the creation of an empty map `{}`.

## Example 3

```sql
CREATE STREAM InputDataStream (id string, keyValuePairs string);
CREATE SINK STREAM OutputMapStream (id string, mappedData map<string, string>);

@info(name = 'MapCreation')
INSERT INTO OutputMapStream
SELECT id, str:tokenize(keyValuePairs, ',') AS tokenizedPairs 
FROM InputDataStream#window.length(1)#map:create(tokenizedPairs);
```

In this example, a stream worker named `MapCreation` is created. The stream `InputDataStream` is defined to provide input to the query, which includes an identifier (`id`) and a string of key-value pairs (`keyValuePairs`). A sink stream, `OutputMapStream`, is defined to collect the output, which includes the identifier and a newly created map (`mappedData`).

The query processes each event from `InputDataStream`. First, it tokenizes the `keyValuePairs` string using the `str:tokenize(keyValuePairs, ',')` function, splitting the string into individual tokens (key-value pairs) based on the comma separator. Then, it uses the `map:create(tokenizedPairs)` function to create a new map from the tokenized key-value pairs.

The resulting map, along with the identifier, is then inserted into `OutputMapStream`. This setup allows for real-time creation of maps from key-value pair strings within a data stream.
