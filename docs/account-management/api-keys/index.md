---
sidebar_position: 10
title: API Keys
---

Most APIs today use an API Key to authenticate legitimate clients. API Keys are very simple to use from the consumer perspective:

- Get an API key from the service (in essence a shared secret).
- Add the key to an Authorization header.
- Call the API with `api-` plus your base URL. Example: `https://api-seastar-9b9d9999.paas.macrometa.io/`

API keys never expire.

You can add attributes to API keys to limit access to collections and documents. For more information about attributes, refer to [Attributes](../attributes/index.md).