---
sidebar_position: 2
title: Subscribe to the Event Delivery Service (EDS)
---

The last guide walked us through [setting up a collection for streaming events in the CDN](01-setup-event-delivery-stream.md). Now we have set up a collection for receiving streams, let's demonstrate how to subscribe to the EDS to receive live updates using the [Event Delivery API](https://www.macrometa.com/docs/apiEds#/).

## Subscribe to EDS

To subscribe to events using the [Event Delivery API](https://www.macrometa.com/docs/apiEds#/):
1. [Subscribe to the stream](https://www.macrometa.com/docs/apiEds#/paths/ws:-api-es-v1-subscribe/get) by sending an API request.

:::important

Curl currently has no support for WebSockets, so we'll make this request using [wscat](https://github.com/WebSockets/wscat), a command line tool for establishing a connection and exchanging information with WebSockets.

:::

A sample subscribe API request with wscat looks like this:

```shell
wscat -c 'wss://x/api/es/v1/subscribe?type=collection&x-customer-id=cust-edsgdn&filters={"action": "add", "once": "FALSE", "initialData":"TRUE", "queries": ["select * from sample_employees where _key=\"-K7loZ_ZzH2iEdzwYfjZ3Ok\""]}' | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g"
```

**WHERE**:

- `x` : Base URL

- `wss://x/api/es/v1/subscribe?type=collection`: Endpoint for connecting and subscribing to a collection. 

- `type`: Refers to collection type

- `filters`: To control the behaviour of your events. For example setting `initialDATA` to `TRUE` returns the original data after subscribing to a stream while a `FALSE` value only subscribes without returning the original data. Learn more about [filters and their fundamental structure](../event-delivery-queries.md). 

- `queries`: SQL statements to query and get a specific subset of data from your collection. In this sample, we're selecting all data with a `key` value of `-K7loZ_ZzH2iEdzwYfjZ3Ok`.

:::note

The sed regex filter at the end removes any terminal color codes and control characters and the command works without it.

:::


2. Sending the following request returns the requested data with a `key` value of `-K7loZ_ZzH2iEdzwYfjZ3Ok` from the subscribed collection.

## Receive Live Updates from Subscribed Streams

Let's see what happens when our subscribed collection gets updated with new data. 

Change the `first_name` from 'Janenna' to 'Jenny'. 

The terminal immediately returns fresh data with the updated value of Jenny as `first_name`. 


## Publish Events to Data Stream
Unlike subscribing that occurs through a Websocket connection, publishing an event through the EDS occurs via https so we'll make the call using a `curl` command.

A sample publish event API call looks like this:

```shell
curl -X POST 'x/api/es/v1/fabric/<fabricName>/stream/<streamName>/publish?type=collection' -d '{"foo": "bar"}' -H x-customer-id=cust-edsgdn
```

