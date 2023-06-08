---
sidebar_position: 20
title: Stream Workers SDK Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../../_partials/_prerequisites-sdk-api-key.md';
import Steps from '../../../_partials/_get-started-steps.md';
import ConnectToGDN from '../../../_partials/_connect-to-gdn-code-block.md';

This article is an introduction to using stream workers (sometimes called stream apps) with [Macrometa SDKs](../../../sdks/index.md).

## Prerequisites

<Prerequisites />

## Get Started with Stream Workers

This page guides you through creating a stream worker, updating it, and running an ad hoc query on it using the [pyC8](https://github.com/Macrometacorp/pyC8) and [jsC8](https://github.com/Macrometacorp/jsC8) SDKs.

<Steps />

If you want to skip the explanation and just run the code, then go directly to the [Full Demo File](#full-demo-file).

### Step 1. Connect to GDN

To use stream workers with Macrometa Global Data Network (GDN), you must first establish a connection to a local region.

<ConnectToGDN />

### Step 2. Validate Stream Worker

Validate the stream worker for syntax errors before saving. If valid, then the system returns `True`.

The stream worker shown below reads data from a collection and publishes it to a stream.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Import libraries you'll need later
import time

# Define the stream app to validate.
stream_app_definition = """
@App:name('Sample-Cargo-App')
@App:qlVersion("2")
@App:description('Basic stream worker to demonstrate reading data from input stream and store it in the collection. The stream and collections are automatically created if they do not already exist.')
/**
Test the stream worker:
    1. Open Stream SampleCargoAppDestStream in console. The output can be monitored here.
    2. Upload following data into SampleCargoAppInputTable collection:
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}
    3. Following messages are shown on the SampleCargoAppDestStream Stream Console:
        [2021-08-27T14:12:15.795Z] {"weight":1}
        [2021-08-27T14:12:15.799Z] {"weight":2}
        [2021-08-27T14:12:15.805Z] {"weight":3}
        [2021-08-27T14:12:15.809Z] {"weight":4}
        [2021-08-27T14:12:15.814Z] {"weight":5}
*/

-- Create Table SampleCargoAppInputTable to process events.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection ="SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

-- Create Stream SampleCargoAppDestStream
CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream ="SampleCargoAppDestStream", replication.type="local") (weight int);

-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;
"""

# Validate the stream worker code.
print("--- Validating stream worker definition")
print(client.validate_stream_app(data=stream_app_definition))
```

 </TabItem>
 <TabItem value="js" label="JavaScript SDK">

```js
// This is a supporting function
function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

// This is the main function
async function main () {
  try {
    // Define the stream app to validate.
    const appDefinition = `
      @App:name('Sample-Cargo-App')
      @App:qlVersion("2")
      @App:description('Basic stream worker to demonstrate reading data from input stream and store it in the collection. The stream and collections are automatically created if they do not already exist.')
      /**
      Test the stream worker:
          1. Open Stream SampleCargoAppDestStream in console. The output can be monitored here.
          2. Upload following data into SampleCargoAppInputTable collection:
              {"weight": 1}
              {"weight": 2}
              {"weight": 3}
              {"weight": 4}
              {"weight": 5}
          3. Following messages are shown on the SampleCargoAppDestStream Stream Console:
              [2021-08-27T14:12:15.795Z] {"weight":1}
              [2021-08-27T14:12:15.799Z] {"weight":2}
              [2021-08-27T14:12:15.805Z] {"weight":3}
              [2021-08-27T14:12:15.809Z] {"weight":4}
              [2021-08-27T14:12:15.814Z] {"weight":5}
      */

      -- Create Table SampleCargoAppInputTable to process events.
      CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection ="SampleCargoAppInputTable", collection.type="doc", replication.type="global", maptype='json') (weight int);

      -- Create Stream SampleCargoAppDestStream
      CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream ="SampleCargoAppDestStream", replication.type="local") (weight int);

      -- Data Processing
      @info(name='Query')
      INSERT INTO SampleCargoAppDestStream
      SELECT weight
      FROM SampleCargoAppInputTable;`

    // Validate the stream worker code.
    console.log("--- Validating stream worker definition");
    let result;
    result = await client.validateStreamApp(appDefinition);
    console.log(!result.error)

    // Add subsequent code blocks above this line.
  } catch (e) {
    console.log(messageHandler(e));
  }
}
main();
```

 </TabItem>
 </Tabs>

### Step 3. Create Stream Worker

By default, the stream worker is created in the local region. You can use `dclist` (domain component list) to deploy the stream worker in other specified regions, or in all regions.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Create the stream worker.
dclist = []
print("--- Creating stream worker")
print(client.create_stream_app(data=stream_app_definition, dclist=dclist))
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

Append the following lines of code inside the `try` block of main function. Look for the code comment that says, `Add subsequent code blocks above this line.`.

```js
    // The stream app will be created by default in the local region. Optionally, you can use dclist to deploy stream
    // app in all / selected regions
    const dclist = []
    console.log("--- Creating stream worker");
    try {
      result = await client.createStreamApp(dclist, appDefinition);
      console.log(!result.error);
    } catch (e) {
      if (e.statusCode === 409) {
        console.log("Stream worker already exists");
      } else {
        throw e;
      }
    }
```

</TabItem>
</Tabs>  

### Step 4. Activate and Deactivate Stream Worker

Sometimes you need to turn a stream worker on or off. The commands below demonstrate how to do that programmatically. Make sure that the stream worker is activated (published) before continuing to the next step!

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Activate the stream worker.
# Check if already active
result = client.get_stream_app('Sample-Cargo-App')
if result[0]['isActive'] is False:
    print("Activate", client.activate_stream_app('Sample-Cargo-App', True))
else:
    print("Stream worker already active")

# You can also deactivate the stream worker.
# print("Deactivate", client.activate_stream_app('Sample-Cargo-App', False))
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

Append the following lines of code inside the `try` block of main function. Look for the code comment that says, `Add subsequent code blocks above this line.`.

```js
    // Activate the stream worker if not already active.
    console.log("--- Activating `Sample-Cargo-App`");
    result = await client.getStreamApp("Sample-Cargo-App");
    const isActive = result.streamApps.at(0).isActive;
    if (!isActive) {
      result = await client.activateStreamApp("Sample-Cargo-App", true);
      console.log(!result.error)
    } else {
      console.log("Stream worker already active")
    }

    // You can also deactivate the stream worker.
    // console.log("--- Deactivating `Sample-Cargo-App`");
    // const result = await client.activateStreamApp("Sample-Cargo-App", false);
```

</TabItem>
</Tabs>

### Step 5. Update Stream Worker

The code below adds a second data processing step. It updates the stream worker to store the input data into itself and another collection called `SampleCargoAppDestTable`.

After you run this command, you can view the changes in the Macrometa console Stream Workers page.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Code with which the stream worker will be updated.
data = """
@App:name('Sample-Cargo-App')
@App:qlVersion("2")
@App:description('Basic stream worker to demonstrate reading data from input stream and store it in a collection. The stream and collections are automatically created if they do not already exist.')
/**
    Test the stream worker:
    1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.
    2. Upload following data into SampleCargoAppInputTable collection:
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}
    3. Following messages are shown on the `SampleCargoAppDestStream` Stream Console:
        [2021-08-27T14:12:15.795Z] {"weight":1}
        [2021-08-27T14:12:15.799Z] {"weight":2}
        [2021-08-27T14:12:15.805Z] {"weight":3}
        [2021-08-27T14:12:15.809Z] {"weight":4}
        [2021-08-27T14:12:15.814Z] {"weight":5}
    4. Following messages are stored into SampleCargoAppDestTable
        {"weight":1}
        {"weight":2}
        {"weight":3}
        {"weight":4}
        {"weight":5}
*/

-- Defines Table SampleCargoAppInputTable
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

-- Define Stream SampleCargoAppDestStream
CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);

-- Defining a destination table to dump the data from the stream
CREATE TABLE SampleCargoAppDestTable (weight int);

-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;

-- Data Processing
@info(name='Dump')
INSERT INTO SampleCargoAppDestTable
SELECT weight
FROM SampleCargoAppInputTable;
"""

# Create an instance of a stream worker and deactivate it before you update it.
client.activate_stream_app('Sample-Cargo-App', False)
app = client._fabric.stream_app("Sample-Cargo-App")

# Update the stream worker.
print("--- Updating stream worker `Sample-Cargo-App`")
app.update(data)
# Wait time is needed after updating a stream worker to initialize resources
time.sleep(10)
app.change_state(True)

```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

Append the following lines of code inside the `try` block of main function. Look for the code comment that says, `Add subsequent code blocks above this line.`.

```js
    // Code with which the stream worker will be updated.
    const updatedAppDefinition = `
    @App:name('Sample-Cargo-App')
    @App:qlVersion("2")
    @App:description('Basic stream worker to demonstrate reading data from input stream and store it in the collection. The stream and collections will be created automatically if they do not already exist.')
  
    /**
    Testing the Stream Application:
    1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.
  
    2. Upload following data into SampleCargoAppInputTable collection
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}
  
    3. Following messages would be shown on the SampleCargoAppDestStream Stream Console
        [2021-08-27T14:12:15.795Z] {"weight":1}
        [2021-08-27T14:12:15.799Z] {"weight":2}
        [2021-08-27T14:12:15.805Z] {"weight":3}
        [2021-08-27T14:12:15.809Z] {"weight":4}
        [2021-08-27T14:12:15.814Z] {"weight":5}
  
    4. Following messages would be stored into SampleCargoAppDestTable
        {"weight":1}
        {"weight":2}
        {"weight":3}
        {"weight":4}
        {"weight":5}
    */
  
    -- Defines Table SampleCargoAppInputTable to process events having sensorId and temperature(F).
    CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);
  
    -- Define Stream SampleCargoAppDestStream
    CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);
  
    -- Defining a destination table to dump the data from the stream
    CREATE TABLE SampleCargoAppDestTable (weight int);
  
    -- Data Processing
    @info(name='Query')
    INSERT INTO SampleCargoAppDestStream
    SELECT weight
    FROM SampleCargoAppInputTable;
  
    -- Data Processing
    @info(name='Dump')
    INSERT INTO SampleCargoAppDestTable
    SELECT weight
    FROM SampleCargoAppInputTable;`

    // Create an instance of a stream worker and deactivate it before you update it.
    await client.activateStreamApp("Sample-Cargo-App", false);
    const app = await client.streamApp("Sample-Cargo-App");

    // Update the stream worker.
    console.log("--- Updating stream worker `Sample-Cargo-App`");
    result = await app.updateApplication([], updatedAppDefinition);
    console.log(!result.error)
    console.log("--- Waiting 10 seconds for all the resources to be ready");
    await new Promise(resolve => setTimeout(resolve, 10000));
    await app.activateStreamApplication(true);
```

