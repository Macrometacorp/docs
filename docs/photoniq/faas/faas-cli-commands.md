---
sidebar_position: 11
title: FaaS CLI Commands
---

The PhotonIQ FaaS Command Line Interface (CLI) enables you to manage local and remote functions.

Here's the complete CLI documentation formatted as markdown, including all the provided commands and options:

## Local Commands

Use local commands to create and manage functions locally.

### faas new

Create a new local function in the specified language.

**Syntax:**

```bash
faas new <local-fn-name> [--lang rust|js]
```

**Default:**

- `--lang rust`

**Examples:**

```bash
  # Create a new function in Rust
  faas new "my-rust-function"

  # Create a new function in JavaScript
  faas new "my-js-function" --lang js
```

**Options:**

```bash
  -h, --help           Help for the new command.
  --lang <rust|js>     Programming language for the function (default: rust).
```

### faas build

Build a specified local function.

**Syntax:**

```bash
faas build <local-fn-name>
```

**Examples:**

```bash
  # Build a local function
  faas build "my-function"
```

**Options:**

```bash
  -h, --help           Help for the build command.
```

### faas list

List all local functions.

**Syntax:**

```bash
faas list
```

**Examples:**

```bash
  # List all local functions
  faas list
```

**Options:**

```bash
  -h, --help           Help for the list command.
```

### faas info

Get information about a local function.

**Syntax:**

```bash
faas info <local-fn-name>
```

**Examples:**

```bash
  # Get information about a local function
  faas info "my-function"
```

**Options:**

```bash
  -h, --help           Help for the info command.
```

### faas execute

Execute a local function using the specified data file.

**Syntax:**

```bash
faas execute <local-fn-name> --data <data-file>
```

**Examples:**

```bash
  # Execute a local function with data from a JSON file
  faas execute "my-function" --data data.json
```

**Options:**

```bash
  -h, --help           Help for the execute command.
  --data <data-file>   JSON file containing data to be passed to the function.
```

### faas delete

Forcefully delete a local function.

**Syntax:**

```bash
faas delete <local-fn-name> --force
```

**Examples:**

```bash
  # Forcefully delete a local function
  faas delete "my-function" --force
```

**Options:**

```bash
  -h, --help           Help for the delete command.
  -f, --force          Force the deletion of the function.
```

### faas run

Run a local function in standalone mode.

**Syntax:**

```bash
faas run <local-fn-name>
```

**Examples:**

```bash
  # Run a local function in standalone mode
  faas run "my-function"
```

**Options:**

```bash
  -h, --help           Help for the run command.
```

## Remote Commands

Use remote commands to deploy and manage commands on the remote server.

### faas remote deploy

Deploy a built local function to a remote server.

**Syntax:**

```bash
faas remote deploy <local-fn-name>
```

**Examples:**

```bash
  # Deploy a built local function to a remote server
  faas remote deploy "my-function"
```

**Options:**

```bash
  -h, --help           Help for the deploy command.
```

### faas remote execute

Execute a function on a remote server, optionally specifying a version or alias.

**Syntax:**

```bash
faas remote execute <fn-name> [<version>|<alias>] --data <data-file>
```

**Examples:**

```bash
  # Execute the latest version of a remote function with data
  faas remote execute "my-function" --data data.json

  # Execute a specific version of a remote function with data
  faas remote execute "my-function" "1.0.0" --data data.json

  # Execute a remote function by alias with data
  faas remote execute "my-function" "dev" --data data.json
```

**Options:**

```bash
  -h, --help           Help for the execute command.
  --data <data-file>   JSON file containing data to be passed to the function.
```

### faas remote list

List all functions deployed on the

 remote server.

**Syntax:**

```bash
faas remote list
```

**Examples:**

```bash
  # List all remote functions
  faas remote list
```

**Options:**

```bash
  -h, --help           Help for the list command.
```

### faas remote version list

List all versions of a specific remote function.

**Syntax:**

```bash
faas remote version list <fn-name>
```

**Examples:**

```bash
  # List all versions of a remote function
  faas remote version list "my-function"
```

**Options:**

```bash
  -h, --help           Help for the version list command.
```

### faas remote alias list

List all aliases for a specific remote function.

**Syntax:**

```bash
faas remote alias list <fn-name>
```

**Examples:**

```bash
  # List all aliases for a remote function
  faas remote alias list "my-function"
```

**Options:**

```bash
  -h, --help           Help for the alias list command.
```

### faas remote alias update

Update or set aliases for a function specifying versions and their relative weights.

**Syntax:**

```bash
faas remote alias update <fn-name> <alias-name> --version <version> --weight <weight> [...]
```

**Examples:**

```bash
  # Set or update an alias for a function with multiple version weights
  faas remote alias update "my-function" "stable" --version 1.0.0 --weight 0.5 --version 2.0.0 --weight 0.5
```

**Options:**

```bash
  -h, --help            Help for the alias update command.
  --version <version>   Specify the function version.
  --weight <weight>     Specify the weight for the version.
```

### faas remote alias info

Get detailed information about a specific alias of a function.

**Syntax:**

```bash
faas remote alias info <fn-name> <alias-name>
```

**Examples:**

```bash
  # Get information about an alias of a function
  faas remote alias info "my-function" "stable"
```

**Options:**

```bash
  -h, --help           Help for the alias info command.
```

### faas remote info

Get information about a function on the remote server, optionally for a specific version.

**Syntax:**

```bash
faas remote info <fn-name> [<version>]
```

**Examples:**

```bash
  # Get information for the latest version of a function
  faas remote info "my-function"

  # Get information for a specific version of a function
  faas remote info "my-function" "1.0.0"
```

**Options:**

```bash
  -h, --help           Help for the info command.
```

### faas remote download

Download the WebAssembly (Wasm) module for a function, either the latest version or a specific version.

**Syntax:**

```bash
faas remote download <fn-name> [<version>]
```

**Examples:**

```bash
  # Download the Wasm module for the latest version of a function
  faas remote download "my-function"

  # Download the Wasm module for a specific version of a function
  faas remote download "my-function" "1.0.0"
```

**Options:**

```bash
  -h, --help           Help for the download command.
```

### faas remote delete

Delete a function or a specific version of a function on the remote server.

**Syntax:**

```bash
faas remote delete <fn-name> [<version>] --force
```

**Examples:**

```bash
  # Delete all versions of a function on the remote server
  faas remote delete "my-function" --force

  # Delete a specific version of a function on the remote server
  faas remote delete "my-function" "1.0.0" --force
```

**Options:**

```bash
  -h, --help           Help for the delete command.
  -f, --force          Force the deletion of the function.