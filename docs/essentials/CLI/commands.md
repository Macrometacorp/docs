---
sidebar_position: 2
title: Commands
---

# Macrometa CLI Commands

Use the following commands with the GDN Command Line Interface (CLI) to perform the same actions you can perform in the GUI or API.

## Client Version (gdnsl)

Prints the client version and commands help.

```
gdnsl [flags]
```

**Options:**

```
  -v, --version   prints the client version
  -h, --help      prints the commands help
```

## Autocomplete (gdnsl autocomplete)

This command prints shell autocompletion code which needs to be evaluated to provide interactive autocompletion.

Supported Shells:
 - bash
 - zsh

```
gdnsl autocomplete [SHELL] [flags]
```

**Examples:**

```
  $ gdnsl autocomplete

  $ gdnsl autocomplete bash

  $ gdnsl autocomplete zsh

  $ gdnsl autocomplete --refresh-cache
```

**Options:**

```
  -h, --help            Help for autocompletion.
  -r, --refresh-cache   Refresh cache. (ignores displaying instructions)
```


## Account Details (gdnsl account)

Print account details.

```
  gdnsl account [flags]
```

**Examples:**

```bash

  # Return limits of the account
  gdnsl account --limits

  # Return account plan details
  gdnsl account --plan

  # Return features enabled for the account
  gdnsl account --features

  # Return list of regions available for the account
  gdnsl account --regions

  # Return local region details
  gdnsl account --local-region

  # Return all available regions of the GDN
  gdnsl account --all-regions

```

**Options:**

```
  -h, --help                Help for account command.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


## API Keys (gdnsl apikey)

API key commands.

```bash
  gdnsl apikey [flags]
```

**Examples:**

```bash

  # List api keys
  gdnsl apikey --list

  # Get an existing api key, identified by keyid.
  gdnsl apikey --key-id testKey

  # Validate an apikey.
  gdnsl apikey --validate "anurag_macrometa.io.testKey.bpluElGqCbBIlkhDQrVsu4zBB2GxtPb3YCWcNsXSInmn"

  # Create an api key.
  gdnsl apikey --key-id testKey --create 

  # Delete api key.
  gdnsl apikey --key-id testKey --delete   
```
**Options:**

```
  -h, --help                  Help for apikeys.
      --key-id                The id of the api key.
      --create                Create an apikey.
      --delete                Delete an apikey.


```
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```


### gdnsl apikey get

Gets the access levels for the api key with keyid.

```bash
  gdnsl apikey get [flags]
```

**Examples:**

```bash

	# List the full  accessible fabrics, streams and collections for a keyId. 
	gdnsl apikey get --key-id testKey --full  

	# List the  accessible fabrics for a keyId. 
	gdnsl apikey get --key-id testKey 

	# List the  accessible streams and collections in a fabric for a keyId. 
	gdnsl apikey get --key-id testKey --fabric geoCountry  

	# List all the  accessible streams in a fabric for a keyId.
	gdnsl apikey get --key-id  testKey --fabric geoCity --all-streams 

	# List all the full accessible streams in a fabric for a keyId.
	gdnsl apikey get --key-id  testKey --fabric geoCity --all-streams --full 

	# Return the access level for a specific stream.
	gdnsl apikey get --key-id testKey  --fabric geocountry --stream countryStream 

	# Return the access level for all collections.
	gdnsl apikey  get --key-id testKey  --fabric geocountry --all-collections 

	# Return the full access level for all collections.
	gdnsl apikey  get --key-id testKey  --fabric geocountry --all-collections --full 

	# Return the access level for a specific collection.
	gdnsl apikey  get --key-id testKey  --fabric geocountry --collection country 

	# Get the billing access level.
	gdnsl apikey get --key-id testKey --billing

	# Get the list of attributes for the specified keyid.
	gdnsl apikey  get --key-id testKey --attributes 

```
**Options:**

```
   -h, --help             Help for apikeys.
      --keyId             Set the stream access levels in the database dbname of api key with keyid.
      --fabric            Name of the fabric(default is _system).
      --all-stream        Get access level for all the streams.
      --stream            Name of the stream.      
      --all-collection    Get access level for all the collections.
      --collection        Name of the collection.
      --billing           Get billing access level.
      --attributes        Flag for creating updating removing the attributes.
      --full              Return the full set of access levels for all databases and all collections.
      --param             key=value pair as equal separated string.

```
**Options inherited:**

```
      --config string     gdnsl config file (default is ./gdnsl.yaml)
 
```

**Note:**

If access level for stream is not set then default("*") access level will be use. If default("*") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

### gdnsl apikey set

Sets the access levels for the api key with keyid.

```bash
  gdnsl apikey set  [flags] 
```

**Examples:**

```bash

  # Set the stream access level to publish and subscribe for a specific stream in the database.
  gdnsl apikey set --key-id testKey --fabric geoCountry --stream countryStream --permissions rw

  # Set the stream access level to subscribe for a specific stream in the database.
  gdnsl apikey set --key-id testKey --fabric geoCity --stream cityStream --permissions ro

  # Set the stream access level to publish for a specific stream in the database. 
  gdnsl apikey set --key-id testKey --fabiricName geoState --stream stateStream --permissions wo

  # Set the stream access level to No access for a specific stream in the database. 
  gdnsl apikey set --key-id testKey --fabric geoRegion --stream regionStream --permissions none

  # Set the database access level to Administrate for a specific database. 
  gdnsl apikey set --key-id testKey --fabric persons --permissions rw

  # Set the database access level to Access for a specific database. 
  gdnsl apikey set --key-id testKey --fabric persons --permissions ro

  # Set the database access level to No access for a specific database. 
  gdnsl apikey set --key-id testKey --fabric persons --permissions none

  # Set the collection access level to Read/Write for a specific collection in the database.
  gdnsl apikey set --key-id testKey --fabric geoCountry --collection country --permissions rw

  # Set the collection access level to Read Only for a specific collection in the databas.
  gdnsl apikey set --key-id testKey --fabric geoCity --collection city --permissions ro

  # Set the collection access level to No access for a specific collection in the database. 
  gdnsl apikey set --key-id testKey --fabric geoRegion --collection region --permissions none

  # Set the billing access level to Administrate.
  gdnsl apikey set --billing --key-id testKey --permissions rw

  # Set the billing access level to Access.
  gdnsl apikey set --billing --key-id testKey --permissions ro

  # Set the billing access level to No access. 
  gdnsl apikey set --billing --key-id testKey --permissions none

  # Create/Update the attributes for api key with keyid 
  gdnsl apikey set --attributes --key-id testKey --param "key1=Value1" --param "key2=Value2"

```
**Options:**

```
  -h, --help              Help for apikeys.
      --keyId             Set the stream access levels in the database dbname of api key with keyid.
      --fabric            Name of the fabric. (default is _system).
      --stream            Name of the stream.
      --collection        Name of the collection.
      --all-collection    Get access level for all the collections.
      --all-stream        Get access level for all the streams.
      --param             key=value pair as equal separated string.
      --permissions       Permission flag for all the streams, collections, fabric and billing.

```
**Options inherited:**

```
      --config string     gdnsl config file (default is ./gdnsl.yaml)
 
```

**Note:**

If access level for stream is not set then default("*") access level will be use. If default("*") access level is also not set then database access level will be use. You need the Administrate server access level in order to execute this command.

### gdnsl apikey clear

Gets the access levels for the api key with keyid.

```bash
  gdnsl apikey get [flags]
```

**Examples:**

```bash

  # Clears the stream access level for given stream for api key with keyid.
  gdnsl apikey clear  --key-id  testKey --fabric geoCountry --stream countryStream

  # Clears the fabric access level on the persons fabric for the api key with keyid.
  gdnsl apikey clear  --key-id  testKey --fabric persons

  # Clears the collection access level for the country collection in fabric geoCountry for the api key with keyid.
  gdnsl apikey clear  --key-id testKey --fabric  geoCountry --collection country

  # Clears the billing access level of keyid.
  gdnsl apikey clear  --key-id  testKey --billing

  # Delete a specific  attribute of keyid.
  gdnsl apikey clear  --key-id  testKey --attributes name
```
**Options:**

```
  -h, --help              Help for apikeys.
      --keyId             Set the stream access levels in the database dbname of api key with keyid.
      --fabric            Name of the fabric(default is _system).
      --stream            Name of the stream.      
      --collection        Name of the collection.
      --billing           Billing access level.
      --attributes        Attributes for the key-id of an api key.
      --attribute         Attribute key.



```
**Options inherited:**

```
      --config string     gdnsl config file (default is ./gdnsl.yaml) 
```

**Note:**

If access level for stream is not set then default("*") access level will be use. If default("*") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.


## Users (gdnsl user)

User commands

```bash
  gdnsl user [flags]
```

**Examples:**

```bash

    # List all the users of a fabric
    gdnsl user --fabric '_system' --list

    # List data about the specified user of  a fabric
    gdnsl user --fabric '_system' --list --username anurag
    
    # Create user.
    gdnsl user --fabric '_system' --email 'anurag@macrometa.com' --username 'anurag' --password 'mm1234' --active --param 'key = value' --create 

    # Update user.
    gdnsl user --fabric '_system' --username 'anurag' --password 'mm1234'  --active --param 'key = value' --update 
  
    # Replace user.
    gdnsl user --fabric '_system' --username 'anurag' --password 'mm1234'  --active --param 'key = value' --replace 
      
    # Remove user.
    gdnsl user --fabric '_system' --username 'anurag' --delete   
```
**Options:**

```
  -h, --help                Help for user commands.
      --fabric              Name of the fabric.
      --list                Flag to list all the users.
      --username            Username of the specified user.
      --email               Email of the user.
      --password            Password of the user.
      --active              Optional flag that specifies whether the user is active. (default to true)
      --create              Flag to create a user.
      --replace             Replace the user details.
      --update              Update the user details.
      --delete              Delete a user.



```
**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
 
```


### gdnsl user get

Gets the access levels for the user.

```bash
  gdnsl user get [flags]
```

**Examples:**

```bash
   
  # List the  accessible streams and collections in a db for a user. 
  gdnsl user get --db-name geoCountry  --username anurag 

  # List the full accessible streams and collections in a db for a user. 
  gdnsl user get --db-name geoCountry --username anurag --full  

  # List the  accessible streams and collections for all dbs for a user.
  gdnsl user get --username anurag 

  # List the full accessible streams and collections for all dbs for a user.  
  gdnsl user get --username anurag --full  

  # List all the  accessible streams in a db for a user.
  gdnsl user get --username  anurag --db-name geoCity --all-stream  

  # List all the full accessible streams in a db for a user.
  gdnsl user get --username  anurag --db-name geoCity --all-stream --full  

  # Return the access level for a specific stream.
  gdnsl user get --db-name geocountry --stream countryStream   

  # Return the access level for all collections.
  gdnsl user get --username anurag --db-name geocountry --all-collection  

  # Return the full access level for all collections.
  gdnsl user get --username anurag --db-name geocountry --all-collection --full  

  # Return the access level for a specific collection.
  gdnsl user get --username anurag --db-name geocountry --collection country  

  # Get the billing access level.
  gdnsl user get --username anurag --billing

  # Get the list of attributes for the specified user.
  gdnsl user get --username anurag --attributes 
    