</TabItem>
</Tabs>

### Step 6. Insert data and run an Ad Hoc Query

In this example, we use a query worker `insertWeight` to insert data into `SampleCargoAppInputTable` and then we run an ad hoc query on the store `SampleCargoAppDestTable` used in the stream worker. It gets the records that you inserted into `SampleCargoAppInputTable`.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py

# Inserting data into SampleCargoAppInputTable using a query worker.
insert_data_value = 'INSERT { "weight": @weight } IN SampleCargoAppInputTable'
insert_data_query = {
    "query": {
        "name": "insertWeight",
        "value": insert_data_value,
    }
}

client.create_restql(insert_data_query)
time.sleep(2)
for i in range(5):
    client.execute_restql("insertWeight", {"bindVars": {"weight": i}})
# Deleting the query worker.
client.delete_restql("insertWeight")

# Run ad hoc query against the store.
print("--- Running an ad hoc query against the store `SampleCargoAppDestTable`")
q = "SELECT * FROM SampleCargoAppDestTable limit 3"
result = app.query(q)
print(result)

```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

Append the following lines of code inside the `try` block of main function. Look for the code comment that says, `Add subsequent code blocks above this line.`.

```js

    // Insert data into the collection via query worker.
    console.log("--- Inserting data to `SampleCargoAppInputTable` collection");

    const queryName = "insertWeight";
    const queryValue = `INSERT { weight:@weight } IN SampleCargoAppInputTable`;
    await client.createRestql(queryName, queryValue);
    await new Promise(resolve => setTimeout(resolve, 2000));
    for (let i = 1; i <= 5; i++) {
      await client.executeRestql(queryName, { weight: i });
      console.log(i)
    }
    await client.deleteRestql(queryName);

    // Run query against the store.
    console.log("--- Running an Ad Hoc query against the store `SampleCargoAppDestTable`");
    const q = "SELECT * FROM SampleCargoAppDestTable limit 3";
    result = await app.query(q);
    console.log(result);

