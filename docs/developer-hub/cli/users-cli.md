---
title: User Commands
---

# Users (gdnsl user)

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

```bash
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

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl user get

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

```bash
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

```bash
      --config string     gdnsl config file (default is ./gdnsl.yaml)
```

:::note
If access level for stream is not set then default("\_") access level will be use. If default("\_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.
:::

## gdnsl user set

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

```bash
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

```bash
      --config string     gdnsl config file (default is ./gdnsl.yaml)
```

:::note
If access level for stream is not set then default("\_") access level will be use. If default("\_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.
:::

## gdnsl user clear

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

```bash
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
If access level for stream is not set then default("\_") access level will be use. If default("\_") access level is also not set then database access level will be use.You need the Administrate server access level in order to execute this command.
:::
