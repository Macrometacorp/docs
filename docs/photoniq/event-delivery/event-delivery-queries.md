---
sidebar_position: 60
title: Event Delivery Queries
---

PhotonIQ Event Delivery offers powerful filtering capabilities that allow users to specify exactly which events they want to receive. By using PostgreSQL SELECT statement syntax, users can define filters to tailor the event stream to their needs. This page outlines how to construct these queries, providing syntax guidelines, use cases, and examples.

## Syntax

Filters are defined in a JSON format string, which includes fields to specify the desired event criteria. The fundamental structure of a filter includes:

- `action`: Defines the filter action, such as "add" for adding new filters or "remove" for removing existing filters.
- `once`: A boolean flag (`TRUE` or `FALSE`), indicating whether the filter should be applied just once. The default is `FALSE`.
- `queries`: An array of SELECT statements defining the specific events to filter.

The SELECT syntax follows standard SQL conventions, allowing for conditions (`WHERE`), logical operators (`AND`, `OR`), and specifying particular fields or using `*` for all fields within a collection or stream.

**Example JSON Filter Structure**

```json
{
  "action": "add",
  "once": "FALSE",
  "queries": [
    "select * from CollectionName where condition1",
    "select fieldName from CollectionName where condition2 OR condition3"
  ]
}
```

## Use Cases and Examples

In practice, leveraging event delivery queries allows for highly customizable data streams, catering to a wide array of application needs. Whether you're monitoring real-time updates from a specific dataset or listening for changes that meet particular criteria, these queries empower you to streamline data reception, ensuring your application only processes the most relevant information. To demonstrate the practical application of these filters, this section explores how to subscribe to and filter events using examples that mimic real-world scenarios.

To interact with the PhotonIQ Event Delivery Service, you must use a tool that supports WebSocket connections, as traditional HTTP clients like `curl` do not accommodate the WebSocket protocol. These examples  use `wscat`, a command-line tool for connecting to WebSocket servers.

These examples illustrate the versatility of event delivery queries in EDS, enabling precise control over the data stream to suit diverse application needs. Through the use of SQL-like syntax and dynamic filter management, you can efficiently tailor the event delivery to your specific requirements.

### Subscribing to Events

To subscribe to events, clients use a WebSocket-based API, specifying the type of subscription (e.g., `collection`) and the filters in JSON format.

**Subscribe to Specific Field Changes**:

```bash
wscat -c 'wss://your-eds-domain/api/es/v1/subscribe?type=collection&filters={"action": "add", "once": "FALSE", "queries": ["select fieldName from CollectionName"]}'
```

This subscribes to changes in `fieldName` within `CollectionName`. This approach is useful when you're interested in monitoring a specific attribute of a dataset for changes—such as price adjustments in a product catalog or status updates in a task tracking system. For instance, an e-commerce platform might use this to update the UI in real-time when a product price changes, enhancing the customer experience.

**Subscribe to All Events in a Collection**:

```bash
wscat -c 'wss://your-eds-domain/api/es/v1/subscribe?type=collection&filters={"action": "add", "once": "FALSE", "queries": ["select * from CollectionName"]}'
```

This command subscribes to all changes within `CollectionName`. This is particularly beneficial for applications that need to maintain a real-time view of an entire dataset, such as a dashboard displaying the latest metrics across various data points or a live feed of social media posts. For example, a monitoring tool could use this to alert operators of any changes across all monitored systems, ensuring swift response to incidents.

**Conditional Subscription**:

```bash
wscat -c 'wss://your-eds-domain/api/es/v1/subscribe?type=collection&filters={"action": "add", "once": "FALSE", "queries": ["select specificField from CollectionName where condition"]}'
```

Subscribes to changes in `specificField` when `condition` is met. This method is ideal for situations where events are only relevant under certain conditions, reducing noise and focusing on significant data changes. For example, in a logistics application, this could be used to alert users only when shipments are delayed by more than a day or when inventory levels fall below a critical threshold, enabling timely decision-making and action.

### Dynamic Filter Management

Filters can be dynamically added or removed after the initial subscription is made by sending a message on the WebSocket connection in JSON format. This flexibility allows users to adapt to changing requirements or focus areas without needing to establish a new connection or subscription.

**Removing Filters**:

```json
{"action": "remove", "queries": ["select * from CollectionName where condition"]}
```

This command removes a filter from an existing subscription. This capability is useful in scenarios where the relevance of certain data changes over time. For instance, in a financial application, you might remove filters related to stock prices of specific companies after the market closes or when a trading decision has been made. This helps in focusing resources and attention on other relevant data streams without disruption.

**Adding Filters**:

```json
{"action": "add", "once": "FALSE", "queries": ["select fieldName from CollectionName", "select anotherField from CollectionName where condition"]}
```

This operation adds new filters to an existing subscription. It's particularly valuable when new information requirements arise, such as tracking additional metrics or focusing on a new set of data points. For example, in an IoT application monitoring environmental sensors, you might add filters to track temperature fluctuations in additional rooms or buildings as they become areas of interest, enabling tailored alerts and data analysis without interrupting the existing data flow.
