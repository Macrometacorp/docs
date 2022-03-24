---
sidebar_position: 5
---
# Tenant Quotas and Limits

This page describes the rate limits for all PaaS GDN customers. Each quota applies on a per-Region basis unless otherwise specified. Contact support@macrometa.com if you would like to request higher limits.

The following table shows rate limits for free developer accounts and metered accounts. API calls will be denied once you reach the limit. Quotas are reset every 24 hours.


| Name 							| Free Tier Quota 	| Metered Tier Quota |
|------							|-----------------	|-----------------	|
| Requests per Day				| 20000				| No limit			|
| Requests per Minute  			| 500				| 2000				|
| Storage per Day				| 200 MB			| No limit			|
| Document Size					| 500 KB			| 500 KB			|
| Documents per Query			| 1000				| 1000				|
| Documents Imported per API Call | 10000			| 10000				| 
| Query Run Time in Ms			| 10000				| 10000				|
| Memory per Query				| 256 MB			| 256 MB			|
| Collections per Fabric		| 10				| 1000				|
| Graphs per Fabric				| 2					| 500				|
| Views per Fabric 				| 2  				| 100				|
| Indexes per Fabric 			| 10 				| 100				|
| Geo Fabrics per Tenant 		| 2					| 50				|

The following limits apply to streams:

| Name 											| Free Tier Quota 	| Metered Tier Quota |
|------											|-----------------	|-----------------	|
| Max Backlog Message TTL in Minutes 			| 1440 				| 1440				|
| Max Dispatch Throttling Rate (Bytes)			| 4096				| 4096				|
| Max Backlog Storage for Global Streams (Megabytes) | 2048	| 2048		|
| Max Backlog Storage for Local Streams (Megabytes)	| 100			| 100				|
