---
title: Release Notes 0.18.0
sidebar_position: 93
---

This document describes what has changed in Macrometa release 0.18.0. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### Strong Consistency

You can now create collections with strong consistency guarantees and send requests with strong consistency guarantees to those collections.

[Strong Consistency](../collections/strong-consistency.md) was added as a result of this feature.

The following topics were updated as a result of this feature:

- [View Collection Settings](../collections/view-collection-settings.md)
- [Create a Document Collection](../collections/documents/create-document-store.md)
- [Create a Key-Value Collection](../collections/keyvalue/create-key-value-store.md)
- [Create a Graph Edge Collection](../graphs/graph-tasks/create-graph-edge-collection.md)

### Web Console Updates

Description of feature.

Changes include:

- Document Store collections are now called Document collections.
- Key-Value Store collections are now called Key-Value collections.
- New data fields in collection Data tab screens.
  ![New Collection Data Fields](/img/release-notes/18-00-collection-data-fields.png)
- New data fields in collection Indexes tab screens.
  ![New Collection Indexes Fields](/img/release-notes/18-00-collection-indexes-fields.png)
- New data fields in collection Streams tab screens
  ![New Collection Streams Fields](/img/release-notes/18-00-collection-stream-fields.png)
- In Document, Graph Edge, and Redis Mode collections, a button was added that allows you to refresh documents in the page.
  ![New Refresh Documents Button](/img/release-notes/18-00-refresh-button.png)
- New data fields in Streams screens.
  ![New Streams Fields](/img/release-notes/18-00-streams-fields.png)
- New fields in the New Graph Edge window.
- Example Graphs are now Sample Datasets and have been updated.
- In Graphs, some fields changed. Also, Example Graphs are now called Sample Datasets.
- The Functions tab is no longer displayed in the sidebar if no EdgeWorker functions have been created.
- Minor changes to field names in various screens.

Multiple pages and screenshots were updated as a result of these changes.

### Added Global API Endpoint to Fabrics Tab

The Global API Endpoint for each fabric is now displayed in the Fabrics tab.

![Global API Endpoint](/img/release-notes/18-00-global-api-endpoint.png)

[APIs](../api-docs/) was updated as a result of this change.

### In-app Support Chat Widget

You can now chat directly with Macrometa Support in the web console. Click the icon in the lower right of all pages to begin.

![Chat with Support](/img/release-notes/18-00-support-chat.png)

### New Connection - S3 Target

A new target connector for AWS S3 is now available to use with Macrometa.

[S3 Connector](../connections/connector-types/s3-connector) was added as a result of this feature.

### New memcache Function for Stream Workers

This release includes the memcache function, which is a memory cache with a time-to-live (ttl) parameter.

[Memcache](../cep/query-guide/functions/memcache/) was added a result of this feature.

## Feature Updates

The following features updates are included in this release.

### New Group ID API Endpoints

Two new API endpoints have been added to allow you to more efficiently manage key-value group IDs:

- List all the groups in a collection with the Group ID feature enabled: `GET /_fabric/{fabric}/_api/kv/{collection}/groups`
- Update the group ID for all the documents belonging to a particular group ID in a collection with the Group ID feature enabled: `PUT /_fabric/{fabric}/_api/kv/{collection}/groupID`

[Manage Group IDs](../collections/keyvalue/manage-group-ids.md) was added as a result of this change.

### Transactions API

https://github.com/Macrometacorp/c8apidocs/pull/174

DFP Note - What do we need for Transactions documentation?


### Enhanced Error Handling for Stream Workers

- Introduced `OnError.action='stream'` Configuration: Stream worker definitions now support an improved error handling configuration. By setting `OnError.action='stream'` for streams, sources, sinks, and stores, you can automatically redirect errors to a fault stream, denoted as `!<StreamName>`.
- When `OnError.action='stream'` is applied, the system automatically creates a fault stream that includes all attributes of the original stream, along with an additional `_error` attribute to store error details.
- The new fault stream mechanism captures and handles errors from various stream elements including processes, functions, and executors.
- Error handling now applies to tables as well.

Topics in [Stream Worker Error Handling](../cep/error-handling/) were updated as a result of this change.

### Stream Workers Support All Collection Types

Stream workers now support Key-Value, Redis, and Dynamo collections.

[Tables (Collections)](../cep/table/) was updated as a result of this change.

### Miscellaneous Changes

The following minor changes were added in this release.

| Change # | Description |
| -------- | ----------- |
| CEP-617   | The internal rebalancing of the stream workers among the nodes was changed. All instances of a given stream worker were run only on one node before, and now are subject of evenly distribution on all available node.            |
| GUI-1819  | The link to the Functions page no longer appears in the side menu unless the user has created an EdgeWorker.            |

### API Updates

This release includes the following API changes.

| Issue # | Description |
| ------- | ----------- |
| CON-1299 | In the API Reference, "integrations" were changed to "connections."          |
| MET-330  | Response for `/_fabric/{fabric}/_api/metrics/query` now includes labels of fetched metrics.          |

## Defect Fixes

The following defects were fixed in this release.

| Defect #  | Description  |
|---|---|
| AUTH-236  | Corrected field order and capitalization on the Invite User signup page.  |
|   |   |
|   |   |
| CEP-437  | Regex for http.status.code in http-call-response function is not working.  |
| CEP-439  | Delete subscriptions only at stream worker deletion, not unpublish.  |
| CEP-614  | Republishing stream workers is not working.  |
| CEP-615  | Sometimes after unpublishing a stream worker, it gets re-published automatically.  |
| CEP-620  | The sample stream worker HTTP-IO will not validate.  |
| DB-1643  | User can create an API key with a numeric value as the key ID.  |
|   |   |
|   |   |
|   |   |
| GUI-1331  | CSV option is not available for import and export button for Document or Graph Edge collections.  |
|   |   |
| GUI-1886  | "Forbidden error" notification when non-root user changes their Display Name.  |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
| DB-1484  | Objects are not created with field name as: _key,_id, and _rev.  |
|   |   |
| DB-2410  | Create API key should give error when 256 characters are given for a value as an API key ID.  |
|   |   |
|   |   |
| GUI-1799  | Complete name and email of logged in tenant not shown  |
| GUI-1804  | The Generate EdgeWorker window closes if you double-click any text field.  |
| GUI-1823  | Fixed dashboard typo in CPU Usage Global Metrics; graph showed value in seconds instead of ms.  |
|   |   |
|   |   |
|   |   |
| STRM-254  | Deleting a global stream returns a 500 internal server error.  |
| STRM-371  | Users can successfully call APIs for disabled features.  |
|   |   |
|   |   |