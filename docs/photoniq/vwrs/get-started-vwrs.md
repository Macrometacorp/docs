---
sidebar_position: 10
title: Get Started with VWRs
---

This page explains how to get started with Macrometa PhotonIQ Virtual Waiting Rooms (VWRs).

## Before You Begin

- Work with Macrometa personnel to get credentials and access.
- Plan your waiting room. Figure out which [queue type](queue-types.md) you want, which URL(s) to apply the waiting room to, and whether you want to use priorities.
- Collect information you will need.

## Set Up the Waiting Room

Use the following endpoints to set up a waiting room.

1. [Create an API key](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey) to access the VWRs system.
2. [Configure a VWRs EdgeWorker](configure-vwrs-edgeworker.md), which sets up the waiting room on the Akamai side.
3. [Create a Domain](https://www.macrometa.com/docs/apiVwrs#/operations/createDomain), which sets up the waiting room and allows you to configure its options. For more information, refer to [Configure a Domain](configure-domain.md).

## Next Steps

- [Get metrics](vwrs-metrics.md)
- Review usage
  - [Get hourly usage](https://www.macrometa.com/docs/apiVwrs#/operations/getHourlyUsage)
  - [Get daily usage](https://www.macrometa.com/docs/apiVwrs#/operations/getDailyUsage)
  - [Get monthly usage](https://www.macrometa.com/docs/apiVwrs#/operations/getMonthlyUsage)