```
**Options:**

```
  -h, --help              Help to access levels for the user.
      --db-name           Name of the db of which you need to know the access level(Default is _system).
      --fabric            Name of the fabric (Default is _system).
      --all-stream        Get access level for all the streams.
      --stream            Name of the stream.      
      --all-collection    Get access level for all the collections.
      --collection        Name of the collection.
      --billing           Get billing access level.
      --attributes        Flag for creating updating removing the attributes.
      --full              Return the full set of access levels for all databases and all collections.
      --param             Key=value pair as equal separated string.
```
**Options inherited:**

```
      --config string     gdnsl config file (default is ./gdnsl.yaml)
 
```

**Note:**

If access level for stream is not set then default("*") access level will be use. If default("*") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

### gdnsl user set

Sets the access levels for the user.

```bash
  gdnsl user set  [flags] 
```

**Examples:**

```bash
  # Set the stream access level to publish and subscribe for a specific stream in the database.
  gdnsl user set --username  anurag --db-name  geoCountry --stream  countryStream --permissions rw

  # Set the stream access level to subscribe for a specific stream in the database.
  gdnsl user set  --username anurag --db-name  geoCity --stream cityStream --permissions ro

  # Set the stream access level to publish  for a specific stream in the database. 
  gdnsl user set  --username  anurag --db-name  geoState --stream stateStream --permissions wo

  # Set the stream access level to No access for a specific stream in the database. 
  gdnsl user set  --username  anurag --db-name  geoRegion --stream regionStream --permissions none

  # Set the database access level to Administrate for a specific database. 
  gdnsl user set  --username  anurag --db-name persons --permissions rw

  # Set the database access level to Access for a specific database. 
  gdnsl user set  --username  anurag --db-name persons --permissions ro

  # Set the database access level to No access for a specific database. 
  gdnsl user set  --username tanurag --db-name persons --permissions none

  # Set the collection access level to Read/Write for a specific collection in the database.
  gdnsl user  set  --username tanurag --db-name  geoCountry --collection  country --permissions rw

  # Set the collection access level to Read Only for a specific collection in the databas.
  gdnsl user  set  --username tanurag --db-name  geoCity --collection city --permissions ro

  # Set the collection access level to No access for a specific collection in the database. 
  gdnsl user  set  --username tanurag --db-name  geoRegion --collection region  --permissions none

  # Set the billing access level to Administrate.
  gdnsl user set --billing --username  anurag --permissions rw

  # Set the billing access level to Access.
  gdnsl user set  --billing --username  anurag --permissions ro

  # Set the billing access level to No access. 
  gdnsl user set  --billing --username  anurag --permissions none

  # Set the attributes for the specific user.
  gdnsl user set --attributes --username  anurag --param "key1=Value1" --param "key2=Value2"

```
**Options:**

```
  -h, --help              Help to set access levels for the user.
      --db-name           Name of the db of which you need to know the access level(Default is _system).
      --fabric            Name of the fabric (Default is _system).
      --stream            Name of the stream.
      --collection        Name of the collection.
      --all-collection    Get access level for all the collections.
      --all-stream        Get access level for all the streams.
      --param             Key=value pair as equal separated string.
      --permissions       Permission flag for all the streams, collections,fabric and billing.


```
**Options inherited:**

```
      --config string     gdnsl config file (default is ./gdnsl.yaml)
 
```

**Note:**

If access level for stream is not set then default("*") access level will be use. If default("*") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

### gdnsl user clear

Clear the access levels for the user.

```bash
  gdnsl user clear [flags]
```

**Examples:**

```bash

	# Clears the stream access level for given stream for specific user.
	gdnsl user clear --username anurag --fabric geoCountry --stream countryStream

	# Clears the fabric access level on the persons fabric for the specific user.
	gdnsl user clear --username anurag --fabric persons

	# Clears the collection access level for the country collection in fabric geoCountry for the specific user.
	gdnsl user clear --username anurag--fabric  geoCountry --collection country

	# Clears the billing access level of a specific user.
	gdnsl user clear --username anurag --billing

	# Delete  attributes  of a specific user.
	gdnsl user clear --username anurag --attributes = 'name'

```
**Options:**

```
  -h, --help                  Help to clear the access levels for the user.
      --fabric                Name of the fabric. (default is _system).
      --stream                Name of the stream.      
      --collection            Name of the collection.
      --billing               Billing access level
      --attributes            All attributes of the user
      --attribute             Attribute key.



```
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

**Note:**

If access level for stream is not set then default("*") access level will be use. If default("*") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

## Import-Export




### gdnsl import

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

```
  -h, --help                Help for query import command.

  --json string             Should be an array of json documents. Each document is interpreted separately. For large data use --file instead.

  --csv string              Should be an array of csv rows. Each row is separated by a newline character. For large data use --file instead.

  --columns                 String should be a comma separated list of column names.

  --primary-key string      If specified, this attribure will be used as _key of the new document. It must follow https://macrometa.dev/documents/naming-conventions/#document-keys . If document already contains _key then it will be renamed as old_key.

  --replace                 If true existing document having same _key in the colletion, shall be replaced.

  --details                 If true extra information for errors and unprocessed documents will be returned in the result.

  --batch-size              Number of docs to be imported in a batch. Cannot be greater than the set tenant limit. 
                            Default will the tenant limit. Works with the --file flag.

  --file string             Path to JSON or CSV file. File format is inferred from the file extension.

  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl export 

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

```
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

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```



## Queries (gdnsl query)

Execute a query and return results. Return a cursor for paginated results.

```bash
gdnsl query QUERY [flags]
```

**Examples:**

```bash

  # Execute a query
  gdnsl query "FOR doc IN addresses RETURN doc"

  # Execute a query with maximum number of result documents to be transferred from the server to the client in one roundtrip to be 10.
  gdnsl query "FOR doc IN addresses RETURN doc" --batch-size 10

  # Execute a query with filter based on input parameters
  gdnsl query "FOR x IN addresses FILTER x.country == @country RETURN x" --param "country=USA"

  # Execute a query with maximum warnings a query will return to 1
  gdnsl query "FOR doc IN addresses RETURN doc" --max-warning-count 1

  # Execute a query  with additional profiling information returned in the sub-attribute "profile"
  gdnsl query "FOR doc IN addresses RETURN doc" --profile 1

  # Execute a query with all optimizer rules disabled
  gdnsl query "FOR doc IN addresses RETURN doc" --optimizer.rule "-all"

  # Execute a query with time-to-live for the cursor to be 10 seconds
  gdnsl query "FOR doc IN addresses RETURN doc" --ttl 10

  # Execute a query to be executed in a streaming fashion
  gdnsl query "FOR doc IN addresses RETURN doc" --stream

  # Execute a query  that will throw an exception and abort instead of producing a warning.
  gdnsl query "FOR doc IN addresses RETURN doc" --fail-on-warning

  # Execute a query to return the sub-attribute "stats" and "fullCount"
  gdnsl query "FOR doc IN addresses RETURN doc" --full-count

  # Execute a query to get the total number of documents in the result
  gdnsl query "FOR doc IN addresses RETURN doc" --count

  # Execute a query  by reading it from a file on the specified path
  gdnsl query --file "path_to_file"

  # Explain the plan of the query
  gdnsl query "FOR doc IN addresses RETURN doc" --explain

  # Explain a query with maximum number of plans that the optimizer is allowed to generate as 1.
  gdnsl query "FOR doc IN addresses RETURN doc" --max-number-of-plans 1 --explain

  # Explain a query excluding all optimizer rules.
  gdnsl query "FOR doc IN addresses RETURN doc" --optimizer-rule "-all" --explain

  # Explain a query with all possible execution plans returned
  gdnsl query "FOR doc IN addresses RETURN doc" --all-plans --explain

  # Explain a cursor by reading it from a file on the specified path
  gdnsl query --file "path_to_file" --explain

  # Explain a cursor with filter based on bindvar
  gdnsl query "FOR x IN addresses FILTER x.country == @country RETURN x" --param "country=USA" --explain

  # Validate a query
  gdnsl query "FOR doc IN addresses RETURN doc" --validate

  # Validate a query read from a file
  gdnsl query  --from-path "path_to_file" --validate

```

**Options:**

```
  -h, --help                        Help for query command.
      --batch-size number           Maximum number of result documents to be transferred from the server to the client in one roundtrip. If this attribute is not set, a server-controlled default value will be used. A batchSize value of 0 is disallowed. 

      --param string                Key/value pairs representing the bind parameters. Can be given multiple times. 

      --max-warning-count number    Limits the maximum number of warnings a query will return. The number of warnings a query will return is limited to 10 by default, but that number can be increased or decreased by setting this attribute.

      --profile                     If set to true or 1, then the additional query profiling information will be returned in the sub-attribute profile of the extra return attribute, if the query result is not served from the query cache. Set to 2 the query will include execution stats per query plan node in sub-attribute stats.nodes of the extra return attribute. Additionally the query plan is returned in the sub-attribute extra.plan.

      --skip-inaccessible-collections      C8QL queries (especially graph traversals) will treat collection to which a user has no access rights as if these collections were empty. Instead of returning a forbidden access error, your queries will execute normally.

      --ttl number                The time-to-live for the cursor (in seconds). The cursor will be removed on the server automatically after the specified amount of time. This is useful to ensure garbage collection of cursors that are not fully fetched by clients. If not set, a server-defined value will be used (default: 30 seconds).

      --optimizer.rule string     A list of to-be-included or to-be-excluded optimizer rules can be put into this attribute, telling the optimizer to include or exclude specific rules. To disable a rule, prefix its name with a `-`, to enable a rule, prefix it with a `+`. There is also a pseudo-rule `all`, which matches all optimizer rules. `-all` disables all rules.

      --stream              Can be enabled to execute the query lazily. If set to true, then the query is executed as long as necessary to produce up to batchSize results. These results are returned immediately and the query is suspended until the client asks for the next batch (if there are more results).

      --fail-on-warning     When set to true, the query will throw an exception and abort instead of producing a warning. This option should be used during development to catch potential issues early. When the attribute is set to false, warnings will not be propagated to exceptions and will be returned with the query result.

      --full-count          If set to true and the query contains a LIMIT clause, then the result will have an extra attribute with the sub-attributes stats and fullCount, `{ ... , "extra": { "stats": { "fullCount": 123 } } }`. The fullCount attribute will contain the number of documents in the result before the last top-level LIMIT in the query was applied. It can be used to count the number of documents that match certain filter criteria, but only return a subset of them, in one go. It is thus similar to MySQL's SQL_CALC_FOUND_ROWS hint. Note that setting the option will disable a few LIMIT optimizations and may lead to more documents being processed, and thus make queries run longer. Note that the fullCount attribute may only be present in the result if the query has a top-level LIMIT clause and the LIMIT clause is actually used in the query.

      --count               Indicates whether the number of documents in the result set should be returned in the “count” attribute of the result. Calculating the “count” attribute might have a performance impact for some queries in the future so this option is turned off by default, and “count” is only returned when requested.

      --file string         Read query and the query options from a file. File should be in a JSON format.
      --explain             Explain the query plan.

      --max-number-of-plans number     An optional maximum number of plans that the optimizer is allowed to generate. 
                            Setting this attribute to a low value allows to put a cap on the amount of work the optimizer does.

      --all-plans           If set to true, all possible execution plans will be returned. 
                            The default is false, meaning only the optimal plan will be returned.

      --validate            Validate the query string.
      --fabric              Name of the fabric to use.

```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl query cursor

