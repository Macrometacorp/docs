---
sidebar_position: 30
title: Part 3 - Sort and Limit
---

This section explains how to sort and limit your query results.

## Limit the Result Count

It might not always be necessary to return all documents that a `FOR` loop would normally return. In those cases, you can limit the amount of documents with a `LIMIT()` operation. For more information, refer to [LIMIT()](../c8ql/operations/limit) operation documentation.

In the example below, `LIMIT` is followed by a number for the maximum document count.

```js
FOR c IN Characters
    LIMIT 5
    RETURN c.name
```

The query returns the first five results, in random order.

```json
[
  "Joffrey",
  "Tommen",
  "Tyrion",
  "Roose",
  "Tywin"
]
```

 You can also skip a certain amount of record and return the next _n_ results:

```js
FOR c IN Characters
    LIMIT 2, 5
    RETURN c.name
```

The second query skips the first two names and returns the next five. Both results feature Tyrion, Roose, and Tywin.

```json
[
  "Tyrion",
  "Roose",
  "Tywin",
  "Samwell",
  "Melisandre"
]
```

## Sort by Name

The order in which matching records were returned by the queries shown until now was basically random. To return them in a defined order, you can add a `SORT()` operation. It can have a big impact on the result if combined with a `LIMIT()`, because the result becomes predictable if you sort first. For more information, refer to [SORT()](../c8ql/operations/sort) operation documentation.

This example returns the first ten documents and sorts by name.

```js
FOR c IN Characters
    SORT c.name
    LIMIT 10
    RETURN c.name
```

Results are in alphabetical order.

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

You can reverse the sort order with `DESC`:

```js
FOR c IN Characters
    SORT c.name DESC
    LIMIT 10
    RETURN c.name
```

The list of ten names is returned in descending order, which means you get the first ten starting at the end of the alphabet.

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

## Sort by Multiple Attributes

What if you want to sort by surname? Many of the characters share a surname. The result order among characters with the same surname is undefined. You can first sort by surname, then name to determine the order:

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

Overall, the documents are sorted by last name. If the _surname_ is the same for two characters, the _name_ values are compared and the result sorted. These results are shown in JSON format; they will look slightly different if you are in the Table view.

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

Note that a filter is applied before sorting, to only let documents through, that actually feature a surname value (many don't have it and would cause `null` values in the result).

## Sort by Age

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

A filter is applied to avoid documents without age attribute. The remaining documents are sorted by age in ascending order, and the name and age of the ten youngest characters are returned.

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

## Next Steps

Great job! You can now sort and limit your query results. When you're ready, continue the tutorial in [Part 4 - Import Traits and Merge](import-and-merge).
