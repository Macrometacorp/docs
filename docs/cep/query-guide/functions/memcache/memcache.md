---
title: Memcache
---

The `memcache` function provides a memory cache per stream worker. If it has replicas (`@Instances("N")`), then this cache is per all instances of the stream worker. It is similar to [cache](../cache/), but this function has a time-to-live (ttl) parameter.

## Features

The following functions are allowed:

- `memcache:get("key")`       - gets a value per given key
- `memcache:put("key", "value")` - puts "key" and "value", returns a value that saves into a cache
- `memcache:put("key", "value", ttl)` - puts "key" and "value" with ttl, returns a value that saves into a cache. ttl is set by default 5000L (5 seconds)

## Syntax

Memcache uses the following syntax:

```sql
memcache:get(<String> key) 
memcache:put(<String> key, <String> value, <Long> ttl)
```

## Example

```sql
– Event triggers
CREATE TRIGGER EventsPutTrigger WITH (interval=1 sec);

CREATE TRIGGER EventsGetTrigger WITH (interval=5 sec);

– Event stores
CREATE TABLE put_in_cache(value_is_put string);

CREATE TABLE get_from_cache(value string);

@info(name = 'put-query')
INSERT INTO put_in_cache
SELECT memcache:put("my key", "my value", 10000L) as value_is_put
FROM EventsPutTrigger;

@info(name = 'get-query')
INSERT INTO get_from_cache
SELECT memcache:get("my key") as value
FROM EventsGetTrigger;
```

Following document is saved every second in `put_in_cache` with a 10-second ttl.

```sql
        {"value_is_put": "true"}
```  
		
Following document is saved every five seconds in `get_from_cache`.

```sql
        {"value": "my_value"}
```