Commands to work with a query cursor.

```bash
gdnsl query cursor CURSOR-IDENTIFIER [flags]
```

**Examples:**

```bash

  # Delete a cursor
  gdnsl query cursor 66706 --delete

  # Read next batch from cursor
  gdnsl query cursor 66706 --next

```

**Options:**

```
  -h, --help                Help for query delete command.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


## Key-Value (gdnsl kv)

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

```
  -h, --help                Help to manage KV collections.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl kv create

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

```
  -h, --help                Help to create a Key Value collection.
      --ttl                 Enable TTL on the collection. Default is false.
      --stream              Enable stream on the collection. Default is false.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl kv list

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

```
  -h, --help                Help to list a Key Value collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl kv delete

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

```
  -h, --help                Help to delete a Key Value collection.
      --keyarray  stringa   Delete entries for all given keys from KV collection.
      --key string          Delete entry for given key from KV collection.
      --truncate            Delete all entries from KV collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl kv get

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

```
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

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl kv set

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

```
  -h, --help            Help to set kv in a collection.
      --key string      Key for the kv entry.
      --value string    Value for the kv entry.
      --kv array        Key value tuples for the KV collection.
      --fabric          Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


## Collections (gdnsl collection)

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

```
  -h, --help                Help for collections.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl collection create

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

```
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

```
      --config string       gdnsl config file. (default is ./gdnsl.yaml)
```

### gdnsl collection list

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

```
  -h, --help                Help to list collections.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl collection delete

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

### gdnsl collection describe

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

```
  -h, --help                Help for service.
      --count               To return number of documents in the collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl collection update

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

```
  -h, --help                  Help to update a collection.
      --stream                Enable stream on the collection.
      --no-stream             Disable stream on the collection.
      --wait-for-sync         Enable waitForSync on the collection.
      --no-wait-for-sync      Disable waitForSync on the collection.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```



## Indexes (gdnsl index)

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

```
  -h, --help                Help to manage indexes.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


### gdnsl index create

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

```
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

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl index list

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

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl index delete

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

```
  -h, --help                Help to delete an index.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl index describe

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

```
  -h, --help                Help to get details of an index.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


## Graphs (gdnsl graph)

Commands to work with graphs.

```bash
gdnsl graph GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Help for graph command group
  gdnsl graph -h
```

**Options:**

```
  -h, --help                Help for graph commands.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```



### gdnsl graph create

Create a graph

```bash
gdnsl graph create GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Create a graph "social"
  gdnsl graph create social

  # Create a graph "social" with edge collection "relation", set "from" vertex as "female" & "male" and set "to" vertex as "female" & "male". The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph create social --edge-definition "relation:female,male:female,male"

  # Create a graph "social" with edge collection "relation", set "from" vertex as "female" & "male" and set "to" vertex as "female" & "male" with additional options specified. The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph create social --edge-definition "relation:female,male:female,male" --option "key=value"

```

**Options:**

```
  -h, --help                Help for graph describe.
      --edge-definition     Specify the edge definition of the graph. This edge definition has to contain a collection and an array of each from and to vertex collections. An edge definition can only be added if this definition is either not used in any other graph, or it is used with exactly the same definition. It is not possible to store a definition "e" from "v1" to "v2" in the one graph, and "e" from "v2" to "v1" in the other graph. Can be given multiple times.
      --option              Specify any additional options to be given. Can be given multiple times.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph list

List all graphs.

```bash
gdnsl graph list
```

**Examples:**

```bash

  # List all graphs
  gdnsl graph list

```

**Options:**

```
  -h, --help                Help for graph list.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph delete

Delete a graph

```bash
gdnsl graph delete GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Drop the graph "social"
  gdnsl graph delete social

  # Drop the graph "social" and any collections if they are not used in other graphs
  gdnsl graph delete social --drop-collections

```

**Options:**

```
  -h, --help                Help for graph describe.
      --drop-collections    Drop the collection as well. Collection will only be dropped if it is not used in other graphs. Default is false.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph describe

Describe a graph.

```bash
gdnsl graph describe GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Describe the graph "social"
  gdnsl graph describe social

  # Describe all edge definitions of the graph "social"
  gdnsl graph describe social --edge-definitions

  # Describe all vertex collections of the graph "social"
  gdnsl graph describe social --vertex

```

**Options:**

```
  -h, --help                Help for graph describe.
      --edge-definitions    Get all the edge definitions of a graph.
      --vertex              Get all the vertex collections of a graph.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph update

Update a graph.

```bash
gdnsl graph update GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Add an edge-definition to the graph "social" for the edge collection "relation", set "from" vertex as "female" & "male" and set "to" vertex as "female" & "male". The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph update social --add-edge-definition "relation:female,male:female,male"

  # Add a vertex collection "age" to the graph "social"'s orphan collections
  gdnsl graph update social --add-vertex-collection "age"

  # Remove "age" vertex collection from graph "social"
  gdnsl graph update social --remove-vertex-collection "age"

  # Remove the edge definitions belonging to the "relation" edge collection
  gdnsl graph update social --remove-edge-collection "relation"

  # Replace an edge-definition of the graph "social" for the edge collection "relation", set "from" vertices as "female" & "male", and set "to" vertices as "female" & "male". The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph update social --collection relation --replace-edge-definition "relation:female,male:female,male"

  # Replace a vertex collection "age" to the graph "social"'s orphan collections and drop the collection if it is not being used
  gdnsl graph update social --collection relation --replace-edge-definition "relation:female,male:female,male" --drop-collections
      
  # Enable stream on graph collection social
  gdnsl graph update social --stream 
    
  # Disable stream on graph collection social
  gdnsl graph update social --no-stream

  # Enable waitForSync on graph collection social
  gdnsl graph update social --wait-for-sync 
    
  # Disable waitForSync on graph collection social
  gdnsl graph update social --no-wait-for-sync

  # Enable stream and waitForSync on graph collection social
  gdnsl graph update social --stream --wait-for-sync 
    
  # Disable stream and waitForSync on graph collection social
  gdnsl graph update social --no-stream  --no-wait-for-sync

```

**Options:**

```
  -h, --help   help for graph describe

      --add-edge-definition         Specify the edge definition of the graph. This edge definition has to contain a collection and an array of each from and to vertex collections. An edge definition can only be added if this definition is either not used in any other graph, or it is used with exactly the same definition. It is not possible to store a definition "e" from "v1" to "v2" in the one graph, and "e" from "v2" to "v1" in the other graph.

      --add-vertex-collection       Adds a vertex collection to the set of orphan collections of the graph. If the collection does not exist, it will be created.

      --collection                  The name of the edge collection the edge belongs to. Should be used with "--replace-edge-definition" flag

      --replace-edge-definition     Specify the edge definition of the graph. This edge definition has to contain a collection and an array of each from and to vertex collections. An edge definition can only be added if this definition is either not used in any other graph, or it is used with exactly the same definition. It is not possible to store a definition "e" from "v1" to "v2" in the one graph, and "e" from "v2" to "v1" in the other graph.

      --remove-edge-collection      Remove one edge definition from the graph. This will only remove the edge collection, the vertex collections remain untouched and can still be used in your queries.

      --remove-vertex-collection   The name of the edge collection the edge belongs to. Removes a vertex collection from the graph and optionally deletes the collection, if it is not used in any other graph. It can only remove vertex collections that are no longer part of edge definitions, if they are used in edge definitions you are required to modify those first.
      
      --drop-collection             Drop the collection as well. Collection will only be dropped if it is not used in other graphs. Default value is false.

      --fabric                      Name of the fabric to use.
      --stream                      Enable stream on the kv collection.
      --no-stream                   Disable stream on the kv collection.
      --wait-for-sync               Enable waitForSync on the kv collection.
      --no-wait-for-sync            Disable waitForSync on the kv collection.

```

### gdnsl graph traversal

Starts a graph traversal from a given vertex and following edges contained in a given edge collection.

```bash
gdnsl graph traversal GRAPH-NAME [flags]
```

**Examples:**

```bash

	# Traverse 'edges' edge collection starting from the vertex "circles/F"
	gdnsl graph traversal --edge-collection edges --start-vertex "circles/F" --direction 'any' --visitor 'result.vertices.push(vertex._key);' --init 'result.vertices = [];' --order postorder

```

**Options:**

```
  -h, --help                  Help to traverse a graph.
      --direction             Direction for traversal. If set, must be either "outbound", "inbound", or "any"; if not set, the expander attribute must be specified.
      --edge-collection       Name of the collection that contains the edges .
      --expander              Body (JavaScript) code of custom expander function must be set if direction attribute is not set function signature: (config, vertex, path) -> array expander must return an array of the connections for vertex each connection is an object with the attributes edge and vertex
      
      --filter                Default is to include all nodes: body (JavaScript code) of custom filter function function signature: (config, vertex, path) -> mixed can return four different string values:
      "exclude" -> this vertex will not be visited.
      "prune" -> the edges of this vertex will not be followed.
      "" or undefined -> visit the vertex and follow its edges.
      Array -> containing any combination of the above. If there is at least one "exclude" or "prune" respectively is contained, it's effect will occur.
      
      --init                  Body (JavaScript) code of custom result initialization function function signature: (config, result) -> void initialize any values in result with what is required.

      --item-order            Item iteration order can be "forward" or "backward".
      --max-depth             ANDed with any existing filters visits only nodes in at most the given depth.
      --max-iterations        Maximum number of iterations in each traversal. This number can be set to prevent endless loops in traversal of cyclic graphs. When a traversal performs as many iterations as the maxIterations value, the traversal will abort with an error. If maxIterations is not set, a server-defined value may be used.

      --min-depth             ANDed with any existing filters): visits only nodes in at least the given depth.
      --order                 Traversal order can be "preorder", "postorder" or "preorder-expander".
      --sort                  Body (JavaScript) code of a custom comparison function for the edges. The signature of this function is (l, r) -> integer (where l and r are edges) and must return -1 if l is smaller than, +1 if l is greater than, and 0 if l and r are equal. The reason for this is the following: The order of edges returned for a certain vertex is undefined. This is because there is no natural order of edges for a vertex with multiple connected edges. To explicitly define the order in which edges on the vertex are followed, you can specify an edge comparator function with this attribute. Note that the value here has to be a string to conform to the JSON standard, which in turn is parsed as function body on the server side. Furthermore note that this attribute is only used for the standard expanders. If you use your custom expander you have to do the sorting yourself within the expander code.

      --start-vertex          id of the startVertex, e.g. "users/foo".
      --strategy              Traversal strategy can be "depthfirst" or "breadthfirst".
      --uniqueness            Specifies uniqueness for vertices and edges visited.
