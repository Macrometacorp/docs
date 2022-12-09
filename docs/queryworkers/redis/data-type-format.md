---
sidebar_position: 30
title: Data Type Format on Macrometa platform
---

If you want to use Redis with Macrometa first step is to create collection on the platform.
How to create Redis collection you can find [here](../../collections/redis-mode/index.md).

After collection is created developers can use Redis interface with API call or SDK.
While working with the API or SDK you will need to send Redis collection name as a parameter.

Developers have option to check how data is structured.

To view your data:

1. Log in to your Macrometa account.
2. Click **Data > Collections**.
3. Select your [Redis Mode collection](../../collections/redis-mode/index.md).

   Data is displayed on the Data tab of the collection.

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

