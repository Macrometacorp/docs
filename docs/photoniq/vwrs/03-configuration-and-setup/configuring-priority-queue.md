---
title: Setting and Retrieving Priority.
---

One of the queues offered by the virtual waiting room service is the priority queue, which allows you to group your users into different groups and assign these groups priorities, with 1 being the highest priority. This allows you to create various service level tiers for your business, improving user experience and customer loyalty. 

## Sample Use Case for a Priority Queue

Consider a service with users residing at different geographical locations. You can assign priority levels to these locations based on their revenue generated. For example:

- Users in location A: 1
- Users in location B: 2

In this case, once the queue type is set to `priority`, when two users from location A and location B try to access the webpage and are directed to the waiting room, the location A user will be granted access first since they occupy a higher priority.

## Configuring a Priority Queue

You can customize a waiting room with up to ten priorities, the priorities being positive numbers from 1 through 255. Configure these priorities using the [virtual waiting room API](https://www.macrometa.com/docs/apiVwrs#/operations/createWaitingRoom).

For instance, the following `curl PATCH` API request updates the waiting room by configuring three priority levels with values of 1, 20, and 255. 

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

This successfully configures the waiting room to support priorities. 

To prioritize the traffic, you must pass the priority to the `handleVwrsRequest()` and `handleVwrsResponse()` functions. Here's a template demonstrating how to include a priority with the request in the `handleVwrsRequest()` call:

```js
export async function onClientRequest(request: EW.IngressClientRequest) {
  await client.handleVwrsRequest(request, { priority: 1 });
}
```

The above template sets the priority of this request to 1.

## Retrieving Priority Levels

Several methods are available to retrieve the actual priority, such as query parameters, headers, or cookies. Choosing a method depends on the specific implementation needs of the application.

### Retrieving with Query Parameters

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

### Retrieving with HTTP Header

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

### Retrieving with HTTP Cookie

```bash
GET /checkout
Cookie: waiting-room-priority=20
```

The example adds the request to the waiting room with a priority of 20.

```javascript
export async function onClientRequest(request: EW.IngressClientRequest) {
   const cookies = new Cookies(request.getHeader("Cookie"));
   const reqPriority = parseInt(cookies.get("waiting-room-priority"), 10);
   await client.handleVwrsRequest(request, {priority: reqPriority});
}
```