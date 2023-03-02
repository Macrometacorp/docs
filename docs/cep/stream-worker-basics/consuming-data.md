---
sidebar_position: 60
title: Consuming Data
---

Typically the first step  in a stream processing flow is to consume the data to be cleaned, enriched, transformed or summarized to produce the required output.

For the stream processor to consume events, the following is required.

- Message schema: To identify the messages to select for stream processing. The schema of the messages is defined via a _stream_.

- Source: The messages are consumed from different sources including streaming applications, cloud-based applications, databases, and files. The source is defined via a _source configuration_.

A source configuration consists of the following:
  
- `source.type`: This annotation defines the source type via which the messages are consumed, and allows you to configure the source parameters (which change depending on the source type). For the complete list of supported source types, see [Sources](../source/index.md).

- `map.type`: This annotation specifies the format in which messages are consumed, and allows you to configure the mapping parameters (which change based of the mapping type/format selected). For the complete list of supported mapping types, see [Source Mapping](../source/source-mapping/index.md).

- `attributes`: This annotation specifies a custom mapping based on which events to be selected into the stream processing flow are identified. This is useful when the attributes of the incoming messages you want the stream processor to consume are different to the corresponding attribute name in the stream definition.

:::tip
Say the stream processor is reading employee records. The employee name might be defined as `emp No` in the source from which you are extracting the records. However, the corresponding attribute name in the stream definition is `employeeNo` because that is how you want to refer to the attribute in the stream processor. In this instance, you need a custom mapping to indicate that `emp No` is the same as `employeeNo`.
:::

:::note
Stream processors are a combination of stream functions and windows. Stream processors are more advanced than stream functions as they can retain and arbitrarily emit events, and they are more advanced than windows because they can add additional attributes to the events. Stream processors help to achieve complex execution logics that cannot be achieved by other constructs such as functions, aggregate functions, stream functions, and windows.
:::