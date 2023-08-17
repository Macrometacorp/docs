---
sidebar_position: 1
title: Databricks Client Connector
---

The Macrometa client connector for [Databricks](https://www.databricks.com/) enables you to seamlessly connect Macrometa [streams](../../streams/) and [collections](../../collections/) with Apache Spark within the Databricks environment. This connector allows you to leverage Spark's advanced processing capabilities, enabling you to derive valuable insights and make data-driven decisions.

The Macrometa Spark Connector offers two main components: Stream Data Connector and Collection Data Connector.

## Stream Data Connector

The Stream Data Connector handles reading from and writing to real-time data streams.

Source and target operations for streams can be executed using the format `com.macrometa.spark.stream.MacrometaTableProvider`.

## Collection Data Connector

The Collection Data Connector focuses on batch data processing to and from Macrometa collections.

Source and target operations for collections can be executed using the format `com.macrometa.spark.collection.MacrometaTableProvider`.

## Mapping Considerations

When mapping from a Macrometa array to a Spark array, Macrometa uses ArrayType. ArrayType which is a collection data type that extends the DataType class, which is a superclass of all types in Spark. All elements of ArrayType should have the same type of elements.

## Data Types and Common Schema

Macrometa collections don't have a concept of `schema`, but Macrometa connectors needs an underlying schema to extract and load data. If the records in the collection don't have the same set of attributes and data types (i.e., a common schema), then the most common schema among the first 50 records will be selected as the schema for the data target. Documents that do not match the common schema will not be imported or exported.

If the records don't have a common schema and you add a data target to the source collection, then delete operations on the records (the ones that do not match the most common schema) of the source collection can lead to data inconsistencies and errors while loading data into the data target.
