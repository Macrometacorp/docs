---
sidebar_position: 1
title: Installing the GDN Command Line Interface
---

The Macrometa GDN  Command Line Interface (CLI) is a command line interface that enables developers to:

1. Deploy serverless microservices and functions.
1. Script serverless workflows via GitHub.
1. Easily learn commands with consistent verbs, nouns, and flags.

This GDN Command Line Interface (CLI) provides various commands for performing many of the same actions you can perform in the GUI or API.

Let's install the GDN CLI to get started using these various commands.

## Prerequisites

Install Node.js and npm. We recommend using a version manager such as [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) (Node Version Manager).

## Install GDN CLI

`gdnsl` is built with Node.js. You can install it with `npm`. If you are on an Apple or Linux system, then you might need to use `sudo`.

```bash
npm install -g gdnsl
# You will need a gdnsl.yaml file to connect to the Macrometa GDN. Execute the `init` command to create the yaml file in local directory.
gdnsl init
```

Sample gdnsl.yaml:

  ```yaml
  url: play.paas.macrometa.io
  tenant: demo@macrometa.io
  apikey: "xxxxxxx"
  regions: [ ] # Valid values - LOCAL, ALL, comma separated list of regions.
  ```

## Update GDN CLI

To update `gdnsl`, we recommend that you completely uninstall the app and then reinstall it. Apple or Linux system users may need need to use `sudo`.

```bash
npm uninstall -g gdnsl

## now reinstall
npm install -g gdnsl
```

## Use the GDN CLI

With the CLI now installed, here are a few tasks you can perform:

- [Retrieve user account details](users-cli.md)
- [Manage API Keys](api-key-cli.md)
- [Manage billing](billing-cli.md)
- [Work with collections](collections-cli.md)
- [Manage your fabrics](fabrics-cli.md)
- [Execute queries](queries-cli.md)
- [Create, delete, and publish messages to streams](streams-cli.md)

Macrometa serverless client executable options:

```bash
  -h, --help                 Help for gdnsl
  -c, --config string        gdnsl config file (default is ./gdnsl.yaml)  
  -v, --version              Prints the client version
```
