---
sidebar_position: 10
title: Getting Started with Redis
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to start using Redis in Macrometa.

1. [Create a Redis Mode collection](../../database/collections/redis-mode/index.md).
2. Choose how to interact:
    - SDKs
    - API

You can access all the familiar Redis commands using the Macrometa SDK or API.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

- Step 1. [Install the SDK](../../developer-hub/sdks/install-sdks.md).
- Step 2. Create an instance of the C8Client
- Step 3. Access Redis commands `client.redis.<Redis command>`.

```py
from c8 import C8Client

# Create a connection to GDN
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
                        email='nemo@nautilus.com', password='xxxxx',
                        geofabric='_system')

# String data type example
# Set string
client.redis.set("test", "1", REDIS_COLLECTION)
# Get string
response = client.redis.get("test", REDIS_COLLECTION)
# Response from platform
print(response)

# Sorted set data type example
# Add sorted set
client.redis.zadd("testZadd", [1, "test"], REDIS_COLLECTION)
# Return range of elements
response = client.redis.zrange("testZadd", 0, 1, REDIS_COLLECTION)
# Response from platform
print(response)

# List data type example
list_data = ["iron", "gold", "copper"]
client.redis.lpush("list", list_data, REDIS_COLLECTION)
# Return range of list elements
response = client.redis.lrange("list", 0, 1, REDIS_COLLECTION)
# Response from platform
print(response)

# Hash data type example
# Set hash
client.redis.hset(
        "games",
        {"action": "elden", "driving": "GT7"},
        REDIS_COLLECTION
    )
# Get hash
response = client.redis.hget("games", "action", REDIS_COLLECTION)
# Response from platform
print(response)

# Sets data type example
client.redis.sadd("animals", ["dog"], REDIS_COLLECTION)
# Pop sets data
response = client.redis.spop("animals", 1, REDIS_COLLECTION)
# Response from platform
print(response)
```

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages:

- [RedisPost](https://www.macrometa.com/docs/api#/operations/RedisPost)
- [RedisGet](https://www.macrometa.com/docs/api#/operations/RedisGet)

</TabItem>
</Tabs>
