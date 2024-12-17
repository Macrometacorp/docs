---
sidebar_position: 50
title: Part 5 - Graph Traversal
---

Two documents, such as a parent character document and a child character document, can be linked by an edge document and modeled as a graph. Edge documents are stored in Graph Edge collections and have two additional attributes: `_from` and `_to`. They reference any two documents by their document IDs (`_id`).

## ChildOf relations

Our characters have the following relations between parents and children (first names only for a better overview):

```js
    Robb -> Ned
   Sansa -> Ned
    Arya -> Ned
    Bran -> Ned
     Jon -> Ned
    Robb -> Catelyn
   Sansa -> Catelyn
    Arya -> Catelyn
    Bran -> Catelyn
   Jaime -> Tywin
  Cersei -> Tywin
  Tyrion -> Tywin
 Joffrey -> Jaime
 Joffrey -> Cersei
```

Visualized as a graph:

![ChildOf graph visualization](/img/c8ql/tutorial/ChildOf_Graph.png)

## Create the Edges

To create the required edge documents to store these relations in the database, you can run a query that combines joining and filtering to match up the right character documents, then use their `_id` attribute to insert an edge into an edge collection _ChildOf_.

### Create a Graph Edge collection

Create a new [Graph Edge collection](../../database/graphs/graph-tasks/create-graph-edge-collection) called **ChildOf**.

1. Click **Data > Collections**.
1. Click **New Collection**.
1. Click **Graph Edge**.
1. Name the collection **ChildOf** and then click **Create**.

### Run Query

Then run the following query in **Queries**:

```js
LET data = [
    {
        "parent": { "name": "Ned", "surname": "Stark" },
        "child": { "name": "Robb", "surname": "Stark" }
    }, {
        "parent": { "name": "Ned", "surname": "Stark" },
        "child": { "name": "Sansa", "surname": "Stark" }
    }, {
        "parent": { "name": "Ned", "surname": "Stark" },
        "child": { "name": "Arya", "surname": "Stark" }
    }, {
        "parent": { "name": "Ned", "surname": "Stark" },
        "child": { "name": "Bran", "surname": "Stark" }
    }, {
        "parent": { "name": "Catelyn", "surname": "Stark" },
        "child": { "name": "Robb", "surname": "Stark" }
    }, {
        "parent": { "name": "Catelyn", "surname": "Stark" },
        "child": { "name": "Sansa", "surname": "Stark" }
    }, {
        "parent": { "name": "Catelyn", "surname": "Stark" },
        "child": { "name": "Arya", "surname": "Stark" }
    }, {
        "parent": { "name": "Catelyn", "surname": "Stark" },
        "child": { "name": "Bran", "surname": "Stark" }
    }, {
        "parent": { "name": "Ned", "surname": "Stark" },
        "child": { "name": "Jon", "surname": "Snow" }
    }, {
        "parent": { "name": "Tywin", "surname": "Lannister" },
        "child": { "name": "Jaime", "surname": "Lannister" }
    }, {
        "parent": { "name": "Tywin", "surname": "Lannister" },
        "child": { "name": "Cersei", "surname": "Lannister" }
    }, {
        "parent": { "name": "Tywin", "surname": "Lannister" },
        "child": { "name": "Tyrion", "surname": "Lannister" }
    }, {
        "parent": { "name": "Cersei", "surname": "Lannister" },
        "child": { "name": "Joffrey", "surname": "Baratheon" }
    }, {
        "parent": { "name": "Jaime", "surname": "Lannister" },
        "child": { "name": "Joffrey", "surname": "Baratheon" }
    }
]

FOR rel in data
    LET parentId = FIRST(
        FOR c IN Characters
            FILTER c.name == rel.parent.name
            FILTER c.surname == rel.parent.surname
            LIMIT 1
            RETURN c._id
    )
    LET childId = FIRST(
        FOR c IN Characters
            FILTER c.name == rel.child.name
            FILTER c.surname == rel.child.surname
            LIMIT 1
            RETURN c._id
    )
    FILTER parentId != null AND childId != null
    INSERT { _from: childId, _to: parentId } INTO ChildOf
    RETURN NEW
```

When you run the query, it returns a graph with data structures similar to those shown earlier and below. However, your graph has system-defined keys whereas the one shown here have user-defined keys.

![ChildOf_Graph](/img/c8ql/tutorial/ChildOf_Graph.png)

:::note
Sometimes the two family structures generate overlapping one another. To separate them, click the **Start layout animation** play icon in the lower right corner of the Query Result. Click Stop after the diagrams separate.
:::

Your results should look similar to this graph.

![Separated Graphs](/img/c8ql/tutorial/graphs-separate.png)

### Explanation of Graph Edge Query

The character documents don't have user-defined keys. If they had, it would allow us to create the edges more easily like:

```js
INSERT { _from: "Characters/robb", _to: "Characters/ned" } INTO ChildOf
```

However, creating the edges programmatically based on character names is a good exercise. This is what each part of the query did.

#### The Data Block

Assign the relations in form of an array of objects with a _parent_ and a _child_ attribute each, both with sub-attributes _name_ and _surname_, to a variable `data`. Basically, each object is a parent and child pairing.

```js
LET data = [
    {
        "parent": { "name": "Ned", "surname": "Stark" },
        "child": { "name": "Robb", "surname": "Stark" }
    }, {
        "parent": { "name": "Ned", "surname": "Stark" },
        "child": { "name": "Sansa", "surname": "Stark" }
    ...
```