If set, must be an object like this:
"uniqueness": {"vertices": "none"|"global"|"path", "edges": "none"|"global"|"path"}
      
      --visitor               Body (JavaScript) code of custom visitor function function signature: (config, result, vertex, path, connected) -> void The visitor function can do anything, but its return value is ignored. To populate a result, use the result variable by reference. Note that the connected argument is only populated when the order attribute is set to "preorder-expander".

      --fabric                Name of the fabric to use.
```


## Graph Edges (gdnsl graph edge)



### gdnsl graph edge create

Create an edge.

```bash
gdnsl graph edge create GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Create an edge in the "social" graph in "relation" edge-collection from "male/John" to "female/Doe"
  gdnsl graph edge create social --collection relation --from "male/John" --to "female/Doe"

  # Create an edge in the "social" graph in "relation" edge-collection from "male/John" to "female/Doe" and return the new version of the document
  gdnsl graph edge create social --collection relation --from "male/John" --to "female/Doe" --return-new

```

**Options:**

```
  -h, --help                Help to create graph edge.
      --collection          The name of the edge collection the edge belongs to.
      --from                The source vertex of this edge. Has to be valid within the used edge definition.
      --to                  The target vertex of this edge. Has to be valid within the used edge definition.
      --return-new          Define if the response should contain the complete new version of the document.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph edge delete

Delete a graph

```bash
gdnsl graph delete GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Drop the graph "social"
  gdnsl graph delete social

  # Drop the graph "social" and any collections if they are not used in other graphs
  gdnsl graph delete social --drop-collections

```

**Options:**

```
  -h, --help                Help for graph describe.
      --drop-collections    Drop the collection as well. Collection will only be dropped if it is not used in other graphs. Default is false.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph edge describe

Describe an edge.

```bash
gdnsl graph edge describe GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Describe the edge with the _key as "1w44RO8kQMG3kB0feiua1g" in the collection "relation"
  gdnsl graph edge describe social --collection relation --edge 1w44RO8kQMG3kB0feiua1g

```

**Options:**

```
  -h, --help                Help for graph describe.
      --collection          The name of the edge collection the edge belongs to.
      --edge                The _key attribute of the edge.
      --rev                 Must contain a revision. If this is set a document is only returned if it has exactly this revision. Also see if-match header as an alternative to this.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is returned, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --if-none-match       If the "If-None-Match" header is given, then it must contain exactly one Etag. The document is returned, only if it has a different revision as the given Etag. Otherwise a HTTP 304 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph edge list

List edges starting or ending in the vertex.

```bash
gdnsl graph edge list [flags]
```

**Examples:**

```bash

  # Get the edges from the "relation" collection from any direction in the vertex "female/alice"
  gdnsl graph edge list --collection relation --vertex-id "female/alice"

  # Get the edges from the "relation" collection from "in" direction in the vertex "female/alice"
  gdnsl graph edge list --collection relation --vertex-id "female/alice" --direction "in"

```

**Options:**

```
  -h, --help                Help for graph describe.
      --direction           Selects "in" or "out" direction for edges. If not set, any edges are returned.
      --vertex-id           The id of the start vertex.
      --collection          The id of the collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


### gdnsl graph edge replace

Replaces the data of an edge in the collection.

```bash
gdnsl graph edge replace GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Replace the edge with the _key as "1w44RO8kQMG3kB0feiua1g" in the collection "relation" in the graph "social"
  gdnsl graph edge replace social --collection relation --edge 1w44RO8kQMG3kB0feiua1g --from "male/John" --to "female/Doe"

```

**Options:**

```
  -h, --help                Help to replace graph edge.
      --collection          The name of the edge collection the edge belongs to.
      --edge                The _key attribute of the edge.
      --from                The source vertex of this edge. Has to be valid within the used edge definition.
      --to                  The target vertex of this edge. Has to be valid within the used edge definition.
      --keep-null           Define if values set to null should be stored. By default the key is not removed from the document. Default is true.
      --return-old          Define if a presentation of the deleted document should be returned within the response object. Default is false.
      --return-new          Define if a presentation of the new document should be returned within the response object. Default is true.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph edge update

Update the data of an edge in the collection.

```bash
gdnsl graph edge update GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Replace the edge with the _key as "1w44RO8kQMG3kB0feiua1g" in the collection "relation" in the graph "social"
  gdnsl graph edge update social --collection relation --edge 1w44RO8kQMG3kB0feiua1g --data "{\"fname\":\"John\"}"

```

**Options:**

```
  -h, --help                Help to update graph edge.
      --collection          The name of the edge collection the edge belongs to.
      --edge                The _key attribute of the edge.
      --data                JSON body as string.
      --keep-null           Define if values set to null should be stored. By default the key is not removed from the document. Default is true.
      --return-old          Define if a presentation of the deleted document should be returned within the response object. Default is false.
      --return-new          Define if a presentation of the new document should be returned within the response object. Default is true.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## Graph Vertices (gdnsl graph vertex)



### gdnsl graph vertex create

Create a vertex.

```bash
gdnsl graph vertex create GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Create a vertex in the graph "social" with the vertex collection as "male"
  gdnsl graph vertex create social --collection male --data '{"name": "John"}'

```

**Options:**

```
  -h, --help                Help for graph describe.
      --collection          The name of the vertex collection the vertex belongs to.
      --return-new          Define if the response should contain the complete new version of the document.
      --data                json string of the data to be stored.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph vertex delete

Remove vertex from a collection.

```bash
gdnsl graph vertex delete GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Delete a vertex in the graph "social" with the vertex collection as "male"
  gdnsl graph vertex delete social --collection male --vertex "John"

  # Delete a vertex in the graph "social" with the vertex collection as "male" and return the old object
  gdnsl graph vertex delete social --collection male --vertex "John" --return-old

```

**Options:**

```
  -h, --help                Help for graph describe.
      --collection          The name of the vertex collection the vertex belongs to.
      --vertex              The _key attribute of the vertex.
      --return-old          Define if a presentation of the deleted document should
                            be returned within the response object. Default is false.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph vertex describe

Get details about a vertex.

```bash
gdnsl graph vertex describe GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Describe the vertex with the _key as "bob" in the collection "male"
  gdnsl graph vertex describe social --collection male --vertex bob

```

**Options:**

```
  -h, --help                Help to describe graph vertex.
      --collection          The name of the vertex collection the vertex belongs to.
      --vertex              The _key attribute of the vertex.
      --rev                 Must contain a revision. If this is set a document is only returned if it has exactly this revision. Also see if-match header as an alternative to this. Default is false.
      
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is returned, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned. As an alternative you can supply the Etag in an query parameter rev.
      
      --if-none-match       If the "If-None-Match" header is given, then it must contain exactly one Etag. The document is returned, only if it has a different revision as the given Etag. Otherwise a HTTP 304 is returned.
      
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph vertex replace

Replace the data of a vertex in the collection.

```bash
gdnsl graph vertex replace GRAPH-NAME [flags]
```

**Examples:**

```bash

	# Update a vertex in the graph "social" with the vertex collection as "male"
	gdnsl graph vertex replace social --collection male --vertex "John" --data '{"name": "John", "lname": "Doe"}'

```

**Options:**

```
  -h, --help                Help to replace graph vertex.
      --collection          The name of the vertex collection the vertex belongs to.
      --vertex              The _key attribute of the vertex.
      --return-new          Define if the response should contain the complete new version of the document. Default is false.
      --keep-null           Define if values set to null should be stored. By default the key is not removed from the document. Default is false.
      --return-old          Define if a presentation of the deleted document should
be returned within the response object. Default is false.
      --data                json string of the data to be stored.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl graph vertex update

Update the data of a vertex in the collection.

```bash
gdnsl graph vertex replace GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Update a vertex in the graph "social" with the vertex collection as "male"
  gdnsl graph vertex update social --collection male --vertex "John" --data '{"name": "John", "lname": "Doe"}'

```

**Options:**

```
  -h, --help                  Help to update graph vertex.
      --collection            The name of the vertex collection the vertex belongs to.
      --vertex                The _key attribute of the vertex.
      --return-new            Define if the response should contain the complete new version of the document. Default is false.
      --keep-null             Define if values set to null should be stored. By default the key is not removed from the document. Default is false.
      --return-old            Define if a presentation of the deleted document should
be returned within the response object. Default is false.
      --data                  json string of the data to be stored
      --if-match              If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```


## Search (gdnsl search)

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

```
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

```
  --config string       gdnsl config file (default is ./gdnsl.yaml)
```



### gdnsl search analyzer

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

```
  -h, --help            Help to describe and list search analyzers.
  --describe            Describe a search analyzer.
  --list                List all search analyzers.
  --fabric              Name of the fabric to use.
```

**Options inherited:**

```
  --config string       gdnsl config file (default is ./gdnsl.yaml)
```



## Search Views (gdnsl view)

Get commands related to search views.

```
gdnsl view [flags]
```

**Options:**

```
  -h, --help                  Help for views.
```

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```


### gdnsl view create

Create a view.

```bash
gdnsl view create <view-name> [flags]
```

**Examples:**

```bash
  # Create test view on demo collection
  gdnsl view create test --collection demo

  # Create test view on demo collection with analyzer
  gdnsl view create test --collection demo --analyzer identity

  # Create test view on demo collection with fields
  gdnsl view update test --collection demo --field "name:text_en,text_fr" --field "age:text_en"
  
  # Create test view on demo collection with store-values
  gdnsl view create test --collection demo --store-values none

  # Create test view on demo collection with track-list-positions
  gdnsl view create test --collection demo --track-list-positions

  # Create test view on demo collection with include-all-fields
  gdnsl view create test --collection demo --include-all-fields

```

**Options:**

```
  -h, --help                   Help to create a view.
      --analyzer string        Analyzers to be used for indexing of string values. Can be given multiple times. (default: identity).
      --field string           Field and analyzers mapping in the format <fieldName:analyzer1,analyzer2> 
                               Example: "age:text_en,text_fr". Can be given multiple times.
      --store-values string    How should the view track the attribute values, this setting allows for additional value retrieval optimizations, one of:
                               none: Do not store values by the view.
                               id: Store only information about value presence, to allow use of the EXISTS() function (default "none").
      --track-list-positions boolean  The flag determines whether or not values in a lists should be treated separate (default: false).
      --include-all-fields boolean    The flag determines whether or not to index all fields on a particular level of depth (default: false).
      --fabric                 Name of the fabric to use.
```

**Options inherited:**

```
  --config string              gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl view list

Get list of views.

```bash
gdnsl view list [flags]
```

**Examples:**

```bash
  # List views
  gdnsl view list

```

**Options:**

```
  -h, --help                  Help to get list of views.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl view describe

Describe a view.

```bash
gdnsl view describe <view-name> [flags]
```

**Examples:**

```bash
  # Describe demo view
  gdnsl view describe demo

  # Describe demo view properties
  gdnsl view describe demo --properties
