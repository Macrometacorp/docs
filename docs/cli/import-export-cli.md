---
title: Import and Export Commands
---

# Import-Export

## gdnsl import

Import collection data.

```bash
gdnsl import COLLECTION-NAME [flags]
```

**Examples:**

```bash

  # Import documents in the "addresses" collection
  gdnsl import addresses --json "[{\"name\": \"John\"}, {\"lname\": \"Doe\"}]"

  # Import documents in the "addresses" collection with primaryKey as "name"
  gdnsl import addresses --json "[{\"name\": \"John\"}, {\"lname\": \"Doe\"}]" --primary-key "name"

  # Import documents with existing document having same _key in the colletion, shall be replaced
  gdnsl import addresses --json "[{\"name\": \"John\"}, {\"lname\": \"Doe\"}]" --replace

  # Import documents with extra information for errors and unprocessed documents returned in the result
  gdnsl import addresses --json "[{\"name\": \"John\"}, {\"lname\": \"Doe\"}]" --details

  # Import documents in the "addresses" collection
  gdnsl import addresses --csv "John,Doe\nJane,Doe" --columns "name,lname"

  # Import documents in the "addresses" collection with primaryKey as "name"
  gdnsl import addresses --csv "John,Doe\nJane,Doe" --columns "name,lname" --primary-key "name"

  # Import documents with existing document having same _key in the colletion, shall be replaced
  gdnsl import addresses --csv "John,Doe\nJane,Doe" --columns "name,lname" --replace

  # Import documents with extra information for errors and unprocessed documents returned in the result
  gdnsl import addresses --csv "John,Doe\nJane,Doe" --columns "name,lname" --details

  # Import documents from a JSON file
  gdnsl import --file "path_to_file/import.json"

  # Import documents from a CSV file
  gdnsl import --file "path_to_file/import.csv"

  # Import documents in the "addresses" collection with a batch size of 1000
  gdnsl import addresses --file "import.json" --batch-size=1000
```

**Options:**

```bash
  -h, --help                Help for query import command.

  --json string             Should be an array of json documents. Each document is interpreted separately. For large data use --file instead.

  --csv string              Should be an array of csv rows. Each row is separated by a newline character. For large data use --file instead.

  --columns                 String should be a comma separated list of column names.

  --primary-key string      If specified, this attribure will be used as _key of the new document. It must follow the [naming conventions](../naming-conventions.md#document-keys). If document already contains _key then it will be renamed as old_key.

  --replace                 If true existing document having same _key in the colletion, shall be replaced.

  --details                 If true extra information for errors and unprocessed documents will be returned in the result.

  --batch-size              Number of docs to be imported in a batch. Cannot be greater than the set tenant limit. 
                            Default will the tenant limit. Works with the --file flag.

  --file string             Path to JSON or CSV file. File format is inferred from the file extension.

  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl export

Export data from a collection or via a query.

```bash
gdnsl export [flags]
```

**Examples:**

```bash

  # Export data returned by the query
  gdnsl export --query "FOR doc IN addresses RETURN doc"

  # Export data returned by the query with based on the given filter
  gdnsl export --query "FOR doc IN addresses FILTER doc.country == @country RETURN doc" --param "country=USA"

  # Export data returned by the query in CSV format
  gdnsl export --query "FOR doc IN addresses RETURN doc" --csv

  # Export data returned by the query in JSON format to a file
  gdnsl export --query "FOR doc IN addresses RETURN doc" --file test.json

  # Export data from "addresses" collection
  gdnsl export --collection addresses

  # Export data from "addresses" collection with offset as 10
  gdnsl export --collection addresses --offset 10

  # Export data from "addresses" collection with limit as 10
  gdnsl export --collection addresses --limit 10

  # Export data from "addresses" collection in descending order
  gdnsl export --collection addresses --order desc

  # Export data from "addresses" collection in CSV format
  gdnsl export --collection addresses --csv

  # Export data from "addresses" collection in CSV format
  gdnsl export --collection addresses --file test.csv

```

**Options:**

```bash
  -h, --help                Help for service.
      --query string        Query string to execute and export data.
      --param string        Params to be given to the query. Can be given multiple times.
      --csv string          To export in csv format. Default is "json".
      --collection string   Collection name to export data from.
      --offset number       This option can be used to simulate paging. Default: 0.
      --limit number        This option can be used to simulate paging. Limit the result. Default: 20, Max: 1000.
      --order  string       Order the results asc or desc. Default: asc.
      --file string         Path to JSON or CSV file. File format is inferred from the file extension.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```
