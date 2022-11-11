---
sidebar_position: 5
title: Tenant Quotas and Limits
---

This page describes the rate limits for all PaaS GDN customers. Each quota applies on a per-Region basis unless otherwise specified. [Dedicated fabrics](https://www.macrometa.com/enterprise) can handle up to 350,000 operations per second. Reach out to support to learn more, contact support@macrometa.com.

The following table shows rate limits for free developer accounts and metered accounts. API calls will be denied once you reach the limit. Quotas are reset every 24 hours.

| Name 							| Play Tier Quota 	|
|------							|-----------------	|
| Requests per Day				| 20000				|
| Requests per Minute  			| 4500 (500/PoP)	|
| Storage per Day				| 200 MB			|
| Document Size					| 500 KB			|
| Documents per Query			| 1000				|
| Documents Imported per API Call | 10000			|
| Query Run Time in Ms			| 10000				|
| Memory per Query				| 256 MB			|
| Collections per Fabric		| 10				|
| Graphs per Fabric				| 2					|
| Views per Fabric 				| N/A 				|
| Indexes per Fabric 			| 10 				|
| Geo Fabrics per Tenant 		| 2					|

The following limits apply to streams:

| Name 											| Play Tier Quota 	|
|------											|-----------------	|
| Max Backlog Message TTL in Minutes 			| 1440 				|
| Max Dispatch Throttling Rate (Bytes)			| 4096				|
| Max Backlog Storage for Global Streams (Megabytes) | 2048	|
| Max Backlog Storage for Local Streams (Megabytes)	| 100			|
