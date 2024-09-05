---
sidebar_position: 110
title: Pub-Sub with Streams in Browser Example
---

## Overview

This tutorial walks you through the steps to integrating the Macrometa Streams with a simple HTML application. 
This example shows how to use the GDN console to publish messages on a stream and subscribe to receive messages.

## Steps

1. Create a new HTML file in your preferred IDE.
1. Copy the following HTML code into your new file. 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pub-Sub demo</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Overpass+Mono&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css"
    />
    <style rel="stylesheet">
      #console {
        font-family: "Roboto Mono", monospace !important;
      }
    </style>
  </head>

  <body class="container" style="max-width: none;">
    <div class="row">
      <div class="column column-40" style="padding: 20px; height: 100vh;">
        <h1>Pub Sub Demo</h1>

        <textarea
          rows="10"
          style="resize: vertical; height: 200px;"
          placeholder="Enter your message here..."
          id="messageBox"
          disabled
        ></textarea>
        <div style="display: flex;">
          <div style="flex-grow: 1;">
            <button onclick="init()" class="button-outline" id="startButton">
              Start
            </button>

            <button
              onclick="closeConnection()"
              class="button-clear"
              disabled
              id="closeButton"
            >
              Close
            </button>
          </div>

          <button onclick="publish()" id="publishButton" disabled>
            Publish
          </button>
        </div>
      </div>
      <div
        id="console"
        class="column column-60"
        style="padding: 20px; height: 100vh; background: black; overflow: auto;"
      ></div>
    </div>
  </body>
<script type="text/javascript"></script>
</html>
```
## Step 2: Create API middleware to manage API calls

Add the following script to the script tag in your html code. This adds an API middleware to manage your API calls.

```js
    /* ------------------- API MIDDLEWARE TO MANAGE API CALLS ------------------- */

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
          }).then((response) =>
            self._handleResponse(response, resolve, reject)
          );
        });
      }
    }
