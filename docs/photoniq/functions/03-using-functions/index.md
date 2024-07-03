---
title: Using Functions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PhotonIQ functions eliminate the need to deploy and maintain servers by providing all necessary resources to keep your applications running smoothly. This allows you to focus on writing less code and managing fewer infrastructure components, resulting in significant cost savings. PhotonIQ functions allow you to implement your system's logic using event-driven, ready-to-use blocks of code called "functions."


:::important
PhotonIQ functions support Rust and JavaScript environments.
:::

## Create a new function

Before you begin, [set up the functions CLI](../functions-quickstart.md#prerequisite) on your server. To create a new function, use the `faas new` command:

```bash
faas new <function_name>
```

By default, functions are created in Rust. To create functions in specific languages, follow the steps below for each language.


<Tabs groupId="operating-systems">
<TabItem value="rust" label="Rust">

To create a Rust function, run this command in the CLI package directory:


```bash
faas new <function_name> --lang rust
```

This command generates a new `functions/<function_name>` directory with the following template files:

```
functions/
└── <function_name>/
    ├── src/
    │   └── main.rs
    ├── Cargo.toml
    └── photoniq.toml
```
- `main.rs`: Contains the function's code.
- `photoniq.toml`: Contains the function's configuration settings. Refer to [Configuring Functions](configuring-functions.md) for more details.

Here is the default sample of the `main.rs` file:

```rust title='main.rs'
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


**Functions structure**

In the `main.rs` file, the function is defined in the function handler as follows:

```rust
#[function_handler]
fn handler(_req: HttpRequest) -> Result<HttpResponse> {
    < WRITE YOUR FUNCTION HERE >
}
```

You can replace the default function with your custom code. Each Rust function includes the following components:

- `_req: HttpRequest`: An HTTP request triggered by an event and sent to a server in any of PhotonIQ's Global CDN.
- `Result<HttpResponse>`: The response returned from the server.
- `HttpResponseBuilder`: A crate that helps you build various response types, allowing for customizations to fit your unique use cases.

</TabItem>

<TabItem value="js" label="Javascript">

To create a Javascript function, run this command in the CLI package directory:


```bash
faas new <function_name> --lang js
```

This command generates a new `functions/<function_name>` directory with the following template files:

```
functions/
└── <function_name>/
    ├── index.js
    └── photoniq.toml
```
- `index.js`: Contains the function's code.
- `photoniq.toml`: Contains the function's configuration settings. Refer to [Configuring Functions](configuring-functions.md) for more details.

Here is the default sample of the `index.js` file:

```js title='index.js'
addEventListener("handler", (event) => {
  let response = `PhotonIQ FaaS function is working => Env Var MESSAGE = ${MESSAGE}`;

  // Log messages with the following methods: error, warn, info, debug, trace
  log.error(`[${file_line()}] Log an [ERROR] message`);

  return event.respondWith(new HttpResponseBuilder().body(response).build());
});

```

**Functions structure**

In the `index.js` file, the function is defined in the function handler as follows:

```js
addEventListener("handler", (event) => {
 <WRITE YOUR FUNCTION HERE>
});
```
Each PhotonIQ function includes a `handler` event listener, where you can write your custom code. This listener is triggered by an `HTTP` request sent to the URL defined in the `photoniq.toml` file. Inside the handler, you can build a response using the `HttpResponseBuilder` and log messages at different levels (error, warn, info, debug, trace).

</TabItem>
</Tabs>

Now that you,ve created your function, proceed to defining your [function configurations](configuring-functions.md).