---
title: Stream Worker Commands
---

# Stream Workers (gdnsl stream-worker)

Get commands related to stream workers.

```bash
  gdnsl stream-worker <stream-worker-name> [flags]
```

**Examples:**

```bash
  
  # Publish a stream worker.
  gdnsl stream-worker TestStreamWorker --enable

  # Unpublish a stream worker.
  gdnsl stream-worker TestStreamWorker --disable

  # Submit an ad hoc Stream query and get the result records from a store.
  gdnsl stream-worker TestStream --query "SELECT * FROM TestStreamTable"
```

**Options:**

```bash
  -h, --help                  Help to create a stream worker.
      --query string          Query to return the result.
      --enable                Enable a stream worker.
      --disable               Disable a stream worker.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl stream-worker create

Create a stream worker.

```bash
  gdnsl stream-worker create [flags]
```

**Examples:**

```bash
  # Create a simple stream worker.
   gdnsl stream-worker create 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"

  # Create a stream worker using JS functions.
   gdnsl stream-worker create 
      --name "abc-stream-worker" 
      --description "my stream worker2" 
      --function "concatFn[javascript] return string {
                      var str1 = data[0];
                      var str2 = data[1];
                      var str3 = data[2];
                      var response = str1 + str2 + str3;
                      return response;
                  };"
      --source "STREAM SampleScriptAppInputStream (deviceID string, roomNo int, temperature double);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleScriptAppOutputTable 
                SELECT concatFn(roomNo,'-',deviceID) as id, temperature
                FROM SampleScriptAppInputStream;"

  # Create a cron stream worker.
   gdnsl stream-worker create 
      --name "cron-stream-worker" 
      --description "This app will produce an event after every 5 secondsr" 
      --trigger "MyTrigger WITH ( interval = 5 sec );"
      --sink "STREAM SampleStream (startTime long);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleStream
                SELECT eventTimestamp() as startTime
                FROM MyTrigger;"

  # Create a stream worker with indexes.
   gdnsl stream-worker create 
      --name "my-stream-worker2" 
      --description "This application creates different types of indexes on a given table." 
      --table "SampleGDNTable (sensorId string, temperature double);"
      --index "SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId)"
      --index "SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);"
      --index "SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);"

  # Validate a stream worker.
   gdnsl stream-worker create 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"
      --validate

   # Validate a stream worker from a file.
   gdnsl stream-worker create -file "cargo-stream-worker.json" --validate

  # Create a stream worker with indexes.
   gdnsl stream-worker create 
      --name "my-rdbmc-cdc" 
      --description "This stream app will explain the usage of rdbms store extension using MySQL database" 
      --trigger "ceprdbmsTrigger WITH (interval=5 sec);"
      --store " StockTable WITH 
                ( type="rdbms", 
                  jdbc.url="jdbc:mysql://dummy-mysql-server.com:3306/MySQLDB?useSSL=false", 
                  username="my-username", 
                  password="my-password", 
                  jdbc.driver.name="com.mysql.jdbc.Driver",
                  field.length="symbol:100", 
                  table.check.query="SELECT 1 FROM StockTable LIMIT", 
                  PrimaryKey='id', 
                  PrimaryKey='symbol', 
                  Index='volume') 
	              (id string, symbol string, price float, volume long);"
      --query " INSERT INTO StockTable
                SELECT convert(count(), 'string')  as id, 
                      convert(count(), 'string') as symbol, 
                      23.33f as price, 
                      eventTimestamp() as volume 
                FROM ceprdbmsTrigger; "

   # Create a stream worker from a file.
   gdnsl stream-worker create -file "cargo-stream-worker.json" --regions "gdn-us-west,gdn-ap-west"

  # Create a stream worker using advanced mode
   gdnsl stream-worker create --advanced"@App:name('Sample-Adhoc-Query')\n@App:description(\"This application demonstrates how to send adhoc queries and fetch data from Stores and named windows.\")\n@App:qlVersion('2')\n\n/**\nTesting the Stream Application:\n    1. Upload following data into `SampleAdhocQueryInputTable` C8DB Collection\n        {\"sensorId\":\"sensor A1234\",\"temperature\":18}\n        {\"sensorId\":\"sensor A1234\",\"temperature\":-32.2}\n        {\"sensorId\":\"sensor FR45\",\"temperature\":20.9}\n        {\"sensorId\":\"sensor meter1\",\"temperature\":49.6}\n\n    2. This application accumulates all the data for one minute in the named window `SampleAdhocQueryInputTableOneMinTimeWindow`\n        Named window allows other application to query data in realtime.\n\n    3. Run the adhoc query on the `SampleAdhocQueryInputTableOneMinTimeWindow` (Refer [1] for running adhoc queries.)\n        Query:\n            select * from SampleAdhocQueryInputTableOneMinTimeWindow\n\n        Output:\n            [\n                [\"sensor A1234\",18],\n                [\"sensor A1234\",-32.2],\n                [\"sensor FR45\",20.9],\n                [\"sensor meter1\",49.6]\n            ]\n\n    4. Similar to Named Windows one can run adhoc queries on the stores as well. Running adhoc query on \n        `SampleAdhocQuerySensorA1234DestTable` C8DB Collection should produce below result\n\n        Query: Store the result if sensorId is equal to \"sensor A1234\"\n            SELECT * FROM SampleAdhocQuerySensorA1234DestTable\n\n        Output:\n            [\n                [\"sensor A1234\",18],\n                [\"sensor A1234\",-32.2]\n            ]\n\n    [1] https://macrometa.dev/cep/quickstart/#run-an-adhoc-query\n*/\n\n-- Defines `SampleAdhocQueryInputTable` collection to process events having `sensorId` and `temperature`(F).\nCREATE SOURCE SampleAdhocQueryInputTable WITH(type = 'database', collection = \"SampleAdhocQueryInputTable\", collection.type=\"doc\" , replication.type=\"global\", map.type='json') (sensorId string, temperature double);\n\n-- Named Window\nCREATE WINDOW SampleAdhocQueryInputTableOneMinTimeWindow (sensorId string, temperature double) SLIDING_TIME(1 min);\n\n-- Table\nCREATE TABLE SampleAdhocQuerySensorA1234DestTable(sensorId string, temperature double);\n\n@info(name = 'Insert-to-window')\nINSERT INTO SampleAdhocQueryInputTableOneMinTimeWindow\nSELECT *\nFROM SampleAdhocQueryInputTable;\n\n@info(name = 'EqualsFilter')\n-- Note: Filter out events with `sensorId` equalling `sensor A1234`\nINSERT INTO SampleAdhocQuerySensorA1234DestTable\nSELECT *\nFROM SampleAdhocQueryInputTable\nWHERE sensorId == 'sensor A1234';\n" --regions "gdn-us-west,gdn-ap-west"
