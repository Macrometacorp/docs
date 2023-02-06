---
sidebar_position: 25
title: Set Message Queue
---

To use a stream as a message queue:

1. Establish a [shared subscription](subscriptions.md#shared) and use the same subscription name as the other consumers. 
1. Set the **receiver queue** for the consumers.

Use the following settings to establish a message queue. Change `receiver_queue_size` to update the message limit. 

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
