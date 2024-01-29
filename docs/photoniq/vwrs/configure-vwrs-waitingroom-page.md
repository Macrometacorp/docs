---
sidebar_position: 30
title: Configure the VWRs waiting room page
---

The VWRs waiting room page is an [HTML page](waitingroom) that users see when they are directed to the waiting room. Here is an example of such a page:
![Waiting Room Page](/img/photoniq/vwr/vwr-activity.jpg)

This HTML page is entirely customizable. The class attributes _queue-position_, _queue-depth_, and _avg-wait-time_ show the position of the visitors in the queue. The waiting room page is hosted on the Akamai NetStorage and is configured using the `waitingRoomPath` option in the VWRs EdgeWorker `handleVwrsRequest()` function.

## Waiting room page configuration

The waiting room must be configured as [a Conditional Origin](https://techdocs.akamai.com/property-mgr/docs/conditional-origins) in Akamai's property manager. This allows the waiting room HTML page to be served from the Akamai NetStorage.

1. step 1

2. step 2
