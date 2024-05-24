---
sidebar_position: 20
title: FaaS CLI Installation
---

This page explains how to install the PhotonIQ FaaS command line interface (CLI).

To update the CLI, follow the same procedure to install the new version over the old.

Refer to the section that matches your operating system.

### MacOS

1) Install the Rust compiler and WebAssembly libraries by executing the following commands. This is required for creating Rust functions:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi
```

2) Execute the following script to download and set up the tool. This script will automatically install the `faas` CLI tool within in the current directory:

```shell
curl -fsSLk 'https://macrometacorp.github.io/photoniq-faas/photoniq-faas-cli-macos-v1.0.0.sh' | sh
```

3) Navigate into the directory created, and then launch the `faas` CLI tool:

```shell
cd photoniq-faas-cli
./faas help
```

You can now run [FaaS CLI Commands](faas-cli-commands.md).

### Windows

***Prerequisites:***
Install Microsoft Build Tools [Download C++ build tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
In the installation menu select Desktop development with C++ (This is enough to compile Rust functions)

1) Install WebAssembly libraries by executing the following command. This is required for creating Rust functions:

```shell
rustup target add wasm32-wasi
```

2) Download the `.zip` file from the link provided below and extract its contents:

```shell
mkdir photoniq-faas-cli
curl -fsSLk "https://macrometacorp.github.io/photoniq-faas/photoniq-faas-cli-windows-v1.0.0.zip" -o photoniq-faas-cli-windows-v1.0.0.zip
tar -xf photoniq-faas-cli-windows-v1.0.0.zip -C photoniq-faas-cli --strip-components=1
```

3) Navigate into the directory created, incorporate the necessary Rust libraries, and then launch the `faas` CLI tool:

```shell
cd photoniq-faas-cli
faas help
```

You can now run [FaaS CLI Commands](faas-cli-commands.md).

### Linux

1) Install the Rust compiler and WebAssembly libraries by executing the following commands. This is required for creating Rust functions:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi
```

2) Execute the following script to download and set up the tool. This script will automatically install the `faas` CLI tool within in the current directory:

```shell
curl -fsSLk 'https://macrometacorp.github.io/photoniq-faas/photoniq-faas-cli-linux-v1.0.0.sh' | sh
```

3) Navigate into the directory created, and then launch the `faas` CLI tool:

```shell
cd photoniq-faas-cli
./faas help
```

You can now run [FaaS CLI Commands](faas-cli-commands.md).
