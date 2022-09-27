---
sidebar_position: 30
title: Run API Commands in App
---

Step 1. Select the desired endpoint from the left sidebar, for this example we will use the "Validate API Key" endpoint.

Step 2. Choose your authorization method. The API reference supports JSON Web Token (JWT) and API Key authorization. Place the authorization prefix and token or key in the "Authorization:" field in the right sidebar.

Note - Each method requires a specific prefix to successfully authorize the request. 

API Key Authorization - Authorization: apikey <YOUR API KEY>
JWT Authorization - Authorization: Bearer <YOUR JWT> 

Please ensure you have either a valid API Key or JWT before submitting your request.

API Creation API Endpoint - https://docs-git-apiref-team-macrometa.vercel.app/api#/operations/CreateApiKey
JWT Creation API Endpoint - https://docs-git-apiref-team-macrometa.vercel.app/api#/paths/_open-auth/post

(Note to Diana. There is a bit of a order of operations thing here I am not sure how to best describe. You have to have an account to create a JWT to create an API. After that you can proceed however you wish.)

Step 3. Review and confirm the requirements of the Request Body. The "Validate API Key" Endpoint requires a "keyid" in as a string.

Example Body: {
			"keyid": "<YOUR API KEY>"
		    }

Step 4. Send the API Request. Press the button below the "Body" section of the right sidebar. If you have authorized successfully and included the required contents in the Request Body you should receive a 200 Status Code and a Response Body containing the data.

Step 5. (Optional) Select a Request Sample. Click the "Request Sample:" dropdown menu to select a language and library for your request. The default Request Sample will be a cURL command. 