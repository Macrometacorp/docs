# Glossary

## Collection

A collection consists of documents. It is uniquely identified by its collection identifier. It also has a unique name that clients should use to identify and access it. Collections can be renamed. It will change the collection name, but not the collection identifier. Collections contain documents of a specific type. There are currently two types: document (default) and edge. The type is specified by the user when the collection is created, and cannot be changed later.

## Collection Identifier

A collection identifier identifies a collection in a database. It is a string value and is unique within the database. This is an internal metadata field, and clients should instead use a collection's unique name to access a collection instead of its identifier.

Macrometa GDN currently uses 64bit unsigned integer values to maintain collection ids internally. When returning collection ids to clients, Macrometa GDN will put them into a string to ensure the collection id is not clipped by clients that do not support big integers. Clients should treat the collection ids returned by Macrometa GDN as opaque strings when they store or use it locally.

## Collection Name

A collection name identifies a collection in a database. It is a string and is unique within the database. Unlike the collection identifier it is supplied by the creator of the collection. The collection name must consist of letters, digits, and the _ (underscore) and - (dash) characters only. Refer to [Naming Conventions](../../naming-conventions/) for more information on valid collection names.

## GeoFabric

Macrometa GDN can handle multiple GeoFabrics in the same server instance. GeoFabrics can be used to logically group and separate data. A Macrometa GDN GeoFabric consists of collections and dedicated worker processes within each region the GeoFabric is present.

A GeoFabric contains its own collections (which cannot be accessed from other GeoFabrics). Each Macrometa GDN GeoFabric contains its own system collections (e.g. _users, _replication, ...).

By default, there is always at least one GeoFabric in Macrometa GDN named `_system`. This geofabric cannot be dropped, and provides special operations for creating, dropping, and enumerating GeoFabrics. You can create GeoFabrics and give them unique names to access them later. GeoFabric management operations can only be performed in the `_system` GeoFabric.

