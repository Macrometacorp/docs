---
sidebar_position: 90
title: Create Index in Background
---

Creating new indexes is by default done under an exclusive collection lock. This means that the collection (or the respective shards) are not available for write operations as long as the index is created. This "foreground" index creation can be undesirable, if you have to perform it on a live system without a dedicated maintenance window.

Indexes can also be created in "background", not using an exclusive lock during the entire index creation. The collection remains basically available, so that other CRUD operations can run on the collection while the index is being created. This can be achieved by setting the _inBackground_ attribute when creating an index.

## Create in UI

When creating indexes in the UI, select the **Create in background** checkbox to create the index in the background. Refer to the specific create index topic for more information.

## Create with API

To create an index in the background, just specify `inBackground: true`, like in the following examples:

```cURL
// create the hash index in the background
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "type": "hash", "fields": [ "value" ], "unique": false, "inBackground": true }'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "type": "hash", "fields": [ "email" ], "unique": true, "inBackground": true }'
 
 
// skiplist indexes work also of course
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/skiplist?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "skiplist", "fields": [ "abc", "def" ], "unique": true, "inBackground": true }'

curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/skiplist?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "skiplist", "fields": [ "abc", "def" ], "sparse": true, "inBackground": true }'

// Also supported on fulltext and Geo indexes
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/fulltext?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "fulltext", "fields": [ "text" ], "minLength": 4, "inBackground": true }'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "geo", "fields": [ "latitude", "longitude" ], "minLength": 4, "inBackground": true }'
```

## Behavior

Indexes that are still in the build process will not be visible via the GDN APIs. Nevertheless it is not possible to create the same index twice via the _ensureIndex_ API while an index is still begin created. AQL queries also will not use these indexes until the index reports back as fully created. Note that the initial _ensureIndex_ call or HTTP request will still block until the index is completely ready. Existing single-threaded client programs can thus safely set the _inBackground_ option to _true_ and continue to work as before.

:::info
Should you be building an index in the background you cannot rename or drop the collection. These operations will block until the index creation is finished. This is equally the case with foreground indexing.
:::

## Performance

Background index creation might be slower than the "foreground" index creation and require more RAM. Under a write heavy load (specifically many remove, update or replace operations), the background index creation needs to keep a list of removed documents in RAM. This might become unsustainable if this list grows to tens of millions of entries.

Building an index is always a write heavy operation (internally), it is always a good idea to build indexes during times with less load.
