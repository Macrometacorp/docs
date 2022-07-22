---
sidebar_position: 2
title: Commands
---

Use the following commands with the GDN Command Line Interface (CLI) to perform the same actions you can perform in the GUI or API.

## Client Version (gdnsl)

Prints the client version and commands help.

```bash
gdnsl [flags]
```

**Options:**

```bash
  -v, --version   prints the client version
  -h, --help      prints the commands help
```

## Autocomplete (gdnsl autocomplete)

This command prints shell autocompletion code which needs to be evaluated to provide interactive autocompletion.

Supported Shells:

- bash
- zsh

```bash
gdnsl autocomplete [SHELL] [flags]
```

**Examples:**

```bash
  gdnsl autocomplete

  gdnsl autocomplete bash

  gdnsl autocomplete zsh

  gdnsl autocomplete --refresh-cache
```

**Options:**

```bash
  -h, --help            Help for autocompletion.
  -r, --refresh-cache   Refresh cache. (ignores displaying instructions)
```

## Account Details (gdnsl account)

Print account details.

```bash
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

```bash
  -h, --help                Help for account command.
```

**Options inherited:**

```bash
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

```bash
  -h, --help                  Help for apikeys.
      --key-id                The id of the api key.
      --create                Create an apikey.
      --delete                Delete an apikey.


```

**Options inherited:**

```bash
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

```bash
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

```bash
      --config string     gdnsl config file (default is ./gdnsl.yaml)
 
```

**Note:**

If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

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

```bash
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

```bash
      --config string     gdnsl config file (default is ./gdnsl.yaml)
 
```

**Note:**

If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use. You need the Administrate server access level in order to execute this command.

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

If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

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

If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

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

If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.

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

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
 
```

:::note
If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.
:::