```

**Options:**

```
  -h, --help                  Help to describe a view.
      --properties            View properties.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl view rename

Rename a view.

```bash
gdnsl view rename <old-name> <new-name> [flags]
```

**Examples:**

```bash
  # Rename test view with new name demo
  gdnsl view rename test demo
```

**Options:**

```
  -h, --help                  Help to rename a view.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```
     --config string         gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl view update

Update a view. Enable or disable view capability of a collection.

```bash
gdnsl view update <view-name> [flags]
```

**Examples:**

```bash
  # update test view on demo collection with analyzer
  gdnsl view update test --collection demo --analyzer identity

  # update test view on demo collection with fields
  gdnsl view update test --collection demo --field "name:text_en,text_fr" --field "age:text_en" 
  
  # update test view on demo collection with store-values
  gdnsl view update test --collection demo --store-values none

  # update test view on demo collection with track-list-positions
  gdnsl view update test --collection demo --track-list-positions

  # update test view on demo collection with include-all-fields
  gdnsl view update test --collection demo --include-all-fields

```

**Options:**

```
  -h, --help                          Help to describe a view.
      --analyzer string               Analyzers to be used for indexing of string values. Can be given multiple times. (default: identity).
      --field string                  Field and analyzers mapping in the format <fieldName:analyzer1,analyzer2> 
                                      Example: "age:text_en,text_fr". Can be given multiple times.
      --store-values string           How should the view track the attribute values, this setting allows for additional value retrieval optimizations, one of:
                                      none: Do not store values by the view.
                                      id: Store only information about value presence, to allow use of the EXISTS() function (default "none").
      --track-list-positions boolean  The flag determines whether or not values in a lists should be treated separate (default: false).
      --include-all-fields boolean    The flag determines whether or not to index all fields on a particular level of depth (default: false).
      --fabric                        Name of the fabric to use.
```

**Options inherited:**

```
  --config string                     gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl view delete

Delete a view.

```bash
gdnsl view delete <view-name> [flags]
```

**Examples:**

```bash
  # Delete demo view
  gdnsl view delete demo

```

**Options:**

```
  -h, --help                  Help to delete a view.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```
    --config string           gdnsl config file (default is ./gdnsl.yaml)
```


## Streams (gdnsl streams)



### gdnsl streams publish

Publish message to a stream.

```bash
 gdnsl streams publish <stream-name> [flags] <message-string>
```

**Examples:**

```bash

  #Publish message to a stream of type global  
  gdnsl streams publish testStream --message "This is global stream"  --global

  #Publish message to a stream of type local
  gdnsl streams publish testStream --message "This is local stream" 

```

**Options:**
	-h, --help              Help to publish message to a stream.
	--global                Is stream global or not.
	--message               Message to be published to the stream.
	--fabric                Name of the fabric to use.

**Options inherited:**

```
    
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```


### gdnsl streams create

Create a stream.

```bash
  gdnsl streams create <stream-name> [flags]
```

**Examples:**

```bash

  # Create a new stream name testStream of type global.
  gdnsl streams create testStream --global

  # Create a new stream name testStream of type local.
  gdnsl streams create testStream

```
**Options:**

```
  -h, --help                  Help for streams create.
      --global                Is stream global or not.
      --fabric                Name of the fabric to use.
```
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl streams delete

Delete a stream.

```bash
gdnsl stream delete <stream-name> [flags]
```

**Examples:**

```bash

  # Delete a stream of type global
  gdnsl stream delete testStream --global

  # Delete a stream of type local
  gdnsl stream delete testStream

```

**Options:**
-h, --help                    Help for deleting a stream.
    --global                  Is stream global or not.
    --fabric                  Name of the fabric to use.

**Options inherited:**

```    
      --config string         gdnsl config file (default is ./gdnsl.yaml)

```


### gdnsl streams list

List streams.

```bash
gdnsl streams list [flags]
```

**Examples:**

```bash

  # list streams 
  gdnsl streams list 

  # list streams's ttl
  gdnsl streams list --ttl

```

**Options:**

	-h, --help              		Help to list streams.
			--fabric            		Name of the fabric to use.

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl streams describe

Describe a stream.

```bash
 gdnsl streams describe <stream-name> [flags]
```

**Examples:**

```bash

  # Get  stream's backlog  for stream type global
  gdnsl streams describe testStream --backlog --global

  # Get  stream's backlog  for stream type local
  gdnsl streams describe testStream --backlog

  # Get  stream's stats  for stream type global
  gdnsl streams describe testStream --stats --global

  # Get  stream's stats  for stream type local
  gdnsl streams describe testStream --stats

  # Get  stream's subscription  for stream type global
  gdnsl streams describe testStream --subscription --global

  # Get  stream's subscription  for stream type local
  gdnsl streams describe testStream --subscription 

```

**Options:**
      -h, --help              Help to describe a stream.
          --subscription      Subscription for a particular stream.
          --backlog           Backlog for a particular stream.
          --stats             Stats for a particular stream. 
          --global            Global stream. ( default is local )
          --fabric            Name of the fabric to use.
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)

```

### gdnsl streams expire

Expire messages on the stream for all subscriptions.

```bash
gdnsl streams expire <stream-name> [flags] <second-value-number>
```

**Examples:**

```bash

  # Expire messages on the stream for all subscriptions for stream type global
  gdnsl streams expire testStream --seconds 9600 --global

  # Expire messages on the stream for all subscriptions for stream type local
  gdnsl streams expire testStream --seconds 9600 

```

**Options:**
      -h, --help              Help for expiration time for messages on stream for all subscriptions.
          --global            Is stream global or not.
          --seconds           Value for expiring a stream message.
          --fabric            Name of the fabric to use.

**Options inherited:**

```

      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl streams backlog

Delete backlog for all stream.

```bash
gdnsl streams backlog [flags]
```

Delete backlog for a subscription.

```bash
gdnsl streams backlog [flags]
```
**Examples:**

```bash

  # Clear backlog for all streams
  gdnsl streams backlog --delete

  # Clear subscription’s backlog	
  gdnsl streams backlog --delete --subscription MyTopic

```

**Options:**

      -h, --help              Help for deleting backlog.
      --subscription          Subscription for a particular stream.
      --delete                Delete backlog for streams. Default is all if subscription is not specified.
      --fabric                Name of the fabric to use.
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)

```

### gdnsl streams subscription

Delete subscription either on all streams or an a particular stream.

```bash
gdnsl streams subscription NAME [flags]
```

**Examples:**

```bash

  # Delete the given subscription on all streams
  gdnsl streams subscription mysubscription --delete 

  # Delete subscription on a specific stream
  gdnsl streams subscription mysubscription --stream stream1

```

**Options:**
  -h, --help              Help for deleting subscriptions.
      --global            Is stream global or not.
      --subscription      Subscription for a particular stream.
      --fabric            Name of the fabric to use.

**Options inherited:**

```
      --config string     gdnsl config file (default is ./gdnsl.yaml)

```

### gdnsl streams ttl

Get or set message TTL (time-to-live) in seconds for streams.

```bash
gdnsl streams ttl [flags]
```

**Examples:**

```bash

  # Get streams TTL
  gdnsl streams ttl 

  # Set message TTL for 3600 seconds on all streams
  gdnsl streams ttl --seconds 3600

```

**Options:**

	-h, --help              Help for getting streams ttl.
			--seconds           Message TTL in seconds.
			--fabric            Name of the fabric to use.

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```


## Fabrics (gdnsl fabric)

Get commands related to GeoFabrics.

```bash
gdnsl fabric [flags]
```

**Options:**

```
  -h, --help   Help for fabric.
```

### gdnsl fabric list

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

```
  -h, --help            Help to get list of fabrics
      --all boolean     List all fabrics accessible to the active user. ( default is false )
```

**Options inherited:**

```
  --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl fabric create

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

  # Create demo fabric with 2 metadata objects
  gdnsl fabric create demo --metadata "key1:value1" --metadata "key2:value2"

```

**Options:**

```
  -h, --help                Help to create a fabric.
```

**Options inherited:**

```
  --config string           gdnsl config file (default is ./gdnsl.yaml)
  --datacenter string       (required) Name of a Edge Location (datacenter). ie, Edge Location URL prefixes up to the first "." character.
  --metadata string         An optional string object with user defined key-value pair Example "key:value".
  --spot-datacenter string  The Edge Location (Datacenter) where on-spot operations for the given fabric will be performed.
  --user string             Username that will have admin access to the new fabric
```

### gdnsl fabric delete

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

```
  -h, --help                Help to delete a fabric.
```

**Options inherited:**

```
  --config string           gdnsl config file (default is ./gdnsl.yaml)
```


### gdnsl fabric update

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

```
  -h, --help                Help to create a fabric metadata.
  --metadata string         An optional string object with user defined key-value pair Example "key:value".
```

**Options inherited:**

```
  --config string           gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl fabric describe

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

```
  -h, --help        Help to describe a fabric.
```

**Options inherited:**

```
  --config string   gdnsl config file (default is ./gdnsl.yaml)
```



## Query Workers (gdnsl query-worker )

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

```
  -h, --help                Help to manage query-workers.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


### gdnsl query-worker create

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

```
  -h, --help                Help to create a query-worker.
      --param string        key/value pairs representing the bind parameters. Can be given multiple times. 
      --file string         Read query and the query options from a file. File should be in a JSON format. 
                            The name of the file will become query-worker's name if the `name` option is not specified.
      --fabric              Name of the fabric to use.
      --value string        Query string. 
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl query-worker list

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

```
  -h, --help                Help to list query-workers.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl query-worker delete

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

```
  -h, --help                Help to delete a query-worker.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl query-worker describe

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

```
  -h, --help            Help to a describe query worker.
  --fabric              Name of the fabric to use.

```
**Options inherited:**

```
      --config string   gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl query-worker update

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

```
  -h, --help                Help to update a query-worker.
      --param string        Key/value pairs representing the bind parameters. Can be given multiple times. 
      --file  string        Read query and the query options from a file. File should be in a JSON format. 
                            The name of the file will become query-worker's name if the `name` option is not specified.

      --fabric              Name of the fabric to use.
      --value string        Query string. 
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl query-worker run

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

```
  -h, --help                Help to run a query-worker.
      --param string        key/value pairs representing the bind parameters. Can be given multiple times.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl query-worker next

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

```
  -h, --help                Help for query next command.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```


## Stream Workers (gdnsl stream-worker)

Get commands related to stream workers.

```bash
  gdnsl stream-worker <stream-worker-name> [flags]
```

**Examples:**

```bash
  
  # Publish a stream worker.
  gdnsl stream-worker TestStreamWorker --enable

  # Unpublish a stream worker.
  gdnsl stream-worker TestStreamWorker --disable

  # Submit an ad hoc Stream query and get the result records from a store.
  gdnsl stream-worker TestStream --query "SELECT * FROM TestStreamTable"

```
**Options:**

```
  -h, --help                  Help to create a stream worker.
      --query string          Query to return the result.
      --enable                Enable a stream worker.
      --disable               Disable a stream worker.
      --fabric                Name of the fabric to use.
```
**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl stream-worker create

