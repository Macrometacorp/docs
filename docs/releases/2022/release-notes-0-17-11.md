---
title: Release Notes 0.17.11
sidebar_position: 98
---

This document describes what has changed in Macrometa release 0.17.11. To check what version of GDN you are using, use the [RestVersionHandler](https://www.macrometa.com/docs/api#/operations/RestVersionHandler) API command.

## New Features

The following new features are included in this release.

### Search and Stream Workers are in GA

[Search](../../database/search-views/index.md) and [Stream Workers](../../compute/cep/index.md), previously only available in closed beta, are now generally available for everyone to use.

### Invite User
~~~~
You can now invite users to your Macrometa account by sending them email.

[Invite Users](../../account-management/users/invite-users.md) was added as a result of this feature.

### Manage Attributes in Console

You can now manage attributes for users and API keys in the Macrometa console.

[Attributes](../../account-management/attributes/index.md) was added as a result of this feature.

### Akamai EdgeWorker Support - Preview

This release adds support for Akamai edge workers as functions in GDN. For more information, refer to [Akamai in Macrometa](../../akamai/index.md).

### SQL Support - Beta

Macrometa now supports SQL queries. Support will be expanded in future releases.

[SQL in Macrometa](../../queries/sql/index.md) was added as a result of this feature.

### Redis Support - Beta

Macrometa now offers Redis support.

[Redis Mode Collections](../../database/collections/redis-mode/index.md) and [Redis in Macrometa](../../queries/redis/index.md) were added as a result of this feature.

### Kafka Support - Beta

This release adds support for some Kafka clients in the GDN. For a list of supported clients, refer to [Kafka on GDN](../../streams/kafka_on_gdn/index.md).

## Feature Updates

The following features updates are included in this release.

### Migration to Play - Breaking Change

The previous generic global URL `api-gdn.paas.macrometa.io` is no longer valid.

Customers with Macrometa Play tier accounts _can_ use `api-play.paas.macrometa.io` as a substitute, but we do not recommend it.

Instead, we recommend that you use an account-specific global or regional URL, which you can find in the API Reference in the Macrometa web console or on your GeoFabrics page. Any endpoint listed on the GeoFabric will accept API calls if you prepend `api-` to it.

For more information, refer to [Unique Global URL vs. Generic](../../developer-hub/api-docs/index.md#unique-global-url-vs-generic).

### Stream Worker Prefixes

You can now prepend a stream worker name to the aggregation tables that it creates. For example, if the stream worker name is `SampleAggregationApp` and the aggregation is `TradeAggregation,` then it will create tables like `SampleAggregationApp-TradeAggregation_SECONDS`. Previously, it was just `TradeAggregation_SECONDS`.

### Auth Improvements

- We redesigned Macrometa authorization to make our service more efficient and stable.
- The account signup and login screens have been updated and improved.

### API Updates

This release includes the following API changes.

| Issue #  | Description  |
|---|---|
| APIDOC-51  | Added stream worker parameters `maxLogsLengthKBPerMinutePerWorker` and `maxCpuSecondsPerMinutePerWorker`. |
| APIDOC-54  | In API reference docs, corrected a typo in insertDocument description.  |
| DB-1692  | The fabric creation endpoint in the API now allows up to 40 characters for fabric names, just like in the web console.  |
| DB-1704  | Clarified in the API documentation for [Import API](https://www.macrometa.com/docs/api#/operations/ImportCollectionData) that the `_key` must be a string.  |

#### Import and Export Changes (DB-1660)

- You can now export in Vpack format.
- Added batching support for importing and exporting.

#### User Changes (DB-1783)

- The `user` parameter is deprecated and will not be used while creating the new user. For backward compatibility, it will not generate any errors.
- Provided a new optional parameter `displayName` to set the display name of the user. Whitespaces are allowed.

Here is a sample for the updated request body:

```bash
curl -X 'POST' \ 'https://api-qa6.eng.macrometa.io/_api/user' \ 
-H 'accept: application/json' \ 
-H 'Content-Type: application/json' \ 
-H 'Authorization: bearer <token> \
-d { 
    "active": true, 
    "email": "test1@bar1.com", 
    "passwd": "P@55w0rd", 
    "displayName":"John Doe" 
    }'
```

## Known Issues

The following known issues were introduced in this release.

### Stream Workers and Query Workers are Limited to Owners

**Problem:** Currently the stream workers and query workers are scoped by tenant, fabric, and owner where owner is the user account that created the worker. The result of this is stream workers and query workers created by one user cannot be seen by another user belonging to same tenant and fabric.

**Workaround:** If you encounter this issue, then reduce the scope to tenant and fabric for the workers so that all users with permission on a GeoFabric can see the stream workers and query users regardless of which user created them.

### Local Stream is Not Accessible after Upgrade from 17.10 to 17.11

**Problem:** Sometimes local streams are not accessible in the Macrometa console.

**Workaround:** If you encounter this error, then run the [Publish Message](https://www.macrometa.com/docs/api#/operations/PublishStreamMessage) API endpoint for particular stream to get rid of the issue.

`POST               /_fabric/_system/_api/streams/{stream}/publish`

For more information about running API commands, refer to [APIs](../../developer-hub/api-docs/index.md).

## Defect Fixes

The following defects were fixed in this release.

| Defect #  | Description  |
|---|---|
| DB-1625  | Cursor API not working as expected with `stream:true` option in payload.  |
| DB-1637  | In the C8QL query, if the filters are applied on the non-indexed keys, the query is likely to time out.  |
| DB-1666  | The item count on the screen is not updating when an item is inserted or deleted from a Dynamo collection.  |
| DB-1667  | Dynamo scans with filter expressions are not working as expected.  |
| DB-1668  | Improved error text in duplicate node error for graphs to be more user-friendly.  |
| DB-1714  | MaxDocumentSize limit error message in Dynamo is incorrect.  |
| DB-1801  | API `/_api/key/validate` returns HTTP code 200 with message 'non-representable type' when no request body is sent.  |
| DB-1831  | Graph with a vertex collection not loading normally. It only loads when you click on Full Graph option.  |
| DB-1855  | Maximum stored query workers limit is not applied across all regions.  |
| GUI-236  | Newly-created key-value collection does not replicate in other geo locations.  |
| GUI-239  | Could not update existing users in an account.  |
| GUI-241  | Search functionality does not work on Accounts page.  |
| GUI-249  | KV Pair Edit form does not show the date and time values correctly.  |
| GUI-395  | New index for a collection does not appear in the UI.  |
| GUI-525  | Import Documents button is improperly aligned.  |
| GUI-536  | When a non-root user opens the permission configuration tab for an API key, the Read-only option is in a disabled state. The same option is enabled for collections.  |
| GUI-666  | The user is redirected to the login page after they change the fabric.  |
| GUI-834  | UI breaks when a non-root user with access to a custom fabric and no access to the system fabric logs in.  |
| GUI-859  | Garbled error message appears on the login page when a non-root user with no access to fabrics logs in after changing their password.  |
| GUI-864  | Query editor bind parameter saves JSON Object as [object Object].  |
| GUI-868  | Non-root users are unable to create a new API key in the Macrometa console.  |
| GUI-903  | Wrong error message in tooltip for import collection scenario.  |
| GUI-1282  | Validation for field name is missing while adding mapping definition.  |
| GUI-1298  | Alignment issues on Query Worker page.  |
| GUI-1315  | Query gets stuck when you press the **Run Query** button quickly multiple times.  |
| GUI-1441  | Support link is cropped when viewing the console on a screen with 1536 x 864 resolution.  |
| GUI-1513  | Bind parameter key does not update when run by pressing **Run Query**.  |
| GUI-1517  | No message is shown when the user successfully purges a Dynamo Table collection.  |
| GUI-1520  | JSON object attributes in a Dynamo Table collection are not visible in the web console.  |
| GUI-1521  | Pagination is not working properly for Dynamo collections with JSON attributes.  |
| GUI-1526  | Enabled and disabled region endpoints are not always displayed correctly in the web console.  |
| GUI-1537  | Typo in stream creation success message.  |
| GUI-1547  | **Download CSV** button is missing in some cases.  |
| GUI-1554  | Graph view in Query Results in the Query Workers page is not stable.  |
| GUI-1555  | Typo in Primary Sort tool tip in Create New View modal.  |
| GUI-1571  | Creating two fabrics with access to different regions shows all three regions available to both fabrics.  |
| GUI-1573  | A non-root user that has access permission for fabric and read/write for collections cannot create or delete documents in the web console.  |
| GUI-1574  | Multi-edge graph is not working.  |
| GUI-1575  | An error in one graph prevents other graphs from loading.  |
| GUI-1577  | Edit user password message does not specify required special characters.  |
| GUI-1582  | Non-root users with read-only access to a fabric and read-write access to collections are not able to create and save query workers in the web console.  |
| GUI-1583  | Non-root users with read-only access to a fabric and read-write access to collections are not able to modify data in collections via the web console.  |
| GUI-1606  | Text wrapping is not working properly in the API header descriptions in the API Reference in the web console.  |
| STRM-418  | Stream limits are not properly applied on custom fabrics.  |
| STRM-443  | Stream deletion is not always replicated in other regions.  |
