---
sidebar_position: 10
title: Javascript Function
---


## JavaScript Function
Each function includes a `handler` event listener where users can write their code. This listener is triggered by an `HTTP` request to the URL specified in the `photoniq.toml` file. The `Response` object allows you to build various types of responses.

This is the basic boilerplate code required for each function. Users can add their custom code in the section marked with `<USER CODE IS WRITTEN HERE>`.
```js
addEventListener("handler", (event) => {
  <USER CODE IS WRITTEN HERE>
});
```

Below is an example of a function template code:

```js
addEventListener("handler", (event) => {
  let response = `PhotonIQ FaaS function is working => Env Var MESSAGE = ${MESSAGE}`;

  // Log messages with the following methods: error, warn, info, debug, trace
  log.error(`[${file_line()}] Log an [ERROR] message`);

  return event.respondWith(new HttpResponseBuilder().body(response).build());
});
```