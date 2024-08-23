---
sidebar_position: 50
title: Create Streams
---

Create a Macrometa Stream 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Create a stream.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Streams** from your dashboard.

   Macrometa displays a list of streams and their attributes.

1. Click **New Stream**.
1. Enter a stream **Name**.
1. Select **Replication** type: **Local** or **Global**. Default is **Local**.
1. Click **Create**.

</TabItem>
<TabItem value="py" label="Python SDK">

You must [Install the Python SDK](../../sdks/install-sdks.md) before you can run this code.

```py
from operator import concat
from c8 import C8Client

# Connect to GDN.
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "xxxxxx" # Change this to your API key.
is_local = False # For a global stream pass True and False for local stream.
prefix_text = ""
demo_stream = "streamQuickstart"

client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Get the right prefix for the stream.
if is_local:
    prefix_text = "c8locals."
else:
    prefix_text = "c8globals."

# Create the stream.
def createStream():
    """ This function creates a stream """
    stream_name = {"stream-id": ""}
    # Check if stream already exists.
    if client.has_stream(demo_stream, local=is_local):
        print("Stream already exists")
        stream_name["stream-id"] = concat(prefix_text, demo_stream)
        print ("OLD Producer =",  stream_name["stream-id"])
    else:
        stream_name = client.create_stream(demo_stream, local=is_local)
        print ("New producer =",  stream_name["stream-id"])

createStream()
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
const isLocal = false; // For a global stream pass True and False for local stream

// Get the right prefix for the stream
if (isLocal) {
  prefixText = "c8locals.";
} else {
  prefixText = "c8globals.";
}

async function createMyStream () {
  let streamName = { "stream-id": "" };
  if (await client.hasStream(stream, isLocal)) {
    console.log("Stream already exists");
    streamName["stream-id"] = prefixText + stream;
    console.log(`OLD Producer = ${streamName["stream-id"]}`);
  } else {
    streamName = await client.createStream(stream, isLocal);
    console.log(`NEW Producer = ${streamName.result["stream-id"]}`);
  }
}

createMyStream()
```

</TabItem>
<TabItem value="api-py" label="API - Python">

Use our interactive API Reference to [Create a Stream](https://www.macrometa.com/docs/api#/operations/CreateStream).

```py
import requests

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "streamQuickstart"
API_KEY = "XXXXX" # Use your API key here
AUTH_TOKEN = f"apikey {API_KEY}" # apikey keyword needs to be appended

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create a stream
# Note:- For a global stream pass global=true and global=false for local stream
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_NAME}?global=true"
resp = session.post(url)
print("\nStream Created: ", resp.text)
```

</TabItem>
<TabItem value="api-js" label="API - JS">

Use our interactive API Reference to [Create a Stream](https://www.macrometa.com/docs/api#/operations/CreateStream).

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

const run = async function () {
  const connection = new APIRequest(federationUrl, apiKey);

  /* ------------------------------ Create stream ----------------------------- */

  try {
    await connection.req(
      `/_fabric/_system/streams/${stream}?global=${isGlobal}`,
      {
        body: { name: stream },
        method: "POST"
      }
    );
    console.log("Stream created successfully");
  } catch (e) {
    if (e.status === 409) {
      console.log("Stream already exists, skipping creation of stream");
    } else {
      console.log("Error while creating stream");
      throw e;
    }
  }
}

run();
```

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl streams create](../../cli/streams-cli#gdnsl-streams-create) CLI command to create a document collection.

</TabItem>
</Tabs>
