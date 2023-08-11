---
sidebar_position: 80
title: Databricks Example
---

This example shows you how to read data from a Macrometa stream and write data to a Macrometa collection using the Macrometa Databricks Client Connector.

## Read from a Macrometa Stream

1. Set up your source options:

    ```scala
    val sourceOptions = Map(
    "regionUrl" -> regionUrl,
    "port" -> "6651",
    "apikey" -> apikey,
    "fabric" -> fabric,
    "tenant" -> tenant,
    "replication" -> replication,
    "stream" -> sourceStream,
    "subscriptionName" -> sourceSubscription
    )
    ```

2. Create a Spark session:

    ```scala
    val spark = SparkSession.builder()
    .appName("MacrometaCollectionStreamingApp")
    .master("local[*]")
    .getOrCreate()
    ```

3. Read from the Macrometa stream:

    ```scala
    val inputStream = spark.readStream
    .format("com.macrometa.spark.stream.MacrometaTableProvider")
    .options(sourceOptions)
    .load()
    ````

## Write to a Macrometa Collection

1. Set up your target options:

    ```scala
    val targetOptions = Map(
    "regionUrl" -> regionUrl,
    "apiKey" -> "apikey ",
    "fabric" -> fabric,
    "collection" -> "<YOUR_TARGET_COLLECTION>",
    "batchSize" -> "100"
    )
    ```

2. Write to the Macrometa collection:

```scala
  val query = inputStream.writeStream
  .foreachBatch { (batchDF: DataFrame, batchId: Long) =>
    batchDF.write
      .format("com.macrometa.spark.collection.MacrometaTableProvider")
      .options(targetOptions)
      .mode(SaveMode.Append)
      .save()
  }
  .option("checkpointLocation", "checkpoint")
  .start()
```

3. Close the Spark session:

```scala
query.awaitTermination()
```
