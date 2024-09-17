---
sidebar_position: 1
title: Query Workers
---

A query worker is set of named, parameterized C8QL or SQL queries stored in GDN that you can run from a dedicated REST endpoint. The query worker is created automatically globally and is available from the region closest to the user. We recommend using query workers to build applications backed by GDN as opposed to querying with raw C8QL or SQL directly from application code or setting up a centralized middleware.

Query workers can be created and updated using the GDN web console, CLI, SDK, or by using the REST API directly. Each query worker is tied to a specific query text and parameter set. You can set default values for query parameters (making them optional during runs of your query worker), or you can make them mandatory for each run (failing to pass along will result in an error).

Each query worker is exposed as its own endpoint and is protected. The query workers are organized by [Fabric](../../geofabrics/index.md), enabling you to have different query workers for different geo-regions as well as for different fabrics within same region.

For more information, refer to [Query Workers](./query-workers.md).
