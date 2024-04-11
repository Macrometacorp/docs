---
sidebar_position: 20
title: Get Started with EST
---

This page explains how to get started with Macrometa PhotonIQ Edge Side Tagging (EST).

## Before You Begin

- Work with Macrometa personnel to get credentials and access.
- Collect information you will need:
  - Tags to be migrated
  - Any access tokens for third-party service accounts
- Make sure you have edit access to target pages and know how to add scripts.

## Set Up EST

After you have credentials and required information, follow these steps to get started with EST:

1. Log in to EST. You can log in to the web console or get an API key and use the API.
2. In the web console:
   1. Click **Settings**.
   2. Copy the script in the Script section into your target page. Replace `<PhotonIQ-EST-HOST>` with your EST host.
3. Configure cookies and the origin URL in the Settings tab. For more information, refer to [Manage EST Settings](est-settings.md#create-and-update-settings).
4. Configure components as described in [Manage EST Components](manage-components.md#add-new-components).
5. Work with Macrometa support to make sure the migration was successful.
6. Disable the selected browser side tags as you enable them in EST.
7. Verify that analytics data keeps flowing, and patterns do not drastically change by monitoring events on third-party service dashboards.

## Next Steps

- Monitor [EST Metrics](est-metrics.md)
