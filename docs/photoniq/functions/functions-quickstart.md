---
sidebar_position: 2
title: Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PhotonIQ Functions provides a real-time method for enterprises to create and interact with their services using the [CLI](./04-faas-commands/index.md) and [API](https://www.macrometa.com/docs/apiFaas#/) requests.

In this quickstart guide, you'll learn how to begin with PhotonIQ Functions by:
- [Creating a function](#creating-a-function)
- [Testing the function locally](#testing-the-function-locally)
- [Deploying the function to remote PhotonIQ Functions server](#deploying-the-function-to-the-remote-server)

## Prerequisite

Using the PhotonIQ Functions locally requires the CLI tool installed. Follow these steps to install or update the PhotonIQ Functions CLI for your OS:


<Tabs groupId="operating-systems">

<TabItem value="MacOS" label="MacOS">

1. Install the Rust compiler and WebAssembly libraries required for creating Rust functions with:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi
```
 2. Download the [Functions MacOS CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-x86_64-apple-darwin.tar.gz) to your local machine.

 3. Add the package directory to your PATH for the `faas` command to be globally accessible from any terminal. Launch the CLI with the `faas help` command.

</TabItem>

<TabItem value="Windows" label="Windows">

1. Install the [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/). In the installation menu select Desktop development with C++.
2. Download [Rust](https://www.rust-lang.org/tools/install).
3. Install WebAssembly libraries required for creating Rust functions with this command:

```bash
rustup target add wasm32-wasi
```
4. Download and extract the [Functions Windows CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-x86_64-pc-windows-gnu.zip).

5. Add the package directory to your system's PATH environment variable for the `faas` command to be accessible from any terminal. Launch the CLI with the `faas help` command.

</TabItem>

<TabItem value="Linux" label="Linux">

1. Install the Rust compiler and WebAssembly libraries required for creating Rust functions by executing the following command:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi
```

2. Depending on your Linux system architecture, you can download the [Functions Linux GNU CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-aarch64-unknown-linux-gnu.tar.gz) or [Functions Linux MUSL CLI package](https://macrometacorp.github.io/photoniq-faas-cli-docs/faas-1.0.0-x86_64-unknown-linux-musl.tar.gz) to your local machine.

3. Add the package directory to your system's PATH environment variable for the `faas` command to be accessible from any terminal. Launch the CLI with the `faas help` command.

</TabItem>

</Tabs>

:::tip

For more information on available commands, refer to the [Functions CLI commands](./04-faas-commands/index.md) guide.

:::


## Creating a function

1. With the PhotonIQ Functions CLI installed, create a new function named `testFunction`  with the `faas new` command:

```bash
faas new testFunction
```

If successful, a template function is created, and the following message is returned:

```bash
Template function has been created in path: functions/testFunction
Configuration can be modified in the file: functions/testFunction/photoniq.toml
```

:::note

This command generates a new `functions/testFunction` directory with the default template files. While the default function template is created in `Rust`, PhotonIQ Functions also support `Javascript`.  Refer to the [**Using Functions**](./03-using-functions/index.md) to create a Javascript function.

:::


2. Navigate to the `testFunction` directory. This directory contains the function template code (`src/main.rs`) and a configuration file (`photoniq.toml`).

```rs title="src/main.rs"
use anyhow::Result;
use photoniq_faas_sdk::{
    binding::{
        http::{HttpRequest, HttpResponse, HttpResponseBuilder},
        log,
    },
    function_handler,
};
use std::env;

#[function_handler]
fn handler(_req: HttpRequest) -> Result<HttpResponse> {
    let message = env::var("MESSAGE").unwrap_or_else(|_| String::from("Missing message"));

    let response = format!(
        "PhotonIQ FaaS function is working!

Env Var MESSAGE = {}",
        message
    )
    .to_string();

    // Log messages with the following methods: error!, warn!, info!, debug!, trace!
    log::error!("[{}:{}] Log an [ERROR] message", file!(), line!());

    Ok(HttpResponseBuilder::ok().body(response.into()).build())
}
```

```toml title="photoniq.toml"
name = "testFunction"
version = "0.0.1"
description = "Description for function testFunction"
lang = "rust"
#execute_url_suffix = "optional_url_suffix_to_execute_function"

[cors_settings]
allowed_methods = ["GET","POST"]
allowed_hosts = ["macrometa.com"]
allow_http = true

[log_settings]
enabled = truea
level = "INFO"

[env_vars]
MESSAGE = "Hello 👋! This message comes from an environment variable"
```

These files are prefilled with a template you can use for testing. The `src/main.rs` file contains the function code, and the `photoniq.toml` file contains the configuration settings. Refer to the [Using Functions](./03-using-functions/index.md) to learn more about functions file structure in Rust and Javascript.

When this test function is [executed](#testing-the-function-locally), it should return the following response as defined in the function handler:

```
PhotonIQ FaaS function is working!

Env Var MESSAGE = Hello 👋! This message comes from an environment variable
```

The `Env Var MESSAGE` is the value defined in the `photoniq.toml` file under the `[env_vars]` section.


## Testing the function locally

1. To test the function, build it using the following command:

```bash
faas build testFunction
```

Upon successful build, you will see this message:

```
Function 'testFunction' has been successfully built!
```

2. Use `faas run` to start the local test server:
```bash
faas run testFunction
```

3. Open a new terminal window and run `faas execute` to trigger the code in `testFunction`:

```bash
faas execute testFunction
```

If succesful, it returns the following response as defined in the function handler:

```
PhotonIQ FaaS function is working!

Env Var MESSAGE = Hello 👋! This message comes from an environment variable
```


## Deploying the function to the remote server

Running functions locally limits their usage to your local server. To make your functions globally available, PhotonIQ Functions uses geo-distributed GDN servers, ensuring high availability and faster performance by processing at the closest point of presence to the user. Furthermore, the [highly distributed nature of the GDN](https://www.macrometa.com/platform) means every function is georeplicated in all regions in the fabric. 

Before you proceed, [contact your Macrometa personnel](https://www.macrometa.com/contact/sales) to provide these authentication credentials for accessing the PhotonIQ remote server:
- API_KEY
- API_URL

The `faas remote` command will request these credentials on your first attempt.

1. Add the `API_URL` and `API_KEY` as enviroment variables `[env_vars]` in _phontoiq.toml_.

2. Use the  `faas remote deploy` command to deploy the function:
```bash
faas remote deploy testFunction
```

3. Once deployed, execute the remote function with this command:
```bash
faas remote execute testFunction
```

4. To delete the function from the remote server, use:

```bash
faas remote delete testFunction
```



