---
sidebar_position: 10
title: REST APIs Stream Worker Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../../_partials/_prerequisites-api-key.md';
import Steps from '../../../_partials/_api-example-steps.md';

Modern applications need to be highly responsive, always online, and able to access data instantly across the globe. At the same time, they need to be deployed on data centers close to their users. Macrometa global data network (GDN) is a real-time materialized view engine that provides instant data to applications and APIs in a simple interface.

For more information about using Macrometa APIs, refer to [APIs](../../../api-docs/index.md).

## Prerequisites

<Prerequisites />

## REST API Stream Worker Example

Macrometa stream processing allows you to integrate streaming data and take appropriate actions.

<Steps />

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript">

```js
// If you are using Node.js version less than 17.5, then run `npm install node-fetch` and comment out the line below.
// const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

const WebSocket = require('ws');
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (httpUrl, apiKey) {
    this._url = httpUrl;
    this._headers.authorization = `apikey ${apiKey}`; // apikey keyword is needed here
  }

  _handleResponse (response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  }

  req (endpoint, { body, ...options } = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      fetch(self._url + endpoint, {
        headers: self._headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options
      }).then((response) => self._handleResponse(response, resolve, reject));
    });
  }
}

const apiKey = "XXXXX" // Use your API key here
const globalUrl = "api-play.paas.macrometa.io";
const httpUrl = `https://${globalUrl}`;
const tenant = "XXXXX" // Use your tenant name here

const isGlobal = false;
const stream = "tutorialAppInputStream";
const streamWorkerName = "stream_worker_tutorial";
const streamWorkerDef = `@App:name('stream_worker_tutorial')
  @App:description('This application demonstrates how to use user-defined functions in the stream worker.')
  @App:qlVersion("2")
  CREATE FUNCTION concatFn[javascript] return string {
      var str1 = data[0];
      var str2 = data[1];
      var str3 = data[2];
      var response = str1 + str2 + str3;
      return response;
  };
  -- Stream
  CREATE STREAM tutorialAppInputStream (deviceID string, roomNo int, temperature double);
  -- Table
  CREATE TABLE GLOBAL tutorialAppOutputTable (id string, temperature double);
  @info(name='Query')
  INSERT INTO tutorialAppOutputTable
  SELECT concatFn(roomNo,'-',deviceID) AS id, temperature
  FROM tutorialAppInputStream;`;

