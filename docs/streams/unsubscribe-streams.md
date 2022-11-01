---
sidebar_position: 80
title: Unsubscribe from Streams
---

This page explains how you can unsubscribe from streams in Macrometa.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="api-py" label="API - Python">

Use our interactive API Reference with code generation in 18 programming languages to [Delete All Subscriptions](https://macrometa.com/docs/api#/operations/DeleteAllSubscriptions) from a stream or [Remove a Subscription](https://macrometa.com/docs/api#/operations/DeleteSubscription).

```py
import requests

# Constants
URL = "api-gdn.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "streamQuickstart"
IS_GLOBAL = True # For a global stream pass global=true and global=false for local stream
API_KEY = "XXXXX" # Use your apikey here
AUTH_TOKEN = f"apikey {API_KEY}" # apikey keyword needs to be appended

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Delete subscription
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{stream_type}s.{STREAM_NAME}/subscriptions/{CONSUMER_NAME}?global=true"
resp = session.delete(url)
print("Subscription deleted: ", resp.text)
```

</TabItem>
<TabItem value="api-js" label="API - JS">

Use our interactive API Reference with code generation in 18 programming languages to [Delete All Subscriptions](https://macrometa.com/docs/api#/operations/DeleteAllSubscriptions) from a stream or [Remove a Subscription](https://macrometa.com/docs/api#/operations/DeleteSubscription).

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (url, apiKey) {
    this._url = url;
    this._headers.authorization = `apikey ${apiKey}`; // apikey keyword needs to be appended
  }

  _handleResponse (response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  }

  req (endpoint, { body, ...options } = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      fetch(self._url + endpoint, {
        headers: self._headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options
      }).then((response) => self._handleResponse(response, resolve, reject));
    });
  }
}

const apiKey = "XXXXX"; // Use your apikey here
const federationName = "api-gdn.paas.macrometa.io";
const federationUrl = `https://${federationName}`;

const stream = "streamQuickstart";
const isGlobal = true;

let prefixText = ""

if (isGlobal)
  prefixText = "c8globals."
else
  prefixText = "c8locals."

const run = async function () {
  const connection = new APIRequest(federationUrl, apiKey);

 /* ------------------------ Unsubscribe from stream ------------------------ */

    const consumerUnsubscribe = await connection.req(
      `/_fabric/_system/_api/streams/subscription/${consumerName}`,
      {
        method: "DELETE"
      }
    );
    console.log(
      `${consumerName} unsubscribed successfully`,
      consumerUnsubscribe
    );
  } catch (e) {
    console.error(e);
  }
};

run();
```

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl streams subscription](../cli/streams-cli.md#gdnsl-streams-subscription) CLI commands to delete existing stream subscriptions.

</TabItem>
</Tabs>
