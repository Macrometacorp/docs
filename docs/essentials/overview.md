---
sidebar_position: 1
---

# Introduction

### Architecture

Macrometa GDN is a `geo-distributed real time coordination-free materialized views engine` supporting multiple data models.

Typically when you choose a database or stream or stream processing system today, you’re not choosing one piece of technology, you’re actually choosing three: `storage technology`, `data model`, and `API/query` language.

:::tip
For example, if you choose Postgres, you are choosing the Postgres storage engine, a relational data model, and the SQL query language. If you choose MongoDB you are choosing the MongoDB distributed storage engine, a document data model, and the MongoDB API. In systems like these, features are interwoven between all of the layers. For example, both of those systems provide indexes, and the notion of an index exists in all three layers.
:::

Document databases, Graph databases, Key-Value, Pub-Sub Streams, Queues etc. all make sense in the right context, and often different parts of an application call for different choices. This creates a tough decision: Use a whole new database or new streaming system to support a new data model, or try to shoehorn data into your existing database or messaging system.

Macrometa GDN uses layered concept and decouples its data storage technology from its data model. GDN core real-time materialized views and log storage technology can be efficiently adapted and remapped to a broad array of rich data models and streams.

![GDN Internals](/img/macrometa-internals.png)

Within a single datacenter, GDN is a `CP` master/master model with no single point of failure.

* With `CP` we mean that in the presence of a network partition, GDN prefers internal consistency over availability.
* With `master/master` we mean that clients can send their requests to an arbitrary node within a data center, and experience the same view on the geofabric regardless. No single point of failure means that the cluster can continue to serve requests, even if one machine fails completely.
* With `geo-distributed` we mean that clients can send their requests to any region and experience the same view on the GDN outside of bounded latencies window.

This section gives a short outline on the architecture of a GDN within a single data center and how the above features and capabilities are achieved.

Macrometa Global Data Network (GDN) provides following data models & capabilities under one single interface i.e.,

|  Service  | Description  |
|-----------|--------------|
| Key/Value |Global Key Value Store|
| Document  |Global Document Store|
| Graphs    |Global Graph Database|
| Search    |Global Search|
| Streams   |Geo-Replicated Pub-Sub Streams|
| Stream Processor |Stateful Stream Processing|

> GDN sits across several locations/pops around the globe and present one unified view.

**Real-time Data:** When your app polls for data, it becomes slow, unscalable, and cumbersome to maintain. Macrometa GDN makes building real-time apps dramatically easier. The GDN  can push data to applications in real-time across multiple data centers. It dramatically reduces the time and effort necessary to build scalable real-time apps.

## Fabrics

GDN is composed of Fabrics. A fabric is a collection of edge data centers linked together as a single, high performance virtual cloud consisting of storage, networking and processing functions. A fabric is created when a tenant account is provisioned with the edge locations. 

Each fabric contains `Collections (KV, Doc)`, `Graphs`, `Streams`, `Stream Processors` and `Search` capabilities. Data written to a fabric is pinned to the locations that are part of the fabric.

A tenant can have multiple geo-fabrics. Different geofabrics are usually used to isolate the data inside them (collections, documents etc.) from one another. 

A fabric contains the following:

* **Collections** - are a grouping of JSON documents and are like tables in a RDBMS. You can create any number of collections in a geo fabric. And a collection can have any number of documents. A collection can be a `kv` or `document` collection.
* **Graphs** - consists of vertices and edges. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices).
* **Search** - A full-text search engine for information retrieval on one or more linked collections. Also referred to as a `View`.
* **Streams** - are a type of collection that capture data in motion. Streams support both pub-sub and queuing models. Messages are sent via streams by publishers to consumers who then do something with the message.
* **Stream Processors** - to perform complex event processing in real-time on streams.


## Collections

A collection contains zero or more documents. If you are familiar with relational database management systems (RDBMS) then it is safe to compare collections to tables and documents to rows. The difference is that in a traditional RDBMS, you have to define columns before you can store records in a table. Such definitions are also known as schemas. 

Macrometa GDN is schema-less, which means that there is no need to define what attributes a document can have. Every single document can have a completely different structure and still be stored together with other documents in a single collection. In practice, there will be common denominators among the documents in a collection, but the GDN itself doesn’t force you to limit yourself to a certain data structure.

