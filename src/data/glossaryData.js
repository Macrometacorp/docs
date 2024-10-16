const glossaryData = [
    {
      id: 1,
      title: "acknowledgment (ack)",
      content:
        "A message sent to a Macrometa GDN broker by a consumer indicating complete and successful message processing. Macrometa uses acknowledgments to decide whether to delete messages from the system and retains unacknowledged messages until they are completely processed.",
    },
    {
      id: 2,
      title: "collection",
      content:
        "A collection of documents of a specific type identified by its unique collection identifier. A collection also has a unique name that clients use to identify and access. Although you can rename collections, the collection identifier and type remain the same." },
    {
      id: 3,
      title: "collection identifier",
      content:
        "A collection identifier is a unique string value for a collection in a database. This is an internal metadata field, and generally you should use a collection's unique name to access it instead of its identifier.\n\nMacrometa GDN uses 64-bit unsigned integer values to maintain collection IDs. When returning collection IDs to clients, GDN uses the IDs to create a string and then verifies the collection ID is not shortened by clients that do not support large integers. When collection IDs are returned by GDN, clients should treat them as opaque strings when stored or used locally, enabling GDN to change the format of revision IDs later if necessary.",
    },
    {
      id: 4,
      title: "collection name",
      content:
        "A unique string value that identifies a collection in a database. Unlike the collection identifier that receives its value dynamically, the user provides the name when creating the collection. The collection name must only consist of letters, digits, and _ (underscore) or - (dash) characters. "},
    {
      id: 5,
      title: "confirm all writes",
      content:
        "All write operations are asynchronous by default, meaning the caller receives a confirmation as soon as the write arrives at the database, but has not yet been committed to storage. If a write is accepted by the database and has not yet been written to storage, there is a chance of data loss in an event of power failure.\n\nIf you enable **Confirm All Writes**, we delay the confirmation response until the operation has been fully synced to storage. This verifies that you only receive an acknowledgment after a successful write to storage, and no acknowledgment in the case of a power failure.",
    },
    {
      id: 6,
      title: "document",
      content:
        "Documents in Macrometa GDN are JSON objects uniquely identified by their document handle. They can be nested to any depth and might contain arrays.",
    },
    {
      id: 7,
      title: "document etag",
      content:
        'The document revision (`_rev` value) enclosed in double quotes (`"`). The revision is returned by several HTTP API methods in the etag HTTP header.',
    },
    {
      id: 8,
      title: "document handle",
      content:
        "A document handle uniquely identifies a document in a database. It is a unique string and consists of the collection name and the document key (`_key` attribute) separated by slashes (`/`). The document handle is stored in a document's `_id` attribute.",
    },
    {
      id: 9,
      title: "document key",
      content:
        "A document key is a string that uniquely identifies a document in a given collection. Clients can use document keys when specific documents are searched. Document keys are stored in the `_key` attribute of documents. The key values are automatically indexed by Macrometa GDNDB in a collection's primary index, enabling fast retrieval of documents by finding their keys. The `_key` value of a document is permanent once the document has been created.\n\nIf you do not specify a `_key` value, Macrometa GDN auto-generates a document key. You can change this default behavior on a per-collection basis by creating collections with the `keyOptions` attribute. You can also use `keyOptions` to disallow user-specified keys completely or enforce a standard for auto-generating the `_key` values.\n\nThere are some restrictions for user-defined keys. For more information, see [Naming Conventions for document keys](/docs/references/naming-conventions#document-keys).",
    },
    {
      id: 10,
      title: "document revision",
      content:
        "As Macrometa GDN supports MVCC, documents can exist in more than one revision. The document revision is the MVCC token used to identify a specific revision of a document. It is a string value currently containing an integer number and is unique within the list of revisions for a single document. Document revisions can be used to conditionally update, replace, or delete documents in the database. To find a specific revision of a document, you need the document handle and the document revision.\n\nThe document revision is stored in the `_rev` attribute of a document and is automatically set and updated by Macrometa GDNDB. The `_rev` value cannot be changed manually.\n\nMacrometa GDN uses 64-bit unsigned integer values to maintain document revisions. When returning document revisions to clients, GDN uses the revision IDs to create a string and then verifies the ID is not shortened by clients that do not support large integers. When revision IDs are returned by GDN, clients should treat them as opaque strings when stored or used locally, enabling GDN to change the format of revision IDs later if necessary. Clients can use revisions IDs to perform simple equality/non-equality comparisons (e.g. to check whether a document has changed or not), but they should not use revision IDs to perform greater/less than comparisons with them to check if a document revision is older than one another, even if this might work for some cases.",
    },
    {
      id: 11,
      title: "edge",
      content:
        "Edges are special documents used to connect other documents into a graph. An edge describes the connection between two documents using the internal attributes _from and _to. These attributes contain document handles, such as the start point and end point of the edge."},
    {
      id: 12,
      title: "edge collection",
      content: "Edge collections are collections that store edges.",
    },
    {
      id: 13,
      title: "edge definition",
      content:
        "Edge definitions are parts of the definition of `named graphs` and describe which edge collections connect which vertex collections.",
    },
    {
      id: 14,
      title: "GDN",
      content:
        'A geo-distributed real time coordination-free materialized views engine supporting multiple data models.  GDN stands for "global distributed network."',
    },
    {
      id: 15,
      title: "GDNDB",
      content: 'Stands for "global distributed network database."',
    },
    {
      id: 16,
      title: "Fabric",
      content:
        "A fabric consists of collections and dedicated worker processes within the region of each fabric. They help group and separate data as the collections in fabrics exist in isolation and cannot be accessed by other fabrics. By default, there is always at least one fabric in Macrometa GDN (_system), even though the GDN can handle multiple fabrics in the same server instance. This _system fabric cannot be dropped, and performs special operations for creating, dropping, and enumerating fabrics. You can create fabrics and give them unique names for later access. Fabric management operations can only be performed  in the _system fabric. Each Macrometa GDN fabric contains its own system collections (e.g. _users, _replication, ...)."},
    {
      id: 17,
      title: "Fabric name",
      content:
        "The fabric name is a string consisting of letters, digits, and—(dash) characters. It is case-sensitive, and any user-defined fabric names must always start with a letter. "},
    {
      id: 18,
      title: "Fingerprint Agent",
      content:
        "A browser-side Javascript library that collects a user's browser information and transmits it to the Fingerprint service to generate a visitor ID. ",
    },
    {
      id: 19,
      title: "Fingerprint Client",
      content:
        "A script embedded into a webpage that loads the Fingerprint agent to generate the visitor ID. This client can be integrated and activated in different ways.",
    },
    {
      id: 20,
      title: "Confidence Level",
      content:
        "A measure of the degree of accuracy for the user details generated by the Fingerprint service.",
    },
    {
      id: 21,
      title: "geo-replication",
      content:
        "The replication of messages and documents across Macrometa GDN clusters, potentially in different datacenters or geographical regions.",
    },
    {
      id: 22,
      title: "graph, collection sets",
      content:
        "You can use edge collections with vertex collections without the graph management facilities. However, graph consistency is not enforced. If you remove vertices, you have to manually verify that edges pointing to this vertex are removed. Collection sets cannot be viewed using graph viewer in the web console. Collection sets might be faster in some scenarios.",
    },
    {
      id: 23,
      title: "graph, general",
      content:
        "Module maintaining graph setup in the `_graphs` collection. Configures which edge collections relate to which vertex collections. Verifies graph consistency in modification queries.",
    },
    {
      id: 24,
      title: "graph, named",
      content:
        "Named graphs enforce consistency between edge collections and vertex collections, so if you remove a vertex, edges pointing to it are also removed.",
    },
    {
      id: 25,
      title: "index",
      content:
       "Indexes can allow fast access to documents in a collection. All collections have a primary index, the document's _key attribute, which cannot be dropped or changed. Edge collections also have an automatically created edges index that cannot be modified. This index provides quick access to documents via the _from and _to attributes. You can create a user-defined index by defining the names of the attributes which should be indexed. Some index types allow indexing just one attribute (e.g. full-text indexes) whereas other index types allow indexing multiple attributes. All index types do not support indexing the system attribute _id in user-defined indexes."},
    {
      id: 26,
      title: "index, edges",
      content:
        "An edges index is automatically created for edge collections. It contains connections between vertex documents and is invoked when the connecting edges of a vertex are queried. There is no way to explicitly create or delete edges indexes.",
    },
    {
      id: 27,
      title: "index, full-text",
      content:
        'A full-text index can be used to find words or prefixes of words inside documents. A full-text index can only be defined on one attribute and includes all words contained in documents that have a textual value in the index attribute. The index also includes words from the index attribute if the index attribute is an array of strings, or an object with string value members.\n\nFor example, given a full-text index on the `translations` attribute and the following documents, searching for `лиса` using the full-text index would return only the first document. Searching for the index for the exact string `Fox` would return the first two documents, and searching for `prefix:Fox` would return all three documents:\n\n  { translations: { en: "fox", de: "Fuchs", fr: "renard", ru: "лиса" } }\n  { translations: "Fox is the English translation of the German word Fuchs" }\n\nIf the index attribute is neither a string, an object, nor an array, its contents are not indexed. When indexing the contents of an array attribute, only array member values that are strings will be included in the index. When indexing the contents of an object attribute, only object member values that are strings will be included in the index. Other data types are ignored and not indexed.\n\nOnly words with a changeable minimum length are indexed. Word tokenization is done using the word boundary analysis provided by libicu, which is taking into account the selected language provided at server start. Words are indexed in lower-case. The index supports complete match queries (full words) and prefix queries.',
    },
    {
      id: 28,
      title: "index, geo",
      content:
        "A geo index is used to quickly find locations on the surface of the earth.",
    },
    {
      id: 29,
      title: "index, hash",
      content:
        "A hash index is used to find documents based on examples. A hash index can be created for one or more document attributes.\n\nA hash index is only used by queries if all indexed attributes are present in the example or search query, and if all attributes are compared using the equality operator (`==`). Hash index does not support range queries.\n\nA unique hash index has an amortized complexity of `O(1)` for lookup, insert, update, and remove operations. The non-unique hash index is similar, but amortized lookup performance is `O(n)`, with `n` being the number of index entries with the same lookup value.",
    },
    {
      id: 30,
      title: "index, skiplist",
      content:
        "A skiplist is a sorted index type that can be used to find ranges of documents.",
    },
    {
      id: 31,
      title: "index handle",
      content:
        "A string that uniquely identifies an index in the database. It consists of a collection name and an index identifier separated by slashes (/).",
    },
    {
      id: 32,
      title: "message",
      content:
        "Messages are the basic unit of Macrometa GDN Streams, which producers publish to streams for consumers to consume. ",
    },
    {
      id: 33,
      title: "message dispatcher",
      content:
        "An asynchronous TCP server used for all data transfers into and out of a Macrometa GDN broker. The GDN dispatcher uses a custom binary protocol for all communications.",
    },
    {
      id: 34,
      title: "multi-tenancy",
      content:
        "The ability to isolate a fabric, specify quotas, and configure authentication and authorization on a per-tenant basis.",
    },
    {
      id: 35,
      title: "stream",
      content:
        "A named channel used by producers to publish messages to consumers  for processing. Streams are grouped by database.",
    },
    {
      id: 36,
      title: "stream broker",
      content:
        "A stateless component of Macrometa GDN clusters that runs two other components: an HTTP server exposing a REST interface for administration and stream lookup, and a dispatcher that handles all message transfers. Macrometa GDN clusters typically consist of multiple brokers.",
    },
    {
      id: 37,
      title: "stream consumer",
      content:
        "A process that establishes a subscription to a Macrometa GDN stream and processes messages published to that stream by producers.",
    },
    {
      id: 38,
      title: "stream cursor",
      content: "The subscription position for a consumer.",
    },
    {
      id: 39,
      title: "stream lookup",
      content:
        "A service provided by Macrometa GDN that enables connecting clients to automatically determine which Macrometa GDN cluster is responsible for a stream (and thus where message traffic for the stream needs to be routed).",
    },
    {
      id: 40,
      title: "stream metastore",
      content:
        "Macrometa GDN configuration store within a region that is used for configuration-specific tasks.",
    },
    {
      id: 41,
      title: "stream producer",
      content:
        "A process that publishes messages to a stream.",
    },
    {
      id: 42,
      title: "stream pub-sub",
      content:
        "A messaging pattern in which producer proccesses published messages on streams that are then consumed by consumer processes.",
    },
    {
      id: 43,
      title: "stream reader",
      content:
        "GDN stream readers are message processors that don't retain data or acknowledge messages. They are similar to GDN consumers but allow you to specify where messages begin processing. "},
    {
      id: 44,
      title: "stream retention policy",
      content:
        "Size and time limits that you can set on a database to configure retention of messages that have already been acknowledged.",
    },
    {
      id: 45,
      title: "stream subscription",
      content:
        "A lease on a stream established by a group of consumers. Macrometa GDN streams have three subscription modes (exclusive, shared, and failover).",
    },
    {
      id: 46,
      title: "tenant",
      content:
        "An administrative unit for allocating capacity and enforcing an authentication/authorization scheme.",
    },
    {
      id: 47,
      title: "unacknowledged",
      content:
        "An unacknowledged message indicates successful delivery to a consumer for processing but without confirmation of processing​ by the consumer.",
    },
    {
      id: 48,
      title: "404 Identifier",
      content:
        "A string  used by the Prerender service to identify and report 404 status codes. You can configure and manage 404 identifiers from your Prerender dashboard.",
    },
    {
      id: 49,
      title: "HTML Selectors",
      content:
        "A primary identifier used by the Prerender service to implement synthetic interactions. HTML selectors are found within the DOM or shadow DOM on the web page.",
    },
    {
      id: 50,
      title: "Lazy Loading",
      content:
        "This technique involves waiting to display certain web page content, like images until the user or browser needs it. When utilized properly, lazy loading improves page load times, thus enhancing user experience.",
    },
    {
      id: 51,
      title: "Prerender",
      content:
        "This technique involves waiting to display certain web page content, like images until the user or browser needs it. When utilized properly, lazy loading improves page load times, thus enhancing user experience.",
    },
    {
      id: 52,
      title: "Render",
      content:
        "A process that converts website code into interactive webpage content for humans and bots.",
    },
    {
      id: 53,
      title: "Signature",
      content:
        "A collection of all browser/device attributes collated by the Fingerprint agent for use by the Fingerprint service.",
    },
    {
      id: 54,
      title: "Synthetic Interactions",
      content:
        "Automated actions in Prerender that simulate real user interactions to help improve content visibility for indexing by bots. Examples of these actions include scroll, click, and hover. ",
    },
    {
      id: 55,
      title: "Visitor ID",
      content:
        "A unique value generated by the Fingerprint service to recognize and identify users on subsequent visits and used in updating the signature with any updates to the browser.",
    },
  ];
  
  export default glossaryData;