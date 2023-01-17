---
sidebar_position: 1
title: Sink
---

The pages in this section show you how to use various sinks in Macrometa GDN stream workers, including streams, HTTP, and Kafka.

Sinks are used to publish events to an external source after being processed. Sinks consume events from streams and publish them via multiple transports to external endpoints in various data formats.

### Create streams

## Syntax

General syntax for creating a sink requires a sink name and definition of the `type` of sink. There are other parameters that depend on the type of sink you are using. For more information, refer to the pages in this section.

```sql
   CREATE SINK SinkName WITH (type="type", other.parameters="depends on the sink type") (strings);
```

### Example Stream Sink

```sql
   CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```

### Example HTTP Sink

```sql
CREATE SINK <NAME> WITH (type="http", map.type="<STRING>" publisher.url="<STRING>", basic.auth.username="<STRING>", basic.auth.password="<STRING>", https.truststore.file="<STRING>", https.truststore.password="<STRING>", oauth.username="<STRING>", oauth.password="<STRING>", consumer.key="<STRING>", consumer.secret="<STRING>", token.url="<STRING>", refresh.token="<STRING>", headers="<STRING>", method="<STRING>", socket.idle.timeout="<INT>", chunk.disabled="<BOOL>", ssl.protocol="<STRING>", ssl.verification.disabled="<BOOL>", tls.store.type="<STRING>", ssl.configurations="<STRING>", proxy.host="<STRING>", proxy.port="<STRING>", proxy.username="<STRING>", proxy.password="<STRING>", client.bootstrap.configurations="<STRING>", max.pool.active.connections="<INT>", min.pool.idle.connections="<INT>", max.pool.idle.connections="<INT>", min.evictable.idle.time="<STRING>", time.between.eviction.runs="<STRING>", max.wait.time="<STRING>", test.on.borrow="<BOOL>", test.while.idle="<BOOL>", exhausted.action="<INT>", hostname.verification.enabled="<BOOL>")
```

## Query Parameters

| Name             | Description           | Default Value | Possible Data Types | Optional |
|------------------|----------------------------------------|---------------|---------------------|----------|
| stream           | The streams to which the sink needs to publish events.          | STRING        | No                  |
| replication.type | Specifies if the replication type of the stream. Possible values can be `local` and `global`. | local         | STRING       | Yes      |
