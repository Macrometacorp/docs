---
sidebar_position: 30
title: OUTBOUND, INBOUND, ANY
---

This page discusses directional keywords for traversing graphs.

## Comparing OUTBOUND / INBOUND / ANY

All our previous examples traversed the graph in `OUTBOUND` edge direction. You may however want to also traverse in reverse direction (`INBOUND`) or both (`ANY`). Since `circles/A` only has outbound edges, we start our queries from `circles/E`:

### OUTBOUND Example

The first traversal moves only in the forward (`OUTBOUND`) direction. Therefore from **E** we only can see **F**.

Query:

```js
    FOR v IN 1..3 OUTBOUND 'circles/E' GRAPH 'traversalGraph'
        RETURN v._key
```

Result:

```json
  [
    "F"
  ]
```

### INBOUND Example

```js
    FOR v IN 1..3 INBOUND 'circles/E' GRAPH 'traversalGraph'
        RETURN v._key
```

```json
  [
    "B",
    "A"
  ]
```

### ANY Example

```js
    FOR v IN 1..3 ANY 'circles/E' GRAPH 'traversalGraph'
        RETURN v._key
```

```json
  [
    "F",
    "B",
    "C",
    "D",
    "A",
    "G"
  ]
```

 Walking in reverse direction (`INBOUND`), we see the path to **A**: **B** → **A**.

Walking in forward and reverse direction (`ANY`) we can see a more diverse result. First of all, we see the simple paths to **F** and **A**. However, these vertices have edges in other directions and they will be traversed.

:::note
The traverser may use identical edges multiple times. For instance, if it walks from **E** to **F**, it will continue to walk from **F** to **E** using the same edge once again. Due to this we will see duplicate nodes in the result.
:::

Please note that the direction can't be passed in by a bind parameter.