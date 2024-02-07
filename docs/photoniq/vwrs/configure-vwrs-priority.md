---
sidebar_position: 30
title: Configure a VWRs Priority Waiting Room
---

Priority waiting rooms allow you to prioritize traffic based on the priority of the request. Requests are assigned a priority level and then dequeued at different rates based on the priority level. This feature helps handle various types of traffic, such as high-priority, regular, and low-priority.

VWRs dequeues requests by assigning weights to different priority levels descendingly, with the weight halving for each subsequent level. For instance, if there are three priority levels, the highest priority receives a weight of 4, the next lower priority gets a weight of 2, and the lowest priority is assigned a weight of 1. This creates a total weight summing up to 7 for all priorities combined. A formula determines the distribution of dequeued items from each priority level: RateLimit \* (Weight of Specific Priority Level / Total Weight of All Priorities). If a priority level has no requests to dequeue, its weight is redistributed among the remaining priorities, recalculating the weights based on the active queues. Additionally, if there are any remaining items after distribution, those are allocated to the lowest priority level.

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
  await client.handleVwrsRequest(request, { priority: 1 });
}
```

This template sets the priority of this request to 1.

Below are several examples of retrieving the priority, such as query parameters, headers, or cookies. The precise method is entirely up to the specific implementation needs of the application.

### Query Parameter Example

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
