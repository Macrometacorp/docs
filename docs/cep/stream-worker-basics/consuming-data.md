---
sidebar_position: 60
title: Stream Processors
---

Typically the first step  in a stream processing flow is to consume the data to be cleaned, enriched, transformed or summarized to produce the required output.

_Stream processors_ are a combination of stream worker functions and windows. Stream processors are more advanced than stream functions, because they can retain and arbitrarily emit events, and they are more advanced than windows because they can add additional attributes to the events. Stream processors help to achieve complex execution logics that cannot be achieved by other constructs such as functions, aggregate functions, stream functions, and windows.

For a stream processor to consume events, the following is required.

- **Message schema:** To identify the messages to select for stream processing. The schema of the messages is defined via a _stream_.

- **Source:** The messages are consumed from different sources including streaming applications, cloud-based applications, databases, and files. The source is defined from a _source configuration_. For full documentation about stream worker sources, refer to [Sources](../source/).

Say the stream processor is reading employee records. The employee name might be defined as `emp No` in the source from which you are extracting the records. However, the corresponding attribute name in the stream definition is `employeeNo` because that is how you want to refer to the attribute in the stream processor. In this instance, you need a custom mapping to indicate that `emp No` is the same as `employeeNo`.
