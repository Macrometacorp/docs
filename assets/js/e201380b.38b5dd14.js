"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[65875],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=i.createContext({}),s=function(e){var t=i.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=s(e.components);return i.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,d=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(n),m=a,h=c["".concat(d,".").concat(m)]||c[m]||p[m]||o;return n?i.createElement(h,r(r({ref:t},u),{},{components:n})):i.createElement(h,r({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=c;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var s=2;s<o;s++)r[s]=n[s];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},78892:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var i=n(87462),a=(n(67294),n(3905));const o={sidebar_position:1,title:"Indexing"},r=void 0,l={unversionedId:"collections/indexing/index",id:"collections/indexing/index",title:"Indexing",description:"Indexes allow users to quickly access documents by using indexed attributes with their queries. While GDN automatically indexes some system attributes, you can create extra indexes on non-system attributes of documents.",source:"@site/docs/collections/indexing/index.md",sourceDirName:"collections/indexing",slug:"/collections/indexing/",permalink:"/docs/collections/indexing/",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/collections/indexing/index.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Indexing"},sidebar:"defaultSidebar",previous:{title:"Graph Edge Settings",permalink:"/docs/collections/graph-edge/graph-edge-settings"},next:{title:"Using Indexes",permalink:"/docs/collections/indexing/index-utilization"}},d={},s=[{value:"Primary Index",id:"primary-index",level:2},{value:"Edge Index",id:"edge-index",level:2},{value:"Persistent Index",id:"persistent-index",level:2},{value:"Hash Index",id:"hash-index",level:2},{value:"Skiplist Index",id:"skiplist-index",level:2},{value:"TTL Index",id:"ttl-index",level:2},{value:"Geo Index",id:"geo-index",level:2},{value:"Fulltext Index",id:"fulltext-index",level:2}],u={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Indexes allow users to quickly access documents by using indexed attributes with their queries. While GDN automatically indexes some system attributes, you can create extra indexes on non-system attributes of documents."),(0,a.kt)("p",null,"You can create user-defined indexes on collections. You can create indexes by specifying the names of the index attributes. Some index types (such as full-text) can only index one attribute, while others allow indexing multiple attributes."),(0,a.kt)("p",null,"GDN automatically indexes the system attributes ",(0,a.kt)("inlineCode",{parentName:"p"},"_id"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"_key"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," in the provided indexes. A collection's primary key determines the ",(0,a.kt)("inlineCode",{parentName:"p"},"_id")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"_key")," values, and the edge collection's edge index determines the ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," values."),(0,a.kt)("p",null,"You cannot use the system attribute ",(0,a.kt)("inlineCode",{parentName:"p"},"_id")," in user-defined indexes, but you can use ",(0,a.kt)("inlineCode",{parentName:"p"},"_key"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"_rev"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"_from"),", and ",(0,a.kt)("inlineCode",{parentName:"p"},"_to"),"."),(0,a.kt)("p",null,"Creating new indexes is done under an exclusive collection lock by default. When you create a new index, the collection is not available during creation. Creating indexes in the foreground is undesirable if you have to perform it on a live system without a dedicated maintenance window."),(0,a.kt)("p",null,"For potentially long-running index creation, GDN supports creating indexes in the background. The collection remains mostly available during the index creation. Refer to ",(0,a.kt)("a",{parentName:"p",href:"/docs/collections/indexing/create-index-in-background"},"Create Indexes in Background")," for more information."),(0,a.kt)("p",null,"GDN provides the following index types:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#primary-index"},"Primary Index")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#edge-index"},"Edge Index")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#persistent-index"},"Persistent Index")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#hash-index"},"Hash Index")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#skiplist-index"},"Skiplist Index")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#ttl-index"},"TTL Index")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#geo-index"},"Geo Index")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#fulltext-index"},"Fulltext Index"))),(0,a.kt)("h2",{id:"primary-index"},"Primary Index"),(0,a.kt)("p",null,"Each collection has a ",(0,a.kt)("em",{parentName:"p"},"primary index")," that stores the ",(0,a.kt)("a",{parentName:"p",href:"/docs/references/glossary#document-key"},"document keys")," (",(0,a.kt)("inlineCode",{parentName:"p"},"_key")," attribute) for all documents in the collection. The primary index allows you to quickly select documents using the ",(0,a.kt)("inlineCode",{parentName:"p"},"_key")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"_id")," attributes. C8QL queries automatically use primary indexes for equality lookups on ",(0,a.kt)("inlineCode",{parentName:"p"},"_key")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"_id"),"."),(0,a.kt)("p",null,"You can use a dedicated function to find a document with its ",(0,a.kt)("inlineCode",{parentName:"p"},"_key")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"_id")," using the primary index:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'collection.document("<document-key>");\n_document("<document-id>");\n')),(0,a.kt)("p",null,"The primary index is an unsorted hash index, so it cannot be used for sorting or non-equality range queries.  You cannot change, remove, or create a primary index."),(0,a.kt)("h2",{id:"edge-index"},"Edge Index"),(0,a.kt)("p",null,"Each ",(0,a.kt)("a",{parentName:"p",href:"/docs/references/glossary#edge-collection"},"edge collection")," automatically creates an ",(0,a.kt)("em",{parentName:"p"},"edge index"),". The edge index provides quick access to documents by either their ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," attributes. You can use an edge index to quickly find connections between vertex documents. Queries use edge indexes when referring to the connecting edges of a vertex."),(0,a.kt)("p",null,"C8QL uses edge indexes when performing equality lookups on ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," values in an edge collection. You can use a dedicated function to find edges with their ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," values using the edge index:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'collection.edges("<from-value>");\ncollection.edges("<to-value>");\ncollection.outEdges("<from-value>");\ncollection.outEdges("<to-value>");\ncollection.inEdges("<from-value>");\ncollection.inEdges("<to-value>");\n')),(0,a.kt)("p",null,"The edge index is a hash index that stores the union of all ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," attributes. It can be used for equality lookups, but not for range queries or for sorting. Edge indexes are automatically created for edge collections. It is not possible to create user-defined edge indexes. However, it is possible to freely use the ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," attributes in user-defined indexes."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"You cannot remove or change an edge index.")),(0,a.kt)("h2",{id:"persistent-index"},"Persistent Index"),(0,a.kt)("p",null,"Persistent index entries are written to disk when documents are stored or updated, so the entries do not need to be rebuilt when the server is restarted or the indexed collection is loaded. Persistent indexes can reduce collection loading times. You can only use persistent indexes in addition to another primary index."),(0,a.kt)("p",null,"Because the persistent index is not in-memory, it does not store pointers to the primary index. Instead it stores a document's primary key. To retrieve a document via a persistent index via an index value lookup, there will therefore be an additional O(1) complexity lookup into the primary index to fetch the actual document."),(0,a.kt)("p",null,"Persistent indexes are sorted and can be used for point lookups, range queries, and sorting operations if you provide one of the following in the query:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"All index attributes."),(0,a.kt)("li",{parentName:"ul"},"A leftmost prefix of the index attributes.")),(0,a.kt)("h2",{id:"hash-index"},"Hash Index"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Hash indexes are deprecated and replaced by persistent indexes. You can still use these indexes in the API, but not the Web GUI.")),(0,a.kt)("p",null,"A hash index can be used to quickly find documents with specific attribute values. The hash index is unsorted, so it supports equality lookups but no range queries or sorting."),(0,a.kt)("p",null,"You can create a hash index on one or more document attributes. A query only uses a hash index if all specified attributes are present in the search condition, and if all attributes are compared using the equality (",(0,a.kt)("inlineCode",{parentName:"p"},"=="),") operator. Hash indexes are used from within C8QL and several query functions such as ",(0,a.kt)("inlineCode",{parentName:"p"},"byExample")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"firstExample"),"."),(0,a.kt)("p",null,"The following types of indexes each have different characteristics:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Unique hash index"),": All documents in the collection must have different values for the attributes covered by the unique index. You cannot insert a document with the same key value as an already existing document."),(0,a.kt)("p",{parentName:"li"},"This type of index is not sparse. Documents that do not contain the index attributes or that have a value of ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," in the index attributes will still be indexed. A key value of ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," may only occur once in the index, so this type of index cannot be used for optional attributes due to unique constraint violations."),(0,a.kt)("p",{parentName:"li"},"The unique option can also be used to ensure that no duplicate edges are created, by adding a combined index for the fields ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," to an edge collection.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Unique, sparse hash index"),": All documents in the collection must have different values for the attributes covered by the unique index. This index does not include documents with an attribute not set or set to ",(0,a.kt)("inlineCode",{parentName:"p"},"null"),". No documents in a collection will have duplicate keys if the indexed attributes are set. This index can be used for optional attributes.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Non-unique hash index"),": All documents in the collection are indexed. This type of index is not sparse. Documents that do not contain the index attributes or that have a value of ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," in the index attribute(s) are still indexed. Duplicate key values can occur and do not lead to unique constraint violations.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Non-unique, sparse hash index"),": Only indexes documents that have all indexed attributes set to a value other than ",(0,a.kt)("inlineCode",{parentName:"p"},"null"),". This index can be used for optional attributes."))),(0,a.kt)("p",null,"The amortized complexity of lookup, insert, update, and removal operations in unique hash indexes is O(1)."),(0,a.kt)("p",null,"Non-unique hash indexes have an amortized complexity of O(1) for insert, update, and removal operations. That means non-unique hash indexes can be used on attributes with low cardinality."),(0,a.kt)("p",null,"If a hash index is created on an attribute that is missing in all or many of the documents, the index takes these actions:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If the index is sparse, the documents missing the attribute are not indexed and do not use index memory. These documents do not influence the update or removal performance for the index.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"If the index is non-sparse, the documents missing the attribute are contained in the index with a key value of ",(0,a.kt)("inlineCode",{parentName:"p"},"null"),"."))),(0,a.kt)("p",null,"Hash indexes support ",(0,a.kt)("a",{parentName:"p",href:"#indexing-array-values"},"indexing array values")," if the index attribute name is extended with a ",(0,a.kt)("inlineCode",{parentName:"p"},"[*]"),"."),(0,a.kt)("h2",{id:"skiplist-index"},"Skiplist Index"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Skiplist indexes are deprecated and replaced by persistent indexes. You can still use these indexes in the API, but not the Web GUI.")),(0,a.kt)("p",null,"A skiplist is a sorted index structure. It can be used to quickly find documents with specific attribute values, for range queries and for returning documents from the index in sorted order. Skiplists will be used from within C8QL and several query functions, e.g. ",(0,a.kt)("inlineCode",{parentName:"p"},"byExample"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"firstExample")," etc."),(0,a.kt)("p",null,"Skiplist indexes are sorted and can be used for point lookups, range queries, and sorting operations if you provide one of the following in the query:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"All index attributes."),(0,a.kt)("li",{parentName:"ul"},"A leftmost prefix of the index attributes.")),(0,a.kt)("p",null,"For example, if a skiplist index is created on attributes ",(0,a.kt)("inlineCode",{parentName:"p"},"value1")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"value2"),", the following filter conditions can use the index (the ",(0,a.kt)("inlineCode",{parentName:"p"},"<=")," and ",(0,a.kt)("inlineCode",{parentName:"p"},">=")," operators are omitted here for brevity):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FILTER doc.value1 == ...\nFILTER doc.value1 < ...\nFILTER doc.value1 > ...\nFILTER doc.value1 > ... && doc.value1 < ...\n\nFILTER doc.value1 == ... && doc.value2 == ...\nFILTER doc.value1 == ... && doc.value2 > ...\nFILTER doc.value1 == ... && doc.value2 > ... && doc.value2 < ...\n")),(0,a.kt)("p",null,"To use a skiplist index for sorting, you must specify the index attributes in the ",(0,a.kt)("inlineCode",{parentName:"p"},"SORT")," clause of the query in the same order as the index definition. Skiplist indexes are always created in ascending order, but they can also be accessed in descending order. For a ",(0,a.kt)("em",{parentName:"p"},"combined index")," (an index on multiple attributes), the sort orders in the ",(0,a.kt)("inlineCode",{parentName:"p"},"SORT")," clause must be either all ascending (optionally omitted as ascending is default) or all descending."),(0,a.kt)("p",null,"For example, if the skiplist index is created on attributes ",(0,a.kt)("inlineCode",{parentName:"p"},"value1")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"value2")," in order, the following sorts clauses can use the index for sorting:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1 ASC, value2 ASC")," (and its equivalent ",(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1, value2"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1 DESC, value2 DESC")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1 ASC")," (and its equivalent ",(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1 DESC"))),(0,a.kt)("p",null,"The following sort clauses cannot make use of the index order and require an extra sort step:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1 ASC, value2 DESC")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value1 DESC, value2 ASC")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value2")," (and its equivalent ",(0,a.kt)("inlineCode",{parentName:"li"},"SORT value2 ASC"),")"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"SORT value2 DESC")," (because first indexed attribute ",(0,a.kt)("inlineCode",{parentName:"li"},"value1")," is not used in sort clause)")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"The last two sort clauses cannot use the index because they do not refer to a leftmost prefix of the index attributes.")),(0,a.kt)("p",null,"Skiplists can optionally be declared unique, disallowing the same value from being saved in the indexed attribute."),(0,a.kt)("p",null,"The following types of indexes each have different characteristics:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Unique skiplist index"),": All documents in the collection must have different values for the attributes covered by the unique index. You cannot insert a document with the same key value as an already existing document."),(0,a.kt)("p",{parentName:"li"},"This type of index is not sparse. Documents that do not contain the index attributes or that have a value of ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," in the index attributes will still be indexed. A key value of ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," may only occur once in the index, so this type of index cannot be used for optional attributes due to unique constraint violations.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Unique, sparse skiplist index"),": All documents in the collection must have different values for the attributes covered by the unique index. This index does not include documents with an attribute not set or set to ",(0,a.kt)("inlineCode",{parentName:"p"},"null"),". No documents in a collection will have duplicate keys if the indexed attributes are set. This index can be used for optional attributes.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Non-unique skiplist index"),": All documents in the collection are indexed. This type of index is not sparse. Documents that do not contain the index attributes or that have a value of ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," in the index attribute(s) are still indexed. Duplicate key values can occur and do not lead to unique constraint violations.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("em",{parentName:"p"},"Non-unique, sparse skiplist index"),": Only indexes documents that have all indexed attributes set to a value other than ",(0,a.kt)("inlineCode",{parentName:"p"},"null"),". This index can be used for optional attributes."))),(0,a.kt)("p",null,"The operational amortized complexity for skiplist indexes is logarithmically correlated with the number of documents in the index."),(0,a.kt)("p",null,"Skiplist indexes support ",(0,a.kt)("a",{parentName:"p",href:"#indexing-array-values"},"indexing array values")," if the index attribute name is extended with a `","[*]","``."),(0,a.kt)("h2",{id:"ttl-index"},"TTL Index"),(0,a.kt)("p",null,"A TTL (time-to-live) index automatically removes expired documents from a collection."),(0,a.kt)("p",null,"You can create a TTL index by setting an ",(0,a.kt)("inlineCode",{parentName:"p"},"expireAfter")," value and picking a single document attribute that contains the documents' creation date and time. Documents are expired after ",(0,a.kt)("inlineCode",{parentName:"p"},"expireAfter")," seconds after their creation time. The creation time is specified as either a numeric timestamp (Unix timestamp) or a date string in format ",(0,a.kt)("inlineCode",{parentName:"p"},"YYYY-MM-DDTHH:MM:SS"),". All date strings will be interpreted as UTC dates."),(0,a.kt)("p",null,"For example, if ",(0,a.kt)("inlineCode",{parentName:"p"},"expireAfter"),' is set to 600 seconds (10 minutes) and the index attribute is "creationDate" and there is the following document:'),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'{ "creationDate" : 1550165973 }\n')),(0,a.kt)("p",null,"This document will be indexed with a creation date time value of ",(0,a.kt)("inlineCode",{parentName:"p"},"1550165973"),", which translates to the human-readable date ",(0,a.kt)("inlineCode",{parentName:"p"},"2019-02-14T17:39:33Z"),". The document will expire 600 seconds afterwards, which is at timestamp ",(0,a.kt)("inlineCode",{parentName:"p"},"1550166573")," (or ",(0,a.kt)("inlineCode",{parentName:"p"},"2019-02-14T17:49:33Z")," in the human-readable version)."),(0,a.kt)("p",null,"There is no guarantee when exactly the removal of expired documents will be carried out, so queries may still find and return documents that have already expired. These will eventually be removed when the background thread kicks in and has capacity to remove the expired documents. Only documents that are past their expiration time will actually be removed."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"You can specify the numeric date time values for the index attribute in milliseconds since January 1st 1970 (Unix timestamp). We round this value down to the nearest second. To calculate the current timestamp from JavaScript in this format, there is ",(0,a.kt)("inlineCode",{parentName:"p"},"Date.now() / 1000"),". To calculate it from an arbitrary Date instance, there is ",(0,a.kt)("inlineCode",{parentName:"p"},"Date.getTime() / 1000"),".")),(0,a.kt)("p",null,"Alternatively, the index attribute values can be specified as a date string in format ",(0,a.kt)("inlineCode",{parentName:"p"},"YYYY-MM-DDTHH:MM:SS"),". All date strings will be interpreted as UTC dates."),(0,a.kt)("p",null,"The above example document using a date string attribute value would be"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'{ "creationDate" : "2019-02-14T17:39:33Z" }\n')),(0,a.kt)("p",null,"In case the index attribute does not contain a numeric value or a proper date string, the document will not be stored in the TTL index and thus will not become a candidate for expiration and removal. Providing either a non-numeric value or even no value for the index attribute is a supported way of keeping documents from being expired and removed."),(0,a.kt)("h2",{id:"geo-index"},"Geo Index"),(0,a.kt)("p",null,"A geo index enables you to quickly find locations across the earth. Geo indexes are automatically created, but you can create additional geo indexes on one or multiple attributes in collections."),(0,a.kt)("p",null,"The geo index stores two-dimensional coordinates. You can create two separate document attributes (latitude and longitude) or a single array attribute that contains both latitude and longitude. Latitude and longitude must be numeric values."),(0,a.kt)("p",null,"Geo indexes provide operations to do the following:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Find documents with coordinates nearest to a given comparison coordinate"),(0,a.kt)("li",{parentName:"ul"},"Find documents with coordinates that are within a specifiable radius around a comparison coordinate.")),(0,a.kt)("p",null,"You can access these operations with dedicated functions in C8QL or simple queries. They are also automatically applied to SORT or FILTER when used with the distance function."),(0,a.kt)("h2",{id:"fulltext-index"},"Fulltext Index"),(0,a.kt)("p",null,"A full-text index can be used to find words, or prefixes of words inside documents. A full-text index can be created on a single attribute only, and will index all words contained in documents that have a textual value in that attribute. Only words with a (specifiable) minimum length are indexed. Word tokenization is done using the word boundary analysis provided by libicu, which is taking into account the selected language provided at server start. Words are indexed in their lower-cased form. The index supports complete match queries (full words) and prefix queries, plus basic logical operations such as ",(0,a.kt)("inlineCode",{parentName:"p"},"and"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"or")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"not")," for combining partial results."),(0,a.kt)("p",null,"The full-text index is sparse, meaning it only indexes documents for which the index attribute is set and contains a string value. Additionally, the index only includes words with a configurable minimum length."),(0,a.kt)("p",null,"You can use the full-text index through dedicated functions in C8QL or simple queries"),(0,a.kt)("p",null,"You can access these operations via dedicated functions in C8QL or simple queries. They are not applied to any other types of queries."))}p.isMDXComponent=!0}}]);