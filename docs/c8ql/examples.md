---
sidebar_position: 3
title: Additional Examples
---

# Overview

## Overview

These pages contain some common query patterns with examples. For better understandability the query results are also included directly below each query.

Normally, you would want to run queries on data stored in collections. This section will provide several examples for that.

Some of the following example queries are executed on a collection 'users' with the data provided here below.

## Things to consider

:::note
All documents created in any collections will automatically get the following server-generated attributes:
:::
- `_id`: A unique id, consisting of collection name and a server-side sequence value
- `_key`: The server sequence value
- `_rev`: The document's revision id



Whenever you run queries on the documents in collections, don't be surprised if these additional attributes are returned as well.

:::note
* With real-world data, you might want to create additional indexes on the data (left out here for brevity). Adding indexes on attributes that are used in `FILTER` statements may considerably speed up queries.
* Also, instead of using attributes such as `id`, `from` and *to*, you might want to use the built-in `_id`, `_from` and `_to` attributes.
* Finally, `edge collections` provides a nice way of establishing references / links between documents. These features have been left out here for brevity as well.
:::

## Example data

Some of the following example queries are executed on a collection `users` with the following initial data:

```json
[ 
  { "id": 100, "name": "John", "age": 37, "active": true, "gender": "m" },
  { "id": 101, "name": "Fred", "age": 36, "active": true, "gender": "m" },
  { "id": 102, "name": "Jacob", "age": 35, "active": false, "gender": "m" },
  { "id": 103, "name": "Ethan", "age": 34, "active": false, "gender": "m" },
  { "id": 104, "name": "Michael", "age": 33, "active": true, "gender": "m" },
  { "id": 105, "name": "Alexander", "age": 32, "active": true, "gender": "m" },
  { "id": 106, "name": "Daniel", "age": 31, "active": true, "gender": "m" },
  { "id": 107, "name": "Anthony", "age": 30, "active": true, "gender": "m" },
  { "id": 108, "name": "Jim", "age": 29, "active": true, "gender": "m" },
  { "id": 109, "name": "Diego", "age": 28, "active": true, "gender": "m" },
  { "id": 200, "name": "Sophia", "age": 37, "active": true, "gender": "f" },
  { "id": 201, "name": "Emma", "age": 36,  "active": true, "gender": "f" },
  { "id": 202, "name": "Olivia", "age": 35, "active": false, "gender": "f" },
  { "id": 203, "name": "Madison", "age": 34, "active": true, "gender": "f" },
  { "id": 204, "name": "Chloe", "age": 33, "active": true, "gender": "f" },
  { "id": 205, "name": "Eva", "age": 32, "active": false, "gender": "f" },
  { "id": 206, "name": "Abigail", "age": 31, "active": true, "gender": "f" },
  { "id": 207, "name": "Isabella", "age": 30, "active": true, "gender": "f" },
  { "id": 208, "name": "Mary", "age": 29, "active": true, "gender": "f" },
  { "id": 209, "name": "Mariah", "age": 28, "active": true, "gender": "f" }
]
```

For some of the examples, we'll also use a collection `relations` to store relationships between users. The example data for `relations` are as follows:

```json
[
  { "from": 209, "to": 205, "type": "friend" },
  { "from": 206, "to": 108, "type": "friend" },
  { "from": 202, "to": 204, "type": "friend" },
  { "from": 200, "to": 100, "type": "friend" },
  { "from": 205, "to": 101, "type": "friend" },
  { "from": 209, "to": 203, "type": "friend" },
  { "from": 200, "to": 203, "type": "friend" },
  { "from": 100, "to": 208, "type": "friend" },
  { "from": 101, "to": 209, "type": "friend" },
  { "from": 206, "to": 102, "type": "friend" },
  { "from": 104, "to": 100, "type": "friend" },
  { "from": 104, "to": 108, "type": "friend" },
  { "from": 108, "to": 209, "type": "friend" },
  { "from": 206, "to": 106, "type": "friend" },
  { "from": 204, "to": 105, "type": "friend" },
  { "from": 208, "to": 207, "type": "friend" },
  { "from": 102, "to": 108, "type": "friend" },
  { "from": 207, "to": 203, "type": "friend" },
  { "from": 203, "to": 106, "type": "friend" },
  { "from": 202, "to": 108, "type": "friend" },
  { "from": 201, "to": 203, "type": "friend" },
  { "from": 105, "to": 100, "type": "friend" },
  { "from": 100, "to": 109, "type": "friend" },
  { "from": 207, "to": 109, "type": "friend" },
  { "from": 103, "to": 203, "type": "friend" },
  { "from": 208, "to": 104, "type": "friend" },
  { "from": 105, "to": 104, "type": "friend" },
  { "from": 103, "to": 208, "type": "friend" },
  { "from": 203, "to": 107, "type": "boyfriend" },
  { "from": 107, "to": 203, "type": "girlfriend" },
  { "from": 208, "to": 109, "type": "boyfriend" },
  { "from": 109, "to": 208, "type": "girlfriend" },
  { "from": 106, "to": 205, "type": "girlfriend" },
  { "from": 205, "to": 106, "type": "boyfriend" },
  { "from": 103, "to": 209, "type": "girlfriend" },
  { "from": 209, "to": 103, "type": "boyfriend" },
  { "from": 201, "to": 102, "type": "boyfriend" },
  { "from": 102, "to": 201, "type": "girlfriend" },
  { "from": 206, "to": 100, "type": "boyfriend" },
  { "from": 100, "to": 206, "type": "girlfriend" }
]
```

## Counting

