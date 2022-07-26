---
sidebar_position: 70
title: TTL Indexes
---

# TTL (time-to-live) Indexes

The TTL index type provided by GDN can be used to automatically removing expired documents from a collection.

The TTL index is set up by setting an `expireAfter` value and by selecting a single document attribute which contains a reference point in time. For each document, that reference point in time can then be specified as a numeric timestamp (Unix timestamp) or a date string in format `YYYY-MM-DDTHH:MM:SS` with an optional timezone offset.

All date strings without a timezone offset will be interpreted as UTC dates.

Documents will count as expired when wall clock time is beyond the per-document reference point in time value plus the index' `expireAfter` value added to it. 

## Removing documents at a fixed period after creation / update

One use case supported by TTL indexes is to remove documents at a fixed duration after they have been created or last updated. This requires setting up the index with an attribute that contains the documents' creation or last-updated time.

Let's assume the index attribute is set to "creationDate", and the `expireAfter` attribute of the index was set to 600 seconds (10 minutes).

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/ttl?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                       \
 -d '{ "fields": [ "type" : "ttl", ."fields": ["creationDate"],  "expireAfter": 600}'
```

Let's further assume the following document now gets inserted into the collection:

```json
    { "creationDate" : 1550165973 }
```

This document will be indexed with a reference point in time value of `1550165973`, which translates to the human-readable date/time `2019-02-14T17:39:33.000Z`. The document will expire 600 seconds afterwards, which is at timestamp `1550166573` (or `2019-02-14T17:49:33.000Z` in the human-readable version). From that point on, the document is a candidate for being removed.

The numeric date time values for the index attribute need to be specified **in seconds** since January 1st 1970 (Unix timestamp). To calculate the current timestamp using JavaScript in this format, use: `Date.now() / 1000`. To calculate it from an arbitrary `Date` instance, use: `Date.getTime() / 1000`. In C8QL, you also have to divide the timestamp, e.g. `DATE_NOW() / 1000`.

Alternatively, the reference points in time can be specified as a date string in format `YYYY-MM-DDTHH:MM:SS` with an optional timezone offset. All date strings without a timezone offset will be interpreted as UTC dates.
  
The above example document using a date string attribute value would be

```json
    { "creationDate" : "2019-02-14T17:39:33.000Z" }
```

Now any data-modification access to the document could update the value in the document's `creationDate` attribute to the current date/time, which would prolong the existence of the document and keep it from being expired and removed. 

GDN will not automatically set a document's reference point in time on initial insertion or on every subsequent modification of the document. Instead, it is the responsibility of client applications to set and update the reference points in time of documents whenever the use case requires it.

## Removing documents at certain points in time

Another use case is to specify a per-document expiration/removal point in time, and setting the `expireAfter` attribute to a low value (e.g. 0 seconds).

Let's assume the index attribute is set to "expireDate", and the `expireAfter` attribute of the index was set to 0 seconds (immediately when wall clock time reaches the value specified in `expireDate`).

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/ttl?collection=collectionName' \ 
 -H 'Authorization: bearer <token>'                                                                       \
 -d '{ "fields": [ "type" : "ttl", ."fields": ["expireDate"],  "expireAfter": 0}'
```

When storing the following document in the collection, it will expire at the point in time specified in the document itself:

```json
    { "expireDate" : "2019-03-28T01:06:00Z" }
```

As `expireAfter` was set to 0, the document will count as expired when wall clock time has reached the timeout.

It should be intuitive to see that the `expireDate` can be different per document. This allows mixing of documents with different expiration periods by calculating their expiration dates differently in the client application.

## Format of date/time values

The expiration date time values can be specified either as a numeric timestamp, containing the number of milliseconds since January 1st 1970 (rounded down to the nearest second), or as a date/time string in ISO 8601 format `YYYY-MM-DDTHH:MM:SS` with an optional timezone offset. The timezone offset can be specified as either `Z` (Zulu/UTC time) or as a deviation from UTC time in hours and minutes (i.e. `+HH:MM` or `-HH:MM`).