There are 2 types of collections: 

 * **Document Collections** - Also referred to as vertex collections in the context of graphs. These collections can be created as local or global collections

    * A `local` collection stores its data in one region and does not replicate to other regions. You can create a local collection in any region. If you are working with local collections it's a best practice to use a region specific API endpoint when interacting with this collection type. If you use the Global URL and a user is routed to a region that does not contain the local collection the request will fail.

    * A `global` collection replicates its data while also maintaining state and consistency across all regions in your fabric. 

 * **Edge Collections** - Edge collections store documents as well, but they include two special attributes, _from and _to, which are used to create relations between documents. 
 
Usually, two documents (vertices) stored in document collections are linked by a document (edge) stored in an edge collection. This is GDN graph data model. It follows the mathematical concept of a directed, labeled graph, except that edges don’t just have labels, but are full-blown documents.

Collections exist inside of fabrics. There can be one or many fabrics. Different fabrics are usually used for geo-fencing setups, as the data inside them (collections, documents etc.) is isolated from one another. The default fabric `_system` is special, because it cannot be removed. Fabric users are managed in this fabric.

Similarly fabrics may also contain view entities. A `View` in its simplest form can be seen as a read-only array or collection of documents. The view concept quite closely matches a similarly named concept available in most relational database management systems (RDBMS). Each view entity usually maps some implementation specific document transformation, (possibly identity), onto documents from zero or more collections.

## Data Models

### Key/Value model

In GDN, each document stored in a collection contains a primary key `_key`. The rest of the document is considered a value. In the absence of any additional secondary indexes on the collection, the collection behaves like a simple key/value store.

The only operations that are possible in KV context are key lookups (single & batch gets) and key/value pair insertions and updates. If no sharding attribute is specified then `_key` is used for sharding the data.

KV collections are always global. You can specify time_to_live (TTL) as part of KV collection creation. 

### Document model

In GDN, the documents you can store follow the JSON format, although they are stored in a binary format called `VelocyPack`. A document contains zero or more attributes, each of these attributes having a value. A value can either be an atomic type, i.e., `number`, `string`, `boolean` or `null`, or a `compound type`, i.e. an `array` or embedded document / object. Arrays and sub-objects can contain all of these types, which means that arbitrarily nested data structures can be represented in a single document. Documents are grouped into collections.

Each document has a unique `primary key` which identifies it within its collection. Furthermore, each document is uniquely identified by its `document handle` across all collections in the same fabric. Different revisions of the same document (identified by its handle) can be distinguished by their `document revision`. Any transaction only ever sees a single revision of a document. 

For example:

```json
{
  "_id" : "myusers/3456789",
  "_key" : "3456789",
  "_rev" : "14253647",
  "firstName" : "John",
  "lastName" : "Doe",
  "address" : {
    "street" : "Road To Nowhere 1",
    "city" : "Gotham"
  },
  "hobbies" : [
    {"name": "swimming", "howFavorite": 10},
    {"name": "biking", "howFavorite": 6},
    {"name": "programming", "howFavorite": 4}
  ]
}
```

All documents contain special attributes:

