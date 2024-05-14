---
sidebar_position: 30
title: Install/Update FaaS CLI
---

This page explains how to install the PhotonIQ FaaS command line interface (CLI).

To update the CLI, follow the same procedure to install the new version over the old.

Refer to the section that matches your operating system.

## Prerequisites

- [Rust](https://www.rust-lang.org/) - Most of the installations will [install Rust](https://www.rust-lang.org/tools/install) on your system if it is not already present. If you want to customize the Rust installation, you might want to do it yourself.
- (MacOS only) OpenSSL - `brew install openssl`

## MacOS

1. Install the Rust compiler and WebAssembly libraries by executing the following commands. This is required for creating Rust functions:

    ```curl
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    rustup target add wasm32-wasi
    ```

2. Run the following script to download and set up the tool. This script automatically install sthe FaaS CLI tool within in the current directory:

    ```curl
    curl -fsSLk 'https://macrometacorp.github.io/photoniq-faas/photoniq-faas-cli-macos-v1.0.0.sh' | sh
    ```

3. Navigate into the directory created, and then launch the FaaS CLI tool:

    ```cd
    cd photoniq-faas-cli
    ./faas -h
    ```

You can now run FaaS CLI 

## Windows


## Linux

