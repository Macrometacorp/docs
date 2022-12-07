---
sidebar_position: 10
title: Manage Akamai Integrations
---

This page describes how to integrate Akamai EdgeWorker functionality with the Macrometa platform.

:::note
This feature is currently in preview.
:::

## Prerequisites

- A Macrometa account with sufficient permissions to view and edit query workers or stream workers.
- In Akamai, a Property created with your Macrometa GDN integration. For more information about Akamai Properties, refer to [Create and configure a property](https://techdocs.akamai.com/api-definitions/docs/create-config-prop).

## Add Akamai Integration

Add Akamai metadata to your Macrometa GDN environment.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Query Workers**.
1. Click **Generate Edge Worker**.
1. In the pop-up, click **Manage Integration**.
1. Enter the following details from your [Akamai account](#akamai-account-details-explanation):
    - **Access Token**
    - **Base URL**
    - **Client Secret**
    - **Client Token**
    - **Host Name**
    - **Resource Tier ID**
    - **Group ID**
1. Click **Create**.

![Generate Edge Worker](/img/functions/manage_integration.png)

## Delete Akamai Integration

Delete Akamai metadata from your Macrometa GDN environment.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
1. Click **Query Workers**.
1. Click **Generate EdgeWorker**.
1. In the pop-up, click **Manage Integration**.
1. Click **Delete metadata** to clear your Akamai account details.

## Akamai account details explanation

These 4 parameters are credentials for Akamai API:

- **Access Token**
- **Base URL**
- **Client Secret**
- **Client Token**

In [Akamai documentation](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) you will find out how to create credentials.
Please keep in mind that base URL is Akamai endpoint URL it has a format of `akab-***.luna.akamaiapis.net`.

- **Host Name**
- **Group ID**

are needed to identify CDN configuration and that it called **Property** on Akamai platform.
You can find key concepts of Property Management in [Akamai documentation](https://techdocs.akamai.com/property-mgr/docs/key-concepts-terms).
**Host Name** should be filled with Akamai **Property Host Name**.
**Group ID** we can find out if we login to Akamai platform then select Properties from the right sidebar.
All properties will be displayed, select property to get the property details. In the URL bar of preferred browser you will see `gid=xxxxxx` parameter.

- **Resource Tier ID**

defines Akamai tier that will be used for integration.
The Resource Tier ID for **Dynamic Compute is 200** and the Resource Tier ID for **Basic Compute is 100**.







