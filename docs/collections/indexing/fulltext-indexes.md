---
sidebar_position: 40
title: Fulltext Indexes
---

A fulltext index can be used to find words, or prefixes of words inside documents.

A fulltext index can be defined on one attribute only, and will include all words contained in documents that have a textual value in the index attribute.

For example, given a fulltext index on the `translations` attribute and the following documents, then searching for `лиса` using the fulltext index would return only the first document. Searching for the index for the exact string `Fox` would return the first two documents, and searching for `prefix:Fox` would return all three documents:

```js
{ translations: { en: "fox", de: "Fuchs", fr: "renard", ru: "лиса" } }
{ translations: "Fox is the English translation of the German word Fuchs" }
{ translations: [ "C8DB", "document", "database", "Fox" ] }
```

:::note
Deeper nested objects are ignored. For example, a fulltext index on *translations* would index *Fuchs*, but not *fox*, given the following document structure:
:::
```js
{ translations: { en: { US: "fox" }, de: "Fuchs" }
```

If you need to search across multiple fields and/or nested objects, you may write all the strings into a special attribute, which you then create the index on (it might be necessary to clean the strings first, e.g. remove line breaks and strip certain words).

If the index attribute is neither a string, an object or an array, its contents will not be indexed. When indexing the contents of an array attribute, an array member will only be included in the index if it is a string. When indexing the contents of an object attribute, an object member value will only be included in the index if it is a string. Other data types are ignored and not indexed.

## Accessing Fulltext Indexes

Ensures that a fulltext index exists:
```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/fulltext?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "fields": [ "type" : "fulltext", ."fields": ["field"],  "minLength": <minLength> }'
```


Creates a fulltext index on all documents on attribute *field*.

Fulltext indexes are implicitly sparse: all documents which do not have the specified *field* attribute or that have a non-qualifying value in their *field* attribute will be ignored for indexing.

:::note
Only a single attribute can be indexed. Specifying multiple attributes is unsupported.
:::

The minimum length of words that are indexed can be specified via the *minLength* parameter. Words shorter than minLength characters will not be indexed. *minLength* has a default value of 2. It is thus recommended to explicitly specify this value.

In case that the index was successfully created, an object with the index details is returned.

## Fulltext C8QL Functions

Fulltext C8QL functions are detailed in [Fulltext functions](../../c8ql/functions/fulltext.md).

## Create Fulltext Index in GDN Console

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **COLLECTIONS**.
1. Click the collection that you want to create an index for.
1. Click **Indexes**.
1. In **Type**, select **Fulltext Index**.
1. Enter the following information:

   - **Fields -** Single attribute path.
   - **Name -** The name of the index. If left blank, then Macrometa autogenerates the name.
   - **Min. length -** The minimum character of words in the index.
   - **Create in Background -** If true, will create an index in the background rather than lock the collection while the index is created. This allows for basic CRUD operations to occur while the index is created. For more information, refer to [Create Index in Background](create-index-in-background.md).

1. Click **Create**.