const run = async function () {
  try {
    const connection = new APIRequest(httpUrl, apiKey);

    /* ---------------------------- Create stream worker ---------------------------- */
    try {
      const streamWorker = await connection.req("/_fabric/_system/_api/streamapps", {
        body: {
          definition: streamWorkerDef,
          regions: []
        },
        method: "POST"
      });
      console.log("Stream worker created successfully", streamWorker);
    } catch (e) {
      if (e.status === 409) {
        console.log("Stream worker already exists, skipping creation");
      } else {
        console.log("Error while creating stream worker");
        throw e;
      }
    }

    /* --------------------------- Activate stream worker --------------------------- */

    await connection.req(
      `/_fabric/_system/_api/streamapps/${streamWorkerName}/active?active=true`,
      {
        method: "PATCH"
      }
    );

    console.log("Activating stream worker...", streamWorkerName);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("Stream worker activated successfully");

    /* ------------------ Publish messages to sample stream worker ------------------ */
    
    const region = isGlobal ? "c8global" : "c8local";
    const streamName = `${region}s.${stream}`;

    // Fetching local URL in case the stream is local as defined in the stream worker
    const localDcDetails = await connection.req(`/datacenter/local`, {
      method: "GET"
    });

    const dcUrl = localDcDetails.tags.url;

    const url = isGlobal
      ? globalUrl
      : `api-${dcUrl}`;

    const otpProducer = await connection.req(`/apid/otp`, {
      method: "POST"
    });

    const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}?otp=${otpProducer.otp}`;

    /* -------------------------- Initializing producer -------------------------- */

    const producer = new WebSocket(producerUrl);

    producer.onopen = function () {
      console.log("WebSocket:Producer is open now for " + streamName);
    };

    producer.onerror = function () {
      console.log(
        "Failed to establish WebSocket:Producer connection for " + streamName
      );
    };

    producer.onclose = function () {
      console.log("Closed WebSocket:Producer connection for " + streamName);
    };

    producer.onmessage = function () {
      console.log("WebSocket:Producer message sent successfully");
    };

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const inputData = [
      {
        deviceID: "AD11",
        roomNo: 200,
        temperature: 18
      },
      { deviceID: "AD11", roomNo: 201, temperature: 47 }
    ];

    producer.send(
      JSON.stringify({
        payload: Buffer.from((JSON.stringify(inputData[0]))).toString('base64')
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 10000));

    producer.send(
      JSON.stringify({
        payload: Buffer.from((JSON.stringify(inputData[1]))).toString('base64')
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 10000));

    producer.close();

    /* ----------------------------- Verify results ----------------------------- */

    const selectQuery = "FOR doc IN tutorialAppOutputTable RETURN doc";

    const result = await connection.req(`/_fabric/_system/_api/cursor`, {
      body: {
        id: "tutorialStreamAppQuery",
        query: selectQuery,
        bindVars: {}
      },
      method: "POST"
    });

    console.log("Input sent --->", inputData);
    console.log("Output received --->", result.result);

    /* ---------------------------- Delete stream worker ---------------------------- */
    
    const deletion = await connection.req(
      `/_fabric/_system/_api/streamapps/${streamWorkerName}`,
      {
        method: "DELETE"
      }
    );

    console.log("Stream worker deleted successfully", deletion);
  } catch (e) {
    console.error(e);
  }
};

run();
```

  </TabItem>
  <TabItem value="py" label="Python">

```py
import requests
import json
import base64
import six
import time
from websocket import create_connection

# Constants  
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
API_KEY = "XXXXX" # Use your API key here
AUTH_TOKEN = f"apikey {API_KEY}"
FABRIC = "_system"
TENANT_NAME = "XXXXX" # Add your tenant name here
STREAM_NAME = "tutorialAppInputStream"
STREAM_WORKER_NAME = "stream_worker_tutorial"
STREAM_WORKER ="""
  @App:name('stream_worker_tutorial')
  @App:qlVersion("2")
  CREATE FUNCTION concatFn[javascript] return string {
      var str1 = data[0];
      var str2 = data[1];
      var str3 = data[2];
      var response = str1 + str2 + str3;
      return response;
  };
  -- Stream
  CREATE STREAM tutorialAppInputStream (deviceID string, roomNo int, temperature double);
  -- Table
  CREATE TABLE GLOBAL tutorialAppOutputTable (id string, temperature double);
  @info(name='Query')
  INSERT INTO tutorialAppOutputTable
  SELECT concatFn(roomNo,'-',deviceID) AS id, temperature
  FROM tutorialAppInputStream;
"""

INPUT_DATA = [
      {
        "deviceID": "AD11",
        "roomNo": 200,
        "temperature": 18,
      },
      { "deviceID": "AD11",
        "roomNo": 201,
        "temperature": 47 },
    ]

SELECT_QUERY = "FOR doc IN tutorialAppOutputTable return doc"

# Create a HTTPS Session

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create a stream worker

url = f"{HTTP_URL}/_fabric/_system/_api/streamapps"
payload = {
  "definition": STREAM_WORKER,
  "regions": []
}

resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("FED URL:", HTTP_URL)
print("\nstream worker Created: ", result)

# Activate stream worker

url = f"{HTTP_URL}/_fabric/_system/_api/streamapps/{STREAM_WORKER_NAME}/active?active=true"
resp = session.patch(url)
result = json.loads(resp.text)
print("\nstream worker Activated: ", result)

# Wait for all inputs and outputs to initialize

time.sleep(5)

# Publish messages to the input stream

stream_type = "c8local"
producerurl = f"wss://{URL}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{stream_type}.{FABRIC}/{stream_type}s.{STREAM_NAME}"
ws = create_connection(producerurl,header={"content-type": 'application/json', 'authorization': AUTH_TOKEN})
payload = {
                "payload": base64.b64encode(
                    six.b(json.dumps(INPUT_DATA[0]))
                ).decode("utf-8")
            }

ws.send(json.dumps(payload))

response = json.loads(ws.recv())
if response['result'] == 'ok':
    print('Message published successfully')
else:
    print('Failed to publish message:', response)

payload = {
                "payload": base64.b64encode(
                    six.b(json.dumps(INPUT_DATA[1]))
                ).decode("utf-8")
            }
ws.send(json.dumps(payload))

response = json.loads(ws.recv())
if response['result'] == 'ok':
    print('Message published successfully')
else:
    print('Failed to publish message:', response)
ws.close()

# Verify results from the collection

url = f"{HTTP_URL}/_fabric/_system/_api/cursor"
payload= {
  "id": "tutorialStreamAppQuery",
  "query": SELECT_QUERY,
  "bindVars": {},
}
resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nstream worker Results: ", result)

# Delete stream worker

url = f"{HTTP_URL}/_fabric/_system/_api/streamapps/{STREAM_WORKER_NAME}"
resp = session.delete(url)
result = json.loads(resp.text)
print("\nstream worker Deleted: ", result)
```

 </TabItem>
</Tabs>  
