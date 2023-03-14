---
sidebar_position: 30
title: Redis Data Formats
---

Redis Mode collections require data to be stored in certain formats in order to be compatible with Redis.

If you add items to the collection using the Redis API, then the format is enforced automatically. However, if you add items through other APIs, then you must ensure that data respects the following formats according to type.

## View Data in Redis Mode Collection

After collection is created developers can use Redis interface with API call or SDK.
While working with the API or SDK you will need to send Redis collection name as a parameter.

Developers have option to check how data is structured.

To view your data:

1. Log in to your Macrometa account.
2. Click **Collections**.
3. Select your [Redis Mode collection](../../collections/redis-mode/index.md).

   Data is displayed on the Data tab of the collection.

## Data Formats

:::note
The use of `key` instead of `_key` is intentional. Each document also has an auto-generated `_key` that is not part of the Redis data.

Each document also has the optional attribute `expireDate`, not shown in the entries below.
:::

### String

Syntax:

```json
{key: ..., value: ..., data_type: "string"}
```

When you use string commands such as **SET**, **APPEND**, and so on, data in the platform will be represented in format:

```js
{
    "data_type": "string",
    "expireDate": null,
    "key": "fooString",
    "value": "testValue"
}
```

`expiryDate` is an optional parameter.

### Hash

Syntax:

There can be multiple entries per hash.

```json
{key: ..., value: ..., hvalue: ..., data_type: "hash"}
```

When you use hash commands such as **HSET**, **HINCRBY**, and so on, data in the platform will be represented in format:

```js
{
    "data_type": "hash",
    "hvalue": "elden",
    "key": "fooHash",
    "value": "action"
}
```

If we use Redis **HSET** command:

`HSET games action "elden" driving "GT7"`

Data in Redis collection will look like:

```js
[
	{
		"data_type": "hash",
		"hvalue": "elden",
		"key": "fooHash",
		"value": "action"
	},
	{
		"data_type": "hash",
		"hvalue": "GT7",
		"key": "fooHash",
		"value": "driving"
	}
]
```

### List

Syntax:

```json
{key: ..., list: [...], data_type: "list"}
```

When you use list commands such as **LPUSH**, **LSET**, and so on, data in the platform will be represented in format:

```js
{
    "data_type": "list",
    "key": "fooList",
    "list": [
        "copper",
        "gold",
        "iron"
    ]
}
```

### SET

Syntax:

There can be multiple entries per set.

```json
{key: ..., value: ..., data_type: "set"}
```

When you use set commands such as **SADD**, **SMOVE**, and so on, data in the platform will be represented in format:

```js
{
    "data_type": "set",
    "key": "animals",
    "value": "dog"
}
```

If we use Redis **SADD** command:

`SADD animals "dog" "cat"`

Data in Redis collection will look like:

```js
[
	{
		"data_type": "set",
		"key": "animals",
		"value": "dog"
	},
	{
		"data_type": "set",
		"key": "animals",
		"value": "cat"
	}
]
```

### Sorted Set

Syntax:

There can be multiple entries per sorted set.

```json
{key: ..., value: ..., score: <number>, data_type: "zset"}
```

When you use set commands such as **ZADD**, **SMOVE**, and so on, data in the platform will be represented in format:

```js
{
    "data_type": "zset",
    "key": "animalsSortedSet",
    "score": 1,
    "value": "dog"
}
```

If we use Redis **ZADD** command:

`ZADD animals 1 "dog" 2 "cat"`

Data in Redis collection will look like:

```js
[
	{
		"data_type": "zset",
		"key": "animalsSortedSet",
		"score": 1,
		"value": "dog"
	},
	{
		"data_type": "zset",
		"key": "animalsSortedSet",
		"score": 2,
		"value": "cat"
	}
]
```