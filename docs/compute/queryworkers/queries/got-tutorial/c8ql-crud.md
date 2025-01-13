---
sidebar_position: 10
title: Part 1 - Basic Document Tasks
---

You can perform basic document tasks such as create, read, update, and delete (CRUD) on documents in a collection. This portion of the tutorial guides you through those tasks.

## Create the Characters Collection

Before we can insert documents with C8QL, we need a place to put them in: a collection.

For this tutorial, [Create a Document collection](../../../../database/collections/documents/create-document-store.md) in the console. For more information about collections, refer to [Collections](../../../../database/collections/index.md).

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Collections**.
3. Click **New Collection**.
4. Click **Document**.
5. Name the collection **Characters** and then click **Create**.

## Create Documents

You can create documents one at a time or in a batch. In this section, you use C8QL queries to do both. For more information, refer to the [INSERT](../c8ql/operations/insert.md) operation.

For more information about this task, refer to [Add Documents to a Collection](../../../../database/collections/documents/add-document.md).

### Add One Document to the Collection

Add one document to the collection with a query.

1. Click **Compute > Query Workers**.
1. Copy and paste the following C8QL query into the query editor on the Editor tab.

  ```js
  INSERT {
      "name": "Ned",
      "surname": "Stark",
      "alive": true,
      "age": 41,
      "traits": ["A","H","C","N","P"]
  } INTO Characters
  ```

1. Click **Run Query**.

Macrometa returns an empty list, because the query did not [RETURN](../c8ql/operations/return.md) anything. We'll do that in a later step.

If you want to see your new record, click **Data > Collections** and then click **Characters**. Your brand new Ned Stark record is right there.

### Explanation of Adding One Document

The syntax for this query is `INSERT document INTO collectionName`. The document is an object like you may know it from JavaScript or JSON, which is comprised of attribute key and value pairs. The quotes around the attribute keys are optional in C8QL. Keys are always character sequences (strings), whereas attribute values can have different types:

- null
- boolean (true, false)
- number (integer and floating point)
- string
- array
- object

Name and surname of the character document we inserted are both string values. The alive state uses a boolean. Age is a numeric value. The traits are an array of strings. The entire document is an object.

### Add Multiple Documents to the Collection

Let's add the rest of our characters with a single query. If you are familiar with FOR loops iterating through lists, this will be very familiar.

1. Click **Compute > Query Workers** (if you are not already in that section).
1. Click **New Query**.
1. Copy and paste the following C8QL query into the query editor on the Editor tab.

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

1. Click **Run Query**.

Macrometa returns an empty list. As before, you can manually look at the records in the **Collections** screen, or retrieve them with queries in the next section.

### Explanation of Adding Multiple Documents

The `LET` keyword defines a variable with name _data_ and an array of objects as value, so `LET variableName = valueExpression` and the expression being a literal array definition like `[ {...}, {...}, ... ]`.

`FOR variableName IN expression` is used to iterate over each element of the _data_ array. In each loop, one element is assigned to the variable _d_. This variable is then used in the `INSERT` statement instead of a literal object definition. What is does is basically:

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
C8QL does not permit multiple `INSERT` operations that target the same collection in a single query. It is allowed as body of a `FOR` loop however, inserting multiple documents like you did in the above query.
:::

## Read Documents

With C8QL queries, you can retrieve all documents or specific documents. This section demonstrates both methods.

### Read All Documents

You can retrieve documents (characters) in the _Characters_ collection by using a `FOR` loop again. This time however, we use it to go through all documents in the collection instead of an array.

1. Click **New Query**.
1. In the Query Workers screen, paste the following code block in the editor:

  ```js
  FOR c IN Characters
      RETURN c
  ```

1. Click **Run Query**.

Macrometa lists all records in the Query Result.

### Explanation of Reading All Documents

The syntax of the loop is `FOR variableName IN collectionName`. For each document in the collection, _c_ is assigned a document, which is then returned as per the loop body. The query returns all characters that were previously stored.

Among them should be _Ned Stark_, similar to this example:

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

The document features the five attributes you stored, plus three more added by the database system. Each document needs a unique `_key`, which identifies it within a collection. Document keys can be provided by the user upon document creation, or a unique value is assigned automatically. Once created, document keys cannot be changed.

All three system attributes starting with an underscore `_` are read-only. The `_id` is a computed property, a concatenation of the collection name, a forward slash `/` and the document key. It uniquely identies a document within a database. `_rev` is a revision ID managed by the system.

