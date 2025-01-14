---
sidebar_position: 3
title: Developing Functions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PhotonIQ Functions allow you to implement system logic with ready-to-use code blocks  of code called "functions." These functions provide the resources needed to keep your applications running smoothly, allowing you to focus on writing less code and managing fewer infrastructure components—leading to significant cost savings.


## Create a new function

Before you begin, [set up the functions CLI](../functions-quickstart.md#prerequisite) on your server. To create a new function, use the following command:

```bash
faas new <function_name>
```

By default, functions are created in Rust.

:::tip
PhotonIQ Functions currently support building source code in Next.js, Rust, and JavaScript environments. Select your preferred language/framework below to to learn how to develop PhotonIQ functions.
:::


<Tabs groupId="operating-systems">

<TabItem value="nextjs" label="Next.js">

To create a Next.js function, run this command:


```bash
faas new <function_name> --lang nextjs
```

This command scaffolds a new Next.js app in the `functions/<function_name>` directory. It also generates a `photoniq-faas-sdk` directory. 

The Next.js app contains a pre-defined template function code for Javascript and Typescript in `/src/app/api/pingjs/route.js` and `/src/app/api/pingts/route.ts` respectively. Visit the [quickstart guide](../functions-quickstart.md) to test the result of this default function.

PhotonIQ Functions support Typescript and Javascript functions using Next.js. You can define a function in a file under `/src/app/api/{example}/route.js`.

To create Next.js functions, you can:

- Export a function that acts as an handler.

```javascript title='api/{example}/route.js'
export function GET(req) {
  return new Response('[GET] PhotonIQ FaaS function is working. Hello, PhotonIQ Next.js Functions is working', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

- Use [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)  to create custom request handlers for a given route.

```typescript title='api/{example}/route.ts'
export function GET(request: Request) {
  return new Response('[GET] PhotonIQ FaaS function is working  for Next.js.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

After defining the function, use the `faas build  <function_name>` and `faas run  <function_name>` command to build and run the function on a local server respectively. For more advanced functions, visit [Creating  HTTP requests using functions](creating-http-requests-with-functions.md).

The `photoniq.toml` file  contains the function configuration settings. Refer to [Configuring Functions](../configuring-functions.md) for more details.

</TabItem>

<TabItem value="js" label="Javascript">

To create a Javascript function, run this command in the CLI package directory:


```bash
faas new <function_name> --lang js
```

This command generates a `photoniq-faas-sdk` and  a new `functions/<function_name>` directory with the following template files:

```
functions/
└── <function_name>/
    ├── index.js
    └── photoniq.toml
```

- `index.js`: Contains the function's code.
- `photoniq.toml`: Contains the function's configuration settings. Refer to [Configuring Functions](../configuring-functions.md) for more details.

To create your Javascript function in the `index.js` file:

- Set up an event handler to process incoming events. 

```js title='index.js'
addEventListener("handler", (event) => {
  let response = `PhotonIQ Function Service function is working for Javascript functions`;

 // Log messages with the following methods: error, warn, info, debug, trace
  log.error(`[${file_line()}] Log an [ERROR] message`);

  return event.respondWith(new HttpResponseBuilder().body(response).build());
});

```

Each Javascript function includes a `handler` event listener, where you can write your custom code. This listener is triggered by an `HTTP` request sent to the URL defined in the `photoniq.toml` file. Inside the handler, you can build a response using the `HttpResponseBuilder` and log messages at different levels (error, warn, info, debug, trace).

For more advanced functions, visit [Creating  HTTP requests using functions](creating-http-requests-with-functions.md).
</TabItem>
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
- `main.rs`: Contains the function code.
- `photoniq.toml`: Contains the function configuration settings. Refer to [Configuring Functions](../configuring-functions.md) for more details.

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

</Tabs>