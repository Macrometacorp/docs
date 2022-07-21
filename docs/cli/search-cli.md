---
title: Search Commands
---

# Search (gdnsl search)

Run search query on a collection.

```bash
gdnsl search <search_query> [flags]
```

**Examples:**

```bash
  # Execute search query on demo collection
  gdnsl search "RETURN doc" --collection demo

  # Execute search query on demo collection with a binding param
  gdnsl search "FILTER doc.killed == @killed RETURN doc" --collection demo --param "killed=Sneaky Private"

  # Execute search query on demo collection with two binding params 
  gdnsl search "FILTER doc.killed == @killed AND doc.count == @count RETURN doc" --collection demo --param "killed=Sneaky Private" --param "count=7"

  # Execute search query on demo collection with ttl
  gdnsl search "RETURN doc" --collection Test --ttl 60

  # Execute search query on demo collection with two binding params and ttl 
  gdnsl search "FILTER doc.killed == @killed AND doc.count == @count RETURN doc" --collection demo --param "killed=Sneaky Private" --param "count=7" --ttl 60

  # Enable search capability on the 'count' field of demo collection
  gdnsl search demo --set --field count

  # Disable search capability on the 'count' field of demo collection
  gdnsl search demo --unset --field count
```

**Options:**

```bash
  -h, --help             Help to search.
      --param string     Key value pair. Example "key=value". Can be given multiple times.
      --ttl number       ttl value in seconds.
      --collection       Collection name on which to execute the search query.
      --param            Key value pair. Example "key=value". Can be given multiple times.
      --field            For which field to enable search capability.
      --set              Enable search capability on the specified field of a collection.
      --unset            Disable search capability on the specified field of a collection.
      --fabric           Name of the fabric to use.
```

**Options inherited:**

```bash
  --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl search analyzer

Commands for search analyzers.

```bash
gdnsl search analyzer [flags] 
```

**Examples:**

```bash
  # List analyzers
  gdnsl search analyzer --list

  # Describe text_en search analyzer
  gdnsl search analyzer text_en --describe
```

**Options:**

```bash
  -h, --help            Help to describe and list search analyzers.
  --describe            Describe a search analyzer.
  --list                List all search analyzers.
  --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
  --config string       gdnsl config file (default is ./gdnsl.yaml)
```
