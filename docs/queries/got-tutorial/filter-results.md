---
sidebar_position: 20
title: Part 2 - Filter Results
---

This section explains how to query for documents based on certain conditions.

So far, we either looked up a single document, or returned the entire character collection. For the lookup, we used the `DOCUMENT()` function, which means we can only find documents by their key or ID.

To find documents that fulfill certain criteria more complex than key equality, there is the `FILTER` operation in C8QL, which enables us to formulate arbitrary conditions for documents to match.

For more information, refer to [FILTER](../operations/filter.md) operation documentation.

In the previous section, we provided step-by-step instructions for every query. In this section, we provide code blocks that you can experiment with. You can paste them in your query editor as-is, but we encourage you to experiment with them. You will learn more if you play around and try your own queries based on our examples.

### Filter by Equality Condition

The first condition we will explore is equality. You can write a query to return documents that exactly match criteria.

In the example below, the filter condition reads like: "the attribute _name_ of a character document must be equal to the string _Ned_". If the condition applies, then the character document gets returned.

```js
FOR c IN Characters
    FILTER c.name == "Ned"
    RETURN c
```

This works with any attribute. This example returns all characters with the surname Stark:

```js
FOR c IN Characters
    FILTER c.surname == "Stark"
    RETURN c
```

There are six characters that meet that criteria, which is a lot of lines to scroll through. You can shoose to return only part of the document, such as the `name` attribute.

```js
FOR c IN Characters
    FILTER c.surname == "Stark"
    RETURN c.name
```

This query returns a much more manageable list:

```js
[
	"Catelyn",
	"Sansa",
	"Arya",
	"Robb",
	"Bran",
	"Ned"
]
```

For fun, run the above query again, but return `{ name: c.name, age: c.age }` instead of `c.name`.

### Filter by Range Conditions

You can also search for documents with attributes that fall within a range of values. For example, you could ask for all older characters:

```js
FOR c IN Characters
    FILTER c.age >= 13
    RETURN c.name
```

The operator `>=` stands for _greater-or-equal_, so every character of age 13 or older is returned (only their name in the example). That query returns a list similar to:

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

You can return names and age of all characters younger than 13 by changing the operator to _less-than_ and using the object syntax to define a subset of attributes to return:

```js
FOR c IN Characters
    FILTER c.age < 13
    RETURN { name: c.name, age: c.age }
```

That query result looks similar to:

```json
[
  { "name": "Tommen", "age": null },
  { "name": "Arya", "age": 11 },
  { "name": "Roose", "age": null },
  ...
]
```

You might notice that it returns name and age of 30 characters, most with an age of `null`. `null` is the fallback value if an attribute is requested by the query, but no such attribute exists in the document.

Because `null` compares to numbers as lower, it accidentally fulfills the age criterion `c.age < 13` (`null < 13`). For more information, refer to [Type and Value Order](../type-and-value-order.md).

### Filter by Multiple Conditions

Those null values are really messing up the query. You can filter out documents without an age attribute if you add a second criterion:

```js
FOR c IN Characters
    FILTER c.age < 13
    FILTER c.age != null
    RETURN { name: c.name, age: c.age }
```

The results of this query do not contain any null ages.

```json
[
  { "name": "Arya", "age": 11 },
  { "name": "Bran", "age": 10 }
]
```

You can get the same results with a boolean `AND` operator:

```js
FOR c IN Characters
    FILTER c.age < 13 AND c.age != null
    RETURN { name: c.name, age: c.age }
```

Or you could write it as:

```js
FOR c IN Characters
    FILTER c.age < 13 AND c.age > null
    RETURN { name: c.name, age: c.age }
```

Try this out! Maybe write a query with a lower age limit and an upper age limit?

### Filter Alternative Conditions

If you want documents to fulfill one or another condition, possibly for different attributes as well, use `OR`:

```js
FOR c IN Characters
    FILTER c.name == "Jon" OR c.name == "Joffrey"
    RETURN { name: c.name, surname: c.surname }
```

This returns characters named Jon or named Joffrey.

```json
[
  { "name": "Joffrey", "surname": "Baratheon" },
  { "name": "Jon", "surname": "Snow" }
]
```

For more informations, refer to [Filter operations](../operations/filter.md).

## Next Steps

Great job! You can now query your collection for documents based on conditions. When you're ready, continue the tutorial in [Part 3 - Sort and Limit](sort-and-limit.md).