```

</TabItem>  
</Tabs>

### Step 7. Delete Stream Worker

You're done with this stream worker, so time to delete it.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Delete the stream worker.

print("--- Deleting stream worker `Sample-Cargo-App`")
result = client.delete_stream_app('Sample-Cargo-App')
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

Append the following lines of code inside the `try` block of main function. Look for the code comment that says, `Add subsequent code blocks above this line.`.

```js
    // Delete the stream worker.
    console.log("--- Deleting stream worker `Sample-Cargo-App`");
    result = await client.deleteStreamApp("Sample-Cargo-App");
    console.log(!result.error)
```

</TabItem>
</Tabs>  

## Full Demo File

The following example uses the code snippets provided in this tutorial.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
# Import libraries
from c8 import C8Client
import time

# Define constants
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "my API key" # Change this to your API key

print("--- Connecting to GDN")
# Choose one of the following methods to access the GDN. API key is recommended.

# Authenticate with API key
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Authenticate with JWT
# client = C8Client(protocol='https', host=URL, port=443, token=<your token>, geofabric=GEO_FABRIC)

# Authenticate with email and password
# client = C8Client(protocol='https', host=URL, port=443, email=<your email id>, password=<your password>, geofabric=GEO_FABRIC)

# Define the stream app to validate.
stream_app_definition = """
@App:name('Sample-Cargo-App')
@App:qlVersion("2")
@App:description('Basic stream worker to demonstrate reading data from input stream and store it in the collection. The stream and collections are automatically created if they do not already exist.')
/**
Test the stream worker:
    1. Open Stream SampleCargoAppDestStream in console. The output can be monitored here.
    2. Upload following data into SampleCargoAppInputTable collection:
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}
    3. Following messages are shown on the SampleCargoAppDestStream Stream Console:
        [2021-08-27T14:12:15.795Z] {"weight":1}
        [2021-08-27T14:12:15.799Z] {"weight":2}
        [2021-08-27T14:12:15.805Z] {"weight":3}
        [2021-08-27T14:12:15.809Z] {"weight":4}
        [2021-08-27T14:12:15.814Z] {"weight":5}
*/

-- Create Table SampleCargoAppInputTable to process events.
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection ="SampleCargoAppInputTable", collection.type="doc", replication.type="global", maptype='json') (weight int);

-- Create Stream SampleCargoAppDestStream
CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream ="SampleCargoAppDestStream", replication.type="local") (weight int);

-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;
"""

# Validate the stream worker code.
print("--- Validating stream worker definition")
print(client.validate_stream_app(data=stream_app_definition))

# Create the stream worker.
dclist = []
print("--- Creating stream worker")
print(client.create_stream_app(data=stream_app_definition, dclist=dclist))

# Activate the stream worker.
# Check if already active
result = client.get_stream_app('Sample-Cargo-App')
if result[0]['isActive'] is False:
    print("Activate", client.activate_stream_app('Sample-Cargo-App', True))
else:
    print("Stream worker already active")

# You can also deactivate the stream worker.
# print("Deactivate", client.activate_stream_app('Sample-Cargo-App', False))

# Code with which the stream worker will be updated.
data = """
@App:name('Sample-Cargo-App')
@App:qlVersion("2")
@App:description('Basic stream worker to demonstrate reading data from input stream and store it in a collection. The stream and collections are automatically created if they do not already exist.')
/**
    Test the stream worker:
    1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.
    2. Upload following data into SampleCargoAppInputTable collection:
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}
    3. Following messages are shown on the `SampleCargoAppDestStream` Stream Console:
        [2021-08-27T14:12:15.795Z] {"weight":1}
        [2021-08-27T14:12:15.799Z] {"weight":2}
        [2021-08-27T14:12:15.805Z] {"weight":3}
        [2021-08-27T14:12:15.809Z] {"weight":4}
        [2021-08-27T14:12:15.814Z] {"weight":5}
    4. Following messages are stored into SampleCargoAppDestTable
        {"weight":1}
        {"weight":2}
        {"weight":3}
        {"weight":4}
        {"weight":5}
*/

-- Defines Table SampleCargoAppInputTable
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

-- Define Stream SampleCargoAppDestStream
CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);

-- Defining a destination table to dump the data from the stream
CREATE TABLE SampleCargoAppDestTable (weight int);

-- Data Processing
@info(name='Query')
INSERT INTO SampleCargoAppDestStream
SELECT weight
FROM SampleCargoAppInputTable;

-- Data Processing
@info(name='Dump')
INSERT INTO SampleCargoAppDestTable
SELECT weight
FROM SampleCargoAppInputTable;
"""

# Create an instance of a stream worker and deactivate it before you update it.
client.activate_stream_app('Sample-Cargo-App', False)
app = client._fabric.stream_app("Sample-Cargo-App")

# Update the stream worker.
print("--- Updating stream worker `Sample-Cargo-App`")
app.update(data)
# Wait time is needed after updating a stream worker to initialize resources
time.sleep(10)
app.change_state(True)

# Inserting data into SampleCargoAppInputTable using a query worker.
insert_data_value = 'INSERT { "weight": @weight } IN SampleCargoAppInputTable'
insert_data_query = {
    "query": {
        "name": "insertWeight",
        "value": insert_data_value,
    }
}

client.create_restql(insert_data_query)
time.sleep(2)
for i in range(5):
    client.execute_restql("insertWeight", {"bindVars": {"weight": i}})
# Deleting the query worker.
client.delete_restql("insertWeight")

# Run ad hoc query against the store.
print("--- Running an ad hoc query against the store `SampleCargoAppDestTable`")
q = "SELECT * FROM SampleCargoAppDestTable limit 3"
result = app.query(q)
print(result)

# Delete the stream worker.
print("--- Deleting stream worker `Sample-Cargo-App`")
result = client.delete_stream_app('Sample-Cargo-App')
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

```js
const jsc8 = require("jsc8");

