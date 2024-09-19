---
sidebar_position: 6
title: Functions CLI Commands
---

PhotonIQ Functions provides a powerful [CLI tool](https://www.npmjs.com/package/@macrometa/faas) that enables you to develop, manage, and execute functions both locally and on remote servers from your terminal. This CLI streamlines the process of creating, testing, debugging, and deploying functions, providing an efficient and integrated workflow for developers.

The PhotonIQ Functions CLI tool is divided into two main command sets:

- **Local commands**: Interact with a local instance of the PhotonIQ Functions service running on your machine. These commands are ideal for developing, testing, and debugging functions.
- **Remote commands**: Manage and interact with functions deployed on the PhotonIQ Functions remote server.


:::important
### Rule of Thumb

For commands that accept `<function-name>`, follow these guidelines:

- **When inside the function’s directory or if you only have one function**, you can simply run:
  ```bash
  faas <command>
  
  # Example:
  faas build
  ```

- **When outside the function’s directory or if you have multiple functions**, specify the function name:
  ```bash
  faas <command> <function-name>

  # Example:
  faas build <function-name>
  ```

:::



## Local CLI Commands

To use local commands, run:

```bash
faas <COMMAND>
```

### `faas new [flags]`

The `new` command initializes a new function project in a specified language or framework. The available options are JavaScript, Rust, and Next.js, with Rust as the default. This command generates a project directory pre-configured with example functions to help you get started. For detailed information on each language, see [Using Functions](03-developing-functions/index.md).

```bash
faas new <function-name> 
```

**Flags**

- `--lang`

Select a language/framework the function should be created in.

```bash
faas new <function-name> --lang js
faas new <function-name> --lang rust
faas new <function-name> --lang nextjs
```

### `faas build`

The `build` command compiles a function, preparing it for testing. Note that JavaScript functions do not require a build process.

```bash
faas build <function-name> 
```   

### `faas list`

Displays all functions currently available on your local server.


```bash
faas list
```     

### `faas info`

Retrieves metadata for a specific function on the local server.

```bash
faas info <function-name> 
``` 

### `faas run`

Runs a function on a local instance that simulates the PhotonIQ Functions remote server.

```
faas run <function-name> 
```

### `faas execute [flags]`

Executes a local function with optional data or headers passed during the call.


```bash
faas execute <function-name> 
```

**Flags** 

- `--file`

Executes the function using data from a specified JSON file.

- `--data`

Executes the function with inline data.

- `--header`

Executes the function with HTTP headers.

```bash
faas execute <function-name> --file <data-file>       
faas execute <function-name> --data '<your-data>'     
faas execute <function-name> --header 'key1: value1' 
```

### `faas delete [flags]`

Removes a function from the local server.

```bash
faas delete <function-name> 
```

```

### `faas login`

Log in to the PhotonIQ Functions service with the approprate credentials for your server (API_URL and API_KEY).

```bash
faas login 
```

**Flags**

- `--force`

Force the deletion of a function. 

```
faas delete <function-name> --force
```

### `faas help`
Displays available commands and usage instructions for  the local and remote server.

```bash
faas --help
faas -h
faas remote --help
faas remote -h
```

:::tip
Every command will also accept the `-h` or `--help` flag to see help for that command.
:::


## Remote CLI Commands

To use remote commands, run:

```bash
faas remote <COMMAND>
```

### `faas remote deploy`

Deploys a locally built function to the PhotonIQ Functions remote server.

```bash
faas remote deploy <function-name>
```

### `faas remote execute`

Executes a function deployed on the remote server. The latest version is executed by default, but you can specify a version or alias.

```bash
faas remote execute <function-name>
faas remote execute <function-name> [<version>|<alias>] 
```

**Flags**

- `--data`

Passes data to the function from a JSON file for execution.

```bash
  # Execute the latest version of a remote function with data
  faas remote execute <function-name> --file data.json

  # Execute a specific version of a remote function with data
  faas remote execute <function-name> "1.0.0" --file data.json

  # Execute a remote function by alias with data
  faas remote execute <function-name> "dev" --file data.json
```

### `faas remote list`

Displays all functions currently deployed on the remote server.

```bash
faas remote list
```

### `faas remote version list`

Shows all available versions of a specific remote function.

```bash
faas remote version list <function-name>
```

### `faas remote alias list`

Lists all aliases associated with a specific function.

```bash
faas remote alias list <function-name>
```

### `faas remote alias update`

Sets or updates an alias for a function, allowing management of multiple versions with relative weights.

```bash
faas remote alias update <function-name> <alias-name> --version <version> --weight <weight>
```
**Flags**

- `--version`

Specifies the function version for the alias.

- `--weight`

Assigns a relative weight to the function version for load balancing.

```bash
faas remote alias update <function-name> <alias-name> --version <version> --weight <weight> 

# [Example ]Set or update an alias for a function with multiple version weights
faas remote alias update "my-function" "stable" --version 1.0.0 --weight 0.5 --version 2.0.0 --weight 0.5
```

### `faas remote alias info`

Retrieves detailed information about a specific alias for a function.

```bash
faas remote alias info <function-name> <alias-name>
```

### `faas remote info`

Provides information about a function on the remote server. If no version is specified, details for the latest version are returned.


```bash
faas remote info <function-name> [<version>]
```

### `faas remote download`

Download the WebAssembly (WASM) module for a function. By default, it downloads the latest version.

```bash
faas remote download <function-name> [<version>]
```

### `faas remote delete`

Deletes a function or a specific version from the remote server.


```bash
faas remote delete <function-name> 
faas remote delete <function-name> [<version>] 
```
**Flags**

- `--force`

Force delete a function version or a specific version of the function on the remote server.

```bash
faas remote delete <function-name>  --force
faas remote delete <function-name>  [<version>] --force
```


