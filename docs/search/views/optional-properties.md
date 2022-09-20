---
sidebar_position: 60
title: Optional Properties
---

intro sentence

## Link Properties

You can set the following optional properties for links:

- **analyzers**: A list of [Analyzers](#analyzers) that will apply to values of processed document attributes.
	- Type: `array`
	- Subtype: `string`
	- Default: `[ 'identity' ]`
- **fields**: A list of link properties that will be applied at each document level with each key specifying a document attribute. (For example: `{ attribute-name: [Link properties], … }`) This data structure is recursive: Each value specifies the [link property](#link-properties) directive that the specified field should use. Otherwise, a default value of `{}` indicates inheritance of all directives from the current level except `fields`.
	- Type: `object`
	- Default: `{}`
- **includeAllFields**: When set `true`, process all document attributes with the default link property (`{}`) so they inherit all directives from the current level except `fields`. Any attributes specified under `fields` retain the link properties you specified.
	- Type: `boolean`
	- Default: `false`
- **trackListPositions**: When set `true`, track value positions in arrays. 

	For example, if you query the input `{ attr: [ 'valueX', 'valueY', 'valueZ' ] }` and want to give priority weighting to `valueY`, you must specify `doc.attr[1] == 'valueY'`.

	- Type: `boolean`
	- Default: `false`

- **storeValues**: Set `id` if you want to store information about attribute values in the search view and enable the `EXISTS()` function.
	- Type: string
	- Default: `"none"`

- **inBackground**: When set `true`, search view indexes will be created without an exclusive lock so they remain available.
	- Type: `boolean`
	- Default: `false`

## Search View Properties

Optional properties for search views are divided into the following categories:

- [Primary Sorting](#primary-sorting)
- [Commit, Consolidate, Cleanup](#commit-consolidate-cleanup)
- [Write Buffers](#write-buffers)

### Primary Sorting

You can use the following property to set up a [primary sort order](/primary-sort-order) to optimize C8QL queries:

**primarySort**: If the query attempts to retrieve all documents in a search view, and the sorting attributes, fields, and direction match the `primarySort` definition, we ignore this operation for being redundant. This value is immutable once the search view is created.

- Type: `array`
- Default: `[]`

### Commit, Consolidate, Cleanup

Each inverted index consists of segments that are each treated as standalone indexes. 

You can use the following properties to control the frequency at which C8Search commits, consolidates, and cleans up index segments:

- **commitIntervalMsec**: How many milliseconds to wait after committing data changes and before making documents visible to queries. This option accumulates processed data and creates new index segments without deleting cached files. All changes submitted prior to this action will be committed. 

	To disable, set `0`. If your index frequently has inserts and updates, do not lower the value. If your index rarely has inserts and updates, do not raise the value.
	
	- Type: `integer`
	- Default: `1000`

- **consolidationIntervalMsec**: How many milliseconds to wait after committing data changes and before making documents visible to queries. This option merges multiple index segments into a larger one and removes deleted and redundant documents. All changes submitted prior to this action will be committed. 

	To disable, set `0`. If your index frequently has inserts and updates, do not lower the value. If your index rarely has inserts and updates, do not raise the value.
	
	- Type: `integer`
	- Default: `60000`

- **cleanupIntervalStep**: How many commits to wait before removing unused files from the data directory. You can use this to save space if you frequently commit or consolidate segments. 

	To disable, set `0`. Do not raise the value above `2`. If you rarely merge segments and want to use cleanup, do not lower the value to `1`.
	
	- Type: `integer`
	- Default: `2`

Whenever C8DB processes new data, C8Search creates internal segments that contain files such as removed documents marked as `deleted`. The consolidate action uses a policy to determine what to consolidate and the size limit of these internal segments. You can set up a consolidation policy to change how C8Search consolidates its caches.

- **consolidationPolicy**: 
	- Type: `object`
	- Default: `{}`

The `consolidationPolicy` property has the following optional sub-properties:

- **type**: Choose between `"bytes_accum"` or `"tier"`.
	- Type: `string`
	- Default: `"bytes_accum"`

If you choose `"bytes_accum"`, the following optional sub-properties are available:

- **threshold**: Define a number between `0.0` and `1.0` to act as multiplier to determine the threshold for consolidating each segment. 
	- Type: `float`
	- Default: `0.1`

	We use the following formula to set the threshold:

	`t > (s + m) / a`

	- `t` is the threshold value.
	- `s` is the total bytes of the segment.
	- `m` is the byte total of the merge candidate segments.
	- `a` is the byte total of all segments.

If you choose `"tier"`, the following optional sub-properties are available:

- **segmentsMin**: Minimum number of segments considered for consolidation.
	- Type: `integer`
	- Default: `1`
- **segmentsMax**: Maximum number of segments considered for consolidation.
	- Type: `integer`
	- Default: `10`
- **segmentsBytesMax**: Maximum allowed size of all consolidated segments in bytes.
	- Type: `integer`
	- Default: `5368709120`
- **segmentsBytesFloor**: When choosing segments for consolidation, all segments smaller than this value in bytes are automatically rounded up to this number for the purpose of consolidation selection.
	- Type: `integer`
	- Default: `2097152`

### Write Buffers

A C8Search index contains writer objects that are mapped to processed segments. You can set up a _pool_ of writers by using `writebuffer*` properties to limit memory usage. These options are immutable once a search view is created.

- **writebufferIdle**: Maximum number of writers cached in the pool. To disable, set `0`.
	- Type: `integer`
	- Default: `64`
- **writebufferActive**: Maximum number of concurrent active writers performing a transaction. Other writers must wait until current active writers finish.
	- Type: `integer`
	- Default: `0`
- **writebufferSizemax**: Maximum memory size in bytes per writer before triggering writer flush. If set `0`, the limit is removed and this option falls back on the C8DB default flush interval. Disable this option with caution.
	- Type: `integer`
	- Default: `33554432`
