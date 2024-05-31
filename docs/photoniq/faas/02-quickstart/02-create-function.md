---
sidebar_position: 30
title: Create and Test your First Function
---

# Overview
FaaS functions offers a real-time, event-driven way for enterprises to create and interact with their services through its [FaaS CLI](../03-faas-commands/02-faas-cli.md) or via API requests. This tutorial guides you through creating, building, and testing your first function on your local machine. 


## Prerequisites
This guide requires the following to get started:
-  The FaaS CLI. Follow these [installation steps](01-faas-cli-install.md) to install for your OS.
- API_KEY for accessing the PhotonIQ remote server.


### Step 1 - Create a New Function
After installing the CLI, the first step is to create a function. You can do this with the following command:
```bash
./faas new testFunction
```

If the command executes successfully, you will receive the following message:
```bash
Template function has been created in path: functions/testFunction
Configuration can be modified in the file: functions/testFunction/photoniq.toml
```

:::note
 
Although the default function template is created in `Rust`, PhotonIQ functions also support `Javascript`. The template function is in the functions folder at the specified path. 

:::

### Step 2 - Write Function Code
Creating a function automatically creates a function template. Let's write the function code for our new function:

1. Open the newly created function in your preferred IDE.  Locate this new function in the `functions` folder. The folder containing your function code and its configuration bears the same name as your new function(`testFunction`).

Your IDE opens up to the following code:
```rust
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
}
```

:::info

The initial part of this code with `use` commands is the boilerplate code. Find out more in [structure of Rust Functions](../05-understanding-faas-functions/01-rust-function.md)

:::

2. Replace `<USER CODE IS WRITTEN HERE>` with your custom code in the handler function.

```rust
fn handler(_req: HttpRequest) -> Result<HttpResponse> {
    <USER CODE IS WRITTEN HERE>
}
```

For this tutorial, we'll replace with this simple code:

```rust
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
```

3. Our final template function looks like this:

```rust
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

Sending an HTTP request to the URL defined in the `photoniq.toml' settings file triggers this function. 

:::tip

Learn more about configuring `photoniq.toml` files

:::


A default `photoniq.toml` settings file looks like this:

```bash
name = "testFunction"
version = "0.0.1"
description = "Description for function testFunction"
lang = "rust"
execute_url_suffix = "optional_url_suffix_to_execute_function"

[cors_settings]
allowed_methods = ["GET","POST"]
allowed_hosts = ["macrometa.com"]
allow_http = true

[log_settings]
enabled = true
level = "INFO"

[env_vars]
MESSAGE = "Hello 👋! This message comes from an environment variable"
```

### Step 3 - Test Function Locally
1. To test the function that we have created, we first need to build it using the build command.
```bash
./faas build testFunction
```
After a successful build, you will see the following message:
```
Function 'testFunction' has been successfully built!
```

2. Start the local test server by running the faas run command.
```bash
./faas run testFunction
```

3. Open a new terminal window and enter the `faas execute` command. This runs the template code in our new `testFunction`.
```bash
./faas execute testFunction
```

The message below shows our code executed successfully:
```bash
PhotonIQ FaaS function is working!

Env Var MESSAGE = Hello 👋! This message comes from an environment variable
```