Create a stream worker.

```bash
  gdnsl stream-worker create [flags]
```

**Examples:**

```bash

  # Create a simple stream worker.
   gdnsl stream-worker create 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"

  # Create a stream worker using JS functions.
   gdnsl stream-worker create 
      --name "abc-stream-worker" 
      --description "my stream worker2" 
      --function "concatFn[javascript] return string {
                      var str1 = data[0];
                      var str2 = data[1];
                      var str3 = data[2];
                      var response = str1 + str2 + str3;
                      return response;
                  };"
      --source "STREAM SampleScriptAppInputStream (deviceID string, roomNo int, temperature double);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleScriptAppOutputTable 
                SELECT concatFn(roomNo,'-',deviceID) as id, temperature
                FROM SampleScriptAppInputStream;"

  # Create a cron stream worker.
   gdnsl stream-worker create 
      --name "cron-stream-worker" 
      --description "This app will produce an event after every 5 secondsr" 
      --trigger "MyTrigger WITH ( interval = 5 sec );"
      --sink "STREAM SampleStream (startTime long);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleStream
                SELECT eventTimestamp() as startTime
                FROM MyTrigger;"

  # Create a stream worker with indexes.
   gdnsl stream-worker create 
      --name "my-stream-worker2" 
      --description "This application creates different types of indexes on a given table." 
      --table "SampleGDNTable (sensorId string, temperature double);"
      --index "SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId)"
      --index "SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);"
      --index "SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);"

  # Validate a stream worker.
   gdnsl stream-worker create 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"
      --validate

   # Validate a stream worker from a file.
   gdnsl stream-worker create -file "cargo-stream-worker.json" --validate

  # Create a stream worker with indexes.
   gdnsl stream-worker create 
      --name "my-rdbmc-cdc" 
      --description "This stream app will explain the usage of rdbms store extension using MySQL database" 
      --trigger "ceprdbmsTrigger WITH (interval=5 sec);"
      --store " StockTable WITH 
                ( type="rdbms", 
                  jdbc.url="jdbc:mysql://dummy-mysql-server.com:3306/MySQLDB?useSSL=false", 
                  username="my-username", 
                  password="my-password", 
                  jdbc.driver.name="com.mysql.jdbc.Driver",
                  field.length="symbol:100", 
                  table.check.query="SELECT 1 FROM StockTable LIMIT", 
                  PrimaryKey='id', 
                  PrimaryKey='symbol', 
                  Index='volume') 
	              (id string, symbol string, price float, volume long);"
      --query " INSERT INTO StockTable
                SELECT convert(count(), 'string')  as id, 
                      convert(count(), 'string') as symbol, 
                      23.33f as price, 
                      eventTimestamp() as volume 
                FROM ceprdbmsTrigger; "

   # Create a stream worker from a file.
   gdnsl stream-worker create -file "cargo-stream-worker.json" --regions "gdn-us-west,gdn-ap-west"

  # Create a stream worker using advanced mode
   gdnsl stream-worker create --advanced"@App:name('Sample-Adhoc-Query')\n@App:description(\"This application demonstrates how to send adhoc queries and fetch data from Stores and named windows.\")\n@App:qlVersion('2')\n\n/**\nTesting the Stream Application:\n    1. Upload following data into `SampleAdhocQueryInputTable` C8DB Collection\n        {\"sensorId\":\"sensor A1234\",\"temperature\":18}\n        {\"sensorId\":\"sensor A1234\",\"temperature\":-32.2}\n        {\"sensorId\":\"sensor FR45\",\"temperature\":20.9}\n        {\"sensorId\":\"sensor meter1\",\"temperature\":49.6}\n\n    2. This application accumulates all the data for one minute in the named window `SampleAdhocQueryInputTableOneMinTimeWindow`\n        Named window allows other application to query data in realtime.\n\n    3. Run the adhoc query on the `SampleAdhocQueryInputTableOneMinTimeWindow` (Refer [1] for running adhoc queries.)\n        Query:\n            select * from SampleAdhocQueryInputTableOneMinTimeWindow\n\n        Output:\n            [\n                [\"sensor A1234\",18],\n                [\"sensor A1234\",-32.2],\n                [\"sensor FR45\",20.9],\n                [\"sensor meter1\",49.6]\n            ]\n\n    4. Similar to Named Windows one can run adhoc queries on the stores as well. Running adhoc query on \n        `SampleAdhocQuerySensorA1234DestTable` C8DB Collection should produce below result\n\n        Query: Store the result if sensorId is equal to \"sensor A1234\"\n            SELECT * FROM SampleAdhocQuerySensorA1234DestTable\n\n        Output:\n            [\n                [\"sensor A1234\",18],\n                [\"sensor A1234\",-32.2]\n            ]\n\n    [1] https://macrometa.dev/cep/quickstart/#run-an-adhoc-query\n*/\n\n-- Defines `SampleAdhocQueryInputTable` collection to process events having `sensorId` and `temperature`(F).\nCREATE SOURCE SampleAdhocQueryInputTable WITH(type = 'database', collection = \"SampleAdhocQueryInputTable\", collection.type=\"doc\" , replication.type=\"global\", map.type='json') (sensorId string, temperature double);\n\n-- Named Window\nCREATE WINDOW SampleAdhocQueryInputTableOneMinTimeWindow (sensorId string, temperature double) SLIDING_TIME(1 min);\n\n-- Table\nCREATE TABLE SampleAdhocQuerySensorA1234DestTable(sensorId string, temperature double);\n\n@info(name = 'Insert-to-window')\nINSERT INTO SampleAdhocQueryInputTableOneMinTimeWindow\nSELECT *\nFROM SampleAdhocQueryInputTable;\n\n@info(name = 'EqualsFilter')\n-- Note: Filter out events with `sensorId` equalling `sensor A1234`\nINSERT INTO SampleAdhocQuerySensorA1234DestTable\nSELECT *\nFROM SampleAdhocQueryInputTable\nWHERE sensorId == 'sensor A1234';\n" --regions "gdn-us-west,gdn-ap-west"

```
**Options:**

```
  -h, --help                  Help to create a stream worker.
      --name string           Stream worker name. Mandatory field.
      --description           Stream worker description. Mandatory field.
      --source                Source definition. Can be provided multiple times.
      --sink                  Sink definition. Can be provided multiple times.
      --trigger               Trigger definition. Can be provided only once. 
      --store                 Store definition. Can be provided multiple times.
      --query                 Stream query. Can be provided multiple times.
      --table                 Table definition. Can be provided multiple times. 
      --index                 Index definition. Can be provided multiple times.
      --function              JS function definition. Can be provided multiple times.
      --advanced string       Complete stream worker definiton as string.
      --file   string         Json file from where the stream worker definition is to be read from.
      --regions string        Comma separated regions where stream workers should be deployed. Default to local region.
      --validate              Validate stream worker definition. Stream worker will not be created.
      --fabric                Name of the fabric to use
```
**Options inherited:**

```
      --config string  gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl stream-worker delete

Delete a stream worker.

```bash
  gdnsl stream-worker delete <stream-worker-name>
```

**Examples:**

```bash

  # Delete a stream worker.
  gdnsl stream-worker delete TestStreamWorker

```
**Options:**

```
  -h, --help                  Help to describe stream workers.
  --fabric                    Name of the fabric to use.

```
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl stream-worker describe

Describe a stream worker.

```bash
  gdnsl stream-worker describe <stream-name>
```

**Examples:**

```bash

  # Describe a stream worker.
  gdnsl stream-worker describe TestStreamWorker

```
**Options:**

```
  -h, --help                  Help to describe stream workers.
      --fabric                Name of the fabric to use.

```
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl stream-worker list

List stream workers.

```bash
  gdnsl stream-worker list [flags]
```

**Examples:**

```bash

  # List stream workers.
  gdnsl stream-worker list

  # List sample stream workers.
  gdnsl stream-worker list --sample

```
**Options:**

```
  -h, --help                  Help to list stream workers.
      --sample                List sample stream workers.
      --fabric                Name of the fabric to use.
```
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

### gdnsl stream-worker update

Update a stream worker.

```bash
  gdnsl stream-worker update <stream-worker-name> [flags]
```

**Examples:**

```bash

  # Update a simple stream worker.
   gdnsl stream-worker update 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"

  # Update a stream worker using JS functions.
   gdnsl stream-worker update 
      --name "abc-stream-worker" 
      --description "my stream worker2" 
      --function "concatFn[javascript] return string {
                      var str1 = data[0];
                      var str2 = data[1];
                      var str3 = data[2];
                      var response = str1 + str2 + str3;
                      return response;
                  };"
      --source "STREAM SampleScriptAppInputStream (deviceID string, roomNo int, temperature double);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleScriptAppOutputTable 
                SELECT concatFn(roomNo,'-',deviceID) as id, temperature
                FROM SampleScriptAppInputStream;"

  # Update a cron stream worker.
   gdnsl stream-worker update 
      --name "cron-stream-worker" 
      --description "This app will produce an event after every 5 secondsr" 
      --trigger "MyTrigger WITH ( interval = 5 sec );"
      --sink "STREAM SampleStream (startTime long);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleStream
                SELECT eventTimestamp() as startTime
                FROM MyTrigger;"

  # Update a stream worker with indexes.
   gdnsl stream-worker update 
      --name "my-stream-worker2" 
      --description "This application creates different types of indexes on a given table." 
      --table "SampleGDNTable (sensorId string, temperature double);"
      --index "SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId)"
      --index "SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);"
      --index "SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);"

  # Validate a stream worker.
   gdnsl stream-worker update 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"
      --validate

   # Validate a stream worker from a file.
   gdnsl stream-worker update --file "cargo-stream-worker.json" --validate

  # Update a stream worker with indexes.
   gdnsl stream-worker update 
      --name "my-rdbmc-cdc" 
      --description "This stream app will explain the usage of rdbms store extension using MySQL database" 
      --trigger "ceprdbmsTrigger WITH (interval=5 sec);"
      --store " StockTable WITH 
                ( type="rdbms", 
                  jdbc.url="jdbc:mysql://dummy-mysql-server.com:3306/MySQLDB?useSSL=false", 
                  username="my-username", 
                  password="my-password", 
                  jdbc.driver.name="com.mysql.jdbc.Driver",
                  field.length="symbol:100", 
                  table.check.query="SELECT 1 FROM StockTable LIMIT", 
                  PrimaryKey='id', 
                  PrimaryKey='symbol', 
                  Index='volume') 
                  (id string, symbol string, price float, volume long);"
      --query " INSERT INTO StockTable
                SELECT convert(count(), 'string')  as id, 
                      convert(count(), 'string') as symbol, 
                      23.33f as price, 
                      eventTimestamp() as volume 
                FROM ceprdbmsTrigger; "

   # Update a stream worker from a file.
   gdnsl stream-worker update --file "cargo-stream-worker.json" --regions "gdn-us-west,gdn-ap-west"
