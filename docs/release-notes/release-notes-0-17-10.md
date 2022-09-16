---
title: Release Notes 0.17.10
sidebar_position: 99
---

This document describes what has changed in Macrometa release 0.17.10. All accounts will be updated by September 12, 2022. To check what version of GDN you are using, use the [Client Version](https://macrometa.com/docs/cli/client-version-cli.md) command in the CLI or the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## Features

The following features are included in this release.

### UI Updates

This release included a complete overhaul of the Macrometa UI. A few section names changed, but no overall functionality changed as a result of this new feature.

- Updated the overall look and feel of the web console UI.
- Changed order of items in the side menu.
- User icon, log in/out, and settings moved from the upper right to lower left corner.
- SEARCH changed to Search Views.
- QUERIES changed to Query Workers.
- Query Profile changed to Query Info in Query Results.
- **Download CSV** temporarily removed from Query Results. This feature will return when we have a better CSV solution.

Various screenshots and instructions were updated to reflect the new UI.

![Redesigned UI](/img/release-notes/17-10-new-ui.png)

### Billing Updates

This release includes an overhaul of the billing functionality, including:

- New invoice design.
- Redesigned billing tab with graphs and metrics to help you understand usage.
- Various performance improvements and back-end defect fixes related to billing.

If you have a paid Macrometa plan, then you can view the new billing screen in your account Overview tab.

![New billing tab](/img/release-notes/17-10-new-billing-tab.png)

### Update Name and Email on User Accounts

You can now update names and email addresses on user accounts. If you are a `root` user or have admin permissions, then you can update names and email addresses on user accounts that you administer.

### API Updates

This release includes the following API changes.

| Issue #  | Description  |
|---|---|
| API-178  | Add region URL to the API response.  |
| DB-1500  | Add new database limits: `maxWorkersCpuSecondsPerMinute` (default value is 20 seconds/minute of CPU time), `maxWorkersLogsLengthKBPerMinute` (default value is 10 KB/minute of logs length).  |
| DB-1588  | Removed one fabric parameter from Users API, because having two parameters was confusing. Now consistent with other APIs.  |
| DB-1592  | Make `GET /_api/collection/{collection-name}/figures` API public. This allows users to view metadata such as how many indexes and views a collection has, total collection size, and how many documents a collection has. |
| DB-1606  | Allow `*` in certain User APIs for collections and fabrics. APIs are: GET, DELETE, and PUT for `/_fabric/{fabric}/_api/user/{user}/database/{geofabric}` and GET, DELETE, and PUT for `/_fabric/{fabric}/_api/user/{user}/database/{geofabric}/collection/{collection}`. |

### New CLI Release

GDN CLI (`gdnsl`) version 0.0.45 is now available! If you use the Macrometa CLI, be sure to update as soon as possible.

For more information, refer to [Command Line Interface](../cli).

### Unique Index Option Change

Due to defect DB-1242, the unique index option has been temporarily turned off for new global collections. This option will be available when the longer-term solution is ready.

### Collection Truncation Messages

When you truncate a collection with streams enabled, you will now only see one message rather than multiple delete messages.

## Defect Fixes

The following defects were fixed in this release.

:::note
This last release cycle, our CEO challenged our engineers to try to "break" Macrometa as part of our internal quality and reliability improvement efforts. The results are below and will contribute to a more stable and reliable Global Data Network going forward.
:::

| Defect #  | Description  |
|---|---|
| API-183  | An exception made the user unable to connect on stream console for any stream.  |
| API-196  | Users are allowed to request removing datacenter even if GeoFabric has only two datacenters.  |
| API-210  | Payment and Invoice APIs are accessible by non-root user using JWT token.  |
| APIDOC-56  | API response is not showing properly.  |
| BILL-208  | Pricing page need update in Query RAM section.  |
| BILL-210  | Unable to update contact details with specific parameters. Error unless all parameters are updated.  |
| BILL-220  | /_api/billing/usage API should error out when tenant provided as null.  |
| BILL-226  | Improper response code for invalid parameter given to 'limit' of /_api/billing/payments. |
| BILL-227  | /_api/billing/payments - Improper response code when tenant name is not provided. |
| BILL-229  | Failing to upgrade when non-root user tried to upgrade account from free to metered tier. |
| DB-1156  | User must mention the field names in Search definition even if 'includeAllFields' is set to `true`.  |
| DB-1181  | C8Search: Analyzers can only be created for _system    |
| DB-1223  | Unusually long time for a response on truncate API call.  |
| DB-1242  | Insert query with overwrite: true fails for a collection that has multiple unique indexes.   |
| DB-1439  | The fabric created after taking the backup of a region (eu-west) did not get synced up after restore.  |
| DB-1442  | Due to _key collision, failed to insert document in collection.  |
| DB-1444  | Data discrepancy in two regions when documents were created with the same key but different content.  |
| DB-1446  | Allow query batch size to take values above 1,000.  |
| DB-1457  | Bypassed GeoFabric per-tenant limit on free tier account. Correct limit is two.  |
| DB-1463  | Able to have inconsistent documents on two different regions with same key in the same collection.  |
| DB-1470  | Error trying to truncate records for a collection stream.  |
| DB-1493  | Connection not established error on a stream console.  |
| DB-1519  | "Unauthorized" error is seen after navigating to regions.  |
| DB-1552  | When creating a user, password constraints are not validated in API.  |
| DB-1580  | Cannot create more than 100 KV collections.  |
| DB-1595  | Non-root user with read-only fabric permissions can set and clear streams access level.  |
| DB-1615  | Validate API continues to validate JWT token even when user has been deleted.  |
| MET-52  | Some metrics were not reinitialized when deleting collections.  |
| MET-68  | All graphs delete call are not taken into account by MetricsCollector if graph does not exist.  |
| MET-90  | Dynamo Read metrics not taken into account for the count metric.  |
| MET-149  | Get metrics names returns result as a string instead of JSON (list).  |
| MET-208  | If an HTTP endpoint is invoked by Chrome browser, all immediate HTTP requests get delayed.  |
