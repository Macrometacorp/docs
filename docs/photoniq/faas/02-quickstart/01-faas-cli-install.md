---
sidebar_position: 9
title:  Install the FaaS CLI
---
Using the PhotonIQ FaaS CLI requires installing the CLI on your local machine. This CLI is available for installation on all major operating systems, thereby reducing friction during development and offering developers the flexibility to create and test functions. 

This guide walks you through the installation steps for MacOS, Windows, and Linux OS. 


:::info

To update the CLI with a newer version, follow the same installation procedure.

:::

## Install on MacOS

### Prerequisites

Install the Rust compiler and WebAssembly libraries by executing the following command. This is required for creating Rust functions:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi
```
### Steps

1) Download the [FaaS MacOS CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-x86_64-apple-darwin.tar.gz) to your local machine.

2) Navigate into the CLI directory, and launch the `faas` CLI tool:

```shell
./faas help
```
:::tip

Get familiar with the FaaS CLI by practicing with some of our [available commands](../03-faas-commands/03-faas-cli-commands.md).

:::

## Install on Windows

### Prerequisites

1) Install Microsoft Build Tools [Download C++ build tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/). 
In the installation menu select Desktop development with C++ (This is enough to compile Rust functions)

2) Install WebAssembly libraries by executing the following command. This is required for creating Rust functions:

```shell
rustup target add wasm32-wasi
```
### Steps

1) Download the [FaaS Windows CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-x86_64-pc-windows-gnu.zip) to your local machine.

2) Navigate into the CLI directory, and launch the `faas` CLI tool

```shell
./faas help
```

## Install on Linux

### Prerequisites

1) Install the Rust compiler and WebAssembly libraries by executing the following commands. This is required for creating Rust functions:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi
```

### Steps

1) Depending on your Linux system architecture, you can download the [FaaS Linux GNU CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-aarch64-unknown-linux-gnu.tar.gz) or [FaaS Linux MUSL CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-x86_64-unknown-linux-musl.tar.gz) to your local machine.

2) Navigate into the CLI directory, and launch the `faas` CLI tool

```shell
./faas help
```