```
**Options:**

```
  -h, --help                  Help to create a stream worker.
      --name string           Stream worker name. Mandatory field.
      --description           Stream worker description. Mandatory field.
      --source                Source definition. Can be provided multiple times.
      --sink                  Sink definition. Can be provided multiple times.
      --trigger               Tigger definition. Can be provided only once. 
      --store                 Store definition. Can be provided multiple times.
      --query                 Stream query. Can be provided multiple times.
      --table                 Table definition. Can be provided multiple times. 
      --index                 Index definition. Can be provided multiple times.
      --function              JS function definition. Can be provided multiple times.
      --advanced string       Complete stream worker definiton as string
      --file   string         Json file from where the stream worker definition is to be read from
      --regions string        Comma separated regions where stream workers should be deployed. Default to local region.
      --validate              Validate stream worker definition. Stream worker will not be updated.
      --fabric                Name of the fabric to use.
```
**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```


## Billing (gdnsl billing )

Get commands related to billing.

```bash
gdnsl billing [flags]
```

**Examples:**

```bash
  # Help for billing command group
  gdnsl billing -h
```

**Options:**

```
  -h, --help            Help for billing.
```

**Options inherited:**

```
      --config string   gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl billing usage

Get billing usage of the tenant in specific date range.

```bash
gdnsl billing usage describe [flags]
```

**Examples:**

```bash
  # Describe a billing usage starting from 1st day of the current month to till date
  gdnsl billing usage

  # Describe a billing usage starting from 1st day of the current month to till date for the specified region
  gdnsl billing usage --region 'prashant-ap-west'

  # Describe a billing usage starting from the specified date to till date
  gdnsl billing usage --start-date '2021-10-10'

  # Describe a billing usage starting from the specified date to till the specified date
  gdnsl billing usage --start-date '2021-05-01' --end-date '2021-10-30'
```

**Options:**

```
  -h, --help               Help to get account details.
      --region string      Name of the region.
      --start-date string  Start date in 'YYYY-MM-DD' format. Example: 2020-12-01. (default is 1st day of the current month)
      --end-date string    End date in 'YYYY-MM-DD' format. Example: 2020-12-31. (default is today's date)
```

**Options inherited:**

```
      --config string      gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl billing account

Get details of a billing account.

```bash
gdnsl billing account
```

**Examples:**

```bash
  # Describe a billing account
  gdnsl billing account
```

**Options:**

```
  -h, --help                Help to get account details
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl billing invoice

Get details of invoice of the tenant for the specified year and month. ( default is current month)

```bash
gdnsl billing invoice  [flags]
```

**Examples:**

```bash
  # Describe billing invoices for the current month
  gdnsl billing invoice 

  # Describe billing invoice for the year 2021 and 11th month
  gdnsl billing invoice  --year 2021 --month 11

  # Describe billing invoice for the current year and 11th month
  gdnsl billing invoice  --month 11

  # Describe billing invoice for the year 2021 and current month
  gdnsl billing invoice  --year 2021

  # List billing invoices
  gdnsl billing invoice --list

  # Describe billing invoices for the previous 4 months
  gdnsl billing invoice --list --limit 4

```

**Options:**

```
  -h, --help                  Help to get list of invoices.
      --current boolean       Get invoice of the tenant for the current month. ( default is true)
      --month number          Month in 'DD' format. Valid values:[1..12] ( default is current month)
      --year number           Year in 'YYYY' format. Example:2021 ( default is current year)
      --list                  List invoices for previous months. Default: 3
      --limit number          Number of previous months. ( default is 3)
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl billing payment

Command for billing payments.

```bash
gdnsl billing payment [flags]
```

**Examples:**

```bash
  # Get payment details of the previous months. (default is 3 months)
  gdnsl billing payment

  # Describe billing payment for the previous 4 months
  gdnsl billing payment --limit 4

```

**Options:**

```
  -h, --help                Help to get payment details.
      --limit number        Number of previous months.
      --method string       Payment method.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl billing plan

Get details of a billing plan. Default is `METERED`.

```bash
gdnsl billing plan [flags]
```

**Examples:**

```bash

  # Describe billing plan
  gdnsl billing plan --name ENTERPRISE

  # List all billing plans
  gdnsl billing plan --list
```

**Options:**

```
  -h, --help   Help to get a plan details
      --list   List all billing plans.
      --name string Name of the billing plan.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

### gdnsl billing contact

Update contact details.

```bash
gdnsl billing contact <tenant-name> [flags]
```

**Examples:**

```bash

  # Update billing contact
  gdnsl billing contact demo_mm.com --update 
    --firstname Demo 
    --lastname Gdn 
    --email demo@mm.com 
    --phone 123445657 
    --line1 l1 --line2 l2 
    --city Pune 
    --state Maharashtra 
    --country India 
    --zipcode 111222

  # Describe billing contact
  gdnsl billing contact demo_mm.com --describe 

```

**Options:**

```
  -h, --help                Help to update billing contact details.
      --describe            Describe contact info.
      --update              Update.
      --city string         City.
      --country string      Name of the country.
      --email string        Email address.
      --firstname string    First name.
      --lastname string     Last name.
      --line1 string        Address Line 1.
      --line2 string        Address Line 2.
      --phone string        Phone number.
      --state string        State.
      --zipcode string      Zip code.
```

**Options inherited:**

```
      --config string       gdnsl config file. (default is ./gdnsl.yaml)
```




## Config Map (gdnsl configmap )

Create and manage config maps.


```bash
gdnsl configmap [flags]
```

**Options:**

```
  -h, --help                Help for configmap.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl configmap create

Create a configmap based on a file, directory, or specified literal value.

A single configmap may package one or more key/value pairs.

When creating a configmap based on a file, the key will default to the basename of the file, and the value will default to the file content. If the basename is an invalid key, you may specify an alternate key.

When creating a configmap based on a directory, each file whose basename is a valid key in the directory will be packaged into the configmap. Any directory entries except regular files are ignored (e.g. subdirectories, symlinks, devices, pipes, etc).

```bash
    gdnsl configmap create NAME [--type=string] [--file=[key=]source] [--from-literal=key1=value1] [--dry-run]
```

**Examples:**

```bash

  # Create a new configmap named my-config with keys for each file in folder bar
  gdnsl configmap create my-config --file=path/to/bar

  # Create a new configmap named my-config with specified keys instead of names on disk
  gdnsl configmap create my-config --file=ssh-privatekey=~/.ssh/id_rsa --file=ssh-publickey=~/.ssh/id_rsa.pub

  # Create a new configMap named my-config with key1=config1 and key2=config2
  gdnsl configmap create my-config --from-literal=key1=config1 --from-literal=key2=config2
```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --dry-run[=false]     If true, only print the object that would be sent, without sending it.
      --file=[]             Key files can be specified using their file path, in which case a default name will be given to them, or optionally with a name and file path, in which case the given name will be used.  Specifying a directory will iterate each named file in the directory that is a valid configmap key.
      --from-literal=[]     Specify a key and literal value to insert in configmap. (i.e. mykey=somevalue)
      --no-headers[=false]  When using the default output, don't print headers.
  -o, --output=""           Output format. One of: json|yaml.
      --output-version=""   Output the formatted object with the given group version. (for ex: 'extensions/v1beta1').
  -a, --show-all[=false]    When printing, show all resources. (default hide terminated pods.)
      --show-labels[=false] When printing, show all labels as the last column. (default hide labels column)
      --sort-by=""          If non-empty, sort list types using this field specification. The field specification is expressed as a JSONPath expression (e.g. '{.metadata.name}'). The field in the API resource specified by this JSONPath expression must be an integer or a string.
      --validate[=true]     If true, use a schema to validate the input before sending it.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl configmap list

List config maps.

```bash
    gdnsl configmap list
```

**Examples:**

```bash
  # List all config maps in the tenant namespace
  gdnsl configmap list
```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl configmap describe


Display details of config map.

```bash
    gdnsl configmap describe NAME
```

**Examples:**

```bash
  # Describe details of game-config config map
  gdnsl configmap describe game-config
```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl configmap get

Get config map.

```bash
    gdnsl configmap get NAME [flags]
```

**Examples:**

```bash

  # Get contents of game-config config map in yaml format
  gdnsl configmap get game-config -o yaml

  # Get contents of game-config config map in yaml format
  gdnsl configmap get game-config -o json
```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -o, --output=""           Output format. One of: json|yaml.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl configmap delete

Delete config map

```bash
    gdnsl configmap delete NAME
```

**Examples:**

```bash
  # Delete game-config config map
  gdnsl configmap delete game-config
```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```



## Service (gdnsl service)

Service command group.

```
gdnsl service [flags]
```

**Options:**

```
  -h, --help                Help for service.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl service create

Create a service.

```bash
gdnsl service create NAME --image IMAGE [flags]
```

**Examples:**

```bash

  # Create a service 'mysvc' using image at dev.local/ns/image:latest
  gdnsl service create mysvc --image dev.local/ns/image:latest

  # Create a service with multiple environment variables
  gdnsl service create mysvc --env KEY1=VALUE1 --env KEY2=VALUE2 --image dev.local/ns/image:latest

  # Create or replace a service 's1' with image dev.local/ns/image:v2 using --force flag
  # if service 's1' doesn't exist, it's just a normal create operation
  gdnsl service create --force s1 --image dev.local/ns/image:v2

  # Create or replace environment variables of service 's1' using --force flag
  gdnsl service create --force s1 --env KEY1=NEW_VALUE1 --env NEW_KEY2=NEW_VALUE2 --image dev.local/ns/image:v1

  # Create service 'mysvc' with port 80
  gdnsl service create mysvc --port 80 --image dev.local/ns/image:latest

  # Create or replace default resources of a service 's1' using --force flag
  # (earlier configured resource requests and limits will be replaced with default)
  # (earlier configured environment variables will be cleared too if any)
  gdnsl service create --force s1 --image dev.local/ns/image:v1

  # Create a service with annotation
  gdnsl service create s1 --image dev.local/ns/image:v3 --annotation sidecar.istio.io/inject=false

```

**Options:**

```
  -r, --regions                  List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --annotation stringArray   Service annotation to set. name=value; you may provide this flag any number of times to set multiple annotations.
                                 To unset, specify the annotation name followed by a "-" (e.g., name-).
      --async                    Create service and don't wait for it to become ready.
      --concurrency-limit int    Hard Limit of concurrent requests to be processed by a single replica.
      --concurrency-target int   Recommendation for when to scale up based on the concurrent number of incoming request. Defaults to --concurrency-limit when given.
  -e, --env stringArray          Environment variable to set. NAME=value; you may provide this flag any number of times to set multiple environment variables. 
                                 To unset, specify the environment variable name followed by a "-" (e.g., NAME-).
      --env-from stringArray     Add environment variables from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret:). 
                                 Example: --env-from cm:myconfigmap or --env-from secret:mysecret. You can use this flag multiple times. To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --env-from cm:myconfigmap-.

      --force                    Create service forcefully, replaces existing service if any.
  -h, --help                     Help to create a service.
      --image string             Image to run.
  -l, --label stringArray        Service label to set. name=value; you may provide this flag any number of times to set multiple labels. 
                                 To unset, specify the label name followed by a "-" (e.g., name-).
      --limits-cpu string        The limits on the requested CPU (e.g., 1000m).
      --limits-memory string     The limits on the requested memory (e.g., 1024Mi).
      --lock-to-digest           keep the running image for the service constant when not explicitly specifying the image.
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision) (default true)
      --max-scale int            Maximal number of replicas.
      --min-scale int            Minimal number of replicas.
      --mount stringArray        Mount a ConfigMap (prefix cm: or config-map:), a Secret (prefix secret: or sc:), or an existing Volume (without any prefix) on the specified directory. Example: --mount /mydir=cm:myconfigmap, --mount /mydir=secret:mysecret, or --mount /mydir=myvolume. When a configmap or a secret is specified, a corresponding volume is automatically generated. You can use this flag multiple times. For unmounting a directory, append "-", e.g. --mount /mydir-, which also removes any auto-generated volume.

      --no-lock-to-digest        Do not keep the running image for the service constant when not explicitly specifying the image. 
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision)
  -p, --port int32               The port where application listens on.
      --requests-cpu string      The requested CPU (e.g., 250m).
      --requests-memory string   The requested memory (e.g., 64Mi).
      --revision-name string     The revision name to set. Must start with the service name and a dash as a prefix. Empty revision name will result in the server generating a name for the revision. Accepts golang templates, allowing {{.Service}} for the service name, {{.Generation}} for the generation, and {{.Random [n]}} for n random consonants. (default "{{.Service}}-{{.Random 5}}-{{.Generation}}")

      --service-account string   Service account name to set. Empty service account name will result to clear the service account.
      --volume stringArray       Add a volume from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret: or sc:). 
                                 Example: --volume myvolume=cm:myconfigmap or --volume myvolume=secret:mysecret. You can use this flag multiple times. To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --volume myvolume-.
      --wait-timeout int         Seconds to wait before giving up on waiting for service to be ready. (default 600)
