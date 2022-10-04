---
title: Release Notes 0.17.11
sidebar_position: 98
---

This document describes what has changed in Macrometa release 0.17.11. All accounts will be updated by Month XX, YYYY.  To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### SQL Support

Description of feature.

[Topic name](link) was added as a result of this feature.

### Redis Support

Description of feature.

[Topic name](link) was added as a result of this feature.

### Kafka Support

Description of feature.

[Topic name](link) was added as a result of this feature.

### Feature 1

Description of feature.

[Topic name](link) was added as a result of this feature.

## Feature Updates

The following features updates are included in this release.

### Invite User

Description of update.

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Auth Improvements

- We redesigned Macrometa authorization to make our service more efficient and stable.
- The account signup and login screens have been updated and improved.

### API Updates

This release includes the following API changes.

| Issue #  | Description  |
|---|---|`
| APIDOC-51  | Added stream worker parameters `maxLogsLengthKBPerMinutePerWorker` and `maxCpuSecondsPerMinutePerWorker`. |
|   |  |
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

## Known Issues

The following known issues were introduced in this release.

### Problem

Explain the problem and the workaround.

## Defect Fixes

The following defects were fixed in this release.

Is this user-facing? Should it be included in the end user release notes?

| Defect #  | Description  |
|---|---|
| APIDOC-54  | In API reference docx, corrected a typo in insertDocument description.  |
|   |   |
|   |   |
|   |   |
| DB-1668  | Improved error text in duplicate node error for graphs to be more user-friendly.  |
| DB-1801  | API `/_api/key/validate` returns HTTP code 200 with message 'non-representable type' when no request body is sent.  |
| DB-1831  | Graph with a vertex collection not loading normally. It only loads when you click on Full Graph option.  |
|   |   |
|   |   |
|   |   |
|   |   |
| GUI-236  | Newly-created key-value collection does not replicate in other geo locations.  |
| GUI-239  | Could not update existing users in an account.  |
| GUI-241  | Search functionality does not work on Accounts page.  |
| GUI-249  | KV Pair Edit form does not show the date and time values correctly.  |
|   |   |
|   |   |
| GUI-395  | New index for a collection does not appear in the UI.  |
|   |   |
| GUI-525  | Import Documents button is improperly aligned.  |
| GUI-536  | When a non-root user opens the permission configuration tab for an API key, the Read-only option is in a disabled state. The same option is enabled for collections.  |
| GUI-666  | The user is redirected to the login page after they change the fabric.  |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |