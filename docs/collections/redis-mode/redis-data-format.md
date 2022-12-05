---
title: Redis Data Format
sidebar_position: 50
---

Redis Mode collections require data to be stored in certain formats in order to be compatible with Redis.

If you add items to the collection using the Redis API, then the format is enforced automatically. However, if you add items through other APIs, then you must ensure that data respects the following formats according to type.

:::note
The use of `key` instead of `_key` is intentional. Each document also has an auto-generated `_key` that is not part of the Redis data.

Each document also has the optional attribute `expireDate`, not shown in the entries below.
:::

## String

```json
{key: ..., value: ..., data_type: "string"}
```

## List

```json
{key: ..., list: [...], data_type: "list"}
```

## Hash

There can be multiple entries per hash.

```json
{key: ..., value: ..., hvalue: ..., data_type: "hash"}
```

## Set

There can be multiple entries per set.

```json
{key: ..., value: ..., data_type: "set"}
```

## Sorted Set

There can be multiple entries per sorted set.

```json
{key: ..., value: ..., score: <number>, data_type: "zset"}
```
