---
sidebar_position: 20
title: Redis SDK and API Commands
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can access all the familiar Redis commands using the Macrometa SDK or API.

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript">

- Step 1. [Install the SDK](../../sdks/install-sdks.md).
- Step 2. Create an instance of the jsc8
- Step 3. Access Redis commands `client.redis.<Redis command>`.

```javascript
const jsc8 = require("jsc8");
client = new jsc8({
  url: "play.paas.macrometa.io",
  apiKey: "xxxxx",
  fabricName: "_system",
});

// We need to create a Redis collection on platform using SDK, Console, or API call
const REDIS_COLLECTION = "testRedisCollection";

async function redisExample() {
    let response;
    // String data type example
    // Set string
    await client.redis.set("test", "1", REDIS_COLLECTION);
    // Get string
    response = await client.redis.get("test", REDIS_COLLECTION);
    // Response from platform
    console.log(response);

    // Sorted set data type example
    // Add sorted set
    await client.redis.zadd("testZadd", [1, "test"], REDIS_COLLECTION);
    // Return range of elements
    response = await client.redis.zrange("testZadd", 0, 1, REDIS_COLLECTION);
    // Response from platform
    console.log(response);

    // List data type example
    const listData = ["iron", "gold", "copper"];
    await client.redis.lpush("list", listData, REDIS_COLLECTION);
    // Return range of list elements
    response = await client.redis.lrange("list", 0, 1, REDIS_COLLECTION);
    // Response from platform
    console.log(response);

    // Hash data type example
    // Set hash
    await client.redis.hset(
        "games", 
        {"action": "elden", "driving": "GT7"},
        REDIS_COLLECTION
        );
    // Get hash
    response = await client.redis.hget("games", "action", REDIS_COLLECTION);
    // Response from platform
    console.log(response);
    
    // Sets data type example
    await client.redis.sadd("animals", ["dog"], REDIS_COLLECTION);
    // Pop sets data
    response = await client.redis.spop("animals", 1, REDIS_COLLECTION);
    // Response from platform
    console.log(response);
}
  
redisExample();

```

</TabItem>
<TabItem value="py" label="Python">

- Step 1. [Install the SDK](../../sdks/install-sdks.md).
- Step 2. Create an instance of the C8Client
- Step 3. Access Redis commands `client.redis.<Redis command>`.

```py
from c8 import C8Client

# Create a connection to GDN
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
                        apikey="xxxxx",
                        geofabric='_system')

# We need to create redis collection on platform using SDK, Console, or API call
REDIS_COLLECTION = "test_redis_collection"

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