```

**Options:**

```bash
  -h, --help                  Help to create a stream worker.
      --name string           Stream worker name. Mandatory field.
      --description           Stream worker description. Mandatory field.
      --source                Source definition. Can be provided multiple times.
      --sink                  Sink definition. Can be provided multiple times.
      --trigger               Trigger definition. Can be provided only once. 
      --store                 Store definition. Can be provided multiple times.
      --query                 Stream query. Can be provided multiple times.
      --table                 Table definition. Can be provided multiple times. 
      --index                 Index definition. Can be provided multiple times.
      --function              JS function definition. Can be provided multiple times.
      --advanced string       Complete stream worker definiton as string.
      --file   string         Json file from where the stream worker definition is to be read from.
      --regions string        Comma separated regions where stream workers should be deployed. Default to local region.
      --validate              Validate stream worker definition. Stream worker will not be created.
      --fabric                Name of the fabric to use
```

**Options inherited:**

```bash
      --config string  gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl stream-worker delete

Delete a stream worker.

```bash
  gdnsl stream-worker delete <stream-worker-name>
```

**Examples:**

```bash
  # Delete a stream worker.
  gdnsl stream-worker delete TestStreamWorker

```

**Options:**

```bash
  -h, --help                  Help to describe stream workers.
  --fabric                    Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl stream-worker describe

Describe a stream worker.

```bash
  gdnsl stream-worker describe <stream-name>
```

**Examples:**

```bash

  # Describe a stream worker.
  gdnsl stream-worker describe TestStreamWorker
```

**Options:**

```bash
  -h, --help                  Help to describe stream workers.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
--config string         gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl stream-worker list

List stream workers.

```bash
  gdnsl stream-worker list [flags]
```

**Examples:**

```bash

  # List stream workers.
  gdnsl stream-worker list

  # List sample stream workers.
  gdnsl stream-worker list --sample

```

**Options:**

```bash
  -h, --help                  Help to list stream workers.
      --sample                List sample stream workers.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl stream-worker update

Update a stream worker.

```bash
  gdnsl stream-worker update <stream-worker-name> [flags]
