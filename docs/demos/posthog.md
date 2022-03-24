---
sidebar_position: 5
---

# PostHog Analytics Integration

You can use [PostHog](https://posthog.com) with your Macrometa GDN tenants to quickly and easily capture usage data for your applications and make them readily available to anybody who needs it.

## Prerequisites

* Follow the PostHog deployment instructions for your preferred method: [Self-hosted](https://posthog.com/docs/self-host) or [cloud-based](https://posthog.com/docs/cloud).
* In Macrometa GDN, create an API key.

## Solution

To enable PostHog analytics in your tenant:

1. Follow the Integrate PostHog documentation for [JavaScript](https://posthog.com/docs/self-host/configure/securing-posthog) or [Node.js](https://posthog.com/docs/integrate/server/node).
2. In Macrometa GDN, log into an administrator account in the `_system` GeoFabric.
3. Click **TENANTS** to navigate to the Tenants management page.
4. On the **Platform Limits** tab, select the **Enable PostHog Analytics** check box.
5. Enter the **Server URL** of your PostHog Analytics server, and enter an **API Key**. 

To verify, log into PostHog and check the **Events** tab to see if GDN events display properly. If you deselect the check box in the future, PostHog Analytics integration is disabled and the data is deleted.

Follow security recommendations listed in the [Securing PostHog](https://posthog.com/docs/self-host/configure/securing-posthog) documentation. Most important is to restrict access by IP.