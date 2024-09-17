---
title: Key-Value Store Commands
---

# Key-Value (gdnsl kv)

Commands to work with key-value collections.

```bash
gdnsl kv [flags]
```

**Examples:**

```bash

  # Help for KV command group
  gdnsl kv -h

```

**Options:**

```bash
  -h, --help                Help to manage KV collections.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl kv create

Create a Key Value collection.

```bash
gdnsl kv create [flags] NAME
```

**Examples:**

```bash

  # Create a global KV collection
  gdnsl kv create cities

  # Create a global KV collection with ttl
  gdnsl kv create cities --ttl 

  # Create a global KV collection with stream enabled
  gdnsl kv create cities --stream 

  # Create a global KV collection with both TTL and Stream enabled
  gdnsl kv create cities --ttl --stream 

```

**Options:**

```bash
  -h, --help                Help to create a Key Value collection.
      --ttl                 Enable TTL on the collection. Default is false.
      --stream              Enable stream on the collection. Default is false.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl kv list

List Key Value collections.

```bash
gdnsl kv list
```

**Examples:**

```bash

  # List all KV collections
  gdnsl kv list
  
```

**Options:**

```bash
  -h, --help                Help to list a Key Value collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl kv delete

Delete a Key Value collection.

```bash
gdnsl kv delete [flags] NAME
```

**Examples:**

```bash

  # Delete cities KV collection
  gdnsl kv delete cities

  # Delete key1, key2 entries from cities KV collection
  gdnsl kv delete cities --keyarray "k1, k2" 

  # Delete key1 from cities KV collection
  gdnsl kv delete cities --key k1 

  # Delete all entries from cities KV collection
  gdnsl kv delete cities --truncate

```

**Options:**

```bash
  -h, --help                Help to delete a Key Value collection.
      --keyarray  stringa   Delete entries for all given keys from KV collection.
      --key string          Delete entry for given key from KV collection.
      --truncate            Delete all entries from KV collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl kv get

Get keys, values or count from a Key Value collection.

```bash
gdnsl kv get [flags] NAME
```

**Examples:**

```bash

  # Get number of entries in cities collection
  gdnsl kv get cities --count 

  # Get all keys in cities collection
  gdnsl kv get cities --keys 

  # Get keys in cities collection
  gdnsl kv get cities --keys --offset 0 --limit 50 --order asc 

  # Get all values in cities collection
  gdnsl kv get cities --values 

  # Get keys in cities collection
  gdnsl kv get cities --values --offset 0 --limit 50 --order asc cities --keys 

  # Get keys in cities collection
  gdnsl kv get cities --values --keyarray "key1, key2, key3" 

  # Get value for key1 in cities collection
  gdnsl kv get cities --key key1

```

**Options:**

```bash
  -h, --help                Help to get a Key Value collection.
      --count               Number of entries in the KV collection.
      --keys                Get all keys in the KV collection.
      --values              Get all values in the KV collection.
      --offset int          Default value 0.
      --limit int           Default value 20. Max 10000. 
      --order string        "asc" or "desc". Default value asc. 
      --keyarray string     List of comma separated keys.
      --key string          Get value for a given key in the KV collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl kv set

Set values or KV pair in a Key Value collection.

```bash
gdnsl kv set [flags] NAME
```

**Examples:**

```bash

  # Add k1:v1 entry to cities collection with TTL (unix timestamp in seconds)
  gdnsl kv set cities --key k1 --value v1 --ttl 1671658506

  # Add k1:v1 entry to cities collection with no expiration
  gdnsl kv set cities --key k1 --value v1

  # Add [k1:v1, k2:v2, k3:v3] entries to cities collection
  gdnsl kv set cities --kv "k1:v1" --kv "k2:v2" --kv "k3:v3" 

  # Add [k1:v1, k2:v2, k3:v3] entries to cities collection with TTL
  gdnsl kv set cities --kv "k1:v1:1671658506" --kv "k2:v2:1645479306", --kv "k3:v3:-1" 

```

**Options:**

```bash
  -h, --help            Help to set kv in a collection.
      --key string      Key for the kv entry.
      --value string    Value for the kv entry.
      --kv array        Key value tuples for the KV collection.
      --fabric          Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```
