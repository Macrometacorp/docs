---
title: FaaS CLI Commands
---

PhotonIQ offers its interactive FaaS CLI to enable you to run and manage functions from your local machine. This CLI is available for [installation on Linux, MacOS, and Windows](../02-quickstart/01-faas-cli-install.md) and grants you access to remote and local CLI commands. 

## CLI Commands

The FaaS CLI offers two sets of commands:
- `local`: Local commands work with an instance of a local server running on your machine, allowing you to create, test, and debug functions before deploying to the PhotonIQ platform.
- `remote`: These commands serve to interact with the PhotonIQ platform.


## Local CLI Commands

To use `local` commands, run:
```bash
faas <COMMAND>
```
More local commands:

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

## Remote CLI Commands

To use `remote` commands, run:
```bash
faas remote <COMMAND>
```
More remote commands:

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