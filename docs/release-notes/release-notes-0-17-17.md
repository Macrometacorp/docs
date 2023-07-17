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

### Unique Windows Renamed - NEED TO UPDATE CONTENT, How do I differentiate duplicate names?

The window functions in the `unique` namespace have been renamed as follows:

| Old Name                       | New Name                          |
|------------------------------- |----------------------------------|
| WINDOW UNIQUE:ever()           | WINDOW EVER()                     |
| WINDOW UNIQUE:externalTimeBatch() | WINDOW TUMBLING_EXTERNAL_TIME() |
| WINDOW UNIQUE:first()          | WINDOW FIRST()                    |
| WINDOW UNIQUE:firstLengthBatch() | WINDOW TUMBLING_FIRST()          |
| WINDOW UNIQUE:firstTimeBatch() | WINDOW TUMBLING_FIRST_TIME()      |
| WINDOW UNIQUE:length()         | WINDOW SLIDING_LENGTH()           |
| WINDOW UNIQUE:lengthBatch()    | WINDOW TUMBLING_LENGTH()          |
| WINDOW UNIQUE:time()           | WINDOW SLIDING_TIME()             |
| WINDOW UNIQUE:timeBatch()      | WINDOW TUMBLING_TIME()            |
| WINDOW UNIQUE:timeLengthBatch() | WINDOW TUMBLING_TIME_LENGTH()    |

Topics in [Window Types](../cep/windows/window-types/) were updated as a result of this change.

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
| x        | x           |
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
| CEP-586  | The `geo:stationary` stream processor in fails in some cases.  |
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