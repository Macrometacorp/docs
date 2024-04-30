---
sidebar_position: 10
title: Get Started with VWRs and Web Apps
---

This page explains how to get started with Macrometa PhotonIQ Virtual Waiting Rooms (VWRs) with your web applications. Web apps typically use HTML, CSS, and JavaScript and operate within web browsers. This guide explains the steps to connect your web app to VWRs, enhancing your ability to manage high traffic efficiently and maintain a seamless user experience.

## Before You Begin

Before you begin the setup process, ensure you have completed the following prerequisites:

- **Coordinate with Macrometa Personnel:** Engage with Macrometa personnel to obtain necessary credentials and access rights.
- **Plan Your Waiting Room:** Determine the appropriate [queue type](../queue-types.md) for your needs, decide which URLs will incorporate the waiting room, and consider whether priority handling is necessary.
- **Collect Information:** Gather all required information, such as domain details and traffic expectations, to streamline the setup process.

## Set Up the Waiting Room

Follow these steps to establish your virtual waiting room:

1. **Create an API Key:** Begin by creating an API key which will grant you access to the VWRs system. This key is essential for all subsequent operations. For instructions on creating an API key, refer to [Create an API Key](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey).

2. **Configure a VWRs EdgeWorker:** Set up a VWRs EdgeWorker to manage the waiting room functionality on the Akamai side. This configuration is crucial for handling incoming traffic and directing it appropriately. For detailed information on this process, refer to [Configure a VWRs EdgeWorker](../configure-vwrs-edgeworker.md).

3. **Create and Configure a Domain:** Create a domain that hosts your waiting room. This step allows you to fine-tune how the waiting room operates and integrates with your site. For comprehensive guidance on domain configuration, refer to [Configure a Domain](../configure-domain.md).

## Next Steps

Once your virtual waiting room is operational, consider monitoring and managing its performance to ensure optimal functionality:

- **Metrics and Analytics:** Regularly check the VWRs metrics to assess the performance and effectiveness of your waiting room. For more information on accessing VWRs metrics, refer to [VWRs Metrics](../vwrs-metrics.md).
- **Review Usage Patterns:** Analyze usage data to optimize settings and improve user experiences. Access hourly, daily, or monthly usage statistics through the following links:
  - [Hourly Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getHourlyUsage)
  - [Daily Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getDailyUsage)
  - [Monthly Usage](https://www.macrometa.com/docs/apiVwrs#/operations/getMonthlyUsage)
