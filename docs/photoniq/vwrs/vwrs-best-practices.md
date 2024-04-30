---
sidebar_position: 110
title: VWRs Best Practices
---

This page provides information on best practices for using Macrometa PhotonIQ Virtual Waiting Rooms (VWRs).

## Refresh Interval

In mobile applications, consider the impact on mobile device battery life and data usage when setting this interval. Frequent updates increase both consumption metrics.

## UI Responsiveness

In mobile applications, avoid blocking the UI while updating the waiting room status. Information should be displayed efficiently, ensuring the app remains responsive. Also, while REST API calls are generally quick, avoid UI freezes during these operations. Take advantage of the platform's asynchronous network calls.
