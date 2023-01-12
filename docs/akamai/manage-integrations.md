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
1. Enter your [Akamai account details](#akamai-account-details):
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
1. Click **Delete Metadata** to clear your Akamai account details.

## Akamai Account Details

This section explains how Macrometa fields relate to Akamai EdgeWorker fields.

### Credentials and Access

These four parameters are credentials for the Akamai API:

- **Access Token -** Refer to the [Get an access token](https://techdocs.akamai.com/identity-cloud-auth/reference/post-access-getaccesstoken) API call to create or retrieve an access token.
- **Base URL -** Akamai endpoint URL with the format `akab-***.luna.akamaiapis.net`
- **Client Secret -** Follow the [Set up authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) procedure in the Akamai documentation to create credentials with a client token and client secret.
- **Client Token -** Follow the [Set up authentication credentials](https://techdocs.akamai.com/developer/docs/set-up-authentication-credentials) procedure in the Akamai documentation to create credentials with a client token and client secret.


- **Host Name -** Your Akamai **Property Host Name**.
- **Group ID -** You can view your **Group ID** in the Properties screen in Akamai. Select a property to view more details and view the Group ID in the URL bar of preferred browser: `gid=xxxxxx`
**Group ID** we can find out if we login to Akamai platform then select Properties from the right sidebar.
All properties will be displayed, select property to get the property details. In the URL bar of preferred browser you will see `gid=xxxxxx` parameter.

- **Resource Tier ID -** Specify the Akamai tier used for your integration.  **Dynamic Computer** should be **200** and **Basic Compute** should be **100**.


**Host Name** and **Group ID** are considered Properties. Refer to [Key concepts and terms](https://techdocs.akamai.com/property-mgr/docs/key-concepts-terms) in the Akamai documentation for more information.

- **Host Name** should be filled with the Akamai **Property Host Name**.
- **Group ID**. Log in to Akamai platform, then select **Properties** from the right sidebar. All properties are displayed, select a property to get the property details. In the URL bar of preferred browser, you will see `gid=xxxxxx` parameter.

### Resource Tier ID

**Resource Tier ID** defines Akamai tier that will be used for integration. The Resource Tier ID for **Dynamic Compute is 200** and the Resource Tier ID for **Basic Compute is 100**.
