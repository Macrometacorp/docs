---
sidebar_position: 30
title: Configure a VWRs EdgeWorker
---

The Virtual Waiting Room Service integrates seamlessly with an Akamai Edgeworker to direct traffic to the waiting room page. Thus before using the service, you must configure an EdgeWorker. For more information about Akamai EdgeWorkers, refer to [Akamai EdgeWorker Documentation](https://techdocs.akamai.com/edgeworkers/docs).

## EdgeWorker Requirements

- The VWRs EdgeWorker performs up to two sub-requests. Therefore, an Akamai EdgeWorker resource tier that allows at least two HTTP sub-requests on the onClientRequest event handler is needed. Refer to the [Akamai Resource tie limitations](https://techdocs.akamai.com/edgeworkers/docs/resource-tier-limitations) page for more information.

- The VWRs EdgeWorker uses Akamai's Property Manager user-defined variables. The maximum limit supported by Akamai EdgeWorkers is 1024 characters. VWRs uses about 350 of those characters. Refer to Akamai's [Request Object API](https://techdocs.akamai.com/edgeworkers/docs/request-object#setvariable) for more information.

### Steps: Creating the EdgeWorker ID

1. Login to the Akamai Control Center
1. Click on the menu bar on the top-left corner.
1. Click **EdgeWorkers** from the **CDN** section.
1. Click **Create EdgeWorker ID**
1. Enter a name for your EdgeWorker ID and select a group. This group helps control permissions. The contract ID will be automatically selected and helps load the resource tier.
1. (**Optional**) Enter a description for your EdgeWorker ID
1. Click **Create EdgeWorker ID**

This creates a new EdgeWorker ID which will be shown on the list of EdgeWorker IDs. You can edit your EdgeWorker ID properties at anytime, but the ID remains the same through the changes. 

8. Click on your newly created EdgeWorker
9. Click **Create Version**
10. Upload the code and library code and click **Activate Version**

Note: Every EdgeWorker contains a code bundle. This code bundle contains the `main.js` file which defines the Akamai Edgeworker functions, and the library code. In this case, our library code is a sample `waitingroom.js` file which contains the main logic of the waiting room.


## Mandatory Configuration Options

Before uploading the code file, the following configuration options must be set:

- **apiKey**: This enables you to connect to the virtual waiting room service. You can create this key with the [create API Key endpoint](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey), or via the VWRs [Web console](./index.md). 
- **vwrsMetricHost**: The host for the VWRs metric service.
- **vwrsHost:**The host for the VWRs service.
- **digestKey**: The digest key verifies the integrity of the data stored in the cookie. Please use a 128-bit or 256-bit key. For example, you can generate a key using the command `openssl rand -hex 16`.
- **encryptionKey**: This key is used to encrypt the waiting room data stored in the cookie. The key must be either 128 or 256 bits long. For example, you can generate a key using the command `openssl rand -hex 16`.

## Optional Configuration Options

The following configuration options are optional:

- **isFailOpen**: When set to `true` (fail open) and an error occurs, it forwards the request to the origin. Otherwise, it displays an error message when set to `false` (fail close) and an error occurs. (default: `true`).
- **originAccessMode**: This option determines how long access is granted to the origin server (default: `ORIGIN_USAGE_TIME`):
  - **ORIGIN_USAGE_TIME**: The access time, defined for each waiting room (`max_origin_usage_time`), remains fixed. Once a user is granted access to the origin, they can only access it for the duration specified in the `max_origin_usage_time` field.
  - **ORIGIN_IDLE_TIME:** The access time, defined for each waiting room, increases by the number of seconds specified in the `max_origin_usage_time` field. Each time this waiting room is accessed, the access time is extended accordingly. This behaves similarly to an abandonment timeout, where the session is abandoned if the request has been idle for the `max_origin_usage_time` time.
- **statusConfigLimits**: This defines the waiting room information that is returned by the status call. Use the following three values to define what the status page returns:
  - **avgWaitingTime**: If set to `true`, then the average waiting time is returned by the status call. (default: `true`)
  - **qDepth**: If set to `true`, then the waiting room queue size is returned. (default: `true`)
  - **position**: If set to `true`, then the position of the request in the waiting room queue is returned. (default: `true`)

## Request Configuration

A request configuration is an optional object that contains configuration parameters for the request handler. Options include:

- **waitingRoomPath**: The cloud origin (such as NetStorage) path to the waiting room HTML.
- **extraFingerprint**: Additional data to include in the fingerprint calculation.
- **debugMode**: This flag enables debug mode. In debug mode, the unencrypted cookie is stored in the `x-vwrs-debug` header and logged to the logger (default: `false`).
- **priority:** A positive whole number indicates the priority of the request when a priority queue is enabled for the specific waiting room. This priority number must be one of the priorities configured for the waiting room.

### EdgeWorker Example

The following `main.js` file can be uploaded to the code bundle. This file configures the EdgeWorker to dynamically select the domain that utilizes the waiting room service.

```js
import { logger } from "log";
import VirtualWaitingRoom from "./library/virtualWaitingRoom.js";

const virtualWaitingRoomConfiguration = new VirtualWaitingRoom({
  apiKey: "YourAPIKey",
  digestKey: "YourVwrsDigestKey",
  encryptionKey: "YourVwrsEncryptionKey",
  vwrsMetricHost: "api-demo-vwr-metrics.paas.macrometa.io",
  vwrsHost: "api-demo-vwr.paas.macrometa.io",
  isFailOpen: "true",
  originAccessMode: "ORIGIN_USAGE_TIME",
  statusConfigLimits: {
    avgWaitingTime: true,
    qDepth: true,
    Position: true,
  },
});

export async function onClientRequest(request) {
  const reqOptions = {
    waitingRoomPath: "/1473985/doc.html",
    debugMode: true,
    extraFingerprint: [request.getVariable("PMUSER_TFDH")],
  };

  const result = await virtualWaitingRoomConfiguration.handleVwrsRequest(
    request,
    reqOptions
  );
  if (result.waitingRoom) {
    // Request sent to waiting room
  }
}

export async function onClientResponse(request, response) {
  const reqOptions = {
    debugMode: true,
    extraFingerprint: [request.getVariable("PMUSER_TFDH")],
  };

  const result = await virtualWaitingRoomConfiguration.handleVwrsResponse(
    request,
    response,
    reqOptions
  );
  if (result.waitingRoom) {
    // Request sent to waiting room
  }
}
```

## Fingerprinting

VWRs can use device fingerprinting techniques to help mitigate cookie sharing and replay attacks. By default, a basic fingerprint is generated using information derived from the device object ([https://techdocs.akamai.com/edgeworkers/docs/device-object](https://techdocs.akamai.com/edgeworkers/docs/device-object)). If stronger device fingerprinting is required, then you can override this logic with your own, or configure it to use one of the fingerprinting techniques available in Akamai’s security products.
