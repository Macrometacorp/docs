---
title: Fabric Commands
---

# Fabrics (gdnsl fabric)

Get commands related to GeoFabrics.

```bash
gdnsl fabric [flags]
```

**Options:**

```bash
  -h, --help   Help for fabric.
```

## gdnsl fabric list

Get list of GeoFabrics.

```bash
gdnsl fabric list [flags]
```

**Examples:**

```bash
  # List fabrics from the server and returns an array of their names
  gdnsl fabric list

  # List all fabrics accessible to the active user from the server and returns an array of their names
  gdnsl fabric list -all

```

**Options:**

```bash
  -h, --help            Help to get list of fabrics
      --all boolean     List all fabrics accessible to the active user. ( default is false )
```

**Options inherited:**

```bash
  --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl fabric create

Create a GeoFabric.

```bash
gdnsl fabric create <geo_fabric_name> [flags]
```

**Examples:**

```bash
  # Create demo fabric in the prashant-ap-west data-center
  gdnsl fabric create demo --datacenter prashant-ap-west

  # Create demo fabric in the prashant-ap-west data-center with metadata
  gdnsl fabric create demo --datacenter prashant-ap-west --metadata "key:value"

  # Create demo fabric in the prashant-ap-west data-center with spot-datacenter
  gdnsl fabric create demo --datacenter prashant-ap-west --spot-datacenter prashant-us-east

  # Create demo fabric in the prashant-ap-west data-center with a user
  gdnsl fabric create demo --datacenter prashant-ap-west --user admin

  # Create demo fabric with two metadata objects
  gdnsl fabric create demo --metadata "key1:value1" --metadata "key2:value2"
```

**Options:**

```bash
  -h, --help                Help to create a fabric.
```

**Options inherited:**

```bash
  --config string           gdnsl config file (default is ./gdnsl.yaml)
  --datacenter string       (required) Name of a Edge Location (datacenter). ie, Edge Location URL prefixes up to the first "." character.
  --metadata string         An optional string object with user defined key-value pair Example "key:value".
  --spot-datacenter string  The Edge Location (Datacenter) where on-spot operations for the given fabric will be performed.
  --user string             Username that will have admin access to the new fabric
```

## gdnsl fabric delete

Delete a GeoFabric.

```bash
gdnsl fabric delete <geo_fabric_name> [flags]
```

**Examples:**

```bash
  # Delete demo fabric
  gdnsl fabric delete demo

```

**Options:**

```bash
  -h, --help                Help to delete a fabric.
```

**Options inherited:**

```bash
  --config string           gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl fabric update

Update GeoFabric metadata.

```bash
gdnsl fabric update <fabric-name> [flags]
```

**Examples:**

```bash
  # Update demo fabric metadata with 2 metadata objects
  gdnsl fabric update demo --metadata "key1:test1" --metadata "key2:test2"

```

**Options:**

```bash
  -h, --help                Help to create a fabric metadata.
  --metadata string         An optional string object with user defined key-value pair Example "key:value".
```

**Options inherited:**

```bash
  --config string           gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl fabric describe

Describe a GeoFabric.

```bash
gdnsl fabric describe <geo_fabric_name> [flags]
```

**Examples:**

```bash
  # Describe demo fabric
  gdnsl fabric describe demo

```

**Options:**

```bash
  -h, --help        Help to describe a fabric.
```

**Options inherited:**

```bash
  --config string   gdnsl config file (default is ./gdnsl.yaml)
```
