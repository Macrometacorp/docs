---
title: Release Notes 0.17.17
sidebar_position: 94
---

This document describes what has changed in Macrometa release 0.17.17. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### Semantic Search

You can now create semantic search views.

- In Search Views, you now have the option to create a Semantic Search View or a Fulltext Search View.
- Improved Fulltext Search user interface.

[Semantic Search](../search-views/semantic-search/) was added as a result of this feature and the [Search Views](../search-views/) section was edited and reorganized.

### Client Connectors - Beta

Macrometa now offers connectors that are installed on the client side. Like the connectors integrated with Macrometa GDN, these connectors allow you to connect Macrometa to external data sources as either a source or a target.

### New Connectors - DFP NOTE - Need to update links!

The following connectors are included in this release:

- [Oracle Target](../connections/connector-types/oracledb-connector)
- MSSQL Source and Target

MSSQL Connector was added and [OracleDB Connector](../connections/connector-types/oracledb-connector) was updated as a result of this change.

## Feature Updates

The following features updates are included in this release.

### Unique Windows Renamed

The window functions in the `unique` namespace have been renamed as follows:

| Old Name                       | New Name                          |
|------------------------------- |----------------------------------|
| WINDOW UNIQUE:ever()           | WINDOW UNIQUE:EVER()                     |
| WINDOW UNIQUE:externalTimeBatch() | WINDOW UNIQUE:TUMBLING_EXTERNAL_TIME() |
| WINDOW UNIQUE:first()          | WINDOW UNIQUE:FIRST()                    |
| WINDOW UNIQUE:firstLengthBatch() | WINDOW UNIQUE:TUMBLING_FIRST()          |
| WINDOW UNIQUE:firstTimeBatch() | WINDOW UNIQUE:TUMBLING_FIRST_TIME()      |
| WINDOW UNIQUE:length()         | WINDOW UNIQUE:SLIDING_LENGTH()           |
| WINDOW UNIQUE:lengthBatch()    | WINDOW UNIQUE:TUMBLING_LENGTH()          |
| WINDOW UNIQUE:time()           | WINDOW UNIQUE:SLIDING_TIME()             |
| WINDOW UNIQUE:timeBatch()      | WINDOW UNIQUE:TUMBLING_TIME()            |
| WINDOW UNIQUE:timeLengthBatch() | WINDOW UNIQUE:TUMBLING_TIME_LENGTH()    |

:::note
To maintain compatibility, the old window names will remain valid.
:::

Pages in [Window Types](../cep/windows/window-types/) were updated as a result of this change.

### Query Worker Permissions

In previous versions of Macrometa, only the user that created the query worker could directly view and edit that query worker. When a user was deleted, all query workers they created were deleted as well.

The 17.17 release allows all users with the appropriate access level to see and interact with query workers. Query workers are no longer deleted when the user account that created them are deleted.

The user and API key permissions in the web console have been updated to allow you to assign query worker access levels.

![New Query Worker Permissions](/img/release-notes/17-17-edit-user.png)

New API endpoints were added in the API Keys and Users sections as well.

#### New API Key Endpoints

![New API Key API Endpoints](/img/release-notes/17-17-api-key-api.png)

#### New Users Endpoints

![New Users API Endpoints](/img/release-notes/17-17-users-api.png)

### Streams Stats API Update

The stream stats API endpoint `/_fabric/{fabric}/_api/streams/{stream}/stats` now includes two new optional parameters:

- `getPreciseBacklog`: When true, returns precise backlog.
- `subscriptionBacklogSize`: When true, returns backlog size for each subscription.

### KV Group ID Field Added

Description of update.


### Miscellaneous Changes

The following minor changes were added in this release.

| Change # | Description |
| -------- | ----------- |
| DB-1883  | If an internal network issue causes replication to fail for a server, then server users will have only read-only access to its global collections once the replication backlog is filled to prevent new messages overwriting older ones. This change helps prevent data loss and inconsistency.       |

### API Updates

This release includes the following API changes.

| Issue # | Description |
| ------- | ----------- |
| CEP-591 | The `regions` parameter in the [Create and Deploy Stream Workers](https://www.macrometa.com/docs/api#/operations/create) API endpoint now accepts `*` as a value. You no longer need to list all regions individually.        |

## Defect Fixes

The following defects were fixed in this release.

| Defect #  | Description  |
|---|---|
| CEP-551 | Stream workers are not handling the error returned by DB when publish queue is full, causing data loss. |
| CEP-565 | Latin extended letters are changed into garbage characters by streams and then stream workers. |
| CEP-566 | Data loss is observed if the database restarts while the stream worker is consuming data from an external Pulsar stream and writing it to a Macrometa collection. |  
| CEP-572 | Stream workers with fields that start with an integer or with special chars other than `_` throw exceptions. |
| CEP-576 | Transformation workflow sometimes does not work. |
| CEP-578 | Intermittently observed stream worker not consuming messages when the stream worker count was high. |
| CEP-579 | Stream workers cannot handle stream workers an in infinite loop. |
| CEP-581 | Errors while executing ad hoc queries. |  
| CEP-586 | The `geo:stationary` stream processor in fails in some cases. |
| CEP-592 | Getting cast exception in geospatial functions.  |
| CON-1327  | Source Preview and Transformation Preview are not maintaining the case of attribute names, they are all returned as lowercase.  |
| DB-1465, DB-2364 | Data inconsistency observed when in crud scenarios for regions that lose connectivity for some time. |
| DB-2513 | Cannot delete a fabric using an API key. |
| DB-2579 | 404 database not found error when trying to change permissions for an API key. |
