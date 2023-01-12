"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[24172],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),s=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,d=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=s(n),c=a,f=m["".concat(d,".").concat(c)]||m[c]||p[c]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},41375:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const o={sidebar_position:1,title:"c8 Query Language"},i=void 0,l={unversionedId:"queryworkers/c8ql/examples/index",id:"queryworkers/c8ql/examples/index",title:"c8 Query Language",description:"The c8 Query Language, or C8QL, is the language Macrometa uses for queries and Query Workers.  C8QL is a mix of SQL and JavaScript and provides a rich set of primitives to query and update GDN.",source:"@site/docs/queryworkers/c8ql/examples/index.md",sourceDirName:"queryworkers/c8ql/examples",slug:"/queryworkers/c8ql/examples/",permalink:"/docs/queryworkers/c8ql/examples/",draft:!1,editUrl:"https://github.com/macrometacorp/docs/edit/main/docs/queryworkers/c8ql/examples/index.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"c8 Query Language"},sidebar:"defaultSidebar",previous:{title:"Operators",permalink:"/docs/queryworkers/c8ql/operators"},next:{title:"Counting",permalink:"/docs/queryworkers/c8ql/examples/counting"}},d={},s=[{value:"Usual Query Patterns Examples",id:"usual-query-patterns-examples",level:2},{value:"Things to consider when running queries on collections",id:"things-to-consider-when-running-queries-on-collections",level:2},{value:"Example data",id:"example-data",level:2}],u={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The c8 Query Language, or C8QL, is the language Macrometa uses for queries and Query Workers.  C8QL is a mix of SQL and JavaScript and provides a rich set of primitives to query and update GDN."),(0,a.kt)("h2",{id:"usual-query-patterns-examples"},"Usual Query Patterns Examples"),(0,a.kt)("p",null,"These pages contain some common query patterns with examples. For better understandability the query results are also included directly below each query."),(0,a.kt)("p",null,"Normally, you would want to run queries on data stored in collections. This section will provide several examples for that."),(0,a.kt)("p",null,"Some of the following example queries are executed on a collection 'users' with the data provided here below."),(0,a.kt)("h2",{id:"things-to-consider-when-running-queries-on-collections"},"Things to consider when running queries on collections"),(0,a.kt)("p",null,"Note that all documents created in any collections will automatically get the following server-generated attributes:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"_id"),": A unique id, consisting of collection name and a server-side sequence value"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"_key"),": The server sequence value"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"_rev"),": The document's revision id")),(0,a.kt)("p",null,"Whenever you run queries on the documents in collections, don't be surprised if these additional attributes are returned as well."),(0,a.kt)("p",null,"@(Info)()(Please also note that with real-world data, you might want to create additional indexes on the data (left out here for brevity). Adding indexes on attributes that are used in ",(0,a.kt)("inlineCode",{parentName:"p"},"FILTER")," statements may considerably speed up queries. )"),(0,a.kt)("p",null,"@(Info)()(Furthermore, instead of using attributes such as ",(0,a.kt)("inlineCode",{parentName:"p"},"id"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"from")," and ",(0,a.kt)("em",{parentName:"p"},"to"),", you might want to use the built-in ",(0,a.kt)("inlineCode",{parentName:"p"},"_id"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"_from")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"_to")," attributes. )"),(0,a.kt)("p",null,"Finally, ",(0,a.kt)("inlineCode",{parentName:"p"},"edge collection")," provides a nice way of establishing references / links between documents. These features have been left out here for brevity as well."),(0,a.kt)("h2",{id:"example-data"},"Example data"),(0,a.kt)("p",null,"Some of the following example queries are executed on a collection ",(0,a.kt)("inlineCode",{parentName:"p"},"users")," with the following initial data:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'[ \n  { "id": 100, "name": "John", "age": 37, "active": true, "gender": "m" },\n  { "id": 101, "name": "Fred", "age": 36, "active": true, "gender": "m" },\n  { "id": 102, "name": "Jacob", "age": 35, "active": false, "gender": "m" },\n  { "id": 103, "name": "Ethan", "age": 34, "active": false, "gender": "m" },\n  { "id": 104, "name": "Michael", "age": 33, "active": true, "gender": "m" },\n  { "id": 105, "name": "Alexander", "age": 32, "active": true, "gender": "m" },\n  { "id": 106, "name": "Daniel", "age": 31, "active": true, "gender": "m" },\n  { "id": 107, "name": "Anthony", "age": 30, "active": true, "gender": "m" },\n  { "id": 108, "name": "Jim", "age": 29, "active": true, "gender": "m" },\n  { "id": 109, "name": "Diego", "age": 28, "active": true, "gender": "m" },\n  { "id": 200, "name": "Sophia", "age": 37, "active": true, "gender": "f" },\n  { "id": 201, "name": "Emma", "age": 36,  "active": true, "gender": "f" },\n  { "id": 202, "name": "Olivia", "age": 35, "active": false, "gender": "f" },\n  { "id": 203, "name": "Madison", "age": 34, "active": true, "gender": "f" },\n  { "id": 204, "name": "Chloe", "age": 33, "active": true, "gender": "f" },\n  { "id": 205, "name": "Eva", "age": 32, "active": false, "gender": "f" },\n  { "id": 206, "name": "Abigail", "age": 31, "active": true, "gender": "f" },\n  { "id": 207, "name": "Isabella", "age": 30, "active": true, "gender": "f" },\n  { "id": 208, "name": "Mary", "age": 29, "active": true, "gender": "f" },\n  { "id": 209, "name": "Mariah", "age": 28, "active": true, "gender": "f" }\n]\n')),(0,a.kt)("p",null,"For some of the examples, we'll also use a collection ",(0,a.kt)("inlineCode",{parentName:"p"},"relations")," to store relationships between users. The example data for ",(0,a.kt)("inlineCode",{parentName:"p"},"relations")," are as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'[\n  { "from": 209, "to": 205, "type": "friend" },\n  { "from": 206, "to": 108, "type": "friend" },\n  { "from": 202, "to": 204, "type": "friend" },\n  { "from": 200, "to": 100, "type": "friend" },\n  { "from": 205, "to": 101, "type": "friend" },\n  { "from": 209, "to": 203, "type": "friend" },\n  { "from": 200, "to": 203, "type": "friend" },\n  { "from": 100, "to": 208, "type": "friend" },\n  { "from": 101, "to": 209, "type": "friend" },\n  { "from": 206, "to": 102, "type": "friend" },\n  { "from": 104, "to": 100, "type": "friend" },\n  { "from": 104, "to": 108, "type": "friend" },\n  { "from": 108, "to": 209, "type": "friend" },\n  { "from": 206, "to": 106, "type": "friend" },\n  { "from": 204, "to": 105, "type": "friend" },\n  { "from": 208, "to": 207, "type": "friend" },\n  { "from": 102, "to": 108, "type": "friend" },\n  { "from": 207, "to": 203, "type": "friend" },\n  { "from": 203, "to": 106, "type": "friend" },\n  { "from": 202, "to": 108, "type": "friend" },\n  { "from": 201, "to": 203, "type": "friend" },\n  { "from": 105, "to": 100, "type": "friend" },\n  { "from": 100, "to": 109, "type": "friend" },\n  { "from": 207, "to": 109, "type": "friend" },\n  { "from": 103, "to": 203, "type": "friend" },\n  { "from": 208, "to": 104, "type": "friend" },\n  { "from": 105, "to": 104, "type": "friend" },\n  { "from": 103, "to": 208, "type": "friend" },\n  { "from": 203, "to": 107, "type": "boyfriend" },\n  { "from": 107, "to": 203, "type": "girlfriend" },\n  { "from": 208, "to": 109, "type": "boyfriend" },\n  { "from": 109, "to": 208, "type": "girlfriend" },\n  { "from": 106, "to": 205, "type": "girlfriend" },\n  { "from": 205, "to": 106, "type": "boyfriend" },\n  { "from": 103, "to": 209, "type": "girlfriend" },\n  { "from": 209, "to": 103, "type": "boyfriend" },\n  { "from": 201, "to": 102, "type": "boyfriend" },\n  { "from": 102, "to": 201, "type": "girlfriend" },\n  { "from": 206, "to": 100, "type": "boyfriend" },\n  { "from": 100, "to": 206, "type": "girlfriend" }\n]\n')))}p.isMDXComponent=!0}}]);