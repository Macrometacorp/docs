---
sidebar_position: 40
title: Traversal Examples
---

This page has several examples of graph traversals.

## Simple Traversal Explanation

Here is a simple example to explain how traversal works. This example goes through each step of a traversal as the query is executed.

The graph that we are going to traverse is based on the [traversal graph](../../graph-examples/example-graphs#the-traversal-graph). If you create this example graph, then you can run any of the queries listed in this page.

![traversal_graph](/img/traversal_graph.png)

We use the following parameters for our query:

- Start at vertex **A**.
- Use a `min` depth of 1.
- Use a `max` depth of 2.
- Traverse (move) only in `OUTBOUND` direction of edges.

Here is the query for a named graph:

```sql
FOR v IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
  RETURN v._key
```

![traversal_graph1](/img/traversal_graph1.png)

Now it walks to one of the direct neighbors of **A**, say **B** (note: ordering is not guaranteed!):

![traversal_graph2](/img/traversal_graph2.png)

The query will remember the state (red circle) and will emit the first result **A** → **B** (black box). This will also prevent the traverser to be trapped in cycles. Now again it will visit one of the direct neighbors of **B**, say **E**:

![traversal_graph3](/img/traversal_graph3.png)

We have limited the query with a `max` depth of _2_, so it will not pick any neighbor of **E**, as the path from **A** to **E** already requires _2_ steps. Instead, we will go back one level to **B** and continue with any other direct neighbor there:

![traversal_graph4](/img/traversal_graph4.png)

Again after we produced this result we will step back to **B**. But there is no neighbor of **B** left that we have not yet visited. Hence we go another step back to **A** and continue with any other neighbor there.

![traversal_graph5](/img/traversal_graph5.png)

And identical to the iterations before we will visit **H**:

![traversal_graph6](/img/traversal_graph6.png)

And **J**:

![traversal_graph7](/img/traversal_graph7.png)

After these steps there is no further result left. So all together this query has returned the following paths:

1. **A** → **B**
2. **A** → **B** → **C**
3. **A** → **B** → **E**
4. **A** → **G**
5. **A** → **G** → **H**
6. **A** → **G** → **J**

The query returns the key for each vertex listed above:

```json
[
	"B",
	"C",
	"E",
	"G",
	"H",
	"J"
]
```

## Examples

We will create a simple symmetric traversal demonstration graph:

![traversal graph](/img/traversal_graph.png)

To get started we select the full graph. For better overview we only return the vertex IDs:

```js
    FOR v IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
      RETURN v._key
```

```js
    FOR v IN 1..3 OUTBOUND 'circles/A' edges RETURN v._key
```

Results:

  ```json
    [
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K"
    ]
  ```

We can nicely see that it is heading for the first outer vertex, then goes back to the branch to descend into the next tree. After that it returns to our start node, to descend again. As we can see both queries return the same result, the first one uses the named graph, the second uses the edge collections directly.

Now we only want the elements of a specific depth (min = max = 2), the ones that are right behind the fork:

```js
    FOR v IN 2..2 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
      RETURN v._key
```

```js
    FOR v IN 2 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
      RETURN v._key
```

Results:

  ```json
    [
      "C",
      "E",
      "H",
      "J"
    ]
  ```

As you can see, we can express this in two ways: with or without _max_ parameter in the expression.

## Filter examples

Now let's start to add some filters. We want to cut of the branch on the right side of the graph, we may filter in two ways:

- we know the vertex at depth 1 has `_key` == `G`
- we know the `label` attribute of the edge connecting **A** to **G** is `right_foo`

```js
    FOR v, e, p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.vertices[1]._key != 'G'
        RETURN v._key
```

```js
    FOR v, e, p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[0].label != 'right_foo'
        RETURN v._key
```

Results:

  ```json
    [
      "B",
      "C",
      "D",
      "E",
      "F"
    ]
  ```

As we can see all vertices behind **G** are skipped in both queries. The first filters on the vertex `_key`, the second on an edge label.

:::note
As soon as a filter is not fulfilled for any of the three elements `v`, `e` or `p`, the complete set of these will be excluded from the result.
:::

We also may combine several filters, for instance to filter out the right branch (**G**), and the **E** branch:

```js
    FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.vertices[1]._key != 'G'
        FILTER p.edges[1].label != 'left_blub'
        RETURN v._key
```

```js
    FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.vertices[1]._key != 'G' AND p.edges[1].label != 'left_blub'
        RETURN v._key
```

Results:

  ```json
    [
      "B",
      "C",
      "D",
    ]
  ```

As you can see, combining two `FILTER` statements with an `AND` has the same result.
