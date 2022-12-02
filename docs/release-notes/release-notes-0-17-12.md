---
title: Release Notes 0.17.12
sidebar_position: 97
---

This document describes what has changed in Macrometa release 0.17.12. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### New Onboarding

The first time you log in to Macrometa, the system now displays a welcome page with links to useful resources for new users.

### Scale Tier Self-Managed Upgrade

You can now upgrade and manage your scale tier payment plan in the Account page in the Macrometa web console.

[Topic name](link) and [topic name](link) were updated as a result of this change.

## Feature Updates

The following features updates are included in this release.

### SQL Support Updates - Beta

- You can now enter SQL queries in the Macrometa query editor and save them as query workers.
- Other SQL functionality improvements.

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Redis Support Updates - Beta

Python SDK

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Akamai EdgeWorker Support Updates - Preview

- Delete functionality improved (Dino to add detail here)
- Can now invoke EdgeWorkers with stream workers. In Samples, sample-function-worker added.
- Macrometa SDK support

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Updated Side Menu

The side menu in the web console has been updated and organized.

![Updated Side Menu](/img/release-notes/17-12-side-menu.gif)

Screenshots and instructions were updated as a result of this change.

### Macrometa Stops Unpublished Stream Workers (CEP-432)

A new backend service forcefully stops stream workers that are unpublished by a user but continue to run for any reason.

### Streams Process Messages with _delete Fields in Database Extension (CEP-440)

In previous versions of Macrometa, the `database` extension for streams skipped messages with a `_delete` field, because they mark deleted collection documents.

This release adds the following functionality:

- Introduce parameter `skip.event.with._delete` in `database` extension.
- The default value for `skip.event.with._delete` is `true`.
- Allow processing of all messages when the `skip.event.with._delete` is `false`.

### Dynamo Collection Indexes (DB-1719)

Dynamo collections are no longer allowed to have multiple indexes with the same definition. This prevents issues with indexes not being properly deleted.

### Feature

stuff

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Feature

stuff

[Topic name](link) and [topic name](link) were updated as a result of this change.

### API Updates

This release includes the following API changes.

| Issue #  | Description  |
|---|---|
| CEP-406  | Corrected wrong sample code in stream worker ad hoc query API reference.  |
| CEP-409  | Corrected HTTP-Source API endpoint description.  |
| DB-1726  | [Search View] APIs using a disabled Search View are informed that they are operating on a disabled View through response header.  |
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

| Defect #  | Description  |
|---|---|
| AUTH-277  | Macrometa logo on the login screen should link to macrometa.com.  |
| AUTH-280  | Incorrect text on the Awaiting verification page.  |
| AUTH-298  | Error on clicking email verification link.  |
| CEP-366, CEP-404  | Slow processing of collection streams.  |
| CEP-414  | Java out of heap memory error when running aggregation sample stream worker for several days.  |
| CEP-428  | Error when trying to publish or update a stream worker.  |
| DB-1542  | Intermittently observed response error 403 in long run at random places.  |
| DB-1719  | [Dynamo] Delete index operation is not working.  |
| DB-1755  | When a GeoFabric is deleted, saved queries are not properly deleted.  |
| DB-1832  | Non-root user with `ro` permissions should be able to lower stream access level for the API key created by the non-root user.  |
| DB-2072  | Enable streams for _guestdbs collection.  |
| DB-2090  | Replication failed for few tenants on the Play server.  |
| FAAS-328  | Error message should be shown when an EdgeWorker is called with an empty parameter.  |
| FAAS-336  | Different error messages are received for an EdgeWorker when invoked at different times.  |
| GUI-893  | Exporting queries results in files with empty arrays.  |
| GUI-1229  | [Query Workers] Save button remains enabled even after saving the query.  |
| GUI-1239  | Stream workers should be sorted in ascending order.  |
| GUI-1251  | [Key-Value Collection] After truncating the collection, text should be "0 kv(s) / 0 edge(s)" instead of "0 Results." |
| GUI-1550  | In the Query Worker code editor, the text wrapper and scrolling aren't working properly.  |
| GUI-1551  | [Collections] Missing drop-down list to select number of entries displayed.  |
| GUI-1644  | Make query worker and stream worker list double-click behavior consistent.  |
| GUI-1648  | [Collections] Make document content display colors consistent throughout the Macrometa web console. |
| GUI-1653  | Cannot auto-login from one region to other from the map.  |
| GUI-1657  | [Query workers] There is no notification for save and delete query worker operations.  |
| GUI-1659  | [Dynamo] Filtering via Scan and Query is not working properly. |
| GUI-1661  | Moving documents multiple times results in a 409 error.  |
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
|   |   |
|   |   |
|   |   |