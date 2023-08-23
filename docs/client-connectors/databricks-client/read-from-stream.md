---
sidebar_position: 20
title: Read from a Stream
---

This page explains how to use the Macrometa Stream Databricks Client Connector to integrate [Apache Spark](https://spark.apache.org/) with [Macrometa streams](https://www.macrometa.com/docs/streams/), allowing you read data from Macrometa streams and process and analyze real-time data using Spark's powerful capabilities in a Databricks environment.

1. Set up source options:

    ```scala
    val sourceOptions = Map(
    "regionUrl" -> "<REGION_URL>",
    "port" -> "<PORT>",
    "apikey" -> "<APIKEY>",
    "fabric" -> "<FABRIC>",
    "tenant" -> "<TENANT>",
    "replication" -> "<REPLICATION>",
    "stream" -> "<SOURCE_STREAM>",
    "isCollectionStream" -> "<true or false>", // Indicates if this is a collection stream (true) or not (false), represented as a string value
    "subscriptionName" -> "<SOURCE_SUBSCRIPTION>"
    )
    ```

2. Create a Spark session:

    ```scala
    val spark = SparkSession.builder()
    .appName("MacrometaStreamingApp")
    .master("local[*]")
    .getOrCreate()
    ```

3. Read from the Macrometa stream:

    ```scala
    val inputStream = spark.readStream
    .format("com.macrometa.spark.stream.MacrometaTableProvider")
    .options(sourceOptions)
    .load()
    ```
