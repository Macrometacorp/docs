---
sidebar_position: 120
title: Troubleshoot VWRs
---

When configuring and setting your VWR, some errors may occur from misconfigurations in the waiting room html code, domain url, or the EdgeWorker.

Let's explore some of these errors and ways to troubleshoot these errors.


## Waiting Room Misconfigurations

This returns the header response `_No-Waiting-Room_`, and points towards a domain URL misconfiguration. Fixing this requires checking your domain URL for any misspellings or errors.

## Troubleshoot Waiting Room HTML

Preview your waiting room HTML template by launching your preferred web browser and navigating to your domain URL.

Sample URL format: `https://<hostname>/waiting-room-path>/preview`

For example: `http://show.store.com/checkout/preview`
 View the waiting room HTML page and make changes when needed. 

## Troubleshoot Waiting Room Cookie

The `vwrs-cookie` cookie holds valuable information regarding each user's access to the waiting room. Debugging and accessing the cookie content requires enabling debugging mode when calling the `handleVwrsRequest()` function. Enabling debugging mode stores the unencrypted cookie in the `x-vwrs-debug` header, granting you access to its content for debugging purposes.

```js
export async function onClientRequest(request) {
  const reqOptions = {
    waitingRoomPath: "/1473985/doc.html",
    debugMode: true,
  };
  await virtualWaitingRoomConfiguration.handleVwrsRequest(request, reqOptions);
}
export async function onClientResponse(request, response) {
  const reqOptions = {
    debugMode: true,
  };
  await virtualWaitingRoomConfiguration.handleVwrsResponse(
    request,
    response,
    reqOptions
  );
}
```

## VWRs EdgeWorker Exceeding PM_USER Space

The VWRs EdgeWorker uses Akamai's Property Manager user-defined variables. The maximum limit supported by Akamai EdgeWorkers is 1024 characters. Exceeding this limits causes the library code to display the following error message: `Setting metadata variable would exceed total variable size limit`.

## Report Status Codes

When running library code, the library provides status codes to inform users about limitations and issues in the form of four-letter codes. These status codes are stored in the PMUSER_VWRS_STATUS_CODE variable.

For a comprehensive list of the meaning behind each four-letter code, refer to [VWRs Status Codes](02-vwrs-status-codes.md).

## Request-Level Debugging

Use Akamai’s enhanced debugging to get detailed information on how VWRs runs. For more information, refer to the [Enhanced debug headers](https://techdocs.akamai.com/edgeworkers/docs/enable-enhanced-debug-headers) section of Akamai’s [About Javascript troubleshooting](https://techdocs.akamai.com/edgeworkers/docs/about-javacript-troubleshooting) documentation.
