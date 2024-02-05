---
sidebar_position: 20
title: Configuring Waiting Rooms
---

This page explains what can be configured in each waiting room. For more information about how to create a waiting room, refer to [Configure a Domain](configure-domain.md).

## Entering the Waiting Room
Rate limit: The rate at which traffic should be diverted to the waiting room.
Waiting room path: The URL that the waiting room needs to sit in front of.
Waiting room type: Defines how requests should be removed from the waiting room E.g: Priority, FIFO

## In the Waiting Room
Waiting room HTML: UI that is shown in waiting room.
Waiting room position and time(In HTML): Include any of the position or time in the waiting room UI.
Waiting room HTMl refresh interval: How often waiting room UI should be refreshed.


## Exiting the Waiting Room
Access duration: The time that users can access the origin after being granted access.
Access Type:
Following the Access Duration period, the user is redirected to the waiting room.
The user is redirected to the waiting room if there is no activity for the duration of the Access Period.