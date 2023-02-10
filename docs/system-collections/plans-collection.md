---
sidebar_position: 40
title: _plans Collection
slug: plans-collection
---

Collection Name: _plans
Collection Type: Document (System)
Stream Enabled: True
Distribution: Global
Overview:
The _plans collection is a system-level collection that stores records for each defined plan. Plans have feature gates, limits, metrics, price, and other metadata. Plans can be used to control feature access and limits for child tenants.

A plan is optional for the tenant and, if not specified, will use the configuration in the `_c8federation` system collection. The limits are stored in the `defaultLimits`record, enabled or disabled by the `enableRateLimits` record.
_plans configuration records:
Related Endpoints:
Administration
Related System Collections:
_c8federation
_tenants
Description:
Each _plans configuration record is a JSON object containing
Collection Definition:
{ "id": "214",
  "name": "_plans",
  "status": 3,
  "type": 2,
  "collectionModel": "DOC",
  "isSpot": false,
  "isLocal": false,
  "hasStream": true,
  "waitForSync": false,
  "isSystem": true,
  "globallyUniqueId": "_plans",
  "searchEnabled": false }

Sample Record:
{
		"_id": "_plans/Macrometa:PLAYGROUND",
		"_key": "Macrometa:PLAYGROUND",
		"_planId": 5,
		"_rev": "_fDI6Eee--_",
		"active": true,
		"attribution": "Macrometa",
		"avantGarde": true,
		"demo": true,
		"description": "A limited environment for evaluating the platform. Production use is not allowed.",
		"featureGates": [
			"DOCS",
			"DYNAMO",
			"GEO_FABRICS",
			"GRAPHS",
			"KV",
			"CEP",
			"STREAMS",
			"SEARCH",
			"USERS",
			"SQL",
			"COMPUTE_FAAS",
			"COMPUTE_AKAM"
		],
		"isBundle": true,
		"isUpgradable": false,
		"label": "Playground Tier",
		"limits": {
			"cep": {
				"maxCpuSecondsPerMinutePerWorker": 60,
				"maxLogsLengthKBPerMinutePerWorker": 10,
				"maxMemoryMBPerWorker": 100,
				"maxPublishedWorkers": 2,
				"maxWorkersCpuSecondsPerMinute": 60,
				"maxWorkersMemoryMB": 200,
				"maxWorkersThroughputInMBPerMinute": 10,
				"maxWorkersThroughputOutMBPerMinute": 10
			},
			"maxCollectionsPerFabric": 10,
			"maxGeoFabricsPerTenant": 2,
			"maxGraphsPerFabric": 2,
			"maxIndexes": 10,
			"maxRequestPerMinute": 500,
			"maxRequestsPerDay": 20000,
			"maxRestQLUsagePerDay": 1000,
			"maxRestQLUsagePerFabric": 1000,
			"maxStoragePerRegion": 209715200,
			"maxViewsPerFabric": 2,
			"streamsGlobal": {
				"maxBacklogMessageTTLMin": 240,
				"maxBacklogStorageSizeMB": 100,
				"maxConsumersCount": 14,
				"maxDispatchThrottlingRateInByte": 4096,
				"maxProducersCount": 14,
				"maxStreamsCount": 10,
				"maxSubscriptionsCount": 14
			},
			"streamsLocal": {
				"maxBacklogMessageTTLMin": 240,
				"maxBacklogStorageSizeMB": 100,
				"maxConsumersCount": 14,
				"maxDispatchThrottlingRateInByte": 4096,
				"maxProducersCount": 14,
				"maxStreamsCount": 10,
				"maxSubscriptionsCount": 14
			}
		},
		"metadata": {
			"list_order": 2
		},
		"metrics": [
			{
				"name": "kv-reads",
				"value": "c8db_service_kv_read_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "kv",
				"operation": "reads"
			},
			{
				"name": "dynamo-reads",
				"value": "c8db_service_dynamo_read_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "dynamo",
				"operation": "reads"
			},
			{
				"name": "doc-reads",
				"value": "c8db_service_doc_read_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "doc",
				"operation": "reads"
			},
			{
				"name": "kv-writes",
				"value": "c8db_service_kv_write_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "kv",
				"operation": "writes"
			},
			{
				"name": "dynamo-writes",
				"value": "c8db_service_dynamo_write_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "dynamo",
				"operation": "writes"
			},
			{
				"name": "doc-writes",
				"value": "c8db_service_doc_write_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "doc",
				"operation": "writes"
			},
			{
				"name": "kv-deletes",
				"value": "c8db_service_kv_delete_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "kv",
				"operation": "deletes"
			},
			{
				"name": "dynamo-deletes",
				"value": "c8db_service_dynamo_delete_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "dynamo",
				"operation": "deletes"
			},
			{
				"name": "doc-deletes",
				"value": "c8db_service_doc_delete_requests_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "doc",
				"operation": "deletes"
			},
			{
				"name": "kv-diskStorage",
				"value": "c8db_service_kv_disk_size",
				"metricType": "gauge",
				"stripeCategory": "diskStorage",
				"dashboardCategory": "storage",
				"service": "kv"
			},
			{
				"name": "dynamo-diskStorage",
				"value": "c8db_service_dynamo_disk_size",
				"metricType": "gauge",
				"stripeCategory": "diskStorage",
				"dashboardCategory": "storage",
				"service": "dynamo"
			},
			{
				"name": "doc-diskStorage",
				"value": "c8db_service_doc_disk_size",
				"metricType": "gauge",
				"stripeCategory": "diskStorage",
				"dashboardCategory": "storage",
				"service": "doc"
			},
			{
				"name": "dynamo-indexStorage",
				"value": "c8db_service_dynamo_index_size",
				"metricType": "gauge",
				"stripeCategory": "indexStorage",
				"dashboardCategory": "memory",
				"service": "dynamo"
			},
			{
				"name": "doc-indexStorage",
				"value": "c8db_service_doc_index_size",
				"metricType": "gauge",
				"stripeCategory": "indexStorage",
				"dashboardCategory": "memory",
				"service": "doc"
			},
			{
				"name": "dynamo-queryExecutionTime",
				"value": "c8db_service_dynamo_query_execution_time",
				"metricType": "histogram",
				"stripeCategory": "queryExecutionTime",
				"dashboardCategory": "cpu",
				"service": "dynamo"
			},
			{
				"name": "doc-queryExecutionTime",
				"value": "c8db_service_doc_query_execution_time",
				"metricType": "histogram",
				"stripeCategory": "queryExecutionTime",
				"dashboardCategory": "cpu",
				"service": "doc"
			},
			{
				"name": "doc-restqlUsage",
				"value": "c8db_service_doc_restql_usage_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "doc",
				"operation": "restqlUsage"
			},
			{
				"name": "doc-restqlExecutionTime",
				"value": "c8db_service_doc_restql_execution_time",
				"metricType": "histogram",
				"stripeCategory": "queryExecutionTime",
				"dashboardCategory": "cpu",
				"service": "doc"
			},
			{
				"name": "streams-storageSize",
				"value": "streams_storage_size",
				"metricType": "gauge",
				"stripeCategory": "diskStorage",
				"dashboardCategory": "streamStorage",
				"service": "streams"
			},
			{
				"name": "streams-reads",
				"value": "streams_out_bytes_total",
				"metricType": "counter",
				"stripeCategory": "streamTransferIO",
				"dashboardCategory": "streamTransferIO",
				"service": "streams",
				"operation": "reads"
			},
			{
				"name": "streams-writes",
				"value": "streams_in_bytes_total",
				"metricType": "counter",
				"stripeCategory": "streamTransferIO",
				"dashboardCategory": "streamTransferIO",
				"service": "streams",
				"operation": "writes"
			},
			{
				"name": "collStreams-storageSize",
				"value": "streams_storage_size_collection",
				"metricType": "gauge",
				"stripeCategory": "diskStorage",
				"dashboardCategory": "streamStorage",
				"service": "streams"
			},
			{
				"name": "collStreams-reads",
				"value": "streams_out_bytes_total_collection",
				"metricType": "counter",
				"stripeCategory": "streamTransferIO",
				"dashboardCategory": "streamTransferIO",
				"service": "streams",
				"operation": "reads"
			},
			{
				"name": "collStreams-writes",
				"value": "streams_in_bytes_total_collection",
				"metricType": "counter",
				"stripeCategory": "streamTransferIO",
				"dashboardCategory": "streamTransferIO",
				"service": "streams",
				"operation": "writes"
			},
			{
				"name": "search-indexStorage",
				"value": "c8db_service_search_index_size",
				"metricType": "gauge",
				"stripeCategory": "indexStorage",
				"dashboardCategory": "memory",
				"service": "search"
			},
			{
				"name": "search-queryExecutionTime",
				"value": "c8db_service_search_query_execution_time",
				"metricType": "histogram",
				"stripeCategory": "queryExecutionTime",
				"dashboardCategory": "cpu",
				"service": "search"
			},
			{
				"name": "search-count",
				"value": "c8db_service_search_count",
				"metricType": "counter",
				"stripeCategory": "apiOperations",
				"dashboardCategory": "apis",
				"service": "search",
				"operation": "reads"
			},
			{
				"name": "graph-diskStorage",
				"value": "c8db_service_graph_disk_size",
				"metricType": "gauge",
				"stripeCategory": "diskStorage",
				"dashboardCategory": "storage",
				"service": "graph"
			},
			{
				"name": "graph-indexStorage",
				"value": "c8db_service_graph_index_size",
				"metricType": "gauge",
				"stripeCategory": "indexStorage",
				"dashboardCategory": "memory",
				"service": "graph"
			},
			{
				"name": "graph-queryExecutionTime",
				"value": "c8db_service_graph_query_execution_time",
				"metricType": "histogram",
				"stripeCategory": "queryExecutionTime",
				"dashboardCategory": "cpu",
				"service": "graph"
			},
			{
				"name": "cep-cpu",
				"value": "c8cep_app_cpu_tenant_total",
				"metricType": "counter",
				"stripeCategory": "cepCpu",
				"dashboardCategory": "cepCpu",
				"service": "cep"
			},
			{
				"name": "cep-memory",
				"value": "c8cep_app_memory_tenant_total",
				"metricType": "counter",
				"stripeCategory": "cepMemory",
				"dashboardCategory": "cepMemory",
				"service": "cep"
			}
		],
		"name": "PLAYGROUND",
		"pricing": "$0/month",
		"stripePricings": [
			{
				"category": "apiOperations",
				"displayName": "API operations",
				"description": "Priced per million database operations"
			},
			{
				"category": "indexStorage",
				"displayName": "Index storage",
				"description": "Priced per GB per hour (Quantity in bytes)"
			},
			{
				"category": "diskStorage",
				"displayName": "Disk storage",
				"description": "Priced per GB per month (Quantity in bytes)"
			},
			{
				"category": "queryExecutionTime",
				"displayName": "Query execution time",
				"description": "Priced per hour (Quantity in milliseconds)"
			},
			{
				"category": "streamTransferIO",
				"displayName": "Stream transfer I/O",
				"description": "Priced per GB (Quantity in bytes)"
			},
			{
				"category": "cepCpu",
				"displayName": "Stream Workers CPU Runtime",
				"description": "Priced per hour (Quantity in milliseconds)"
			},
			{
				"category": "cepMemory",
				"displayName": "Stream Workers Memory",
				"description": "Priced per GB per hour (Quantity in bytes)"
			}
		]
	}

