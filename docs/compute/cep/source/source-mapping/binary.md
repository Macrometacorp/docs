---
title: binary
---

This extension is a binary input mapper that converts events received in `binary` format to stream worker events before they are processed.

## Syntax

    CREATE SOURCE <NAME> WITH (map.type="binary")

## Example 1

    CREATE SOURCE FooStream WITH (type='stream', topic='gdn', map.type='binary') (symbol string, price float, volume long);

This query performs a mapping to convert an event of the `binary` format to a stream worker event.
