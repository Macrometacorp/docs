---
sidebar_position: 90
title: Delete Streams
---

This page explains how you can delete streams in Macrometa.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Delete a stream.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Data > Streams**.

   Macrometa displays a list of streams and their attributes.

1. Click the trash can icon next to the stream that you want to delete.
1. Confirm your choice.

    Macrometa permanently deletes the stream. You can re-create the stream, but you cannot undo the deletion.

</TabItem>
<TabItem value="py" label="Python SDK">

You must [Install the Python SDK](../../sdks/install-sdks.md).

```py
from operator import concat
from c8 import C8Client

# Connect to GDN.
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "XXXXX" # Change this to your API key
is_local = False
prefix_text = ""
demo_stream = "streamQuickstart"

client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Get the right prefix for the stream
if is_local:
    prefix_text = "c8locals."
else:
    prefix_text = "c8globals."

def deleteStream():
    """ This function deletes a stream """
    if client.has_stream(demo_stream, local=is_local) is False:
        print("Stream does not exists")
    else:
        client.delete_stream((prefix_text + demo_stream))
        print("Stream deleted")

deleteStream()
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

You must [Install the JavaScript SDK](../../sdks/install-sdks.md) before you can run this code.

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXXX", fabricName: "_system"});
console.log("Authentication done!!...");

const stream = "streamQuickstart";
let prefixText = "";
const isLocal = false;

// Get the right prefix for the stream
if (isLocal) {
  prefixText = "c8locals.";
} else {
  prefixText = "c8globals.";
}

async function deleteMyStream () {
  if (!await client.hasStream(stream, isLocal)) {
    console.log("Stream does not exists");
  } else {
    await client.deleteStream((prefixText + stream), isLocal);
    console.log("Stream deleted");
  }
}

deleteMyStream()
```

</TabItem>
<TabItem value="api-py" label="API - Python">

Use our interactive API Reference with code generation in 18 programming languages to [Remove a stream](https://www.macrometa.com/docs/api#/operations/DeleteStream).

```py
import requests

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "streamQuickstart"
IS_GLOBAL = True # For a global stream pass global=true and global=false for local stream
API_KEY = "XXXXX" # Use your apikey here
AUTH_TOKEN = f"apikey {API_KEY}" # apikey keyword needs to be appended

prefix_text = ""
if IS_GLOBAL is True:
    prefix_text = "c8globals."
else:
    prefix_text = "c8locals."

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Delete a stream
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{prefix_text}{STREAM_NAME}?global={IS_GLOBAL}"
resp = session.delete(url)
print("\nStream Deleted: ", resp.text) 
```

</TabItem>
<TabItem value="api-js" label="API - JS">

[Remove a stream](https://www.macrometa.com/docs/api#/operations/DeleteStream).

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
const federationName = "api-play.paas.macrometa.io";
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

  /* ------------------------------ Delete stream ----------------------------- */

  try {
    await connection.req(
      `/_fabric/_system/streams/${prefixText}${stream}?global=${isGlobal}`,
      {
        method: "DELETE"
      }
    );
    console.log("Stream deleted successfully");
  } catch (e) {
    console.log("Error while deleting stream");
    throw e;
  }
}

run();
```
</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl streams delete](../../cli/streams-cli#gdnsl-streams-delete) CLI commands to delete existing streams.

</TabItem>
</Tabs>