```

**Options inherited:**

```
      --config string           gdnsl config file (default is ./gdnsl.yaml)
      --log-http                Log http traffic.
```

### gdnsl service list

List available services.

```
gdnsl service list [name] [flags]
```

**Examples:**

```

  # List all services
  gdnsl service list

  # List all services in JSON output format
  gdnsl service list -o json

  # List service 'web'
  gdnsl service list web

```

**Options:**

```
  -r, --regions              List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                 Help for list.
      --no-headers           When using the default output format, don't print headers (default: print headers).
  -o, --output string        Output format. One of: json|yaml|.
```

**Options inherited:**

```
      --config string        gdnsl config file (default is ./gdnsl.yaml)
      --log-http             Log http traffic.
```

### gdnsl service describe

Show details for a given service.

```
gdnsl service describe NAME [flags]
```

**Options:**

```
  -r, --regions                       List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --allow-missing-template-keys   If true, ignore any errors in templates when a field or map key is missing in the template.
                                      Only applies to golang and jsonpath output formats. (default true)
  -h, --help                          Help to describe a serice.
  -o, --output string                 Output format. One of: json|yaml
  -v, --verbose                       More output.
```

**Options inherited:**

```
      --config string                 gdnsl config file (default is ./gdnsl.yaml)
      --log-http                      Log http traffic.
```

### gdnsl service update

Update a service.

```
gdnsl service update NAME [flags]
```

**Examples:**

```bash

  # Updates a service 'svc' with new environment variables
  gdnsl service update svc --env KEY1=VALUE1 --env KEY2=VALUE2

  # Update a service 'svc' with new port
  gdnsl service update svc --port 80

  # Updates a service 'svc' with new requests and limits parameters
  gdnsl service update svc --requests-cpu 500m --limits-memory 1024Mi

  # Assign tag 'latest' and 'stable' to revisions 'echo-v2' and 'echo-v1' respectively
  gdnsl service update svc --tag echo-v2=latest --tag echo-v1=stable
  OR
  gdnsl service update svc --tag echo-v2=latest,echo-v1=stable

  # Update tag from 'testing' to 'staging' for latest ready revision of service
  gdnsl service update svc --untag testing --tag @latest=staging

  # Add tag 'test' to echo-v3 revision with 10% traffic and rest to latest ready revision of service
  gdnsl service update svc --tag echo-v3=test --traffic test=10,@latest=90

```

**Options:**

```
  -r, --regions                  List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --annotation stringArray   Service annotation to set. name=value; you may provide this flag any number of times to set multiple annotations. 
                                 To unset, specify the annotation name followed by a "-" (e.g., name-).
      --async                    Update service and don't wait for it to become ready.
      --concurrency-limit int    Hard Limit of concurrent requests to be processed by a single replica.
      --concurrency-target int   Recommendation for when to scale up based on the concurrent number of incoming request. Defaults to --concurrency-limit when given.
  -e, --env stringArray          Environment variable to set. NAME=value; you may provide this flag any number of times to set multiple environment variables. 
                                 To unset, specify the environment variable name followed by a "-" (e.g., NAME-).
      --env-from stringArray     Add environment variables from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret:). 
                                 Example: --env-from cm:myconfigmap or --env-from secret:mysecret. You can use this flag multiple times. 
                                 To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --env-from cm:myconfigmap-.

  -h, --help                     Help to update a service.
      --image string             Image to run.
  -l, --label stringArray        Service label to set. name=value; you may provide this flag any number of times to set multiple labels. 
                                 To unset, specify the label name followed by a "-" (e.g., name-).
      --limits-cpu string        The limits on the requested CPU (e.g., 1000m).
      --limits-memory string     The limits on the requested memory (e.g., 1024Mi).
      --lock-to-digest           keep the running image for the service constant when not explicitly specifying the image. 
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision) (default true)
      --max-scale int            Maximal number of replicas.
      --min-scale int            Minimal number of replicas.
      --mount stringArray        Mount a ConfigMap (prefix cm: or config-map:), a Secret (prefix secret: or sc:), or an existing Volume (without any prefix) on the specified directory. Example: --mount /mydir=cm:myconfigmap, --mount /mydir=secret:mysecret, or --mount /mydir=myvolume. When a configmap or a secret is specified, a corresponding volume is automatically generated. You can use this flag multiple times. For unmounting a directory, append "-", e.g. --mount /mydir-, which also removes any auto-generated volume.

      --no-lock-to-digest        Do not keep the running image for the service constant when not explicitly specifying the image. 
                                 (--no-lock-to-digest pulls the image tag afresh with each new revision)
  -p, --port int32               The port where application listens on.
      --requests-cpu string      The requested CPU (e.g., 250m).
      --requests-memory string   The requested memory (e.g., 64Mi).
      --revision-name string     The revision name to set. Must start with the service name and a dash as a prefix. Empty revision name will result in the server generating a name for the revision. Accepts golang templates, allowing {{.Service}} for the service name, {{.Generation}} for the generation, and {{.Random [n]}} for n random consonants. (default "{{.Service}}-{{.Random 5}}-{{.Generation}}")

      --service-account string   Service account name to set. Empty service account name will result to clear the service account.
      --tag strings              Set tag (format: --tag revisionRef=tagName) where revisionRef can be a revision or '@latest' string representing 
                                 latest ready revision. This flag can be specified multiple times.
      --traffic strings          Set traffic distribution (format: --traffic revisionRef=percent) where revisionRef can be a revision or a tag or '@latest' string representing latest ready revision. This flag can be given multiple times with percent summing up to 100%.
      --untag strings            Untag revision (format: --untag tagName). This flag can be specified multiple times.
      --volume stringArray       Add a volume from a ConfigMap (prefix cm: or config-map:) or a Secret (prefix secret: or sc:). Example: --volume myvolume=cm:myconfigmap or --volume myvolume=secret:mysecret. You can use this flag multiple times. To unset a ConfigMap/Secret reference, append "-" to the name, e.g. --volume myvolume-.

      --wait-timeout int         Seconds to wait before giving up on waiting for service to be ready. (default 600)
```

**Options inherited:**

```
      --config string            gdnsl config file (default is ./gdnsl.yaml)
      --log-http                 Log http traffic.
```

### gdnsl service delete

Delete a service.

```
gdnsl service delete NAME [flags]
```

**Examples:**

```

  # Delete a service 'svc1' in tenant namespace
  gdnsl service delete svc1

```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help to delete a service.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            log http traffic
```


## Route (gdnsl route)

Route command group.

```
gdnsl route [flags]
```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help for route.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl route list

List available routes.

```
gdnsl route list NAME [flags]
```

**Examples:**

```

  # List all routes
  gdnsl route list

  # List route 'web' in namespace 'dev'
  gdnsl route list web -n dev

  # List all routes in yaml format
  gdnsl route list -o yaml

```

**Options:**

```
  -r, --regions               List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                  Help to list revisions.
      --no-headers            When using the default output format, don't print headers (default: print headers).
  -o, --output string         Output format. One of: json|yaml
```

**Options inherited:**

```
      --config string         gdnsl config file (default is ./gdnsl.yaml)
      --log-http              Log http traffic.
```

### gdnsl route describe

Describe available route.

```
gdnsl route describe NAME [flags]
```

**Options:**

```
  -r, --regions              List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                 help to describe a route.
  -o, --output string        Output format. One of: json|yaml
```

**Options inherited:**

```
      --config string        gdnsl config file (default is ./gdnsl.yaml)
      --log-http             Log http traffic.
```


## Revision (gdnsl revision)

Get commands related to revisions.

```
gdnsl revision [flags]
```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help for revision.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

### gdnsl revision list

List revisions for a given service.

```
gdnsl revision list [name] [flags]
```

**Examples:**

```bash

  # List all revisions
  gdnsl revision list

  # List revisions for a service 'svc1' in namespace 'myapp'
  gdnsl revision list -s svc1 -n myapp

  # List all revisions in JSON output format
  gdnsl revision list -o json
  
  # List revision 'web'
  gdnsl revision list web

```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help to list revisions.
      --no-headers          When using the default output format, don't print headers (default: print headers).
  -o, --output string       Output format. One of: json|yaml
  -s, --service string      Service name.
```

**Options inherited:**

```
      --config string        gdnsl config file (default is ./gdnsl.yaml)
      --log-http             Log http traffic.
```

### gdnsl revision describe

Describe revisions.

```
gdnsl revision describe NAME [flags]
```

**Options:**

```
  -r, --regions                       List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
      --allow-missing-template-keys   If true, ignore any errors in templates when a field or map key is missing in the template. 
                                      Only applies to golang and jsonpath output formats. (default true)
  -h, --help                          Help to describe a revision.
  -o, --output string                 Output format. One of: json|yaml
  -v, --verbose                       More output.
```

**Options inherited:**

```
      --config string                 gdnsl config file (default is ./gdnsl.yaml)
      --log-http                      Log http traffic.
```

### gdnsl revision delete

Delete a revision.

```
gdnsl revision delete NAME [flags]
```

**Examples:**

```

  # Delete a revision 'svc1-abcde' in default namespace
  gdnsl revision delete svc1-abcde

```

**Options:**

```
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -h, --help                Help to delete a revision.
```

**Options inherited:**

```
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            log http traffic
```
