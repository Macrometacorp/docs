---
sidebar_position: 30
title: What is Macrometa
---

Macrometa Global Data Network (GDN) is a geo-distributed, real-time, coordination-free materialized views engine. GDN supports multiple data models, making it flexible and compatible with many database types.

When you choose a database or stream processing system, you're actually choosing three technologies: storage, a data model, and an API and query language.

:::note Example

If you choose Postgres, you are choosing the Postgres storage engine, a relational data model, and the SQL query language. 
    
If you choose MongoDB, you are choosing the MongoDB distributed storage engine, a document data model, and the MongoDB API. 
    
In systems like these, features are integrated across all layers. For example, an index provided by a data model is automatically integrated into the storage and query language.

:::

Document databases, graph databases, key-value stores, pub-sub streams, and queues make sense in the right context, and different parts of an application might call for different choices. This creates a tough decision: Use a whole new database or new streaming system to support a new data model, or try to shoehorn data into your existing database or messaging system.

Macrometa GDN decouples its data storage technology from its data model. You can efficiently adapt and remap real-time materialized views and log storage technology to a broad array of rich data models and streams.

![GDN Internals](/img/macrometa-internals.png)

In a single datacenter, GDN is a _geo-distributed CP master/master_ model with no single point of failure:

* _Geo-distributed_ means data is replicated between multiple regions, enabling clients to send requests to any region and view the same results after any latency.
* _CP_ means GDN prefers consistency and partition tolerance over availability, verifying that all incoming data is processed properly before being made available to users. For more information, refer to [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem).
* _Master/master_ means we use [multi-master replication](https://en.wikipedia.org/wiki/Multi-master_replication), enabling clients to send requests to an arbitrary node in a data center and view the same results. This means there is no single point of failure, so the cluster can continue to serve requests even if one machine fails completely.

This section gives a short outline of the GDN architecture for a single data center.

Macrometa GDN provides the following data models and capabilities:

* Key-value stores.
* Document stores.
* Graphs database.
* Global search.
* [Publish-subscribe (pub-sub)](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) streams.
* Stateful stream processing.

GDN enables you to push data to applications in real-time across multiple data centers, dramatically reducing the time and effort needed to build scalable real-time apps.

## GeoFabrics

A GeoFabric is a collection of edge data centers linked together as a single high-performance virtual cloud. Each GeoFabric consists of storage, networking, and processing functions. A GeoFabric is created when a tenant account is provisioned with the edge locations. 

Each GeoFabric contains collections (key-value and documents), graphs, streams, stream processors and search capabilities. Data written to a GeoFabric is pinned to the locations that are part of the GeoFabric.

A tenant can have multiple GeoFabrics. Each GeoFabric isolates its contained data from other GeoFabrics. 

Each GeoFabric contains the following:

* [Collections](collections/index.md) are groups of JSON documents. A GeoFabric can store unlimited collections, and collections can store unlimited documents. A collection can be a `kv` or `document` collection.
* [Graphs](collections/graphs/quickstart.md) consist of vertices and edges. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices).
* [Search](search/index.md) is a full-text search engine for information retrieval on one or more linked collections. Also referred to as `views`.
* [Streams](streams/quickstart.md) are a type of collection that capture data in motion. Streams support both pub-sub and queuing models. Messages are sent via streams by publishers to consumers who then do something with the message.
* [Stream workers](cep/index.md) perform complex event processing in real-time on streams.

For more information about GeoFabrics, refer to the [GeoFabrics](geofabrics.md) section.

## Query Workers (Query as API)

A Query Worker is set of named, parameterized C8QL queries stored in GDN that you can run from a dedicated REST endpoint. The Query Worker will be created automatically globally and is available from the region closest to the user. We recommend using Query Workers to build applications backed by GDN as opposed to querying with raw C8QL directly from application code or setting up a centralized middleware.

Query Workers can be created and updated using the GDN Console or by using the REST API directly. Each Query Worker is tied to a specific query text and parameter set. You can set default values for query parameters (making them optional during runs of your Query Worker), or you can make them mandatory for each run (failing to pass along will result in an error).

Each Query Worker is exposed as its own endpoint and is protected. The Query Workers are organized by the GeoFabric (or database) enabling you to have different Query Workers for different geo-regions as well as for different fabrics within same region.

For more information, refer to the [C8 Query Language](c8ql/index.md) section.

## Sharding and Replication

GDN uses the concepts of _shards_ and _replication_ to provide redundancy and availability.

### Sharding

Collection data is stored in shards. Shards are configured per collection so multiple shards of data form the collection as a whole. To determine which shard should store data, GDN performs a hash across the values. By default this hash is created from `_key`.

The number of shards is fixed at `16` and cannot be changed. You can specify the `shard key` as part of the collection creation.

:::note

If you change the shard keys from their default (`_key`), the following limitations apply:
    
* Any queries will need to send a request to every shard in the collection. 
* For new documents, you must use an automatically generated `_key`.

:::

GDN automatically distributes shards across nodes in a cluster.

If you want to use unique indexes (hash, skiplist, persistent) on sharded collections, you must include the fields used to determine the shard key as index attributes:

|ShardKeys | IndexKeys |    |
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

Replication within a datacenter is synchronous and works on a per-shard basis. GDN configures each collection, how many copies of each shard are kept in the cluster. The default number of shard replicas per datacenter is `2`. 

A replica can be declared as the leader and all other replicas become followers. GDN commits write operations to the leader before replicating to followers, then shows confirmation to the user. Read operations are hosted by the server with the leader replica.

If an instance that holds a follower copy of a shard fails, the leader can no longer synchronize its changes to that follower. After a short timeout (3 seconds), the leader gives up on the follower, declares it to be out of sync, and continues service without the follower. When the server with the follower copy comes back, it automatically resynchronizes its data with the leader and synchronous replication is restored.

If an instance that holds a leader copy of a shard fails, then the leader can no longer serve any requests. After 15 seconds of missed heartbeats, the supervision process promotes another shard to become the leader. The other surviving replicas automatically synchronize their data with the new leader. When the instance with the original leader comes online, it becomes a follower and synchronizes its data with the leader. Both leader and follower shards can be moved between instances without service interruptions.

Applications can create producers and consumers in any shard. If follower shards are not reachable, the producers and consumers are automatically synchronized when the follower shard comes back online. Ordering is still guaranteed on a per-producer basis. However, subscriptions are local so you must recreate the subscription in the desired datacenter.

### Replication Across Datacenters

When replicating across datacenters (also known as _geo-replication_), GDN uses asynchronous causal ordered replication. Messages can be be produced and consumed in any region.

Geo-replication is enabled at the GeoFabric level. The GeoFabric is replicated to all datacenters in the specified set any time messages are published to global streams or documents are added to collections.
