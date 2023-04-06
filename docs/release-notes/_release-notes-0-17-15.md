---
title: Release Notes 0.17.15
sidebar_position: 96
---

This document describes what has changed in Macrometa release 0.17.15. To check what version of GDN you are using, use the [RestVersionHandler](https://macrometa.com/docs/api#/operations/RestVersionHandler) command in the API.

## New Features

The following new features are included in this release.

### dddd

ddd

The [x](../account-management/plans/) section was created as a result of this change.

## Feature Updates

The following features updates are included in this release.

### Macrometa Stores API Keys

In previous versions, when a user created an API key using the `POST /_api/key` API, Macromata returned the newly-created API key in the response on successful execution. Internally, the API key was not stored, and there was no way to get the API key again.

As of this release, Macrometa now stores new API keys created using the `POST /_api/key API`. Due to this change, Macrometa now returns the API key in response to `GET /_api/key/{keyid}`.

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
| x        | x           |
|          |             |
|          |             |
