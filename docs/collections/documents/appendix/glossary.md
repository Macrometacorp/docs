# Glossary

This page contains a list of defined terms used by Macrometa.

## acknowledgment (ack)

A message sent to a Macrometa [GDN](#gdn) broker by a [consumer](#stream-consumer) that a message has successfully finished processing. An acknowledgement (ack) is Macrometa GDN's way of knowing that the message can be deleted from the system. If no acknowledgement, the message is retained until finished processing.

## collection

A collection consists of documents and is uniquely identified by its collection identifier. A collection also has a unique name that clients should use to identify and access it. Collections can be renamed, but the collection identifier remains the same. Collections contain documents of a specific type. There are two types: document (default) and edge. The type is specified by the user when the collection is created and cannot be changed later.

## collection identifier

A collection identifier is a unique string value for a collection in a database. This is an internal metadata field, and generally you should use a collection's unique name to access it instead of its identifier.

Macrometa GDN uses 64-bit unsigned integer values to maintain collection IDs. When returning collection IDs to clients, GDN uses the IDs to create a string and then verifies the collection ID is not shortened by clients that do not support large integers. When collection IDs are returned by GDN, clients should treat them as opaque strings when stored or used locally, enabling GDN to change the format of revision IDs later if necessary.

## collection name

A collection name is a unique string value that identifies a collection in a database. Unlike the collection identifier it is supplied by the creator of the collection. The collection name must consist of letters, digits, and `_` (underscore) or `-` (dash) characters only. Refer to [Naming Conventions](../../naming-conventions/) for more information on valid collection names.

## document

Documents in Macrometa GDN are JSON objects. These objects can be nested to any depth and might contain arrays. Each document is uniquely identified by its document handle.

## document etag

The document revision (`_rev` value) enclosed in double quotes (`"`). The revision is returned by several HTTP API methods in the etag HTTP header.

## document handle

A document handle uniquely identifies a document in a database. It is a unique string and consists of the collection name and the document key (`_key` attribute) separated by slashes (`/`). The document handle is stored in a document's `_id` attribute.

## document key

A document key is a string that uniquely identifies a document in a given collection. Clients can use document keys when specific documents are searched. Document keys are stored in the `_key` attribute of documents. The key values are automatically indexed by Macrometa [GDNDB](#gdndb) in a collection's primary index, enabling fast retrieval of documents by finding their keys. The `_key` value of a document is permanent once the document has been created.

If you do not specify a `_key` value, Macrometa GDN auto-generates a document key. You can change this default behavior on a per-collection basis by creating collections with the `keyOptions` attribute. You can also use `keyOptions` to disallow user-specified keys completely or enforce a standard for auto-generating the `_key` values.

There are some restrictions for user-defined keys. For more information, see [Naming Conventions for document keys](../../naming-conventions/#document-keys).

## document revision

As Macrometa GDN supports MVCC, documents can exist in more than one revision. The document revision is the MVCC token used to identify a specific revision of a document. It is a string value currently containing an integer number and is unique within the list of revisions for a single document. Document revisions can be used to conditionally update, replace, or delete documents in the database. To find a specific revision of a document, you need the document handle and the document revision.

The document revision is stored in the `_rev` attribute of a document and is automatically set and updated by Macrometa GDNDB. The `_rev` value cannot be changed manually.

Macrometa GDN uses 64-bit unsigned integer values to maintain document revisions. When returning document revisions to clients, GDN uses the revision IDs to create a string and then verifies the ID is not shortened by clients that do not support large integers. When revision IDs are returned by GDN, clients should treat them as opaque strings when stored or used locally, enabling GDN to change the format of revision IDs later if necessary. Clients can use revisions IDs to perform simple equality/non-equality comparisons (e.g. to check whether a document has changed or not), but they should not use revision IDs to perform greater/less than comparisons with them to check if a document revision is older than one another, even if this might work for some cases.

## edge

Edges are special documents used for connecting other documents into a graph. An edge describes the connection between two documents using the internal attributes `_from` and `_to`. These contain document handles such as the start-point and end-point of the edge.

## edge collection

Edge collections are collections that store edges.

## edge definition

Edge definitions are parts of the definition of `named graphs` and describe which edge collections connect which vertex collections.

## GDN

A geo-distributed real time coordination-free materialized views engine supporting multiple data models.  GDN stands for "global distributed network."

## GDNDB

Stands for "global distributed network database."

## GeoFabric

Macrometa GDN can handle multiple GeoFabrics in the same server instance. GDN GeoFabrics can be used to logically group and separate data. A GeoFabric consists of collections and dedicated worker processes within each region the GeoFabric is present.

A GeoFabric contains its own collections which cannot be accessed from other GeoFabrics. Each Macrometa GDN GeoFabric contains its own system collections (e.g. `_users`, `_replication`, ...).

By default, there is always at least one GeoFabric in Macrometa GDN named `_system`. This GeoFabric cannot be dropped, and provides special operations for creating, dropping, and enumerating GeoFabrics. You can create GeoFabrics and give them unique names to access them later. GeoFabric management operations can only be performed in the `_system` GeoFabric.

For more information about GeoFabrics, refer to our blog post [Introducing GeoFabrics](https://www.macrometa.com/blog/introducing-GeoFabrics).

## GeoFabric name

A single Macrometa GDN instance can handle multiple GeoFabrics in parallel. When multiple GeoFabrics are used, each GeoFabric must have a unique name used to identify the database. The default GeoFabric in Macrometa GDN is named `_system`.

The GeoFabric name is a string consisting of letters, digits, and `-` (dash) characters. User-defined GeoFabric names must always start with a letter. GeoFabric names are case-sensitive.

## geo-replication

Replication of messages and documents across Macrometa GDN [clusters](#cluster), potentially in different datacenters or geographical regions.

## graph, anonymous

You can use edge collections with vertex collections without the graph management facilities. However, graph consistency is not enforced. If you remove vertices, you have to manually verify that edges pointing to this vertex are removed. Anonymous graphs cannot be viewed using graph viewer in the Web interface. Anonymous graphs might be faster in some scenarios.

## graph, general

Module maintaining graph setup in the `_graphs` collection. Configures which edge collections relate to which vertex collections. Verifies graph consistency in modification queries.

## graph, named

Named graphs enforce consistency between edge collections and vertex collections, so if you remove a vertex, edges pointing to it are also removed.

## index

Indexes can allow fast access to documents in a collection. All collections have a primary index, which is the document's `_key` attribute. This index cannot be dropped or changed.

Edge collections also have an automatically created edges index that cannot be modified. This index provides quick access to documents via the `_from` and `_to` attributes.

You can create a user-defined index by defining the names of the attributes which should be indexed. Some index types allow indexing just one attribute (e.g. full-text indexes) whereas other index types allow indexing multiple attributes.

All index types do not support indexing the system attribute `_id` in user-defined indexes.

## index, edges

An edges index is automatically created for edge collections. It contains connections between vertex documents and is invoked when the connecting edges of a vertex are queried. There is no way to explicitly create or delete edges indexes.

## index, full-text

A full-text index can be used to find words or prefixes of words inside documents. A full-text index can only be defined on one attribute and includes all words contained in documents that have a textual value in the index attribute. The index also includes words from the index attribute if the index attribute is an array of strings, or an object with string value members.

For example, given a full-text index on the `translations` attribute and the following documents, searching for `лиса` using the full-text index would return only the first document. Searching for the index for the exact string `Fox` would return the first two documents, and searching for `prefix:Fox` would return all three documents:

  { translations: { en: "fox", de: "Fuchs", fr: "renard", ru: "лиса" } }
  { translations: "Fox is the English translation of the German word Fuchs" }

If the index attribute is neither a string, an object, nor an array, its contents are not indexed. When indexing the contents of an array attribute, only array member values that are strings will be included in the index. When indexing the contents of an object attribute, only object member values that are strings will be included in the index. Other data types are ignored and not indexed.

Only words with a changeable minimum length are indexed. Word tokenization is done using the word boundary analysis provided by libicu, which is taking into account the selected language provided at server start. Words are indexed in lower-case. The index supports complete match queries (full words) and prefix queries.

## index, geo

A geo index is used to quickly find locations on the surface of the earth.

## index, hash

A hash index is used to find documents based on examples. A hash index can be created for one or more document attributes.

A hash index is only used by queries if all indexed attributes are present in the example or search query, and if all attributes are compared using the equality operator (`==`). Hash index does not support range queries.

A unique hash index has an amortized complexity of `O(1)` for lookup, insert, update, and remove operations. The non-unique hash index is similar, but amortized lookup performance is `O(n)`, with `n` being the number of index entries with the same lookup value.

## index, skiplist

A skiplist is a sorted index type that can be used to find ranges of documents.

## index handle

An index handle uniquely identifies an index in the database. It is a string and consists of a collection name and an index identifier separated by slashes (`/`).

## message

Messages are the basic unit of Macrometa GDN Streams. They're what [producers](#stream-producer) publish to a [stream](#stream) and what [consumers](#stream-consumer) then consume from the stream.

## message dispatcher

An asynchronous TCP server used for all data transfers into and out of a Macrometa GDN [broker](#broker). The GDN dispatcher uses a custom binary protocol for all communications.

## multi-tenancy

The ability to isolate a GeoFabric, specify quotas, and configure authentication and authorization on a per-[tenant](#tenant) basis.

## stream

A named channel used to pass messages published by [producers](#stream-producer) to [consumers](#stream-consumer) who
process those [messages](#message). Streams are grouped by [database](#database).

## stream broker

A stateless component of Macrometa GDN [clusters](#cluster) that runs two other components: an HTTP server exposing a REST interface for administration and stream lookup, and a [dispatcher](#dispatcher) that handles all message transfers. Macrometa GDN clusters typically consist of multiple brokers.

## stream consumer

A process that establishes a subscription to a Macrometa GDN [stream](#stream) and processes messages published to that stream by [producers](#stream-producer).

## stream cursor

The subscription position for a [consumer](#stream-consumer).

## stream lookup

A service provided by Macrometa GDN that enables connecting clients to automatically determine which Macrometa GDN [cluster](#cluster) is responsible for a [stream](#stream) (and thus where message traffic for the stream needs to be routed).

## stream metastore

Macrometa GDN configuration store within a region that is used for configuration-specific tasks. 

## stream producer

A process that publishes [messages](#message) to a [stream](#stream).

## stream pub-sub

A messaging pattern in which [producer](#stream-producer) proccesses published messages on [streams](#stream) that are then consumed by [consumer](#stream-consumer) processes.

## stream reader

Macrometa GDN readers are message processors much like GDN [consumers](#stream-consumer) but with two major differences:

- You can specify *where* on a stream readers begin processing messages (consumers always begin with the latest
  available unacknowledged message).
- Readers don't retain data or acknowledge messages.

## stream retention policy

Size and time limits that you can set on a [database](#database) to configure retention of [messages](#message) that have already been [acknowledged](#acknowledgement-ack).

## stream subscription

A lease on a [stream](#stream) established by a group of [consumers](#stream-consumer). Macrometa GDN streams have three subscription
modes (exclusive, shared, and failover).

## tenant

An administrative unit for allocating capacity and enforcing an authentication/authorization scheme.

## unacknowledged

A message that has been delivered to a consumer for processing but not yet confirmed as processed by the consumer.
