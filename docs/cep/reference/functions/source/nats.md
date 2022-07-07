---
title: nats (Source)
---

NATS Source allows users to subscribe to a NATS broker and receive
messages. It has the ability to receive all the message types supported
by NATS.

Syntax

    CREATE SOURCE <NAME> WITH (type="nats", map.type="<STRING>", destination="<STRING>", bootstrap.servers="<STRING>", client.id="<STRING>", cluster.id="<STRING>", queue.group.name="<STRING>", durable.name="<STRING>", subscription.sequence="<STRING>")

## Query Parameters

| Name                  | Description                                                                                                                                                                                                                                       | Default Value         | Possible Data Types | Optional | Dynamic |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|---------------------|----------|---------|
| destination           | Subject name which NATS Source should subscribe to.                                                                                                                                                                                               |                       | STRING              | No       | No      |
| bootstrap.servers     | The NATS based url of the NATS server.                                                                                                                                                                                                            | nats://localhost:4222 | STRING              | Yes      | No      |
| client.id             | The identifier of the client subscribing/connecting to the NATS broker.                                                                                                                                                                           | None                  | STRING              | Yes      | No      |
| cluster.id            | The identifier of the NATS server/cluster.                                                                                                                                                                                                        | test-cluster          | STRING              | Yes      | No      |
| queue.group.name      | This can be used when there is a requirement to share the load of a NATS subject. Clients belongs to the same queue group share the subscription load.                                                                                            | None                  | STRING              | Yes      | No      |
| durable.name          | This can be used to subscribe to a subject from the last acknowledged message when a client or connection failure happens. The client can be uniquely identified using the tuple (client.id, durable.name).                                       | None                  | STRING              | Yes      | No      |
| subscription.sequence | This can be used to subscribe to a subject from a given number of message sequence. All the messages from the given point of sequence number will be passed to the client. If not provided then the either the persisted value or 0 will be used. | None                  | STRING              | Yes      | No      |

## Example 1

    CREATE SOURCE inputStream WITH (type='nats', map.type='text', destination='SP_NATS_INPUT_TEST', bootstrap.servers='nats://localhost:4222',client.id='nats_client',server.id='test-cluster',queue.group.name = 'group_nats',durable.name = 'nats-durable',subscription.sequence = '100') (name string, age int, country string);

This example shows how to subscribe to a NATS subject with all
supporting configurations.With the following configuration the source
identified as `nats-client` will subscribes to a subject named as
`SP_NATS_INPUT_TEST` which resides in a nats instance with a
cluster id of `test-cluster`, running in localhost and listening to
the port 4222 for client connection. This subscription will receive all
the messages from 100th in the subject.

## Example 2

    CREATE SOURCE inputStream WITH (type='nats', map.type='text', destination='SP_NATS_INPUT_TEST') (name string, age int, country string);

This example shows how to subscribe to a NATS subject with mandatory
configurations.With the following configuration the source identified
with an auto generated client id will subscribes to a subject named as
`SP_NATS_INTPUT_TEST` which resides in a nats instance with a
cluster id of `test-cluster`, running in localhost and listening to
the port 4222 for client connection. This will receive all available
messages in the subject

## Example 3

    CREATE SOURCE inputStream WITH (type='nats', map.type='json', map.attributes="name='$.name', age='$.age', country='$.country', sequenceNum='trp:sequenceNumber'", destination='SIDDHI_NATS_SOURCE_TEST_DEST', client.id='nats_client', bootstrap.servers='nats://localhost:4222', cluster.id='test-cluster') (name string, age int, country string, sequenceNum string);

This example shows how to pass NATS Streaming sequence number to the
event.
