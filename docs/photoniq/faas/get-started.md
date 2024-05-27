---
sidebar_position: 30
title: Get Started with FaaS
---

In this getting started guide, we will:

- Create a template function locally
- Build the template function locally
- Test the template function locally
- Deploy the locally developed function to a remote environment

These tasks can be performed using `API requests` or the `faas CLI`. In this guide, we will use the `faas CLI`.

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

The default function template is created in the `Rust` language. In addition to `Rust`, PhotonIQ functions also support the `JavaScript` language. The template function can be found in the functions folder at the specified path.

### Step 2 - Write Function Code
Now that the function template has been created, open the function in your preferred IDE. You can find your newly created function in the `functions` folder. The folder containing your function code and configuration will have the same name as the function, in this case, `testFunction`.

In your IDE, you should see the following code:
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

The initial part of this code with `use` commands is typical boilerplate code. You can write your custom code in the handler function:

```rust
fn handler(_req: HttpRequest) -> Result<HttpResponse> {
    <USER CODE IS WRITTEN HERE>
}
```

The trigger for this function is an HTTP request to the URL set in the `photoniq.toml` file. Here is an example of the default `photoniq.toml` settings file:

```bash
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
enabled = true
level = "INFO"

[env_vars]
MESSAGE = "Hello 👋! This message comes from an environment variable"
```

Explanation of the every field can be found on the page [FaaS Functions Structure](faas-structure.md).

### Step 3 - Test Function Locally
o test the function that we have created, we first need to build it using the build command:
```bash
./faas build testFunction
```
If the function is successfully built, you will see the following message:
```
Function 'testFunction' has been successfully built!
```
Next, start the test server locally with the following command:
```bash
./faas run testFunction
```
You will receive a message indicating that the server has started locally:
```bash
Starting local PhotonIQ FaaS server for route:
    [POST] http://127.0.0.1:8080/testFunction
Run a command in another window: './faas execute testFunction'
```

As mentioned, open a new terminal window and run the `execute` command:
```bash
./faas execute testFunction
```

The template code in `testFunction` will run, and you will see the following message:
```bash
PhotonIQ FaaS function is working!

Env Var MESSAGE = Hello 👋! This message comes from an environment variable
```

### Step 4 - Deploy Function and Execute Remotely

#### Before You Begin
Work with Macrometa personnel to get credentials and access to remote PhotonIQ server.
Collect information you will need:
- **API_KEY**
- **URL**

#### Deploying Functions to Remote PhotonIQ Server
Now that we know the function is working locally, we can deploy it to the remote PhotonIQ server:
```bash
./faas remote deploy testFunction
```
Once the function is deployed, you can execute the remote function using the `remote execute` command:
```bash
./faas remote execute testFunction
```

:::note
If you have not set up your remote environment before, you will be prompted to input your **API_KEY** and **API_URL** when running any remote command.
:::