### Read Specific Documents

You can use either the document key or the document ID to retrieve a specific document with the help of a C8QL function [DOCUMENT()](../c8ql/functions/document.md).

:::note
Document keys will be different for you. Update the queries accordingly.
:::  

#### Read One Specific Document

1. Click **New Query**.
2. Copy and paste one of the following commands in the editor. Notice that the command includes the collection name and a document key.

  ```js
  RETURN DOCUMENT("Characters", "2861650")
  // --- or ---
  RETURN DOCUMENT("Characters/2861650")
  ```

1. Replace the document key with the key from the first record in the results of the previous query.
1. Click **Run Query**.

Macrometa returns something like this:

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

#### Read Multiple Specific Documents

The `DOCUMENT()` function also allows you to fetch multiple documents at once.

1. Click **New Query**.
1. Copy and paste one of the following commands in the editor.

  ```js
  RETURN DOCUMENT("Characters", ["2861650", "2861653"])
  // --- or ---
  RETURN DOCUMENT(["Characters/2861650", "Characters/2861653"])
  ```

1. Replace the document keys with keys from the first and fourth records in the results of the previous query.
1. Click **Run Query**.

Macrometa returns something like this:

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

For more information, refer to the [DOCUMENT()](../c8ql/functions/document.md) function documentation.

## Update Documents

With C8QL queries, you can update specific documents or all documents. This section demonstrates both methods.

### Update a Single Document

According to the `Ned Stark` document, he is alive. Because he died by the end of the season, you need to change the `alive` attribute in the existing document.

1. In the previous section, you used Ned Stark's record key. Make sure you still have it handy.
1. Click **New Query**.
1. Copy and paste the following command in the editor.

  ```js
  UPDATE "2861650" WITH { alive: false } IN Characters
  ```

1. Replace the key value with Ned Stark's record key.
1. Click **Run Query**.

Macrometa updates the record and returns an empty list. To see the update, you can run one of the read queries from the previous section.

### Explanation of Updating a Single Document

The syntax is `UPDATE documentKey WITH object IN collectionName`. It updates the specified document with the attributes listed (or adds them if they don't exist), but leaves the rest untouched. To replace the entire document content, you can use `REPLACE` instead of `UPDATE`:

```js
REPLACE "2861650" WITH {
    name: "Ned",
    surname: "Stark",
    alive: false,
    age: 41,
    traits: ["A","H","C","N","P"]
} IN Characters
```

### Update All Documents

To add a new attribute to all documents, you might run the previous command for updating a single document with a FOR loop. A variable is used instead of a literal document key, to update each document. The query adds an attribute `season` to the documents' top-level.

1. Click **New Query**.
1. Copy and paste the following command in the editor.

  ```js
  FOR c IN Characters
      UPDATE c WITH { season: 1 } IN Characters
  ```

1. Click **Run Query**.

Macrometa returns an empty list. You can inspect the result by re-running the query that returns all documents in collection:

```js
FOR c IN Characters
    RETURN c
```

Records now have a `season` attribute.

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

## Delete Documents

With C8QL queries, you can delete specific documents or all documents. This section demonstrates both methods.

### Delete Specific Documents

To fully remove documents from a collection, there is the `REMOVE` operation. It works similar to the other modification operations, but without a `WITH` clause.

1. Click **New Query**.
1. Copy and paste the following command in the editor.

  ```js
  REMOVE "2861650" IN Characters
  ```

1. Replace the key in the example with any key from your document collection.
1. Click **Run Query**.

Macrometa deletes the document and returns an empty list.

### Delete All Documents

You can also use `REMOVE` in a loop body to effectively truncate a collection, removing all records without deleting the collection.

1. Click **New Query**.
1. Copy and paste the following command in the editor.

  ```js
  FOR c IN Characters
      REMOVE c IN Characters
  ```

1. Click **Run Query**.

Macrometa deletes all documents and returns an empty list. To view the results, navigate to the Collections screen and click your collection or run the query to view all documents.

:::important
Re-run the [insert queries](#create-documents) at the top with all character documents before you continue with the next chapter, to have data to work with again. And don't forget good, old Ned Stark! We're not through picking on him.
:::

## Next Steps

Great job! You have created a collection and performed basic CRUD operations. When you're ready, continue the tutorial in [Part 2 - Filter Results](filter-results.md).
