---
title: Explore the Virtual Waiting Room Page
---

The VWRs waiting room page is a customizable HTML page that users see when they are directed to the waiting room. This page is served from [Akamai NetStorage.](https://techdocs.akamai.com/NetStorage/docs/welcome-to-NetStorage) and configured using the `waitingRoomPath` option in the [VWRs EdgeWorker](../03-configuration-and-setup/01-configuring-edgeworkers.md) `handleVwrsRequest()` function.

Before [uploading your waiting room HTML page to NetStorage account](customize-waitroom.md), you need to [add a new storage group](https://techdocs.akamai.com/netstorage/docs/create-a-storage-group) and [create a new upload account](https://techdocs.akamai.com/netstorage/docs/create-an-upload-account). 

## Configuring the Waiting Room Page

After setting up your NetStorage account, you need to configure the waiting room page as a [Conditional Origin](https://techdocs.akamai.com/property-mgr/docs/conditional-origins) in Akamai's property manager. This allows the waiting room HTML page to be served from the Akamai NetStorage.

To configure the conditional origin to use the waiting room path:

1. Navigate to the property manager and add a conditional origin group rule.
Configure the conditional origin with the following settings:

- Set the Origin ID to `waitingroom`.

In the behaviors section:

  **Origin Server**:

  - Set the Origin type to NetStorage.
  - Set the NetStorage Account to the appropriate account.

  **Caching**:

  - Caching option: cache
  - Force revalidation of stale objects: Always revalidate the origin
  - Maxage: 10 minutes

![Waiting Room Page](/img/photoniq/vwr/akamai-cond-origin.png)
