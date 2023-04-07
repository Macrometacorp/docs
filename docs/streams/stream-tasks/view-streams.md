---
sidebar_position: 50
title: View Streams
---

This page explains how you can see existing streams and view their details.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

View existing streams.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Streams**.

   Macrometa displays a list of streams and their attributes.

1. To see more details and stream statistics, click a stream name.

</TabItem>
<TabItem value="py" label="Python SDK">

View a list of existing streams.

```python
from c8 import C8Client

""" For Python SDK, you can omit https:// part of the URL """
BASE_URL = "play.paas.macrometa.io/"

""" Connect to GDN """
client = C8Client(
    protocol='https',
    host=BASE_URL,
    port=443,
    apikey='<your API key>', # Enter your API key
    geofabric="<your-fabric>" # Enter your fabric name
)

streams = client.get_streams()

print("List of streams:")
for stream in streams:
    print(f"- Name: {stream['name']}")
    print(f"  Topic: {stream['topic']}")
    print(f"  Type: {stream['type']}")
    print(f"  Status: {stream['status']}")
```

Get stats for a specific stream.

```python
from c8 import C8Client

# Define variables
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system" # Change this to your fabric
API_KEY = "your-api-key" # Change this to your API key

# Create client instance with API KEY
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Name of the stream to get information for
# Do not include the prefix
stream_name = "your-stream-name"

try:
    # Get stream stats
    stream_stats = client.get_stream_stats(stream_name)

    # Print stream stats
    print("Stream statistics for '{}'".format(stream_name))
    print("----------------------------------------")
    for key, value in stream_stats.items():
        print("{}: {}".format(key, value))
        
except c8.exceptions.StreamNotFoundError:
    print("Stream '{}' not found".format(stream_name))
    
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

View a list of existing streams.

```js
const { C8Client } = require('jsC8');

// Set up the client instance
const client = new C8Client({url: "https://play.paas.macrometa.io", 
  apiKey: "your-api-key", // Change this to your API key
  fabricName: "_system"}); // Change this to your fabric

async function getStreams() {
  try {
      const streams = await client.getStreams();
      // Stream list
      console.log(streams);
    
  } catch (e) {
    await console.log("Not able to get streams: " + e);
  }
}

getStreams();
```

Get stats for a specific stream.

```js
const { C8Client } = require('jsC8');

// Set up the client instance
const client = new C8Client({url: "https://play.paas.macrometa.io", 
  apiKey: "your-api-key", // Change this to your API key
  fabricName: "_system"}); // Change this to your fabric

  async function getStreamStats() {
    try {
      const streamName = "myStream"; // Change this to your stream, do not include the prefix
      const stats = await client.getStreamStats(streamName);
      console.log(stats);
    } catch (e) {
      console.log(`Error getting stream stats: ${e}`);
    }
  }
  
  getStreamStats();
  ```

</TabItem>
<TabItem value="api" label="REST API">

Use our interactive API Reference with code generation in 18 programming languages to:

- [Get a list of streams](https://www.macrometa.com/docs/api#/operations/ListOfStreams)
- [Get stats for a stream](https://www.macrometa.com/docs/api#/operations/Stats)
- [Get stream backlog](https://www.macrometa.com/docs/api#/operations/Backlog)

</TabItem>
<TabItem value="cli" label="CLI">

Use the following CLI commands to view existing streams:

- [gdnsl streams list](../../cli/streams-cli#gdnsl-streams-list)
- [gdnsl streams describe](../../cli/streams-cli#gdnsl-streams-describe)

</TabItem>
</Tabs>
