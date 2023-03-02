---
title: websocket
---





A stream worker application can be configured to receive events via the TCP transport by adding the `type='tcp'` annotation at the top of an event stream definition. When this is defined the associated stream will receive events from the TCP transport on the host and port defined in the system.

## Syntax

    CREATE SOURCE <NAME> WITH (type="tcp", map.type="<STRING>", context="<STRING>")

## Query Parameters



## Example 1

    CREATE SOURCE Foo WITH (type = 'tcp', context='abc', map.type='binary') (attribute1 string, attribute2 int );

Under this configuration, events are received via the TCP transport on default host,port, `abc` context, and they are passed to `Foo` stream for processing.
