---
sidebar_position: 1
title: Using Rest API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using REST APIs

Modern applications need to be highly responsive, always online, and able to access data instantly across the globe. At the same time, they need to be deployed on datacenters close to their users. Macrometa global data network (GDN) is a real-time materialized view engine that provides instant data to applications and APIs in a simple interface.

If you are new to Macrometa GDN, start by reading the [What is Macrometa](../../what-is-macrometa.md) of Macrometa GDN.

Prerequisites:

A Macrometa GDN tenant account and credentials.

## API Browser

Your main tool for using REST APIs is the API reference in the [GDN](https://gdn.paas.macrometa.io) web browser interface. Use the built-in API reference to run various calls and view their input and output.

![GDN API Browser](/img/gdn-api-browser.png)

## Stream Processing

Macrometa Stream Processing allows you to integrate streaming data and take appropriate actions. 



<Tabs groupId="operating-systems">
 <TabItem value="py" label="Python">

```py
import requests
import json
import base64
import six
import time
from websocket import create_connection

# Constants  
FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxxx"
FABRIC = "_system"
AUTH_TOKEN = "bearer "
TENANT_NAME = "nemo_nautilus.com"

STREAM_NAME = "tutorialAppInputStream"
STREAM_APP_NAME = "stream_app_tutorial"
STREAM_APP ="""
  @App:name('stream_app_tutorial')
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
  CREATE TABLE tutorialAppOutputTable (id string, temperature double);
  @info(name='Query')
  INSERT INTO tutorialAppOutputTable
  SELECT concatFn(roomNo,'-',deviceID) as id, temperature
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
url = f"{FED_URL}/_open/auth"
payload = {
    'email':EMAIL,
    'password':PASSWORD
    }
headers = {
    'content-type': 'application/json'
    }

response = requests.post(url, data = json.dumps(payload), headers = headers)
if response.status_code == 200:
    resp_body = json.loads(response.text)
    AUTH_TOKEN += resp_body["jwt"]
    TENANT = resp_body["tenant"]
else:
    raise Exception(f"Error while getting auth token. Code:{response.status_code}, Reason:{response.reason}")

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create a Stream Application
url = f"{FED_URL}/_fabric/_system/_api/streamapps"
payload = {
  "definition": STREAM_APP,
  "regions": []
}

resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("FED URL:", FED_URL)
print("\nStream App Created: ", result)

# Activate Stream Application
url = f"{FED_URL}/_fabric/_system/_api/streamapps/{STREAM_APP_NAME}/active?active=true"
resp = session.patch(url)
result = json.loads(resp.text)
print("\nStream App Activated: ", result)

# Wait for all inputs and outputs to initialize
time.sleep(5)
# Publish Messages to the input stream
stream_type = "c8local"
producerurl = f"wss://{FEDERATION}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{stream_type}.{FABRIC}/{stream_type}s.{STREAM_NAME}"
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
url = f"{FED_URL}/_fabric/_system/_api/cursor"
payload= {
  "id": "tutorialStreamAppQuery",
  "query": SELECT_QUERY,
  "bindVars": {},
}
resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nStream App Results: ", result)

# Delete Stream Application
url = f"{FED_URL}/_fabric/_system/_api/streamapps/{STREAM_APP_NAME}"
resp = session.delete(url)
result = json.loads(resp.text)
print("\nStream App Deleted: ", result)
```
 </TabItem>
<TabItem value="js" label="Javascript">

```js
// If you are using Node.js version less than 17.5, then run `npm install node-fetch` and comment out the line below.
// const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));

const WebSocket = require('ws');
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (url) {
    this._url = url;
  }

  login (email, password) {
    const endpoint = "/_open/auth";

    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .req(endpoint, {
          body: { email, password },
          method: "POST"
        })
        .then(({ jwt, ...data }) => {
          self._headers.authorization = `bearer ${jwt}`;
          resolve(data);
        })
        .catch(reject);
    });
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
        ...options,
      }).then((response) => self._handleResponse(response, resolve, reject));
    });
  }
}
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const federationName = "api-gdn.paas.macrometa.io";
const federationUrl = `https://${federationName}`;

const isGlobal = false;
const stream = "tutorialAppInputStream";
const streamAppName = "stream_app_tutorial";
const streamAppDef = `@App:name('stream_app_tutorial')
  @App:description('This application demonstrates how to use user-defined functions in the stream app.')
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
  CREATE TABLE tutorialAppOutputTable (id string, temperature double);
  @info(name='Query')
  INSERT INTO tutorialAppOutputTable
  SELECT concatFn(roomNo,'-',deviceID) as id, temperature
  FROM tutorialAppInputStream;`;

const run = async function () {
  try {
    const connection = new APIRequest(federationUrl);

    /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

    const { tenant } = await connection.login(email, password);

    console.log("Log in successful using: ", tenant);

    /* ---------------------------- Create stream app ---------------------------- */
    try {
      const streamApp = await connection.req("/_fabric/_system/_api/streamapps", {
        body: {
          definition: streamAppDef,
          regions: []
        },
        method: "POST"
      });
      console.log("Stream app created successfully", streamApp);
    } catch (e) {
      if (e.status === 409) {
        console.log("Stream app already exists, skipping creation");
      } else {
        console.log("Error while creating stream app");
        throw e;
      }
    }

    /* --------------------------- Activate stream app --------------------------- */

    await connection.req(
      `/_fabric/_system/_api/streamapps/${streamAppName}/active?active=true`,
      {
        method: "PATCH"
      }
    );

    console.log("Activating stream app...", streamAppName);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("Stream app activated successfully");

    /* ------------------ Publish messages to sample stream app ------------------ */
    
    const region = isGlobal ? "c8global" : "c8local";
    const streamName = `${region}s.${stream}`;

    // Fetching local URL in case the stream is local (which is defined in the stream app)
    const localDcDetails = await connection.req(`/datacenter/local`, {
      method: "GET"
    });

    const dcUrl = localDcDetails.tags.url;

    const url = isGlobal
      ? federationName
      : `api-${dcUrl}`;

    const otpProducer = await connection.req(`/apid/otp`, {
      method: "POST"
    });

    const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}?otp=${otpProducer.otp}`;

    /* -------------------------- Initalizing producer -------------------------- */

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

    /* ---------------------------- Delete stream app ---------------------------- */
    const deletion = await connection.req(
      `/_fabric/_system/_api/streamapps/${streamAppName}`,
      {
        method: "DELETE"
      }
    );

    console.log("Stream app deleted successfully", deletion);
  } catch (e) {
    console.error(e);
  }
};

run();
```
  </TabItem>
</Tabs>  
