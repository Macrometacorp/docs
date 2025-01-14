---
title: passThrough
---

Pass-through mapper passed events (Event\[\]) through without any mapping or modifications.

## Syntax

    CREATE SINK <NAME> WITH (map.type="passThrough")

## Example 1

    CREATE SINK BarStream WITH (type='stream', map.type='passThrough') (symbol string, price float, volume long);

In the following example BarStream uses passThrough outputmapper which emit stream worker event directly without any transformation into sink.
