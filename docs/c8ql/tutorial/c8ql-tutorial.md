

## Basic Document Tasks



## Match and Filter Documents



## Sorting and limiting

### Cap the result count

It may not always be necessary to return all documents, that a `FOR` loop would normally return. In those cases, we can limit the amount of documents with a `LIMIT()` operation:

```js
FOR c IN Characters
    LIMIT 5
    RETURN c.name
```

```json
[
  "Joffrey",
  "Tommen",
  "Tyrion",
  "Roose",
  "Tywin"
]
```

`LIMIT` is followed by a number for the maximum document count. There is a second syntax however, which allows you to skip a certain amount of record and return the next _n_ documents:

```js
FOR c IN Characters
    LIMIT 2, 5
    RETURN c.name
```

```json
[
  "Tyrion",
  "Roose",
  "Tywin",
  "Samwell",
  "Melisandre"
]
```

See how the second query skipped the first two names and returned the next five (both results feature Tyrion, Roose and Tywin).

### Sort by name

The order in which matching records were returned by the queries shown until here was basically random. To return them in a defined order, we can add a `SORT()` operation. It can have a big impact on the result if combined with a `LIMIT()`, because the result becomes predictable if you sort first.

```js
FOR c IN Characters
    SORT c.name
    LIMIT 10
    RETURN c.name
```

```json
[
  "Arya",
  "Bran",
  "Brienne",
  "Bronn",
  "Catelyn",
  "Cersei",
  "Daario",
  "Daenerys",
  "Davos",
  "Ellaria"
]
```

See how it sorted by name, then returned the ten alphabetically first coming names. We can reverse the sort order with `DESC` like descending:

```js
FOR c IN Characters
    SORT c.name DESC
    LIMIT 10
    RETURN c.name
```

```json
[
  "Ygritte",
  "Viserys",
  "Varys",
  "Tywin",
  "Tyrion",
  "Tormund",
  "Tommen",
  "Theon",
  "The High Sparrow",
  "Talisa"
]
```

The first sort was ascending, which is the default order. Because it is the default, it is not required to explicitly ask for `ASC` order.

### Sort by multiple attributes

Assume we want to sort by surname. Many of the characters share a surname. The result order among characters with the same surname is undefined. We can first sort by surname, then name to determine the order:

```js
FOR c IN Characters
    FILTER c.surname
    SORT c.surname, c.name
    LIMIT 10
    RETURN {
        surname: c.surname,
        name: c.name
    }
```

```json
[
    { "surname": "Baelish", "name": "Petyr" },
    { "surname": "Baratheon", "name": "Joffrey" },
    { "surname": "Baratheon", "name": "Robert" },
    { "surname": "Baratheon", "name": "Stannis" },
    { "surname": "Baratheon", "name": "Tommen" },
    { "surname": "Bolton", "name": "Ramsay" },
    { "surname": "Bolton", "name": "Roose" },
    { "surname": "Clegane", "name": "Sandor" },
    { "surname": "Drogo", "name": "Khal" },
    { "surname": "Giantsbane", "name": "Tormund" }
]
```

Overall, the documents are sorted by last name. If the _surname_ is the same for two characters, the _name_ values are compared and the result sorted.

