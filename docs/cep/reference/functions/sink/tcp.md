---
title: tcp (Sink)
---

A Stream App application can be configured to publish events via the TCP transport by adding the `type='tcp'` annotation at the top of an event stream definition.

Syntax

    CREATE SINK <NAME> WITH (type="tcp", map.type="<STRING>", url="<STRING>", sync="<STRING>", tcp.no.delay="<BOOL>", keep.alive="<BOOL>", worker.threads="<INT|LONG>")


## Query Parameters

| Name           | Description                                                                                                                                                                                                                                                                                                        | Default Value | Possible Data Types | Optional | Dynamic |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| url            | The URL to which outgoing events should be published via TCP. The URL should adhere to `tcp://<host>:<port>/<context>` format.                                                                                                                                                                                     |               | STRING              | No       | No      |
| sync           | This parameter defines whether the events should be published in a synchronized manner or not. If sync = `true`, then the worker will wait for the ack after sending the message. Else it will not wait for an ack.                                                                                              | false         | STRING              | Yes      | Yes     |
| tcp.no.delay   | This is to specify whether to disable Nagle algorithm during message passing. If tcp.no.delay = `true`, the execution of Nagle algorithm will be disabled in the underlying TCP logic. Hence there will be no delay between two successive writes to the TCP connection. Else there can be a constant ack delay. | true          | BOOL                | Yes      | No      |
| keep.alive     | This property defines whether the server should be kept alive when there are no connections available.                                                                                                                                                                                                             | true          | BOOL                | Yes      | No      |
| worker.threads | Number of threads to publish events.                                                                                                                                                                                                                                                                               | 10            | INT LONG            | Yes      | No      |

## Example 1

    CREATE SINK Foo WITH (type = 'tcp', url='tcp://localhost:8080/abc', sync='true' map.type='binary') (attribute1 string, attribute2 int);

A sink of type `tcp` has been defined. All events arriving at Foo stream via TCP transport will be sent to the url `tcp://localhost:8080/abc` in a synchronous manner.
