---
title: nats (Sink)
---

NATS Sink allows users to subscribe to a NATS broker and publish messages.

Syntax

    CREATE SINK <NAME> WITH (type="nats", map.type="<STRING>", destination="<STRING>", bootstrap.servers="<STRING>", client.id="<STRING>", cluster.id="<STRING>")

## Query Parameters

| Name              | Description                                                                                                                               | Default Value         | Possible Data Types | Optional | Dynamic |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|---------------------|----------|---------|
| destination       | Subject name which NATS sink should publish to.                                                                                           |                       | STRING              | No       | Yes     |
| bootstrap.servers | The NATS based url of the NATS server.                                                                                                    | nats://localhost:4222 | STRING              | Yes      | No      |
| client.id         | The identifier of the client publishing/connecting to the NATS broker. Should be unique for each client connecting to the server/cluster. | None                  | STRING              | Yes      | No      |
| cluster.id        | The identifier of the NATS server/cluster.                                                                                                | test-cluster          | STRING              | Yes      | No      |

## Example 1

    CREATE SINK outputStream WITH (type='nats', map.type='xml', destination='SP_NATS_OUTPUT_TEST', bootstrap.servers='nats://localhost:4222',client.id='nats_client',server.id='test-cluster') (name string, age int, country string);

This example shows how to publish to a NATS subject with all supporting configurations. With the following configuration the sink identified as `nats-client` will publish to a subject named as `SP_NATS_OUTPUT_TEST` which resides in a nats instance with a cluster id of `test-cluster`, running in localhost and listening to the port 4222 for client connection.

## Example 2

    CREATE SINK outputStream WITH (type='nats', map.type='xml', destination='SP_NATS_OUTPUT_TEST') (name string, age int, country string);

This example shows how to publish to a NATS subject with mandatory configurations. With the following configuration the sink identified with an auto generated client id will publish to a subject named as `SP_NATS_OUTPUT_TEST` which resides in a nats instance with a cluster id of `test-cluster`, running in localhost and listening to the port 4222 for client connection.
