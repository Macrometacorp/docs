---
sidebar_position: 1
title: Databricks Client Connector
---

The Macrometa client connector for [Databricks](https://www.databricks.com/) enables you to seamlessly connect Macrometa [streams](../../streams/) and [collections](../../collections/) with Apache Spark within the Databricks environment. This comprehensive connector facilitates the ingestion, processing, and analysis of both streaming and batch data by leveraging Spark's advanced capabilities, allowing users to derive valuable insights and make data-driven decisions.

The Macrometa Spark Connector offers two main components: Stream Data Connector and Collection Data Connector.

## Stream Data Connector

The Stream Data Connector handles reading from and writing to real-time data streams.

Source and target operations for streams can be executed using the format `com.macrometa.spark.stream.MacrometaTableProvider`.

For detailed instructions, refer to:

- List of tasks with links

## Collection Data Connector

The Collection Data Connector focuses on batch data processing to and from Macrometa collections.

Source and target operations for collections can be executed using the format `com.macrometa.spark.collection.MacrometaTableProvider`.

For detailed instructions, refer to:

- List of tasks with links

## Considerations

- When mapping from a Macrometa array to a Spark array, Macrometa uses ArrayType. ArrayType which is a collection data type that extends the DataType class, which is a superclass of all types in PySpark. All elements of ArrayType should have the same type of elements.
- When inferring schema, the connector retrieves the first 50 documents from a collection and chooses the most common one between them.
