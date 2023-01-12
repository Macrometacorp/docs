"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[39352],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,N=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return n?r.createElement(N,i(i({ref:t},u),{},{components:n})):r.createElement(N,i({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6825:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(87462),a=(n(67294),n(3905));const o={sidebar_position:12,title:"REPLACE"},i=void 0,s={unversionedId:"queryworkers/c8ql/operations/replace",id:"queryworkers/c8ql/operations/replace",title:"REPLACE",description:"The REPLACE keyword can be used to completely replace documents in a collection. On a single server, the replace operation is executed transactionally in an all-or-nothing fashion.",source:"@site/docs/queryworkers/c8ql/operations/replace.md",sourceDirName:"queryworkers/c8ql/operations",slug:"/queryworkers/c8ql/operations/replace",permalink:"/docs/queryworkers/c8ql/operations/replace",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/c8ql/operations/replace.md",tags:[],version:"current",sidebarPosition:12,frontMatter:{sidebar_position:12,title:"REPLACE"},sidebar:"defaultSidebar",previous:{title:"UPDATE",permalink:"/docs/queryworkers/c8ql/operations/update"},next:{title:"INSERT",permalink:"/docs/queryworkers/c8ql/operations/insert"}},l={},c=[{value:"Setting query options",id:"setting-query-options",level:2},{value:"Returning the modified documents",id:"returning-the-modified-documents",level:2}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"REPLACE")," keyword can be used to completely replace documents in a collection. On a single server, the replace operation is executed transactionally in an all-or-nothing fashion."),(0,a.kt)("p",null,"A query may execute intermediate transaction commits in case the running transaction (C8QL query) hits the specified size thresholds. In this case, the query's operations carried out so far will be committed and not rolled back in case of a later abort/rollback. "),(0,a.kt)("p",null,"For sharded collections, the entire query and/or replace operation may not be transactional, especially if it involves different shards and/or DB-Servers."),(0,a.kt)("p",null,"Each ",(0,a.kt)("inlineCode",{parentName:"p"},"REPLACE")," operation is restricted to a single collection, and the ",(0,a.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/operations/replace"},"collection name")," must not be dynamic. Only a single ",(0,a.kt)("inlineCode",{parentName:"p"},"REPLACE")," statement per collection is allowed per C8QL query, and it cannot be followed by read or write operations that access the same collection, by traversal operations, or C8QL functions that can read documents. The system attributes ",(0,a.kt)("em",{parentName:"p"},"_id"),", ",(0,a.kt)("em",{parentName:"p"},"_key")," and ",(0,a.kt)("em",{parentName:"p"},"_rev")," cannot be replaced, ",(0,a.kt)("em",{parentName:"p"},"_from")," and ",(0,a.kt)("em",{parentName:"p"},"_to")," can."),(0,a.kt)("p",null,"The two syntaxes for a replace operation are:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"REPLACE document IN collection options\nREPLACE keyExpression WITH document IN collection options\n")),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"collection")," must contain the name of the collection in which the documents should be replaced. ",(0,a.kt)("em",{parentName:"p"},"document")," is the replacement document. When using the first syntax, ",(0,a.kt)("em",{parentName:"p"},"document")," must also contain the ",(0,a.kt)("em",{parentName:"p"},"_key")," attribute to identify the document to be replaced. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR u IN users\n  REPLACE { _key: u._key, name: CONCAT(u.firstName, u.lastName), status: u.status } IN users\n")),(0,a.kt)("p",null,"The following query is invalid because it does not contain a ",(0,a.kt)("em",{parentName:"p"},"_key")," attribute and thus it is not possible to determine the documents to be replaced:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR u IN users\n  REPLACE { name: CONCAT(u.firstName, u.lastName, status: u.status) } IN users\n")),(0,a.kt)("p",null,"When using the second syntax, ",(0,a.kt)("em",{parentName:"p"},"keyExpression")," provides the document identification. This can either be a string (which must then contain the document key) or a document, which must contain a ",(0,a.kt)("em",{parentName:"p"},"_key")," attribute."),(0,a.kt)("p",null,"The following queries are equivalent:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR u IN users\n  REPLACE { _key: u._key, name: CONCAT(u.firstName, u.lastName) } IN users\n\nFOR u IN users\n  REPLACE u._key WITH { name: CONCAT(u.firstName, u.lastName) } IN users\n\nFOR u IN users\n  REPLACE { _key: u._key } WITH { name: CONCAT(u.firstName, u.lastName) } IN users\n\nFOR u IN users\n  REPLACE u WITH { name: CONCAT(u.firstName, u.lastName) } IN users\n")),(0,a.kt)("p",null,"A replace will fully replace an existing document, but it will not modify the values of internal attributes (such as ",(0,a.kt)("em",{parentName:"p"},"_id"),", ",(0,a.kt)("em",{parentName:"p"},"_key"),", ",(0,a.kt)("em",{parentName:"p"},"_from")," and ",(0,a.kt)("em",{parentName:"p"},"_to"),"). Replacing a document will modify a document's revision number with a server-generated value."),(0,a.kt)("p",null,"A replace operation may update arbitrary documents which do not need to be identical to the ones produced by a preceding ",(0,a.kt)("inlineCode",{parentName:"p"},"FOR")," statement:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR i IN 1..1000\n  REPLACE CONCAT('test', i) WITH { foobar: true } IN users\n\nFOR u IN users\n  FILTER u.active == false\n  REPLACE u WITH { status: 'inactive', name: u.name } IN backup\n")),(0,a.kt)("h2",{id:"setting-query-options"},"Setting query options"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"options")," can be used to suppress query errors that may occur when trying to replace non-existing documents or when violating unique key constraints:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR i IN 1..1000\n  REPLACE { _key: CONCAT('test', i) } WITH { foobar: true } IN users OPTIONS { ignoreErrors: true }\n")),(0,a.kt)("p",null,"To make sure data are durable when a replace query returns, there is the ",(0,a.kt)("em",{parentName:"p"},"waitForSync"),"\nquery option:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR i IN 1..1000\n  REPLACE { _key: CONCAT('test', i) } WITH { foobar: true } IN users OPTIONS { waitForSync: true }\n")),(0,a.kt)("p",null,"In order to not accidentially overwrite documents that have been updated since you last fetched them, you can use the option ",(0,a.kt)("em",{parentName:"p"},"ignoreRevs")," to either let GDN compare the ",(0,a.kt)("inlineCode",{parentName:"p"},"_rev")," value and only succeed if they still match, or let GDN ignore them (default):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR i IN 1..1000\n  REPLACE { _key: CONCAT('test', i), _rev: \"1287623\" } WITH { foobar: true } IN users OPTIONS { ignoreRevs: false }\n")),(0,a.kt)("p",null,"Different write operations on the same collection do not block each other, as long as there are no ",(0,a.kt)("em",{parentName:"p"},"write-write conficts")," on the same documents. From an application development perspective it can be desired to have exclusive write access on collections, to simplify the development. Note that writes do not block reads in GDN. Exclusive access can also speed up modification queries, because we avoid conflict checks."),(0,a.kt)("p",null,"Use the ",(0,a.kt)("em",{parentName:"p"},"exclusive")," option to achieve this effect on a per query basis:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR doc IN collection\n  REPLACE doc._key \n  WITH { replaced: true } IN collection \n  OPTIONS { exclusive: true }\n")),(0,a.kt)("h2",{id:"returning-the-modified-documents"},"Returning the modified documents"),(0,a.kt)("p",null,"The modified documents can also be returned by the query. In this case, the ",(0,a.kt)("inlineCode",{parentName:"p"},"REPLACE")," statement must be followed by a ",(0,a.kt)("inlineCode",{parentName:"p"},"RETURN")," statement (intermediate ",(0,a.kt)("inlineCode",{parentName:"p"},"LET")," statements are allowed, too). The ",(0,a.kt)("inlineCode",{parentName:"p"},"OLD")," pseudo-value can be used to refer to document revisions before the replace, and ",(0,a.kt)("inlineCode",{parentName:"p"},"NEW")," refers to document revisions after the replace."),(0,a.kt)("p",null,"Both ",(0,a.kt)("inlineCode",{parentName:"p"},"OLD")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"NEW")," will contain all document attributes, even those not specified in the replace expression."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"REPLACE document IN collection options RETURN OLD\nREPLACE document IN collection options RETURN NEW\nREPLACE keyExpression WITH document IN collection options RETURN OLD\nREPLACE keyExpression WITH document IN collection options RETURN NEW\n")),(0,a.kt)("p",null,"Following is an example using a variable named ",(0,a.kt)("inlineCode",{parentName:"p"},"previous")," to return the original documents before modification. For each replaced document, the document key will be returned:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'FOR u IN users\n  REPLACE u WITH { value: "test" } \n  IN users\n  LET previous = OLD \n  RETURN previous._key\n')),(0,a.kt)("p",null,"The following query uses the ",(0,a.kt)("inlineCode",{parentName:"p"},"NEW")," pseudo-value to return the replaced documents (without some of their system attributes):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR u IN users\n  REPLACE u WITH { value: \"test\" } IN users\n  LET replaced = NEW \n  RETURN UNSET(replaced, '_key', '_id', '_rev')\n")))}p.isMDXComponent=!0}}]);