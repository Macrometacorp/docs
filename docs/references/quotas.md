---
sidebar_position: 5
title: Tenant Quotas and Limits
---

This page describes the rate limits for all Playground GDN customers. Each quota applies on a per-Region basis unless otherwise specified.

The following table shows rate limits for Playground accounts. API calls will be denied once you reach the limit. Quotas are reset every 24 hours.


:::note

Playground accounts can not be used in production. Review our [Terms of Service](https://www.macrometa.com/terms-of-service) for more details.

:::

| Name 							| Play Tier Quota 	|
|------							|-----------------	|
| Geo Fabrics per Tenant 		| 2					|
| Collections per Fabric		| 10				|
| Graphs per Fabric				| 2					|
| Views per Fabric 				| 2				    |
| Indexes per Fabric 			| 10 				|
| Requests per Day				| 20000				|
| Requests per Minute  			| 5500 (500/PoP)	|
| Storage per Day				| 200 MB			|
| Document Size					| 500 KB			|
| Documents per Query			| 1000				|
| Documents Imported per API Call | 10000			|
| Query Run Time in Ms			| 10000				|
| Memory per Query				| 256 MB			|


**Stream Limits:**

| Name 											| Play Tier Quota 	|
|------											|-----------------	|
| Max Streams Count			                    | 10 				|
| Max Consumers Count	                        | 14	    		|
| Max Producers Count                           | 14    	        |
| Max Subscriptions Count                       | 14    			|
| Max Backlog Storage (MB)                      | 100   	        |
| Max Backlog Message TTL in Minutes 			| 240 				|
| Max Dispatch Throttling Rate (Bytes) 			| 4096				|

**Stream Worker Limits:**

| Name 											| Play Tier Quota 	|
|------											|-----------------	|
| Max Published Workers	                        | 2			        |
| Max Workers Cpu Seconds Per Minute            | 60	            |
| Max CPU Seconds Per Minute Per Worker			| 60 				|
| Max Memory Per Worker (MB)                    | 100	            |
| Max Workers Memory (MB)       	            | 200			    |
| Max Workers Throughput Out Per Minute (MB)	| 10	    		|
| Max Workers Throughput Per Minute (MB)        | 10	            |
| Max Logs Length Per Minute Per Worker (KB) 	| 10				|
