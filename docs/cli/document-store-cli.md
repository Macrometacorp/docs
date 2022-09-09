---
title: Document Store Commands
---

# Document Store (gdnsl document)

Document Store collection CLI commands.

## gdnsl document create

Create a document.

```bash
  gdnsl document create [flags]
```

### Examples

```bash

  # Create a document in cities collection.
  $ gdnsl document create --json '{"name": "Julia"}' --json '{"name": "John"}' --collection "cities"
```

### Options

```bash
  -h, --help                Help to create a document.
      --collection=<value>  (required) The name of the collection.
      --fabric=<value>      Name of the fabric. Default will be "_system".
      --json=<value>...     (required) A json document to insert.

```

### Options inherited

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
 
```

## gdnsl document describe

Describe a document.

```bash
  gdnsl document describe [KEY] [flags]
```

### Examples

```bash

  # Describe a document.
  $ gdnsl document describe 5326955 --fabric _system --collection cities
```

### Options

```bash
  -h, --help                Help to describe a document.
      --collection=<value>  (required) The name of the collection.
      --fabric=<value>      Name of the fabric. Default will be "_system".

```

### Options Inherited

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
 
```

## gdnsl document update

Update documents.

```bash
  gdnsl document update [flags]
```

### Examples

```bash

  # Update a document.
  $ gdnsl document update --json '{"_key":"5685501", "name": "John"}' --collection cities
 
  # Update multiple documents.
  $ gdnsl document update --json '{"_key":"5685501", "name": "John"}' --json '{"_key":"5377789", "name": "Julia"}' --collection cities
 
  # Replace a document.
  $ gdnsl document update --replace --json '{"_key":"5685501", "name": "John"}' --collection cities
 
  # Replace multiple documents.
  $ gdnsl document update --replace --json '{"_key":"5685501", "name": "John"}' --json '{"_key":"5377789", "name": "Julia"}' --collection cities
```

### Options

```bash
  -h, --help                Help to update a document.
      --collection=<value>  (required) The name of the collection.
      --fabric=<value>      Name of the fabric. Default will be "_system".
      --json=<value>...     (required) The JSON document to update.
      --replace             Update the existing data.

```

### Options Inherited

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
 
```

## gdnsl document delete

Delete documents.

```bash
  gdnsl document delete [KEYS] [flags]
```

### Examples

```bash

  # Delete a document.
  $ gdnsl document delete 5326955 --collection cities
 
  # Delete all the specified documents.
  $ gdnsl document delete "5327664, 5327665" --collection cities
```

### Options

```bash
  -h, --help                Help to describe a document.
      --collection=<value>  (required) The name of the collection.
      --fabric=<value>      Name of the fabric. Default will be "_system".

```

### Options Inherited

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
 
```