#### Assign Relationships

The FOR loop creates data connecting the relation data in the block above and the names in Characters.

For each element in this array, assign a relation to a variable `rel` and execute the subsequent instructions:

- Assign the result of an expression to a variable `parentId`
  - Take the first element of a sub-query result. Sub-queries are enclosed by parentheses, but here they are also a function call.
    - For each document in the Characters collection, assign the document to a variable `c`.
    - Apply two filter conditions: the name in the character document must equal the parent name in `rel`, and the surname must also equal the surname give in the relations data.
    - Stop after the first match for efficiency.
    - Return the ID of the character document. The result of the sub-query is an array with one element, `FIRST()` takes this element and assigns it to the `parentId` variable.
- Assign the result of an expression to a variable `childId`. A sub-query is used to find the child character document and the ID is returned, in the same way as the parent document ID (see above)

```js
FOR rel in data
    LET parentId = FIRST(
        FOR c IN Characters
            FILTER c.name == rel.parent.name
            FILTER c.surname == rel.parent.surname
            LIMIT 1
            RETURN c._id
    )
    LET childId = FIRST(
        FOR c IN Characters
            FILTER c.name == rel.child.name
            FILTER c.surname == rel.child.surname
            LIMIT 1
            RETURN c._id
    )
```

#### Filter and Insert

The last part of the query inserts the connections created with the FOR loops into ChildOf and returns the raw results.

- If either or both of the sub-queries were unable to find a match, skip the current relation, because two IDs for both ends of an edge are required to create one.
- Insert a new edge document into the ChildOf collection, with the edge going from `childId` to `parentId` and no other attributes.
- Return the new edge document.

```js
    FILTER parentId != null AND childId != null
    INSERT { _from: childId, _to: parentId } INTO ChildOf
    RETURN NEW
```

## Traverse to the Parents

Now that edges link character documents (vertices), you have a graph that can query to find out who the parents are of another character. In graph terms, you'll start at a vertex and follow the edges to other vertices with a [graph traversal](../../database/graphs/graph-queries/traversal-queries/).

```js
FOR c IN Characters
    FILTER c.name == "Bran"
    FOR v IN 1..1 OUTBOUND c ChildOf
        RETURN v.name
```

The start vertex is followed by `ChildOf`, which is our edge collection. The example query returns only the name of each parent to keep the result short:

```json
[
  "Ned",
  "Catelyn"
]
```

### Traversal Query Explanation

This `FOR` loop doesn't iterate over a collection or an array, it walks the graph and iterates over the connected vertices it finds, with the vertex document assigned to a variable (here: `v`). It can also emit the edges it walked as well as the full path from start to end to [another two variables](../../database/graphs/graph-queries/traversal-queries/#syntax).

In above query, the traversal is restricted to a minimum and maximum traversal depth of 1 (how many steps to take from the start vertex), and to only follow edges in `OUTBOUND` direction. The edges point from child to parent, and the parent is one step away from the child, thus it returns the parents of the child we start at.

You could also do this in two steps, using the document ID.

1. Run the following code block to return Bran's ID.

    ```js
    FOR c IN Characters
        FILTER c.name == "Bran"
        RETURN c._id
    ```

2. Use the ID returned in the following code block to return parent names.

    ```js
    FOR v IN 1..1 OUTBOUND "Characters/2901776" ChildOf
        RETURN v.name
    ```

The same result will be returned for Robb, Arya, and Sansa as starting point. For Jon Snow, it will only be Ned.

## Traverse to the Children

You can also walk from a parent in reverse edge direction (`INBOUND` that is) to the children:

```js
FOR c IN Characters
    FILTER c.name == "Ned"
    FOR v IN 1..1 INBOUND c ChildOf
        RETURN v.name
```

This returns a list of Ned's children:

```json
[
  "Robb",
  "Sansa",
  "Jon",
  "Arya",
  "Bran"
]
```

## Traverse to the Grandchildren

The Lannister family has relations that span from parent to grandchild. Let's change the traversal depth to return grandchildren, which means to go exactly two steps:

```js
FOR c IN Characters
    FILTER c.name == "Tywin"
    FOR v IN 2..2 INBOUND c ChildOf
        RETURN v.name
```

```json
[
  "Joffrey",
  "Joffrey"
]
```

It might be a bit unexpected that Joffrey is returned twice. However, if you look at the graph visualization, you can see that multiple paths lead from Joffrey (bottom right) to Tywin:

```js
Tywin <- Jaime <- Joffrey
Tywin <- Cersei <- Joffrey
```

As a quick fix, change the last line of the query to `RETURN DISTINCT v.name` to return each value only once. Keep in mind though, that there are [traversal options](../../database/graphs/graph-queries/traversal-queries/#syntax) to suppress duplicate vertices early on.

## Traverse with Variable Depth

To return the parents and grandparents of Joffrey, you can walk edges in `OUTBOUND` direction and adjust the traversal depth to go at least 1 step, and 2 at most:

```js
FOR c IN Characters
    FILTER c.name == "Joffrey"
    FOR v IN 1..2 OUTBOUND c ChildOf
        RETURN DISTINCT v.name
```

This returns:

```json
[
  "Cersei",
  "Tywin",
  "Jaime"
]
```

If the dataset had deeper family trees, it would only be a matter of changing the depth values to query for great-grandchildren and similar relations.

## Next Steps

Great job! You can now create edges and traverse graph relationships. When you're ready, continue the tutorial in [Part 6 - Geospatial Queries](geospatial-queries).
