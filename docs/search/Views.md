---
sidebar_position: 3
---

# Views

We provide *Views* that enable you to perform fast and sophisticated full-text search queries for unstructured data in documents across multiple linked collections. You can filter by document attributes, sort the results by relevance, and rank results by their similarity using popular scoring algorithms.

Each View represents an inverted index that contains the search configuration and all document attributes in the linked collections. A Search View index consists of multiple segments that are each treated as a standalone index. Search Views are the only officially supported Views implementation, but you can create your own Search Views to further customize the way index and query data.

The following table shows a comparison between C8Search Views and a full-text index:



Feature                             | Search       | Full-text Index
:-----------------------------------|:-------------|:---------------
Term search                         | Yes          | Yes
Prefix search                       | Yes          | Yes
Boolean expressions                 | Yes          | Restricted
Range search                        | Yes          | No
Phrase search                       | Yes          | No
Relevance ranking                   | Yes          | No
Configurable Analyzers              | Yes          | No
C8QL composable language construct  | Yes          | No
Indexed attributes per collection   | Unlimited    | 1
Indexed collections                 | Unlimited    | 1


Views guarantee the best execution plan (merge join) when querying multiple attributes.

## Concepts

A View represents all documents available in a specified set of source collections. Each View is an abstraction of some transformation applied to documents in the collections. The type of transformation is specific to the View implementation and can be as simple as an identity transformation. 

