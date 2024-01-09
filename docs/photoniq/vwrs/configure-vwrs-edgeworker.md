---
sidebar_position: 30
title: Configure a VWRs EdgeWorker
---

In the EdgeWorker, import the `VirtualWaitingRoom` class from the photoniq-vwrs-client using Node Package Manager (NPM). This integrates the VWRs with the EdgeWorker. For more information about Akamai EdgeWorkers, refer to [Akamai EdgeWorker Documentation](https://techdocs.akamai.com/edgeworkers/docs).

## Install the PhotonIQ VWRs Client

Before you can set up an EdgeWorker, you must install `@macrometa/photoniq-vwrs-client`.

1. To set the authentication token, open your terminal and execute the following command. This command configures npm to use the specified authentication token when interacting with the npm registry. Make sure you replace <YOUR_READ_KEY> with your actual read key:

  ```bash
  npm set //registry.npmjs.org/:_authToken=<YOUR_READ_KEY>
  ```

2. Now you’re ready to install the private package. Npm uses the previously set authentication token to authenticate and download the package. In your terminal, run the following command:

  ```bash
  npm install @macrometa/photoniq-vwrs-client
  ```

3. After the package installation is complete, verify its presence. Check your project’s node_modules directory to ensure that `@macrometa/photoniq-vwrs-client` has been successfully installed.

:::note
If you encounter a _404 Not Found error_ when trying to install `@macrometa/photoniq-vwrs-client`, then check your .npmrc file to ensure that it has a valid registry set and the valid token is set. This file should contain the correct configuration for accessing npm packages.
:::

## Mandatory Configuration Options

The following configuration options must be set:

- **apiKey**: This API Key is generated using the VWRs authorization key API. Please refer to the documentation for `POST /api/vwr/v1/apikey` on how to create this key.
- **vwrsMetricHost**: The host for the VWRs metric service.
- **vwrsHost:**The host for the VWRs service.
- **digestKey**: The digest key is used to verify the integrity of the data stored in the cookie. Please use a 128-bit or 256-bit key. For example, you can generate a key using the command `openssl rand -hex 16`.
- **encryptionKey**:  This key is used to encrypt the waiting room data stored in the cookie. The key must be either 128 or 256 bits long. For example, you can generate a key using the command `openssl rand -hex 16`.

The following configuration options are optional:

- **isFailOpen**: When set to `true` (fail open) and an error occurs, the request is forwarded to the origin. An error message is displayed when set to `false` (fail close) and an error occurs. (default: `true`).
- **originAccessMode**: This option determines how long access is granted to the origin server (default: `MOVING`):
  - **FIXED**: The access time, defined for each domain (`access_duration`), remains fixed. Once a user is granted access to the origin, they can only access it for the duration specified in the `access_duration` field.
  - **MOVING:** The access time, defined for each domain, increases by the number of seconds specified in the `access_duration` field. Each time this domain is accessed, the access time is extended accordingly. This behaves similarly to an abandonment timeout, where the session is abandoned if the request has been idle for the `access_duration` time.
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

## Fingerprinting

VWRs can use device fingerprinting techniques to help mitigate cookie sharing and replay attacks. By default, a basic fingerprint is generated using information derived from the device object ([https://techdocs.akamai.com/edgeworkers/docs/device-object](https://techdocs.akamai.com/edgeworkers/docs/device-object)). If stronger device fingerprinting is required, then you can override this logic with your own, or configure it to use one of the fingerprinting techniques available in Akamai’s security products.

## Priority

You can customize a waiting room with up to ten priorities, the priorities being positive numbers from 1 through 255. Configure the priorities using the `POST/PUT/PATCH /api/vwr/v1/domains` REST API.

For instance, consider configuring three priorities with values of 1, 20, and 255. To accomplish this, you can use the `PATCH /api/vwr/v1/domains` REST API to update the domain:

```bash
curl -X 'PATCH' \
   https://api-vwr-service.gdn-akamai.com/api/vwr/v1/origins/example3.com \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'authorization: test_key.12345678abcdefghijklABCDEFGHIJKL' \
  -d '{
  "priority": [1, 20, 255]
}'
```

You have now successfully configured the waiting room to support priorities. To prioritize the traffic, you must pass the priority to the `handleVwrsRequest()` and `handleVwrsResponse()` functions. Here's a template demonstrating how to include a priority with the request in the `handleVwrsRequest()` call:

```js
export async function onClientRequest(request: EW.IngressClientRequest) {
  await client.handleVwrsRequest(request, {priority: 1});
}
```

This template sets the priority of this request to 1.

Several methods are available to retrieve the actual priority, such as query parameters, headers, or cookies. The precise method is entirely up to the specific implementation needs of the application.

### Query Parameter Example

```bash
GET /checkout?waiting-room-priority=20
```

The example adds the request to the waiting room with a priority of 20.

```js
export async function onClientRequest(request: EW.IngressClientRequest) {
  const queryParams = new URLSearchParams(request.query);
  const reqPriority = parseInt(queryParams.get('waiting-room-priority'), 10);
  await client.handleVwrsRequest(request, {priority: reqPriority});
}
```

### HTTP Header Example

```bash
GET /checkout
x-waiting-room-priority: 20
```

The example adds the request to the waiting room with a priority of 20.

```js
export async function onClientRequest(request: EW.IngressClientRequest) {
   const reqPriorityStr = request.getHeader("x-waiting-room-priority")[0];
   Const reqPriority = parseInt(reqPriorityStr, 10);
   await client.handleVwrsRequest(request, {priority: reqPriority});
}
```

### HTTP Cookie Example

```
GET /checkout
Cookie: waiting-room-priority=20
```

The example adds the request to the waiting room with a priority of 20.

```
export async function onClientRequest(request: EW.IngressClientRequest) {
   const cookies = new Cookies(request.getHeader("Cookie"));
   const reqPriority = parseInt(cookies.get("waiting-room-priority"), 10);
   await client.handleVwrsRequest(request, {priority: reqPriority});
}
```

### EdgeWorker Example

An example of `main.js` in an EdgeWorker bundle:

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
   originAccessMode: "FIXED",
   statusConfigLimits: {
      avgWaitingTime: true,
      qDepth: true,
      Position: true
   }
});

export async function onClientRequest(request) {
  const reqOptions={
      waitingRoomPath:'/1473985/doc.html',
      debugMode: true,
      extraFingerprint:[request.getVariable("PMUSER_TFDH")]
  }

  const result = await virtualWaitingRoomConfiguration.handleVwrsRequest(request, reqOptions);
  if (result.waitingRoom) {
      // Request sent to waiting room
  }
}

export async function onClientResponse(request, response) {
  const reqOptions={
      debugMode: true,
      extraFingerprint:[ request.getVariable("PMUSER_TFDH") ]
  }

  const result = await virtualWaitingRoomConfiguration.handleVwrsResponse(
            request, response, reqOptions
          );
  if (result.waitingRoom) {
      // Request sent to waiting room
  }
}
```
