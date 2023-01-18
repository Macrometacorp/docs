---
title: mongodb (Store)
---

MongoDB Event Table can be configured to persist events in a MongoDB of user's choice.

## Syntax

    @Store(type="mongodb", mongodb.uri="<STRING>", collection.name="<STRING>", secure.connection="<STRING>", trust.store="<STRING>", trust.store.password="<STRING>", key.store="<STRING>", key.store.password="<STRING>")
    @PrimaryKey("PRIMARY_KEY")
    @Index("INDEX")

## Query Parameters

| Name         | Description           | Default Value          | Possible Data Types | Optional | Dynamic |
|--------------|------------------------------|----------------------|---------------------|----------|---------|
| mongodb.uri          | The MongoDB URI for the MongoDB data store. The uri must be of the format mongodb://[username:password@]host1[:port1][,hostN[:portN]][/[database][?options]] The options specified in the uri will override any connection options specified in the deployment yaml file.  Note: The user should have read permissions to the admindb as well as read/write permissions to the database accessed. |             | STRING              | No       | No      |
| collection.name      | The name of the collection in the store this Event Table should be persisted as.     | Name of the stream processor event table.        | STRING              | Yes      | No      |
| secure.connection    | Describes enabling the SSL for the mongodb connection      | false     | STRING              | Yes      | No      |
| trust.store       | File path to the trust store.        | \${carbon.home}/resources/security/client-truststore.jks | STRING         | Yes      | No      |
| trust.store.password | Password to access the trust store.        | gdncarbon      | STRING              | Yes      | No      |
| key.store            | File path to the keystore.             | \${carbon.home}/resources/security/client-truststore.jks | STRING         | Yes      | No      |
| key.store.password   | Password to access the keystore.         | gdncarbon          | STRING              | Yes      | No      |

## System Parameters

| Name        | Description            | Default Value          | Possible Parameters        |
|-------------|---------------------|-----------------------|---------------------------|
| applicationName         | Sets the logical name of the application using this MongoClient. The application name might be used by the client to identify the application to the server, for use in server logs, slow query logs, and profile collection.           | null          | the logical name of the application using this MongoClient. The UTF-8 encoding may not exceed 128 bytes.       |
| cursorFinalizerEnabled           | Sets whether cursor finalizers are enabled.               | true           | true false             |
| requiredReplicaSetName       | The name of the replica set.        | null       | the logical name of the replica set           |
| sslEnabled       | Sets whether to initiate connection with TSL/SSL enabled. true: Initiate the connection with TLS/SSL. false: Initiate the connection without TLS/SSL.     | false        | true false        |
| trustStore         | File path to the trust store.        | \${carbon.home}/resources/security/client-truststore.jks | Any valid file path.    |
| trustStorePassword    | Password to access the trust store.      | gdncarbon       | Any valid password.          |
| keyStore      | File path to the keystore.            | \${carbon.home}/resources/security/client-truststore.jks | Any valid file path.     |
| keyStorePassword   | Password to access the keystore.         | gdncarbon          | Any valid password.                |
| connectTimeout                               | The time in milliseconds to attempt a connection before timing out.        | 10000       | Any positive integer          |
| connectionsPerHost      | The maximum number of connections in the connection pool.     | 100     | Any positive integer         |
| minConnectionsPerHost    | The minimum number of connections in the connection pool.         | 0       | Any natural number         |
| maxConnectionIdleTime    | The maximum number of milliseconds that a connection can remain idle in the pool before being removed and closed. A zero value indicates no limit to the idle time. A pooled connection that has exceeded its idle time will be closed and replaced when necessary by a new connection. | 0      | Any positive integer    |
| maxWaitTime     | The maximum wait time in milliseconds that a thread may wait for a connection to become available. A value of 0 means that it will not wait. A negative value means to wait indefinitely    | 120000        | Any integer     |
| threadsAllowedToBlockForConnectionMultiplier | The maximum number of connections allowed per host for this MongoClient instance. Those connections will be kept in a pool when idle. Once the pool is exhausted, any operation requiring a connection will block waiting for an available connection.     | 100     | Any natural number    |
| maxConnectionLifeTime      | The maximum life time of a pooled connection. A zero value indicates no limit to the life time. A pooled connection that has exceeded its life time will be closed and replaced when necessary by a new connection.     | 0      | Any positive integer     |
| socketKeepAlive   | Sets whether to keep a connection alive through firewalls       | false           | true false      |
| socketTimeout       | The time in milliseconds to attempt a send or receive on a socket before the attempt times out. Default 0 means never to timeout.     | 0       | Any natural integer          |
| writeConcern      | The write concern to use.         | acknowledged       | acknowledged w1 w2 w3 unacknowledged fsynced journaled replica\_acknowledged normal safe majority fsync\_safe journal\_safe replicas\_safe |
| readConcern     | The level of isolation for the reads from replica sets.             | default      | local majority linearizable         |
| readPreference      | Specifies the replica set read preference for the connection.       | primary     | primary secondary secondarypreferred primarypreferred nearest                                                                              |
| localThreshold     | The size (in milliseconds) of the latency window for selecting among multiple suitable MongoDB instances.       | 15   | Any natural number     |
| serverSelectionTimeout    | Specifies how long (in milliseconds) to block for server selection before throwing an exception. A value of 0 means that it will timeout immediately if no server is available. A negative value means to wait indefinitely.     | 30000      | Any integer     |
| heartbeatSocketTimeout    | The socket timeout for connections used for the cluster heartbeat. A value of 0 means that it will timeout immediately if no cluster member is available. A negative value means to wait indefinitely.      | 20000   | Any integer    |
| heartbeatConnectTimeout     | The connect timeout for connections used for the cluster heartbeat. A value of 0 means that it will timeout immediately if no cluster member is available. A negative value means to wait indefinitely.   | 20000        | Any integer      |
| heartbeatFrequency     | Specify the interval (in milliseconds) between checks, counted from the end of the previous check until the beginning of the next one.   | 10000     | Any positive integer       |
| minHeartbeatFrequency      | Sets the minimum heartbeat frequency. In the event that the SDK has to frequently re-check a server's availability, it will wait at least this long since the previous check to avoid wasted effort.    | 500    | Any positive integer      |

## Example

    @PrimaryKey("symbol")
    @Index("volume:1", {background:true,unique:true}")
    CREATE STORE FooTable WITH (type="mongodb",mongodb.uri="mongodb://admin:admin@localhost/Foo") (symbol string, price float, volume long);

This will create a collection called FooTable for the events to be saved
with symbol as Primary Key(unique index at mongoDB level) and index for
the field volume will be created in ascending order with the index
option to create the index in the background. Note: @PrimaryKey: This
specifies a list of comma-separated values to be treated as unique
fields in the table. Each record in the table must have a unique
combination of values for the fields specified here. @Index: This
specifies the fields that must be indexed at the database level. You can
specify multiple values as a come-separated list. A single value to be
in the format, `<FieldName>:<SortOrder>`. The last element is optional
through which a valid index options can be passed.

`<SortOrder>`: 1 for Ascending & -1 for Descending. Optional, with default value as 1. 
`<IndexOptions>`: Index Options must be defined inside curly brackets.             

Options must follow the standard mongodb index options format.
            https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/
Example 1: @Index(`'symbol:1'`, `'{"unique":true}'`)
Example 2: @Index(`'symbol'`, `'{"unique":true}'`)
Example 3: @Index(`'symbol:1'`, `'volume:-1'`, `'{"unique":true}'`)
