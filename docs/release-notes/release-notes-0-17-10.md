---
title: Release Notes 0.17.10
sidebar_position: 99
---

This document describes what has changed in Macrometa release 0.17.10. All accounts will be updated by August 18, 2022. To check what version of GDN you are using, use the [Client Version](https://macrometa.com/docs/essentials/CLI/commands#client-version-gdnsl) command in the CLI or the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## Features

The following features are included in this release.

### SOC 2 - Can now update name and email

Description of feature.

Do we want to tell users about SOC 2 compliance?
Are there other UI changes?

[Topic name](link) was added as a result of this feature.

### Billing Updates

Description of update.
- New invoice
- Redesigned billing tab
- Fixed a bunch of billing-related defects on the backend.


[Topic name](link) and [topic name](link) were updated as a result of this change.

## Known Issues

The following known issues were introduced in this release.

### Problem

Explain the problem and the workaround.

## Defect Fixes

The following defects were fixed in this release.

| Defect #  | Description  |
|---|---|
| API-183  | An exception made the user unable to connect on stream console for any stream.  |
| API-196  | Users are allowed to request removing datacenter even if GeoFabric has only two datacenters.  |
| API-210  | Payment and Invoice APIs are accessible by non-root user using JWT token.  |
| APIDOC-56  | API response is not showing properly.  |
| BILL-204  | If usageDaily job is missed, then next day's job need to consider all data instead of 24 records for usageDaily calculation.  |
| BILL-208  | Pricing page need update in Query RAM section.  |
| BILL-210  | Unable to update contact details with specific parameters. Error unless all parameters are updated.  |
| BILL-213  | Usage API should show invalid tenant error for deleted, invalid, or non-existing tenant.  |
| BILL-220  | /_api/billing/usage API should error out when tenant provided as null.  |
| BILL-223  | Stripe 409/404/403/402/401/400 error code we return as a 500 in c8billing API.  |
| BILL-224  | Clarified states the Stripe account must have when subscription is created.  |
| BILL-226  | Improper response code for invalid parameter given to 'limit' of /_api/billing/payments. |
| BILL-227  | /_api/billing/payments - Improper response code when tenant name is not provided. |
| BILL-229  | Failing to upgrade when non-root user tried to upgrade account from free to metered tier. |
| BILL-246  | Cannot modify plan with single attribute.  |
| BILL-247  | Label parameter should allow space in creating or modifying plan.  |
| BILL-264  | Wrong metrics type configuration in plans.  |
| BILL-267  | Add graph-indexStorage to INDEX_STORAGE usage calculation.  |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
	
	
	
DB-1156	c8db-> It is mandatory to mention the field names in Search definition even if 'includeAllFields' is specified as true
DB-1223	Long time for a response on truncate API call
DB-1287	Unauthorized read access to protected collections gained via apikey
DB-1330	Tenant creation issue on multiple regions
DB-1336	Fix log level
DB-1367	C8db pod getting OOM on gdn-pass ap-west2 and ap-south2
DB-1413	[PQRS]  Failed sync puts the region in unusable state
DB-1433	[Search View] Search logs do not honour c8db --log.level parameter
DB-1435	Tenant creation not working for more than 1 region
DB-1437	Ensure limits don't break consistency between regions
DB-1439	[PQRS] [Backup&Restore] The fabric created after taking the backup of a region (eu-west) did not get synced up after restore
DB-1442	Due to _key collision, failed to insert document in collection 
DB-1443	C8DB restarts with OOMKilled on `smoke1-eu-west` London region
DB-1444	[Bharat] Data discrepancy in 2 regions
DB-1446	Allow query batch size to take values above 1000
DB-1450	Replication broken at the end of region sync on bharath.paas.macrometa.io
DB-1453	[PQRS] [Add Datacenter] sync views operation is not triggered  if collections sync fails for any collection 
DB-1456	Delete region from federation removes random regions
DB-1457	Bypassing Geo Fabric per tenant limit on free tier account
DB-1463	Able to have inconsistent documents on 2 different regions with same key in the same collection
DB-1470	Getting error on trying to truncate records for a collection stream
DB-1471	Admin user cannot retrieve permissions for another tenant
DB-1493	Getting connection not established error on a stream console
DB-1495	Tenant creation failed with error "c8db query execution failed"
DB-1498	GET _api/features/tenant/{tenant} return HTTP 401 when called with apikey of Admin user
DB-1504	Getting alerts for deleted tenants  
DB-1510	Investigate configuration of AUTOMATION6695, tentest121817390019zkbrw_macrometa.io tenants on GDN PAAS
DB-1519	"Unauthorized" error is seen after navigation to regions
DB-1524	Remove the log message tenant::getDetails from C8DB
DB-1527	API Reference for creating collections contains parameters that users should not be able to access
DB-1552	Password constrains are not validated in API, while creating a user
DB-1577	[Backup&Restore] Catchup does not sync regions correctly
DB-1580	Cannot create more than 100 KV collections
DB-1585	Db is crashing when wrong parameter is passed in user patch api call
DB-1588	Get rid of one fabric parameter from Users API
DB-1595	Non root user with ro fabric permissions can set and clear streams access level
DB-1604	Tenants deleted when Broker is unavailable will never get deleted from c8streams
DB-1606	Allow * in all below user apis for collections and fabrics
DB-1613	c8db is crashing after redeployment
DB-1615	Validate API continues to validate JWT token even when user has been deleted
MET-136	[metricscollector] Remove "search-diskStorage" metrics from metrics-collector filter
MET-148	coxedgeuat metric-collector pod crashing after the patch update 0.17.7
MET-149	API [ADMINISTRATION] Get metrics names error in response
MET-150	gdn-eu-central metrics are failing
MET-153	Metricscollector crash with segfault on gdn-eu-centra.
MET-154	Replace boost::beast with curl in getToken.
MET-156	Replace boost::beast with curl in KubernetesCaller::call.
MET-162	Metrics not get updated on nightly run
MET-163	Metric API fails because of low memory 
MET-173	Metricscollector /query endpoint became slower with time
MET-190	MetricsCollector log contains large number of warning logs about a parsing error.
MET-191	Fix rocksdb metrics names format.
MET-199	Reduce the number of # TYPE lines in prometheus exporter
MET-202	MetricsCollector does not provide up-to-date c8db metrics
MET-208	If an http endpoint is invoked by chrome browser all immediate http requests get delayed.
MET-216	metrics endpoint does not export large values with correct precision
MET-218	API Administration - metrics query: invalid json
MET-52	Metrics: indexStorage metric is not reinitialized when collections are deleted
MET-68	MetricsCollector: All graphs delete call are not taken into account by MC if graph does not exist
MET-90	Dynamo Read metrics not taken into account