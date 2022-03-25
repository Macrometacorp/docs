---
sidebar_position: 2
---

# C8QL Tutorial

This is an introduction to GDN's query language C8QL, built around a small dataset of characters from the novel and fantasy drama television series Game of Thrones (as of season 1). It includes character traits in two languages, some family relations, and last but not least a small set of filming locations, which makes for an interesting mix of data to work with.

There is no need to import the data before you start. It is provided as part of the C8QL queries in this tutorial. 

## Dataset

### Characters

The dataset features 43 characters with their name, surname, age, alive status and trait references. The surname and age properties are not always present. The column *traits (resolved)* is not part of the actual data used in this tutorial, but included for your convenience.

![Characters_Table](/img/Characters_Table.png)

### Traits

There are 18 unique traits. Each trait has a random letter as document key. The trait labels come in English and German.

![Traits_Table](/img/Traits_Table.png)

### Locations

This small collection of 8 filming locations comes with two attributes, a *name* and a *coordinate*. The coordinates are modeled as number arrays, comprised of a latitude and a longitude value each.

![Locations_Table](/img/Locations_Table.png)

## CRUD

- [Create documents](#create-documents)
- [Read documents](#read-documents)
- [Update documents](#update-documents)
- [Delete documents](#delete-documents)

### Create documents

Before we can insert documents with C8QL, we need a place to put them in - a collection. Collections can be managed via the web interface, c8sh or a driver. It is not possible to do so with C8QL however.

![Collection_Add](/img/Collection_Add-GUI.png)

![Create Characters_Collection](/img/Characters_Collection_Creation.png)

Click on `COLLECTIONS`in the web interface, then *Add Collection* and type `Characters` as name. Confirm with *Save*. The new collection should appear in the list.

Next, click on `QUERIES`. To create the first document for collection with C8QL, use the following C8QL query, which you can paste into the query textbox and run by clicking *Execute*:

![Insert query in query editor](/img/Query_Insert.png)


```js
INSERT {
    "name": "Ned",
    "surname": "Stark",
    "alive": true,
    "age": 41,
    "traits": ["A","H","C","N","P"]
} INTO Characters
```

The syntax is `INSERT document INTO collectionName`. The document is an object like you may know it from JavaScript or JSON, which is comprised of attribute key and value pairs. The quotes around the attribute keys are optional in C8QL. Keys are always character sequences (strings), whereas attribute values can have [different types](fundamentals#data-types):

- null
- boolean (true, false)
- number (integer and floating point)
- string
- array
- object

Name and surname of the character document we inserted are both string values. The alive state uses a boolean. Age is a numeric value. The traits are an array of strings. The entire document is an object.

Let's add a bunch of other characters in a single query:

```js
LET data = [
    { "name": "Robert", "surname": "Baratheon", "alive": false, "traits": ["A","H","C"] },
    { "name": "Jaime", "surname": "Lannister", "alive": true, "age": 36, "traits": ["A","F","B"] },
    { "name": "Catelyn", "surname": "Stark", "alive": false, "age": 40, "traits": ["D","H","C"] },
    { "name": "Cersei", "surname": "Lannister", "alive": true, "age": 36, "traits": ["H","E","F"] },
    { "name": "Daenerys", "surname": "Targaryen", "alive": true, "age": 16, "traits": ["D","H","C"] },
    { "name": "Jorah", "surname": "Mormont", "alive": false, "traits": ["A","B","C","F"] },
    { "name": "Petyr", "surname": "Baelish", "alive": false, "traits": ["E","G","F"] },
    { "name": "Viserys", "surname": "Targaryen", "alive": false, "traits": ["O","L","N"] },
    { "name": "Jon", "surname": "Snow", "alive": true, "age": 16, "traits": ["A","B","C","F"] },
    { "name": "Sansa", "surname": "Stark", "alive": true, "age": 13, "traits": ["D","I","J"] },
    { "name": "Arya", "surname": "Stark", "alive": true, "age": 11, "traits": ["C","K","L"] },
    { "name": "Robb", "surname": "Stark", "alive": false, "traits": ["A","B","C","K"] },
    { "name": "Theon", "surname": "Greyjoy", "alive": true, "age": 16, "traits": ["E","R","K"] },
    { "name": "Bran", "surname": "Stark", "alive": true, "age": 10, "traits": ["L","J"] },
    { "name": "Joffrey", "surname": "Baratheon", "alive": false, "age": 19, "traits": ["I","L","O"] },
    { "name": "Sandor", "surname": "Clegane", "alive": true, "traits": ["A","P","K","F"] },
    { "name": "Tyrion", "surname": "Lannister", "alive": true, "age": 32, "traits": ["F","K","M","N"] },
    { "name": "Khal", "surname": "Drogo", "alive": false, "traits": ["A","C","O","P"] },
    { "name": "Tywin", "surname": "Lannister", "alive": false, "traits": ["O","M","H","F"] },
    { "name": "Davos", "surname": "Seaworth", "alive": true, "age": 49, "traits": ["C","K","P","F"] },
    { "name": "Samwell", "surname": "Tarly", "alive": true, "age": 17, "traits": ["C","L","I"] },
    { "name": "Stannis", "surname": "Baratheon", "alive": false, "traits": ["H","O","P","M"] },
    { "name": "Melisandre", "alive": true, "traits": ["G","E","H"] },
    { "name": "Margaery", "surname": "Tyrell", "alive": false, "traits": ["M","D","B"] },
    { "name": "Jeor", "surname": "Mormont", "alive": false, "traits": ["C","H","M","P"] },
    { "name": "Bronn", "alive": true, "traits": ["K","E","C"] },
    { "name": "Varys", "alive": true, "traits": ["M","F","N","E"] },
    { "name": "Shae", "alive": false, "traits": ["M","D","G"] },
    { "name": "Talisa", "surname": "Maegyr", "alive": false, "traits": ["D","C","B"] },
    { "name": "Gendry", "alive": false, "traits": ["K","C","A"] },
    { "name": "Ygritte", "alive": false, "traits": ["A","P","K"] },
    { "name": "Tormund", "surname": "Giantsbane", "alive": true, "traits": ["C","P","A","I"] },
    { "name": "Gilly", "alive": true, "traits": ["L","J"] },
    { "name": "Brienne", "surname": "Tarth", "alive": true, "age": 32, "traits": ["P","C","A","K"] },
    { "name": "Ramsay", "surname": "Bolton", "alive": true, "traits": ["E","O","G","A"] },
    { "name": "Ellaria", "surname": "Sand", "alive": true, "traits": ["P","O","A","E"] },
    { "name": "Daario", "surname": "Naharis", "alive": true, "traits": ["K","P","A"] },
    { "name": "Missandei", "alive": true, "traits": ["D","L","C","M"] },
    { "name": "Tommen", "surname": "Baratheon", "alive": true, "traits": ["I","L","B"] },
    { "name": "Jaqen", "surname": "H'ghar", "alive": true, "traits": ["H","F","K"] },
    { "name": "Roose", "surname": "Bolton", "alive": true, "traits": ["H","E","F","A"] },
    { "name": "The High Sparrow", "alive": true, "traits": ["H","M","F","O"] }
]

FOR d IN data
    INSERT d INTO Characters
```

The `LET` keyword defines a variable with name *data* and an array of objects as value, so `LET variableName = valueExpression` and the expression being a literal array definition like `[ {...}, {...}, ... ]`.

`FOR variableName IN expression` is used to iterate over each element of the *data* array. In each loop, one element is assigned to the variable *d*. This variable is then used in the `INSERT` statement instead of a literal object definition. What is does is basically:

```js
INSERT {
    "name": "Robert",
    "surname": "Baratheon",
    "alive": false,
    "traits": ["A","H","C"]
} INTO Characters

INSERT {
    "name": "Jaime",
    "surname": "Lannister",
    "alive": true,
    "age": 36,
    "traits": ["A","F","B"]
} INTO Characters

...
```

:::note
C8QL does not permit multiple `INSERT` operations that target the same collection in a single query. It is allowed as body of a `FOR` loop however, inserting multiple documents like we did with above query.
:::

### Read documents

There are a couple of documents in the *Characters* collection by now. We can retrieve them all using a `FOR` loop again. This time however, we use it to go through all documents in the collection instead of an array:

```js
FOR c IN Characters
    RETURN c
```

The syntax of the loop is `FOR variableName IN collectionName`. For each document in the collection, *c* is assigned a document, which is then returned as per the loop body. The query returns all characters we previously stored.

Among them should be *Ned Stark*, similar to this example:

```json
  {
    "_key": "2861650",
    "_id": "Characters/2861650",
    "_rev": "_V1bzsXa---",
    "name": "Ned",
    "surname": "Stark",
    "alive": true,
    "age": 41,
    "traits": ["A","H","C","N","P"]
  },
```

The document features the five attributes we stored, plus three more added by the database system. Each document needs a unique `_key`, which identifies it within a collection. The `_id` is a computed property, a concatenation of the collection name, a forward slash `/` and the document key. It uniquely identies a document within a database. `_rev` is a revision ID managed by the system.

Document keys can be provided by the user upon document creation, or a unique value is assigned automatically. It can not be changed later. All three system attributes starting with an underscore `_` are read-only.

We can use either the document key or the document ID to retrieve a specific document with the help of a C8QL function `DOCUMENT()`:

```js
RETURN DOCUMENT("Characters", "2861650")
// --- or ---
RETURN DOCUMENT("Characters/2861650")
```

```json
[
  {
    "_key": "2861650",
    "_id": "Characters/2861650",
    "_rev": "_V1bzsXa---",
    "name": "Ned",
    "surname": "Stark",
    "alive": true,
    "age": 41,
    "traits": ["A","H","C","N","P"]
  }
]
```

:::note
Document keys will be different for you. Change the queries accordingly. Here, `"2861650"` is the key for the `Ned Stark` document, and `"2861653"` for `Catelyn Stark`.
:::  

The `DOCUMENT()` function also allows to fetch multiple documents at once:

```js
RETURN DOCUMENT("Characters", ["2861650", "2861653"])
// --- or ---
RETURN DOCUMENT(["Characters/2861650", "Characters/2861653"])
```

```json
[
  [
    {
      "_key": "2861650",
      "_id": "Characters/2861650",
      "_rev": "_V1bzsXa---",
      "name": "Ned",
      "surname": "Stark",
      "alive": true,
      "age": 41,
      "traits": ["A","H","C","N","P"]
    },
    {
      "_key": "2861653",
      "_id": "Characters/2861653",
      "_rev": "_V1bzsXa--B",
      "name": "Catelyn",
      "surname": "Stark",
      "alive": false,
      "age": 40,
      "traits": ["D","H","C"]
    }
  ]
]
```

See the [`DOCUMENT()`](./functions/miscellaneous#document) documentation for more details.

### Update documents

According to our `Ned Stark` document, he is alive. When we get to know that he died, we need to change the `alive` attribute. Let us modify the existing document:

```js
UPDATE "2861650" WITH { alive: false } IN Characters
```

The syntax is `UPDATE documentKey WITH object IN collectionName`. It updates the specified document with the attributes listed (or adds them if they don't exist), but leaves the rest untouched. To replace the entire document content, you may use `REPLACE` instead of `UPDATE`:

```js
REPLACE "2861650" WITH {
    name: "Ned",
    surname: "Stark",
    alive: false,
    age: 41,
    traits: ["A","H","C","N","P"]
} IN Characters
```

This also works in a loop, to add a new attribute to all documents for instance:

```js
FOR c IN Characters
    UPDATE c WITH { season: 1 } IN Characters
```

A variable is used instead of a literal document key, to update each document. The query adds an attribute `season` to the documents' top-level. You can inspect the result by re-running the query that returns all documents in collection:

```js
FOR c IN Characters
    RETURN c
```

```json
[
  [
    {
      "_key": "2861650",
      "_id": "Characters/2861650",
      "_rev": "_V1bzsXa---",
      "name": "Ned",
      "surname": "Stark",
      "alive": false,
      "age": 41,
      "traits": ["A","H","C","N","P"],
      "season": 1
    },
    {
      "_key": "2861653",
      "_id": "Characters/2861653",
      "_rev": "_V1bzsXa--B",
      "name": "Catelyn",
      "surname": "Stark",
      "alive": false,
      "age": 40,
      "traits": ["D","H","C"],
      "season": 1
    },
    {
        ...
    }
  ]
]
```

### Delete documents

To fully remove documents from a collection, there is the `REMOVE` operation. It works similar to the other modification operations, yet without a `WITH` clause:

```js
REMOVE "2861650" IN Characters
```

It can also be used in a loop body to effectively truncate a collection:

```js
FOR c IN Characters
    REMOVE c IN Characters
```

:::note
Re-run the [insert queries](#create-documents) at the top with all character documents before you continue with the next chapter, to have data to work with again.
:::

## Matching documents

So far, we either looked up a single document, or returned the entire character collection. For the lookup, we used the `DOCUMENT()` function, which means we can only find documents by their key or ID.

To find documents that fulfill certain criteria more complex than key equality, there is the `FILTER` operation in C8QL, which enables us to formulate arbitrary conditions for documents to match.

### Equality condition

```js
FOR c IN Characters
    FILTER c.name == "Ned"
    RETURN c
```

The filter condition reads like: "the attribute *name* of a character document must be equal to the string *Ned*". If the condition applies, character document gets returned. This works with any attribute likewise:

```js
FOR c IN Characters
    FILTER c.surname == "Stark"
    RETURN c
```

### Range conditions

Strict equality is one possible condition we can state. There are plenty of other conditions we can formulate however. For example, we could ask for all young characters:

```js
FOR c IN Characters
    FILTER c.age >= 13
    RETURN c.name
```

```json
[
  "Joffrey",
  "Tyrion",
  "Samwell",
  "Ned",
  "Catelyn",
  "Cersei",
  "Jon",
  "Sansa",
  "Brienne",
  "Theon",
  "Davos",
  "Jaime",
  "Daenerys"
]
```

The operator `>=` stands for *greater-or-equal*, so every character of age 13 or older is returned (only their name in the example). We can return names and age of all characters younger than 13 by changing the operator to *less-than* and using the object syntax to define a subset of attributes to return:

```js
FOR c IN Characters
    FILTER c.age < 13
    RETURN { name: c.name, age: c.age }
```

```json
[
  { "name": "Tommen", "age": null },
  { "name": "Arya", "age": 11 },
  { "name": "Roose", "age": null },
  ...
]
```

You may notice that it returns name and age of 30 characters, most with an age of `null`. The reason for this is, that `null` is the fallback value if an attribute is requested by the query, but no such attribute exists in the document, and the `null` is compares to numbers as lower (see [Type and value order](fundamentals#type-value-order)). Hence, it accidentally fulfills the age criterion `c.age < 13` (`null < 13`).

### Multiple conditions

To not let documents pass the filter without an age attribute, we can add a second criterion:

```js
FOR c IN Characters
    FILTER c.age < 13
    FILTER c.age != null
    RETURN { name: c.name, age: c.age }
```

```json
[
  { "name": "Arya", "age": 11 },
  { "name": "Bran", "age": 10 }
]
```

This could equally be written with a boolean `AND` operator as:

```js
FOR c IN Characters
    FILTER c.age < 13 AND c.age != null
    RETURN { name: c.name, age: c.age }
```

And the second condition could as well be `c.age > null`.

### Alternative conditions

If you want documents to fulfill one or another condition, possibly for different attributes as well, use `OR`:

```js
FOR c IN Characters
    FILTER c.name == "Jon" OR c.name == "Joffrey"
    RETURN { name: c.name, surname: c.surname }
```

```json
[
  { "name": "Joffrey", "surname": "Baratheon" },
  { "name": "Jon", "surname": "Snow" }
]
```

See more details about [Filter operations](operations/filter.md).

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

`LIMIT` is followed by a number for the maximum document count. There is a second syntax however, which allows you to skip a certain amount of record and return the next *n* documents:

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

Overall, the documents are sorted by last name. If the *surname* is the same for two characters, the *name* values are compared and the result sorted.

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

See the [SORT operation](operations/sort.md) and [LIMIT operation](operations/limit.md) documentation for more details.

## Joining together


### References to other documents

The character data we imported has an attribute *traits* for each character, which is an array of strings. It does not store character features directly however:

```json
{
    "name": "Ned",
    "surname": "Stark",
    "alive": false,
    "age": 41,
    "traits": ["A","H","C","N","P"]
}
```

It is rather a list of letters without an apparent meaning. The idea here is that *traits* is supposed to store documents keys of another collection, which we can use to resolve the letters to labels such as "strong". The benefit of using another collection for the actual traits is, that we can easily query for all existing traits later on and store labels in multiple languages for instance in a central place. If we would embed traits directly...

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

![Comparison_DataModels](/img/Comparison_DataModels.png)

### Importing traits

Below you find the traits data. Follow the pattern shown in [Create documents](c8ql-tutorial.md) to import it:

- Create a document collection *Traits*
- Assign the data to a variable in C8QL, `LET data = [ ... ]`
- Use a `FOR` loop to iterate over each array element of the data
- `INSERT` the element `INTO Traits`

![Create Traits_Collection](/img/Traits_Collection_Creation.png)

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

Also see the [Fundamentals of Objects / Documents](fundamentals#objects-documents) about attribute access.

We can use the *traits* array together with the `DOCUMENT()` function to use the elements as document keys and look up them up in the *Traits* collection:

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

This is a bit too much information, so let's only return English labels using the [array expansion](array-operators.md#array-expansion) notation:

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

The `MERGE()` functions merges objects together. Because we used an object `{ traits: ... }` which has the same attribute name *traits* as the original character attribute, the latter is overwritten by the merge.

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

![ChildOf graph visualization](/img/ChildOf_Graph.png)

### Creating the edges

To create the required edge documents to store these relations in the database, we can run a query that combines joining and filtering to match up the right character documents, then use their `_id` attribute to insert an edge into an edge collection *ChildOf*.

First off, create a new collection with the name *ChildOf* and make sure you change the collection type to **Edge**.

![ChildOf_Collection_Creation](/img/ChildOf_Collection_Creation.png)

Then run the following query:

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

However, creating the edges programmatically based on character names is a good excercise. Breakdown of the query:

- Assign the relations in form of an array of objects with a *parent* and a *child* attribute each, both with sub-attributes *name* and *surname*, to a variable `data`
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

Now that edges link character documents (vertices), we have a graph we can query to find out who the parents are of another character &ndash; or in graph terms, we want to start at a vertex and follow the edges to other vertices in . A [C8QL graph traversal](graphs/traversals.md):

```js
FOR v IN 1..1 OUTBOUND "Characters/2901776" ChildOf
    RETURN v.name
```

This `FOR` loop doesn't iterate over a collection or an array, it walks the graph and iterates over the connected vertices it finds, with the vertex document assigned to a variable (here: `v`). It can also emit the edges it walked as well as the full path from start to end to [another two variables](graphs/traversals.md#syntax).

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

![ChildOf_Graph](/img/ChildOf_Graph.png)

```js
Tywin <- Jaime <- Joffrey
Tywin <- Cersei <- Joffrey
```

As a quick fix, change the last line of the query to `RETURN DISTINCT v.name` to return each value only once. Keep in mind though, that there are [traversal options](graphs/traversals.md#syntax) to suppress duplicate vertices early on.

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

Geospatial coordinates consisting of a latitude and longitude value can be stored either as two separate attributes, or as a single attribute in the form of an array with both numeric values. C8 can [index such coordinates](./functions/geo.md) for fast geospatial queries.

### Locations data

Let us insert some filming locations into a new collection *Locations*, which you need to create first, then run below C8QL query:

![Locations_Collection_Creation](/img/Locations_Collection_Creation.png)


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

![Locations_Map](/img/Locations_Map.png)

### Geospatial index

To query based on coordinates, a [geo index](../../Manual/Indexing/Geo.html) is required. It determines which fields contain the latitude and longitude values.

- Go to *COLLECTIONS*
- Click on the *Locations* collection
- Switch to the *Indexes* tab at top
- Click the green button with a plus on the right-hand side
- Change the type to *Geo Index*
- Enter `coordinate` into the *Fields* field
- Click *Create* to confirm

![Create geospatial index on coordinate attribute](/img/Locations_GeoIndex_Creation.png)

![Indexes of Locations collection](/img/Locations_Indexes.png)

### Find nearby locations

A `FOR` loop is used again, but this time to iterate over the results of a function call to `NEAR()` to find the *n* closest coordinates to a reference point, and return the documents with the nearby locations. The default for *n* is 100, which means 100 documents are returned at most, the closest matches first.

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

The extra attribute, here called *distance*, is returned as part of the *loc* variable, as if it was part of the location document. The value is divided by 1000 in the example query, to convert the unit to kilometers, simply to make it better readable.

