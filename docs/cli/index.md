---
sidebar_position: 1
title: Command Line Interface
---

Macrometa Command Line Interface (CLI) is a command line interface that enables developers to:

1. Deploy serverless microservices and functions.
1. Script serverless workflows via GitHub.
1. Easily learn commands with consistent verbs, nouns, and flags.

You can use commands with the GDN Command Line Interface (CLI) to perform the same actions you can perform in the GUI or API.

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
  url: gdn.paas.macrometa.io
  tenant: demo@macrometa.io
  apikey: "xxxxxxx"
  regions: [ ] # Valid values - LOCAL, ALL, comma separated list of regions.
  ```

## Update GDN CLI

To update `gdnsl`, we recommend that you completely uninstall the app and then reinstall it. If you are on an Apple or Linux system, then you might need to use `sudo`.

```bash
npm uninstall -g gdnsl
```

## Usage

Macrometa serverless client executable options:

```bash
  -h, --help                 Help for gdnsl
  -c, --config string        gdnsl config file (default is ./gdnsl.yaml)  
  -v, --version              Prints the client version
```
