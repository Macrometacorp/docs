---
sidebar_label: Glossary
title: Understand pCDN Terminology
---

- **Routes:** A [route](./01-getting-started/index.md#step-1-configuring-a-route) forwards incoming API traffic based on preexisting rules to a specified upstream address. 
- **Upstream:** These are target backend nodes for routes. They also perform [load balancing](./01-getting-started/index.md#step-2-set-up-load-balancing) on a set of nodes according to predefined rules set during the upstream configuration.
- **Service:** An API abstraction that bounds routes together. For example, two routes(A and B) with the same plugins and upstream can be bounded to the same service. This reduces the redundancy from configuring two separate plugins and upstreams for each route.
- **Plugins:** Component(s) that improves the functionality of existing software to meet business/user specific needs. [Plugins](./04-plugins/index.md) are customizable and offers a plugin editor that allows you to update its schema configuration.
- **Consumers:** The highest priority level in the API gateway that identifies the API requester. It uses authentication to generate a unique ID for every consumer and uses this ID to execute the plugins and upstream configurations bound to the consumer.