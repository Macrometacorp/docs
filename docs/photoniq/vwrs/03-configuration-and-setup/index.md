---
title: Using the Virtual Waiting Room
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

Using the VWRs follows these steps:

- Authenticating with an API key
- Configuring a VWRs Edgeworker
- Creating your Waiting room
- Interacting and monitoring your waiting room

## Creating an API key

<Tabs groupId="create-api-key">
<TabItem value="api-gui" label="Web Console">

To create an API key with the Web Console:

1. Login to the PhotonIQ VWRs GUI console.
1. Click on **API Keys** from the tab.
1. Click **Add New API Key**
1. Configure your key by filling in the following details:
- **Key ID**: A unique ID for your key
- **Role**: Select a role for your key. Roles available are Admin, Editor, and viewer and determine the permissions available to the key.
- **TTL**: Validity period of your API key.

Toggle the **Activated** button to activate or deactivate your API Key.
5. Click on **Add API Key**


</TabItem>
<TabItem value="api-rest" label="REST API">

[Create an API Key](https://www.macrometa.com/docs/apiVwrs#/operations/createAPIKey)

</TabItem>
</Tabs> 