To return the count of documents that currently exist in a collection, you can call the [LENGTH() function](functions/array#length):

```bash
    RETURN LENGTH(collection)
```

Internally, [COLLECTION_COUNT()](functions/miscellaneous#count) is called.

## Data Modifications

### Overview

The following operations can be used to modify data of multiple documents with one query. This is superior to fetching and updating the documents individually with multiple queries. However, if only a single document needs to be modified, C8's specialized data-modification operations for single documents might execute faster.

### Updating documents

To update existing documents, we can either use the `UPDATE` or the `REPLACE` operation. `UPDATE` updates only the specified attributes in the found documents, and `REPLACE` completely replaces the found documents with the specified values.

We'll start with an `UPDATE` query that rewrites the gender attribute in all documents:

```js
FOR u IN users
  UPDATE u WITH { gender: TRANSLATE(u.gender, { m: 'male', f: 'female' }) } IN users
```

To add new attributes to existing documents, we can also use an `UPDATE` query. The following query adds an attribute `numberOfLogins` for all users with status active:

```js
FOR u IN users
  FILTER u.active == true
  UPDATE u WITH { numberOfLogins: 0 } IN users
```

Existing attributes can also be updated based on their previous value:

```js
FOR u IN users
  FILTER u.active == true
  UPDATE u WITH { numberOfLogins: u.numberOfLogins + 1 } IN users
```

The above query will only work if there was already a `numberOfLogins` attribute present in the document. If it is unsure whether there is a `numberOfLogins` attribute in the document, the increase must be made conditional:

```js
FOR u IN users
  FILTER u.active == true
  UPDATE u WITH {
    numberOfLogins: HAS(u, 'numberOfLogins') ? u.numberOfLogins + 1 : 1
  } IN users
```

Updates of multiple attributes can be combined in a single query:

```js
FOR u IN users
  FILTER u.active == true
  UPDATE u WITH {
    lastLogin: DATE_NOW(),
    numberOfLogins: HAS(u, 'numberOfLogins') ? u.numberOfLogins + 1 : 1
  } IN users
```

Note than an update query might fail during execution, for example because a document to be updated does not exist. In this case, the query will abort at the first error. In single-server mode, all modifications done by the query will be rolled back as if they never happened.

### Replacing documents

To not just partially update, but completely replace existing documents, use the `REPLACE` operation. The following query replaces all documents in the collection backup with the documents found in collection users. Documents common to both collections will be replaced. All other documents will remain unchanged. Documents are compared using their `_key` attributes:

```js
FOR u IN users
  REPLACE u IN backup
```

The above query will fail if there are documents in collection users that are not in collection backup yet. In this case, the query would attempt to replace documents that do not exist. If such case is detected while executing the query, the query will abort. In single-server mode, all changes made by the query will also be rolled back.

To make the query succeed for such case, use the *ignoreErrors* query option:

```js
FOR u IN users
  REPLACE u IN backup OPTIONS { ignoreErrors: true }
```

### Removing documents

Deleting documents can be achieved with the *REMOVE* operation. To remove all users within a certain age range, we can use the following query:

```js
FOR u IN users
  FILTER u.active == true && u.age >= 35 && u.age <= 37
  REMOVE u IN users
```

### Creating documents

To create new documents, there is the *INSERT* operation. It can also be used to generate copies of existing documents from other collections, or to create synthetic documents (e.g. for testing purposes). The following query creates 1000 test users in collection users with some attributes set:

```js
FOR i IN 1..1000
  INSERT {
    id: 100000 + i,
    age: 18 + FLOOR(RAND() * 25),
    name: CONCAT('test', TO_STRING(i)),
    active: false,
    gender: i % 2 == 0 ? 'male' : 'female'
  } IN users
```

### Copying data from one collection into another

To copy data from one collection into another, an *INSERT* operation can be used:

```js
FOR u IN users
  INSERT u IN backup
```

This will copy over all documents from collection users into collection backup. Note that both collections must already exist when the query is executed. The query might fail if backup already contains documents, as executing the insert might attempt to insert the same document (identified by `_key` attribute) again. This will trigger a unique key constraint violation and abort the query. In single-server mode, all changes made by the query will also be rolled back.

To make such copy operation work in all cases, the target collection can be emptied before, using a `REMOVE` query.

### Handling errors

In some cases it might be desirable to continue execution of a query even in the face of errors (e.g. "document not found"). To continue execution of a query in case of errors, there is the *ignoreErrors* option.

To use it, place an `OPTIONS` keyword directly after the data modification part of the query, e.g.

```js
FOR u IN users
  REPLACE u IN backup OPTIONS { ignoreErrors: true }
```

This will continue execution of the query even if errors occur during the `REPLACE` operation. It works similar for `UPDATE`, `INSERT`, and `REMOVE`.

### Altering substructures

To modify lists in documents we have to work with temporary variables. We will collect the sublist in there and alter it. We choose a simple boolean filter condition to make the query better comprehensible.

First lets create a collection with a sample:

```js
database = db._create('complexCollection')
database.save({
  "topLevelAttribute" : "a",
  "subList" : [
    {
      "attributeToAlter" : "oldValue",
      "filterByMe" : true
    },
    {
      "attributeToAlter" : "moreOldValues",
      "filterByMe" : true
    },
    {
      "attributeToAlter" : "unchangedValue",
      "filterByMe" : false
    }
  ]
})
```

Heres the Query which keeps the `subList` on `alteredList` to update it later:

```js
FOR document in complexCollection
  LET alteredList = (
    FOR element IN document.subList
       LET newItem = (! element.filterByMe ?
                      element :
                      MERGE(element, { attributeToAlter: "shiny New Value" }))
       RETURN newItem)
  UPDATE document WITH { subList:  alteredList } IN complexCollection
```

While the query as it is is now functional:

```js
db.complexCollection.toArray()
[
  {
    "_id" : "complexCollection/392671569467",
    "_key" : "392671569467",
    "_rev" : "392799430203",
    "topLevelAttribute" : "a",
    "subList" : [
      {
        "filterByMe" : true,
        "attributeToAlter" : "shiny New Value"
      },
      {
        "filterByMe" : true,
        "attributeToAlter" : "shiny New Value"
      },
      {
        "filterByMe" : false,
        "attributeToAlter" : "unchangedValue"
      }
    ]
  }
]
```

It will probably be soonish a performance bottleneck, since it **modifies** all documents in the collection **regardless whether the values change or not**. Therefore we want to only `UPDATE` the documents if we really change their value. Hence we employ a second `FOR` to test whether `subList` will be altered or not:

```js
FOR document in complexCollection
  LET willUpdateDocument = (
    FOR element IN docToAlter.subList
      FILTER element.filterByMe LIMIT 1 RETURN 1)

  FILTER LENGTH(willUpdateDocument) > 0

  LET alteredList = (
    FOR element IN document.subList
       LET newItem = (! element.filterByMe ?
                      element :
                      MERGE(element, { attributeToAlter: "shiny New Value" }))
       RETURN newItem)

  UPDATE document WITH { subList:  alteredList } IN complexCollection
```

## Diffing Two Documents

There is no built-in C8QL function to compare the attributes of two documents, but it is easily possible to build a query that does:

```js
// input document 1
LET doc1 = {
  "foo": "bar",
  "a": 1,
  "b": 2
}

// input document 2
LET doc2 = {
  "foo": "baz",
  "a": 2,
  "c": 3
}

// collect attributes present in doc1, but missing in doc2
LET missing = (
  FOR key IN ATTRIBUTES(doc1)
  FILTER ! HAS(doc2, key)
  RETURN {
    [ key ]: doc1[key]
  }
)

// collect attributes present in both docs, but that have different values
LET changed = (
  FOR key IN ATTRIBUTES(doc1)
    FILTER HAS(doc2, key) && doc1[key] != doc2[key]
    RETURN {
      [ key ] : {
        old: doc1[key],
        new: doc2[key]
      }
    }
)

// collect attributes present in doc2, but missing in doc1
LET added = (
  FOR key IN ATTRIBUTES(doc2)
    FILTER ! HAS(doc1, key)
    RETURN {
      [ key ]: doc2[key]
    }
)

// return final result
RETURN {
  "missing": missing,
  "changed": changed,
  "added": added
}
```

The query may look a bit lengthy, but much of that is due to formatting. A more terse version can be found below.

The above query will return a document with three attributes:

- `missing`:
  Contains all attributes only present in first document
  (i.e. missing in second document)

- `changed`:
  Contains all attributes present in both documents that have different values

- `added`:
  Contains all attributes only present in second document
  (i.e. missing in first document)

For the two example documents it will return:

```json
[
 {
   "missing" : [
     {
       "b" : 2
     }
   ],
   "changed" : [
     {
       "foo" : {
         "old" : "bar",
         "new" : "baz"
       }
      },
     {
       "a" : {
         "old" : 1,
         "new" : 2
       }
     }
   ],
   "added" : [
     {
       "c" : 3
     }
   ]
 }
]
```

You may adjust the query to produce a different output format.

Following is a version of the same query that can be invoked from JavaScript easily. It passes the two documents as bind parameters and calls `db._query`.

The query is now an one-liner (less readable but easier to copy & paste):

```js
bindVariables = {
  doc1 : { "foo" : "bar", "a" : 1, "b" : 2 },
  doc2 : { "foo" : "baz", "a" : 2, "c" : 3 }
};

query = "LET doc1 = @doc1, doc2 = @doc2, missing = (FOR key IN ATTRIBUTES(doc1) FILTER ! HAS(doc2, key) RETURN { [ key ]: doc1[key] }), changed = (FOR key IN ATTRIBUTES(doc1) FILTER HAS(doc2, key) && doc1[key] != doc2[key] RETURN { [ key ] : { old: doc1[key], new: doc2[key] } }), added = (FOR key IN ATTRIBUTES(doc2) FILTER ! HAS(doc1, key) RETURN { [ key ] : doc2[key] }) RETURN { missing : missing, changed : changed, added : added }";

result = db._query(query, bindVariables).toArray();
```

## Grouping

To group results by arbitrary criteria, C8QL provides the `COLLECT` keyword. `COLLECT` will perform a grouping, but no aggregation. Aggregation can still be added in the query if required.

### Ensuring uniqueness

`COLLECT` can be used to make a result set unique. The following query will return each distinct `age` attribute value only once:

```js
FOR u IN users
    COLLECT age = u.age
    RETURN age
```

This is grouping without tracking the group values, but just the group criterion (*age*) value.

Grouping can also be done on multiple levels using `COLLECT`:

```js
FOR u IN users
    COLLECT status = u.status, age = u.age
    RETURN { status, age }
```

Alternatively `RETURN DISTINCT` can be used to make a result set unique. `RETURN DISTINCT` supports a single criterion only:

```js
FOR u IN users
    RETURN DISTINCT u.age
```

Note: the order of results is undefined for `RETURN DISTINCT`.

### Fetching group values

To group users by age, and return the names of the users with the highest ages, we'll issue a query like this:

```js
FOR u IN users
    FILTER u.active == true
    COLLECT age = u.age INTO usersByAge
    SORT age DESC LIMIT 0, 5
    RETURN {
        age,
        users: usersByAge[*].u.name
    }
```

```json
[
  { "age": 37, "users": [ "John", "Sophia" ] },
  { "age": 36, "users": [ "Fred", "Emma" ] },
  { "age": 34, "users": [ "Madison" ] },
  { "age": 33, "users": [ "Chloe", "Michael" ] },
  { "age": 32, "users": [ "Alexander" ] }
]
```

The query will put all users together by their *age* attribute. There will be one result document per distinct *age* value (let aside the `LIMIT`). For each group, we have access to the matching document via the `usersByAge` variable introduced in the `COLLECT` statement.

### Variable Expansion

The `usersByAge` variable contains the full documents found, and as we're only interested in user names, we'll use the expansion operator <i>[\*]</i> to extract just the `name` attribute of all user documents in each group:

```js
usersByAge[*].u.name
```

The <i>[\*]</i> expansion operator is just a handy short-cut. We could also write
a subquery:

```js
( FOR temp IN usersByAge RETURN temp.u.name )
```

### Grouping by multiple criteria

To group by multiple criteria, we'll use multiple arguments in the `COLLECT` clause. For example, to group users by `ageGroup` (a derived value we need to calculate first) and then by `gender`, we'll do:

```js
FOR u IN users
    FILTER u.active == true
    COLLECT ageGroup = FLOOR(u.age / 5) * 5,
            gender = u.gender INTO group
    SORT ageGroup DESC
    RETURN {
        ageGroup,
        gender
    }
```

```json
[
  { "ageGroup": 35, "gender": "f" },
  { "ageGroup": 35, "gender": "m" },
  { "ageGroup": 30, "gender": "f" },
  { "ageGroup": 30, "gender": "m" },
  { "ageGroup": 25, "gender": "f" },
  { "ageGroup": 25, "gender": "m" }
]
```

### Counting group values

If the goal is to count the number of values in each group, C8QL provides the special `COLLECT WITH COUNT INTO` syntax. This is a simple variant for grouping with an additional group length calculation:

```js
FOR u IN users
    FILTER u.active == true
    COLLECT ageGroup = FLOOR(u.age / 5) * 5,
            gender = u.gender WITH COUNT INTO numUsers
    SORT ageGroup DESC
    RETURN {
        ageGroup,
        gender,
        numUsers
    }
```

```json
[
  { "ageGroup": 35, "gender": "f", "numUsers": 2 },
  { "ageGroup": 35, "gender": "m", "numUsers": 2 },
  { "ageGroup": 30, "gender": "f", "numUsers": 4 },
  { "ageGroup": 30, "gender": "m", "numUsers": 4 },
  { "ageGroup": 25, "gender": "f", "numUsers": 2 },
  { "ageGroup": 25, "gender": "m", "numUsers": 2 }
]
```

### Aggregation

Adding further aggregation is also simple in C8QL by using an `AGGREGATE` clause in the `COLLECT`:

```js
FOR u IN users
    FILTER u.active == true
    COLLECT ageGroup = FLOOR(u.age / 5) * 5,
            gender = u.gender
    AGGREGATE numUsers = LENGTH(1),
              minAge = MIN(u.age),
              maxAge = MAX(u.age)
    SORT ageGroup DESC
    RETURN {
        ageGroup,
        gender,
        numUsers,
        minAge,
        maxAge
    }
```

```json
[
  {
    "ageGroup": 35,
    "gender": "f",
    "numUsers": 2,
    "minAge": 36,
    "maxAge": 39,
  },
  {
    "ageGroup": 35,
    "gender": "m",
    "numUsers": 2,
    "minAge": 35,
    "maxAge": 39,
  },
  ...
]
```

We have used the aggregate functions `LENGTH` here (it returns the length of an array). This is the equivalent to SQL's `SELECT g, COUNT(*) FROM ... GROUP BY g`. In addition to `LENGTH` C8QL also provides `MAX`, `MIN`, `SUM` and `AVERAGE`, `VARIANCE_POPULATION`, `VARIANCE_SAMPLE`, `STDDEV_POPULATION` and `STDDEV_SAMPLE` as basic aggregation functions.

In C8QL all aggregation functions can be run on arrays only. If an aggregation function is run on anything that is not an array, a warning will be produced and the result will be *null*.

Using an `AGGREGATE` clause will ensure the aggregation is run while the groups are built in the collect operation. This is normally more efficient than collecting all group values for all groups and then doing a post-aggregation.


### Post-aggregation

Aggregation can also be performed after a `COLLECT` operation using other C8QL constructs, though performance-wise this is often inferior to using `COLLECT` with `AGGREGATE`.

The same query as before can be turned into a post-aggregation query as shown below. Note that this query will build and pass on all group values for all groups inside the variable *g*, and perform the aggregation at the latest possible stage:

```js
FOR u IN users
    FILTER u.active == true
    COLLECT ageGroup = FLOOR(u.age / 5) * 5,
            gender = u.gender INTO g
    SORT ageGroup DESC
    RETURN {
        ageGroup,
        gender,
        numUsers: LENGTH(g[*]),
        minAge: MIN(g[*].u.age),
        maxAge: MAX(g[*].u.age)
    }
```

```json
[
  {
    "ageGroup": 35,
    "gender": "f",
    "numUsers": 2,
    "minAge": 36,
    "maxAge": 39,
  },
  {
    "ageGroup": 35,
    "gender": "m",
    "numUsers": 2,
    "minAge": 35,
    "maxAge": 39,
  },
  ...
]
```

This is in constrast to the previous query that used an `AGGREGATE` clause to perform the aggregation during the collect operation, at the earliest possible stage.


### Post-filtering aggregated data

To filter the results of a grouping or aggregation operation (i.e. something similar to `HAVING` in SQL), simply add another `FILTER` clause after the `COLLECT` statement.

For example, to get the 3 `ageGroup`s with the most users in them:

```js
FOR u IN users
    FILTER u.active == true
    COLLECT ageGroup = FLOOR(u.age / 5) * 5 INTO group
    LET numUsers = LENGTH(group)
    FILTER numUsers > 2 /* group must contain at least 3 users in order to qualify */
    SORT numUsers DESC
    LIMIT 0, 3
    RETURN {
        "ageGroup": ageGroup,
        "numUsers": numUsers,
        "users": group[*].u.name
    }
```

```json
[
  {
    "ageGroup": 30,
    "numUsers": 8,
    "users": [
      "Abigail",
      "Madison",
      "Anthony",
      "Alexander",
      "Isabella",
      "Chloe",
      "Daniel",
      "Michael"
    ]
  },
  {
    "ageGroup": 25,
    "numUsers": 4,
    "users": [
      "Mary",
      "Mariah",
      "Jim",
      "Diego"
    ]
  },
  {
    "ageGroup": 35,
    "numUsers": 4,
    "users": [
      "Fred",
      "John",
      "Emma",
      "Sophia"
    ]
  }
]
```

To increase readability, the repeated expression `LENGTH(group)` was put into a variable `numUsers`. The `FILTER` on `numUsers` is the equivalent an SQL `HAVING` clause.

## Joins

The two common scenarios when you want to join documents of collections are:

- **One-to-Many**: You may have a collection _users_ and a collection _cities_. A user lives in a city and you need the city information during a query about the user.

- **Many-To-Many**: You may have a collection _authors_ and _books_. An author can write many books and a book can have many authors. You want to return a list of books with their authors. Therefore you need to join the authors and books.

Unlike many NoSQL databases, GDN does support joins in C8QL queries. This is similar to the way traditional relational databases handle this. However, because documents allow for more flexibility, joins are also more flexible. The following sections provide solutions for common questions.

So far we have only dealt with one collection (*users*) at a time. We also have a collection *relations* that stores relationships between users. We will now use this extra collection to create a result from two collections.

First of all, we'll query a few users together with their friends' ids. For that, we'll use all *relations* that have a value of *friend* in their *type* attribute. Relationships are established by using the *friendOf* and *thisUser* attributes in the *relations* collection, which point to the *userId* values in the *users* collection.

### One-To-Many

You have a collection called `users`. Users live in city and a city is identified by its primary key. In principle you can embedded the city document into the users document and be happy with it.

```json
{
  "_id" : "users/2151975421",
  "_key" : "2151975421",
  "_rev" : "2151975421",
  "name" : {
    "first" : "John",
    "last" : "Doe"
  },
  "city" : {
    "name" : "Metropolis"
  }
}
```

This works well for many use cases. Now assume, that you have additional information about the city, like the number of people living in it. It would be impractical to change each and every user document if this numbers changes. Therefore it is good idea to hold the city information in a separate collection.

```js
cities.document("cities/2241300989");
```

```json
{ 
  "population" : 1000, 
  "name" : "Metropolis", 
  "_id" : "cities/2241300989", 
  "_rev" : "2241300989", 
  "_key" : "2241300989" 
}
```

Now you instead of embedding the city directly in the user document, you can use the key of the city.

```js
users.document("users/2290649597");
```

```json
{ 
  "name" : { 
    "first" : "John", 
    "last" : "Doe" 
  }, 
  "city" : "cities/2241300989", 
  "_id" : "users/2290649597", 
  "_rev" : "2290649597", 
  "_key" : "2290649597" 
}
```

We can now join these two collections very easily.

```js
FOR u IN users
  FOR c IN cities
    FILTER u.city == c._id RETURN { user: u, city: c }
```

```json
[ 
  { 
    "user" : { 
      "name" : { 
        "first" : "John", 
        "last" : "Doe" 
      }, 
      "city" : "cities/2241300989", 
      "_id" : "users/2290649597", 
      "_rev" : "2290649597", 
      "_key" : "2290649597" 
    }, 
    "city" : { 
      "population" : 1000, 
      "name" : "Metropolis", 
      "_id" : "cities/2241300989", 
      "_rev" : "2241300989", 
      "_key" : "2241300989" 
    } 
  } 
]
```

Unlike SQL there is no special `JOIN` keyword. The optimizer ensures that the primary index is used in the above query.

However, very often it is much more convenient for the client of the query if a single document would be returned, where the city information is embedded in the user document - as in the simple example above. With C8QL there you do not need to forgo this simplification.

```js
FOR u IN users
  FOR c IN cities
    FILTER u.city == c._id RETURN merge(u, {city: c})
```

```json
[ 
  { 
    "_id" : "users/2290649597", 
    "_key" : "2290649597", 
    "_rev" : "2290649597", 
    "name" : { 
      "first" : "John", 
      "last" : "Doe" 
    }, 
    "city" : { 
      "_id" : "cities/2241300989", 
      "_key" : "2241300989", 
      "_rev" : "2241300989", 
      "population" : 1000, 
      "name" : "Metropolis" 
    } 
  } 
]
```

So you can have both: the convenient representation of the result for your client and the flexibility of joins for your data model.

### Many-To-Many

In the relational word you need a third table to model the many-to-many relation. In GDN you have a choice depending on the information you are going to store and the type of questions you are going to ask.

Assume that authors are stored in one collection and books in a second. If all you need is "which are the authors of a book" then you can easily model this as a list attribute in users.

If you want to store more information, for example which author wrote which page in a conference proceeding, or if you also want to know "which books were written by which author", you can use edge collections. This is very similar to the "join table" from the relational world.

### Embedded Lists

If you only want to store the authors of a book, you can embed them as list in the book document. There is no need for a separate collection.

```js
authors.toArray()
```

```json
[ 
  { 
    "_id" : "authors/2661190141", 
    "_key" : "2661190141", 
    "_rev" : "2661190141", 
    "name" : { 
      "first" : "Maxima", 
      "last" : "Musterfrau" 
    } 
  }, 
  { 
    "_id" : "authors/2658437629", 
    "_key" : "2658437629", 
    "_rev" : "2658437629", 
    "name" : { 
      "first" : "John", 
      "last" : "Doe" 
    } 
  } 
]
```

You can query books

```js
"FOR b IN books RETURN b"
```

```json
[ 
  { 
    "_id" : "books/2681506301", 
    "_key" : "2681506301", 
    "_rev" : "2681506301", 
    "title" : "The beauty of JOINS", 
    "authors" : [ 
      "authors/2661190141", 
      "authors/2658437629" 
    ] 
  } 
]
```

and join the authors in a very similar manner given in the one-to-many section.

```js
FOR b IN books
  LET a = (FOR x IN b.authors 
    FOR a IN authors FILTER x == a._id RETURN a)
  RETURN { book: b, authors: a }
```

```json
[ 
  { 
    "book" : { 
      "title" : "The beauty of JOINS", 
      "authors" : [ 
        "authors/2661190141", 
        "authors/2658437629" 
      ], 
      "_id" : "books/2681506301", 
      "_rev" : "2681506301", 
      "_key" : "2681506301" 
    }, 
    "authors" : [ 
      { 
        "name" : { 
          "first" : "Maxima", 
          "last" : "Musterfrau" 
        }, 
        "_id" : "authors/2661190141", 
        "_rev" : "2661190141", 
        "_key" : "2661190141" 
      }, 
      { 
        "name" : { 
          "first" : "John", 
          "last" : "Doe" 
        }, 
        "_id" : "authors/2658437629", 
        "_rev" : "2658437629", 
        "_key" : "2658437629" 
      } 
    ] 
  } 
]
```

… or embed the authors directly:

```js
FOR b IN books LET a = (
  FOR x IN b.authors 
    FOR a IN authors FILTER x == a._id RETURN a)
  RETURN merge(b, { authors: a })
```

```json
[ 
  { 
    "_id" : "books/2681506301", 
    "_key" : "2681506301", 
    "_rev" : "2681506301", 
    "title" : "The beauty of JOINS", 
    "authors" : [ 
      { 
        "_id" : "authors/2661190141", 
        "_key" : "2661190141", 
        "_rev" : "2661190141", 
        "name" : { 
          "first" : "Maxima", 
          "last" : "Musterfrau" 
        } 
      }, 
      { 
        "_id" : "authors/2658437629", 
        "_key" : "2658437629", 
        "_rev" : "2658437629", 
        "name" : { 
          "first" : "John", 
          "last" : "Doe" 
        } 
      } 
    ] 
  } 
]
```

### Using Edge Collections

If you also want to query which books are written by a given author, embedding authors in the book document is possible, but it is more efficient to use a edge collections for speed.

Or you are publishing a proceeding, then you want to store the pages the author has written as well. This information can be stored in the edge document.

First create the users

```js
db.create("authors");
```

```
[Collection 2926807549, "authors" (type document, status loaded)]
```

```js
authors.save({ name: { first: "John", last: "Doe" } })
```

```json
{ 
  "error" : false, 
  "_id" : "authors/2935261693", 
  "_rev" : "2935261693", 
  "_key" : "2935261693" 
}
```

```js
authors.save({ name: { first: "Maxima", last: "Musterfrau" } })
```

```json
{ 
  "error" : false, 
  "_id" : "authors/2938210813", 
  "_rev" : "2938210813", 
  "_key" : "2938210813" 
}
```

Now create the books without any author information.

```js
db.create("books");
```

```json
[Collection 2928380413, "books" (type document, status loaded)]
```

```js
books.save({ title: "The beauty of JOINS" });
```

```json
{ 
  "error" : false, 
  "_id" : "books/2980088317", 
  "_rev" : "2980088317", 
  "_key" : "2980088317" 
}
```

An edge collection is now used to link authors and books.

```js
db.createEdgeCollection("written");
```

```json
[Collection 2931132925, "written" (type edge, status loaded)]
```

```js
written.save("authors/2935261693", "books/2980088317", { pages: "1-10" })
```

```json
{ 
  "error" : false, 
  "_id" : "written/3006237181", 
  "_rev" : "3006237181", 
  "_key" : "3006237181" 
}
```

```js
written.save("authors/2938210813", "books/2980088317", { pages: "11-20" })
```

```json
{ 
  "error" : false, 
  "_id" : "written/3012856317", 
  "_rev" : "3012856317", 
  "_key" : "3012856317" 
}
```

In order to get all books with their authors you can use a [graph traversal](./graphs/traversals#working-with-collection-sets)

```js
FOR b IN books
LET authorsByBook = (
  FOR author, writtenBy IN INBOUND b written
    RETURN {
        vertex: author,
        edge: writtenBy
    }
)
RETURN {
    book: b,
    authors: authorsByBook
}
```

```json
[
  {
    "book" : {
      "_key" : "2980088317",
      "_id" : "books/2980088317",
      "_rev" : "2980088317",
      "title" : "The beauty of JOINS"
    },
    "authors" : [
      {
        "vertex" : {
          "_key" : "2935261693",
          "_id" : "authors/2935261693",
          "_rev" : "2935261693",
          "name" : {
            "first" : "John",
            "last" : "Doe"
          }
        },
        "edge" : {
          "_key" : "2935261693",
          "_id" : "written/2935261693",
          "_from" : "authors/2935261693",
          "_to" : "books/2980088317",
          "_rev" : "3006237181",
          "pages" : "1-10"
        }
      },
      {
        "vertex" : {
          "_key" : "2938210813",
          "_id" : "authors/2938210813",
          "_rev" : "2938210813",
          "name" : {
            "first" : "Maxima",
            "last" : "Musterfrau"
          }
        },
        "edge" : {
          "_key" : "6833274",
          "_id" : "written/6833274",
          "_from" : "authors/2938210813",
          "_to" : "books/2980088317",
          "_rev" : "3012856317",
          "pages" : "11-20"
        }
      }
    ]
  }
]
```

Or if you want only the information stored in the vertices.

```js
FOR b IN books
LET authorsByBook = (
    FOR author IN INBOUND b written
    OPTIONS {
        bfs: true,
        uniqueVertices: 'global'
    }
    RETURN author
)
RETURN {
    book: b,
    authors: authorsByBook
}
```

```json
[
  {
    "book" : {
      "_key" : "2980088317",
      "_id" : "books/2980088317",
      "_rev" : "2980088317",
      "title" : "The beauty of JOINS"
    },
    "authors" : [
      {
        "_key" : "2938210813",
        "_id" : "authors/2938210813",
        "_rev" : "2938210813",
        "name" : {
          "first" : "Maxima",
          "last" : "Musterfrau"
        }
      },
      {
        "_key" : "2935261693",
        "_id" : "authors/2935261693",
        "_rev" : "2935261693",
        "name" : {
          "first" : "John",
          "last" : "Doe"
        }
      }
    ]
  }
]
```

Or again embed the authors directly into the book document.

```js
FOR b IN books
LET authors = (
    FOR author IN INBOUND b written
    OPTIONS {
        bfs: true,
        uniqueVertices: 'global'
    }
    RETURN author
)
RETURN MERGE(b, {authors: authors})
```

```json
[
  {
    "_id" : "books/2980088317",
    "_key" : "2980088317",
    "_rev" : "2980088317",
    "title" : "The beauty of JOINS",
    "authors" : [
      {
        "_key" : "2938210813",
        "_id" : "authors/2938210813",
        "_rev" : "2938210813",
        "name" : {
          "first" : "Maxima",
          "last" : "Musterfrau"
        }
      },
      {
        "_key" : "2935261693",
        "_id" : "authors/2935261693",
        "_rev" : "2935261693",
        "name" : {
          "first" : "John",
          "last" : "Doe"
        }
      }
    ]
  }
]
```

If you need the authors and their books, simply reverse the direction.

```js
FOR a IN authors
LET booksByAuthor = (
    FOR b IN OUTBOUND a written
    OPTIONS {
        bfs: true,
        uniqueVertices: 'global'
    }
    RETURN b
)
RETURN MERGE(a, {books: booksByAuthor})
```

```json
[
  {
    "_id" : "authors/2935261693",
    "_key" : "2935261693",
    "_rev" : "2935261693",
    "name" : {
      "first" : "John",
      "last" : "Doe"
    },
    "books" : [
      {
        "_key" : "2980088317",
        "_id" : "books/2980088317",
        "_rev" : "2980088317",
        "title" : "The beauty of JOINS"
      }
    ]
  },
  {
    "_id" : "authors/2938210813",
    "_key" : "2938210813",
    "_rev" : "2938210813",
    "name" : {
      "first" : "Maxima",
      "last" : "Musterfrau"
    },
    "books" : [
      {
        "_key" : "2980088317",
        "_id" : "books/2980088317",
        "_rev" : "2980088317",
        "title" : "The beauty of JOINS"
      }
    ]
  }
]
```

### Join tuples

We will start with a SQL-ish result set and return each tuple (user name, friends userId) separately. The C8QL query to generate such result is:

```js
    FOR u IN users
      FILTER u.active == true
      LIMIT 0, 4
      FOR f IN relations
        FILTER f.type == @friend && f.friendOf == u.userId
        RETURN {
          "user" : u.name,
          "friendId" : f.thisUser
        }
    @BV {
    friend: "friend"
    }
```

We iterate over the collection users. Only the 'active' users will be examined. For each of these users we will search for up to 4 friends. We locate friends by comparing the *userId* of our current user with the *friendOf* attribute of the *relations* document. For each of those relations found we return the users name and the userId of the friend.

### Horizontal lists

Note that in the above result, a user can be returned multiple times. This is the SQL way of returning data. If this is not desired, the friends' ids of each user can be returned in a horizontal list. This will return each user at most once.

The C8QL query for doing so is:

```js
FOR u IN users
  FILTER u.active == true LIMIT 0, 4
  RETURN {
    "user" : u.name,
    "friendIds" : (
      FOR f IN relations
        FILTER f.friendOf == u.userId && f.type == "friend"
        RETURN f.thisUser
    )
  }
```

```json
[
  {
    "user" : "Abigail",
    "friendIds" : [
      108,
      102,
      106
    ]
  },
  {
    "user" : "Fred",
    "friendIds" : [
      209
    ]
  },
  {
    "user" : "Mary",
    "friendIds" : [
      207,
      104
    ]
  },
  {
    "user" : "Mariah",
    "friendIds" : [
      203,
      205
    ]
  }
]
```

In this query we are still iterating over the users in the *users* collection and for each matching user we are executing a subquery to create the matching list of related users.

### Self joins

To not only return friend ids but also the names of friends, we could "join" the *users* collection once more (something like a "self join"):

```js
FOR u IN users
  FILTER u.active == true
  LIMIT 0, 4
  RETURN {
    "user" : u.name,
    "friendIds" : (
      FOR f IN relations
        FILTER f.friendOf == u.userId && f.type == "friend"
        FOR u2 IN users
          FILTER f.thisUser == u2.useId
          RETURN u2.name
    )
  }
```

```json
[
  {
    "user" : "Abigail",
    "friendIds" : [
      "Jim",
      "Jacob",
      "Daniel"
    ]
  },
  {
    "user" : "Fred",
    "friendIds" : [
      "Mariah"
    ]
  },
  {
    "user" : "Mary",
    "friendIds" : [
      "Isabella",
      "Michael"
    ]
  },
  {
    "user" : "Mariah",
    "friendIds" : [
      "Madison",
      "Eva"
    ]
  }
]
```

This query will then again in term fetch the clear text name of the friend from the users collection. So here we iterate the users collection, and for each hit the relations collection, and for each hit once more the users collection.

### Outer joins

Lets find the lonely people in our database - those without friends.

```js

FOR user IN users
  LET friendList = (
    FOR f IN relations
      FILTER f.friendOf == u.userId
      RETURN 1
  )
  FILTER LENGTH(friendList) == 0
  RETURN { "user" : user.name }
```

```json
[
  {
    "user" : "Abigail"
  },
  {
    "user" : "Fred"
  }
]
```

So, for each user we pick the list of their friends and count them. The ones where count equals zero are the lonely people. Using *RETURN 1* in the subquery saves even more precious CPU cycles and gives the optimizer more alternatives.

### Index usage

Especially on joins you should make sure indices can be used to [speed up your query](execution-and-performance-explaining-queries.html). Please note that sparse indices don't qualify for joins:

In joins you typically would also want to join documents not containing the property you join with. However sparse indices don't contain references to documents that don't contain the indexed attributes - thus they would be missing from the join operation. For that reason you should provide non-sparse indices. 

### Pitfalls

Since we're free of schemata, there is by default no way to tell the format of the documents. So, if your documents don't contain an attribute, it defaults to null. We can however check our data for accuracy like this:

```js
RETURN LENGTH(FOR u IN users FILTER u.userId == null RETURN 1)
```

```json
[
  10000
]
```

```js
RETURN LENGTH(FOR f IN relations FILTER f.friendOf == null RETURN 1)
```

```json
[
  10000
]
```

So if the above queries return 10k matches each, the result of the Join tuples query will become 100,000,000 items larger and use much memory plus computation time. So it is generally a good idea to revalidate that the criteria for your join conditions exist.

Using indices on the properties can speed up the operation significantly. You can use the explain helper to revalidate your query actually uses them.

If you work with joins on edge collections you would typically aggregate over the internal fields `_id`, `_from` and `_to` (where `_id` equals `userId`, `_from` would be `friendOf` and `_to` would be `thisUser` in our examples). GDN implicitly creates indices on them.

## Projections and Filters

### Returning unaltered documents

To return three complete documents from collection `users`, the following query can be used:

```js
FOR u IN users 
  LIMIT 0, 3
  RETURN u
```

```json
[ 
  { 
    "_id" : "users/229886047207520", 
    "_rev" : "229886047207520", 
    "_key" : "229886047207520", 
    "active" : true, 
    "id" : 206, 
    "age" : 31, 
    "gender" : "f", 
    "name" : "Abigail" 
  }, 
  { 
    "_id" : "users/229886045175904", 
    "_rev" : "229886045175904", 
    "_key" : "229886045175904", 
    "active" : true, 
    "id" : 101, 
    "age" : 36, 
    "name" : "Fred", 
    "gender" : "m" 
  }, 
  { 
    "_id" : "users/229886047469664", 
    "_rev" : "229886047469664", 
    "_key" : "229886047469664", 
    "active" : true, 
    "id" : 208, 
    "age" : 29, 
    "name" : "Mary", 
    "gender" : "f" 
  }
]
```

:::note
There is a `LIMIT` clause but no `SORT` clause. In this case it is not guaranteed which of the user documents are returned. Effectively the document return order is unspecified if no `SORT` clause is used, and you should not rely on the order in such queries.
:::

### Projections

To return a projection from the collection `users` use a modified `RETURN` instruction:

```js
FOR u IN users 
  LIMIT 0, 3
  RETURN { 
    "user" : { 
      "isActive" : u.active ? "yes" : "no", 
      "name" : u.name 
    } 
  }
```

```json
[ 
  { 
    "user" : { 
      "isActive" : "yes", 
      "name" : "John" 
    } 
  }, 
  { 
    "user" : { 
      "isActive" : "yes", 
      "name" : "Anthony" 
    } 
  }, 
  { 
    "user" : { 
      "isActive" : "yes", 
      "name" : "Fred" 
    } 
  }
]
```

### Filters

To return a filtered projection from collection `users`, you can use the `FILTER` keyword. Additionally, a `SORT` clause is used to have the result returned in a specific order:

```js
FOR u IN users 
  FILTER u.active == true && u.age >= 30
  SORT u.age DESC
  LIMIT 0, 5
  RETURN { 
    "age" : u.age, 
    "name" : u.name 
  }
```

```json
[ 
  { 
    "age" : 37, 
      "name" : "Sophia" 
  }, 
  { 
    "age" : 37, 
    "name" : "John" 
  }, 
  { 
    "age" : 36, 
    "name" : "Emma" 
  }, 
  { 
    "age" : 36, 
    "name" : "Fred" 
  }, 
  { 
    "age" : 34, 
    "name" : "Madison" 
  } 
]
```

## Subqueries

Wherever an expression is allowed in C8QL, a subquery can be placed. A subquery is a query part that can introduce its own local variables without affecting variables and values in its outer scope(s).

It is required that subqueries be put inside parentheses `(` and `)` to explicitly mark their start and end points:

```js
FOR p IN persons
  LET recommendations = (
    FOR r IN recommendations
      FILTER p.id == r.personId
      SORT p.rank DESC
      LIMIT 10
      RETURN r
  )
  RETURN { person : p, recommendations : recommendations }
```

```js
FOR p IN persons
  COLLECT city = p.city INTO g
  RETURN {
    city : city,
    numPersons : LENGTH(g),
    maxRating: MAX(
      FOR r IN g
      RETURN r.p.rating
    )}
```

Subqueries may also include other subqueries.

Note that subqueries always return a result **array**, even if there is only a single return value:

```js
RETURN ( RETURN 1 )
```

```json
[ [ 1 ] ]
```

To avoid such a nested data structure,  [FIRST()](./functions/array#first) can be used for example:

```js
RETURN FIRST( RETURN 1 )
```

```json
[ 1 ]
```

## Queries without Collections

Following is a query that returns a string value. The result string is contained in an array because the result of every valid query is an array:

```js
RETURN "this will be returned"
[ 
  "this will be returned" 
]
```

Here is a query that creates the cross products of two arrays and runs a projection on it, using a few of C8QL's built-in functions:

```js
FOR year in [ 2011, 2012, 2013 ]
  FOR quarter IN [ 1, 2, 3, 4 ]
    RETURN { 
      "y" : "year", 
      "q" : quarter, 
      "nice" : CONCAT(quarter, "/", year) 
    }
[ 
  { "y" : "year", "q" : 1, "nice" : "1/2011" }, 
  { "y" : "year", "q" : 2, "nice" : "2/2011" }, 
  { "y" : "year", "q" : 3, "nice" : "3/2011" }, 
  { "y" : "year", "q" : 4, "nice" : "4/2011" }, 
  { "y" : "year", "q" : 1, "nice" : "1/2012" }, 
  { "y" : "year", "q" : 2, "nice" : "2/2012" }, 
  { "y" : "year", "q" : 3, "nice" : "3/2012" }, 
  { "y" : "year", "q" : 4, "nice" : "4/2012" }, 
  { "y" : "year", "q" : 1, "nice" : "1/2013" }, 
  { "y" : "year", "q" : 2, "nice" : "2/2013" }, 
  { "y" : "year", "q" : 3, "nice" : "3/2013" }, 
  { "y" : "year", "q" : 4, "nice" : "4/2013" } 
]
```

## Dynamic Attribute Names

You might want a C8QL query to return results with attribute names assembled by a function, or with a variable number of attributes.

This will not work by specifying the result using a regular object literal, as object literals require the names and numbers of attributes to be fixed at query compile time.

There are two solutions to getting dynamic attribute names to work:

- Using expressions as attribute names (fixed amount of attributes)
- Using subqueries and the `ZIP()` function (variable amount of attributes)

### Using expressions as attribute names

This solution works in cases where the number of dynamic attributes to return is known in advance, and only the attribute names need to be calculated using an expression.

GDN allows using expressions instead of fixed attribute names in object literals. Using expressions as attribute names requires enclosing the expression in extra `[` and `]` to disambiguate them from regular, unquoted attribute names.

Let us create a result that returns the original document data contained in a dynamically named attribute. We will be using the expression `doc.type` for the attribute name. We will also return some other attributes from the original documents, but prefix them with the documents' `_key` attribute values. For this we also need attribute name expressions.

Here is a query showing how to do this. The attribute name expressions all required to be enclosed in `[` and `]` in order to make this work:

```js
LET documents = [
  { "_key" : "3231748397810", "gender" : "f", "status" : "active", "type" : "user" },
  { "_key" : "3231754427122", "gender" : "m", "status" : "inactive", "type" : "unknown" }
]

FOR doc IN documents
  RETURN {
    [ doc.type ] : {
      [ CONCAT(doc._key, "_gender") ] : doc.gender,
      [ CONCAT(doc._key, "_status") ] : doc.status
    }
  }
```

This will return:

```json
[
  {
    "user": {
      "3231748397810_gender": "f",
      "3231748397810_status": "active"
    }
  },
  {
    "unknown": {
      "3231754427122_gender": "m",
      "3231754427122_status": "inactive"
    }
  }
]
```

:::note
Attribute name expressions and regular, unquoted attribute names can be mixed.
:::
### Subquery solution

A generalized solution is to let a subquery or another function produce the dynamic attribute names, and finally pass them through the `ZIP()` function to create an object from them.

Let us assume we want to process the following input documents:

```json
{ "name": "test", "gender": "f", "status": "active", "type": "user" }
{ "name": "dummy", "gender": "m", "status": "inactive", "type": "unknown", "magicFlag": 23 }
```

Let us also assume our goal for each of these documents is to return only the attribute names that contain the letter `a`, together with their respective values.

To extract the attribute names and values from the original documents, we can use a subquery as follows:

```js
LET documents = [
  { "name": "test"," gender": "f", "status": "active", "type": "user" },
  { "name": "dummy", "gender": "m", "status": "inactive", "type": "unknown", "magicFlag": 23 }
]

FOR doc IN documents
  RETURN (
    FOR name IN ATTRIBUTES(doc)
      FILTER LIKE(name, '%a%')
      RETURN {
        name: name,
        value: doc[name]
      }
  )
```

The subquery will only let attribute names pass that contain the letter `a`. The results of the subquery are then made available to the main query and will be returned. But the attribute names in the result are still `name` and `value`, so we're not there yet.

So let us also employ C8QL's [ZIP()](./functions/document#zip) function, which can create an object from two arrays:

- the first parameter to `ZIP()` is an array with the attribute names
- the second parameter to `ZIP()` is an array with the attribute values

Instead of directly returning the subquery result, we first capture it in a variable, and pass the variable's `name` and `value` components into `ZIP()` like this:

```js
LET documents = [
  { "name" : "test"," gender" : "f", "status" : "active", "type" : "user" },
  { "name" : "dummy", "gender" : "m", "status" : "inactive", "type" : "unknown", "magicFlag" : 23 }
]

FOR doc IN documents
  LET attributes = (
    FOR name IN ATTRIBUTES(doc)
      FILTER LIKE(name, '%a%')
      RETURN {
        name: name,
        value: doc[name]
      }
  )
  RETURN ZIP(attributes[*].name, attributes[*].value)
```

:::note
We have to use the expansion operator (`[*]`) on `attributes` because `attributes` itself is an array, and we want either the `name` attribute or the `value` attribute of each of its members.
:::

To prove this is working, here is the above query's result:

```json
[
  {
    "name": "test",
    "status": "active"
  },
  {
    "name": "dummy",
    "status": "inactive",
    "magicFlag": 23
  }
]
```

As can be seen, the two results have a different amount of result attributes. We can also make the result a bit more dynamic by prefixing each attribute with the value of the `name` attribute:

```js
LET documents = [
  { "name": "test"," gender": "f", "status": "active", "type": "user" },
  { "name": "dummy", "gender": "m", "status": "inactive", "type": "unknown", "magicFlag": 23 }
]

FOR doc IN documents
  LET attributes = (
    FOR name IN ATTRIBUTES(doc)
      FILTER LIKE(name, '%a%')
      RETURN {
        name: CONCAT(doc.name, '-', name),
        value: doc[name]
      }
  )
  RETURN ZIP(attributes[*].name, attributes[*].value)
```

That will give us document-specific attribute names like this:

```json
[
  {
    "test-name": "test",
    "test-status": "active"
  },
  {
    "dummy-name": "dummy",
    "dummy-status": "inactive",
    "dummy-magicFlag": 23
  }
]
```

## Traversals

### Finding the start vertex via a geo query

Our first example will locate the start vertex for a graph traversal via [a geo index](../collections/documents/indexing/index-basics#geo-index).

We use the city graph and its geo indices: ![cities_graph\(1\)](/img/cities_graph.png){height="" width=""}

```js
var bonn=[50.7340, 7.0998];

FOR startCity IN
    WITHIN(germanCity, @lat, @long, @radius)
    RETURN startCity

{lat: bonn[0], long: bonn[1], radius: 400000}
```

We search all german cities in a range of 400 km around the ex-capital **Bonn**: **Hamburg** and **Cologne**. We won't find **Paris** since its in the `frenchCity` collection.

```js
var bonn=[50.7340, 7.0998];

FOR startCity IN
    WITHIN(germanCity, @lat, @long, @radius)
        FOR v, e, p IN 1..1 OUTBOUND startCity
            GRAPH 'routeplanner'
                RETURN {startcity: startCity._key, traversedCity: v}

{lat: bonn[0], long: bonn[1], radius: 400000}
```

The geo index query returns us `startCity` (**Cologne** and **Hamburg**) which we then use as starting point for our graph traversal. For simplicity we only return their direct neighbours. We format the return result so we can see from which `startCity` the traversal came.

Alternatively we could use a `LET` statement with a subquery to group the traversals by their `startCity` efficiently:

```js
var bonn=[50.7340, 7.0998];

FOR startCity IN
    WITHIN(germanCity, @lat, @long, @radius)
        LET oneCity = (FOR v, e, p IN 1..1 OUTBOUND startCity
            GRAPH 'routeplanner' RETURN v)
                return {startCity: startCity._key, connectedCities: oneCity}

{lat: bonn[0], long: bonn[1], radius: 400000}
```

## Multiple Path Search

The shortest path algorithm can only determine one shortest path.

For example, if this is the full graph (based on the [mps_graph](/img/mps_graph.png)):

![Example Graph](/img/mps_graph.png)

then a shortest path query from **A** to **C** may return the path `A -> B -> C` or `A -> D -> C`, but it's undefined which one (not taking edge weights into account here).

You can use the efficient shortest path algorithm however, to determine the shortest path length:

```js
    RETURN LENGTH(
      FOR v IN OUTBOUND
        SHORTEST_PATH "mps_verts/A" TO "mps_verts/C" mps_edges
          RETURN v
    )   
```

The result is 3 for the example graph (includes the start vertex). Now, subtract 1 to get the edge count / traversal depth. 

You can run a pattern matching traversal to find all paths with this length (or longer ones by increasing the min and max depth). Starting point is **A** again, and a filter on the document ID of v (or p.vertices[-1]) ensures that we only retrieve paths that end at point **C**.

The following query returns all parts with length 2, start vertex **A** and target vertex **C**:

```js
    FOR v, e, p IN 2..2 OUTBOUND "mps_verts/A" mps_edges
       FILTER v._id == "mps_verts/C"
         RETURN CONCAT_SEPARATOR(" -> ", p.vertices[*]._key)
```

A traversal depth of `3..3` would return `A -> E -> F -> C` and `2..3` all three paths.

:::note
Two separate queries are required to compute the shortest path length and to do the pattern matching based on the shortest path length (minus 1), because min and max depth can't be expressions (they have to be known in advance, so either be number literals or bind parameters.
:::    