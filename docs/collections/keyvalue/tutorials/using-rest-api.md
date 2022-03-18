---
sidebar_position: 1
title: Using Rest API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

For the following examples, assume these credentials:

* Tenant name: nemo@nautilus.com
* Password: xxxxxx


## API Browser

Your best friend when working with REST APIs is the REST API browser available in [GDN](https://gdn.paas.macrometa.io) GUI. From there, you can execute various rest apis and see exactly what the inputs and outputs are.

![GDN API Browser](/img/gdn-api-browser.png)

## Connect to GDN

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    import requests
    import json

    # Constants

    FEDERATION = "api-gdn.paas.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    AUTH_TOKEN = "bearer "

    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
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
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

  </TabItem>
</Tabs>  

## Create Collection

Create a KV collection.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Create a collection

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME

    resp = session.post(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    if "error" in resp.keys():
        print("ERROR: " + resp['errorMessage'])
    else:
        print("\nCollection Created: ", resp.text)


  </TabItem>
</Tabs>  

## Insert KV Pairs

Insert Key Value pairs into collection.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Insert KV pairs into a collection
    data = [
      {
        "_key": "John",
        "value": "Science",
        "expireAt": 0
      },
      {
        "_key": "Alice",
        "value": "Maths",
        "expireAt": 0
      },
      {
        "_key": "Alex",
        "value": "Physics",
        "expireAt": 0
      },
      {
        "_key": "Monika",
        "value": "Chemistry",
        "expireAt": 0
      }
    ]

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/value"
    print(url)
    resp = session.put(url, data = json.dumps(data))
    print("\nMultiple Documents Inserted: ", resp.text)

  </TabItem>
</Tabs>  

## Get Value 

Get value for a given key.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Get value for a key

    KEY = "Monika"
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME + "/value/" + KEY
    resp = session.get(url)
    print("\nDocument with specified Key is: ",resp.text)

  </TabItem>
</Tabs>  

## Get Count

Get size of the kv collection.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Get collection count

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME + "/count"
    resp = session.get(url)
    print("\nNumber of kv pairs in your collection: ",resp.text)
  
  </TabItem>
</Tabs>  

## Update Value

Update value for a given key in the collection.


<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Update value for a key
    data =  {
        "_key": "Monika",
        "value": "Biology",
        "expireAt": 0
      }
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/value"
    resp = session.put(url, data = json.dumps(data))
    print("\nDocument Updated: ", resp.text)
  
  </TabItem>
</Tabs>  

## Delete Value

Delete value for a given key.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Delete value for a Key
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/value/" + KEY
    resp = session.delete(url)
    print("\nDocument with specified Key Deleted: ", resp.text)

    # Delete value for multiple Keys
    data = ["Alex", "Alice", "John"]
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/values"
    resp = session.delete(url, data = json.dumps(data))
    print("\nDocument with specified Key Deleted: ", resp.text)

  </TabItem>
</Tabs>  

## Get Collections

Get collections.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Get collections
    url = FED_URL + "/_api/kv"
    resp = session.get(url)
    print("\nCollections : ",resp.text)

  </TabItem>
</Tabs>  

## Delete Collections

Delete collection.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Delete collection

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME 
    resp = session.delete(url)
    print("\nCollection Deleted: ", resp.text)

  </TabItem>
</Tabs>  

## Complete example

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    import requests
    import json

    # Constants

    FEDERATION = "api-gdn.paas.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    AUTH_TOKEN = "bearer "
    COLLECTION_NAME = "students"

    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
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
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

    # Get list of all regions

    url = FED_URL + "/_api/datacenter/all"
    dcl_resp = session.get(url)
    dcl_list = json.loads(dcl_resp.text)
    regions = []
    for dcl in dcl_list:
        dcl_url = dcl['tags']['url']
        regions.append(dcl_url)
    print("\nList of Regions: ",regions)

    # Create a collection

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME

    resp = session.post(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    if "error" in resp.keys():
        print("ERROR: " + resp['errorMessage'])
    else:
        print("\nCollection Created: ", resp.text)

    # Insert KV pairs in a Collection
    data = [
      {
        "_key": "John",
        "value": "Science",
        "expireAt": 0
      },
      {
        "_key": "Alice",
        "value": "Maths",
        "expireAt": 0
      },
      {
        "_key": "Alex",
        "value": "Physics",
        "expireAt": 0
      },
      {
        "_key": "Monika",
        "value": "Chemistry",
        "expireAt": 0
      }
    ]

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/value"
    print(url)
    resp = session.put(url, data = json.dumps(data))
    print("\nMultiple Documents Inserted: ", resp.text)

    # Get value for a given key

    KEY = "Monika"
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME + "/value/" + KEY
    resp = session.get(url)
    print("\nDocument with specified Key is: ",resp.text)

    # Get collection count

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME + "/count"
    resp = session.get(url)
    print("\nNumber of kv pairs in your collection: ",resp.text)

    # Update value for a key
    data =  {
        "_key": "Monika",
        "value": "Biology",
        "expireAt": 0
      }
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/value"
    resp = session.put(url, data = json.dumps(data))
    print("\nDocument Updated: ", resp.text)

    # Delete value for a key
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/value/" + KEY
    resp = session.delete(url)
    print("\nDocument with specified Key Deleted: ", resp.text)

    # Delete value for multiple keys
    data = ["Alex", "Alice", "John"]
    url = FED_URL + "/_api/kv/" + COLLECTION_NAME +"/values"
    resp = session.delete(url, data = json.dumps(data))
    print("\nDocument with specified Key Deleted: ", resp.text)

    # Get collections
    url = FED_URL + "/_api/kv"
    resp = session.get(url)
    print("\nCollections : ",resp.text)


    # Delete collection

    url = FED_URL + "/_api/kv/" + COLLECTION_NAME 
    resp = session.delete(url)
    print("\nCollection Deleted: ", resp.text)

  </TabItem>
  <TabItem value="js" label="Javascript"> 

    class APIRequest {
      _headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      };
      
      constructor(url) {
      this._url = url;
      }
      
      login(email, password) {
      const endpoint = "/_open/auth";
      
      const self = this;
      
      return new Promise(function (resolve, reject) {
      self
      .req(endpoint, {
      body: { email, password },
      method: "POST",
      })
      .then(({ jwt, ...data }) => {
      self._headers.authorization = bearer ${jwt};
      resolve(data);
      })
      .catch(reject);
      });
      }
      
      _handleResponse(response, resolve, reject) {
      if (response.ok) {
      resolve(response.json());
      } else {
      reject(response);
      }
      }
      
      req(endpoint, { body, ...options } = {}) {
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
      const EMAIL = "nemo@nautilus.com";
      const PASSWORD = "xxxxxx";
      const FEDERATION_URL = "https://api-gdn.paas.macrometa.io";
      
      const COLLECTION_NAME = "students";
      
      const run = async function () {
      try {
      const connection = new APIRequest(FEDERATION_URL);
      
      /* -------------------- Log in (nemo@nautilus.com/xxxxxxx) -------------------- */
      
      await connection.login(EMAIL, PASSWORD);
      
      console.log("Login Successfully using", EMAIL);
      
      /* -------------------------- Create collection ------------------------- */
      
      const collection = await connection.req(
      `/_fabric/_system/_api/kv/${COLLECTION_NAME}`,
      {
      method: "POST",
      }
      );
      
      console.log("COLLECTION CREATED SUCCESSFULLY", collection);
      
      /* ---------------------------- Insert key-value pairs ---------------------------- */
      
      const document = await connection.req(
      `/_fabric/_system/_api/kv/${COLLECTION_NAME}/value`,
      {
      body: [
      {
      "_key": "John",
      "value": "Science",
      "expireAt": 0
      },
      {
      "_key": "Alice",
      "value": "Maths",
      "expireAt": 0
      },
      {
      "_key": "Alex",
      "value": "Physics",
      "expireAt": 0
      },
      {
      "_key": "Monika",
      "value": "Chemistry",
      "expireAt": 0
      }
      ]
      ,
      method: "PUT",
      }
      );
      
      console.log("KV PAIRS INSERTED SUCCESSFULLY", document);
      
      /* ----------------------------- Get value for a Key ----------------------------- */
      let key = "Monika";
      const readVal = await connection.req(
      `/_fabric/_system/_api/kv/${COLLECTION_NAME}/value/${key}`
      );
      
      console.log("VALUE FOR SPECIFIED KEY IS", readVal);
      
      /* ---------------------------- Get collection count ---------------------------- */
      
      const collCount = await connection.req(
      `/_fabric/_system/_api/kv/${COLLECTION_NAME}/count`,
      {
      method: "GET",
      }
      );
      
      console.log("COLLECTION COUNT", collCount);
      
      /* ----------------------------- Update value for a key ----------------------------- */
      
      const updateValue = await connection.req(
      `/_fabric/_system/_api/kv/${COLLECTION_NAME}/value`,
      {
      body: [
      {
      "_key": "John",
      "value": "Biology",
      "expireAt": 0
      }
      ]
      ,
      method: "PUT",
      }
      );
      
      console.log("KV PAIR UPDATED SUCCESSFULLY", updateValue);
      /* --------------------------- Delete value for a key ---------------------------- */
      
      const deletedValue = await connection.req(
      `/_fabric/_system/_api/kv/${COLLECTION_NAME}/value/${key}`,
      { method: "DELETE" }
      );

      
      /* --------------------------- Delete collection ---------------------------- */
      const deletedCollection = await connection.req(
      `/_fabric/_system/_api/kv/${COLLECTION_NAME}`,
      { method: "DELETE" }
      );
      
      console.log("COLLECTION DELETED SUCCESSFULLY", deletedCollection);
      } catch (e) {
      console.error(e);
      }
      };
      
      run();
  </TabItem>
</Tabs>  
