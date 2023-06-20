---
sidebar_position: 3
title: GraphQL Caching
---

## Macrometa GDN

| **Platform**                       | **Tenant**                      |
| ---------------------------------- | ------------------------------ |
| [URL](https://cache.eng.macrometa.io/) | `demo@macrometa.com` |

## Deployment

| **Source Code**                       | **Deployment**                      | 
| ---------------------------------- | ------------------------------ | 
| [GitHub](https://github.com/Macrometacorp/parsec-graphql-cache) | [Deployment](https://macrometacorp.github.io/parsec-graphql-cache/) | 

## Solution

This sample application demonstrates how to optimize GraphQL query response times while reducing the burden on the GraphQL origin server. This demo includes a customized Quell Library (https://github.com/open-source-labs/Quell) to leverage a Macrometa key-value collection as a caching mechanism, surpassing traditional Redis server implementations. We achieve performance gains by configuring a four-region US federation with GDN and deploying a single Elasticsearch instance located in the US West region. 