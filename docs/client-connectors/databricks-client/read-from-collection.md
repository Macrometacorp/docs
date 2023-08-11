---
sidebar_position: 40
title: Read from Collection
---

The Macrometa Collections Databricks Connector allows you to integrate [Apache Spark](https://spark.apache.org/) with [Macrometa](https://www.macrometa.com/docs/collections/) collections, allows you to read and write data from and to Macrometa collections using Apache Spark.

## Requirements

- Databricks Runtime 11.3 LTS(with Apache Spark 3.3.0)
- Scala 2.12 or later
- Macrometa account with access to streams

## Usage

### Reading from a Macrometa Collection

1. Set up your source options:

```scala
val sourceOptions = Map(
  "regionUrl" -> "<REGION_URL>",
  "apiKey" -> "apikey <API_KEY>",
  "fabric" -> "<FABRIC>",
  "collection" -> "<COLLECTION>",
  "batchSize" -> "<BATCH_SIZE>",
  "query" -> "<QUERY>"
)
```

2. Create a spark session:
```scala
val spark = SparkSession.builder()
  .appName("MacrometaStreamingApp")
  .master("local[*]")
  .getOrCreate()
```
3. Read from the Macrometa stream:
```scala
val inputDF = spark
  .read
  .format("com.macrometa.spark.collection.MacrometaTableProvider")
  .options(sourceOptions)
  .load()
````
4. Show the read results(only 20 rows)
```scala
   inputDF.show()
```
5. Perform transformations on the DataFrame( Assuming that the sourceCollection has 'value' as a property for each document)
```scala
val modifiedDF = inputDF
  .select("value")
  .withColumnRenamed("value", "number")
  .withColumn("randomNumber", rand())
```
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