For more information about GeoFabrics, refer to our blog post [Introducing GeoFabrics](https://www.macrometa.com/blog/introducing-geofabrics).

## GeoFabric Name

A single Macrometa GDN instance can handle multiple geofabrics in parallel. When multiple geofabrics are used, each geofabric must be given a unique name. This name is used to uniquely identify a database. The default geofabric in Macrometa GDN is named _system.

The geofabric name is a string consisting of only letters, digits and - (dash) characters. User-defined geofabric names must always start with a letter.  Geofabric names is case-sensitive.

## Document

Documents in Macrometa GDN are JSON objects. These objects can be nested (to any depth) and may contain arrays. Each document is uniquely identified by its document handle.

## Document Etag

The document revision (`_rev` value) enclosed in double quotes. The revision is returned by several HTTP API methods in the Etag HTTP header.

## Document Handle

A document handle uniquely identifies a document in the database. It is a string and consists of the collection's name and the document key (`_key` attribute) separated by /. The document handle is stored in a document's `_id` attribute.

## Document Key

A document key is a string that uniquely identifies a document in a given collection. It can and should be used by clients when specific documents are searched. Document keys are stored in the `_key` attribute of documents. The key values are automatically indexed by Macrometa GDNDB in a collection's primary index. Thus looking up a document by its key is regularly a fast operation. The `_key` value of a document is immutable once the document has been created.

By default, Macrometa GDN will auto-generate a document key if no `_key` attribute is specified, and use the user-specified `_key` value otherwise.

This behavior can be changed on a per-collection level by creating collections with the `keyOptions` attribute.

Using `keyOptions` it is possible to disallow user-specified keys completely, or to force a specific regime for auto-generating the `_key` values.

There are some restrictions for user-defined keys (see [Naming Conventions for document keys](../../naming-conventions/#document-keys).

## Document Revision

As Macrometa GDN supports MVCC, documents can exist in more than one revision. The document revision is the MVCC token used to identify a particular revision of a document. It is a string value currently containing an integer number and is unique within the list of document revisions for a single document. Document revisions can be used to conditionally update, replace or delete documents in the database. In order to find a particular revision of a document, you need the document handle and the document revision.

The document revision is stored in the `_rev` attribute of a document, and is set and updated by Macrometa GDNDB automatically. The `_rev` value cannot be set from the outside.

Macrometa GDN currently uses 64bit unsigned integer values to maintain document revisions internally. When returning document revisions to clients, Macrometa GDN will put them into a string to ensure the revision id is not clipped by clients that do not support big integers. Clients should treat the revision id returned by Macrometa GDN as an opaque string when they store or use it locally. This will allow Macrometa GDN to change the format of revision ids later if this should be required. Clients can use revisions ids to perform simple equality/non-equality comparisons (e.g. to check whether a document has changed or not), but they should not use revision ids to perform greater/less than comparisons with them to check if a document revision is older than one another, even if this might work for some cases.

## Edge

Edges are special documents used for connecting other documents into a graph. An edge describes the connection between two documents using the internal attributes: `_from` and `_to`. These contain document handles, namely the start-point and the end-point of the edge.

## Edge Collection

Edge collections are collections that store edges.

## Edge Definition

Edge definitions are parts of the definition of `named graphs`. They describe which edge collections connect which vertex collections.

## General Graph

Module maintaining graph setup in the `_graphs` collection - aka `named graphs`. Configures which edge collections relate to which vertex collections. Ensures graph consistency in modification queries.

## Named Graphs

Named graphs enforce consistency between edge collections and vertex collections, so if you remove a vertex, edges pointing to it will be removed too.

## Index

Indexes are used to allow fast access to documents in a collection. All collections have a primary index, which is the document's _key attribute. This index cannot be dropped or changed.

Edge collections will also have an automatically created edges index, which cannot be modified. This index provides quick access to documents via the `_from` and `_to` attributes.

Most user-land indexes can be created by defining the names of the attributes which should be indexed. Some index types allow indexing just one attribute (e.g. fulltext index) whereas other index types allow indexing multiple attributes.

Indexing the system attribute `_id` in user-defined indexes is not supported by any index type.

## Edges Index

An edges index is automatically created for edge collections. It contains connections between vertex documents and is invoked when the connecting edges of a vertex are queried. There is no way to explicitly create or delete edges indexes.

## Fulltext Index

A fulltext index can be used to find words, or prefixes of words inside documents. A fulltext index can be defined on one attribute only, and will include all words contained in documents that have a textual value in the index attribute. The index will also include words from the index attribute if the index attribute is an array of strings, or an object with string value members.

For example, given a fulltext index on the `translations` attribute and the following documents, then searching for `лиса` using the fulltext index would return only the first document. Searching for the index for the exact string `Fox` would return the first two documents, and searching for `prefix:Fox` would return all three documents:

    { translations: { en: "fox", de: "Fuchs", fr: "renard", ru: "лиса" } }
    { translations: "Fox is the English translation of the German word Fuchs" }

If the index attribute is neither a string, an object or an array, its contents will not be indexed. When indexing the contents of an array attribute, an array member will only be included in the index if it is a string. When indexing the contents of an object attribute, an object member value will only be included in the index if it is a string. Other data types are ignored and not indexed.

Only words with a (specifiable) minimum length are indexed. Word tokenization is done using the word boundary analysis provided by libicu, which is taking into account the selected language provided at server start. Words are indexed in their lower-cased form. The index supports complete match queries (full words) and prefix queries.

## Geo Index

A geo index is used to find places on the surface of the earth fast.

## Index Handle

An index handle uniquely identifies an index in the database. It is a string and consists of a collection name and an index identifier separated by /.

## Hash Index

A hash index is used to find documents based on examples. A hash index can be created for one or multiple document attributes.

A hash index will only be used by queries if all indexed attributes are present in the example or search query, and if all attributes are compared using the equality (== operator). That means the hash index does not support range queries.

A unique hash index has an amortized complexity of O(1) for lookup, insert, update, and remove operations. The non-unique hash index is similar, but amortized lookup performance is O(n), with n being the number of index entries with the same lookup value.

## Skiplist Index

A skiplist is a sorted index type that can be used to find ranges of documents.

## Anonymous Graphs

You may use edge collections with vertex collections without the graph management facilities. However, graph consistency is not enforced by these. If you remove vertices, you have to ensure by yourselves edges pointing to this vertex are removed. Anonymous graphs may not be browsed using graph viewer in the webinterface. This may be faster in some scenarios.

## Message

Messages are the basic unit of Macrometa GDN Streams. They're what [producers](#stream-producer) publish to [stream](#stream) and what [consumers](#stream-consumer) then consume from stream.

## Stream

A named channel used to pass messages published by [producers](#stream-producer) to [consumers](#stream-consumer) who
process those [messages](#message). Streams are grouped by [database](#database)

## Tenant

An administrative unit for allocating capacity and enforcing an authentication/authorization scheme.

## Stream Subscription

A lease on a [stream](#stream) established by a group of [consumers](#stream-consumer). Macrometa GDN streams have three subscription
modes (exclusive, shared, and failover).

## Stream Pub-Sub

A messaging pattern in which [producer](#stream-producer) proccesses publish messages on [streams](#stream) that are then consumed (processed) by [consumer](#stream-consumer) processes.

## Stream Producer

A process that publishes [messages](#message) to a c8 [stream](#stream).

## Stream Consumer

A process that establishes a subscription to a Macrometa GDN [stream](#stream) and processes messages published to that stream by [producers](#stream-producer).

## Stream Reader

Macrometa GDN readers are message processors much like Macrometa GDN [consumers](#stream-consumer) but with two crucial differences:

- you can specify *where* on a stream readers begin processing messages (consumers always begin with the latest
  available unacked message);
- readers don't retain data or acknowledge messages.

## Stream Cursor

The subscription position for a [consumer](#stream-consumer).

## Acknowledgment (ack)

A message sent to a Macrometa GDN broker by a [consumer](#stream-consumer) that a message has been successfully processed. An acknowledgement (ack) is Macrometa GDN's way of knowing that the message can be deleted from the system; if no acknowledgement, then the message will be retained until it's processed.

## Unacknowledged

A message that has been delivered to a consumer for processing but not yet confirmed as processed by the consumer.

## Stream Retention Policy

Size and/or time limits that you can set on a [database](#database) to configure retention of [messages](#message) that have already been [acknowledged](#acknowledgement-ack).

## Multi-Tenancy

The ability to isolate geofabric, specify quotas, and configure authentication and authorization on a per-[tenant](#tenant) basis.

## Geo-Replication

Replication of messages and documents across Macrometa GDN [clusters](#cluster), potentially in different datacenters or geographical regions.

## Stream MetaStore

Macrometa GDN configuration store within a region that is used for configuration-specific tasks. 

## Stream Lookup

A service provided by Macrometa GDN ) that enables connecting clients to automatically determine which Macrometa GDN [cluster](#cluster) is responsible for a [stream](#stream) (and thus where message traffic for the stream needs to be routed).


## Stream Broker

A stateless component of Macrometa GDN [clusters](#cluster) that runs two other components: an HTTP server exposing a REST interface for administration and stream lookup and a [dispatcher](#dispatcher) that handles all message transfers. Macrometa GDN clusters typically consist of multiple brokers.

## Message Dispatcher

An asynchronous TCP server used for all data transfers in-and-out a Macrometa GDN [broker](#broker). The Macrometa GDN dispatcher uses a custom binary protocol for all communications.
