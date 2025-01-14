---
title: Fulltext Functions
---

C8QL offers the following functions to filter data based on [fulltext indexes](../../../../../database/collections/indexing/working-with-indexes.md#fulltext).

## FULLTEXT()

`FULLTEXT(coll, attribute, query, limit) → docArray`

Return all documents from collection _coll_, for which the attribute _attribute_ matches the fulltext search phrase _query_, optionally capped to _limit_ results.

:::note
`FULLTEXT()` function requires the collection _coll_ to have a fulltext index on _attribute_. If no fulltext index is available, this function will fail with an error at runtime. It doesn't fail when explaining the query however.
:::

- **coll** (collection): a collection
- **attribute** (string): the attribute name of the attribute to search in
- **query** (string): a fulltext search expression as described below
- **limit** (number, _optional_): if set to a non-zero value, it will cap the result to at most this number of documents
- returns **docArray** (array): an array of documents

:::note
`FULLTEXT()` is not meant to be used as an argument to `FILTER`, but rather to be used as the expression of a `FOR` statement:
:::

```js
FOR oneMail IN FULLTEXT(emails, "body", "banana,-apple")
    RETURN oneMail._id
```

`query` is a comma-separated list of sought words (or prefixes of sought words). To distinguish between prefix searches and complete-match searches, each word can optionally be prefixed with either the `prefix:` or `complete:` qualifier. Different qualifiers can be mixed in the same query. Not specifying a qualifier for a search word will implicitly execute a complete-match search for the given word:

- `FULLTEXT(emails, "body", "banana")`<br /> Will look for the word _banana_ in the attribute _body_ of the collection _collection_.

- `FULLTEXT(emails, "body", "banana,orange")`<br /> Will look for both words _banana_ and _orange_ in the mentioned attribute. Only those documents will be returned that contain both words.

- `FULLTEXT(emails, "body", "prefix:head")`<br /> Will look for documents that contain any words starting with the prefix _head_.

- `FULLTEXT(emails, "body", "prefix:head,complete:aspirin")`<br /> Will look for all documents that contain a word starting with the prefix _head_ and that also contain the (complete) word _aspirin_. Note: specifying `complete:` is optional here.

- `FULLTEXT(emails, "body", "prefix:cent,prefix:subst")`<br /> Will look for all documents that contain a word starting with the prefix _cent_ and that also contain a word starting with the prefix _subst_.

If multiple search words (or prefixes) are given, then by default the results will be AND-combined, meaning only the logical intersection of all searches will be returned. It is also possible to combine partial results with a logical OR, and with a logical NOT:

- `FULLTEXT(emails, "body", "+this,+text,+document")`<br /> Will return all documents that contain all the mentioned words. Note: specifying the `+` symbols is optional here.

- `FULLTEXT(emails, "body", "banana,|apple")`<br /> Will return all documents that contain either (or both) words _banana_ or _apple_.

- `FULLTEXT(emails, "body", "banana,-apple")`<br /> Will return all documents that contain the word _banana_, but do not contain the word _apple_.

- `FULLTEXT(emails, "body", "banana,pear,-cranberry")`<br /> Will return all documents that contain both the words _banana_ and _pear_, but do not contain the word _cranberry_.

:::note
No precedence of logical operators will be honored in a fulltext query. The query will simply be evaluated from left to right.
:::
