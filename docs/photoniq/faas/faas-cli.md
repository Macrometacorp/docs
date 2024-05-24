---
sidebar_position: 10
title: FaaS CLI
---

The easiest way to interact with FaaS is through the PhotonIQ FaaS CLI, which is supported on multiple platforms. You can pick and install the CLI for your specific platform from this page [FaaS CLI Installation](faas-cli-install.md).

## CLI Commands
Our CLI provides two sets of commands: `local` and `remote`. The key difference is that local commands are used to work with an instance of a local server running on your machine, allowing you to test and debug functions before deploying them on the PhotonIQ platform. Remote commands, on the other hand, are used to interact with the PhotonIQ platform. 

### Local CLI Commands

To use `local` commands, run:
```bash
faas <COMMAND>
```
Local commands table:

| Command   | Description                                                                                   |
|-----------|-----------------------------------------------------------------------------------------------|
| `build`   | Build a PhotonIQ FaaS function from a specified local template.                                |
| `delete`  | Remove a specified PhotonIQ FaaS function from the local server.                               |
| `execute` | Trigger execution of a specified PhotonIQ FaaS function on the local server.                   |
| `info`    | Display metadata of a specified function on the local server.                                  |
| `list`    | Show all PhotonIQ FaaS functions currently deployed on the local server.                       |
| `new`     | Create a new PhotonIQ FaaS function using a predefined template.                               |
| `remote`  | Manage and interact with PhotonIQ FaaS functions deployed on a remote server.                  |
| `run`     | Launch a specified function on a local, simulated version of the PhotonIQ FaaS server.         |
| `help`    | Print this message or the help of the given subcommand(s).                                     |

### Remote CLI Commands

To use `remote` commands, run:
```bash
faas remote <COMMAND>
```
Remote commands table:

| Command   | Description                                                                                   |
|-----------|-----------------------------------------------------------------------------------------------|
| `alias`   | Configure or modify aliases used to reference functions on a remote server.                   |
| `delete`  | Remove a specified PhotonIQ FaaS function from the remote server.                             |
| `deploy`  | Deploy a specified PhotonIQ FaaS function to a remote server for execution and availability.  |
| `download`| Retrieve the WebAssembly (wasm) file of a specific function from a remote server.             |
| `execute` | Trigger execution of a specified PhotonIQ FaaS function on the remote server.                 |
| `info`    | Display metadata of a specified function on the remote server.                                |
| `list`    | Show all PhotonIQ FaaS functions currently deployed on the remote server.                     |
| `logs`    | Display the function logs from the last hour until now from a remote server.                  |
| `version` | Handle version control and view version history for functions deployed on a remote server.    |
| `help`    | Print this message or the help of the given subcommand(s).     
