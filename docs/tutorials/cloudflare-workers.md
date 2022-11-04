---
sidebar_position: 15
title: Working with Cloudflare Workers
---

This brief tutorial will show you have to authenticate to the GDN using it's REST API and Cloudflare workers. It will then create a collection!

## Auth and create first collection

```js
const macrometaHost = "https://api-gdn.paas.macrometa.io"
const authEndpoint = macrometaHost + "/_open/auth"
const collectionEndpoint = macrometaHost + "/_fabric/_system/_api/collection"
const type = "application/json;charset=UTF-8"
const authInfo = {
  "email": "nemo@nautilus.com",
  "password": "xxxxxx"
}

const newCollection = {
  "name": "myCollection"
}
const getOptions = (requestBody, token) => ({
  method: 'POST',
  body: JSON.stringify(requestBody),
  headers: {
    authorization: token,
    "content-type": type
  }
});

async function handleRequest () {
  const jwtRequest = await fetch(authEndpoint, getOptions(authInfo, ""))
  const jwtResponse = await jwtRequest.json();
  const jwtToken = `bearer ${jwtResponse.jwt}`

  const collectionRequest = await fetch(collectionEndpoint, getOptions(newCollection, jwtToken))
  const collectionResponse = await collectionRequest.json()
  return new Response(JSON.stringify(collectionResponse))
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest())
})

```

![Workers](/img/worker-console.png)

### Response to collection creation

```json
{
    "error":false,
    "code":200,
    "type":2,
    "searchEnabled":false,
    "name":"myFirstCollection",
    "isSystem":false,
    "collectionModel":"DOC",
    "waitForSync":false,
    "objectId":"550803885",
    "cacheEnabled":false,
    "keyOptions":{"allowUserKeys":true,"type":"traditional","lastValue":0},
    "globallyUniqueId":"hEF7A96BFCCB/550803886",
    "statusString":"loaded",
    "id":"550803886",
    "isLocal":false,
    "status":3,
    "isSpot":false
}
```

Now you have a collection created, you can check it out in the Macrometa console in **Collections**.
