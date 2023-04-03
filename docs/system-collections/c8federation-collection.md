---
sidebar_position: 10
title: _c8federation Collection
slug: c8federation-collection
---

The `_c8federation` collection is a system-level collection containing records to configure features, limits, and workflows for the Macrometa GDN. This collection is configured explicitly, differing from other system-level collections that are implicitly configured during deployment. 

### Collection Information

- **Collection Name:** _c8federation
- **Collection Type:** Document (System)
- **Stream Enabled:** True
- **Distribution:** Global

#### Related Endpoints
[Administration](/api#/operations/ReturnListOfTenants)

#### Related System Collections
- _dnsEvents
- _dnsRecords
- _dnsErrors
- _otp

#### Description
The `_c8federation` collection contains records to control federation and tenant level features, limits, etc. This is the primary configuration collection for each GDN instance.

### Collection Definition

```json
{
	"id": "106",
	"name": "_c8federation",
	"status": 3,
	"type": 2,
	"collectionModel": "DOC",
	"isSpot": false,
	"isLocal": false,
	"hasStream": true,
	"waitForSync": false,
	"isSystem": true,
	"globallyUniqueId": "_c8federation",
	"searchEnabled": false 
}
```

### Collection Schema and Details

#### _id:
A unique and automatically generated value that combines the collection name and the _key value. This value is unique at the fabric level. 

#### _key:
A unique and user-defined or automatically generated value. Auto-generated values are based on the defKeyGenerator collection in the `_c8federation collection`. This value is unique at the collection level. 

#### _rev:
A unique and automatically generated value is used by the system to track revisions and resolve conflicts. This value is not generally used by the user.

#### c8DBAllowedMetrics:
An array of strings containing the allowable metrics returned by the `query/metrics` API endpoint. Modifying this record allows additional metrics from the metrics service to be returned. A code change to the metrics service is required to add new metrics.

#### acceptUserReplicationFactor:
A key-value attribute containing a boolean value to configure whether users can set a replication factor. This attribute is used in clustered C8DB deployments. In a clustered deployment, the data is divided into shards. Shards can be replicated to other nodes in the cluster for high availability and failover. Clustering is not currently supported on the GDN, so this value will default to `False`.

#### curlTimeout:
A key-value attribute containing an integer value to set the cURL timeout in seconds. The value is used for REST API requests between internal services. The default value is `30` seconds.

#### defJWTValidityServiceUserSecs:
A key-value attribute containing an integer value to set the number of seconds that a JWT (JSON Web Token) is valid. This is used by internal services’ JWTs and not for user authentication. The default value is `315360000`, which is equivalent to 10 years.

#### defKeyGenerator:
A key-value attribute containing an integer value between 1 and 5 to set the type of key generation for collections. The default value is `5`, which is UUID64. Key generation types are defined below.

1. **Traditional:** This key generator type uses numerical keys in ascending order. The sequence of keys is not guaranteed to be gap-free due to new key generation for attempted inserts, not just successful inserts.


2. **Auto-increment:** This key generator type uses numerical keys in ascending order. The initial offset and the spacing can be configured. The sequence of generated keys is not guaranteed to be gap-free due to new key generation for attempted inserts, not just successful inserts.


3. **Padded:** this key generator type generates keys of a fixed length, 16 bytes, in ascending lexicographical sort order. The key generator can be used in a single server or cluster. The sequence of generated keys is not guaranteed to be gap-free.


4. **UUID:** This key generator type generates universally unique 128-bit keys stored in a hexadecimal human-readable format. This key generator can be used in a single server or cluster to generate “seemingly random” keys. The keys produced by this key generator are not lexicographically sorted.

5. **UUID64:** This key generator type generates universally unique 64-bit keys stored in a hexadecimal human-readable format. This key generator can be used in a single server or cluster to generate “seemingly random” keys. The keys produced by this key generator are not lexicographically sorted.

#### defNumberofShards:
A key-value attribute containing an integer value to set the number of shards for each collection in a federation. This configuration only applies to GDN instances in a clustered or “multi-node” configuration. Currently, the GDN does not support a clustered configuration.

#### enableDbOPTFeature:
A key-value attribute containing a boolean value to enable/disable OTP (one-time password) storage on the C8DB service. OTP service enables new WSS (WebSocket) connections for the Streams feature. The default value is “False”. When “False”, it will store the OTP in the memory of the c8apiserver service. When “True”, the `_otp` system collection stores the OTP. A single server configuration should be set to “False”. A clustered configuration should be set to “True”.

#### enableSearch:
A key-value attribute containing a boolean value to enable/disable the Search feature. The default value is “True”.

#### enableUnlimitedPulsarQueueReservations:
A key-value attribute containing a boolean value to enable/disable Pulsar queue reservations. This configuration is utilized when inserting large volumes of data into global collections. As the data will need to be replicated across the GDN, this avoids bogging down the `polog` topic responsible for replication. 

There is a threshold value for the queue to prevent OOM (out-of-memory) issues. This record was introduced to bypass the message queue threshold to permit inserting large volumes of data.

#### enableZendeskSupport:
A key-value attribute containing a boolean value to configure the support request endpoint. The default value is “True”. This endpoint is used internally to create support requests for GeoFabric management.

#### logQueryFailures:
A key-value attribute containing a boolean value to enable/disable failed query logging. When enabled, the failed, and slow queries are stored in a _queryExecution system collection. The default value is “True”. The TTL index for this collection is set to 90 days.

#### maxBatchSize:
A key-value attribute containing an integer value to set the maximum batch size. This value is the maximum number of documents returned by a single query API request. The default value is 1000.

#### maxBatchSizeMM:
A key-value attribute containing an integer value to set the maximum batch size for the admin tenant. This value is the maximum number of documents returned by a single query API request. The default value is 10,000.

#### memLimitConfig:
A key-value attribute containing an integer value to set the maximum memory threshold size of the C8DB service. Once this limit is reached, queries will begin to fail. The default value is 3865470566, this value is measured in bytes. This default value represents 60% of the C8DB_MEM_LIMIT configured in the Kubernetes deployment file.

:::note 
This value has successfully been increased to 80%
:::

#### pulsarPublisherBatchTimerDelay:
A key-value attribute containing an integer value to set the batch time delay for global data replication. The default value is 300ms. The C8DB global replication-related messages are sent to other regions in batches. In the case of the default value of 300ms, all messages collected within 300ms will be sent in one batch. 

#### search-watermarks:
A JSON object containing key-value pairs to enable the Search watermarks checks, set a high and low “watermark” and a normal and abnormal frequency check interval. Additionally, a boolean attribute, “enabled”, configures whether this record is used.

The search-watermark record serves as the default configuration of the `SearchViewMonitor`. The `SearchViewMonitor` monitors and controls the use of mmap (memory-mapped) files by all Search Views in a single node C8DB instance executing in the region.

Both watermark values reference the limit for the number of mmap files in the virtual address space. The default limit for maximum mmap files is 65530. The watermark percentage values are integer values representing a percentage of the mmap file limit. The check frequency values are integer values representing the number of seconds between checking the mmap file count.

#### syncConfigLimit:
A JSON object containing key-value pairs to set the batch size, delay time in seconds, and retry limit during syncing documents in batches when new regions are added to a fabric. The syncBatchSize is the document count, the syncDelayInSeconds is the time between batches in seconds, and the syncRetryLimit is the number of retry attempts before failure. 

#### enableTenantUserUUID:
A key-value attribute containing a boolean value to enable/disable the tenant user UUID feature and email change verification. The default value is “True”. When enabled, new tenants will be created with a random string value as a unique identifier. Email change verification requires C8AUTH to be enabled on the federation.
Note: This was created to prevent compatibility issues with mixed-mode federations. From release 17.10 forward, this should default to “True”.

#### enableAvantGardeFlow:
A key-value attribute containing a boolean value to enable/disable the account upgrade flow feature. When enabled, the scale tier upgrade request workflow and instance-based pricing are available. The default value is “True”. 

#### enableSingleRegionFabric:
A key-value attribute containing a boolean value to enable/disable the creation of fabrics with a single region. The default value is “False”. When enabled, a single region fabric can be created. However, it is recommended to keep this set to the default value, “False”, to provide high availability of services.

#### enableGlobalURL:
A key-value attribute containing a boolean value to enable/disable the C8DNS service to create a set of Alias DNS records automatically. These DNS records will point to the available GDN regions for the tenant/fabric. This process will also create a “global URL” that allows requests to be routed to the nearest available region for the request's origination. 

Additionally, the tenant URL allows requests to be routed to the regions available to the tenant/fabric instead of all regions in the GDN. This record relates to the _dnsEvents, _dnsRecords, and _dnsErrors _system collections.

:::note 
This feature requires an AWS account with Route53 access to create RecordSets, HealthChecks, Geolocation routing, etc. When deploying a GDN instance, the Kubernetes secret should be set to use the AWS access key ID and secret access key. Currently, no other DNS services are supported by this feature.
:::

#### enableRateLimits:
A key-value attribute containing a boolean value to enable/disable rate limits at the federation level. The default value is “True”. This record references the “maxRequestPerMinute” attribute from the “defaultLimits” record in the _c8federation collection. These limits will be used if tenant and plan limits are not set.

#### enableLimits:
A key-value attribute containing a boolean value to enable/disable limits at the federation level. The default value is “True”. This record references the “defaultLimits” record in the _c8federation collection.

#### defaultLimits:
A nested JSON object containing key-value pairs to set default limits for the federation level. These limits will be used if the tenant and plan limits are not set. Limits are configurable at a feature level. 

### Sample Record

```json
	{
		"_id": "_c8federation/C8DBAllowedMetrics",
		"_key": "C8DBAllowedMetrics",
		"_rev": "_fBhFrZW--B",
		"value": [
			"c8db_http_response_size_bytes",
			"c8db_http_request_size_bytes",
			"c8db_http_requests_total_count",
			"c8db_http_request_latency_ms",
			"c8db_regions_count",
			"c8db_streams_count",
			"c8db_collection_count",
			"c8db_spotcollection_count",
			"c8db_restql_count",
			"c8db_db_size_bytes",
			"c8db_index_size_bytes",
			"c8db_storage_read_latency_ms",
			"c8db_storage_write_latency_ms",
			"c8db_http_requests_get_count",
			"c8db_http_write_requests_count",
			"c8db_document_count",
			"c8db_edgecollection_count",
			"c8db_geofabric_count",
			"c8db_http_read_requests_count",
			"c8db_http_request_size_bytes_sum",
			"c8db_http_response_size_bytes_sum",
			"c8db_index_count",
			"c8db_user_count",
			"c8db_service_kv_read_requests_count",
			"c8db_service_dynamo_read_requests_count",
			"c8db_service_doc_read_requests_count",
			"c8db_service_search_read_requests_count",
			"c8db_service_graph_read_requests_count",
			"c8db_service_kv_write_requests_count",
			"c8db_service_dynamo_write_requests_count",
			"c8db_service_doc_write_requests_count",
			"c8db_service_search_write_requests_count",
			"c8db_service_graph_write_requests_count",
			"c8db_service_kv_delete_requests_count",
			"c8db_service_dynamo_delete_requests_count",
			"c8db_service_doc_delete_requests_count",
			"c8db_service_search_delete_requests_count",
			"c8db_service_graph_delete_requests_count",
			"c8db_service_kv_disk_size",
			"c8db_service_dynamo_disk_size",
			"c8db_service_doc_disk_size",
			"c8db_service_search_disk_size",
			"c8db_service_graph_disk_size",
			"c8db_service_kv_index_size",
			"c8db_service_dynamo_index_size",
			"c8db_service_doc_index_size",
			"c8db_service_search_index_size",
			"c8db_service_graph_index_size",
			"c8db_service_kv_query_execution_time",
			"c8db_service_dynamo_query_execution_time",
			"c8db_service_doc_query_execution_time",
			"c8db_service_search_query_execution_time",
			"c8db_service_graph_query_execution_time",
			"c8db_service_doc_restql_usage_count",
			"c8db_service_doc_restql_execution_time",
			"c8db_service_search_view_count",
			"c8db_service_search_analyzer_count",
			"c8db_service_search_disk_size",
			"c8db_service_search_index_size",
			"c8db_service_search_query_execution_time",
			"c8db_service_search_count"
		]
	},
	{
		"_id": "_c8federation/acceptUserReplicationFactor",
		"_key": "acceptUserReplicationFactor",
		"_rev": "_fBhFrgG--C",
		"value": false
	},
	{
		"_id": "_c8federation/curlTimeout",
		"_key": "curlTimeout",
		"_rev": "_fBhFrgC--F",
		"value": 30
	},
	{
		"_id": "_c8federation/defJWTValidityServiceUserSecs",
		"_key": "defJWTValidityServiceUserSecs",
		"_rev": "_fBhFrgK--C",
		"value": 315360000
	},
	{
		"_id": "_c8federation/defKeyGenerator",
		"_key": "defKeyGenerator",
		"_rev": "_fBhFrgC--C",
		"value": 1
	},
	{
		"_id": "_c8federation/defNumberOfShards",
		"_key": "defNumberOfShards",
		"_rev": "_fBhFrgC--_",
		"value": 8
	},
	{
		"_id": "_c8federation/enableDbOTPFeature",
		"_key": "enableDbOTPFeature",
		"_rev": "_fBhFrfy--A",
		"value": true
	},
	{
		"_id": "_c8federation/enableSearch",
		"_key": "enableSearch",
		"_rev": "_fBhFrf6--C",
		"value": true
	},
	{
		"_id": "_c8federation/enableUnlimitedPulsarQueueReservations",
		"_key": "enableUnlimitedPulsarQueueReservations",
		"_rev": "_fBhFrgC--I",
		"value": false
	},
	{
		"_id": "_c8federation/enableZendeskSupport",
		"_key": "enableZendeskSupport",
		"_rev": "_fBhFrgG--F",
		"value": true
	},
	{
		"_id": "_c8federation/logQueryFailures",
		"_key": "logQueryFailures",
		"_rev": "_fBhFrgK--F",
		"value": true
	},
	{
		"_id": "_c8federation/maxBatchSize",
		"_key": "maxBatchSize",
		"_rev": "_fBhFrgG--I",
		"value": 1000
	},
	{
		"_id": "_c8federation/maxBatchSizeMM",
		"_key": "maxBatchSizeMM",
		"_rev": "_fBhFrgK--_",
		"value": 10000
	},
	{
		"_id": "_c8federation/memLimitConfig",
		"_key": "memLimitConfig",
		"_rev": "_fBhFrgO--F",
		"value": {
			"globalAqlMemoryLimit": 137438953472
		}
	},
	{
		"_id": "_c8federation/pulsarPublisherBatchTimerDelay",
		"_key": "pulsarPublisherBatchTimerDelay",
		"_rev": "_fBhFrg---_",
		"value": 300
	},
	{
		"_id": "_c8federation/search-watermarks",
		"_key": "search-watermarks",
		"_rev": "_fBhFrf2--F",
		"value": {
			"abnormal-check-frequency-seconds": 60,
			"enabled": true,
			"high-watermark-percent": 90,
			"low-watermark-percent": 80,
			"normal-check-frequency-seconds": 300
		}
	},
	{
		"_id": "_c8federation/syncConfigLimit",
		"_key": "syncConfigLimit",
		"_rev": "_fBhFrgO--C",
		"value": {
			"syncBatchSize": 500,
			"syncDelayInSeconds": 60,
			"syncRetryLimit": 5
		}
	},
	{
		"_id": "_c8federation/enableTenantUserUUID",
		"_key": "enableTenantUserUUID",
		"_rev": "_fCAx9vG--_",
		"value": true
	},
	{
		"_id": "_c8federation/enableAvantGardeFlow",
		"_key": "enableAvantGardeFlow",
		"_rev": "_fCKS_WC--_",
		"value": true
	},
	{
		"_id": "_c8federation/enableSingleRegionFabric",
		"_key": "enableSingleRegionFabric",
		"_rev": "_fDCB5Yq--_",
		"value": false
	},
	{
		"_id": "_c8federation/enableGlobalUrl",
		"_key": "enableGlobalUrl",
		"_rev": "_fDCB8om--_",
		"value": true
	},
	{
		"_id": "_c8federation/enableRateLimits",
		"_key": "enableRateLimits",
		"_rev": "_fDCB9Lm--_",
		"value": true
	},
	{
		"_id": "_c8federation/enableLimits",
		"_key": "enableLimits",
		"_rev": "_fDDR-Me--_",
		"value": true
	},
	{
		"_id": "_c8federation/defaultLimits",
		"_key": "defaultLimits",
		"_rev": "_fEmAX-S--H",
		"value": {
			"cep": {
				"maxCpuSecondsPerMinutePerWorker": 20,
				"maxLogsLengthKBPerMinutePerWorker": 10,
				"maxMemoryMBPerWorker": 0,
				"maxPublishedWorkers": 0,
				"maxWorkersCpuSecondsPerMinute": 0,
				"maxWorkersMemoryMB": 0,
				"maxWorkersThroughputInMBPerMinute": 0,
				"maxWorkersThroughputOutMBPerMinute": 0
			},
			"compute": {
				"maxConfigmapsCount": 25,
				"maxEphimeralStorageMB": 500,
				"maxLimitsCpuMi": 1000,
				"maxLimitsMemoryMB": 1000,
				"maxPodsCount": 25,
				"maxRequestsCpuMi": 1000,
				"maxRequestsMemoryMB": 1000,
				"maxSecretsCount": 25,
				"maxServicesCount": 25
			},
			"eventhub": {
				"maxEventhubConsumersCount": 0,
				"maxEventhubProducersCount": 0
			},
			"maxCollectionsPerFabric": 1000,
			"maxDocumentSize": 512000,
			"maxDocumentsImportedPerAPICall": 10000,
			"maxDocumentsReturnedByQuery": 1000,
			"maxGeoFabricsPerTenant": 50,
			"maxGraphsPerFabric": 500,
			"maxIndexes": 100,
			"maxQueryExecutionTimeInMs": 10000,
			"maxQueryMemoryBytes": 268435456,
			"maxRequestPerMinute": 2000,
			"maxRequestsPerDay": 20000,
			"maxRestQLUsagePerDay": 0,
			"maxRestQLUsagePerFabric": 0,
			"maxStoragePerRegion": 209715200,
			"maxStoredRestQL": 0,
			"maxViewsPerFabric": 100,
			"streamsGlobal": {
				"maxBacklogMessageTTLMin": 1440,
				"maxBacklogStorageSizeMB": 2048,
				"maxConsumersCount": 28,
				"maxDispatchThrottlingRateInByte": 512000,
				"maxProducersCount": 28,
				"maxStreamsCount": 100,
				"maxSubscriptionsCount": 28
			},
			"streamsLocal": {
				"maxBacklogMessageTTLMin": 1440,
				"maxBacklogStorageSizeMB": 2048,
				"maxConsumersCount": 28,
				"maxDispatchThrottlingRateInByte": 512000,
				"maxProducersCount": 28,
				"maxStreamsCount": 100,
				"maxSubscriptionsCount": 28
			}
		}
	}
]
```