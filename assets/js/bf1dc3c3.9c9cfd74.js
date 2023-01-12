"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[32131],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=l(n),m=a,h=d["".concat(p,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(h,i(i({ref:t},c),{},{components:n})):r.createElement(h,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},99986:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(87462),a=(n(67294),n(3905));const o={sidebar_position:14,title:"UPSERT"},i=void 0,s={unversionedId:"queryworkers/c8ql/operations/upsert",id:"queryworkers/c8ql/operations/upsert",title:"UPSERT",description:"The UPSERT keyword can be used for checking whether certain documents exist, and to update/replace them in case they exist, or create them in case they do not exist. On a single server, upserts are executed transactionally in an all-or-nothing fashion.",source:"@site/docs/queryworkers/c8ql/operations/upsert.md",sourceDirName:"queryworkers/c8ql/operations",slug:"/queryworkers/c8ql/operations/upsert",permalink:"/docs/queryworkers/c8ql/operations/upsert",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/c8ql/operations/upsert.md",tags:[],version:"current",sidebarPosition:14,frontMatter:{sidebar_position:14,title:"UPSERT"},sidebar:"defaultSidebar",previous:{title:"INSERT",permalink:"/docs/queryworkers/c8ql/operations/insert"},next:{title:"WITH",permalink:"/docs/queryworkers/c8ql/operations/with"}},p={},l=[{value:"Setting query options",id:"setting-query-options",level:2},{value:"Returning documents",id:"returning-documents",level:2}],c={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"UPSERT")," keyword can be used for checking whether certain documents exist, and to update/replace them in case they exist, or create them in case they do not exist. On a single server, upserts are executed transactionally in an all-or-nothing fashion. "),(0,a.kt)("p",null,"A query may execute intermediate transaction commits in case the running transaction (C8QL query) hits the specified size thresholds. In this case, the query's operations carried out so far will be committed and not rolled back in case of a later abort/rollback. "),(0,a.kt)("p",null,"For sharded collections, the entire query and/or upsert operation may not be transactional, especially if it involves different shards and/or DB-Servers."),(0,a.kt)("p",null,"Each ",(0,a.kt)("inlineCode",{parentName:"p"},"UPSERT")," operation is restricted to a single collection, and the ",(0,a.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/operations/upsert"},"collection name")," must not be dynamic. Only a single ",(0,a.kt)("inlineCode",{parentName:"p"},"UPSERT")," statement per collection is allowed per C8QL query, and it cannot be followed by read or write operations that access the same collection, by traversal operations, or C8QL functions that can read documents."),(0,a.kt)("p",null,"The syntax for an upsert operation is:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"UPSERT searchExpression INSERT insertExpression UPDATE updateExpression IN collection options\nUPSERT searchExpression INSERT insertExpression REPLACE updateExpression IN collection options\n")),(0,a.kt)("p",null,"When using the ",(0,a.kt)("inlineCode",{parentName:"p"},"UPDATE")," variant of the upsert operation, the found document will be partially updated, meaning only the attributes specified in ",(0,a.kt)("em",{parentName:"p"},"updateExpression")," will be updated or added. When using the ",(0,a.kt)("inlineCode",{parentName:"p"},"REPLACE")," variant of upsert, existing documents will be replaced with the contexts of ",(0,a.kt)("em",{parentName:"p"},"updateExpression"),"."),(0,a.kt)("p",null,"Updating a document will modify the document's revision number with a server-generated value. The system attributes ",(0,a.kt)("em",{parentName:"p"},"_id"),", ",(0,a.kt)("em",{parentName:"p"},"_key")," and ",(0,a.kt)("em",{parentName:"p"},"_rev")," cannot be updated, ",(0,a.kt)("em",{parentName:"p"},"_from")," and ",(0,a.kt)("em",{parentName:"p"},"_to")," can."),(0,a.kt)("p",null,"The ",(0,a.kt)("em",{parentName:"p"},"searchExpression")," contains the document to be looked for. It must be an object literal without dynamic attribute names. In case no such document can be found in ",(0,a.kt)("em",{parentName:"p"},"collection"),", a new document will be inserted into the collection as specified in the ",(0,a.kt)("em",{parentName:"p"},"insertExpression"),". "),(0,a.kt)("p",null,"In case at least one document in ",(0,a.kt)("em",{parentName:"p"},"collection")," matches the ",(0,a.kt)("em",{parentName:"p"},"searchExpression"),", it will be updated using the ",(0,a.kt)("em",{parentName:"p"},"updateExpression"),". When more than one document in the collection matches the ",(0,a.kt)("em",{parentName:"p"},"searchExpression"),", it is undefined which of the matching documents will be updated. It is therefore often sensible to make sure by other means (such as unique indexes, application logic etc.) that at most one document matches ",(0,a.kt)("em",{parentName:"p"},"searchExpression"),"."),(0,a.kt)("p",null,"The following query will look in the ",(0,a.kt)("em",{parentName:"p"},"users")," collection for a document with a specific ",(0,a.kt)("em",{parentName:"p"},"name")," attribute value. If the document exists, its ",(0,a.kt)("em",{parentName:"p"},"logins")," attribute will be increased by one. If it does not exist, a new document will be inserted, consisting of the attributes ",(0,a.kt)("em",{parentName:"p"},"name"),", ",(0,a.kt)("em",{parentName:"p"},"logins"),", and ",(0,a.kt)("em",{parentName:"p"},"dateCreated"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"UPSERT { name: 'superuser' } \nINSERT { name: 'superuser', logins: 1, dateCreated: DATE_NOW() } \nUPDATE { logins: OLD.logins + 1 } IN users\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"In the ",(0,a.kt)("inlineCode",{parentName:"p"},"UPDATE")," case it is possible to refer to the previous version of the document using the ",(0,a.kt)("em",{parentName:"p"},"OLD")," pseudo-value.")),(0,a.kt)("h2",{id:"setting-query-options"},"Setting query options"),(0,a.kt)("p",null,"As in several above examples, the ",(0,a.kt)("em",{parentName:"p"},"ignoreErrors")," option can be used to suppress query errors that may occur when trying to violate unique key constraints."),(0,a.kt)("p",null,"When updating or replacing an attribute with a null value, GDN will not remove the attribute from the document but store a null value for it. To get rid of attributes in an upsert operation, set them to null and provide the ",(0,a.kt)("em",{parentName:"p"},"keepNull")," option."),(0,a.kt)("p",null,"There is also the option ",(0,a.kt)("em",{parentName:"p"},"mergeObjects")," that controls whether object contents will be merged if an object attribute is present in both the ",(0,a.kt)("inlineCode",{parentName:"p"},"UPDATE")," query and in the to-be-updated document."),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"The default value for ",(0,a.kt)("em",{parentName:"p"},"mergeObjects")," is ",(0,a.kt)("em",{parentName:"p"},"true"),", so there is no need to specify it explicitly.")),(0,a.kt)("p",null,"To make sure data are durable when an update query returns, there is the ",(0,a.kt)("em",{parentName:"p"},"waitForSync")," query option."),(0,a.kt)("p",null,"In order to not accidentially update documents that have been written and updated since you last fetched them you can use the option ",(0,a.kt)("em",{parentName:"p"},"ignoreRevs")," to either let GDN compare the ",(0,a.kt)("inlineCode",{parentName:"p"},"_rev")," value and only succeed if they still match, or let GDN ignore them (default):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR i IN 1..1000\n  UPSERT { _key: CONCAT('test', i)}\n    INSERT {foobar: false}\n    UPDATE {_rev: \"1287623\", foobar: true }\n  IN users OPTIONS { ignoreRevs: false }\n")),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"NOTE"),": You need to add the ",(0,a.kt)("inlineCode",{parentName:"p"},"_rev")," value in the updateExpression, it will not be used within the searchExpression. Even worse, if you use an outdated ",(0,a.kt)("inlineCode",{parentName:"p"},"_rev")," in the searchExpression UPSERT will trigger the INSERT path instead of the UPDATE path, because it has not found a document exactly matching the searchExpression."),(0,a.kt)("p",null,"Different write operations on the same collection do not block each other, as long as there are no ",(0,a.kt)("em",{parentName:"p"},"write-write conficts")," on the same documents. From an application development perspective it can be desired to have exclusive write access on collections, to simplify the development. "),(0,a.kt)("p",null,"Exclusive access can also speed up modification queries, because we avoid conflict checks."),(0,a.kt)("p",null,"Use the ",(0,a.kt)("em",{parentName:"p"},"exclusive")," option to achieve this effect on a per query basis:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"FOR i IN 1..1000\n  UPSERT { _key: CONCAT('test', i) }\n  INSERT { foobar: false }\n  UPDATE { foobar: true }\n  IN users OPTIONS { exclusive: true }\n")),(0,a.kt)("h2",{id:"returning-documents"},"Returning documents"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"UPSERT")," statements can optionally return data. To do so, they need to be followed by a ",(0,a.kt)("inlineCode",{parentName:"p"},"RETURN")," statement (intermediate ",(0,a.kt)("inlineCode",{parentName:"p"},"LET")," statements are allowed, too). These statements can optionally perform calculations and refer to the pseudo-values ",(0,a.kt)("inlineCode",{parentName:"p"},"OLD")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"NEW"),". In case the upsert performed an insert operation, ",(0,a.kt)("inlineCode",{parentName:"p"},"OLD")," will have a value of ",(0,a.kt)("em",{parentName:"p"},"null"),". In case the upsert performed an update or replace operation, ",(0,a.kt)("inlineCode",{parentName:"p"},"OLD")," will contain the previous version of the document, before update/replace."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"NEW")," will always be populated. It will contain the inserted document in case the upsert performed an insert, or the updated/replaced document in case it performed an update/replace."),(0,a.kt)("p",null,"This can also be used to check whether the upsert has performed an insert or an update internally:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"UPSERT { name: 'superuser' } \nINSERT { name: 'superuser', logins: 1, dateCreated: DATE_NOW() } \nUPDATE { logins: OLD.logins + 1 } IN users\nRETURN { doc: NEW, type: OLD ? 'update' : 'insert' }\n")))}u.isMDXComponent=!0}}]);