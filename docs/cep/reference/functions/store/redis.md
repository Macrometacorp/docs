---
title: redis (Store)
---

This extension assigns data source and connection instructions to event
tables. It also implements read write operations on connected
datasource. This extension only can be used to read the data which
persisted using the same extension since unique implementation has been
used to map the relational data in to redis's key and value
representation

Syntax

    @PrimaryKey("PRIMARY_KEY")
    @Index("INDEX")
    CREATE STORE <NAME> WITH (type="redis", table.name="<STRING>", cluster.mode="<BOOL>", nodes="<STRING>", ttl.seconds="<LONG>", ttl.on.update="<BOOL>", ttl.on.read="<BOOL>")

## Query Parameters

| Name          | Description                                                                                                                                                                                                                                                                                                  | Default Value                           | Possible Data Types | Optional | Dynamic |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------------|----------|---------|
| table.name    | The name with which the event table should be persisted in the store. If noname is specified via this parameter, the event table is persisted with the same name as the Stream App table.                                                                                                                        | The tale name defined in the stream processor app | STRING              | Yes      | No      |
| cluster.mode  | This will decide the redis mode. if this is false, client will connect to a single redis node.                                                                                                                                                                                                               | false                                   | BOOL                | No       | No      |
| nodes         | host, port and the password of the node(s).In single node mode node details can be provided as follows- "node=`hosts:port\@password`\ In clustered mode host and port of all the master nodes should be provided separated by a comma(,). As an example "nodes = `localhost:30001,localhost:30002`". | localhost:6379\@root                    | STRING              | Yes      | No      |
| ttl.seconds   | Time to live in seconds for each record                                                                                                                                                                                                                                                                      | -1                                      | LONG                | Yes      | No      |
| ttl.on.update | Set ttl on row update                                                                                                                                                                                                                                                                                        | false                                   | BOOL                | Yes      | No      |
| ttl.on.read   | Set ttl on read rows                                                                                                                                                                                                                                                                                         | false                                   | BOOL                | Yes      | No      |

## Example 1

    CREATE STORE fooTable WITH (type='redis',nodes='localhost:6379@root',table.name='fooTable',cluster.mode=false) (time long, date String)

Above example will create a redis table with the name fooTable and work
on asingle redis node.

## Example 2

    @Store(type='redis', table.name='SweetProductionTable', nodes='localhost:30001,localhost:30002,localhost:30003', cluster.mode='true')
    @primaryKey('symbol')
    @index('price')
    CREATE STORE SweetProductionTable (symbol string, price float, volume long);

Above example demonstrate how to use the redis extension to connect in
to redis cluster. Please note that, as nodes all the master node's host
and port should be provided in order to work correctly. In clustered
node password will not besupported

## Example 3

    CREATE STORE fooTable WITH (type='redis',nodes='localhost:6379@root',table.name='fooTable', ttl.seconds='30', ttl.onUpdate='true', ttl.onRead='true') (time long, date String)

Above example will create a redis table with the name fooTable and work
on asingle redis node. All rows inserted, updated or read will have its
ttl set to 30 seconds