```

**Examples:**

```bash

  # Update a simple stream worker.
   gdnsl stream-worker update 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"

  # Update a stream worker using JS functions.
   gdnsl stream-worker update 
      --name "abc-stream-worker" 
      --description "my stream worker2" 
      --function "concatFn[javascript] return string {
                      var str1 = data[0];
                      var str2 = data[1];
                      var str3 = data[2];
                      var response = str1 + str2 + str3;
                      return response;
                  };"
      --source "STREAM SampleScriptAppInputStream (deviceID string, roomNo int, temperature double);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleScriptAppOutputTable 
                SELECT concatFn(roomNo,'-',deviceID) as id, temperature
                FROM SampleScriptAppInputStream;"

  # Update a cron stream worker.
   gdnsl stream-worker update 
      --name "cron-stream-worker" 
      --description "This app will produce an event after every 5 secondsr" 
      --trigger "MyTrigger WITH ( interval = 5 sec );"
      --sink "STREAM SampleStream (startTime long);"
      --table "SampleScriptAppOutputTable (id string, temperature double);"
      --query "INSERT INTO SampleStream
                SELECT eventTimestamp() as startTime
                FROM MyTrigger;"

  # Update a stream worker with indexes.
   gdnsl stream-worker update 
      --name "my-stream-worker2" 
      --description "This application creates different types of indexes on a given table." 
      --table "SampleGDNTable (sensorId string, temperature double);"
      --index "SamplePersistentIndex ON TABLE SampleGDNTable WITH(type="persistent", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleHashIndex ON TABLE SampleGDNTable WITH(type="hash", sparse="true", deduplicate="true") (sensorId);"
      --index "SampleFullTextIndex ON TABLE SampleGDNTable WITH(type="fulltext", minLength="3") (sensorId)"
      --index "SampleGeoIndex ON TABLE SampleGDNTable WITH(type="geo", geoJson="false") (sensorId);"
      --index "SampleTTLIndex ON TABLE SampleGDNTable WITH(type="ttl", expireAfter="3600") (sensorId);"

  # Validate a stream worker.
   gdnsl stream-worker update 
      --name "cargo-stream-worker" 
      --description "my stream worker" 
      --source "SampleCargoAppInputTable WITH 
                (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc" , replication.type="global", map.type='json') (weight int);"
      --sink "STREAM SampleCargoAppDestStream (weight int);"
      --query "INSERT INTO SampleCargoAppDestStream 
               SELECT weight 
               FROM SampleCargoAppInputTable;"
      --validate

   # Validate a stream worker from a file.
   gdnsl stream-worker update --file "cargo-stream-worker.json" --validate

  # Update a stream worker with indexes.
   gdnsl stream-worker update 
      --name "my-rdbmc-cdc" 
      --description "This stream app will explain the usage of rdbms store extension using MySQL database" 
      --trigger "ceprdbmsTrigger WITH (interval=5 sec);"
      --store " StockTable WITH 
                ( type="rdbms", 
                  jdbc.url="jdbc:mysql://dummy-mysql-server.com:3306/MySQLDB?useSSL=false", 
                  username="my-username", 
                  password="my-password", 
                  jdbc.driver.name="com.mysql.jdbc.Driver",
                  field.length="symbol:100", 
                  table.check.query="SELECT 1 FROM StockTable LIMIT", 
                  PrimaryKey='id', 
                  PrimaryKey='symbol', 
                  Index='volume') 
                  (id string, symbol string, price float, volume long);"
      --query " INSERT INTO StockTable
                SELECT convert(count(), 'string')  as id, 
                      convert(count(), 'string') as symbol, 
                      23.33f as price, 
                      eventTimestamp() as volume 
                FROM ceprdbmsTrigger; "

   # Update a stream worker from a file.
   gdnsl stream-worker update --file "cargo-stream-worker.json" --regions "gdn-us-west,gdn-ap-west"
```

**Options:**

```bash
  -h, --help                  Help to create a stream worker.
      --name string           Stream worker name. Mandatory field.
      --description           Stream worker description. Mandatory field.
      --source                Source definition. Can be provided multiple times.
      --sink                  Sink definition. Can be provided multiple times.
      --trigger               Tigger definition. Can be provided only once. 
      --store                 Store definition. Can be provided multiple times.
      --query                 Stream query. Can be provided multiple times.
      --table                 Table definition. Can be provided multiple times. 
      --index                 Index definition. Can be provided multiple times.
      --function              JS function definition. Can be provided multiple times.
      --advanced string       Complete stream worker definiton as string
      --file   string         Json file from where the stream worker definition is to be read from
      --regions string        Comma separated regions where stream workers should be deployed. Default to local region.
      --validate              Validate stream worker definition. Stream worker will not be updated.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```
