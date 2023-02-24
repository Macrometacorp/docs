---
sidebar_position: 10
title: Set Message Queue
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page shows you several ways to use a stream as a message queue.

To use a stream as a message queue:

1. Establish a [shared subscription](../subscriptions#shared) and use the same subscription name as the other consumers. 
1. Set the **receiver queue** for the consumers.

When you subscribe to a stream, use the following configuration settings depending on your SDK:

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Create subscriber
subscriber = client.subscribe(
    stream="quickStart", local=False, subscription_name="sub_1", consumer_type=CONSUMER_TYPES.SHARED, receiver_queue_size=1000
)
```
</TabItem>

<TabItem value="js" label="JavaScript SDK">

```js
// Create subscriber
stream.consumer("my-subscription", "test.macrometa.io", {
  subscriptionType: Shared,
  receiverQueueSize: 1000,
}
```

</TabItem>
</Tabs>

