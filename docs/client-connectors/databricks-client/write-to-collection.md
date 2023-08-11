---
sidebar_position: 40
title: Write to a Collection
---

The Macrometa Collections Databricks Connector allows you to integrate [Apache Spark](https://spark.apache.org/) with [Macrometa](https://www.macrometa.com/docs/collections/) collections, allows you to write data to Macrometa collections using Apache Spark.

### Writing to a Macrometa collection
1. Set up your target options:
```scala
val targetOptions = Map(
  "regionUrl" -> "<REGION_URL>",
  "apiKey" -> "apikey <API_KEY>",
  "fabric" -> "<FABRIC>",
  "collection" -> "<COLLECTION>",
  "batchSize" -> "<BATCH_SIZE>",
  "primaryKey" -> "<PRIMARY_KEY>"
)
```
2. Write to the Macrometa collection:
```scala
modifiedDF
  .write
  .format("com.macrometa.spark.collection.MacrometaTableProvider")
  .options(targetOptions)
  .mode(SaveMode.Append)
  .save()
````
3. Close SparkSession:
```scala
spark.close()
```