---
title: tcp (Source)
---

A Stream App application can be configured to receive events via the TCP
transport by adding the `type='tcp'` annotation at the top
of an event stream definition. When this is defined the associated
stream will receive events from the TCP transport on the host and port
defined in the system.

Syntax

    CREATE SOURCE <NAME> WITH (type="tcp", map.type="<STRING>", context="<STRING>")

## Query Parameters

| Name    | Description                                                    | Default Value | Possible Data Types | Optional | Dynamic |
|---------|----------------------------------------------------------------|---------------|---------------------|----------|---------|
| context | The URL `context` that should be used to receive the events. | /             | STRING              | Yes      | No      |

System Parameters

| Name             | Description                                                                                                                                                                                                                                                                                                        | Default Value | Possible Parameters                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------|
| host             | Tcp server host.                                                                                                                                                                                                                                                                                                   | 0.0.0.0       | Any valid host or IP                |
| port             | Tcp server port.                                                                                                                                                                                                                                                                                                   | 9892          | Any integer representing valid port |
| receiver.threads | Number of threads to receive connections.                                                                                                                                                                                                                                                                          | 10            | Any positive integer                |
| worker.threads   | Number of threads to serve events.                                                                                                                                                                                                                                                                                 | 10            | Any positive integer                |
| tcp.no.delay     | This is to specify whether to disable Nagle algorithm during message passing. If tcp.no.delay = `true`, the execution of Nagle algorithm will be disabled in the underlying TCP logic. Hence there will be no delay between two successive writes to the TCP connection. Else there can be a constant ack delay. | true          | true false                          |
| keep.alive       | This property defines whether the server should be kept alive when there are no connections available.                                                                                                                                                                                                             | true          | true false                          |

## Example 1

    CREATE SOURCE Foo WITH (type = 'tcp', context='abc', map.type='binary') (attribute1 string, attribute2 int );

Under this configuration, events are received via the TCP transport on
default host,port, `abc` context, and they are passed to `Foo` stream
for processing.
