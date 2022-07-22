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