```

## Step 3: Working with pub-sub

This step involves sub steps.

### Step 3a: Define your constants and other helpful parameters and variables

Before connecting and creating a pub-sub connection to Macrometa streams, you need to define the following:

```js

    /*Define your stream connection details*/

    const EMAIL = "your@email.com";
    const PASSWORD = "password";

    const URL_NAME = "api-play.paas.macrometa.io";
    const HTTP_URL = `https://${URL_NAME}`;

    const STREAM_NAME = "api_tutorial_streams";
    const CONSUMER_NAME = "api_tutorial_streams_consumer";
    const IS_GLOBAL = true;

    /* ------------------------------ UI References ----------------------------- */

    const consoleElement = document.getElementById("console");
    const input = document.getElementById("messageBox");
    const startButton = document.getElementById("startButton");
    const closeButton = document.getElementById("closeButton");
    const publishButton = document.getElementById("publishButton");

    /* ---------------------------- Global Variables ---------------------------- */

    var consumer;
    var producer;

    /* ---------------------------- Helpers Functions --------------------------- */

    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    function getTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      // add a zero in front of numbers<10
      m = checkTime(m);
      s = checkTime(s);
      return h + ":" + m + ":" + s;
    }

    function print(msg) {
      var node = document.createElement("small");

      node.style =
        "display:block; font-weight:400;color:white;word-break:break-all;position:relative;padding-left:100px";
      var span = document.createElement("span");
      span.style = "position:absolute;left:0";

      var time = document.createTextNode(`> ${getTime()} : `);

      span.appendChild(time);

      var textnode = document.createTextNode(`${msg}`);
      node.appendChild(span);
      node.appendChild(textnode);
      consoleElement.appendChild(node);
      consoleElement.scrollTop = consoleElement.scrollHeight;
    }

    function toggleUIButtons(
      skip = { start: false, publish: false, close: false }
    ) {
      if (!skip.start) startButton.disabled = !startButton.disabled;
      if (!skip.publish) publishButton.disabled = !publishButton.disabled;
      if (!skip.close) closeButton.disabled = !closeButton.disabled;
      if (!skip.publish) input.disabled = !input.disabled;
    }

    /* -------------------------------------------------------------------------- */

    const connection = new APIRequest(HTTP_URL);

    const init = async function () {
      try {
        toggleUIButtons({ publish: true, close: true });

        /* -------------------- Login (your@email.com/password) -------------------- */

        const { tenant } = await connection.login(EMAIL, PASSWORD);

        print("Login Successfully using " + tenant);
        /* ------------------------------ Create Stream ----------------------------- */

        try {
          const stream = await connection.req(
            `/_fabric/_system/streams/${STREAM_NAME}?global=${IS_GLOBAL}`,
            {
              body: { name: STREAM_NAME },
              method: "POST",
            }
          );
          print("STREAM CREATED SUCCESSFULLY");
        } catch (e) {
          if (e.status == 409) {
            print("Stream already exists, skipping creation of stream");
          }
          else {
            print("Error while creating stream");
            throw e;
          }
        }

        /* ----------------- Publish and Subscribe message to stream ---------------- */

        const region = IS_GLOBAL ? "c8global" : "c8local";
        const streamName = `${region}s.${STREAM_NAME}`;

        // Fetching local URL in case the stream is local
        const localDcDetails = await connection.req(`/datacenter/local`, {
          method: "GET",
        });

        const dcUrl = localDcDetails.tags.url;

        const url = IS_GLOBAL
          ? URL_NAME
          : `api-${dcUrl}`;

        const otpConsumer = await connection.req(`/apid/otp`, {
          method: "POST",
        });
        const otpProducer = await connection.req(`/apid/otp`, {
          method: "POST",
        });

        const consumerUrl = `wss://${url}/_ws/ws/v2/consumer/persistent/${tenant}/${region}._system/${streamName}/${CONSUMER_NAME}?otp=${otpConsumer.otp}`;

        const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}?otp=${otpProducer.otp}`;

        /* -------------------------- Initalizing Consumer -------------------------- */

        const initConsumer = () => {
          return new Promise((resolve) => {
            consumer = new WebSocket(consumerUrl);

            consumer.onopen = function () {
              print("Consumer is open now for " + streamName);
              resolve();
            };

            consumer.onerror = function () {
              print(
                "Failed to establish Consumer connection for " + streamName
              );
            };

            consumer.onclose = function () {
              print("Closed Consumer connection for " + streamName);
            };

            consumer.onmessage = function (message) {
              var receivedMsg = message.data && JSON.parse(message.data);
              print(
                "------------------ Consumer Message Received -----------------"
              );
              print(atob(receivedMsg.payload));
              print(
                "--------------------------------------------------------------"
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
            print("Producer is open now for " + streamName);
          };

          producer.onclose = function (e) {
            print("Closed Producer connection for " + streamName);
          };

          producer.onerror = function (e) {
            print("Failed to establish Producer connection for " + streamName);
          };
        };

        initConsumer().then(() => {
          initProducer();
          toggleUIButtons({ start: true });
          print(
            "--------------------------------------------------------------"
          );
          print(
            "----------YOU CAN NOW START PUBLISHING YOUR MESSAGES----------"
          );
          print(
            "--------------------------------------------------------------"
          );
        });
      } catch (e) {
        console.error(e);
      }
    };

    function publish() {
      try {
        const value = input.value.trim().replace(/(\r\n|\n|\r)/gm, "");
        let msgToSend = value;

        if (value[0] === "{" && value.slice(-1) === "}") {
          msgToSend = JSON.stringify(JSON.parse(input.value));
        }

        producer.send(JSON.stringify({ payload: btoa(msgToSend) }));
        print(`Sending message....  : ${msgToSend}`);
        print(`Producer message sent`);
      } catch (e) {
        print(e);
      }
    }

    async function closeConnection() {
      toggleUIButtons();

      consumer.close();
      print("CONSUMER CLOSING...");
      producer.close();
      print("PRODUCER CLOSING...");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      /* ------------------------ Unsubscribe from stream. ------------------------ */

      await connection.req(
        `/_fabric/_system/_api/streams/unsubscribe/${CONSUMER_NAME}`,
        {
          method: "POST",
        }
      );

      print(`${CONSUMER_NAME} UNSUBSCRIBED SUCCESSFULLY`);
    }

```
