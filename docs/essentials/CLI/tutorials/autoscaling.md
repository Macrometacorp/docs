# Overview

Macrometa Command Line Interface (CLI) is a command line interface that enables developers to:

1. Deploy serverless microservices and functions.
2. Script serverless workflows via GitHub.
3. Easily learn commands with consistent verbs, nouns, and flags.

## Prerequisites

* Install Node.js and npm. We recommend using a version manager such as [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) (Node Version Manager).

## Install `gdnsl`

`gdnsl` is built with Node.js and installable via npm:

```bash
npm install -g gdnsl
# You will need a gdnsl.yaml file to connect to the Macrometa GDN. Execute the `init` command to create the yaml file in local directory.
gdnsl init
```

### Sample gdnsl.yaml:
    ```yaml
    url: gdn.paas.macrometa.io
    tenant: demo@macrometa.io
    apikey: "xxxxxxx"
    regions: [ ] # Valid values - LOCAL, ALL, comma separated list of regions.
    ```

## Usage

Macrometa serverless client executable options:

```bash
  -h, --help                 Help for gdnsl
  -c, --config string        gdnsl config file (default is ./gdnsl.yaml)  
  -v, --version              Prints the client version
```