---
title: Autocomplete Commands
---

# Autocomplete (gdnsl autocomplete)

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
