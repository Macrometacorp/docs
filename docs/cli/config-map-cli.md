---
title: Config Map Commands
---

# Config Map (gdnsl configmap )

Create and manage config maps.

```bash
gdnsl configmap [flags]
```

**Options:**

```bash
  -h, --help                Help for configmap.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl configmap create

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

```bash
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

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl configmap list

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

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl configmap describe

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

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl configmap get

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

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
  -o, --output=""           Output format. One of: json|yaml.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```

## gdnsl configmap delete

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

```bash
  -r, --regions             List of region names or keywords (LOCAL or ALL). Overrides the region setting in gdnsl.yml config file.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
      --log-http            Log http traffic.
```
