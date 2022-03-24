---
sidebar_position: 1
title: Using Rest API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using REST APIs

Today’s applications are required to be highly responsive and always online. They need to be deployed in datacenters closer to their users and can access data instantly across the globe. 

Macrometa global data network (GDN) is a fully managed realtime materialzed view engine that provides access to data instantly to Apps & APIs in a simple & single interface. 

:::note
If you are new to Macrometa GDN, we strongly recommend reading **[Essentials](../../essentials/overview.md)** of Macrometa GDN.
:::
## Pre-Requiste

A tenant account (and credentials) with Macrometa GDN.

## API Browser

Your best friend when working with REST APIs is the REST API browser available in [GDN](https://gdn.paas.macrometa.io) GUI. From there, you can execute various rest apis and see exactly what the inputs and outputs are.

![GDN API Browser](/img/gdn-api-browser.png)

## Pub-Sub with Streams

**GDN streams** is a high-performance solution for server-to-server messaging.

It provides,

- Seamless geo-replication of messages across regions,
- Very low publish and end-to-end latency,
- Seamless scalability to over a million topics.
- Multiple subscription modes (`exclusive`, `shared`, and `failover`) for streams.
- Guaranteed message delivery with persistent message storage.

`Streams` are built on the _publish-subscribe_ pattern, aka pub-sub. In this pattern, producers publish messages to streams. Consumers can then subscribe to those streams, process incoming messages, and send an acknowledgement when processing is complete.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    import requests
    import json
    from websocket import create_connection
    import base64
    import six

    # Constants

    FEDERATION = "gdn.paas.macrometa.io"
    FED_URL = "https://api-{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    STREAM_NAME = "teststream"
    AUTH_TOKEN = "bearer "
    TENANT_NAME = "xxxxxx"
    CONSUMER_NAME = "testconsumer"


    # Create a HTTPS Session

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

    # Create a stream
    # Note:- For a global stream pass global=true and global=false for local stream
    url = FED_URL + "/_fabric/" + FABRIC + "/streams/" + STREAM_NAME + "?global=true"
    resp = session.post(url)
    print("\nStream Created: ", resp.text)

    # Publish Messages
    # Send message in body
    url = FED_URL + "/_fabric/" + FABRIC + "/streams/" + STREAM_NAME + "/publish?global=true"
    resp = session.post(url)
    print("\nStream Created: ", resp.text)

    # or

    stream_type = "c8local"
    producerurl = "wss://" + FEDERATION + "/_ws/ws/v2/producer/persistent/" + TENANT_NAME +\
                    "/" + stream_type + "." + FABRIC + "/" + stream_type + "s." + STREAM_NAME

    ws = create_connection(producerurl)
    payload = {
                    "payload": base64.b64encode(
                        six.b("Hello World")
                    ).decode("utf-8")
                }
    ws.send(json.dumps(payload))
    response = json.loads(ws.recv())
    if response['result'] == 'ok':
        print('Message published successfully')
    else:
        print('Failed to publish message:', response)
    ws.close()

    # Subscribe

    consumerurl = "wss://" + FEDERATION + "/_ws/ws/v2/consumer/persistent/" + TENANT_NAME +\
                    "/" + stream_type + "." + FABRIC + "/" + stream_type + "s." + STREAM_NAME +\
                    "/" + CONSUMER_NAME
    ws = create_connection(consumerurl)
    while True:
        msg = json.loads(ws.recv())
        if msg:
            print("received: {}".format(base64.b64decode(msg['payload'])))
            # Acknowledge successful processing
            ws.send(json.dumps({'messageId': msg['messageId']}))
            break
    ws.close()

    # Delete Subscription/ Unsubscribe
    url = FED_URL + "/_api/streams/unsubscribe/" + CONSUMER_NAME
    resp = session.post(url, data = json.dumps(payload))
    print("Subsrcription Deleted: ", resp.text)

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
              self._headers.authorization = `bearer ${jwt}`;
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
    const FEDERATION_NAME = api-gdn.paas.macrometa.io";
    const FEDERATION_URL = `https://${FEDERATION_NAME}`;

    const STREAM_NAME = "api_tutorial_streams";
    const CONSUMER_NAME = "api_tutorial_streams_consumer";
    const IS_GLOBAL = true;

    const run = async function () {
      try {
        const connection = new APIRequest(FEDERATION_URL);

        /* -------------------- Login (nemo@nautilus.com/xxxxxx) -------------------- */

        const { tenant } = await connection.login(EMAIL, PASSWORD);

        console.log("Login Successfully using", tenant);
        /* ------------------------------ Create Stream ----------------------------- */

        const stream = await connection.req(
          `/_fabric/_system/streams/${STREAM_NAME}?global=${IS_GLOBAL}`,
          {
            body: { name: STREAM_NAME },
            method: "POST",
          }
        );

        console.log("STREAM CREATED SUCCESSFULLY", stream);

        /* ----------------- Publish and Subscribe message to stream ---------------- */

        const region = IS_GLOBAL ? "c8global" : "c8local";
        const streamName = `${region}s.${STREAM_NAME}`;
        const url = IS_GLOBAL
          ? FEDERATION_NAME : `api-${streamApp.streamApps[0].regions[0]}.prod.macrometa.io`

        const consumerUrl = `wss://${url}/_ws/ws/v2/consumer/persistent/${tenant}/${region}._system/${streamName}/${CONSUMER_NAME}`;

        const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}`;

        var consumer;
        var producer;
        var producer_interval;

        /* -------------------------- Initalizing Consumer -------------------------- */

        const initConsumer = () => {
          return new Promise((resolve) => {
            consumer = new WebSocket(consumerUrl);

            consumer.onopen = function () {
              console.log("WebSocket:Consumer is open now for " + streamName);
              resolve();
            };

            consumer.onerror = function () {
              console.log(
                "Failed to establish WebSocket:Consumer connection for " +
                  streamName
              );
            };

            consumer.onclose = function () {
              console.log("Closed WebSocket:Consumer connection for " + streamName);
            };

            consumer.onmessage = function (message) {
              var receivedMsg = message.data && JSON.parse(message.data);

              console.log(
                `WebSocket:Consumer message received at ${new Date()}`,
                receivedMsg
              );

              const ackMsg = { messageId: receivedMsg.messageId };
              consumer.send(JSON.stringify(ackMsg));
            };
          });
        };

        /* -------------------------- Initalizing Producer -------------------------- */

        const initProducer = () => {
          producer = new WebSocket(producerUrl);

          producer.onopen = function () {
            console.log("WebSocket:Producer is open now for " + streamName);
            producer_interval = setInterval(function () {
              console.log(`WebSocket:Producer message sent at ${new Date()}`);
              producer.send(JSON.stringify({ payload: `test` }));
            }, 10000);
          };

          producer.onclose = function (e) {
            console.log("Closed WebSocket:Producer connection for " + streamName);
            clearInterval(producer_interval);
          };

          producer.onerror = function (e) {
            console.log(
              "Failed to establish WebSocket:Producer connection for " + streamName
            );
          };
        };

        initConsumer().then(() => {
          initProducer();
        });

        await new Promise((resolve) => setTimeout(resolve, 1 * 40 * 1000));

        consumer.close();
        console.log("CONSUMER CLOSING...");
        producer.close();
        console.log("PRODUCER CLOSING...");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        /* ------------------------ Unsubscribe from stream. ------------------------ */

        const consumerUnsubscribe = await connection.req(
          `/_fabric/_system/_api/streams/unsubscribe/${CONSUMER_NAME}`,
          {
            method: "POST",
          }
        );

        console.log(
          `${CONSUMER_NAME} UNSUBSCRIBED SUCCESSFULLY`,
          consumerUnsubscribe
        );

        /* ------------------------------ Delete topic ------------------------------ */
      } catch (e) {
        console.error(e);
      }
    };

    run();

  </TabItem>
</Tabs>  
