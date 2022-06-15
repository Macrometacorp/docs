---
sidebar_position: 1
title: Query Workers
---

GDN stores named and parameterized [C8QL](../c8ql/index.md) queries called _Query Workers. They can be executed from a dedicated REST endpoint, and are also known as RESTQL or “Query as API.”

When the user saves a query, the query is automatically converted to an API and is deployed globally to serve the users from the region closest to them with local latencies.

:::note
We recommend using Query Workers to build applications backed by GDN as opposed to querying with C8QL directly from application code or setting up a centralized middleware.
:::note

You can create and update query workers with the GDN console or by using the REST API. Each query worker is tied to a specific query text and parameter set. You can set optional or mandatory default values for query parameters.

Each query worker is protected and exposed as its own endpoint. Query workers are organized by fabric (or database) so you can have query workers for different geo-regions or fabrics within same region.
