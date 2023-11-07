---
title: Release Notes 0.18.0
sidebar_position: 93
---

This document describes what has changed in Macrometa release 0.18.0. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### Strong Consistency

Description of feature.

TO DO - 
Explain strong consistency, new topic
- strong consistency option on collections
- strong consistency option on queries (?)
Update and link to View collection settings, update screenshot
How to make a collection strongly consistent
How to make a query strongly consistent.

[Topic name](index.md) was added as a result of this feature.

[View Collection Settings](../collections/view-collection-settings.md) was updated as a result of this feature.

### Web Console Updates

Description of feature.

Changes include:

- Document Store collections are now called Document collections. - DONE
- Key-Value Store collections are now called Key-Value collections.
- New data fields in collection Data tab screens.
  ![New Collection Data Fields](/img/release-notes/18-00-collection-data-fields.png)
- New data fields in collection Indexes tab screens.
  ![New Collection Indexes Fields](/img/release-notes/18-00-collection-indexes-fields.png)
- New data fields in collection Streams tab screens
- New data fields in Streams
- In Graphs, some fields changed. Also, Example Graphs are now called Sample Datasets.
  - DFP note - There are now four, not six. Update those docs.

Multiple pages and screenshots were updated as a result of these changes.

### In-app Support Chat Widget

You can now chat directly with Macrometa Support in the web console. Click the icon in the lower right of all pages to begin.

![Chat with Support](/img/release-notes/18-00-support-chat.png)

## Feature Updates

The following features updates are included in this release.

### New API Endpoint - List Groups

A new API endpoint is available that lists all the groups in a collection with the Group ID feature enabled: `GET /_fabric/{fabric}/_api/kv/{collection}/groups`

**DFP NOTE - Update KV docs? DB-2755**

### New API Endpoint - Update Group ID

A new API endpoint is available that updates the group ID for all the documents belonging to a particular group ID in a collection with the Group ID feature enabled.

**DFP NOTE - Update KV docs? DB-2811**

### Transactions API

https://github.com/Macrometacorp/c8apidocs/pull/174

DFP Note - What do we need for Transactions documentation?

### Added Global API Endpoint to Fabrics Tab

The Global API Endpoint for each fabric is now displayed in the Fabrics tab.

![Global API Endpoint](/img/release-notes/18-00-global-api-endpoint.png)

[APIs](../api-docs/) was updated as a result of this change.

### New Stream Worker Metadata Instances Parameter

In some cases, you might need to distribute instances of the same stream worker across multiple nodes to have more scalability.

This release extends `@App:instances()` metadata with a second optional parameter `distributed  = true/false`. If `true`, then the instances are run on multiple nodes. If `false`, then they all run on the same node.

[Metadata](../cep/metadata) was updated as a result of this change.

### Update 1

Description of update.

[Topic name](index.md) and [topic name](index.md) were updated as a result of this change.

### Update 1

Description of update.

[Topic name](index.md) and [topic name](index.md) were updated as a result of this change.

### Miscellaneous Changes

The following minor changes were added in this release.

| Change # | Description |
| -------- | ----------- |

|          |             |
|          |             |

### API Updates

This release includes the following API changes.

| Issue # | Description |
| ------- | ----------- |
| CON-1299 | In the API Reference, "integrations" were changed to "connections."          |
| MET-330       | Response for `/_fabric/{fabric}/_api/metrics/query` now includes labels of fetched metrics.          |
|         |             |
|         |             |

## Known Issues

The following known issues were introduced in this release.

### Problem

Explain the problem and the workaround.

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
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
| DB-2410  | Create API key should give error when 256 characters are given for a value as an API key ID.  |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
| STRM-254  | Deleting a global stream returns a 500 internal server error.  |
|   |   |
|   |   |
|   |   |