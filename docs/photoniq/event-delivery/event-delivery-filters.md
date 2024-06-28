---
sidebar_position: 60
title: Event Delivery Filters
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

PhotonIQ Event Delivery offers advanced filtering capabilities, allowing users to specify the exact events they want to receive. By leveraging PostgreSQL `SELECT` statement syntax, users can create filters that customize the event stream to their needs. This page outlines how to construct these queries, providing syntax guidelines, use cases, and examples.

## Filters syntax

Filters are defined in a JSON format, which includes fields to specify the desired event criteria. The fundamental structure of a filter includes:


- `action`: Specifies the filter action, such as "add" to add new filters or "remove" to remove existing filters. This is only supported for WebSockets since messages cannot be sent from the client to the server in SSE. Refer to [Dynamic filter management](#dynamic-filter-management) for more details.

- `initialData`: When set to `TRUE`, returns the original data after subscribing to a stream. When set to `FALSE`, it only subscribes without returning the original data. The default is `FALSE`.
- `compress`: Indicates if messages should be sent by the server in gz-compressed form. The default is `FALSE`.
- `once`: A boolean flag (`TRUE` or `FALSE`), indicating whether the filter should be applied just once. By defualt, it is `FALSE`. 
- `queries`: An array of SELECT statements defining the specific events to filter.

The `SELECT` syntax follows standard SQL conventions, allowing for conditions (`WHERE`), logical operators (`AND`, `OR`), and specifying particular fields or using `*` for all fields within a collection or stream.

**Example JSON filter structure**

```json
{
  "action": "add",
  "once": "FALSE",
  "initialData":"FALSE",
  "queries": [
    "select * from CollectionName where condition1",
    "select fieldName from CollectionName where condition2 OR condition3"
  ]
}
```


## Filter use cases and examples

Using event delivery queries allows for highly customizable data streams tailored to various application needs. Whether monitoring real-time updates from a specific dataset or filtering changes based on specific criteria, these queries ensure your application processes only the most relevant information.

This section demonstrates how to subscribe to and filter events using practical examples. You can interact with the PhotonIQ Event Delivery Service using `wscat` for WebSockets or `curl` for SSE. These examples highlight the flexibility of event delivery queries in EDS, allowing precise control over the data stream with SQL-like syntax and dynamic filter management to meet your specific requirements.


### Queries

To subscribe to events using EDS, send a request to the [Subscribe to Stream API](https://www.macrometa.com/docs/apiEds#/paths/ws:-api-es-v1-subscribe/get). It requires the following fields:

- **EDS host**: The host where the EDS service is running.
- **x-customer-id**: The is used to authenticate the request.
- **type**: Type of subscription (e.g., `collection`).
- **filters**:Fields to specify the desired event criteria.

:::important
Contact your Macrometa patners for your EDS host and `x-customer-id`

:::

<Tabs groupId="operating-systems">
  <TabItem value="ws-syntax" label="WebSockets">

Curl currently has no support for WebSockets, you can use [wscat](https://github.com/WebSockets/wscat) to send a request to the [Subscribe to Stream API](https://www.macrometa.com/docs/apiEds#/paths/ws:-api-es-v1-subscribe/get) via WebSockets as shown below:

```bash
  wscat -c 'wss://<eds-host>/api/es/v1/subscribe?type=collection&x-customer-id=<x-customer-id>&filters={"action": "add", "once": "FALSE", "queries": ["select fieldName from CollectionName"]}'
```

  </TabItem>
  <TabItem value="sse-syntax" label="Server-Sent Events">

Here is the syntax to send a request to the [Subscribe to Stream API](https://www.macrometa.com/docs/apiEds#/paths/ws:-api-es-v1-subscribe/get) via SSE:

```bash
  curl -X POST -H "Content-Type: application/json" -H "x-customer-id: <x-customer-id>" -d '{"type": "collection", "filters": {"once": "TRUE", "compress": "FALSE", "initialData":"TRUE", "queries": ["select fieldName from CollectionName"]}}' https://<eds-host>/api/es/sse/v1/subscribe
```
  </TabItem>
</Tabs>



**Subscribe to specific field changes**

Subscribing to specific field changes is useful when monitoring a specific attribute of a dataset for changes — such as price adjustments in a product catalog or status updates in a task tracking system. For example, an e-commerce platform might use this to update the UI in real-time when a product price changes, enhancing the customer experience.

<Tabs groupId="operating-systems">
  <TabItem value="ws-specific" label="WebSockets">

```bash
  wscat -c 'wss://<eds-host>/api/es/v1/subscribe?type=collection&x-customer-id=<x-customer-id>&filters={"action": "add", "once": "FALSE", "queries": ["select fieldName from CollectionName"]}'
```

  </TabItem>
  <TabItem value="sse-specific" label="Server-Sent Events">


```bash
  curl -X POST -H "Content-Type: application/json" -H "x-customer-id: <x-customer-id>" -d '{"type": "collection", "filters": {"once": "TRUE", "queries": ["select fieldName from CollectionName"]}}' https://<eds-host>/api/es/sse/v1/subscribe
```
  </TabItem>
</Tabs>

The above command subscribes to changes in `fieldName` within `CollectionName`. 

**Subscribe to all events in a Collection**

This is particularly beneficial for applications that need to maintain a real-time view of an entire dataset, such as a dashboard displaying the latest metrics across various data points or a live feed of social media posts. For example, a monitoring tool could use this to alert operators of any changes across all monitored systems, ensuring swift response to incidents.

<Tabs groupId="operating-systems">
  <TabItem value="ws-all" label="WebSockets">

```bash
  wscat -c 'wss://<eds-host>/api/es/v1/subscribe?type=collection&x-customer-id=<x-customer-id>&filters={"action": "add", "once": "FALSE", "queries": ["select fieldName from CollectionName"]}'
```
  </TabItem>
  <TabItem value="sse-all" label="Server-Sent Events">

```bash
  curl -X POST -H "Content-Type: application/json" -H "x-customer-id: <x-customer-id>" -d '{"type": "collection", "filters": {"once": "TRUE", "queries": ["select fieldName from CollectionName"]}}' https://<eds-host>/api/es/sse/v1/subscribe
```
  </TabItem>
</Tabs>

This command subscribes to all changes within `CollectionName`. 

**Conditional Subscription**

Conditional subscription is ideal for situations where events are only relevant under certain conditions, reducing noise and focusing on significant data changes. For example, in a logistics application, this could be used to alert users only when shipments are delayed by more than a day or when inventory levels fall below a critical threshold, enabling timely decision-making.


<Tabs groupId="operating-systems">
  <TabItem value="ws-all" label="WebSockets">

```bash
  wscat -c 'wss://<eds-host>/api/es/v1/subscribe?type=collection&x-customer-id=<x-customer-id>&filters={"action": "add", "once": "FALSE", "queries": ["select specificField from CollectionName where condition"]}'
```
  </TabItem>
  <TabItem value="sse-all" label="Server-Sent Events">

```bash
  curl -X POST -H "Content-Type: application/json" -H "x-customer-id: <x-customer-id>" -d '{"type": "collection", "filters": {"once": "TRUE", "queries": ["select specificField from CollectionName where condition"]}}' https://<eds-host>/api/es/sse/v1/subscribe
```
  </TabItem>
</Tabs>

The command above subscribes to changes in `specificField` when `condition` is met. 

### Dynamic filter management

Filters can be dynamically added or removed after the initial subscription is made by sending a message on the WebSocket connection in JSON format. This flexibility allows users to adapt to changing requirements or focus areas without needing to establish a new connection or subscription.

**Removing filters**: Removing filters is useful in scenarios where the relevance of certain data changes over time. For instance, in a financial application, you might remove filters related to stock prices of specific companies after the market closes or when a trading decision has been made. This helps in focusing resources and attention on other relevant data streams without disruption.

To remove a filter from an existing subscription, use this command:

```json
{"action": "remove", "queries": ["select * from CollectionName where condition"]}
```

**Adding filters**: Adding new filters is particularly valuable when new information requirements arise, such as tracking additional metrics or focusing on a new set of data points. For example, in an IoT application monitoring environmental sensors, you might add filters to track temperature fluctuations in additional rooms or buildings as they become areas of interest, enabling tailored alerts and data analysis without interrupting the existing data flow. To add new filters to an existing subscription, use this command:

```json
{"action": "add", "once": "FALSE", "queries": ["select fieldName from CollectionName", "select anotherField from CollectionName where condition"]}
```
