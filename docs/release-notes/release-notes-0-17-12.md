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
- You can now invoke EdgeWorkers with stream workers. [Edge Functions](../cep/reference/extensions/execution/edge-functions.md) was added as a result of this change.
  - In Samples, Sample-Function-Worker added.
- Added API error response codes. [Functions API](link) were updated as a result of this change.
- `groupIdWithPrefix` has been added to EdgeWorker metadata. This means you should re-initialize any EdgeWorkers with metadata.
- Macrometa SDK support for EdgeWorkers. You can now use EdgeWorkers with the jsC8 or pyC8 SDKs.

[Topic name](link) and [topic name](link) were updated as a result of this change.

### Updated Side Menu

The side menu in the web console has been updated and organized.

![Updated Side Menu](/img/release-notes/17-12-side-menu.gif)

Screenshots and instructions were updated as a result of this change.

### Feature

stuff

[Topic name](link) and [topic name](link) were updated as a result of this change.

### API Updates

This release includes the following API changes.

| Issue #  | Description  |
|---|---|
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

| Defect #  | Description  |
|---|---|
|   |   |
|   |   |
|   |   |
|   |   |
| GUI-1661  | Moving documents multiple times results in a 409 error.  |
|   |   |
|   |   |