---
sidebar_position: 40
title: Read from a Collection
---

The Macrometa Collections Databricks Connector allows you to integrate [Apache Spark](https://spark.apache.org/) with [Macrometa](https://www.macrometa.com/docs/collections/) collections, allows you to read data from Macrometa collections using Apache Spark.

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

2. Create a Spark session:

    ```scala
    val spark = SparkSession.builder()
    .appName("MacrometaCollectionApp")
    .master("local[*]")
    .getOrCreate()
    ```

3. Read from the Macrometa collection:

   1. Auto infer schema:
   ```scala
    val inputDF = spark
        .read
        .format("com.macrometa.spark.collection.MacrometaTableProvider")
        .options(sourceOptions)
        .load()
    ```
   2. User defined schema:
    ```scala
    val userSchema = new StructType().add("value", "string")
    val inputDF = spark
        .read
        .format("com.macrometa.spark.collection.MacrometaTableProvider")
        .options(sourceOptions)
        .schema(userSchema)
        .load()
    ```

4. Show the read results (only 20 rows):

    ```scala
    inputDF.show()
    ```

5. Perform transformations on the DataFrame. The code block below assumes that the source collection has 'value' as a property for each document. Replace them with your own schema.

    ```scala
    val modifiedDF = inputDF
    .select("value")
    .withColumnRenamed("value", "number")
    .withColumn("randomNumber", rand())
    ```
