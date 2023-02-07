---
sidebar_position: 20
title: Run API Commands in Docs
---

This page provides instructions for running API commands from the Macrometa documentation reference.

## Prerequisites

- Access to a Macrometa account with the permissions for the command that you want to run.
- Appropriate authentication credentials. Refer to [Authentication](../account-management/auth/index.md) for more information.

## Run API Commands

1. In an internet browser, navigate to the [Macrometa GDN API](https://www.macrometa.com/docs/api#/) page.
1. In the left sidebar, select the endpoint that you want to access.
1. In the Auth pane, enter the authorization method and the JWT or API key.
   - API key: `apikey <YOUR API KEY>`
   - JWT: `bearer <YOUR JWT>`
1. In the Parameters pane, enter the **fabric** that you want to run the API command against. If you want to run a call on a particular collection or stream, then select the fabric associated with it.
1. In the Parameters pane, enter any other parameters necessary for your API call. Items marked with an asterisk(*) are required.
1. Click **Send API Request**.

   Macrometa runs the API call with the parameters that you chose and returns a response in the Response pane.

1. Optionally, you have the ability to generate a request in multiple programming languages, including Python and JavaScript. Click **Request Sample** to select a language and library for your request. The default request sample is a cURL command.
