---
title: API Key Commands
---

# API Keys (gdnsl apikey)

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

## gdnsl apikey get

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

:::note
If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.
:::

## gdnsl apikey set

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

:::note
If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use. You need the Administrate server access level in order to execute this command.
:::

## gdnsl apikey clear

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

```bash
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

```bash
      --config string     gdnsl config file (default is ./gdnsl.yaml) 
```

:::note
If access level for stream is not set then default("_") access level will be use. If default("_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.
:::
