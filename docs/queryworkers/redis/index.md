---
sidebar_position: 1
title: Redis in Macrometa
---

The data store that Macrometa provides is compatible with almost all Redis API use cases.

:::note
This is a beta feature.
:::

## Capabilities

Because of its fast performance, Redis is a popular choice for:

- caching
- session management
- gaming
- leaderboards
- real-time analytics
- geospatial apps
- ride-hailing apps
- chat/messaging apps
- media streaming apps
- pub/sub apps

## Supported Commands

Macrometa supports Redis client protocol up to version 6.2. Following table shows the list of supported Redis commands:

| Feature      | Supported | Supported commands     |
| :---        |    :----:   |          :--- |
| String      | Yes       | - APPEND - DECR - DECRBY - GET - GETDEL - GETEX - GETRANGE - GETSET - INCR - INCRBY - INCRBYFLOAT - MGET - MSET - MSETNX - PSETEX - SET - SETBIT - SETEX - SETNX - SETRANGE - STRLEN - BITCOUNT - BITOP - BITPOS - GETBIT   |
| Hash   | Yes        | - HDEL - HEXISTS - HGET - HGETALL - HINCRBY - HINCRBYFLOAT - HKEYS - HLEN - HMGET - HMSET - HSCAN - HSET - HSETNX - HSTRLEN - HRANDFIELD - HVALS      |
| List   | Yes        | - LINDEX - LINSERT - LLEN - LMOVE - LPOP - LPOS - LPUSH - LPUSHX - LRANGE - LREM - LSET - LTRIM - RPOP - RPOPLPUSH - RPUSH - RPUSHX      |
| Set   | Yes        | - SADD - SCARD - SDIFF - SDIFFSTORE - SINTER - SINTERSTORE - SISMEMBER - SMEMBERS - SMISMEMBER - SMOVE - SPOP - SRANDMEMBER - SREM - SSCAN - SUNION - SUNIONSTORE      |
| SortedSet   | Yes        | - ZADD - ZCARD - ZCOUNT - ZDIFF - ZDIFFSTORE - ZINCRBY - ZINTER - ZINTERSTORE - ZLEXCOUNT - ZMSCORE - ZPOPMAX - ZPOPMIN - ZRANDMEMBER - ZRANGE - ZRANGEBYLEX - ZRANGEBYSCORE - ZRANGESTORE - ZRANK - ZREM - ZREMRANGEBYLEX - ZREMRANGEBYRANK - ZREMRANGEBYSCORE - ZREVRANGE - ZREVRANGEBYLEX - ZREVRANGEBYSCORE - ZREVRANK - ZSCAN - ZSCORE - ZUNION - ZUNIONSTORE      |
| Generic   | Yes        | - COPY - DEL - EXISTS - EXPIRE - EXPIREAT - PERSIST - PEXPIRE - PEXPIREAT - PTTL - RANDOMKEY - RENAME - RENAMENX - SCAN - TTL - TYPE - UNLINK      |
| Server   | Yes        | - ECHO - PING - PIPELINE - DBSIZE - FLUSHDB - TIME      |

## Limitations

Our platform has limitation on certan commands. Commands that are mentioned below return different result in some edge cases.

- [**SETRANGE**](#setrange)
- [**SINTERSTORE**](#sinterstore)

### SETRANGE

SETRANGE returns different value than redis server when offset of the command is greater than the length of string value.

First we set string value that has key `foo`.

```js
[
  "SET",
  "foo",
  "Macrometa GDN"
]
```

When we use **SETRANGE** on that same key with index that is greater than 13 the result will be different that redis server.

```js
[
  "SETRANGE",
  "foo_21",
  18,
  "Global Data Network"
]
```

Response of Macrometa platform:

```js
{
  "code": 200,
  "result": 32
}
```

Response from Redis server:
`(integer) 37`

### SINTERSTORE

SINTERSTORE gives the wrong value when an existing key is given as the destination.


We will add three different keys with SADD:

```js
[
  "SADD",
  "key_1",
  "a",
  "b",
  "c",
  "d"
]
```

```js
[
  "SADD",
  "key_2",
  "c"
]
```

```js
[
  "SADD",
  "key_3",
  "a",
  "c",
  "e"
]
```
With SINTERSTORE, we will try to store the set in an existing key:


```js
[
  "SINTERSTORE",
  "key_2",
  "key_1",
  "key_2",
  "key_3"
]
```

Result will be:

```js
{
  "code": 200,
  "result": 0
}
```

Response from Redis server:
`(integer) 1`

:::note
For Redis SET and SORTED SET datatype commands, using the same keys for the command gives a syntax error.

For Redis MSET and HMSET commands, using same keys for the command will give an invalid command args error.
:::


:::
