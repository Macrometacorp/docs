---
sidebar_position: 10
title: Getting Started with Stream Workers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../_partials/_prerequisites-sdk-api-key.md';
import Steps from '../_partials/_get-started-steps.md';
import ConnectToGDN from '../_partials/_connect-to-gdn-code-block.md';

This article is an introduction to using stream workers with [Macrometa SDKs](../sdks/index.md).

<Prerequisites />

## Get Started with Stream Workers

This page guides you through creating a stream worker, updating it, and running an ad hoc query on it using the [pyC8](https://pyc8.readthedocs.io/en/latest/) and [jsC8](https://www.npmjs.com/package/jsc8) SDKs.

<Steps />

If you want to skip the explanation and just run the code, then go directly to the [Full Demo File](#full-demo-file).

### Connect to GDN

To use stream workers with Macrometa Global Data Network (GDN), you must first establish a connection to a local region.

<ConnectToGDN />

## Validate Stream Application

Validate the stream application for syntax errors before saving.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
stream_app_definition = """
@App:name('Sample-Cargo-App')
@App:qlVersion("2")
@App:description('Basic Stream application to demonstrate reading data from input stream and store it in the collection. The stream and collections are automatically created if they do not already exist.')
/**
Testing the Stream Application:
    1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.
    2. Upload following data into SampleCargoAppInputTable C8DB Collection
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

print("--- Validating Stream Application Definition")
print(client.validate_stream_app(data=stream_app_definition))
```

 </TabItem>
 <TabItem value="js" label="Javascript">

```js
    // Add this snippet in previously created main function
    const appDefinition = `
        @App:name('Sample-Cargo-App')
        @App:qlVersion("2")
        @App:description('Basic Stream application to demonstrate reading data from input stream and store it in the collection. The stream and collections will be created automatically if they do not already exist.')

        /**
         Testing the Stream Application:
            1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.

            2. Upload following data into SampleCargoAppInputTable C8DB Collection
                {"weight": 1}
                {"weight": 2}
                {"weight": 3}
                {"weight": 4}
                {"weight": 5}

            3. Following messages would be shown on the SampleCargoAppDestStream Stream Console
                [1]
                [2]
                [3]
                [4]
                [5]
        */

        -- Create Table SampleCargoAppInputTable to process events having sensorId and temperature(F).
		CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", @map(type='json')) (weight int);


        -- Create Stream SampleCargoAppDestStream
		CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);


        -- Data Processing
        @info(name='Query')
        INSERT INTO SampleCargoAppDestStream 
        SELECT weight
        FROM SampleCargoAppInputTable;`

    console.log("--- Validating Stream Application Definition");
    result = await client.validateStreamApp(appDefinition);
```

 </TabItem>
 </Tabs>

## Save Stream Application

By default, the stream application saves in the local region. Optionally, you can use `dclist` (domain component list) to deploy the stream application in other specified regions or all regions.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
print("--- Creating Stream Application")
print(client.create_stream_app(data=stream_app_definition))
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    // The stream app will be created by default in the local region. Optionally, you can send dclist to deploy stream
    // app in all / selected regions
    console.log("--- Creating Stream Application");
    result = await client.createStreamApp([], appDefinition);
```

  </TabItem>
</Tabs>  

## Enable or Disable Stream Application

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
print("Activate", client.activate_stream_app('Sample-Cargo-App', True))

print("Deactivate", client.activate_stream_app('Sample-Cargo-App', False))
```

  </TabItem>

  <TabItem value="js" label="Javascript">

```js
    console.log("--- Activating `Sample-Cargo-App`");
    const result = await client.activateStreamApp("Sample-Cargo-App", true);

    console.log("--- Deactivating `Sample-Cargo-App`");
    const result = await client.activateStreamApp("Sample-Cargo-App", false);
```

  </TabItem>
 </Tabs>

To operate on created applications, you need to create an instance of the stream application.

## Example: Update Stream Application

In this example, we update a stream application to store the input data into itself and another collection called `SampleCargoAppDestTable`.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
from c8 import C8Client
from c8.fabric import StandardFabric

print("--- Connecting to C8")
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443, email='nemo@nautilus.com', password='xxxxxx', geofabric='_system')

# To operate on created apps, you need to create an instance of the app
app = client._fabric.stream_app("Sample-Cargo-App")

# Update the app using
data = """
@App:name('Sample-Cargo-App')
@App:qlVersion("2")
@App:description('Basic stream application to demonstrate reading data from input stream and store it in the collection. The stream and collections are automatically created if they do not already exist.')
/**
    Testing the Stream Application:
    1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.
    2. Upload following data into SampleCargoAppInputTable C8DB Collection
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}
    3. Following messages would be shown on the `SampleCargoAppDestStream` Stream Console.
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

-- Defines Table SampleCargoAppInputTable
CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

-- Define Stream SampleCargoAppDestStream
CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);

-- Defining a Destination table to dump the data from the stream
CREATE STORE SampleCargoAppDestTable WITH (type = 'database', stream = "SampleCargoAppDestTable") (weight int);

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

# Optionally, specify a comma separated list of regions where stream application needs to be deployed
regions = []
print("--- Updating Stream Application `Sample-Cargo-App`")
result = app.update(data, regions)

#To Enable the stream app
print("Activate", client.activate_stream_app('Sample-Cargo-App', True))
```

  </TabItem>

<TabItem value="js" label="Javascript">

```js  
    const updatedAppDefinition = `
    @App:name('Sample-Cargo-App')
    @App:qlVersion("2")
    @App:description('Basic stream application to demonstrate reading data from input stream and store it in the collection. The stream and collections will be created automatically if they do not already exist.')

    /**
    Testing the Stream Application:
    1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.

    2. Upload following data into SampleCargoAppInputTable C8DB Collection
        {"weight": 1}
        {"weight": 2}
        {"weight": 3}
        {"weight": 4}
        {"weight": 5}

    3. Following messages would be shown on the SampleCargoAppDestStream Stream Console
        [1]
        [2]
        [3]
        [4]
        [5]

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

    CREATE STORE SampleCargoAppDestTable WITH (type = 'database', stream = "SampleCargoAppDestTable") (weight int);

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

    console.log("--- Updating Stream Application `Sample-Cargo-App`");
    result = await app.updateApplication([], updatedAppDefinition);
```

  </TabItem>
</Tabs>

## Run an Ad Hoc Query

In this example, we run an ad hoc query on the store `SampleCargoAppDestTable` used in a stream application. It should get records which you inserted into `SampleCargoAppInputTable`.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
from c8 import C8Client
from c8.fabric import StandardFabric

print("--- Connecting to C8")
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443, email='nemo@nautilus.com', password='xxxxxx', geofabric='_system')

# To operate on created apps, you need to create an instance of the app
app = client._fabric.stream_app("Sample-Cargo-App")
# Run query on application
q = "select * from SampleCargoAppDestTable limit 2"
result = app.query(q)
print(result)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    console.log("--- Running adhoc query on the store `SampleCargoAppDestTable` used in Stream Application. It should get all records which you inserted into `SampleCargoAppInputTable`");
    await app.activateStreamApplication(true);
    const q = "select * from SampleCargoAppDestTable limit 3";
    result = await app.query(q);
    console.log(result);
```

  </TabItem>  
</Tabs>

## Delete Stream Application

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
print("--- Deleting Stream Application `Sample-Cargo-App`")
result = client.delete_stream_app('Sample-Cargo-App')
```

  </TabItem>

  <TabItem value="js" label="Javascript">

```js
    console.log("--- Deleting stream application `Sample-Cargo-App`");
    result = await client.deleteStreamApp("Sample-Cargo-App");
```

  </TabItem>
</Tabs>  

## Get Sample Stream Applications

You can try out several Stream Apps which are preloaded and ready to run.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
print("--- You can try out several stream applications which are pre-loaded and ready to run")
print("Samples", client.get_stream_app_samples())
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    console.log("--- You can try out several Stream Apps which are pre-loaded and ready to run");
    result = await client.getStreamAppSamples();
    console.log('Sample Stream Applications');
    console.log(result);
```

  </TabItem>
</Tabs>  

## Full Demo File

The following example uses the code snippets provided in this tutorial.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
import time
import traceback
from c8 import C8Client
# Simple Approach
print("--- Connecting to C8")
client = C8Client(protocol='https', host='play.paas.macrometa.io', port=443,
                        email='nemo@nautilus.com', password='xxxxx',
                        geofabric='_system')
stream_app_definition = """
    @App:name('Sample-Cargo-App')
    @App:qlVersion("2")
    @App:description('Basic stream application to demonstrate reading data from input stream and store it in the collection. The stream and collections are automatically created if they do not already exist.')
    /**
    Testing the Stream Application:
        1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.
        2. Upload following data into SampleCargoAppInputTable C8DB Collection
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
    */
    -- Create Table SampleCargoAppInputTable to process events.
	CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

    -- Create Stream SampleCargoAppDestStream
	CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);

    -- Data Processing
    @info(name='Query')
    INSERT INTO SampleCargoAppDestStream
    SELECT weight
    FROM SampleCargoAppInputTable;
    """
# Validate a stream application
print(client.validate_stream_app(data=stream_app_definition))
# Create a stream application
print(client.create_stream_app(data=stream_app_definition))
# Retrive a stream application
print("Retrive", client.retrieve_stream_app())
# Get a stream application handle for advanced operations
print("Get App", client.get_stream_app('Sample-Cargo-App'))
# Deactivate a stream application
print("Deactivate", client.activate_stream_app('Sample-Cargo-App', False))
# Activate a stream application
print("Activate", client.activate_stream_app('Sample-Cargo-App', True))
# Delete a stream application
print(client.delete_stream_app('Sample-Cargo-App'))
# Get stream application samples
print("Samples", client.get_stream_app_samples())
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Variables
const streamAppName = "Sample-Cargo-App";
const sourceCollectionName = "SampleCargoAppInputTable";
const destinationCollectionName = "SampleCargoAppDestTable";
const parameter = { weight: "" };
const globalUrl = "https://play.paas.macrometa.io";
const thisApiKey = "XXXXX";

const insertDataValue = {
  query: {
    name: "insertWeight",
    value: `INSERT { weight:@weight } IN ${sourceCollectionName}`,
    parameter
  }
};

const queryName = insertDataValue.query.name.toString();
const queryValue = insertDataValue.query.value.toString();

// App definitions
const appDefinition =
  `@App:name('Sample-Cargo-App')
  @App:qlVersion("2")
  @App:description('Basic stream application to demonstrate reading data from input stream and store it in the collection. The stream and collections will be created automatically if they do not already exist.')

  -- Defines Table SampleCargoAppInputTable to process events having sensorId and temperature(F). 
  CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

  -- Define Stream SampleCargoAppDestStream
  CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);

  -- Data Processing
  @info(name='Query')
  INSERT INTO SampleCargoAppDestStream 
  SELECT weight
  FROM SampleCargoAppInputTable;`;

const updatedAppDefinition = `
  @App:name('Sample-Cargo-App')
  @App:qlVersion("2")
  @App:description('Basic stream application to demonstrate reading data from input stream and store it in the collection. The stream and collections will be created automatically if they do not already exist.')

  /**
  Testing the Stream Application:
  1. Open Stream SampleCargoAppDestStream in Console. The output can be monitored here.

  2. Upload following data into SampleCargoAppInputTable C8DB Collection
    {"weight": 1}
    {"weight": 2}
    {"weight": 3}
    {"weight": 4}
    {"weight": 5}

  3. Following messages would be shown on the SampleCargoAppDestStream Stream Console
    [1]
    [2]
    [3]
    [4]
    [5]

  4. Following messages would be stored into SampleCargoAppDestTable
    {"weight":1}
    {"weight":2}
    {"weight":3}
    {"weight":4}
    {"weight":5}
  */

  -- Create Table SampleCargoAppInputTable to process events having sensorId and temperature(F).
  CREATE SOURCE SampleCargoAppInputTable WITH (type = 'database', collection = "SampleCargoAppInputTable", collection.type="doc", replication.type="global", map.type='json') (weight int);

  -- Create Stream SampleCargoAppDestStream
  CREATE SINK SampleCargoAppDestStream WITH (type = 'stream', stream = "SampleCargoAppDestStream", replication.type="local") (weight int);

  CREATE STORE SampleCargoAppDestTable WITH (type = 'database', stream = "SampleCargoAppDestTable") (weight int);

  -- Data Processing
  @info(name='Query')
  INSERT INTO SampleCargoAppDestStream
  SELECT weight
  FROM SampleCargoAppInputTable;

  -- Data Processing
  @info(name='Dump')
  INSERT INTO SampleCargoAppDestTable
  SELECT weight
  FROM SampleCargoAppInputTable;`;

// This is a supporting function
function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

async function main () {

  console.log("--- Connecting to GDN");
  // email = "";
  // password = "";
  // Create an authenticated instance with a token or API key
  // const client = new jsc8({url: "https://play.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
  const client = new jsc8({ url: globalUrl, apiKey: thisApiKey, fabricName: "_system" });
  // console.log("Authentication done!!...");
  
  // Or use email and password to authenticate a client instance
  // const client = new jsc8("https://play.paas.macrometa.io");
  // await client.login("email", "password");
  console.log("Connection successful");
  async function hasStreamApp (streamApp) {
    console.log(`Checking if the stream application ${streamApp} already exists`);
    try {
      const temp = await client.getStreamApp(streamApp);
      console.log(temp);
      console.log("The stream application already exist");
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        console.log("The stream application does not exist yet");
        return false;
      } else {
        console.log("Another issue has been detected");
        console.log(e);
      }
    }
  }

  async function hasQueryWorker (queryWorkerName) {
    try {
      const res = await client.getRestqls();

      for (i = 0; i < res.result.length; i++) {
        if (res.result[i].name === queryWorkerName) {
          console.log(`Query worker ${queryName} already exist`);
          return true;
        }
      }
      console.log(`Query worker ${queryName} does not exist yet`);
      return false;
    } catch (e) {
      console.log(messageHandler(e));
    }
  }

  async function creatingQueryWorker () {
    console.log(`--- Creating insert query worker "${insertDataValue.query.name}" if needed`);
    if (!await hasQueryWorker(queryName)) {
      client.createRestql(queryName, queryValue, parameter);
      console.log(`Query worker ${queryName} has been created successfully`);
    }
  }

  async function creatingStreamApplication () {
    let result = await client.get();

    console.log("--- Validating stream application definition");
    result = await client.validateStreamApp(appDefinition);
    console.log(result);
    // By default, the stream application is created in the local region. Optionally, you can send dclist to deploy stream
    // app in all / selected regions
    console.log("--- Creating stream application");
    if (await hasStreamApp(streamAppName)) {
      result = await client.getStreamApp(streamAppName);
    } else {
      result = await client.createStreamApp([], appDefinition);
    }
    console.log(result);

    console.log("--- Getting stream application instance: " + streamAppName);
    result = await client.getStreamApp(streamAppName);
    console.log(result);
  }

  async function enablingStreamApplication () {
    console.log("--- Enable stream application " + streamAppName);
    // Enable app using change_state function
    const result = await client.activateStreamApp(streamAppName, true);
    console.log(result);
    console.log("The connection has been opened");
  }

  async function updatingSteamApplication () {
    const app = await client.streamApp(streamAppName);

    console.log("--- Updating stream application " + streamAppName);
    await app.updateApplication([], updatedAppDefinition);
    // Enable app using change_state function
    await app.activateStreamApplication(true);
  }

  async function insertingData () {
    console.log("Waiting for 30 seconds for all the resources to be ready");
    await sleep(30000);
    console.log("--- Inserting data to " + sourceCollectionName);
    for (i = 1; i <= 50; i++) {
      await client.executeRestql(queryName, { weight: i });
      console.log(i);
    }
  }

  async function disablingStreamApplication () {
    await client.activateStreamApp(streamAppName, false);
    console.log("The connection has been closed");
  }

  async function displayingResults () {
    const app = await client.streamApp(streamAppName);

    // As per the query, the result is limited to the first 10 results
    console.log(`--- Running adhoc query on the store ${destinationCollectionName} used in stream application. 
      It should get all records which you inserted into ${sourceCollectionName}`);
    const q = `select * from ${destinationCollectionName} limit 10`;
    const result = await app.query(q);
    console.log(result);
  }

  async function deletingStreamApplication () {
    const app = await client.streamApp(streamAppName);
    console.log(`--- Deleting stream application ${streamAppName}`);
    await app.deleteApplication();
  }

  async function displayingSampleApplications () {
    console.log("--- You can try out several stream applications which are pre-loaded and ready to run");
    const result = await client.getStreamAppSamples();
    console.log("Sample Stream Applications:");
    console.log(result);
  }

  async function run () {
    try {
      await creatingQueryWorker();
      await creatingStreamApplication();
      await enablingStreamApplication();
      await updatingSteamApplication();
      await insertingData();
      await disablingStreamApplication();
      await displayingResults();

      // Only the stream application is removed with the code
      await deletingStreamApplication();

      // Code below can be used to see the sample stream apps
      // await displayingSampleApplications();
    } catch (e) {
      console.log(messageHandler(e));
    }
  }

  run();
}

main();
```

  </TabItem>
</Tabs>
