---
title: Collections Commands
---

# Collections (gdnsl collection)

Commands to work with document and edge collections.

```bash
gdnsl collection [flags]
```

**Examples:**

```bash

  # Help for collection command group
  gdnsl collection -h
```

**Options:**

```bash
  -h, --help                Help for collections.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl collection create

Create a document or edge collection.

```bash
gdnsl collection create [flags] NAME
```

**Examples:**

```bash

  # Create a global cities document collection
  gdnsl collection create cities --type doc 

  # Create a global cities edge collection
  gdnsl collection create cities --type edge 

  # Create a global cities document collection and enable collection stream
  gdnsl collection create cities --type doc --stream 


  # Create a local cities document collection and enable collection stream
  gdnsl collection create cities --type doc --stream --local 

  # Create a global cities document collection with custom key generator
  gdnsl collection create cities --type doc --keygen traditional --userkeys 

```

**Options:**

```bash
  -h, --help                Help for service.
      --type string         Specifies type of the collection. Values - "doc" or "edge". Default - "doc".
      --stream              Enable stream on the collection. Default - false
      --local               Specifies whether it is a local collection.
      --userkeys            Allow users to specify their own keys.
      --keygen              The keygenerator to use by GDN. Values - traditional, autoincrement, uuid and padded
                            traditional -  This key generator generates numerical keys in ascending order
                            autoincrement- This key generator generates numerical keys in ascending order, the initial offset and the spacing can be configured
                            uuid - This key generator generates universally unique 128 bit keys, which are stored in hexadecimal human-readable format. The keys are not lexicographically sorted.
                            padded - This key generator generates keys of a fixed length (16 bytes) in ascending lexicographical sort order.
      --keyincrement int    Increment value for autoincrement key generator. Not used for other key generator types.
      --keyoffset int       Initial offset value for autoincrement key generator. Not used for other key generator types.
      --system              Specifies whether it is a system collection. Only mm admins can create system collections.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file. (default is ./gdnsl.yaml)
```

## gdnsl collection list

List collections.

```bash
gdnsl collection list [flags]
```

**Examples:**

```bash

  # List all collections except system collections
  gdnsl collection list

```

**Options:**

```bash
  -h, --help                Help to list collections.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl collection delete

Delete a document or edge collection.

```bash
gdnsl collection delete [flags] NAME
```

**Examples:**

```bash

  # Delete a cities document collection
  gdnsl collection delete cities

  # Delete a cities edge collection
  gdnsl collection delete cities

  # Delete a cities edge collection which is a system collection
  gdnsl collection delete _cities --system 

  # Remove all documents from cities collection but leave the indexes intact
  gdnsl collection delete cities --truncate 

```

**Options:**

```
  -h, --help                Help for service.
      --truncate            Remove all documents from the collection but leave the indexes intact.
      --system              Specifies whether it is a system collection. Only mm admins can create system collections.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl collection describe

Get details of a collection.

```bash
gdnsl collection describe [flags] NAME
```

**Examples:**

```bash

  # Get details of cities collection
  gdnsl collection describe cities

  # Count documents in cities collection
  gdnsl collection describe cities --count 

```

**Options:**

```bash
  -h, --help                Help for service.
      --count               To return number of documents in the collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl collection update

Update a collection.

```bash
gdnsl collection update [flags] NAME
```

**Examples:**

```bash

	# Enable stream on collection cities
	gdnsl collection update cities --stream 

	# Disable stream on collection cities
	gdnsl collection update cities --no-stream

	# Enable waitForSync on collection cities
	gdnsl collection update cities --wait-for-sync 

	# Disable waitForSync on collection cities
	gdnsl collection update cities --no-wait-for-sync

	# Enable stream and waitForSync on collection cities
	gdnsl collection update cities --stream --wait-for-sync 

	# Disable stream and waitForSync on collection cities
	gdnsl collection update cities --no-stream  --no-wait-for-sync

```

**Options:**

```bash
  -h, --help                  Help to update a collection.
      --stream                Enable stream on the collection.
      --no-stream             Disable stream on the collection.
      --wait-for-sync         Enable waitForSync on the collection.
      --no-wait-for-sync      Disable waitForSync on the collection.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```
