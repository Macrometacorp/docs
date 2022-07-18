---
title: Release Notes 0.17.10
sidebar_position: 99
---

This document describes what has changed in Macrometa release 0.17.10. All accounts will be updated by August 18, 2022. To check what version of GDN you are using, use the [Client Version](https://macrometa.com/docs/essentials/CLI/commands#client-version-gdnsl) command in the CLI or the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## Features

The following features are included in this release.

### UI Updates

This release included a complete overhaul of the Macrometa UI. A few section names changed, but no overall functionality changed as a result of this new feature.

- Overall update to look and feel of console UI.
- Changed order of items in the side menu.
- User icon and log in/out and settings moved from upper right to lower left corner.
- Search changed to Search Views.
- Queries changed to Query Workers.

Various screenshots and instructions were updated to reflect the new UI.

JAMES - Need link to new dashboard topic.

### Update Name and Email on User Accounts

You can now update names and email addresses on user accounts. If you are a `root` user or have admin permissions, then you can update names and email addresses on user accounts that you administer.

[Topic name](link) was added as a result of this feature.

### Billing Updates

Description of update.
- New invoice
- Redesigned billing tab
- Various performance improvements.
- Fixed a bunch of billing-related defects on the backend.

Epic - Updates to Billing and Invoices

[Topic name](link) and [topic name](link) were updated as a result of this change.

### API Updates

| DB-1588  | Removed one fabric parameter from Users API.  |
DB-1606	Allow * in all below user apis for collections and fabrics
API-178	Add region URL to the API Response

DFP Note - This list is incomplete. Need to find what else might have changed.

## Known Issues

The following known issues were introduced in this release.

### Problem

Explain the problem and the workaround.

## Defect Fixes

The following defects were fixed in this release.

:::note
This last release cycle, our CEO challenged our engineers to try to "break" Macrometa as part of our internal quality and reliability improvement efforts. As a result, we found a lot of (occasionally weird) bugs, and then fixed them. The results are below and will contribute to a more stable and reliable Global Data Network going forward.
:::

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
| DB-1156  | User must mention the field names in Search definition even if 'includeAllFields' is set to `true`.  |
| DB-1223  | Unusually long time for a response on truncate API call.  |
| DB-1287  | Unauthorized read access to protected collections gained via API key.  |
| DB-1413  | Failed sync puts the region in unusable state. |
| DB-1433  | [Search View] Search logs do not honour c8db `--log.level` parameter.  |
| DB-1439  | The fabric created after taking the backup of a region (eu-west) did not get synced up after restore.  |
| DB-1442  | Due to _key collision, failed to insert document in collection.  |
| DB-1444  | Data discrepancy in two regions when documents were created with the same key but different content.  |
| DB-1446  | Allow query batch size to take values above 1,000.  |
| DB-1453  | [Add Datacenter] sync views operation is not triggered if collections sync fails for any collection.  |
| DB-1456  | Delete region from federation removes random regions.  |
| DB-1457  | Bypassed GeoFabric per-tenant limit on free tier account. Correct limit is two.  |
| DB-1463  | Able to have inconsistent documents on two different regions with same key in the same collection.  |
| DB-1470  | Error trying to truncate records for a collection stream.  |
| DB-1471  | Admin user cannot retrieve permissions for another tenant.  |
| DB-1493  | Getting connection not established error on a stream console.  |
| DB-1498  | GET _api/features/tenant/{tenant} returns HTTP 401 when called with Admin user API key.  |
| DB-1519  | "Unauthorized" error is seen after navigation to regions.  |
| DB-1527  | API reference for creating collections contains parameters that users should not be able to access.  |
| DB-1552  | When creating a user, password constrains are not validated in API.  |
| DB-1577  | [Backup & Restore] Catch-up does not sync regions correctly.  |
| DB-1580  | Cannot create more than 100 KV collections.  |
| DB-1585  | Database is crashing when wrong parameter is passed in user patch API call.  |
| DB-1595  | Non-root user with read-only fabric permissions can set and clear streams access level.  |
| DB-1615  | Validate API continues to validate JWT token even when user has been deleted.  |
| MET-52  | Some metrics were not reinitialized when collections were deleted.  |
| MET-68  | All graphs delete call are not taken into account by MetricsCollector if graph does not exist.  |
| MET-90  | Dynamo Read metrics not taken into account for the count metric.  |
| MET-136  | Remove "search-diskStorage" metrics from metrics-collector filter.  |
| MET-148  | oxedgeuat metric-collector pod crashing after the patch update 0.17.7.  |
| MET-149  | Get metrics names returns result as a string instead of JSON (list).  |
| MET-150  | gdn-eu-central metrics are failing.  |
| MET-153  | Metricscollector crash with segfault on gdn-eu-central.  |
| MET-154  | Replace boost::beast with curl in getToken.  |
| MET-156  | Replace boost::beast with curl in KubernetesCaller::call.  |
| MET-162  | Metrics not get updated on nightly run.  |
| MET-163  | Metric API fails because of low memory.  |
| MET-173  | MetricsCollector /query endpoint became slower with time.  |
| MET-202  | MetricsCollector does not provide up-to-date c8db metrics.  |
| MET-208  | If an HTTP endpoint is invoked by chrome browser all immediate http requests get delayed.  |
| MET-216  | Metrics endpoint does not export large values with correct precision.  |
| MET-218  | API Administration - metrics query: invalid JSON. |
