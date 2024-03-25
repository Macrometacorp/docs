---
sidebar_position: 15
title: Create an API Endpoint
---

Any stream worker can be used as an API endpoint.

## Create an API Endpoint

You can create a REST API endpoint from a stream worker.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Compute > Stream Workers**.
1. Write and save stream worker as described in [Create a Stream Worker](create-stream-worker.md).
1. Click **API Endpoint**.

Macrometa displays the cURL (Client URL) command that you can use in the terminal or command line to make an API call and run the query.

![API Endpoint](/img/stream-workers/api-endpoint.png)

## Stream Worker Endpoints

The generated cURL command provides an easy way to get a JavaScript Web Token (JWT) and the URL to the API endpoint. This can be especially useful to call the API for testing purposes.
