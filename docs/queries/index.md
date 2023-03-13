---
sidebar_position: 1
title: Queries
---

You can access your Macrometa data collections by writing a _query_ in [SQL](sql/index.md) or [C8QL](c8ql/index.md). GDN stores named and parameterized queries as _query workers_ that you can run from a dedicated REST endpoint.

When the user saves a query, the query is automatically converted to an API and is deployed globally to serve the users from the region closest to them with local latencies.

:::note
Best practice is to use query workers to build applications integrated with GDN instead of directly querying C8QL. For more information, refer to [Query Workers](../queryworkers/).
:::
