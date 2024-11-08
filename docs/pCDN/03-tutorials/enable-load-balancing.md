---
title: Load balancing
---

Upstreams act as target for routes and split route-directed traffic across a predefined set of nodes, thus preventing server overloads for high-traffic endpoints. 
You can configure upstream nodes when configuring a route, or creating an upstream.

This guide walks you through creating a set of upstream nodes and balancing API traffic across these nodes.

## Prerequisite(s)

- A Stargate instance

## Create nodes for Load balancing

To set up upstream nodes:

1. Navigate to **Upstream** from your dashboard
2. Enter a name for your Upstream. Description is optional. 
3. For this guide, we created two nodes:
    - [examplepetstore.com](http://examplepetstore.com)  running at port 443
    - [example-pet-store.com](http://example-pet-store.com) with port 443

In the configuration above, all requests sent from the client address to a configured route is split almost evenly and forwarded to [`examplepetstore.com`](http://examplepetstore.com) and [`example-pet-store.com`](http://example-pet-store.com) .

## Test Load balancing