# Introduction

Macrometa Global Data Network (GDN) is a geo-distributed, real-time, coordination-free materialized views engine. GDN supports multiple data models, making it flexible and compatible with many database types.

When you choose a database or stream processing system, you're actually choosing three technologies: storage, a data model, and an API and query language.

!!! example
    If you choose Postgres, you are choosing the Postgres storage engine, a relational data model, and the SQL query language. 
    
    If you choose MongoDB, you are choosing the MongoDB distributed storage engine, a document data model, and the MongoDB API. 
    
    In systems like these, features are integrated across all layers. For example, an index provided by a data model is automatically integrated into the storage and query language.


Document databases, graph databases, key-value stores, pub-sub streams, and queues make sense in the right context, and different parts of an application might call for different choices. This creates a tough decision: Use a whole new database or new streaming system to support a new data model, or try to shoehorn data into your existing database or messaging system.

Macrometa GDN decouples its data storage technology from its data model. You can efficiently adapt and remap real-time materialized views and log storage technology to a broad array of rich data models and streams.

![GDN Internals](images/macrometa-internals.png)

In a single datacenter, GDN is a *geo-distributed CP master/master* model with no single point of failure:

* *Geo-distributed* means data is replicated between multiple regions, enabling clients to send requests to any region and view the same results after any latency.
* *CP* means GDN prefers consistency and partition tolerance over availability, verifying that all incoming data is processed properly before being made available to users. For more information, refer to [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem).
* *Master/master* means we use [multi-master replication](https://en.wikipedia.org/wiki/Multi-master_replication), enabling clients to send requests to an arbitrary node in a data center and view the same results. This means there is no single point of failure, so the cluster can continue to serve requests even if one machine fails completely.

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

* [Collections](../collections/quickstart.md) are groups of JSON documents. A GeoFabric can store unlimited collections, and collections can store unlimited documents. A collection can be a `kv` or `document` collection.
* [Graphs](../collections/graphs/quickstart.md) consist of vertices and edges. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices).
* [Search](../search/Overview.md) is a full-text search engine for information retrieval on one or more linked collections. Also referred to as `views`.
* [Streams](../streams/quickstart.md) are a type of collection that capture data in motion. Streams support both pub-sub and queuing models. Messages are sent via streams by publishers to consumers who then do something with the message.
* [Stream workers](../cep/quickstart.md) perform complex event processing in real-time on streams.

For more information about GeoFabrics, refer to the [GeoFabrics](geofabrics.md) section.

## RestQL (Query as API)

A RestQL is set of named, parameterized C8QL queries stored in GDN that can be executed from a dedicated REST endpoint. The RestQL will be created automatically globally and is available from the region closest to the user. We recommend using RestQL to build applications backed by GDN as opposed to querying with raw C8QL directly from application code or setting up a centralized middleware.

RestQLs can be created and updated using the GDN Console or by using the REST API directly. Each RestQL is tied to a specific query text and parameter set. You can set default values for query parameters (making them optional during executions of your RestQL), or you can make them mandatory for each execution (failing to pass along will result in an error).

Each RestQL is exposed as its own endpoint and is protected. The RestQLs are organized by the GeoFabric (or database) enabling you to have different RestQLs for different geo-regions as well as for different fabrics within same region.

For more information, refer to the [C8 Query Language](../c8ql/introduction.md) section.

## Sharding & Replication

### Sharding

GDN organizes its collection data within a datacenter in shards. Sharding allows to use multiple machines in a single cluster. Shards are configured per collection so multiple shards of data form the collection as a whole. To determine in which shard the data is to be stored GDN performs a hash across the values. By default this hash is being created from `_key`.

The number of shards is fixed at `16`. There is no option for user to configure the number of shards. You can specify the `shard key` as part of the collection creation.

!!! note
    If you change the shard keys from their default ["_key"], then finding a document in the collection by its primary key involves a request to every single shard. Furthermore, in this case one can no longer prescribe the primary key value of a new document but must use the automatically generated one. This latter restriction comes from the fact that ensuring uniqueness of the primary key would be very inefficient if the user could specify the primary key.

GDN automatically distributes shards across nodes in a cluster.

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

While producers and consumers can publish to and consume from any GDN datacenter, subscriptions are local to the GDN datacenter in which they are created and cannot be transferred between datacenters. If you do need to transfer a subscription, you'll need to create a new subscription in the desired datacenter.

Say stream S1 is being replicated between 3 datacenters, `Datacenter-A`, `Datacenter-B`, and `Datacenter-C`. Also let's say each datacenter has 1 producer i.e., `P1`, `P2` and `P3`. Similarly assume `C1` & `C2` are consumers in `Datacenter-A` and `Datacenter-B` respectively.

Now all messages produced in any datacenter will be delivered to all subscriptions in all the other datacenters. So consumers C1 and C2 will receive all messages published by producers P1, P2, and P3. Ordering is still guaranteed on a per-producer basis.

### Replication Across Datacenters

GDN uses asynchronous causal ordered replication across DCs (regions). GDN enables data to be written or messages to be produced and consumed in different geo-locations. For instance, your application may write or publish data in one datacenter and consume in other datacenters. Geo-replication in GDN enables you to do that for all entities i.e., collections, documents, graphs, search, streams and stream processors.

Geo-replication is enabled at the GeoFabric level. Any message published on any global stream in that GeoFabric will then be replicated to all datacenters in the specified set. Similarly any document added to any collection in that GeoFabric will be replicated to all datacenters associated with that GeoFabric.