// Choose one of the following methods to access the GDN. API key is recommended.
// API key
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXXX", fabricName: '_system'});
// JSON Web Token
// const client = new jsc8({url: "https://play.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// Or use email and password to authenticate client instance
// const client = new jsc8("https://play.paas.macrometa.io");
// Replace values with your email and password (use it inside an async function).
// await client.login("nemo@nautilus.com", "xxxxxx");

// This is a supporting function
function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

async function main () {
  try {
    // Define the stream app to validate.
    const appDefinition = `
      @App:name('Sample-Cargo-App')
      @App:qlVersion("2")
      @App:description('Basic stream worker to demonstrate reading data from input stream and store it in the collection. The stream and collections are automatically created if they do not already exist.')
      /**
      Test the stream worker:
          1. Open Stream SampleCargoAppDestStream in console. The output can be monitored here.
          2. Upload following data into SampleCargoAppInputTable collection:
              {"weight": 1}
              {"weight": 2}
              {"weight": 3}
              {"weight": 4}
              {"weight": 5}
          3. Following messages are shown on the SampleCargoAppDestStream Stream Console:
              [2021-08-27T14:12:15.795Z] {"weight":1}
              [2021-08-27T14:12:15.799Z] {"weight":2}
              [2021-08-27T14:12:15.805Z] {"weight":3}
              [2021-08-27T14:12:15.809Z] {"weight":4}
              [2021-08-27T14:12:15.814Z] {"weight":5}
      */

      -- Create Table SampleCargoAppInputTable to process events.
      CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection ="SampleCargoAppInputTable", collection.type="doc", replication.type="global", maptype='json') (weight int);

      -- Create Stream SampleCargoAppDestStream
      CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream ="SampleCargoAppDestStream", replication.type="local") (weight int);

      -- Data Processing
      @info(name='Query')
      INSERT INTO SampleCargoAppDestStream
      SELECT weight
      FROM SampleCargoAppInputTable;`

    // Validate the stream worker code.
    console.log("--- Validating stream worker definition");
    let result;
    result = await client.validateStreamApp(appDefinition);
    console.log(!result.error)

    // The stream app will be created by default in the local region. Optionally, you can use dclist to deploy stream
    // app in all / selected regions
    const dclist = []
    console.log("--- Creating stream worker");
    try {
      result = await client.createStreamApp(dclist, appDefinition);
      console.log(!result.error);
    } catch (e) {
      if (e.statusCode === 409) {
        console.log("Stream worker already exists");
      } else {
        throw e;
      }
    }

    // Activate the stream worker if not already active.
    console.log("--- Activating `Sample-Cargo-App`");
    result = await client.getStreamApp("Sample-Cargo-App");
    const isActive = result.streamApps.at(0).isActive;
    if (!isActive) {
      result = await client.activateStreamApp("Sample-Cargo-App", true);
      console.log(!result.error)
    } else {
      console.log("Stream worker already active")
    }

    // You can also deactivate the stream worker.
    // console.log("--- Deactivating `Sample-Cargo-App`");
    // const result = await client.activateStreamApp("Sample-Cargo-App", false);

    // Code with which the stream worker will be updated.
    const updatedAppDefinition = `
    @App:name('Sample-Cargo-App')
    @App:qlVersion("2")
    @App:description('Basic stream worker to demonstrate reading data from input stream and store it in the collection. The stream and collections will be created automatically if they do not already exist.')
  
    /**
    Testing the Stream Application:
    1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.
  
    2. Upload following data into SampleCargoAppInputTable collection
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}
  
    3. Following messages would be shown on the SampleCargoAppDestStream Stream Console
        [2021-08-27T14:12:15.795Z] {"weight":1}
        [2021-08-27T14:12:15.799Z] {"weight":2}
        [2021-08-27T14:12:15.805Z] {"weight":3}
        [2021-08-27T14:12:15.809Z] {"weight":4}
        [2021-08-27T14:12:15.814Z] {"weight":5}
  
    4. Following messages would be stored into SampleCargoAppDestTable
        {"weight":1}
        {"weight":2}
        {"weight":3}
        {"weight":4}
        {"weight":5}
    */
  
    -- Defines Table SampleCargoAppInputTable to process events having sensorId and temperature(F).
    CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);
  
    -- Define Stream SampleCargoAppDestStream
    CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);
  
    -- Defining a destination table to dump the data from the stream
    CREATE TABLE SampleCargoAppDestTable (weight int);
  
    -- Data Processing
    @info(name='Query')
    INSERT INTO SampleCargoAppDestStream
    SELECT weight
    FROM SampleCargoAppInputTable;
  
    -- Data Processing
    @info(name='Dump')
    INSERT INTO SampleCargoAppDestTable
    SELECT weight
    FROM SampleCargoAppInputTable;`

    // Create an instance of a stream worker and deactivate it before you update it.
    await client.activateStreamApp("Sample-Cargo-App", false);
    const app = await client.streamApp("Sample-Cargo-App");

    // Update the stream worker.
    console.log("--- Updating stream worker `Sample-Cargo-App`");
    result = await app.updateApplication([], updatedAppDefinition);
    console.log(!result.error)
    console.log("--- Waiting 10 seconds for all the resources to be ready");
    await new Promise(resolve => setTimeout(resolve, 10000));
    await app.activateStreamApplication(true);

    // Insert data into the collection via query worker.
    console.log("--- Inserting data to `SampleCargoAppInputTable` collection");
    const queryName = "insertWeight";
    const queryValue = `INSERT { weight:@weight } IN SampleCargoAppInputTable`;
    await client.createRestql(queryName, queryValue);
    await new Promise(resolve => setTimeout(resolve, 2000));
    for (let i = 1; i <= 5; i++) {
      await client.executeRestql(queryName, { weight: i });
      console.log(i)
    }
    await client.deleteRestql(queryName);

    // Run ad hoc query against the store.
    console.log("--- Running an ad hoc query against the store `SampleCargoAppDestTable`");
    const q = "SELECT * FROM SampleCargoAppDestTable limit 3";
    result = await app.query(q);
    console.log(result);

    // Delete the stream worker.
    console.log("--- Deleting stream worker `Sample-Cargo-App`");
    result = await client.deleteStreamApp("Sample-Cargo-App");
    console.log(!result.error)
  } catch (e) {
    console.log(messageHandler(e));
  }
}
main();
```

</TabItem>
</Tabs>
