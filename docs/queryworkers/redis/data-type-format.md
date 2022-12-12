---
sidebar_position: 30
title: Data Type Format on Macrometa Platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

If you want to use Redis with Macrometa first step is to create collection on the platform.
How to create Redis collection you can find [here](../../collections/redis-mode/index.md).

After collection is created developers can use Redis interface with API call or SDK.
While working with the API or SDK you will need to send Redis collection name as a parameter.

Developers have option to check how data is structured.
1. Log in to your Macrometa account.
2. Go to the tab **Data** than select **Collections**.
3. Select Redis collection

## STRING data type representation
When you use string commands such as **SET**, **APPEND** etc. data in the platform will be represented in format:

```js
{
    "data_type": "string",
    "expireDate": null,
    "key": "fooString",
    "value": "testValue"
}
```
`expiryDate` is optional parameter.

## HASH data type representation
When you use hash commands such as **HSET**, **HINCRBY** etc. data in the platform will be represented in format:

```js
{
    "data_type": "hash",
    "hvalue": "elden",
    "key": "fooHash",
    "value": "action"
}
```

Keep in mind that we will have multiple entries per hash.
If we use Redis **HSET** command:
- `HSET games action "elden" driving "GT7"`

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

## LIST data type representation
When you use list commands such as **LPUSH**, **LSET** etc. data in the platform will be represented in format:

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

## SET data type representation
When you use set commands such as **SADD**, **SMOVE** etc. data in the platform will be represented in format:

```js
{
    "data_type": "set",
    "key": "animals",
    "value": "dog"
}
```

Keep in mind that we will have multiple entries per set.
If we use Redis **SADD** command:
- `SADD animals "dog" "cat"`

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

## SORTED SET data type representation
When you use set commands such as **ZADD**, **SMOVE** etc. data in the platform will be represented in format:

```js
{
    "data_type": "zset",
    "key": "animalsSortedSet",
    "score": 1,
    "value": "dog"
}
```

Keep in mind that we will have multiple entries per set.
If we use Redis **ZADD** command:
- `ZADD animals 1 "dog" 2 "cat"`

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

## Working with Redis collection
On Redis collection you can preform other operations such as writing complex queries, generating API endpoints, Query workers etc. using platform console, API call or SDK.

Examples for writing queries:

<Tabs groupId="modify-single">
<TabItem value="c8ql" label="C8QL">

```js
FOR data IN redisCollection FILTER data.data_type=="zset"
RETURN data
```

</TabItem>
<TabItem value="sql" label="SQL">

```sql
SELECT * FROM test_redis_collection WHERE data_type='zset'
```

</TabItem>
</Tabs>

