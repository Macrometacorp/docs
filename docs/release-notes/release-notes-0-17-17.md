---
title: Release Notes 0.17.17
sidebar_position: 94
---

This document describes what has changed in Macrometa release 0.17.17. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### Feature 1

Description of feature.

[Topic name](link) was added as a result of this feature.

### Feature 1

Description of feature.

[Topic name](link) was added as a result of this feature.

### Feature 1

Description of feature.

[Topic name](link) was added as a result of this feature.

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

### Streams Stats API Update

The stream stats API endpoint `/_fabric/{fabric}/_api/streams/{stream}/stats` now includes two new optional parameters:

- `getPreciseBacklog`: When true, returns precise backlog.
- `subscriptionBacklogSize`: When true, returns backlog size for each subscription.

### Update 1

Description of update.

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Update 1

Description of update.

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Update 1

Description of update.

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Miscellaneous Changes

The following minor changes were added in this release.

| Change # | Description |
| -------- | ----------- |
| DB-1883  | If an internal network issue causes replication to fail for a server, then server users will have only read-only access to its global collections once the replication backlog is filled to prevent new messages overwriting older ones. This change helps prevent data loss and inconsistency.       |
|          |             |
|          |             |
|          |             |
|          |             |

### API Updates

This release includes the following API changes.

| Issue # | Description |
| ------- | ----------- |
| z       | z           |
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
| CEP-551 | Stream workers are not handling the error returned by DB when publish queue is full, causing data loss. |
| CEP-565 | Latin extended letters are changed into garbage characters by streams and then stream workers. |
| CEP-566 | Data loss is observed if the database restarts while the stream worker is consuming data from an external Pulsar stream and writing it to a Macrometa collection. |  
| CEP-572 | Stream workers with fields that start with an integer or with special chars other than `_` throw exceptions. |
| CEP-576 | Transformation workflow sometimes does not work. |
| CEP-578 | Intermittently observed stream worker not consuming messages when the stream worker count was high. |
| CEP-579 | Stream workers cannot handle stream workers an in infinite loop. |
| CEP-581 | Errors while executing ad hoc queries. |  
| CEP-586 | The `geo:stationary` stream processor in fails in some cases. |
| DB-1465 | Can get a collection out of sync by repeatedly deleting and re-creating documents. |
| DB-2513 | Cannot delete a fabric using an API key. |
| DB-2579 | 404 database not found error when trying to change permissions for an API key. |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |