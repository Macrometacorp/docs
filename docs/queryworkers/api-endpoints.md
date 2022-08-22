---
sidebar_position: 40
title: API Endpoints
---

Any query or Query Worker can be used as an API endpoint.

## Create and API Endpoint

You can create a REST API endpoint from a query or query worker.

1. Navigate to **Queries**.
1. Write a query or display a query worker.
1. Add [bind parameter](bind-parameters.md) values if needed.
1. Click **API Endpoint**.

Macrometa displays the cURL (Client URL) command that you can use in the terminal or command line to make an API call and run the query.

![API Endpoint](/img/queries/api-endpoint.png)

## Query vs. Query Worker Endpoints

You can use any unsaved query as an API endpoint, but best practice is to use saved queries (query workers) for the following reasons:

- Query workers have hard-coded URLs, while queries use a generic `/feature/option/data` path.
- Query workers are cached across all GeoFabric locations. You can edit query workers while they are running, but an unsaved query must be redeployed if you need to update it.

Using query workers instead of unsaved query endpoints does not impact your billing.

## Bind Parameter Values vs. Placeholders

You cannot run a query with empty bind parameter values. Otherwise, the query fails with an error.

With query workers, you can add placeholder bind parameters with empty values and enable a user or application to add values as needed. If you enter values in the saved query, the API Endpoint only uses those values.

However, sometimes you do want the API call to always use specific values, perhaps because they always access and edit one specific record. If so, then be sure and enter the correct value next to the bind parameter key.
