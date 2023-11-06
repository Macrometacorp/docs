---
sidebar_position: 1
title: APIs
---

Macrometa's GDN service offering is API-first. We create API calls for every task you can perform in the Macrometa platform.
We currently have two ways in which you can interact with the API: the app API reference and the docs API reference.
The first way of using the REST API is the API reference in the GDN web browser interface (app API). Use the built-in API reference to run various calls and view their input and output.

You can run API calls from our docs API reference, or alternatively through your favorite IDE, terminal, or other interfaces (docs API).

In this section, pages describe how to:

- [Run API commands from the Macrometa app API reference](run-api-commands-app.md).
- [Run API commands from the Macrometa documentation GDN API reference](run-api-commands-docs.md).

## API Authorization

You can use JSON web tokens (JWTs) or API keys to authorize API calls. We recommend using API keys.

To authorize your API call, you must prepend the appropriate prefix to your authorization token:

- JWT: `bearer <your-jwt>`
- API key: `apikey <your-api-key>`

## Unique Global URL vs. Generic

If you have a Macrometa Play account, then you can use the generic API server address: `https://api-play.paas.macrometa.io`. This address is used in most of our tutorials and getting started examples in the documentation.

However, for production apps, or any account that is not on the Play tier, you must use your unique global URL.

To find your unique API URL:

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
2. Click **Network > Fabrics**.
3. Click the name of the fabric that you want to run API calls against. This is the fabric that contains the collections, streams, or other entities that are the target of your API calls.

   The **Global API Endpoint** is displayed under Global URL.

![Global API URL](/img/fabrics/global-api-endpoint.png)

You can also use the CLI command [gdnsl fabric describe](../cli/fabrics-cli#gdnsl-fabric-describe) or the API command to get [Information about a Fabric](https://www.macrometa.com/docs/api#/operations/InformationOfTheGeo-fabric) to find your global or regional fabric URLs (endpoints).
