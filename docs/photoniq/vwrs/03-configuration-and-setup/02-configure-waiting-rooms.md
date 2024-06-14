---
sidebar_position: 20
title: Configuring Waiting Room Parameters
---

This page explains some parameters to configure when using the VWR using API endpoint properties. These include configurations when:

- Entering the waiting room
- In the waiting room
- Exiting the waiting room

## Entering the Waiting Room

- **Rate Limit:** Set the rate (maximum users per second) at which traffic should be diverted to the waiting room. (`rate_limit` property)
- **Waiting Room URL:** The URL that you are protecting with a waiting room (`waitingroom_url` property)
- **Queue Type:** Defines how requests should be removed from the waiting room, such as FIFO (first in, first out). (`queue_type` property)

## In the Waiting Room

- **Waiting Room HTML:** UI shown to users in the waiting room. (`waiting_room_path` property)
- **Waiting Room Position and Time (in HTML):** Include any of the position or time in the waiting room UI. This is Configured in the [Akamai EdgeWorker](01-configuring-edgeworkers.md)
- **Waiting Room HTMl Refresh Interval:** How often waiting room UI should be refreshed in the user's browser. (`waiting_room_interval` property)

## Exiting the Waiting Room

- **Max Origin Usage Time:** The amount of time that users can access the origin after being granted access. (`max_origin_usage_time` property)
- **Access Type:** Choose one of the following options when [configuring the Akamai EdgeWorker](01-configuring-edgeworkers.md)
  - Following the access duration period (set in the `max_origin_usage_time` property), the user is redirected to the waiting room.
  - The user is redirected to the waiting room if there is no activity for the duration of the access duration period (set in the `max_origin_usage_time` property).