A Search View combines Boolean and generalized ranking retrieval and ranks each Boolean-approved document. For ranking text retrieval, we use the Vector Space Model (VSM) which uses documents and queries to represent vectors in a space formed by the *terms* of the query. A term can include single words, keywords, and phrases. You can use [Analyzers](#analyzers) to boost value analysis with tokenization.

The document vectors that are closer to a query vector are more relevant. The closeness is expressed as the cosine of the angle between two vectors ([cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity)). We evaluate the following expression to define how relevant document `d` is to query `q`:

`cos a = (d * q) / (|d| * |q|)`

* `d * q` is the dot product of the query vector `q` and document vector `d`
* `|d|` is the norm of vector `d`
* `|q|` is the norm of vector `q`

The vector components must be computed up front. Since space is formed by terms, you can use *term weights* as coordinates. The following probability and statistical weighting models are implemented in C8Search:

* [Okapi BM25](https://en.wikipedia.org/wiki/Okapi_BM25)
* [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)

Both models rely on two components:

* *Term frequency* (TF): The number of times term `t` appears in document `d`.
* *Inverse document frequency* (IDF): How common or rare the term is across all documents.

Searching and ranking capabilities are provided by the [IResearch library](https://github.com/iresearch-toolkit/iresearch)

## Integration

To use collections as a data source, you must *link* them to a View. A link is a one-way data flow from a GDN collection to a Search View that determines how incoming data is made available to the user. A View can have multiple links that are each connected to a different collection, and each collection can be linked to multiple Views.

To minimize performance reduction, we do not constantly synchronize Search Views as the linked collections change. You can change the consolidation policy to increase or decrease the rate at which Search Views synchronize with linked collections.

You can link documents and edge collections to Search Views so your graphs can be treated as both flat and interconnected data structures. For example, you can find the most relevant vertices by searching and sorting with a View, then perform a regular tree search on each vertex.

Edit the [View definition](#view-definition) to manage links between Views and collections. You can index any attribute at any depth, including nested attributes, and define Analyzers to process values for each field. To produce results, Analyzers you specify in the query must be defined in the View.

By default, array elements are indexed individually as if each element is the value of the source attribute. You can use Analyzers to transform strings into multiple tokens that are handled similarly to an array of strings. Refer to [C8QL SEARCH operation](../c8ql/operations/search.md) for details. Primitive values other than strings (`null`, `true`, `false`, numbers) are indexed unchanged. You can choose to index nested object values under the respective attribute path, including objects in arrays.

You can manage Views by using:

* The Web UI
* [An HTTP API](../cep/reference/extensions/io/http.md)
* [JavaScript API](../../search/js-api)

You can query views with C8QL using the [SEARCH operation](../c8ql/operations/search).


## Primary Sort Order

When you create a Search View, you can choose a primary sort order for each uniquely named attribute, enabling better optimization for iterated C8QL queries that sort by one or more attributes. If the fields match the sorting directions, the View can read data from the index without a sorting operation. 

To customize the primary sort order, you must create the View with HTTP or JavaScript API. You cannot change the `primarySort` option after creating a View. 

The following example shows a Search View definition paired with a C8QL query.

* Search View definition:

```json
{
  "links": {
    "coll1": {
      "fields": {
        "text": {
        }
      }
    },
    "coll2": {
      "fields": {
        "text": {
      }
    }
  },
  "primarySort": [
    {
      "field": "text",
      "direction": "asc"
    }
  ]
}
```

* C8QL query:

```js
FOR doc IN viewName
  SORT doc.text
  RETURN doc
```

The following examples show two alternative execution plans.

* Without a sorted index:

```bash
Execution plan:
 Id   NodeType            Est.   Comment
  1   SingletonNode          1   * ROOT
  2   EnumerateViewNode      1     - FOR doc IN viewName   /* view query */
  3   CalculationNode        1       - LET #1 = doc.`val`   /* attribute expression */
  4   SortNode               1       - SORT #1 ASC   /* sorting strategy: standard */
  5   ReturnNode             1       - RETURN doc
```

* With a primary sort order index:

```bash
Execution plan:
 Id   NodeType            Est.   Comment
  1   SingletonNode          1   * ROOT
  2   EnumerateViewNode      1     - FOR doc IN viewName SORT doc.`val` ASC   /* view query */
  5   ReturnNode             1       - RETURN doc
```


To define multiple sort attributes, add sub-objects to the `primarySort` array. For example:

```json
  "primarySort": [
    {
      "field": "date",
      "direction": "desc"
    },
    {
      "field": "text",
      "direction": "asc"
    }
  ]
```

In this example, we optimize a View query to sort by text and by descending date (`SORT doc.date DESC, doc.text`). Priority is given to the first field, so queries that sort by text only are ineligible (`SORT doc.text`). This is conceptually similar to a skiplist index, except the View index does not provide inverted sorting directions (`SORT doc.date, doc.text DESC`).



## View Definition

A Search View is defined by an object that contains the following:

* A set of View configuration directives.
* A map of link configuration directives.

Different directives apply during creation and modification of Views. 

* Creating a View applies these directives:
	* **name** (string, immutable): The name of the View.
	* **type** (string, immutable): The value `"search"`.
	* Any directives from [View Properties](#view-properties).

* Modifying a View applies these directives:
	* **links** (object, optional): A mapping of `collection-name` / `collection-identifier` to one of the following:
		* Link creation: Link definition according to [Link properties](#link-properties).
		* Link removal: JSON keyword `null` (e.g. nullify a link if present).
	* Any directives from [View Properties](#view-properties).

## Link Properties

You can set the following optional properties for links:

* **analyzers**: A list of [Analyzers](#analyzers) that will apply to values of processed document attributes.
	* Type: `array`
	* Subtype: `string`
	* Default: `[ 'identity' ]`
* **fields**: A list of link properties that will be applied at each document level with each key specifying a document attribute. (For example: `{ attribute-name: [Link properties], … }`) This data structure is recursive: Each value specifies the [link property](#link-properties) directive that the specified field should use. Otherwise, a default value of `{}` indicates inheritance of all directives from the current level except `fields`.
	* Type: `object`
	* Default: `{}`
* **includeAllFields**: When set `true`, process all document attributes with the default link property (`{}`) so they inherit all directives from the current level except `fields`. Any attributes specified under `fields` retain the link properties you specified.
	* Type: `boolean`
	* Default: `false`
* **trackListPositions**: When set `true`, track value positions in arrays. 

	For example, if you query the input `{ attr: [ 'valueX', 'valueY', 'valueZ' ] }` and want to give priority weighting to `valueY`, you must specify `doc.attr[1] == 'valueY'`.

	* Type: `boolean`
	* Default: `false`

* **storeValues**: Set `id` if you want to store information about attribute values in the View and enable the `EXISTS()` function.
	* Type: string
	* Default: `"none"`

* **inBackground**: When set `true`, View indexes will be created without an exclusive lock so they remain available.
	* Type: `boolean`
	* Default: `false`


## View Properties

Optional properties for Views are divided into the following categories:

* [Primary Sorting](#primary-sorting)
* [Commit, Consolidate, Cleanup](#commit-consolidate-cleanup)
* [Write Buffers](#write-buffers)

### Primary Sorting

You can use the following property to set up a [primary sort order](#primary-sort-order) to optimize C8QL queries:

**primarySort**: If the query attempts to retrieve all documents in a View, and the sorting attributes, fields, and direction match the `primarySort` definition, we ignore this operation for being redundant. This value is immutable once the View is created.

* Type: `array`
* Default: `[]`


### Commit, Consolidate, Cleanup


Each Search Views inverted index consists of segments that are each treated as standalone indexes. 

You can use the following properties to control the frequency at which C8Search commits, consolidates, and cleans up index segments.


* **commitIntervalMsec**: How many milliseconds to wait after committing data changes and before making documents visible to queries. This option accumulates processed data and creates new index segments without deleting cached files. All changes submitted prior to this action will be committed. 

	To disable, set `0`. If your index frequently has inserts and updates, do not lower the value. If your index rarely has inserts and updates, do not raise the value.
	
	* Type: `integer`
	* Default: `1000`

* **consolidationIntervalMsec**: How many milliseconds to wait after committing data changes and before making documents visible to queries. This option merges multiple index segments into a larger one and removes deleted and redundant documents. All changes submitted prior to this action will be committed. 

	To disable, set `0`. If your index frequently has inserts and updates, do not lower the value. If your index rarely has inserts and updates, do not raise the value.
	
	* Type: `integer`
	* Default: `60000`

* **cleanupIntervalStep**: How many commits to wait before removing unused files from the data directory. You can use this to save space if you frequently commit or consolidate segments. 

	To disable, set `0`. Do not raise the value above `2`. If you rarely merge segments and want to use cleanup, do not lower the value to `1`.
	
	* Type: `integer`
	* Default: `2`

Whenever C8DB processes new data, C8Search creates internal segments that contain files such as removed documents marked as `deleted`. The consolidate action uses a policy to determine what to consolidate and the size limit of these internal segments. You can set up a consolidation policy to change how C8Search consolidates its caches.

* **consolidationPolicy**: 
	* Type: `object`
	* Default: `{}`

The `consolidationPolicy` property has the following optional sub-properties:

* **type**: Choose between `"bytes_accum"` or `"tier"`.
	* Type: `string`
	* Default: `"bytes_accum"`

If you choose `"bytes_accum"`, the following optional sub-properties are available:

* **threshold**: Define a number between `0.0` and `1.0` to act as multiplier to determine the threshold for consolidating each segment. 
	* Type: `float`
	* Default: `0.1`

	We use the following formula to set the threshold:

	`t > (s + m) / a`

	* `t` is the threshold value.
	* `s` is the total bytes of the segment.
	* `m` is the byte total of the merge candidate segments.
	* `a` is the byte total of all segments.

If you choose `"tier"`, the following optional sub-properties are available:

* **segmentsMin**: Minimum number of segments considered for consolidation.
	* Type: `integer`
	* Default: `1`
* **segmentsMax**: Maximum number of segments considered for consolidation.
	* Type: `integer`
	* Default: `10`
* **segmentsBytesMax**: Maximum allowed size of all consolidated segments in bytes.
	* Type: `integer`
	* Default: `5368709120`
* **segmentsBytesFloor**: When choosing segments for consolidation, all segments smaller than this value in bytes are automatically rounded up to this number for the purpose of consolidation selection.
	* Type: `integer`
	* Default: `2097152`


### Write Buffers

A C8Search index contains writer objects that are mapped to processed segments. You can set up a *pool* of writers by using `writebuffer*` properties to limit memory usage. These options are immutable once a View is created.


* **writebufferIdle**: Maximum number of writers cached in the pool. To disable, set `0`.
	* Type: `integer`
	* Default: `64`
* **writebufferActive**: Maximum number of concurrent active writers performing a transaction. Other writers must wait until current active writers finish.
	* Type: `integer`
	* Default: `0`
* **writebufferSizemax**: Maximum memory size in bytes per writer before triggering writer flush. If set `0`, the limit is removed and this option falls back on the C8DB default flush interval. Disable this option with caution.
	* Type: `integer`
	* Default: `33554432`
