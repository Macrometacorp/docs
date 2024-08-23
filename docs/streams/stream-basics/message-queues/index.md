---
sidebar_position: 1
title: Message Queues
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A message queue automatically balances loads across all consumers for a given stream. Best practice is to use multiple consumers.

Each stream has a receiver queue that determines how many messages the consumer will attempt to fetch at a time. A consumer with a receiver queue of `1000` (default) attempts to process 1,000 messages from the stream's backlog upon connection. Setting the receiver queue to zero verifies that each consumer only processes one message at a time.

When you restrict the receiver queue size, you limit the potential throughput of those consumers. Decide if you prefer greater performance or greater control.

## Set a Message Queue

To use a stream as a message queue:

1. Establish a [shared subscription](../subscriptions#shared) and use the same subscription name as the other consumers.
1. Set the **receiver queue** for the consumers. 

You do this by using the following configuration settings when subscribing to a stream depending on your SDK:

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript SDK">

This example sets the receiverQueueSize to 1000

```js
// Create subscriber
stream.consumer("my-subscription", "test.macrometa.io", {
  subscriptionType: Shared,
  receiverQueueSize: 1000,
})
```

</TabItem>

<TabItem value="py" label="Python SDK">

```py
# Create subscriber
subscriber = client.subscribe(
    stream="quickStart", local=False, subscription_name="sub_1", consumer_type=CONSUMER_TYPES.SHARED, receiver_queue_size=1000
)
```

</TabItem>
</Tabs>