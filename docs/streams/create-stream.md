---
sidebar_position: 50
title: Create Streams
---

This page explains how to create streams in Macrometa.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

Create a stream.

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **Streams**.

   Macrometa displays a list of streams and their attributes.

1. Click **New Stream**.
1. Enter a stream **Name**.
1. Select **Replication** type: **Local** or **Global**. Default is **Local**.
1. Click **Create**.

</TabItem>
<TabItem value="py" label="Python SDK">

You must [Install the Python SDK](../sdks/install-sdks.md) and [Connect to the GDN](../account-management/auth/connect-to-gdn.md) before you can run this code.

```py
from c8 import C8Client
prefixText = ""
prefixBool = False
demo_stream = 'streamQuickstart'

# Get the right prefix for the stream
if prefixBool:
    prefixText = "c8locals."
else:
    prefixText = "c8globals."

def createStream():
    """ This function creates a stream """
    streamName = {"stream-id": ""}
    if client.has_stream(demo_stream, local = prefixBool):
        print("Stream already exists")
        streamName["stream-id"] = concat(prefixText, demo_stream)
        print ("OLD Producer =",  streamName["stream-id"])
    else:
        #print(client.create_stream(demo_stream, local=prefixBool))
        streamName = client.create_stream(demo_stream, local=prefixBool)
        print ("New producer =",  streamName["stream-id"])
```

</TabItem>
<TabItem value="js" label="Javascript SDK">

You must [Install the JavaScript SDK](../sdks/install-sdks.md) and [Connect to the GDN](../account-management/auth/connect-to-gdn.md) before you can run this code.

```js
// Variables
const stream = "streamQuickstart";
let prefixText = "";
const prefixBool = false;

// Get the right prefix for the stream
if (prefixBool) {
  prefixText = "c8locals.";
} else {
  prefixText = "c8globals.";
}

async function createMyStream () {
  let streamName = { "stream-id": "" };
  if (await client.hasStream(stream, prefixBool)) {
    console.log("Stream already exists");
    streamName["stream-id"] = prefixText + stream;
    console.log(`OLD Producer = ${streamName["stream-id"]}`);
  } else {
    streamName = await client.createStream(stream, prefixBool);
    console.log(`NEW Producer = ${streamName.result["stream-id"]}`);
  }
}
```

</TabItem>
<TabItem value="api-py" label="REST API - Python">

Use our interactive API Reference with code generation in 18 programming languages to [Create a Stream]([Link to API command](https://macrometa.com/docs/api#/operations/CreateStream)).

```py
# Constants
URL = "api-gdn.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "teststream"

# Create a stream
# Note:- For a global stream pass global=true and global=false for local stream
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_NAME}?global=true"
resp = session.post(url)
print("\nStream Created: ", resp.text)
```

</TabItem>
<TabItem value="api-js" label="REST API - JavaScript">

Use our interactive API Reference with code generation in 18 programming languages to [Create a Stream]([Link to API command](https://macrometa.com/docs/api#/operations/CreateStream)).

```js
const stream = "api_tutorial_streams";
const isGlobal = true;

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

```

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl streams create](../../cli/streams-cli#gdnsl-streams-create) CLI command to create a Document Store collection.

</TabItem>
</Tabs>
