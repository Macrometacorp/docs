---
title: Release Notes 0.17.15
sidebar_position: 96
---

This document describes what has changed in Macrometa release 0.17.15. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### Blob Storage in KV Store

Key-value (KV) store collections now allow you to store blobs (arbitrary binary data, such as images).

When you create a new key-value store, you can select the **Blob storage** checkbox. This marks the collection as a blob-based KV collection. These collections can only be used to store blobs. Once created, this setting cannot be changed.

File limit size is 1 MB. This can be changed, but can never exceed 2 MB.

You can add blob records using the Macrometa API. Adding records in the Macrometa web console is not supported.

This feature is available upon request. Contact support@macrometa.com to enable it on your account.

The [Create a Key-Value Store](../account-management/plans/) has been updated as a result of this change.

## Feature Updates

The following features updates are included in this release.

### Retrieve API Keys

As of this release, an API key created using `POST /_api/key` can now be retrieved using `GET /_api/key/{keyid}`.

The call and response now look similar to the following:

```bash
curl -X 'GET'   'https://api-your-macrometa.eng.macrometa.io/_api/key/root_api_keyid777777'   -H 'accept: application/json'   -H 'Authorization: bearer <JWT>' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   234  100   234    0     0   1073      0 --:--:-- --:--:-- --:--:--  1073
{
  "user": "root_api_keyid777777",
  "active": true,
  "displayName": "root_api_keyid777777",
  "apikey": {
    "parent": "root",
    "key": "root_api_keyid777777.api_key_goes_here_314567890"
  },
  "error": false,
  "code": 200
}
```

### xx

xxxx

Topics in [xx](../queries/redis/) were updated as a result of this change.

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

## Defect Fixes

The following defects were fixed in this release.

| Defect # | Description |
| -------- | ----------- |
| CEP-537  | Every time a stream worker is unpublished and published, it reads the topic from earliest position instead of last read position.          |
| DB-2384         |  Inconsistency in regions for different fabrics created during connectivity tests.           |
|          |             |
|          |             |
