---
title: Sharding and Replication
---

GDN uses the concepts of _shards_ and _replication_ to provide redundancy and availability.

### Sharding

Collection data is stored in shards. Shards are configured per collection so multiple shards of data form the collection as a whole. To determine which shard should store data, GDN performs a hash across the values. By default this hash is created from `_key`.

The number of shards is fixed at `16` and cannot be changed. You can specify the `shard key` as part of the collection creation.

:::note

If you change the shard keys from their default (`_key`), the following limitations apply:

- Any queries will need to send a request to every shard in the collection.
- For new documents, you must use an automatically generated `_key`.

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

Geo-replication is enabled at the fabric level. The fabric is replicated to all datacenters in the specified set any time messages are published to global streams or documents are added to collections.
