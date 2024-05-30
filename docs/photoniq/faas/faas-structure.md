---
sidebar_position: 9
title: Structure of a FaaS Function
---

FaaS functions can be written in `Rust` or `JavaScript`. This documentation explains the code templates and settings for these functions.

## Structure of a Rust Function

Each function receives an `_req: HttpRequest` struct and returns a `Result<HttpResponse>` struct. These structs are available in the `PhotonIQ FaaS SDK`. The `HttpResponseBuilder` crate allows you to build various types of responses.

This is the basic boilerplate code required for each function. Users can add their custom code in the section marked with `<USER CODE IS WRITTEN HERE>`.
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
    < USER CODE IS WRITTEN HERE >
}
```

Below is an example of a function template code:

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

## JavaScript Function
Functions based on JavaScript work out of the box PhotonIQ function. The service integrates a JavaScript interpreter compiled into a WebAssembly module. Currently, the interpreter we support is `quickjs` and we are working on adding new ones.

This is the basic boilerplate code required for each function. Users can add their custom code in the section marked with `<USER CODE IS WRITTEN HERE>`.
```js
addEventListener("fetch", event => {
  <USER CODE IS WRITTEN HERE>
});
```

Below is an example of a function template code:

```js
const reply = (request) => {
  return new Response("PhotonIQ FaaS function is working!");
}

// Subscribe to the Fetch event
addEventListener("fetch", event => {
  return event.respondWith(reply(event.request));
});
```

## Function Settings
All function-specific settings are defined in the photoniq.toml file.

Here is an example of settings file:
```toml
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

Here is a table explaining all the fields:

| Field                         | Description                                                                |
|-------------------------------|----------------------------------------------------------------------------|
| `name`                        | The name of the function.                                                  |
| `version`                     | The version of the function.                                               |
| `description`                 | A brief description of the function.                                       |
| `lang`                        | The programming language used to write the function.                       |
| `execute_url_suffix`          | An optional URL suffix used to execute the function.                       |
| **`cors_settings`**           | **Configuration settings for Cross-Origin Resource Sharing (CORS).**       |
| `cors_settings.allowed_methods` | HTTP methods allowed for CORS.                                            |
| `cors_settings.allowed_hosts`  | Hosts allowed to access the function.                                       |
| `cors_settings.allow_http`     | Boolean indicating if HTTP is allowed.                                      |
| **`log_settings`**            | **Configuration settings for logging.**                                    |
| `log_settings.enabled`        | Boolean indicating if logging is enabled.                                  |
| `log_settings.level`          | The log level (e.g., INFO, DEBUG).                                         |
| **`env_vars`**                | **Environment variables used by the function.**                            |
| `env_vars.MESSAGE`            | An environment variable containing a message.                              |
