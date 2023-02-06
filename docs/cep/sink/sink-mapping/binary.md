---
title: binary
---

This section explains how to map events processed via stream worker in order to publish them in the `binary` format.

## Syntax

    CREATE SINK <NAME> WITH (map.type="binary")

## Example 1

    CREATE SINK FooStream WITH (type='stream', topic='gdn', map.type='binary') (symbol string, price float, volume long);

This will publish stream worker event in binary format.
