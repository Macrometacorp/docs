---
title: Cache
---

The `cache` function provides a persistent cache per tenant.

## Features

The following functions are allowed:

- `cache:get("key")`          - gets a value per given key
- `cache:put("key", "value")` - puts "key", "value"
- `cache:count()`             - counts the size of the cache
- `cache:delete("key")`       - deletes a cache for a given key
- `cache:purge()`             - invalidates/purges the current cache

## Syntax

Cache uses the following syntax:

```js
cache:put("my_key", "my_value");

cache:get("my_key")
```

## Example

```js
CREATE TRIGGER EventsPutTrigger WITH (interval=1 sec);

CREATE TRIGGER EventsGetTrigger WITH (interval=5 sec);

CREATE TABLE GLOBAL put_in_cache(value_is_put string);

CREATE TABLE GLOBAL get_from_cache(value string);

INSERT INTO put_in_cache 
SELECT cache:put("my_key", "my_value") as value_is_put 
FROM EventsPutTrigger;

INSERT INTO get_from_cache
SELECT cache:get("my_key") as value
FROM EventsGetTrigger;
```

Following document is saved every second in `put_in_cache`.

        {"value_is_put": "true"}
        
		
Following document is saved every five seconds in `get_from_cache`.
    
        {"value": "my_value"}
