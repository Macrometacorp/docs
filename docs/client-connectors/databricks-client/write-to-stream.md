---
sidebar_position: 30
title: Write to a Stream
---

This page explains how to use the Macrometa Stream Databricks Client Connector to integrate [Apache Spark](https://spark.apache.org/) with [Macrometa streams](https://www.macrometa.com/docs/streams/), allowing you write data you have processed and analyzed in a Databricks environment to Macrometa streams.

1. Set up your target options:

    ```scala
    val targetOptions = Map(
    "regionUrl" -> "<REGION_URL>",
    "port" -> "<PORT>",
    "apikey" -> "<APIKEY>",
    "fabric" -> "<FABRIC>",
    "tenant" -> "<TENANT>",
    "replication" -> "<REPLICATION>",
    "stream" -> "<TARGET_STREAM>",
    "checkpointLocation" -> "<CHECKPOINT_LOCATION>"
    )
    ```

2. Write to the Macrometa stream. The code block below assumes the stream you are reading data from has the property 'symbol', 'ma'. Replace it with your own schema:

    ```scala
    val query = inputStream.select("symbol","ma")
    .withColumnRenamed("ma", "value")
    .writeStream
    .format("com.macrometa.spark.stream.MacrometaTableProvider")
    .options(targetOptions)
    .start()
    ````

3. Wait for termination:

    ```scala
    query.awaitTermination()
    ```
