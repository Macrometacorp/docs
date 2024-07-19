---
sidebar_position: 20
title: Some Waiting Room Parameters
---

Creating your virtual waiting room requires configuring some parameters. These parameters guide the behavior of your waiting room and their performance at various stages of using the service.

## Entering the Waiting Room
These parameters are essential and affect the creating of the waiting room:

- **Rate Limit (`rate_limit`):** Sets the rate (maximum users per second) at which traffic should be diverted to the waiting room.
- **Waiting Room Path (`waitingroom_url`):** The URL that the waiting room sits in front of.
- **Queue Type (`queue_type`):** Defines how requests are removed from the waiting room. Available queue types include FIFO (first in, first out), random, and priority queues.

## In the Waiting Room

- **Waiting Room HTML (`waiting_room_path`):** UI shown to users in the waiting room.
- **Waiting Room Position and Time (in HTML):** Include any of the position or time in the waiting room UI. (Configured in the [Akamai EdgeWorker](../03-configuration-and-setup/01-configuring-edgeworkers.md).)
- **Waiting Room HTMl Refresh Interval (`waiting_room_interval`):** How often the user's browser refreshes the waiting room UI.

## Exiting the Waiting Room

- **Max Origin Usage Time (`max_origin_usage_time`):** The amount of time that users can access the origin after being granted access.
- **Access Type:** Choose one of the following options. (Configured in the [Akamai EdgeWorker](../03-configuration-and-setup/01-configuring-edgeworkers.md).)
  - Following the access duration period (set in the `max_origin_usage_time` property), the user is redirected to the waiting room.
  - The user is redirected to the waiting room if there is no activity for the duration of the access duration period (set in the `max_origin_usage_time` property).
