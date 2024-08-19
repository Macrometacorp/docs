---
sidebar_position: 2
title: Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PhotonIQ Functions provides a real-time method for enterprises to create and interact with their services using the [CLI](functions-cli.md) and [API](https://www.macrometa.com/docs/apiFaas#/) requests.

## Prerequisite

Using the PhotonIQ Functions locally requires the CLI tool installed. Follow these steps to install or update the CLI tool:

1. Install the Rust compiler and WebAssembly libraries required for creating Rust functions with:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-wasi
```

2. Install the [NPM package for the CLI tool](https://www.npmjs.com/package/@macrometa/faas) with this command:

```bash
npm i -g  @macrometa/faas
```

3. Launch the CLI with the `faas help` command.


:::tip

For more information on available commands, refer to the [Functions CLI commands](functions-cli.md) guide.

:::

<Tabs groupId="languages">

<TabItem value="nextjs" label="Next.js">

In this quickstart guide, you'll learn how to begin with PhotonIQ Functions using Next.js by:
- [Creating a function](#create-a-function)
- [Testing the function locally](#test-the-function-locally)
- [Deploying the function to remote PhotonIQ Functions server](#deploying-the-function-to-remote-photoniq-functions-server)

## Create a function

1. To scaffold a new Next.js project with the Functions CLI, run the following command:

```bash
faas new <projectName> --lang nextjs
```

If successful, it returns a response similar to this:

```
Template function has been created in path: functions/projectName
Configuration can be modified in the file: functions/projectName/photoniq.toml
```

This command creates a `functions` and `photoniq-faas-sdk` directory. The `functions` directory contains the Next.js app you just created.

2. Navigate to the _/src/app/api_ directory in the Next.js app. By default, some template routes are defined in `pingjs/route.js` and `pingts/route.ts`. Below is an example of `pingjs/route.js`:

```javascript title="route.js"
export function GET(req) {
  return new Response('[GET] PhotonIQ FaaS function is working.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}

export function POST(req) {
  return new Response('[POST] PhotonIQ FaaS function is working.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

For this guide, we'll use the default route provided. The default route above displays the following message when accessed: `"[GET] PhotonIQ FaaS function is working"`. Modify the function as desired and follow the next steps to test the function.

## Test the function locally

1. Navigate back to the directory where you created the function and use the `faas build` command to install the required dependencies and build the Next.js app with the functions:

```bash
faas build <projectName>
```
To verify you're in the correct directory, use the `ls` command, which should list only the `functions` and `photoniq-faas-sdk` directories.

2. After the build is successful, start the local development server using the `faas run` command:

```bash
faas run <projectName> 
```

It is served on `http://localhost:8080`  by default. Open `http://localhost:8080` in your browser and test the routes you created in the function.

To test the default routes in this example guide, go to `http://localhost:8080/api/pingjs`. It displays the following message: "`[GET] PhotonIQ FaaS function is working.`"


## Deploying the function to remote PhotonIQ Functions server

Running functions locally limits their usage to your local server. To make your functions globally available, PhotonIQ Functions uses geo-distributed GDN servers, ensuring high availability and faster performance by processing at the closest point of presence to the user. Furthermore, the [highly distributed nature of the GDN](https://www.macrometa.com/platform) means every function is georeplicated in all regions in the fabric. 

Before you proceed, [contact your Macrometa personnel](https://www.macrometa.com/contact/sales) to provide these authentication credentials for accessing the PhotonIQ Functions remote server:
- API_KEY
- API_URL

The `faas remote` command will request these credentials on your first attempt.

1. Use the  `faas remote deploy` command to deploy the function:
```bash
faas remote deploy <projectName>
```

2. To check the status of the deployment, run this command:
```bash
faas remote status <projectName>
```

If successful, the response is similar to this:
```bash
version: 0.0.1
url: <function_url>
status: success
name: <projectName>
lastUpdated: 2024-08-04 16:52:35 
```
Use the `<function_url>` to access your function on the browser.

3. Once deployed, execute the remote function with this command:
```bash
faas remote execute <projectName>
```

4. To delete the function from the remote server, use:

```bash
faas remote delete <projectName>
```

</TabItem>

<TabItem value="Rust/Javascript" label="Rust/Javascript">

In this quickstart guide, you'll learn how to begin with PhotonIQ Functions by:
- [Creating a function](#creating-a-function)
- [Testing the function locally](#testing-the-function-locally)
- [Deploying the function to remote PhotonIQ Functions server](#deploying-the-function-to-remote-photoniq-functions-server-1)

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


## Deploying the function to remote PhotonIQ Functions server

Running functions locally limits their usage to your local server. To make your functions globally available, PhotonIQ Functions uses geo-distributed GDN servers, ensuring high availability and faster performance by processing at the closest point of presence to the user. Furthermore, the [highly distributed nature of the GDN](https://www.macrometa.com/platform) means every function is georeplicated in all regions in the fabric. 

Before you proceed, [contact your Macrometa personnel](https://www.macrometa.com/contact/sales) to provide these authentication credentials for accessing the PhotonIQ Functions remote server:
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
</TabItem>

</Tabs>


