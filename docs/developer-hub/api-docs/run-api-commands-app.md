---
sidebar_position: 30
title: Run API Commands in App
---

This page provides instructions for running API commands from the Macrometa console API reference.

## Prerequisites

- Access to a Macrometa account with the permissions for the command that you want to run.
- An API key if you want to use one. For more information about managing API keys, refer to [Manage API Keys](../../account-management/api-keys/index.md).

## Run API Commands

1. Log in to your [Macrometa account](https://auth-play.macrometa.io/).
1. Click **API Reference**.
1. (Optional) If you want to use an API key to run your commands, then click **Use API Key. Otherwise, Macrometa authenticates you with a [JSON Web Token (JWT)](../../account-management/auth/jwts.md).
1. In the Macrometa GDN API pane, browse through the commands and then click the one that you want to use to expand it.
1. Click **Try it out**. Previously inactive fields become active.
1. In the Parameters, enter the **fabric** that you want to run the API command against. If you want to run a call on a particular collection or stream, then select the fabric associated with it.
1. Enter any other parameters necessary for your API call. Items marked with an asterisk(*) are required.
1. Click **Execute**.

   Macrometa runs the API call with the parameters that you chose and returns a response in the Server response pane.

   Macrometa also displays your request as a Curl command and the Request URL.
