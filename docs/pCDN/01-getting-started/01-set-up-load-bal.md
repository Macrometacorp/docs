---
title: Set up load balancing
---

Upstreams act as target for routes and use a predefined set of nodes to split route-directed traffic, thus preventing server overload for high-traffic endpoints. 

## Create an upstream

You can create an upstream when [configuring a route](index.md), or create an upstream object for use in configuring different routes. 

To add an upstream:

1. Click **Upstream** from your dashboard
2. Click **+Create** 
3. Enter a name for the upstream and the target **host** and **port**. 
4. Choose an **Algorithm** and **Upstream type**. This guide uses the round robin algorithm and a node for the upstream type. Leave other fields empty. 
5. Click **Next**. Preview your configurations and click **Submit**

## Test load balancing 