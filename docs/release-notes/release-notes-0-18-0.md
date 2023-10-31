---
title: Release Notes 0.18.0
sidebar_position: 93
---

This document describes what has changed in Macrometa release 0.18.0. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### Web Console Updates

Description of feature.

Changes include:

- Document Store collections are now called Document collections.
- Key-Value Store collections are now called Key-Value collections.
- New data fields in collection screens that show number of documents and data storage.

Multiple pages and screenshots were updated as a result of these changes.

### Strong Consistency

Description of feature.

TO DO - 

Explain strong consistency
Update and link to View collection settings, update screenshot

[Topic name](index.md) was added as a result of this feature.

[View Collection Settings](../collections/view-collection-settings.md) was updated as a result of this feature.

### In-app Support Chat

You can now chat directly with Macrometa Support in the web console. Just click the icon in the lower right of all pages to begin.

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
| x        | x           |
|          |             |
|          |             |

### API Updates

This release includes the following API changes.

| Issue # | Description |
| ------- | ----------- |
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
| DB-2410  | Create API key should give error when 256 characters are given for a value as an API key ID.  |
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