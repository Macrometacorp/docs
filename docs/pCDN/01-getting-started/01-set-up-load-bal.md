---
title: Set up load balancing
---

Upstreams act as target for routes and use a predefined set of nodes to split route-directed traffic, thus preventing server overload for high-traffic endpoints. 

## Create an upstream

You can create an upstream when [configuring a route](index.md), or create an upstream object for use in configuring different routes. 

To add an upstream:

1. Click **Upstream** from your dashboard
2. Click **+Create** 
3. Enter a name for the upstream and the target **host** and **port**. For this guide, we created two nodes:
    - [examplepetstore.com](http://examplepetstore.com)  running at 443
    - [example-pet-store.com](http://example-pet-store.com) with port 443
1. Choose an **Algorithm** and **Upstream type**. This guide uses the round robin algorithm and a node for the upstream type. Leave other fields empty. 
1. Click **Next**. Preview your configurations and click **Submit**

## Test load balancing 

Generate 50 requests to test the effects of load balancing.