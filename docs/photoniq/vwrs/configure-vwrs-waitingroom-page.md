---
sidebar_position: 30
title: Configure the VWRs Waiting Room Page
---

The VWRs waiting room page is an [HTML page](waitingroom) that users see when they are directed to the waiting room. Here is an example of such a page:

![Waiting Room Page](/img/photoniq/vwr/vwr-activity.jpg)

This HTML page is entirely customizable. The class attributes _queue-position_, _queue-depth_, and _avg-wait-time_ show the position of the visitors in the queue. The waiting room page is hosted on the Akamai NetStorage and is configured using the `waitingRoomPath` option in the VWRs EdgeWorker `handleVwrsRequest()` function.

## Waiting Room Page Configuration

The waiting room path must be configured as [a Conditional Origin](https://techdocs.akamai.com/property-mgr/docs/conditional-origins) in Akamai's property manager. This allows the waiting room HTML page to be served from the Akamai NetStorage. Configure the conditional origin with the following settings:

- Origin ID must be set to `waitingroom`.
- Set the following settings in the behaviours section:

  Origin Server:

  - Set the Origin type to Netstorage.
  - Set the NetStorage Account to the appropriate account.

  Caching:

  - Caching option: cache
  - Force revalidation of stale objecs: Alwayss revalidate the orign
  - Maxage: 10 minutes

![Waiting Room Page](/img/photoniq/vwr/akamai-cond-origin.png)
