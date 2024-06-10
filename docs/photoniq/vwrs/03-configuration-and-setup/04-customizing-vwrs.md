---
sidebar_position: 30
title: Customizing VWRs
---

## Fingerprinting

VWRs can use device fingerprinting techniques to help mitigate cookie sharing and replay attacks. By default, a basic fingerprint is generated using information derived from the device object ([https://techdocs.akamai.com/edgeworkers/docs/device-object](https://techdocs.akamai.com/edgeworkers/docs/device-object)). If stronger device fingerprinting is required, then you can override this logic with your own, or configure it to use one of the fingerprinting techniques available in Akamai’s security products.

## Priority

VWRS allows you customize a waiting room with up to ten priorities, with these priority numbers being positive integers from 1 through 255. 

### Configuring Priority

Configure the priorities using the `POST/PUT/PATCH /api/vwr/v1/domains` REST API.

For instance, to configure three priorities with values of 1, 20, and 255, use the `PATCH /api/vwr/v1/domains` REST API to update the domain:

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

### Implementing Priority
After configuring priorities, you can implement it to prioritize traffic in your waiting room. 
To prioritize the traffic, you must pass the priority to the `handleVwrsRequest()` and `handleVwrsResponse()` functions.

Here's a template demonstrating how to include a priority with the request in the `handleVwrsRequest()` call:

```js
export async function onClientRequest(request: EW.IngressClientRequest) {
  await client.handleVwrsRequest(request, { priority: 1 });
}
```

This template sets the priority of this request to 1.

### Retrieving Priority

VWRs offers several methods to retrieve the actual priority. These methods include query parameters, headers, or cookies. Selecting a method depends on the specific implementation needs of the application.

#### Query Parameter Example

```bash
GET /checkout?waiting-room-priority=20
```

The example adds the request to the waiting room with a priority of 20.

```js
export async function onClientRequest(request: EW.IngressClientRequest) {
  const queryParams = new URLSearchParams(request.query);
  const reqPriority = parseInt(queryParams.get("waiting-room-priority"), 10);
  await client.handleVwrsRequest(request, { priority: reqPriority });
}
```

#### HTTP Header Example

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

```bash
GET /checkout
Cookie: waiting-room-priority=20
```

The example adds the request to the waiting room with a priority of 20.

```bash
export async function onClientRequest(request: EW.IngressClientRequest) {
   const cookies = new Cookies(request.getHeader("Cookie"));
   const reqPriority = parseInt(cookies.get("waiting-room-priority"), 10);
   await client.handleVwrsRequest(request, {priority: reqPriority});
}
```