Note that a filter is applied before sorting, to only let documents through, that actually feature a surname value (many don't have it and would cause `null` values in the result).

### Sort by age

The order can also be determined by a numeric value, such as the age:

```js
FOR c IN Characters
    FILTER c.age
    SORT c.age
    LIMIT 10
    RETURN {
        name: c.name,
        age: c.age
    }
```

```json
[
    { "name": "Bran", "age": 10 },
    { "name": "Arya", "age": 11 },
    { "name": "Sansa", "age": 13 },
    { "name": "Jon", "age": 16 },
    { "name": "Theon", "age": 16 },
    { "name": "Daenerys", "age": 16 },
    { "name": "Samwell", "age": 17 },
    { "name": "Joffrey", "age": 19 },
    { "name": "Tyrion", "age": 32 },
    { "name": "Brienne", "age": 32 }
]
```

A filter is applied to avoid documents without age attribute. The remaining documents are sorted by age in ascending order, and the name and age of the ten youngest characters are returned.

See the [SORT operation](../operations/sort.md) and [LIMIT operation](../operations/limit.md) documentation for more details.

## Joining together

### References to other documents

The character data we imported has an attribute _traits_ for each character, which is an array of strings. It does not store character features directly however:

```json
{
    "name": "Ned",
    "surname": "Stark",
    "alive": false,
    "age": 41,
    "traits": ["A","H","C","N","P"]
}
```

It is rather a list of letters without an apparent meaning. The idea here is that _traits_ is supposed to store documents keys of another collection, which we can use to resolve the letters to labels such as "strong". The benefit of using another collection for the actual traits is, that we can easily query for all existing traits later on and store labels in multiple languages for instance in a central place. If we would embed traits directly...

```json
{
    "name": "Ned",
    "surname": "Stark",
    "alive": false,
    "age": 41,
    "traits": [
        {
            "de": "stark",
            "en": "strong"
        },
        {
            "de": "einflussreich",
            "en": "powerful"
        },
        {
            "de": "loyal",
            "en": "loyal"
        },
        {
            "de": "rational",
            "en": "rational"
        },
        {
            "de": "mutig",
            "en": "brave"
        }
    ]
}
```

... it becomes really hard to maintain traits. If you were to rename or translate one of them, you would need to find all other character documents with the same trait and perform the changes there too. If we only refer to a trait in another collection, it is as easy as updating a single document.

![Comparison_DataModels](/img/c8ql/tutorial/Comparison_DataModels.png)

### Importing traits

Below you find the traits data. Follow the pattern shown in [Create documents](#create-documents) to import it:

- Create a document collection named **Traits**.
- Assign the data to a variable in C8QL, `LET data = [ ... ]`.
- Use a `FOR` loop to iterate over each array element of the data.
- `INSERT` the element `INTO Traits`.

```json
[
    { "_key": "A", "en": "strong", "de": "stark" },
    { "_key": "B", "en": "polite", "de": "freundlich" },
    { "_key": "C", "en": "loyal", "de": "loyal" },
    { "_key": "D", "en": "beautiful", "de": "schön" },
    { "_key": "E", "en": "sneaky", "de": "hinterlistig" },
    { "_key": "F", "en": "experienced", "de": "erfahren" },
    { "_key": "G", "en": "corrupt", "de": "korrupt" },
    { "_key": "H", "en": "powerful", "de": "einflussreich" },
    { "_key": "I", "en": "naive", "de": "naiv" },
    { "_key": "J", "en": "unmarried", "de": "unverheiratet" },
    { "_key": "K", "en": "skillful", "de": "geschickt" },
    { "_key": "L", "en": "young", "de": "jung" },
    { "_key": "M", "en": "smart", "de": "klug" },
    { "_key": "N", "en": "rational", "de": "rational" },
    { "_key": "O", "en": "ruthless", "de": "skrupellos" },
    { "_key": "P", "en": "brave", "de": "mutig" },
    { "_key": "Q", "en": "mighty", "de": "mächtig" },
    { "_key": "R", "en": "weak", "de": "schwach" }
]
```

### Resolving traits

Let's start simple by returning only the traits attribute of each character:

```js
FOR c IN Characters
    RETURN c.traits
```

```json
[
    { "traits": ["A","H","C","N","P"] },
    { "traits": ["D","H","C"] },
    ...
]
```

We can use the _traits_ array together with the `DOCUMENT()` function to use the elements as document keys and look up them up in the _Traits_ collection:

```js
FOR c IN Characters
    RETURN DOCUMENT("Traits", c.traits)
```

```json
[
  [
    {
      "_key": "A",
      "_id": "Traits/A",
      "_rev": "_V5oRUS2---",
      "en": "strong",
      "de": "stark"
    },
    {
      "_key": "H",
      "_id": "Traits/H",
      "_rev": "_V5oRUS6--E",
      "en": "powerful",
      "de": "einflussreich"
    },
    {
      "_key": "C",
      "_id": "Traits/C",
      "_rev": "_V5oRUS6--_",
      "en": "loyal",
      "de": "loyal"
    },
    {
      "_key": "N",
      "_id": "Traits/N",
      "_rev": "_V5oRUT---D",
      "en": "rational",
      "de": "rational"
    },
    {
      "_key": "P",
      "_id": "Traits/P",
      "_rev": "_V5oRUTC---",
      "en": "brave",
      "de": "mutig"
    }
  ],
  [
    {
      "_key": "D",
      "_id": "Traits/D",
      "_rev": "_V5oRUS6--A",
      "en": "beautiful",
      "de": "schön"
    },
    {
      "_key": "H",
      "_id": "Traits/H",
      "_rev": "_V5oRUS6--E",
      "en": "powerful",
      "de": "einflussreich"
    },
    {
      "_key": "C",
      "_id": "Traits/C",
      "_rev": "_V5oRUS6--_",
      "en": "loyal",
      "de": "loyal"
    }
  ],
  ...
]
```

This is a bit too much information, so let's only return English labels using the [array expansion](../array-operators.md#array-expansion) notation:

```js
FOR c IN Characters
    RETURN DOCUMENT("Traits", c.traits)[*].en
```

```json
[
  [
    "strong",
    "powerful",
    "loyal",
    "rational",
    "brave"
  ],
  [
    "beautiful",
    "powerful",
    "loyal"
  ],
  ...
]
```

### Merging characters and traits

Great, we resolved the letters to meaningful traits! But we also need to know to which character they belong. Thus, we need to merge both the character document and the data from trait document:

```js
FOR c IN Characters
    RETURN MERGE(c, { traits: DOCUMENT("Traits", c.traits)[*].en } )
```

```json
[
  {
    "_id": "Characters/2861650",
    "_key": "2861650",
    "_rev": "_V1bzsXa---",
    "age": 41,
    "alive": false,
    "name": "Ned",
    "surname": "Stark",
    "traits": [
      "strong",
      "powerful",
      "loyal",
      "rational",
      "brave"
    ]
  },
  {
    "_id": "Characters/2861653",
    "_key": "2861653",
    "_rev": "_V1bzsXa--B",
    "age": 40,
    "alive": false,
    "name": "Catelyn",
    "surname": "Stark",
    "traits": [
      "beautiful",
      "powerful",
      "loyal"
    ]
  },
  ...
]
```

The `MERGE()` functions merges objects together. Because we used an object `{ traits: ... }` which has the same attribute name _traits_ as the original character attribute, the latter is overwritten by the merge.

## Graph Traversal

Relations such as between parents and children can be modeled as graph. In C8, two documents (a parent and a child character document) can be linked by an edge document. Edge documents are stored in edge collections and have two additional attributes: `_from` and `_to`. They reference any two documents by their document IDs (`_id`).

### ChildOf relations

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

Visualized as graph:

![ChildOf graph visualization](/img/c8ql/tutorial/ChildOf_Graph.png)

### Creating the edges

To create the required edge documents to store these relations in the database, we can run a query that combines joining and filtering to match up the right character documents, then use their `_id` attribute to insert an edge into an edge collection _ChildOf_.

#### Create a Graph Edge collection

Create a new [Graph Edge collection](../../collections/graphs/index.md) called **ChildOf**.

1. Click **Collections**.
1. Click **New Collection**.
1. Click **Graph Edge**.
1. Name the collection **ChildOf** and then click **Create**.

#### Run query

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

The character documents don't have user-defined keys. If they had, it would allow us to create the edges more easily like:

```js
INSERT { _from: "Characters/robb", _to: "Characters/ned" } INTO ChildOf
```

However, creating the edges programmatically based on character names is a good exercise. Breakdown of the query:

- Assign the relations in form of an array of objects with a _parent_ and a _child_ attribute each, both with sub-attributes _name_ and _surname_, to a variable `data`
- For each element in this array, assign a relation to a variable `rel` and execute the subsequent instructions
- Assign the result of an expression to a variable `parentId`
  - Take the first element of a sub-query result (sub-queries are enclosed by parentheses, but here they are also a function call)
    - For each document in the Characters collection, assign the document to a variable `c`
    - Apply two filter conditions: the name in the character document must equal the parent name in `rel`, and the surname must also equal the surname give in the relations data
    - Stop after the first match for efficiency
    - Return the ID of the character document (the result of the sub-query is an array with one element, `FIRST()` takes this element and assigns it to the `parentId` variable)
- Assign the result of an expression to a variable `childId`
  - A sub-query is used to find the child character document and the ID is returned, in the same way as the parent document ID (see above)
- If either or both of the sub-queries were unable to find a match, skip the current relation, because two IDs for both ends of an edge are required to create one (this is only a precaution)
- Insert a new edge document into the ChildOf collection, with the edge going from `childId` to `parentId` and no other attributes
- Return the new edge document (optional)

### Traverse to the parents

Now that edges link character documents (vertices), we have a graph we can query to find out who the parents are of another character &ndash; or in graph terms, we want to start at a vertex and follow the edges to other vertices in . A [C8QL graph traversal](../graphs/traversals.md):

```js
FOR v IN 1..1 OUTBOUND "Characters/2901776" ChildOf
    RETURN v.name
```

This `FOR` loop doesn't iterate over a collection or an array, it walks the graph and iterates over the connected vertices it finds, with the vertex document assigned to a variable (here: `v`). It can also emit the edges it walked as well as the full path from start to end to [another two variables](../graphs/traversals.md#syntax).

In above query, the traversal is restricted to a minimum and maximum traversal depth of 1 (how many steps to take from the start vertex), and to only follow edges in `OUTBOUND` direction. Our edges point from child to parent, and the parent is one step away from the child, thus it gives us the parents of the child we start at. `"Characters/2901776"` is that start vertex. Note that the document ID will be different for you, so please adjust it to your document ID of e.g. the Bran Stark document:

```js
FOR c IN Characters
    FILTER c.name == "Bran"
    RETURN c._id
```

```json
[ "Characters/<YourDocumentkey>" ]
```

You may also combine this query with the traversal directly, to easily change the start vertex by adjusting the filter condition(s):

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

The same result will be returned for Robb, Arya and Sansa as starting point. For Jon Snow, it will only be Ned.

### Traverse to the children

We can also walk from a parent in reverse edge direction (`INBOUND` that is) to the children:

```js
FOR c IN Characters
    FILTER c.name == "Ned"
    FOR v IN 1..1 INBOUND c ChildOf
        RETURN v.name
```

```json
[
  "Robb",
  "Sansa",
  "Jon",
  "Arya",
  "Bran"
]
```

### Traverse to the grandchildren

For the Lannister family, we have relations that span from parent to grandchild. Let's change the traversal depth to return grandchildren, which means to go exactly two steps:

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

It might be a bit unexpected, that Joffrey is returned twice. However, if you look at the graph visualization, you can see that multiple paths lead from Joffrey (bottom right) to Tywin:

![ChildOf_Graph](/img/c8ql/tutorial/ChildOf_Graph.png)

```js
Tywin <- Jaime <- Joffrey
Tywin <- Cersei <- Joffrey
```

As a quick fix, change the last line of the query to `RETURN DISTINCT v.name` to return each value only once. Keep in mind though, that there are [traversal options](../graphs/traversals.md#syntax) to suppress duplicate vertices early on.

### Traverse with variable depth

To return the parents and grandparents of Joffrey, we can walk edges in `OUTBOUND` direction and adjust the traversal depth to go at least 1 step, and 2 at most:

```js
FOR c IN Characters
    FILTER c.name == "Joffrey"
    FOR v IN 1..2 OUTBOUND c ChildOf
        RETURN DISTINCT v.name
```

```json
[
  "Cersei",
  "Tywin",
  "Jaime"
]
```

If we had deeper family trees, it would only be a matter of changing the depth values to query for great-grandchildren and similar relations.

## Geospatial queries

Geospatial coordinates consisting of a latitude and longitude value can be stored either as two separate attributes, or as a single attribute in the form of an array with both numeric values. C8 can [index such coordinates](../functions/geo.md) for fast geospatial queries.

### Locations data

Let us insert some filming locations into a new collection _Locations_.

1. Create a Document Store collection called **Locations**.
1. Run below C8QL query:

```js
LET places = [
    { "name": "Dragonstone", "coordinate": [ 55.167801, -6.815096 ] },
    { "name": "King's Landing", "coordinate": [ 42.639752, 18.110189 ] },
    { "name": "The Red Keep", "coordinate": [ 35.896447, 14.446442 ] },
    { "name": "Yunkai", "coordinate": [ 31.046642, -7.129532 ] },
    { "name": "Astapor", "coordinate": [ 31.50974, -9.774249 ] },
    { "name": "Winterfell", "coordinate": [ 54.368321, -5.581312 ] },
    { "name": "Vaes Dothrak", "coordinate": [ 54.16776, -6.096125 ] },
    { "name": "Beyond the wall", "coordinate": [ 64.265473, -21.094093 ] }
]

FOR place IN places
    INSERT place INTO Locations
```

Visualization of the coordinates on a map with their labels:

![Locations_Map](/img/c8ql/tutorial/Locations_Map.png)

### Geospatial index

To query based on coordinates, a [geo index](../../collections/documents/geospatial/geojson#geojson-supported-index) is required. It determines which fields contain the latitude and longitude values.

1. Click **Collections**.
1. Click **Locations**.
1. Click the **Indexes** tab.
1. Click the plus icon to add a new index.
1. In **Type** select **Geo Index**.
1. In **Fields**, enter **coordinate**.
1. Click **Create**

### Find nearby locations

A `FOR` loop is used again, but this time to iterate over the results of a function call to `NEAR()` to find the _n_ closest coordinates to a reference point, and return the documents with the nearby locations. The default for _n_ is 100, which means 100 documents are returned at most, the closest matches first.

In below example, the limit is set to 3. The origin (the reference point) is a coordinate somewhere downtown in Dublin, Ireland:

```js
FOR loc IN NEAR(Locations, 53.35, -6.26, 3)
    RETURN {
        name: loc.name,
        latitude: loc.coordinate[0],
        longitude: loc.coordinate[1]
    }
```

```json
[
  {
    "name": "Vaes Dothrak",
    "latitude": 54.16776,
    "longitude": -6.096125
  },
  {
    "name": "Winterfell",
    "latitude": 54.368321,
    "longitude": -5.581312
  },
  {
    "name": "Dragonstone",
    "latitude": 55.167801,
    "longitude": -6.815096
  }
]
```

The query returns the location name, as well as the coordinate. The coordinate is returned as two separate attributes. You may use a simpler `RETURN loc` instead if you want.

### Find locations within radius

`NEAR()` can be swapped out with `WITHIN()`, to search for locations within a given radius from a reference point. The syntax is the same as for `NEAR()`, except for the fourth parameter, which specifies the radius instead of a limit. The unit for the radius is meters. The example uses a radius of 200,000 meters (200 kilometers):

```js
FOR loc IN WITHIN(Locations, 53.35, -6.26, 200 * 1000)
    RETURN {
        name: loc.name,
        latitude: loc.coordinate[0],
        longitude: loc.coordinate[1]
    }
```

```json
[
  {
    "name": "Vaes Dothrak",
    "latitude": 54.16776,
    "longitude": -6.096125
  },
  {
    "name": "Winterfell",
    "latitude": 54.368321,
    "longitude": -5.581312
  }
]
```

### Return the distance

Both `NEAR()` and `WITHIN()` can return the distance to the reference point by adding an optional fifth parameter. It has to be a string, which will be used as attribute name for an additional attribute with the distance in meters:

```js
FOR loc IN NEAR(Locations, 53.35, -6.26, 3, "distance")
    RETURN {
        name: loc.name,
        latitude: loc.coordinate[0],
        longitude: loc.coordinate[1],
        distance: loc.distance / 1000
    }
```

```json
[
  {
    "name": "Vaes Dothrak",
    "latitude": 54.16776,
    "longitude": -6.096125,
    "distance": 91.56658640314431
  },
  {
    "name": "Winterfell",
    "latitude": 54.368321,
    "longitude": -5.581312,
    "distance": 121.66399816395028
  },
  {
    "name": "Dragonstone",
    "latitude": 55.167801,
    "longitude": -6.815096,
    "distance": 205.31879386198324
  }
]
```

The extra attribute, here called _distance_, is returned as part of the _loc_ variable, as if it was part of the location document. The value is divided by 1000 in the example query, to convert the unit to kilometers, simply to make it better readable.

## Summary
