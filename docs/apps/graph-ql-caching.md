---
sidebar_position: 3
title: GraphQL Caching
---

This sample application demonstrates how to optimize GraphQL query response times while reducing the burden on the GraphQL origin server.

This demo includes a customized Quell Library (https://github.com/open-source-labs/Quell) to leverage a Macrometa key-value collection as a caching mechanism, surpassing traditional Redis server implementations. We achieve performance gains by configuring a four-region US federation with the Macrometa Global Data Network and deploying a single Elasticsearch instance located in the US West region.

## Macrometa GDN

| **Platform**                       | **Tenant**                     | **GUI**|
| ---------------------------------- | ------------------------------ |--------------|
| [URL](https://cache.eng.macrometa.io/) | `demo@macrometa.com` |[GraphQL Cache](https://macrometacorp.github.io/parsec-graphql-cache/) |

## Demo Site

Navigate to [GraphQL Cache](https://macrometacorp.github.io/parsec-graphql-cache/) and then click **Run Query** several times

The site runs a query against the selected GraphQL API and displays the request latency for both the GDN Cache and Uncached results.

![GraphQL Cache](/img/demos/graphql-cache.png)
