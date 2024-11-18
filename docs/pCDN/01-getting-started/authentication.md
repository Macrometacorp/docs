---
title: Authentication
---

While APIs exists to primarily exchange data between providers/businesses and consumers, not all data should be accessible to all API consumers, especially business internal data and sensitive Personal Identifiable Information(PCI), subject to GDPR and PCI data protection and compliance policies.

pCDN contains [authentication plugins](../04-plugins/01-authenticate.md) that allow you to identify and authenticate users before allowing them to access your API endpoints. Using these plugins, you can restrict access to endpoints based on the consumer ID, thus ensuring data safety and security.

These plugins include:
-  `basic-auth`
- `forward-auth`
- `jwt-auth`
- `key-auth`
- `idap-auth`

This tutorial uses the `basic-auth` plugin to authenticate its API consumers and grant them access to different endpoints.

## Prerequisite(s)

- Access to the Stargate GUI
- A configured route. [Follow these steps to configure a route](index.md).

## Step 1: Enable basic-auth Authentication

The `basic-auth` plugin lets API consumers to authenticate and access an API endpoint with a username and password. 

You can enable the `basic-auth` plugin by enabling it during route configuration. Thus, consumers without `basic-auth` details are denied access.


## Step 2: Create two different API consumers

pCDN consumers consume the APIs coming through the distributed pCDN gateway, and authenticating these users helps secure the access and consumption of your APIs.

For this, guide, we'll create two different users, with access to `/user-data`, `/home`, `/cart` and `/email` endpoints. 

Follow these steps to create the consumers with basic-auth details:

1. Navigate to **Consumer** from your Stargate dashboard.
1. Click **+Create** 
1. Enter a name and description(optional) for your first consumer. Click **Next**
1. Under plugin, click **Enable** from the **basic-auth** card under the **Authentication** section. This opens the Plugin Editor.
1. Enter a username and password for the user. 
1. Click **Next**. Review your configurations from steps 3-5.
1. Click **Submit**

Repeat steps 3-5, but with a different name and password for users b. 

## Step 3: Test user access
