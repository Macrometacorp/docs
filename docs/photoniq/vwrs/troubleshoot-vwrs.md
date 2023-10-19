---
sidebar_position: 120
title: Troubleshoot VWRs
---

This page provides troubleshooting information for Macrometa PhotonIQ Virtual Waiting Rooms (VWRs).

## No Waiting Room Configured

If a waiting room has not been configured, then the waiting room library returns the header _No-Waiting-Room_, which indicates no waiting room was configured. This means that the domain URL is not configured correctly.

## Troubleshoot Waiting Room HTML

You can configure the cloud origin (e.g. NetStorage) path to the waiting room HTML through the library or the domain record. To preview this HTML, open your preferred browser and navigate to the following URL: `https://<hostname>/<waiting-room-path>/preview`
(for example, `http://show.store.com/checkout/preview`).  

## Troubleshoot Waiting Room Cookie

The _vwrs-cookie_ cookie holds valuable information regarding each user's access to the waiting room. This information is securely encrypted using the library encryption key.

If you need to debug and access the content of the cookie, then you can enable debugging mode when calling the `handleVwrsRequest()` function. Enabling debugging mode stores the unencrypted cookie in the _x-vwrs-debug_ header, granting you access to its content for debugging purposes.

```js
export async function onClientRequest(request) {
  const reqOptions = {
     waitingRoomPath:'/1473985/doc.html',
     debugMode: true
  }
  await virtualWaitingRoomConfiguration.handleVwrsRequest(
               request, reqOptions
         );
}
export async function onClientResponse(request, response) {

  const reqOptions = {
     debugMode: true
  }
  await virtualWaitingRoomConfiguration.handleVwrsResponse(
            request, response,reqOptions
        );
}
```

## Report Status Codes

When running library code, the library provides status codes to inform users about limitations and issues in the form of four-letter codes. These status codes are stored in the PMUSER_VWRS_STATUS_CODE variable.

For a comprehensive list of the meaning behind each four-letter code, refer to [VWRs Status Codes](vwrs-status-codes.md).

## Request-Level Debugging

Use Akamai’s enhanced debugging to get detailed information on how VWRs runs. For more information, refer to the [Enhanced debug headers](https://techdocs.akamai.com/edgeworkers/docs/enable-enhanced-debug-headers) section of Akamai’s [About Javascript troubleshooting](https://techdocs.akamai.com/edgeworkers/docs/about-javacript-troubleshooting) documentation.
