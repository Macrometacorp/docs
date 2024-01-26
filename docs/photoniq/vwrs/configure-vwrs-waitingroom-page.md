---
sidebar_position: 30
title: Configure the VWRs waiting room page
---

The VWRs waiting room page is an [HTML page](waitingroom) that users see when they are directed to the waiting room. Here is an example of such a page:
![Waiting Room Page](/img/photoniq/vwr/vwr-activity.jpg)

This HTML page is entirely customizable. The class attributes _queue-position_, _queue-depth_, and _avg-wait-time_ show the position of the visitors in the queue. The waiting room page is hosted on the Akamai NetStorage and is configured using the `waitingRoomPath` option in the VWRs EdgeWorker `handleVwrsRequest()` function.

## Waiting room page configuration

The waiting room must be configured in Akamai's property manager. The following steps describe how to configure the waiting room page:

1. The waiting room must be configured with [a Conditional Origin](https://techdocs.akamai.com/cloudlets/docs/about-conditional-origins).

2. step 1

3. step 2
