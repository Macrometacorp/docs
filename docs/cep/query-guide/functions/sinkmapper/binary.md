---
title: binary (Sink Mapper)
---

This section explains how to map events processed via Stream App in order to publish them in the `binary` format.

Syntax

    CREATE SINK <NAME> WITH (map.type="binary")


## Example 1

    CREATE SINK FooStream WITH (type='inMemory', topic='gdn', map.type='binary') (symbol string, price float, volume long);


This will publish Stream App event in binary format.