Valid example date string values are:

| Date/time string                  | Local Date    | Local Time   | Timezone Offset             |
|-----------------------------------|---------------|--------------|-----------------------------|
| `"2019-05-27"`                    | May 27th 2019 | 00:00:00     | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00"`           | May 27th 2019 | 21:20:00     | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00Z"`          | May 27th 2019 | 21:20:00     | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00.123Z"`      | May 27th 2019 | 21:20:00.123 | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00.123+01:30"` | May 27th 2019 | 21:20:00.123 | +01:30 offset from UTC time |
| `"2019-05-27T21:20:00.123-02:00"` | May 27th 2019 | 21:20:00.123 | -02:00 offset from UTC time |

Using an invalid date string value in a document's TTL index attribute will prevent the document from being inserted into the TTL index, so it will neither be expired nor removed automatically. No error is raised however.

:::note
Date string values can be programmatically validated using the AQL function `IS_DATESTRING`.
:::

## Preventing documents from being removed

In case the index attribute does not contain a numeric value nor a proper date string, the document will not be stored in the TTL index and thus will not become a candidate for expiration and removal. Providing either a non-numeric value or even no value for the index attribute is a supported way to keep documents from being expired and removed.

## Limitations

TTL indexes are designed exactly for the purpose of removing expired documents from collections. It is **not recommended** to rely on TTL indexes for user-land C8QL queries. This is because TTL indexes may store a transformed, always numerical version of the index attribute value internally even if it was originally passed in as a date string. As a result, you may see different values for the attribute, depending on whether it gets taken from the index or the document. TTL indexes will likely not be usable for filtering and sort operations in user-land C8QL queries.

> There can at most be one TTL index per collection.

The actual removal of expired documents will not necessarily happen immediately when they have reached their expiration time. 

Expired documents will eventually be removed by a background thread that is periodically going through all TTL indexes and removing the expired documents.

There is no guarantee when exactly the removal of expired documents will be carried out, so queries may still find and return documents that have already expired. These will eventually be removed when the background thread kicks in and has spare capacity to remove the expired documents. It is guaranteed however that only documents which are past their expiration time will actually be removed.
  
The frequency for invoking the background removal thread can be configured using the `--ttl.frequency` startup option. The frequency is specified in milliseconds.

In order to avoid "random" load spikes by the background thread suddenly kicking in and removing a lot of documents at once, the number of to-be-removed documents per thread invocation can be capped.

The total maximum number of documents to be removed per thread invocation is controlled by the startup option `--ttl.max-total-removes`. The maximum number of documents in a single collection at once can be controlled by the startup option `--ttl.max-collection-removes`.

:::note
There are limited number of background threads for performing the removal of expired documents of all collections in all databases. If the number of databases and collections with TTL indexes is high and there are many documents to remove from these, the background thread may at least temporarily lag behind with its removal operations. It should eventually catch up in case the number of to-be-removed documents per invocation is not higher than the background thread's configured threshold values.
:::

## Accessing TTL Indexes

Ensures that a TTL index exists:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/ttl?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                       \
 -d '{ "fields": [ "type" : "ttl", ."fields": ["field"],  "expireAfter": 600}'
```

Creates a TTL index on all documents using *field* as attribute path. Exactly one attribute path has to be given. The index will be sparse in all cases.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

## Create TTL Index in GDN Console

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **COLLECTIONS**.
1. Click the collection that you want to create an index for.
1. Click **Indexes**.
1. In **Type**, select **TTL Index**.
1. Enter the following information:

   - **Fields -** Choose between one or two attribute paths, latitude and/or longitude, from the collection.
   - **Name -** The name of the index. If left blank, then Macrometa autogenerates the name.
   - **Documents expire after (s) -** A number of seconds to be added to the timestamp attribute value of each document.
   - **Create in Background -** If true, will create an index in the background rather than lock the collection while the index is created. This allows for basic CRUD operations to occur while the index is created. For more information, refer to [Create Index in Background](create-index-in-background.md).

1. Click **Create**.
