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