* the [document handle](#document-handle) is stored as a string in `_id`, 
* the [document's primary key](#document-key) in `_key` and 
* the [document revision](#document-revision) in `_rev`. 

The value of the `_key` attribute can be specified by the user when creating a document. `_id` and `_key` values are immutable once the document has been created. The `_rev` value is maintained by GDN automatically.

**Document Handle:**

A document handle uniquely identifies a document in the database. It is a string and consists of the collection's name and the document key (`_key` attribute) separated by `/`.

**Document Key:**

A document key uniquely identifies a document in the collection it is stored in. It can and should be used by clients when specific documents are queried. The document key is stored in the `_key` attribute of each document. The key values are automatically indexed by C8DB in a collection's primary index. Thus looking up a document by its key is a fast operation. The `_key` value of a document is immutable once the document has been created. 

By default, C8 will auto-generate a document key if no `_key` attribute is specified, and use the user-specified `_key` otherwise. The generated `_key` is guaranteed to be unique in the collection it was generated for. This also applies to sharded collections in a cluster. It can't be guaranteed that the `_key` is unique within a database or across a whole node or instance however.

This behavior can be changed on a per-collection level by creating collections with the `keyOptions` attribute.

Using `keyOptions` it is possible to disallow user-specified keys completely, or to force a specific regime for auto-generating the `_key` values.

**Document Revision:**

As GDN supports MVCC (Multiple Version Concurrency Control), documents can exist in more than one revision. The document revision is the MVCC token used to specify a particular revision of a document (identified by its `_rev`). It is fully managed by the server and read-only for the user.

In GDN, the `_rev` strings are in fact time stamps. They use the local clock of the DBserver that actually writes the document and have millisecond accuracy. Actually, a "Hybrid Logical Clock" is used (for this concept see [this paper](http://www.cse.buffalo.edu/tech-reports/2014-04.pdf)).

Its value should be treated as opaque, no guarantees regarding its format and properties are given except that it will be different after a document update.Within one shard it is guaranteed that two different document revisions have a different `_rev` string, even if they are written in the same millisecond, and that these stamps are ascending.

:::note 
Different servers in cluster might have a clock skew, and therefore between different shards or even between different collections the time stamps are not guaranteed to be comparable. The Hybrid Logical Clock feature does one thing to address this issue: Whenever a message is sent from a node in cluster to another node, it is ensured that any timestamp taken on second node after the message has arrived is greater than any timestamp taken on first node before the message was sent. 
:::
The above ensures that if there is some **causality** between events on different servers, time stamps increase from cause to effect. A direct consequence of this is that sometimes a server has to take timestamps that seem to come from the future of its own clock. It will however still produce ever increasing time stamps. If the clock skew is small, then your time stamps will relatively accurately describe the time when the document revision was actually written.

GDN uses 64bit unsigned integer values to maintain document revisions internally. At this stage we intentionally do not document the exact format of the revision values. When returning document revisions to clients, C8 will put them into a string to ensure the revision is not clipped by clients that do not support big integers. 

:::note
The `_rev` attribute can be used as a pre-condition for queries, to avoid lost update situations. That is, if a client fetches a document from the server, modifies it locally (but with the _rev attribute untouched) and sends it back to the server to update the document, but meanwhile the document was changed by another operation, then the revisions do not match anymore and the operation is cancelled by the server. Without this mechanism, the client would accidentally overwrite changes made to the document without knowing about it.
:::
In order to find a particular revision of a document, you need the document handle or key, and the document revision.

**Multiple Documents in Single call:**

The basic document API has been designed to handle not only single documents but multiple documents in a single command. This is crucial for performance, in that it reduces the overhead of individual network round trips between the client and the server.

The general idea to perform multiple document operations in a single command is to use JSON arrays of objects in the place of a single document. As a consequence, document keys, handles and revisions for preconditions have to be supplied embedded in the individual documents given. Multiple document operations are restricted to a single document or edge collection.

**Working with Monetary Data:**

Applications that handle monetary data often require to capture fractional units of currency and need to emulate decimal rounding without precision loss. Compared to relational databases, JSON does not support arbitrary precision out-of-the-box but there are suitable workarounds.

There are two ways to handle monetary data:

* **Monetary data as integer:** If you store data as integer, decimals can be avoided by using a general scale factor, eg. 100 making 19.99 to 1999. This solution will work for digits of up to (excluding) 253 without precision loss. Calculations can then be done on the server side.

* **Monetary data as string:** If you only want to store and retrieve monetary data you can do so without any precision loss by storing this data as string. However, when using strings for monetary data values it will not be possible to do calculations on them on the server. Calculations have to happen in application logic that is capable of doing arithmetic on string-encoded integers.

**Data Retrieval:**

**Queries** are used to filter documents based on certain criteria, to compute new data, as well as to manipulate or delete existing documents. Queries can be as simple as a "query by example" or as complex as "joins" using many collections or traversing graph structures. They are written in the [C8 Query Language (C8QL)](c8ql/introduction.md).

**Cursors** are used to iterate over the result of queries, so that you get easily processable batches instead of one big hunk.

[**Indexes**](../collections/documents/indexing/overview.md) are used to speed up searches. There are various types of indexes, such as Persistent Indexes, TTL indexes, Search indexes and geo indexes.

### Graph model

In GDN, you can turn your documents into graph structures for semantic queries with nodes, edges and properties to represent and store data. A key concept of the system is the idea of a graph, which directly relates data items in the database.

In SQL databases, you have the notion of a relation table to store `n:m` relationships between two data tables. An `edge collection` is somewhat similar to these relation tables; A `vertex collection` resemble the data tables with the objects to connect.

While simple graph queries with fixed number of hops via the relation table may be doable in SQL with several nested joins, graph databases can handle an arbitrary number of these hops over edge collections.

Graph data models are particularly good at queries on graphs that involve paths in the graph of an a priori unknown length. For example, finding the shortest path between two vertices in a graph, or finding all paths that match a certain pattern starting at a given vertex are such examples.

### Search Views & Analyzers

GDN provides information retrieval features, natively integrated into C8QL query language and with support for all data models. It is primarily a full-text search engine, a much more powerful alternative to the `full-text index` type provided on the collections.

To support `search`, GDN introduces the concept of `Views` which can be seen as virtual collections. Each `View` represents an `inverted index` to provide fast full-text searching over one or multiple linked collections and holds the configuration for the search capabilities, such as the attributes to index. 

A `view` can cover multiple or even all attributes of the documents in the linked collections. Search results can be sorted by their similarity ranking to return the best matches first using popular scoring algorithms.

Configurable `Analyzers` are available for text processing, such as for tokenization, language-specific word stemming, case conversion, removal of diacritical marks (accents) from characters and more. Analyzers can be used standalone or in combination with Views for sophisticated searching.

The Search features are integrated into C8QL as SEARCH operation and a set of C8QL functions.

The Search features can be used to for various use cases like,

* Find information in a research database using stemmed phrases, case and accent insensitive, with irrelevant terms removed from the search index (stop word filtering), ranked by relevance based on term frequency (TFIDF).

* Perform federated full-text searches over product descriptions for a web shop, with the product documents stored in various collections.

* Query a movie dataset for titles with words in a particular order (optionally with wildcards), and sort the results by best matching (BM25) but favor movies with a longer duration.

### Streams

Streams are a type of collection in GDN to capture `data-in-motion`. Messages are sent via streams by publishers to consumers who then do something with the message. Streams can be created via client drivers (pyC8, jsC8), REST API or the web console.

Streams unifies `queuing` and `pub-sub messaging` into a unified messaging model that provides a lot of flexibility to users to consume messages in a way that is best for the use case at hand.

> producer --> stream --> subscription --> consumer

A stream is a named channel for sending messages. Each stream is backed by a `distributed append-only` log and can be `local` (at one edge location only) or `global` (across all edge locations in the Fabric).

Messages from publishers are only stored once on a stream, and can be consumed as many times as necessary by consumers. The stream is the source of truth for consumption. Although messages are only stored once on the stream, there can be different ways of consuming these messages.

Consumers are grouped together for consuming messages. Each group of consumers is a subscription on a stream. Each consumer group can have its own way of consuming the messages—exclusively, shared, or failover.

## Stream Processing

GDN is fundamentally a real-time materialized view engine. Streams & stream processing are intregral part of GDN. Stream processing feature provides users geo-replicated stream data processing capabilities to integrate streaming data and takes action based on streaming data.

:::note
Stream Workers is currently an Enterprise only feature. We will be rolling it out to all users in Q1 of 2022.
Please contact support@macrometa.com if you have any questions.
:::
![GDN Essentials](/img/gdn-cep-overview.png)

The stream processing can be used for

* `Transforming` your data from one format to another (e.g., to/from XML, JSON, AVRO, etc.).
* `Enriching data` received from a specific source by combining it with databases, services, etc., via inline calculations and custom functions.
* `Correlating data` streams by joining multiple streams to create an aggregate stream.
* `Cleaning data` by filtering it and by modifying the content (e.g., obfuscating) in messages.
* `Deriving insights` by identifying interesting patterns and sequences of events in data streams.
* `Summarizing data` as and when it is generated using temporal windows and incremental time series aggregations.
* `Real-time ETL` for Collections, tailing files, scraping HTTP Endpoints, etc.
* `Streaming Integrations` i.e., integrating streaming data as well as trigger actions based on data streams. The action can be a single request to a service or a complex enterprise integration flow.

## RestQL (Query as API)

RestQL are named, parameterized C8QL queries stored in GDN that can be executed from a dedicated REST endpoint. The RestQL will be created automatically globally and is available from the region closest to the user. We recommend using RestQL to build applications backed by GDN as opposed to querying with raw C8QL directly from application code or setting up a centralized middleware.

RestQLs can be created and updated using the GDN Console or by using the REST API directly. Each RestQL is tied to a specific query text and parameter set. You can set default values for query parameters (making them optional during executions of your RestQL), or you can make them mandatory for each execution (failing to pass along will result in an error).

Each RestQL is exposed as its own endpoint and is protected. The RestQLs are organized by the fabric (or database) enabling you to have different RestQLs for different geo-regions as well as for different fabrics within same region.

## Sharding & Replication

### Sharding

GDN organizes its `collection data` within a datacenter in shards. Sharding allows to use multiple machines in a single cluster. Shards are configured per collection so multiple shards of data form the collection as a whole. To determine in which shard the data is to be stored GDN performs a hash across the values. By default this hash is being created from `_key`.

The number of shards is fixed at `16`. There is no option for user to configure the number of shards. You can specify the `shard key` as part of the collection creation.

:::note
If you change the shard keys from their default ["_key"], then finding a document in the collection by its primary key involves a request to every single shard. Furthermore, in this case one can no longer prescribe the primary key value of a new document but must use the automatically generated one. This latter restriction comes from the fact that ensuring uniqueness of the primary key would be very inefficient if the user could specify the primary key.
:::
On which node in a cluster a particular shard is kept is decided by the system. There is no option to users to configure an affinity based on certain shard keys.

Unique indexes (hash, skiplist, persistent) on sharded collections are only allowed if the fields used to determine the shard key are also included in the list of attribute paths for the index:

|**ShardKeys** | **IndexKeys** |    |
|----------|-----------|----|
|a | a | ok |
|a | b | not ok|
|a | a, b |	ok |
|a, b| a | not ok|
|a, b| b | not ok|
|a, b| a, b| ok|
|a, b| a, b, c| ok|
|a, b, c| a, b |not ok|
|a, b, c| a, b, c| ok|

### Replication Within Datacenter

Replication within a datacenter is synchronous and works on a per-shard basis. The system configures for each collection, how many copies of each shard are kept in the cluster. The default is `2` replicas per datacenter. At any given time, one of the copies is declared to be the leader and all other replicas are followers.

Write operations for this shard are always sent to a instance that holds the leader copy, which in turn replicates the changes to all followers before the operation is considered to be done and reported back to the user.

Read operations are all served by the server holding the leader copy, this allows to provide snapshot semantics for complex transactions.

If an instance that holds a follower copy of a shard fails, then the leader can no longer synchronize its changes to that follower. After a short timeout (3 seconds), the leader gives up on the follower, declares it to be out of sync, and continues service without the follower. When the server with the follower copy comes back, it automatically resynchronizes its data with the leader and synchronous replication is restored.

If an instance that holds a leader copy of a shard fails, then the leader can no longer serve any requests. It will no longer send heartbeats. A supervision process takes the necessary action (after 15 seconds of missing heartbeats), namely to promote one of the servers that hold in-sync replicas of the shard to leader for that shard.

The other surviving replicas automatically resynchronize their data with the new leader. When the instance with the original leader copy comes back, it notices that it now holds a follower replica, resynchronizes its data with the new leader and order is restored.

All shard data synchronizations are done in an incremental way, such that resynchronizations are quick. This technology allows to move shards (follower and leader ones) between instances without service interruptions.

This allows to scale down a GDN cluster without service interruption, loss of fault tolerance or data loss. Furthermore, one can re-balance the distribution of the shards, either manually or automatically.

Similarly when messages are produced on a GDN stream, they are first persisted in the local datacenter and then forwarded asynchronously to the remote datacenters.

In normal cases, when there are no connectivity issues, messages are replicated immediately, at the same time as they are dispatched to consumers of local datacenter. Typically, end-to-end delivery latency is defined by the network round-trip time (RTT) between the remote regions.

Applications can create producers and consumers in any of the datacenters, even when the remote datacenters are not reachable (like during a network partition).

> Subscriptions are local to a GDN datacenter.

While producers and consumers can publish to and consume from any GDN datacenter, subscriptions are local to the GDN datacenter in which they are created and cannot be transferred between datacenters. If you do need to transfer a subscription, you’ll need to create a new subscription in the desired datacenter.

Say stream S1 is being replicated between 3 datacenters, `Datacenter-A`, `Datacenter-B`, and `Datacenter-C`. Also let's say each datacenter has 1 producer i.e., `P1`, `P2` and `P3`. Similarly assume `C1` & `C2` are consumers in `Datacenter-A` and `Datacenter-B` respectively.

Now all messages produced in any datacenter will be delivered to all subscriptions in all the other datacenters. So consumers C1 and C2 will receive all messages published by producers P1, P2, and P3. Ordering is still guaranteed on a per-producer basis.

### Replication Across Datacenters

GDN uses asynchronous causal ordered replication across DCs (regions). GDN enables data to be written or messages to be produced and consumed in different geo-locations. For instance, your application may write or publish data in one datacenter and consume in other datacenters. Geo-replication in GDN enables you to do that for all entities i.e., collections, documents, graphs, search, streams and stream processors.

Geo-replication is enabled at the geofabric level. Any message published on any global stream in that geofabric will then be replicated to all datacenters in the specified set. Similarly any document added to any collection in that geofabric will be replicated to all datacenters associated with that geofabric.
