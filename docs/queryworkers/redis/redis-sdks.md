---
sidebar_position: 20
title: Redis SDK Commands
---

Examples on how to use SDK.
SDK is intuitive in a sense when we create an instance of client we can access all the familiar Redis commands.
- Step 1. [Install the SDK](../../sdks/install-sdks.md).
- Step 2. Create an instance of the C8Client
- Step 3. Access Redis commands `client.redis.<Redis command>`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

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
<TabItem value="RA" label="Rest API">

Use our interactive API Reference with code generation in 18 programming languages to [create a Document Store Collection](https://macrometa.com/docs/api#/operations/handleCommandPost:CreateCollection). 

</TabItem>
</Tabs>
