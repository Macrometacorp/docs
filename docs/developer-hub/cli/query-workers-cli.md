---
title: Query Worker Commands
---

# Query Workers (gdnsl query-worker )

Get commands related to query workers.

```bash
gdnsl query-worker [flags]
```

**Examples:**

```bash

  # Help for query worker command group
  gdnsl query-worker -h

```

**Options:**

```bash
  -h, --help                Help to manage query-workers.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query-worker create

Create a query worker.

```bash
gdnsl query-worker create NAME [flags]
```

**Examples:**

```bash
  # Update a query-worker with the name "allAddresses"
  gdnsl query-worker update allAddresses --value "FOR doc IN addresses RETURN doc"

  # Create a query-worker with filter based on bindvar of the query
  gdnsl query-worker create getCountryAddresses --value "FOR x IN addresses FILTER x.country == @country RETURN x" --param "country=USA"

  # Update a query worker by reading it from a file on the specified path
  gdnsl query-worker update --file "path_to_file"
```

**Options:**

```bash
  -h, --help                Help to create a query-worker.
      --param string        key/value pairs representing the bind parameters. Can be given multiple times. 
      --file string         Read query and the query options from a file. File should be in a JSON format. 
                            The name of the file will become query-worker's name if the `name` option is not specified.
      --fabric              Name of the fabric to use.
      --value string        Query string. 
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query-worker list

List query workers associated with current user.

```bash
gdnsl query-worker list
```

**Examples:**

```bash
  # List all query-workers
  gdnsl query-worker list
```

**Options:**

```bash
  -h, --help                Help to list query-workers.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query-worker delete

Delete a query worker.

```bash
gdnsl query-worker delete NAME
```

**Examples:**

```bash

  # Delete a query-worker with the name "allAddresses"
  gdnsl query-worker delete allAddresses

```

**Options:**

```bash
  -h, --help                Help to delete a query-worker.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query-worker describe

Describe a query worker.

```bash
  gdnsl query-worker describe NAME
```

**Examples:**

```bash
  # Describe a query worker.
  gdnsl query-worker describe TestStreamWorker
```

**Options:**

```bash
  -h, --help            Help to a describe query worker.
  --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string   gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query-worker update

Update a query worker.

```bash
gdnsl query-worker update NAME [flags]
```

**Examples:**

```bash
  # Update a query-worker with the name "allAddresses"
  gdnsl query-worker update allAddresses --value "FOR doc IN addresses RETURN doc"

  # Update a query worker  with filter based on bindvar of the query
  gdnsl query-worker update getCountryAddresses --value "FOR x IN addresses FILTER x.country == @country RETURN x" --param "country=USA"

  # Update a query worker by reading it from a file on the specified path
  gdnsl query-worker update --file "path_to_file"
```

**Options:**

```bash
  -h, --help                Help to update a query-worker.
      --param string        Key/value pairs representing the bind parameters. Can be given multiple times. 
      --file  string        Read query and the query options from a file. File should be in a JSON format. 
                            The name of the file will become query-worker's name if the `name` option is not specified.

      --fabric              Name of the fabric to use.
      --value string        Query string. 
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query-worker run

Run a query worker.

```bash
gdnsl query-worker run NAME [flags]
```

**Examples:**

```bash
  # Execute a query-worker with the name "allAddresses"
  gdnsl query-worker run allAddresses 

  # Execute a query-worker with filter based on bindvar
  gdnsl query-worker run getCountryAddresses --param "country=USA"
```

**Options:**

```bash
  -h, --help                Help to run a query-worker.
      --param string        key/value pairs representing the bind parameters. Can be given multiple times.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query-worker next

Read next batch from cursor.

```bash
gdnsl query-worker next CURSOR-IDENTIFIER
```

**Examples:**

```bash
  # Read next batch from cursor
  gdnsl query-worker next 66706
```

**Options:**

```bash
  -h, --help                Help for query next command.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```
