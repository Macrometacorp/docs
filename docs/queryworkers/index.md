---
sidebar_position: 1
title: Queries and Query Workers
---

You can access your Macrometa data collections by writing a _query_ in [C8QL](../c8ql/index.md). GDN stores named and parameterized C8QL queries as _Query Workers_. They can be executed from a dedicated REST endpoint, and are also known as RESTQL or “Query as API.”

When the user saves a query, the query is automatically converted to an API and is deployed globally to serve the users from the region closest to them with local latencies.

:::note
We recommend using Query Workers to build applications backed by GDN as opposed to querying with C8QL directly from application code or setting up a centralized middleware.
:::