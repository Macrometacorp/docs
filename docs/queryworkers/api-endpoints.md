---
sidebar_position: 40
title: API Endpoints
---

Any query or Query Worker can be used as an API endpoint.

## Create and API Endpoint

You can create a REST API endpoint from a query or query worker.

1. Navigate to **Queries**.
1. Write a query or display a query worker.
1. Add [bind parameter](fundamentals.md#bind-parameters) values if needed.
1. Click **API Endpoint**.

Macrometa displays the cURL (Client URL) command that you can use in the terminal or command line to make an API call and run the query.

![API Endpoint](/img/queries/api-endpoint.png)

## Query vs. Query Worker Endpoints

You can use any unsaved query as an API endpoint, but best practice is to use saved queries (query workers) for the following reasons:
- Query workers have hard-coded URLs, while queries use a generic `/feature/option/data` path.
- Query workers are cached across all GeoFabric locations. You can edit query workers while they are running, but an unsaved query must be redeployed if you need to update it.

## Bind Parameter Values vs. Placeholders

When you add bind parameter placeholders to a query and don't enter values, then you get an error when you run it, because it is missing values.

For Query Workers used as API endpoints, that is actually desired behavior. Often, you want to leave the placeholder so that your user or app can enter whatever values are needed in a specific API call. If you enter the values in the saved query, then the API Endpoint will only every use those values.

However, sometimes you do want the API call to always use specific values, perhaps because they always access and edit one specific record. If so, then be sure and enter the correct value next to the bind parameter key.