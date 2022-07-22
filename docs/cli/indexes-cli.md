---
title: Index Commands
---

# Indexes (gdnsl index)

Commands to work with indexes.

```bash
gdnsl index [flags]
```

**Examples:**

```bash

  # Help for index command group
  gdnsl index -h

```

**Options:**

```bash
  -h, --help                Help to manage indexes.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl index create

Create an index.

```bash
gdnsl index create [flags] NAME
```

**Examples:**

```bash

  # Create a PERSISTENT index on cities collection
  gdnsl index create --type persistent --fields "f1, f2" cities

  # Create a sparse persistent index on cities collection
  gdnsl index create --type persistent --fields "f1, f2" --sparse cities

  # Create a unique persistent index on cities collection
  gdnsl index create --type persistent --fields "f1, f2" --unique cities

  # Create a sparse and unique persistent index on cities collection
  gdnsl index create --type persistent --fields "f1, f2" --unique --sparse cities

  # Create a TTL index on cities collection
  gdnsl index create --type ttl --fields "f1, f2" cities

  # Create a TTL index with expirytime on cities collection
  gdnsl index create --type ttl --expireAfter --fields "f1, f2" cities

  # Create a GEO index with latitude and longitude fields in cities collection
  gdnsl index create --type geo --fields "f1, f2" cities

  # Create a GEO index with longitude and latitude fields in cities collection
  gdnsl index create --type geo --geojson --fields "f1, f2" cities

```

**Options:**

```bash
  -h, --help                Help create an index.
      --type string         Values - persistent, geo, ttl, fulltext. 

      --fields string       Comma separated list of document fields to create an index on. 
      For "geo" indexes, all documents, which do not have the attribute path or with value that are not suitable, are ignored. If it is an array with two attribute paths "latitude" and "longitude", then a geo-spatial index on all documents is created using latitude and longitude as paths. The value of the  latitude and longitude fields must a double. 

      --sparse string       In a sparse index all documents will be excluded from the index that do not contain at least one of the specified index attributes (i.e. fields) or that have a value of null in any of the specified index attributes. Such documents will not be indexed, and not be taken into account for uniqueness checks if the unique flag is set.

      In a non-sparse index, these documents will be indexed (for non-present indexed attributes, a value of null will be used) and will be taken into account for uniqueness checks if the unique flag is set.

      Geo indexes are always sparse i.e.,  documents that do not contain the index attributes or have non-numeric values in the index attributes will not be indexed.

      --unique              Create index with unique values. Unique indexes on non-shard keys are not supported in a cluster. 

      --deduplicate         It controls whether inserting duplicate index values from the same document into a unique array index will lead to a unique constraint error or not. The default value is true. 

      --expireAfter         The time (in seconds) after a document creation after which the documents are considered as "expired".

      --geojson             If a geo-spatial index on a location is constructed and geoJson is true, then the order within the array is longitude followed by latitude. The format is described in http://geojson.org/geojson-spec.html#positions

      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl index list

List all indexes of a collection.

```bash
gdnsl index list NAME
```

**Examples:**

```bash

  # List all indexes on cities collection
  gdnsl index list cities

```

**Options:**

```
  -h, --help                Help to list all indexes of a collection.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl index delete

Delete an index.

```bash
gdnsl index delete COLLECTION_NAME [INDEX_NAME]
```

**Examples:**

```bash

  # Delete index named idx_1719031308384993280 on cities collection
  gdnsl index delete cities idx_1719031308384993280

```

**Options:**

```bash
  -h, --help                Help to delete an index.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl index describe

Get details of an index.

```bash
gdnsl index describe COLLECTION_NAME INDEX_NAME
```

**Examples:**

```bash

  # Get details of index1 index in cities collection
  gdnsl index describe cities index1

```

**Options:**

```bash
  -h, --help                Help to get details of an index.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```
