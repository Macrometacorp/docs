---
sidebar_position: 9
title: Rust Functions
---

## The Rust Boilerplate Function

A basic boilerplate code for each function represents the smallest unit of a function.. It looks like this:

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
Users can add their custom code in the section marked with `<USER CODE IS WRITTEN HERE>`.

Every Rust boilerplate function contains the following:
- `_req: HttpRequest` struct: An HTTP request triggered by an event and sent to a server in any of PhotonIQ's Global CDN.
- `Result<HttpResponse>` struct: Response returned from the server
- `HttpResponseBuilder` : This crate helps you to build various response types, allowing for customizations to fit your unique use cases.

:::tip

You can find more information about these structs in the PhotonIQ FaaS SDK.

::: 

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