---
sidebar_position: 10
title: Javascript Function
---


## JavaScript Function
Each function includes a `fetch` event listener where users can write their code. This listener is triggered by an `HTTP` request to the URL specified in the `photoniq.toml` file. The `Response` object allows you to build various types of responses.

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