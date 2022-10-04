---
sidebar_position: 20
title: Run API Commands in Docs
---

diana_macrometa.com.test1.SWltT0TEoLzmWbCRgx3x1GF5qTzT5tIvWx1RicXx8axK2u0hagvaqslV1shYN9rm4d031e

This page provides instructions for running API commands from the Macrometa documentation reference.

## Prerequisites

- Access to a Macrometa account with the permissions for the command that you want to run.
- Appropriate authentication credentials. Refer to [Authentication](LINK GOES HERE) for more information.

## Run API Commands

1. In an internet browser, navigate to the [Macrometa GDN API](https://macrometa.com/docs/api#/) page.
2. In the left sidebar, select the endpoint that you want to access.
3. In the Auth pane, enter the authorization prefix and token or key.
   - API key: `apikey <YOUR API KEY>`
   - JWT: `Bearer <YOUR JWT>`
4. In the Parameters pane, enter the **fabric** that you want to run the API command against. If you want to run a call on a particular collection or stream, then select the fabric associated with it.
5. In the Parameters pane, enter any other parameters necessary for your API call. Items marked with an asterisk(*) are required.
6. Click **Send API Request**.

   Macrometa runs the API call with the parameters that you chose and returns a response in the Response pane.

7. If you want to, you can generate a request in a number of programming languages, including Python and JavaScript. Click **Request Sample** to select a language and library for your request. The default request sample is a cURL command.