_id: 
A unique and automatically generated value that combines the collection name and the _key value. This value is unique at the fabric level. 
_key: 
A unique and user-defined or automatically generated value. Auto-generated values are based on the defKeyGenerator collection in the _c8federation collection. This value is unique at the collection level. 
_planId:
A key-value attribute containing an integer value to identify an individual plan.
_rev: 
A unique and automatically generated value is used by the system to track revisions and resolve conflicts. This value is not generally used by the user.
_active:
A key-value attribute containing a boolean value to configure the active status of an individual plan.
attribution:
A key-value attribute containing a string value to set the attribution. Attributions are used to group individual plans logically.
avantGarde:
A key-value attribute containing a boolean value to enable/disable the account upgrade workflow.
demo:
A key-value attribute containing a boolean value to enable/disable the demo account on the tenant.
description:
A key-value pair containing a string value describing the individual plan. 
featureGates:
An array of strings listing the available feature gates on the tenant. The feature gates are individually configured from the `_tenants` system collection records.
isBundle:
A key-value pair containing a boolean value to configure the …
isUpgradable:
A key-value pair containing a boolean value to configure the …
label:
A key-value pair containing a string value to configure the display label of the plan. 
metadata:
A key-value attribute containing an integer value to set the order of the plan list.
metrics:
An array of JSON objects containing metadata about the individual plan metrics. Each object includes the following attributes: name, value, metricType, stripeCategory, dashboardCategory, service, and operation.
name:
A key-value attribute containing a string value describing name metadata for a plan.
pricing:
A key-value attribute containing a string value describing pricing metadata for a plan.
stripePricings:
An array of JSON objects containing metadata for 



