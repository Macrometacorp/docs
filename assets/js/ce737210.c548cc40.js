"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[70773],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),s=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(n),m=r,k=d["".concat(u,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(k,l(l({ref:t},c),{},{components:n})):a.createElement(k,l({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var s=2;s<o;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},66654:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var a=n(87462),r=(n(67294),n(3905));const o={title:"Database Functions"},l=void 0,i={unversionedId:"queryworkers/c8ql/functions/database",id:"queryworkers/c8ql/functions/database",title:"Database Functions",description:"C8QL includes database functions.",source:"@site/docs/queryworkers/c8ql/functions/database.md",sourceDirName:"queryworkers/c8ql/functions",slug:"/queryworkers/c8ql/functions/database",permalink:"/docs/queryworkers/c8ql/functions/database",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/c8ql/functions/database.md",tags:[],version:"current",frontMatter:{title:"Database Functions"},sidebar:"defaultSidebar",previous:{title:"Control Flow Functions",permalink:"/docs/queryworkers/c8ql/functions/control-flow"},next:{title:"Date Functions",permalink:"/docs/queryworkers/c8ql/functions/date"}},u={},s=[{value:"COLLECTION_COUNT()",id:"collection_count",level:2},{value:"COLLECTIONS()",id:"collections",level:2},{value:"COUNT()",id:"count",level:2},{value:"CURRENT_USER()",id:"current_user",level:2},{value:"CURRENT_USER_ATTRIBUTE()",id:"current_user_attribute",level:2},{value:"CURRENT_APIKEY_ATTRIBUTE()",id:"current_apikey_attribute",level:2},{value:"DECODE_REV()",id:"decode_rev",level:2},{value:"DOCUMENT()",id:"document",level:2},{value:"LENGTH()",id:"length",level:2}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"C8QL includes database functions."),(0,r.kt)("h2",{id:"collection_count"},"COLLECTION_COUNT()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"COLLECTION_COUNT(coll) \u2192 count")),(0,r.kt)("p",null,"Determine the amount of documents in a collection. ",(0,r.kt)("a",{parentName:"p",href:"#length"},"LENGTH()")," is preferred."),(0,r.kt)("h2",{id:"collections"},"COLLECTIONS()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"COLLECTIONS() \u2192 docArray")),(0,r.kt)("p",null,"Return an array of collections."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"returns ",(0,r.kt)("strong",{parentName:"li"},"docArray")," (array): each collection as a document with attributes\n",(0,r.kt)("em",{parentName:"li"},"name")," and _",(0,r.kt)("em",{parentName:"li"},"id")," in an array")),(0,r.kt)("h2",{id:"count"},"COUNT()"),(0,r.kt)("p",null,"This is an alias for ",(0,r.kt)("a",{parentName:"p",href:"#length"},"LENGTH()"),"."),(0,r.kt)("h2",{id:"current_user"},"CURRENT_USER()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"CURRENT_USER() \u2192 userName")),(0,r.kt)("p",null,"Return the name of the current user."),(0,r.kt)("p",null,"The current user is the user account name specified in the ",(0,r.kt)("em",{parentName:"p"},"Authorization")," HTTP header of the request. If you ran the query as a request, authentication must be enabled on the server. Otherwise, the return value is ",(0,r.kt)("em",{parentName:"p"},"null"),"."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"returns ",(0,r.kt)("strong",{parentName:"li"},"userName")," (string","|","null): the current user name.")),(0,r.kt)("h2",{id:"current_user_attribute"},"CURRENT_USER_ATTRIBUTE()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"CURRENT_USER_ATTRIBUTE() \u2192 attribute")),(0,r.kt)("p",null,"Returns attributes that are assigned to a user."),(0,r.kt)("p",null,"You can use these attributes to restrict access to documents. For example, you can add a document with an attribute ",(0,r.kt)("inlineCode",{parentName:"p"},"Department: finance")," and create a similar ",(0,r.kt)("inlineCode",{parentName:"p"},"{ Department: finance }")," attribute for an authorized user, then write the following query:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"FOR d IN data\nFILTER CURRENT_USER_ATTRIBUTE(\u201cDepartment\u201d) == d.Department\nRETURN d\n")),(0,r.kt)("p",null,"To ensure security, verify that accounts who can access this query cannot also modify it and circumvent the attribute."),(0,r.kt)("h2",{id:"current_apikey_attribute"},"CURRENT_APIKEY_ATTRIBUTE()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"CURRENT_APIKEY_ATTRIBUTE() \u2192 attribute")),(0,r.kt)("p",null,"Returns attributes that are assigned to an API key."),(0,r.kt)("p",null,"You can use these attributes to restrict access to documents. For example, you can add a document with an attribute ",(0,r.kt)("inlineCode",{parentName:"p"},"Department: finance")," and create a similar ",(0,r.kt)("inlineCode",{parentName:"p"},"{ Department: finance }")," attribute for an API key, then write the following query:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"FOR d IN data\nFILTER CURRENT_USER_ATTRIBUTE(\u201cDepartment\u201d) == d.Department\nRETURN d\n")),(0,r.kt)("p",null,"To ensure security, verify that accounts who can access this query cannot also modify it and circumvent the attribute."),(0,r.kt)("h2",{id:"decode_rev"},"DECODE_REV()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"DECODE_REV(revision) \u2192 details")),(0,r.kt)("p",null,"Decompose the specified ",(0,r.kt)("inlineCode",{parentName:"p"},"revision")," string into its components. The resulting object has a ",(0,r.kt)("inlineCode",{parentName:"p"},"date")," and a ",(0,r.kt)("inlineCode",{parentName:"p"},"count")," attribute. This function is supposed to be called with the ",(0,r.kt)("inlineCode",{parentName:"p"},"_rev")," attribute value of a database document as argument."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"revision")," (string): revision ID string"),(0,r.kt)("li",{parentName:"ul"},"returns ",(0,r.kt)("strong",{parentName:"li"},"details")," (object","|","null): object with two attributes ",(0,r.kt)("em",{parentName:"li"},"date")," (string in ISO 8601 format) and ",(0,r.kt)("em",{parentName:"li"},"count")," (integer number), or ",(0,r.kt)("em",{parentName:"li"},"null"))),(0,r.kt)("p",null,"If the input revision ID is not a string or cannot be processed, the function issues a warning and returns ",(0,r.kt)("em",{parentName:"p"},"null"),"."),(0,r.kt)("p",null,"Please note that the ",(0,r.kt)("em",{parentName:"p"},"date")," value in the current result provides the date and time of when the document record was put together on the server, but not necessarily the time of insertion into the underlying storage engine. Therefore in case of concurrent document operations the exact document storage order cannot be derived unambiguously from the revision value. It should thus be treated as a rough estimate of when a document was created or last updated."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'DECODE_REV( "_YU0HOEG---" )\n// { "date" : "2019-03-11T16:15:05.314Z", "count" : 0 }\n')),(0,r.kt)("h2",{id:"document"},"DOCUMENT()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"DOCUMENT(collection, id) \u2192 doc")),(0,r.kt)("p",null,"Return the document which is uniquely identified by its ",(0,r.kt)("em",{parentName:"p"},"id"),". GDN will try to find the document using the _",(0,r.kt)("em",{parentName:"p"},"id")," value of the document in the specified collection."),(0,r.kt)("p",null,"If there is a mismatch between the ",(0,r.kt)("em",{parentName:"p"},"collection")," passed and the collection specified in ",(0,r.kt)("em",{parentName:"p"},"id"),", then ",(0,r.kt)("em",{parentName:"p"},"null")," will be returned. Additionally, if the ",(0,r.kt)("em",{parentName:"p"},"collection")," matches the collection value specified in ",(0,r.kt)("em",{parentName:"p"},"id")," but the document cannot be found, ",(0,r.kt)("em",{parentName:"p"},"null")," will be returned."),(0,r.kt)("p",null,"This function also allows ",(0,r.kt)("em",{parentName:"p"},"id")," to be an array of ids. In this case, the function will return an array of all documents that could be found."),(0,r.kt)("p",null,"It is also possible to specify a document key instead of an id, or an array of keys to return all documents that can be found."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"collection")," (string): name of a collection"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"id")," (string","|","array): a document handle string (consisting of collection name and document key), a document key, or an array of both document handle strings and document keys"),(0,r.kt)("li",{parentName:"ul"},"returns ",(0,r.kt)("strong",{parentName:"li"},"doc")," (document","|","array","|","null): the content of the found document, an array of all found documents or ",(0,r.kt)("em",{parentName:"li"},"null")," if nothing was found")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'DOCUMENT( users, "users/john" )\nDOCUMENT( users, "john" )\n\nDOCUMENT( users, [ "users/john", "users/amy" ] )\nDOCUMENT( users, [ "john", "amy" ] )\n')),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"DOCUMENT(id) \u2192 doc")),(0,r.kt)("p",null,"The function can also be used with a single parameter ",(0,r.kt)("em",{parentName:"p"},"id")," as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"id")," (string","|","array): either a document handle string (consisting of\ncollection name and document key) or an array of document handle strings"),(0,r.kt)("li",{parentName:"ul"},"returns ",(0,r.kt)("strong",{parentName:"li"},"doc")," (document","|","null): the content of the found document\nor ",(0,r.kt)("em",{parentName:"li"},"null")," if nothing was found")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'DOCUMENT("users/john")\nDOCUMENT( [ "users/john", "users/amy" ] )\n')),(0,r.kt)("p",null,"Please also consider to use\n",(0,r.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/operations/with"},(0,r.kt)("inlineCode",{parentName:"a"},"DOCUMENT")," in conjunction with ",(0,r.kt)("inlineCode",{parentName:"a"},"WITH"))),(0,r.kt)("h2",{id:"length"},"LENGTH()"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"LENGTH(coll) \u2192 documentCount")),(0,r.kt)("p",null,"Determine the amount of documents in a collection."),(0,r.kt)("p",null,"It calls ",(0,r.kt)("a",{parentName:"p",href:"#collection_count"},"COLLECTION_COUNT()")," internally."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"coll")," (collection): a collection (not string)"),(0,r.kt)("li",{parentName:"ul"},"returns ",(0,r.kt)("strong",{parentName:"li"},"documentCount")," (number): the total amount of documents in ",(0,r.kt)("em",{parentName:"li"},"coll"))),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"LENGTH()")," can also determine the ",(0,r.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/functions/array#length"},"number of elements")," in an array,\nthe ",(0,r.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/functions/document#length"},"number of attribute keys")," of an object / document and\nthe ",(0,r.kt)("a",{parentName:"p",href:"/docs/queryworkers/c8ql/functions/string#length"},"character length")," of a string."))}p.isMDXComponent=!0}}]);